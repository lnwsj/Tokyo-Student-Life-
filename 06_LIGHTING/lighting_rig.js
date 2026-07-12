/**
 * lighting_rig.js
 * 
 * Lighting Rig สำหรับ Tokyo Student Life
 * - โหลด 5 time-of-day presets จาก time_of_day.json
 * - Apply 3-point lighting + ambient + fog + post-processing
 * - 1 call เปลี่ยนทั้ง scene: applyLighting(scene, renderer, 'morning_home')
 * 
 * Usage:
 *   import { applyLighting, transitionLighting } from './lighting_rig.js';
 *   const rig = applyLighting(scene, renderer, 'morning_home');
 *   await transitionLighting(rig, 'noon_school', 30);  // 30 sec transition
 */

import * as THREE from 'three';
import timeOfDay from './time_of_day.json' assert { type: 'json' };
import { createComposer } from './color_grading_setup.js';

export class LightingRig {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;
    this.lights = {};
    this.currentTime = null;
    this.currentPreset = null;
    this.composer = null;
  }

  /**
   * Apply lighting preset
   */
  apply(time) {
    const preset = timeOfDay.presets[time];
    if (!preset) {
      throw new Error(`Unknown time: ${time}. Available: ${Object.keys(timeOfDay.presets).join(', ')}`);
    }

    // Cleanup old lights
    this.dispose();

    // ===== Sun (Key) =====
    if (preset.sun.intensity > 0 && preset.sun.color) {
      this.lights.sun = new THREE.DirectionalLight(
        new THREE.Color(preset.sun.color),
        preset.sun.intensity
      );
      this._positionLightByAngle(
        this.lights.sun,
        preset.sun.elevation,
        preset.sun.azimuth,
        50
      );
      this.lights.sun.castShadow = true;
      this.lights.sun.shadow.mapSize.set(2048, 2048);
      this.lights.sun.shadow.bias = -0.0005;
      this.lights.sun.shadow.normalBias = 0.02;
      this.lights.sun.shadow.radius = 4;
      this.lights.sun.shadow.camera.near = 0.5;
      this.lights.sun.shadow.camera.far = 200;
      this.lights.sun.shadow.camera.left = -50;
      this.lights.sun.shadow.camera.right = 50;
      this.lights.sun.shadow.camera.top = 50;
      this.lights.sun.shadow.camera.bottom = -50;
      this.scene.add(this.lights.sun);
    }

    // ===== Sky (Fill) =====
    if (preset.sky.color && preset.sky.intensity > 0) {
      this.lights.sky = new THREE.DirectionalLight(
        new THREE.Color(preset.sky.color),
        preset.sky.intensity * 0.3  // 30% of sky intensity
      );
      if (this.lights.sun) {
        this.lights.sky.position.copy(this.lights.sun.position).negate();
      } else {
        this.lights.sky.position.set(-30, 20, -20);
      }
      this.scene.add(this.lights.sky);
    }

    // ===== Rim =====
    if (this.lights.sun) {
      this.lights.rim = new THREE.DirectionalLight(
        new THREE.Color(preset.sun.color),
        preset.sun.intensity * 0.6
      );
      this.lights.rim.position.set(
        this.lights.sun.position.x * 0.5,
        this.lights.sun.position.y * 0.5,
        -this.lights.sun.position.z * 0.5
      );
      this.scene.add(this.lights.rim);
    }

    // ===== Ambient (Hemisphere) =====
    this.lights.ambient = new THREE.HemisphereLight(
      new THREE.Color(preset.ambient.sky_color),
      new THREE.Color(preset.ambient.ground_color),
      preset.ambient.intensity
    );
    this.scene.add(this.lights.ambient);

    // ===== Fog =====
    if (preset.fog) {
      this.scene.fog = new THREE.Fog(
        new THREE.Color(preset.fog.color),
        preset.fog.near || 10,
        preset.fog.far || 100
      );
      this.scene.background = new THREE.Color(preset.fog.color);
    }

    // ===== Tone Mapping =====
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = preset.post_processing.exposure;

    // ===== Post-processing =====
    if (!this.composer) {
      this.composer = createComposer(this.renderer, this.scene, this._camera);
    }
    this._updateComposer(preset);

    this.currentTime = time;
    this.currentPreset = preset;
    return this;
  }

  /**
   * Set camera (for composer)
   */
  setCamera(camera) {
    this._camera = camera;
    if (this.composer) {
      this.composer.passes[0].camera = camera;
    }
  }

  /**
   * Helper: position light by elevation + azimuth
   */
  _positionLightByAngle(light, elevationDeg, azimuthDeg, distance) {
    const elevation = elevationDeg * Math.PI / 180;
    const azimuth = (azimuthDeg || 0) * Math.PI / 180;
    light.position.set(
      Math.cos(azimuth) * Math.cos(elevation) * distance,
      Math.sin(elevation) * distance,
      Math.sin(azimuth) * Math.cos(elevation) * distance
    );
  }

  /**
   * Update composer with new preset
   */
  _updateComposer(preset) {
    if (!this.composer) return;
    
    // Bloom
    const bloomPass = this.composer.passes.find(p => p.constructor.name === 'UnrealBloomPass');
    if (bloomPass) {
      bloomPass.strength = preset.post_processing.bloom.strength;
      bloomPass.radius = preset.post_processing.bloom.radius;
      bloomPass.threshold = preset.post_processing.bloom.threshold;
    }
    
    // Vignette + Grain updated via uniforms
    this.composer.passes.forEach(pass => {
      if (pass.uniforms && pass.uniforms.strength !== undefined) {
        // Multiple passes might have strength uniform
        if (pass.uniforms.smoothness !== undefined) {
          // Vignette
          pass.uniforms.strength.value = preset.post_processing.vignette.strength;
          pass.uniforms.smoothness.value = preset.post_processing.vignette.smoothness;
        } else {
          // Grain
          pass.uniforms.strength.value = preset.post_processing.grain.strength;
        }
      }
    });
  }

  /**
   * Transition between time presets
   */
  async transition(targetTime, durationSeconds = 30) {
    if (!this.currentPreset) {
      this.apply(targetTime);
      return;
    }

    const startPreset = JSON.parse(JSON.stringify(this.currentPreset));
    const endPreset = JSON.parse(JSON.stringify(timeOfDay.presets[targetTime]));
    const startTime = performance.now();
    const duration = durationSeconds * 1000;

    return new Promise((resolve) => {
      const animate = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        // ease-in-out
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        // Interpolate
        const blended = this._blendPresets(startPreset, endPreset, ease);
        this._applyInterpolated(blended);

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          this.currentTime = targetTime;
          this.currentPreset = endPreset;
          resolve();
        }
      };
      requestAnimationFrame(animate);
    });
  }

  /**
   * Blend two presets
   */
  _blendPresets(a, b, t) {
    return {
      sun: this._blendLight(a.sun, b.sun, t),
      sky: this._blendLight(a.sky, b.sky, t),
      ambient: {
        sky_color: this._blendColor(a.ambient.sky_color, b.ambient.sky_color, t),
        ground_color: this._blendColor(a.ambient.ground_color, b.ambient.ground_color, t),
        intensity: this._lerp(a.ambient.intensity, b.ambient.intensity, t)
      },
      fog: {
        color: this._blendColor(a.fog.color, b.fog.color, t),
        density: this._lerp(a.fog.density, b.fog.density, t),
        near: this._lerp(a.fog.near, b.fog.near, t),
        far: this._lerp(a.fog.far, b.fog.far, t)
      },
      post_processing: {
        exposure: this._lerp(a.post_processing.exposure, b.post_processing.exposure, t),
        bloom: {
          strength: this._lerp(a.post_processing.bloom.strength, b.post_processing.bloom.strength, t),
          radius: this._lerp(a.post_processing.bloom.radius, b.post_processing.bloom.radius, t),
          threshold: this._lerp(a.post_processing.bloom.threshold, b.post_processing.bloom.threshold, t)
        }
      }
    };
  }

  _blendLight(a, b, t) {
    return {
      color: a.color && b.color ? this._blendColor(a.color, b.color, t) : (a.color || b.color),
      intensity: this._lerp(a.intensity || 0, b.intensity || 0, t),
      elevation: this._lerp(a.elevation || 0, b.elevation || 0, t),
      azimuth: this._lerp(a.azimuth || 0, b.azimuth || 0, t)
    };
  }

  _blendColor(hexA, hexB, t) {
    const cA = new THREE.Color(hexA);
    const cB = new THREE.Color(hexB);
    return '#' + cA.lerp(cB, t).getHexString();
  }

  _lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /**
   * Apply interpolated preset (no full reapply)
   */
  _applyInterpolated(blended) {
    if (this.lights.sun && blended.sun.color) {
      this.lights.sun.color.set(blended.sun.color);
      this.lights.sun.intensity = blended.sun.intensity;
      this._positionLightByAngle(this.lights.sun, blended.sun.elevation, blended.sun.azimuth, 50);
    }
    if (this.lights.ambient) {
      this.lights.ambient.color.set(blended.ambient.sky_color);
      this.lights.ambient.groundColor.set(blended.ambient.ground_color);
      this.lights.ambient.intensity = blended.ambient.intensity;
    }
    if (this.scene.fog) {
      this.scene.fog.color.set(blended.fog.color);
      this.scene.fog.near = blended.fog.near;
      this.scene.fog.far = blended.fog.far;
    }
    this.renderer.toneMappingExposure = blended.post_processing.exposure;
    this._updateComposer({
      post_processing: blended.post_processing
    });
  }

  /**
   * Dispose all lights
   */
  dispose() {
    Object.values(this.lights).forEach(light => {
      if (light && this.scene) this.scene.remove(light);
    });
    this.lights = {};
  }
}

/**
 * Apply lighting (one-call)
 */
export function applyLighting(scene, renderer, time, camera = null) {
  const rig = new LightingRig(scene, renderer);
  if (camera) rig.setCamera(camera);
  rig.apply(time);
  return rig;
}

/**
 * Get list of available times
 */
export function getAvailableTimes() {
  return Object.keys(timeOfDay.presets);
}

/**
 * Get preset for zone
 */
export function getTimeForZone(zone) {
  return timeOfDay.zone_to_time_mapping[zone];
}

// Default export
export default {
  LightingRig,
  applyLighting,
  getAvailableTimes,
  getTimeForZone
};

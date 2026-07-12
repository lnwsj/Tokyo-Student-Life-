/**
 * color_grading_setup.js
 * 
 * EffectComposer setup with bloom + vignette + grain
 * 
 * Note: ใช้ร่วมกับ lighting_rig.js
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// ========== SHADERS ==========

const vignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    strength: { value: 0.3 },
    smoothness: { value: 0.5 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float strength;
    uniform float smoothness;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      vec2 center = vUv - 0.5;
      float dist = length(center);
      float vignette = smoothstep(0.5, 0.5 - smoothness, dist * (1.0 + smoothness));
      color.rgb *= mix(1.0 - strength, 1.0, vignette);
      gl_FragColor = color;
    }
  `
};

const grainShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    strength: { value: 0.05 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float strength;
    varying vec2 vUv;
    float random(vec2 st) {
      return fract(sin(dot(st.xy + time, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float noise = (random(vUv) - 0.5) * strength;
      color.rgb += noise;
      gl_FragColor = color;
    }
  `
};

// ========== MAIN ==========

/**
 * Create EffectComposer with all post-processing passes
 */
export function createComposer(renderer, scene, camera) {
  if (!camera) {
    console.warn('createComposer called without camera — set later via setCamera');
  }

  const composer = new EffectComposer(renderer);

  // 1. Render
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // 2. Bloom
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.4,    // strength
    0.4,    // radius
    0.85    // threshold
  );
  composer.addPass(bloomPass);

  // 3. Vignette
  const vignettePass = new ShaderPass(vignetteShader);
  composer.addPass(vignettePass);

  // 4. Grain
  const grainPass = new ShaderPass(grainShader);
  composer.addPass(grainPass);

  // 5. Output
  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  return composer;
}

/**
 * Update grain animation
 */
export function updateGrainTime(composer, deltaTime) {
  const grainPass = composer.passes.find(
    p => p.uniforms && p.uniforms.time !== undefined
  );
  if (grainPass) {
    grainPass.uniforms.time.value += deltaTime;
  }
}

// Default export
export default { createComposer, updateGrainTime };

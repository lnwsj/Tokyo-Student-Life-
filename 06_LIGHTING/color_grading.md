# 🎨 Color Grading — Tokyo Student Life
## カラーグレーディング

> Post-processing ที่ทำให้ scene "ดูเป็นเกมเดียวกัน"
> Tone mapping + bloom + vignette + grain

---

## Pipeline Order

```
1. Render scene
2. Tone mapping (ACES Filmic)
3. Color correction (exposure, contrast, saturation, warmth)
4. Bloom (selective bright)
5. Vignette
6. Grain (film)
7. Output
```

---

## 1. Tone Mapping

### Use: ACES Filmic
```javascript
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
```

### Why ACES Filmic
- ✅ Industry standard
- ✅ Cinematic look
- ✅ Good highlight rolloff
- ✅ Good shadow detail
- ❌ Linear (too flat)
- ❌ Reinhard (too washed out)
- ❌ Cineon (too contrasty)

### Exposure by Time

| Time | Exposure | Note |
|------|----------|------|
| Morning | 1.10 | slightly bright |
| Noon | 1.15 | brightest |
| Evening | 1.10 | balanced |
| Night | 1.00 | dark scene |
| Sunset | 1.10 | balanced |

---

## 2. Color Correction

### Per-Channel Adjustment
```javascript
const colorGrading = {
  exposure: 1.10,      // overall brightness
  contrast: 1.05,      // contrast
  saturation: 0.85,    // ลด saturation 15%
  warmth: 0.10,        // +10% warm (yellow/orange)
  tint: 0.0,           // ± green/magenta
  lift: [0, 0, 0],     // shadow color
  gamma: [1, 1, 1],    // midtone
  gain: [1, 1, 1]      // highlight
};
```

### Rules
- ✅ Saturation < 1.0 (ลดจาก default)
- ✅ Warmth > 0 (ทำให้อบอุ่น)
- ❌ Exposure ไม่เกิน 1.3 (overexpose)
- ❌ Saturation ไม่เกิน 1.0

### Per Time

| Time | Exposure | Contrast | Sat | Warmth |
|------|----------|----------|-----|--------|
| Morning | 1.10 | 1.05 | 0.85 | 0.10 |
| Noon | 1.15 | 1.00 | 0.85 | 0.00 |
| Evening | 1.10 | 1.10 | 0.90 | 0.20 |
| Night | 1.00 | 1.15 | 0.95 | 0.05 |
| Sunset | 1.10 | 1.05 | 0.88 | 0.15 |

---

## 3. Bloom (Selective Bright)

### Use
ให้แสงสว่าง (sun, neon) มี halo

```javascript
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.4,    // strength
  0.4,    // radius
  0.85    // threshold
);
composer.addPass(bloom);
```

### Per Time

| Time | Strength | Radius | Threshold |
|------|----------|--------|-----------|
| Morning | 0.4 | 0.4 | 0.85 |
| Noon | 0.3 | 0.5 | 0.90 |
| Evening | 0.5 | 0.4 | 0.80 |
| Night | 0.8 | 0.5 | 0.70 |
| Sunset | 0.4 | 0.4 | 0.85 |

### Notes
- Threshold ต่ำ = bloom มากขึ้น
- Strength สูง = halo แรงขึ้น
- Night ใช้ bloom แรง (neon effect)

---

## 4. Vignette

### Use
มุมภาพมืดลงเล็กน้อย — focus ไปที่กลาง

```javascript
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

const vignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    strength: { value: 0.3 },
    smoothness: { value: 0.5 }
  },
  vertexShader: `...`,
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
```

### Per Time
| Time | Strength | Smoothness |
|------|----------|------------|
| Morning | 0.20 | 0.5 |
| Noon | 0.15 | 0.5 |
| Evening | 0.30 | 0.5 |
| Night | 0.40 | 0.5 |
| Sunset | 0.25 | 0.5 |

---

## 5. Film Grain

### Use
Texture ของ film — ลดความ "สะอาด" ของ digital

```javascript
const grainShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    strength: { value: 0.05 }
  },
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float strength;
    varying vec2 vUv;
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float noise = random(vUv + time) * strength;
      color.rgb += noise;
      gl_FragColor = color;
    }
  `
};
```

### Per Time
| Time | Strength |
|------|----------|
| Morning | 0.05 |
| Noon | 0.03 |
| Evening | 0.06 |
| Night | 0.08 |
| Sunset | 0.05 |

---

## Complete EffectComposer Setup

```javascript
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export function createComposer(renderer, scene, camera, timePreset) {
  const composer = new EffectComposer(renderer);
  
  // 1. Render
  composer.addPass(new RenderPass(scene, camera));
  
  // 2. Bloom
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    timePreset.post_processing.bloom.strength,
    timePreset.post_processing.bloom.radius,
    timePreset.post_processing.bloom.threshold
  );
  composer.addPass(bloom);
  
  // 3. Vignette
  const vignette = new ShaderPass(vignetteShader);
  vignette.uniforms.strength.value = timePreset.post_processing.vignette.strength;
  composer.addPass(vignette);
  
  // 4. Grain
  const grain = new ShaderPass(grainShader);
  grain.uniforms.strength.value = timePreset.post_processing.grain.strength;
  composer.addPass(grain);
  
  // 5. Output
  composer.addPass(new OutputPass());
  
  return composer;
}

export function updateComposerTime(composer, timePreset, deltaTime) {
  // Bloom
  const bloomPass = composer.passes[1];
  bloomPass.strength = timePreset.post_processing.bloom.strength;
  bloomPass.radius = timePreset.post_processing.bloom.radius;
  bloomPass.threshold = timePreset.post_processing.bloom.threshold;
  
  // Grain (animate)
  const grainPass = composer.passes[3];
  grainPass.uniforms.time.value += deltaTime;
}
```

---

## Color Rules Summary

### ใช้
- ✅ ACES Filmic tone mapping
- ✅ Slight desaturation (0.85-0.95)
- ✅ Warmth shift (+0.05 to +0.20)
- ✅ Subtle bloom (0.3-0.8)
- ✅ Subtle vignette (0.15-0.40)
- ✅ Film grain (0.03-0.08)

### ไม่ใช้
- ❌ Linear tone mapping
- ❌ High saturation
- ❌ No bloom (ดูแบน)
- ❌ Strong vignette
- ❌ Chromatic aberration
- ❌ Heavy DOF

---

## Quick Reference Card

```
╔════════════════════════════════════╗
║  COLOR GRADING DNA                 ║
╠════════════════════════════════════╣
║ Tone:   ACES Filmic                 ║
║ Exp:    1.00-1.15                   ║
║ Sat:    0.85-0.95 (ลด)              ║
║ Warm:   +0.05 to +0.20              ║
║ Bloom:  0.3-0.8                     ║
║ Vignette: 0.15-0.40                 ║
║ Grain:  0.03-0.08                   ║
║                                     ║
║ NEVER:  Linear, over-sat,           ║
║        no bloom, CA, heavy DOF      ║
║                                     ║
║ ALWAYS: ACES, warm, subtle          ║
║         post-fx, time-of-day        ║
╚════════════════════════════════════╝
```

---

**Version:** 1.0
**Last updated:** 2026-07-12

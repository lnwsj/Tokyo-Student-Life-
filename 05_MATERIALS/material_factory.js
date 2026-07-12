/**
 * material_factory.js
 * 
 * Material factory สำหรับ Tokyo Student Life
 * - โหลด material specs จาก PBR_palette.json
 * - Generate procedural textures (Canvas)
 * - คืน THREE.MeshStandardMaterial instance
 * 
 * Usage:
 *   import { getMaterial, preloadAllMaterials } from './material_factory.js';
 *   const mat = getMaterial('wood.japanese_oak');
 *   mesh.material = mat;
 * 
 *   // With variation
 *   const mat2 = getMaterial('wood.japanese_oak', { variation: 0.3, wear: 0.2 });
 * 
 *   // Preload all (for performance)
 *   await preloadAllMaterials();
 */

import * as THREE from 'three';
import palette from './PBR_palette.json' assert { type: 'json' };
import {
  generateWoodTexture,
  generateConcreteTexture,
  generateFabricTexture,
  generateTatamiTexture,
  generateStoneTexture,
  generateLeafTexture,
  generatePaperTexture,
  generateAsphaltTexture,
  generateWaterNormal,
  generateTileTexture,
  generatePlasticTexture,
  generateMetalTexture,
  generatePlaceholderTexture
} from './texture_generator.js';

// Cache สำหรับ material ที่ generate แล้ว
const materialCache = new Map();

/**
 * สุ่มเลือก variation color
 */
function pickVariation(variations) {
  if (!variations || variations.length === 0) return null;
  return variations[Math.floor(Math.random() * variations.length)];
}

/**
 * สุ่ม shift lightness ±5%
 */
function shiftLightness(hex, percent) {
  const c = new THREE.Color(hex);
  const hsl = {};
  c.getHSL(hsl);
  hsl.l = Math.max(0, Math.min(1, hsl.l + percent));
  c.setHSL(hsl.h, hsl.s, hsl.l);
  return '#' + c.getHexString();
}

/**
 * Get texture ตาม material type
 */
function getTextureForType(textureType, baseColor, size, options = {}) {
  const texParams = {
    size: size || 512,
    baseColor,
    ...options
  };

  switch (textureType) {
    case 'wood_grain':
    case 'wood_grain_dark':
    case 'wood_grain_light':
    case 'wood_grain_aged':
      return generateWoodTexture(texParams);

    case 'bamboo_stripes':
      return generateWoodTexture({ ...texParams, bamboo: true });

    case 'concrete_smooth':
      return generateConcreteTexture({ ...texParams, smooth: true });

    case 'concrete_rough':
      return generateConcreteTexture({ ...texParams, smooth: false });

    case 'asphalt_grain':
      return generateAsphaltTexture(texParams);

    case 'weave_tight':
      return generateFabricTexture({ ...texParams, tightness: 'tight' });

    case 'weave_soft':
      return generateFabricTexture({ ...texParams, tightness: 'soft' });

    case 'tatami_weave':
      return generateTatamiTexture(texParams);

    case 'stone_rough':
      return generateStoneTexture(texParams);

    case 'leaf_vein':
    case 'leaf_vein_long':
      return generateLeafTexture(texParams);

    case 'paper_fiber':
    case 'paper_smooth':
      return generatePaperTexture({ ...texParams, smooth: textureType === 'paper_smooth' });

    case 'water_normal':
      return generateWaterNormal(texParams);

    case 'tile_grid':
      return generateTileTexture(texParams);

    case 'plastic_smooth':
      return generatePlasticTexture(texParams);

    case 'brushed_metal':
    case 'metal_rust':
      return generateMetalTexture({ ...texParams, rusted: textureType === 'metal_rust' });

    case 'glass_clean':
      return generatePlaceholderTexture({ ...texParams, color: 0xffffff, alpha: 0.1 });

    default:
      return generatePlaceholderTexture(texParams);
  }
}

/**
 * Get material instance
 * @param {string} name - material name (e.g. 'wood.japanese_oak')
 * @param {Object} options - { variation: 0-1, wear: 0-1, color: hex, roughness: 0-1 }
 * @returns {THREE.MeshStandardMaterial}
 */
export function getMaterial(name, options = {}) {
  const cacheKey = `${name}_${JSON.stringify(options)}`;
  if (materialCache.has(cacheKey)) {
    return materialCache.get(cacheKey);
  }

  const spec = palette.materials[name];
  if (!spec) {
    console.error(`Material not found: ${name}`);
    console.error('Available:', Object.keys(palette.materials).join(', '));
    return new THREE.MeshStandardMaterial({ color: 0xff00ff }); // debug pink
  }

  // Color
  let baseColor = options.color || pickVariation(spec.variation) || spec.base_color;
  if (options.variation) {
    baseColor = shiftLightness(baseColor, (Math.random() - 0.5) * options.variation * 0.1);
  }

  // Roughness
  const roughness = options.roughness !== undefined
    ? options.roughness
    : spec.roughness + (Math.random() - 0.5) * (spec.roughness_variation || 0);

  // Wear
  const wearAmount = options.wear !== undefined ? options.wear : (spec.wear_amount || 0);
  if (wearAmount > 0) {
    baseColor = shiftLightness(baseColor, -wearAmount * 0.15);
  }

  // Build material
  const matProps = {
    color: new THREE.Color(baseColor),
    roughness: Math.max(0, Math.min(1, roughness)),
    metalness: spec.metallic || 0,
    name
  };

  // Texture
  if (spec.texture_type && spec.texture_size && !spec.transparent) {
    const tex = getTextureForType(spec.texture_type, baseColor, spec.texture_size, { wear: wearAmount });
    if (tex) {
      if (spec.tiling) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(spec.tiling[0], spec.tiling[1]);
      }
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      matProps.map = tex;
    }

    // Normal map (subtle)
    if (spec.normal_scale > 0) {
      const normalTex = getTextureForType(spec.texture_type, baseColor, spec.texture_size, {
        normal: true,
        wear: wearAmount
      });
      if (normalTex) {
        if (spec.tiling) {
          normalTex.wrapS = normalTex.wrapT = THREE.RepeatWrapping;
          normalTex.repeat.set(spec.tiling[0], spec.tiling[1]);
        }
        normalTex.colorSpace = THREE.NoColorSpace;
        matProps.normalMap = normalTex;
        matProps.normalScale = new THREE.Vector2(spec.normal_scale, spec.normal_scale);
      }
    }
  }

  // Emissive (neon)
  if (spec.emissive) {
    matProps.emissive = new THREE.Color(pickVariation([spec.emissive]) || spec.emissive);
    matProps.emissiveIntensity = (spec.emissive_intensity || 0.5) +
      (Math.random() - 0.5) * (spec.emissive_variation || 0);
  }

  // Transparent
  if (spec.transparent) {
    matProps.transparent = true;
    matProps.opacity = spec.transmission || 0.9;
    if (spec.ior) matProps.ior = spec.ior;
  }

  // Validation
  if (matProps.metalness > 0.5 && matProps.roughness < 0.2) {
    console.warn(`Material ${name}: metal + low roughness (mirror)`);
  }

  const material = new THREE.MeshStandardMaterial(matProps);
  materialCache.set(cacheKey, material);
  return material;
}

/**
 * Preload all materials (สำหรับ first frame)
 */
export async function preloadAllMaterials(onProgress) {
  const names = Object.keys(palette.materials);
  for (let i = 0; i < names.length; i++) {
    getMaterial(names[i]);
    if (onProgress) onProgress((i + 1) / names.length);
    // yield to event loop
    if (i % 5 === 0) await new Promise(r => setTimeout(r, 0));
  }
}

/**
 * Get all material names
 */
export function getMaterialNames() {
  return Object.keys(palette.materials);
}

/**
 * Get material spec (read-only)
 */
export function getMaterialSpec(name) {
  return palette.materials[name];
}

/**
 * Get all materials by zone
 */
export function getMaterialsByZone(zone) {
  return Object.entries(palette.materials)
    .filter(([_, spec]) => spec.zones && spec.zones.includes(zone))
    .map(([name]) => name);
}

/**
 * Get all materials by category
 */
export function getMaterialsByCategory(category) {
  return Object.entries(palette.materials)
    .filter(([_, spec]) => spec.category === category)
    .map(([name]) => name);
}

/**
 * Dispose all cached materials
 */
export function disposeAllMaterials() {
  materialCache.forEach(mat => {
    if (mat.map) mat.map.dispose();
    if (mat.normalMap) mat.normalMap.dispose();
    if (mat.emissiveMap) mat.emissiveMap.dispose();
    mat.dispose();
  });
  materialCache.clear();
}

// Default export
export default {
  getMaterial,
  preloadAllMaterials,
  getMaterialNames,
  getMaterialSpec,
  getMaterialsByZone,
  getMaterialsByCategory,
  disposeAllMaterials
};

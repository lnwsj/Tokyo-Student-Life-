/**
 * presets/sunset.js
 * 
 * Sunset preset — 16:00 — Shrine zone
 * สงบ wabi-sabi เหมือนเวลาหยุด
 */

import { applyLighting } from '../lighting_rig.js';

export const SUNSET = {
  name: 'sunset_shrine',
  time: '16:00',
  zone: 5,
  description: 'สงบ wabi-sabi เหมือนเวลาหยุด',
  mood: 'สงบ wabi-sabi เวลาหยุด'
};

export function applySunset(scene, renderer, camera = null) {
  return applyLighting(scene, renderer, 'sunset_shrine', camera);
}

export default { SUNSET, applySunset };

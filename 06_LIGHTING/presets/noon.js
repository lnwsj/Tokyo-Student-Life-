/**
 * presets/noon.js
 * 
 * Noon preset — 12:00 — School zone
 * แสงเที่ยงสดใส สว่าง มีชีวิตชีวา
 */

import { applyLighting } from '../lighting_rig.js';

export const NOON = {
  name: 'noon_school',
  time: '12:00',
  zone: 2,
  description: 'แสงเที่ยงสดใส สว่าง มีชีวิตชีวา',
  mood: 'สดใส มีชีวิตชีวา กระปรี้กระเปร่า'
};

export function applyNoon(scene, renderer, camera = null) {
  return applyLighting(scene, renderer, 'noon_school', camera);
}

export default { NOON, applyNoon };

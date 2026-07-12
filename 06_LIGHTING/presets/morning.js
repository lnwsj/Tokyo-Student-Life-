/**
 * presets/morning.js
 * 
 * Morning preset — 07:00 — Home zone
 * แสงเช้านุ่ม ผ่านม่าน เริ่มวันใหม่
 */

import { applyLighting } from '../lighting_rig.js';

export const MORNING = {
  name: 'morning_home',
  time: '07:00',
  zone: 1,
  description: 'แสงเช้านุ่ม ผ่านม่าน เริ่มวันใหม่',
  mood: 'อบอุ่น นุ่ม เริ่มวันใหม่'
};

export function applyMorning(scene, renderer, camera = null) {
  return applyLighting(scene, renderer, 'morning_home', camera);
}

export default { MORNING, applyMorning };

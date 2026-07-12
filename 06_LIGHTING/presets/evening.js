/**
 * presets/evening.js
 * 
 * Evening preset — 17:30 — Station zone
 * Golden hour อบอุ่นสุด shadow ยาว nostalgic
 */

import { applyLighting } from '../lighting_rig.js';

export const EVENING = {
  name: 'evening_station',
  time: '17:30',
  zone: 3,
  description: 'Golden hour อบอุ่นสุด shadow ยาว nostalgic',
  mood: 'Golden hour nostalgic'
};

export function applyEvening(scene, renderer, camera = null) {
  return applyLighting(scene, renderer, 'evening_station', camera);
}

export default { EVENING, applyEvening };

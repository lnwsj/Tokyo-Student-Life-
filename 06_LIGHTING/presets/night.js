/**
 * presets/night.js
 * 
 * Night preset — 19:00 — Shopping zone
 * Neon warm subtle คึกคัก cozy crowd
 */

import { applyLighting } from '../lighting_rig.js';

export const NIGHT = {
  name: 'night_shopping',
  time: '19:00',
  zone: 4,
  description: 'Neon warm subtle คึกคัก cozy crowd',
  mood: 'คึกคัก cozy มีชีวิตชีวา'
};

export function applyNight(scene, renderer, camera = null) {
  return applyLighting(scene, renderer, 'night_shopping', camera);
}

export default { NIGHT, applyNight };

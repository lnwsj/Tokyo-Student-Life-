/**
 * texture_generator.js
 * 
 * Procedural texture generator ใช้ HTML5 Canvas
 * - Generate ที่ runtime — ไม่ต้องเก็บ PNG files
 * - รองรับทุก material type
 * - คุมโทนสีได้แม่นยำ
 */

import * as THREE from 'three';

// ========== HELPERS ==========

/**
 * Create canvas + context
 */
function createCanvas(size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  return { canvas, ctx: canvas.getContext('2d') };
}

/**
 * Hex to {r, g, b}
 */
function hexToRgb(hex) {
  const c = hex.replace('#', '');
  return {
    r: parseInt(c.substring(0, 2), 16),
    g: parseInt(c.substring(2, 4), 16),
    b: parseInt(c.substring(4, 6), 16)
  };
}

/**
 * Random float between min and max
 */
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Convert canvas to THREE.CanvasTexture
 */
function toTexture(canvas, isNormal = false, isRoughness = false) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = isNormal || isRoughness ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

// ========== WOOD ==========

/**
 * Generate wood grain texture
 * @param {Object} params - { size, baseColor, bamboo, normal, wear }
 */
export function generateWoodTexture(params = {}) {
  const { size = 512, baseColor = '#C8A26A', bamboo = false, normal = false, wear = 0 } = params;
  const { canvas, ctx } = createCanvas(size);
  const { r, g, b } = hexToRgb(baseColor);

  // Base
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  if (bamboo) {
    // Bamboo: vertical stripes + nodes
    const stripeWidth = size / 6;
    for (let i = 0; i < 6; i++) {
      const x = i * stripeWidth;
      // Shade variation
      ctx.fillStyle = `rgba(${r - 20}, ${g - 20}, ${b - 20}, 0.3)`;
      ctx.fillRect(x, 0, stripeWidth / 8, size);
      // Highlight
      ctx.fillStyle = `rgba(${r + 15}, ${g + 15}, ${b + 15}, 0.2)`;
      ctx.fillRect(x + stripeWidth * 0.6, 0, stripeWidth / 12, size);
    }
    // Nodes (horizontal bands)
    for (let i = 0; i < 5; i++) {
      const y = (i + 0.5) * (size / 5);
      ctx.fillStyle = `rgba(${r - 30}, ${g - 30}, ${b - 30}, 0.4)`;
      ctx.fillRect(0, y - 3, size, 6);
    }
  } else {
    // Regular wood: horizontal grain lines
    for (let i = 0; i < 80; i++) {
      const y1 = Math.random() * size;
      const y2 = y1 + rand(-20, 20);
      ctx.strokeStyle = `rgba(${r - 40 + rand(-20, 20)}, ${g - 40 + rand(-20, 20)}, ${b - 40 + rand(-20, 20)}, ${rand(0.05, 0.25)})`;
      ctx.lineWidth = rand(0.5, 2);
      ctx.beginPath();
      ctx.moveTo(0, y1);
      ctx.bezierCurveTo(
        size * 0.33, y1 + rand(-15, 15),
        size * 0.66, y1 + rand(-15, 15),
        size, y2
      );
      ctx.stroke();
    }

    // Knots (rare)
    for (let i = 0; i < 2; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = rand(8, 20);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, `rgba(${r - 60}, ${g - 60}, ${b - 60}, 0.6)`);
      grad.addColorStop(1, `rgba(${r - 60}, ${g - 60}, ${b - 60}, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Wear overlay
  if (wear > 0) {
    for (let i = 0; i < wear * 50; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r2 = rand(2, 8);
      ctx.fillStyle = `rgba(${r - 30}, ${g - 30}, ${b - 30}, ${rand(0.1, 0.3)})`;
      ctx.beginPath();
      ctx.arc(x, y, r2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Subtle noise
  const imageData = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const n = rand(-8, 8);
    imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + n));
    imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + n));
    imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + n));
  }
  ctx.putImageData(imageData, 0, 0);

  return toTexture(canvas, normal);
}

// ========== CONCRETE ==========

export function generateConcreteTexture(params = {}) {
  const { size = 512, baseColor = '#B8AFA0', smooth = false, normal = false, wear = 0 } = params;
  const { canvas, ctx } = createCanvas(size);
  const { r, g, b } = hexToRgb(baseColor);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Random noise
  const imageData = ctx.getImageData(0, 0, size, size);
  const noiseAmount = smooth ? 15 : 25;
  for (let i = 0; i < imageData.data.length; i += 4) {
    const n = rand(-noiseAmount, noiseAmount);
    imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + n));
    imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + n));
    imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + n));
  }
  ctx.putImageData(imageData, 0, 0);

  // Sparse darker spots
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r2 = rand(1, 4);
    ctx.fillStyle = `rgba(${r - 40}, ${g - 40}, ${b - 40}, ${rand(0.1, 0.3)})`;
    ctx.beginPath();
    ctx.arc(x, y, r2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Hairline cracks
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgba(${r - 30}, ${g - 30}, ${b - 30}, 0.3)`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    let x = Math.random() * size;
    let y = Math.random() * size;
    ctx.moveTo(x, y);
    for (let j = 0; j < 20; j++) {
      x += rand(-10, 10);
      y += rand(-10, 10);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Stains (subtle)
  for (let i = 0; i < 3; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r2 = rand(20, 50);
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r2);
    grad.addColorStop(0, `rgba(${r - 20}, ${g - 20}, ${b - 20}, 0.15)`);
    grad.addColorStop(1, `rgba(${r - 20}, ${g - 20}, ${b - 20}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Edge darkening
  const edgeGrad = ctx.createRadialGradient(size/2, size/2, size*0.3, size/2, size/2, size*0.7);
  edgeGrad.addColorStop(0, 'rgba(0,0,0,0)');
  edgeGrad.addColorStop(1, 'rgba(0,0,0,0.15)');
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(0, 0, size, size);

  return toTexture(canvas, normal);
}

// ========== ASPHALT ==========

export function generateAsphaltTexture(params = {}) {
  const { size = 512, baseColor = '#5A5650' } = params;
  const { canvas, ctx } = createCanvas(size);
  const { r, g, b } = hexToRgb(baseColor);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Fine grain noise
  const imageData = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const n = rand(-20, 20);
    imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + n));
    imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + n));
    imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + n));
  }
  ctx.putImageData(imageData, 0, 0);

  // Aggregate stones
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r2 = rand(0.5, 2);
    const shade = rand(0, 1) > 0.5 ? 30 : -20;
    ctx.fillStyle = `rgba(${r + shade}, ${g + shade}, ${b + shade}, 0.6)`;
    ctx.beginPath();
    ctx.arc(x, y, r2, 0, Math.PI * 2);
    ctx.fill();
  }

  return toTexture(canvas);
}

// ========== FABRIC ==========

export function generateFabricTexture(params = {}) {
  const { size = 256, baseColor = '#2D4A6B', tightness = 'tight' } = params;
  const { canvas, ctx } = createCanvas(size);
  const { r, g, b } = hexToRgb(baseColor);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Weave pattern
  const cellSize = tightness === 'tight' ? 4 : 6;
  for (let y = 0; y < size; y += cellSize) {
    for (let x = 0; x < size; x += cellSize) {
      const isVertical = ((x / cellSize) + (y / cellSize)) % 2 === 0;
      if (isVertical) {
        // Vertical thread
        ctx.fillStyle = `rgba(${r - 15}, ${g - 15}, ${b - 15}, 0.5)`;
        ctx.fillRect(x, y, cellSize / 2, cellSize);
        ctx.fillStyle = `rgba(${r + 10}, ${g + 10}, ${b + 10}, 0.3)`;
        ctx.fillRect(x + cellSize / 2, y, cellSize / 2, cellSize);
      } else {
        // Horizontal thread
        ctx.fillStyle = `rgba(${r + 10}, ${g + 10}, ${b + 10}, 0.3)`;
        ctx.fillRect(x, y, cellSize, cellSize / 2);
        ctx.fillStyle = `rgba(${r - 15}, ${g - 15}, ${b - 15}, 0.5)`;
        ctx.fillRect(x, y + cellSize / 2, cellSize, cellSize / 2);
      }
    }
  }

  return toTexture(canvas);
}

// ========== TATAMI ==========

export function generateTatamiTexture(params = {}) {
  const { size = 512, baseColor = '#B8A872' } = params;
  const { canvas, ctx } = createCanvas(size);
  const { r, g, b } = hexToRgb(baseColor);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Tight horizontal weave
  const cellSize = 3;
  for (let y = 0; y < size; y += cellSize) {
    for (let x = 0; x < size; x += cellSize) {
      ctx.fillStyle = `rgba(${r - 10}, ${g - 10}, ${b - 10}, 0.4)`;
      ctx.fillRect(x, y, cellSize, 1);
    }
  }

  // Subtle border darkening
  const grad = ctx.createLinearGradient(0, 0, 0, size);
  grad.addColorStop(0, 'rgba(0,0,0,0.2)');
  grad.addColorStop(0.5, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.2)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Slight color variation
  const imageData = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const n = rand(-5, 5);
    imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + n));
    imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + n));
    imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + n));
  }
  ctx.putImageData(imageData, 0, 0);

  return toTexture(canvas);
}

// ========== STONE ==========

export function generateStoneTexture(params = {}) {
  const { size = 512, baseColor = '#CC4A2C' } = params;
  const { canvas, ctx } = createCanvas(size);
  const { r, g, b } = hexToRgb(baseColor);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Voronoi-like cells
  const points = [];
  for (let i = 0; i < 15; i++) {
    points.push({ x: Math.random() * size, y: Math.random() * size });
  }

  // Background noise
  const imageData = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const n = rand(-15, 15);
    imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + n));
    imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + n));
    imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + n));
  }
  ctx.putImageData(imageData, 0, 0);

  // Cell edges (darker)
  for (let i = 0; i < 30; i++) {
    const x1 = Math.random() * size;
    const y1 = Math.random() * size;
    const x2 = x1 + rand(-30, 30);
    const y2 = y1 + rand(-30, 30);
    ctx.strokeStyle = `rgba(${r - 40}, ${g - 40}, ${b - 40}, 0.4)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Random pitting
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r2 = rand(1, 3);
    ctx.fillStyle = `rgba(${r - 50}, ${g - 50}, ${b - 50}, 0.5)`;
    ctx.beginPath();
    ctx.arc(x, y, r2, 0, Math.PI * 2);
    ctx.fill();
  }

  return toTexture(canvas);
}

// ========== LEAF ==========

export function generateLeafTexture(params = {}) {
  const { size = 256, baseColor = '#F5CCD5' } = params;
  const { canvas, ctx } = createCanvas(size);
  const { r, g, b } = hexToRgb(baseColor);

  // Base
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Center vein
  ctx.strokeStyle = `rgba(${r - 30}, ${g - 30}, ${b - 30}, 0.5)`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(size / 2, 0);
  ctx.lineTo(size / 2, size);
  ctx.stroke();

  // Side veins
  for (let i = 0; i < 8; i++) {
    const y = (i + 1) * (size / 9);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(size / 2, y);
    ctx.lineTo(size * 0.1, y - 10);
    ctx.moveTo(size / 2, y);
    ctx.lineTo(size * 0.9, y - 10);
    ctx.stroke();
  }

  // Edge darkening
  const grad = ctx.createRadialGradient(size/2, size/2, size*0.3, size/2, size/2, size*0.5);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, `rgba(${r - 30}, ${g - 30}, ${b - 30}, 0.2)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  return toTexture(canvas);
}

// ========== PAPER ==========

export function generatePaperTexture(params = {}) {
  const { size = 256, baseColor = '#F8F2E0', smooth = false } = params;
  const { canvas, ctx } = createCanvas(size);
  const { r, g, b } = hexToRgb(baseColor);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  if (!smooth) {
    // Fiber pattern
    for (let i = 0; i < 200; i++) {
      const x1 = Math.random() * size;
      const y1 = Math.random() * size;
      const x2 = x1 + rand(-10, 10);
      const y2 = y1 + rand(-10, 10);
      ctx.strokeStyle = `rgba(${r - 15}, ${g - 15}, ${b - 15}, 0.15)`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  // Subtle noise
  const imageData = ctx.getImageData(0, 0, size, size);
  const noiseAmount = smooth ? 3 : 8;
  for (let i = 0; i < imageData.data.length; i += 4) {
    const n = rand(-noiseAmount, noiseAmount);
    imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + n));
    imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + n));
    imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + n));
  }
  ctx.putImageData(imageData, 0, 0);

  return toTexture(canvas);
}

// ========== WATER NORMAL ==========

export function generateWaterNormal(params = {}) {
  const { size = 512 } = params;
  const { canvas, ctx } = createCanvas(size);

  // Water normal map (mostly blue/purple = flat normal)
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  // Add ripples via random normal variations
  const imageData = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const nx = rand(-30, 30);
    const ny = rand(-30, 30);
    imageData.data[i] = 128 + nx;     // R = X
    imageData.data[i + 1] = 128 + ny; // G = Y
    imageData.data[i + 2] = 255;      // B = Z (up)
  }
  ctx.putImageData(imageData, 0, 0);

  return toTexture(canvas, true);
}

// ========== TILE ==========

export function generateTileTexture(params = {}) {
  const { size = 512, baseColor = '#EAE0CE' } = params;
  const { canvas, ctx } = createCanvas(size);
  const { r, g, b } = hexToRgb(baseColor);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Grid lines
  const cellSize = size / 4;
  ctx.strokeStyle = `rgba(${r - 30}, ${g - 30}, ${b - 30}, 0.4)`;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const pos = i * cellSize;
    ctx.beginPath();
    ctx.moveTo(0, pos);
    ctx.lineTo(size, pos);
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, size);
    ctx.stroke();
  }

  // Per-tile variation
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const cx = x * cellSize + cellSize / 2;
      const cy = y * cellSize + cellSize / 2;
      const shade = rand(-5, 5);
      ctx.fillStyle = `rgba(${r + shade}, ${g + shade}, ${b + shade}, 0.3)`;
      ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
    }
  }

  return toTexture(canvas);
}

// ========== PLASTIC ==========

export function generatePlasticTexture(params = {}) {
  const { size = 256, baseColor = '#C8BFB0' } = params;
  const { canvas, ctx } = createCanvas(size);
  const { r, g, b } = hexToRgb(baseColor);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Very subtle noise
  const imageData = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const n = rand(-3, 3);
    imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + n));
    imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + n));
    imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + n));
  }
  ctx.putImageData(imageData, 0, 0);

  return toTexture(canvas);
}

// ========== METAL ==========

export function generateMetalTexture(params = {}) {
  const { size = 512, baseColor = '#B8B8B0', rusted = false } = params;
  const { canvas, ctx } = createCanvas(size);
  const { r, g, b } = hexToRgb(baseColor);

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  if (rusted) {
    // Rust spots
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r2 = rand(5, 30);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r2);
      grad.addColorStop(0, `rgba(139, 69, 19, 0.7)`);
      grad.addColorStop(1, `rgba(139, 69, 19, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r2, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Brushed: horizontal lines
    for (let i = 0; i < 200; i++) {
      const y = Math.random() * size;
      ctx.strokeStyle = `rgba(${r - 20}, ${g - 20}, ${b - 20}, ${rand(0.05, 0.2)})`;
      ctx.lineWidth = rand(0.3, 1);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y + rand(-1, 1));
      ctx.stroke();
    }
  }

  return toTexture(canvas);
}

// ========== PLACEHOLDER ==========

export function generatePlaceholderTexture(params = {}) {
  const { size = 64, color = 0xff00ff, alpha = 1 } = params;
  const { canvas, ctx } = createCanvas(size);
  ctx.fillStyle = `rgba(${(color >> 16) & 0xff}, ${(color >> 8) & 0xff}, ${color & 0xff}, ${alpha})`;
  ctx.fillRect(0, 0, size, size);
  return toTexture(canvas);
}

// Default export
export default {
  generateWoodTexture,
  generateConcreteTexture,
  generateAsphaltTexture,
  generateFabricTexture,
  generateTatamiTexture,
  generateStoneTexture,
  generateLeafTexture,
  generatePaperTexture,
  generateWaterNormal,
  generateTileTexture,
  generatePlasticTexture,
  generateMetalTexture,
  generatePlaceholderTexture
};

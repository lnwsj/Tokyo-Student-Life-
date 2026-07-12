/**
 * environment_builder.js
 * 
 * Build environment for each zone — ground, vegetation, props
 * - Procedural Three.js geometry
 * - Materials from 05_MATERIALS/PBR_palette.json
 * - Scatter rules from scatter_rules.json
 * 
 * Usage:
 *   import { buildEnvironment, disposeEnvironment } from './environment_builder.js';
 *   const env = buildEnvironment(scene, 5, { camera });
 *   // ... later
 *   disposeEnvironment(env);
 */

import * as THREE from 'three';
import { getMaterial } from '../05_MATERIALS/material_factory.js';
import scatterRules from './scatter_rules.json' assert { type: 'json' };

// ========== HELPERS ==========

function rand(min, max) { return Math.random() * (max - min) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ========== GROUND ==========

function buildGround(env, zone, config) {
  const { bounds, ground } = config;
  const group = new THREE.Group();
  group.name = 'ground';

  // Main ground plane
  const mainMat = getMaterial(ground.primary_material || ground.material);
  const mainGround = new THREE.Mesh(
    new THREE.PlaneGeometry(bounds.width, bounds.depth),
    mainMat
  );
  mainGround.rotation.x = -Math.PI / 2;
  mainGround.receiveShadow = true;
  group.add(mainGround);

  // Secondary area (different material)
  if (ground.secondary_material) {
    const secMat = getMaterial(ground.secondary_material);
    const secGround = new THREE.Mesh(
      new THREE.PlaneGeometry(bounds.width * 0.4, bounds.depth * 0.3),
      secMat
    );
    secGround.rotation.x = -Math.PI / 2;
    secGround.position.set(-bounds.width * 0.2, 0.01, -bounds.depth * 0.2);
    secGround.receiveShadow = true;
    group.add(secGround);
  }

  env.add(group);
  return group;
}

function buildWater(env, config) {
  const { position, size, type } = config;
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(size.width, size.depth, 32, 32),
    getMaterial('water.pond')
  );
  water.rotation.x = -Math.PI / 2;
  water.position.set(position.x, 0.05, position.z);
  water.receiveShadow = true;
  water.name = `${type}_water`;
  env.add(water);

  // Add koi fish (simple geometry)
  if (type === 'pond') {
    for (let i = 0; i < 5; i++) {
      const koi = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 6),
        new THREE.MeshStandardMaterial({
          color: pick(['#FF6B35', '#F5F0E6', '#FFD194'])
        })
      );
      koi.scale.set(2, 0.6, 0.8);
      koi.position.set(
        position.x + rand(-size.width / 2 + 0.5, size.width / 2 - 0.5),
        0.1,
        position.z + rand(-size.depth / 2 + 0.5, size.depth / 2 - 0.5)
      );
      koi.userData.swimRadius = rand(2, 4);
      koi.userData.swimSpeed = rand(0.3, 0.8);
      koi.userData.swimPhase = rand(0, Math.PI * 2);
      koi.name = 'koi';
      env.add(koi);
    }
  }
  return water;
}

// ========== VEGETATION ==========

function buildSakuraTree(env, position, scale = 1) {
  const tree = new THREE.Group();
  tree.name = 'sakura_tree';

  // Trunk
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.25, 3, 8),
    getMaterial('wood.japanese_oak', { variation: 0.3, wear: 0.1 })
  );
  trunk.position.y = 1.5;
  trunk.castShadow = true;
  tree.add(trunk);

  // Canopy (irregular icosahedron)
  const canopy = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2, 1),
    getMaterial('leaf.sakura')
  );
  canopy.position.y = 3.5;
  canopy.scale.set(1.1, 0.7, 1.1);
  canopy.castShadow = true;
  tree.add(canopy);

  // Random rotation
  tree.rotation.y = rand(0, Math.PI * 2);
  tree.scale.setScalar(scale * rand(0.9, 1.1));
  tree.position.copy(position);
  env.add(tree);
  return tree;
}

function buildGinkgoTree(env, position, scale = 1) {
  const tree = new THREE.Group();
  tree.name = 'ginkgo_tree';

  // Trunk
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.3, 4, 8),
    getMaterial('wood.shrine', { variation: 0.2 })
  );
  trunk.position.y = 2;
  trunk.castShadow = true;
  tree.add(trunk);

  // Canopy
  const canopy = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 12, 8),
    getMaterial('leaf.ginkgo')
  );
  canopy.position.y = 4.5;
  canopy.scale.set(1, 0.7, 1);
  canopy.castShadow = true;
  tree.add(canopy);

  tree.rotation.y = rand(0, Math.PI * 2);
  tree.scale.setScalar(scale * rand(0.95, 1.1));
  tree.position.copy(position);
  env.add(tree);
  return tree;
}

function buildBambooCluster(env, position, count = 5) {
  const cluster = new THREE.Group();
  cluster.name = 'bamboo_cluster';

  for (let i = 0; i < count; i++) {
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.06, rand(5, 7), 6),
      getMaterial('wood.bamboo')
    );
    stem.position.set(
      rand(-0.4, 0.4),
      rand(2.5, 3.5),
      rand(-0.4, 0.4)
    );
    stem.castShadow = true;
    cluster.add(stem);

    // Leaves (simple)
    for (let j = 0; j < 3; j++) {
      const leaf = new THREE.Mesh(
        new THREE.PlaneGeometry(0.4, 0.05),
        getMaterial('leaf.bamboo')
      );
      leaf.position.set(
        stem.position.x + rand(-0.3, 0.3),
        stem.position.y + rand(-2, 1),
        stem.position.z + rand(-0.3, 0.3)
      );
      leaf.rotation.set(rand(-0.3, 0.3), rand(0, Math.PI * 2), rand(-0.3, 0.3));
      cluster.add(leaf);
    }
  }

  cluster.position.copy(position);
  env.add(cluster);
  return cluster;
}

function buildDeciduousTree(env, position, scale = 1) {
  const tree = new THREE.Group();
  tree.name = 'deciduous_tree';

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.15, 2.5, 6),
    getMaterial('wood.japanese_oak', { variation: 0.4 })
  );
  trunk.position.y = 1.25;
  trunk.castShadow = true;
  tree.add(trunk);

  const canopy = new THREE.Mesh(
    new THREE.SphereGeometry(1.8, 8, 6),
    new THREE.MeshStandardMaterial({ color: pick(['#7A9A6A', '#6B8E5A', '#A8C490']) })
  );
  canopy.position.y = 3;
  canopy.scale.set(1, 0.8, 1);
  canopy.castShadow = true;
  tree.add(canopy);

  tree.rotation.y = rand(0, Math.PI * 2);
  tree.scale.setScalar(scale);
  tree.position.copy(position);
  env.add(tree);
  return tree;
}

function buildHedge(env, position, length = 2) {
  const hedge = new THREE.Mesh(
    new THREE.BoxGeometry(length, 0.8, 0.5, 4, 2, 2),
    new THREE.MeshStandardMaterial({ color: '#6B8E5A' })
  );
  // Apply slight vertex displacement
  const pos = hedge.geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, pos.getY(i) + rand(-0.05, 0.05));
  }
  pos.needsUpdate = true;
  hedge.position.copy(position);
  hedge.castShadow = true;
  hedge.receiveShadow = true;
  env.add(hedge);
  return hedge;
}

function buildGrass(env, bounds, density) {
  if (density === 0) return null;
  const grassGeo = new THREE.PlaneGeometry(0.05, 0.3);
  const grassMat = new THREE.MeshStandardMaterial({
    color: '#A8C490',
    side: THREE.DoubleSide,
    transparent: true,
    alphaTest: 0.5
  });
  const grass = new THREE.InstancedMesh(grassGeo, grassMat, density);
  grass.name = 'grass';

  for (let i = 0; i < density; i++) {
    const matrix = new THREE.Matrix4();
    matrix.setPosition(
      rand(-bounds.width / 2, bounds.width / 2),
      0.15,
      rand(-bounds.depth / 2, bounds.depth / 2)
    );
    matrix.scale(new THREE.Vector3(1, rand(0.5, 1.5), 1));
    grass.setMatrixAt(i, matrix);
  }
  grass.instanceMatrix.needsUpdate = true;
  env.add(grass);
  return grass;
}

function buildVegetation(env, zone, config) {
  const { bounds } = scatterRules.zones[zone];
  const veg = new THREE.Group();
  veg.name = 'vegetation';

  // Trees
  for (let i = 0; i < config.sakura; i++) {
    buildSakuraTree(veg, new THREE.Vector3(
      rand(-bounds.width / 2 + 5, bounds.width / 2 - 5),
      0,
      rand(-bounds.depth / 2 + 5, bounds.depth / 2 - 5)
    ));
  }
  for (let i = 0; i < config.ginkgo; i++) {
    buildGinkgoTree(veg, new THREE.Vector3(
      rand(-bounds.width / 2 + 5, bounds.width / 2 - 5),
      0,
      rand(-bounds.depth / 2 + 5, bounds.depth / 2 - 5)
    ));
  }
  for (let i = 0; i < config.deciduous; i++) {
    buildDeciduousTree(veg, new THREE.Vector3(
      rand(-bounds.width / 2 + 5, bounds.width / 2 - 5),
      0,
      rand(-bounds.depth / 2 + 5, bounds.depth / 2 - 5)
    ));
  }
  for (let i = 0; i < config.bamboo; i++) {
    buildBambooCluster(veg, new THREE.Vector3(
      rand(-bounds.width / 2 + 5, bounds.width / 2 - 5),
      0,
      rand(-bounds.depth / 2 + 5, bounds.depth / 2 - 5)
    ), 3 + Math.floor(rand(0, 4)));
  }
  for (let i = 0; i < config.hedge; i++) {
    buildHedge(veg, new THREE.Vector3(
      rand(-bounds.width / 2 + 10, bounds.width / 2 - 10),
      0.4,
      rand(-bounds.depth / 2 + 10, bounds.depth / 2 - 10)
    ));
  }
  buildGrass(veg, bounds, config.grass_density || 0);

  env.add(veg);
  return veg;
}

// ========== ROCKS ==========

function buildRocks(env, bounds, count, minSize, maxSize) {
  const rocks = new THREE.Group();
  rocks.name = 'rocks';

  for (let i = 0; i < count; i++) {
    const size = rand(minSize, maxSize);
    const rock = new THREE.Mesh(
      new THREE.IcosahedronGeometry(size, 0),
      getMaterial('concrete.sidewalk', { variation: 0.6 })
    );
    rock.scale.set(rand(0.8, 1.2), rand(0.4, 0.7), rand(0.8, 1.2));
    rock.position.set(
      rand(-bounds.width / 2 + 5, bounds.width / 2 - 5),
      size * 0.3,
      rand(-bounds.depth / 2 + 5, bounds.depth / 2 - 5)
    );
    rock.rotation.set(rand(0, Math.PI), rand(0, Math.PI), rand(0, Math.PI));
    rock.castShadow = true;
    rock.receiveShadow = true;
    rocks.add(rock);
  }
  env.add(rocks);
  return rocks;
}

// ========== PROPS ==========

function buildBench(env, position) {
  const bench = new THREE.Group();
  bench.name = 'bench';

  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.05, 0.4),
    getMaterial('wood.japanese_oak', { wear: 0.2 })
  );
  seat.position.y = 0.45;
  seat.castShadow = true;
  bench.add(seat);

  for (let i = -1; i <= 1; i += 2) {
    const leg = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.45, 0.4),
      getMaterial('metal.brushed_aluminum')
    );
    leg.position.set(i * 0.6, 0.225, 0);
    leg.castShadow = true;
    bench.add(leg);
  }

  bench.position.copy(position);
  bench.rotation.y = rand(0, Math.PI * 2);
  env.add(bench);
  return bench;
}

function buildVendingMachine(env, position) {
  const vending = new THREE.Group();
  vending.name = 'vending_machine';

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 1.8, 0.6),
    getMaterial('plastic.vending_machine', { wear: 0.15 })
  );
  body.position.y = 0.9;
  body.castShadow = true;
  vending.add(body);

  // Window (emissive display)
  const win = new THREE.Mesh(
    new THREE.PlaneGeometry(0.6, 1.0),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: pick([0xFFD194, 0xE8B4BC, 0xB8DCE6]),
      emissiveIntensity: 0.3
    })
  );
  win.position.set(0, 1.0, 0.31);
  vending.add(win);

  // Button panel
  const buttons = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.3),
    getMaterial('metal.brushed_aluminum')
  );
  buttons.position.set(0.2, 0.5, 0.31);
  vending.add(buttons);

  vending.position.copy(position);
  vending.rotation.y = pick([0, Math.PI]);
  env.add(vending);
  return vending;
}

function buildTrashCan(env, position) {
  const trash = new THREE.Group();
  trash.name = 'trash_can';

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.8, 12),
    getMaterial('metal.brushed_aluminum', { wear: 0.2 })
  );
  body.position.y = 0.4;
  body.castShadow = true;
  trash.add(body);

  const lid = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    getMaterial('metal.brushed_aluminum')
  );
  lid.position.y = 0.8;
  trash.add(lid);

  trash.position.copy(position);
  env.add(trash);
  return trash;
}

function buildBicycleParked(env, position) {
  const bike = new THREE.Group();
  bike.name = 'bicycle';

  // Frame (simple)
  const frame = new THREE.Mesh(
    new THREE.TorusGeometry(0.4, 0.02, 6, 12, Math.PI),
    getMaterial('metal.brushed_aluminum')
  );
  frame.position.y = 0.4;
  frame.rotation.x = Math.PI / 2;
  bike.add(frame);

  // Wheels
  for (let i = -1; i <= 1; i += 2) {
    const wheel = new THREE.Mesh(
      new THREE.TorusGeometry(0.25, 0.02, 6, 12),
      new THREE.MeshStandardMaterial({ color: 0x2A2A2A })
    );
    wheel.position.set(i * 0.3, 0.25, 0);
    wheel.rotation.y = Math.PI / 2;
    bike.add(wheel);
  }

  bike.position.copy(position);
  bike.rotation.y = rand(0, Math.PI * 2);
  env.add(bike);
  return bike;
}

function buildPlanter(env, position) {
  const planter = new THREE.Group();
  planter.name = 'planter';

  const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.3, 0.4),
    getMaterial('ceramic.tiles', { variation: 0.3 })
  );
  box.position.y = 0.15;
  box.castShadow = true;
  planter.add(box);

  const plant = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 6, 4),
    new THREE.MeshStandardMaterial({ color: '#6B8E5A' })
  );
  plant.position.y = 0.4;
  plant.castShadow = true;
  planter.add(plant);

  planter.position.copy(position);
  env.add(planter);
  return planter;
}

function buildStoneLantern(env, position) {
  const lantern = new THREE.Group();
  lantern.name = 'stone_lantern';

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.25, 0.3, 6),
    getMaterial('stone.torii_red', { variation: 0.3, wear: 0.3 })
  );
  base.position.y = 0.15;
  base.castShadow = true;
  lantern.add(base);

  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.8, 6),
    getMaterial('stone.torii_red', { variation: 0.3 })
  );
  post.position.y = 0.7;
  lantern.add(post);

  const light = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.3),
    new THREE.MeshStandardMaterial({
      color: 0xFFD194,
      emissive: 0xFFD194,
      emissiveIntensity: 0.5
    })
  );
  light.position.y = 1.25;
  lantern.add(light);

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 0.2, 4),
    getMaterial('stone.torii_red', { variation: 0.3 })
  );
  roof.position.y = 1.5;
  roof.rotation.y = Math.PI / 4;
  lantern.add(roof);

  lantern.position.copy(position);
  env.add(lantern);
  return lantern;
}

function buildWoodenBridge(env, position) {
  const bridge = new THREE.Group();
  bridge.name = 'wooden_bridge';

  // Planks
  for (let i = 0; i < 6; i++) {
    const plank = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.05, 0.25),
      getMaterial('wood.shrine', { wear: 0.3 })
    );
    plank.position.set(0, 0.1, -1 + i * 0.4);
    plank.castShadow = true;
    bridge.add(plank);
  }

  // Rails
  for (let i = -1; i <= 1; i += 2) {
    const rail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 2, 6),
      getMaterial('wood.shrine', { wear: 0.3 })
    );
    rail.rotation.z = Math.PI / 2;
    rail.position.set(i * 0.7, 0.3, 0);
    rail.rotation.x = 0;
    rail.rotation.z = Math.PI / 2;
    bridge.add(rail);
  }

  bridge.position.copy(position);
  env.add(bridge);
  return bridge;
}

function buildProps(env, zone, config) {
  const { bounds } = scatterRules.zones[zone];
  const props = new THREE.Group();
  props.name = 'props';

  // Helper: random position
  const randomPos = () => new THREE.Vector3(
    rand(-bounds.width / 2 + 5, bounds.width / 2 - 5),
    0,
    rand(-bounds.depth / 2 + 5, bounds.depth / 2 - 5)
  );

  // Build each prop type
  for (let i = 0; i < (config.bicycles_parked || 0); i++) {
    buildBicycleParked(props, randomPos());
  }
  for (let i = 0; i < (config.planters || 0); i++) {
    buildPlanter(props, randomPos());
  }
  for (let i = 0; i < (config.trash_cans || 0); i++) {
    buildTrashCan(props, randomPos());
  }
  for (let i = 0; i < (config.benches || 0); i++) {
    buildBench(props, randomPos());
  }
  for (let i = 0; i < (config.vending_machines || 0); i++) {
    buildVendingMachine(props, randomPos());
  }
  for (let i = 0; i < (config.stone_lanterns || 0); i++) {
    buildStoneLantern(props, randomPos());
  }
  if (config.wooden_bridge) {
    buildWoodenBridge(props, new THREE.Vector3(0, 0, 15));
  }

  env.add(props);
  return props;
}

// ========== MAIN ==========

/**
 * Build environment for a zone
 * @param {THREE.Scene} scene
 * @param {number} zone - 1-5
 * @param {Object} options
 * @returns {THREE.Group} environment group
 */
export function buildEnvironment(scene, zone, options = {}) {
  if (!scatterRules.zones[zone]) {
    throw new Error(`Unknown zone: ${zone}. Available: 1-5`);
  }

  const config = scatterRules.zones[zone];
  const env = new THREE.Group();
  env.name = `environment_zone_${zone}`;
  env.userData.zone = zone;

  // 1. Ground
  buildGround(env, zone, config);

  // 2. Water
  if (config.water) {
    buildWater(env, config.water);
  }

  // 3. Vegetation
  buildVegetation(env, zone, config.vegetation);

  // 4. Rocks
  if (config.rocks && config.rocks.count > 0) {
    buildRocks(env, config.bounds, config.rocks.count, config.rocks.min_size, config.rocks.max_size);
  }

  // 5. Props
  buildProps(env, zone, config.props);

  scene.add(env);
  return env;
}

/**
 * Dispose environment (free memory)
 */
export function disposeEnvironment(env) {
  env.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(m => m.dispose());
      } else {
        obj.material.dispose();
      }
    }
  });
  if (env.parent) env.parent.remove(env);
}

// Default export
export default { buildEnvironment, disposeEnvironment };

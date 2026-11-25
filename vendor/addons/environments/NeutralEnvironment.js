/* @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Adaptado de @google/model-viewer 4.4.0 (lib/three-components/EnvironmentScene.js):
 * mantida apenas a variante "neutral" (iluminacao padrao do model-viewer), como modulo ES
 * independente para usar com THREE.PMREMGenerator.fromScene(new NeutralEnvironment(), 0.04).
 */
import { BackSide, BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PointLight, Scene } from 'three';

const neutral = {
  topLight: { intensity: 400, position: [0.5, 14.0, 0.5] },
  room: { position: [0.0, 13.2, 0.0], scale: [31.5, 28.5, 31.5] },
  boxes: [
    { position: [-10.906, -1.0, 1.846], rotation: -0.195, scale: [2.328, 7.905, 4.651] },
    { position: [-5.607, -0.754, -0.758], rotation: 0.994, scale: [1.970, 1.534, 3.955] },
    { position: [6.167, -0.16, 7.803], rotation: 0.561, scale: [3.927, 6.285, 3.687] },
    { position: [-2.017, 0.018, 6.124], rotation: 0.333, scale: [2.002, 4.566, 2.064] },
    { position: [2.291, -0.756, -2.621], rotation: -0.286, scale: [1.546, 1.552, 1.496] },
    { position: [-2.193, -0.369, -5.547], rotation: 0.516, scale: [3.875, 3.487, 2.986] },
  ],
  lights: [
    { intensity: 80, position: [-14.0, 10.0, 8.0], scale: [0.1, 2.5, 2.5] },
    { intensity: 80, position: [-14.0, 14.0, -4.0], scale: [0.1, 2.5, 2.5] },
    { intensity: 23, position: [14.0, 12.0, 0.0], scale: [0.1, 5.0, 5.0] },
    { intensity: 16, position: [0.0, 9.0, 14.0], scale: [5.0, 5.0, 0.1] },
    { intensity: 80, position: [7.0, 8.0, -14.0], scale: [2.5, 2.5, 0.1] },
    { intensity: 80, position: [-7.0, 16.0, -14.0], scale: [2.5, 2.5, 0.1] },
    { intensity: 1, position: [0.0, 20.0, 0.0], scale: [0.1, 0.1, 0.1] },
  ],
};

export class NeutralEnvironment extends Scene {
  constructor() {
    super();
    this.position.y = -3.5;
    const geometry = new BoxGeometry();
    geometry.deleteAttribute('uv');
    const roomMaterial = new MeshStandardMaterial({ metalness: 0, side: BackSide });
    const boxMaterial = new MeshStandardMaterial({ metalness: 0 });
    const mainLight = new PointLight(0xffffff, neutral.topLight.intensity, 28, 2);
    mainLight.position.set(...neutral.topLight.position);
    this.add(mainLight);
    const room = new Mesh(geometry, roomMaterial);
    room.position.set(...neutral.room.position);
    room.scale.set(...neutral.room.scale);
    this.add(room);
    for (const box of neutral.boxes) {
      const m = new Mesh(geometry, boxMaterial);
      m.position.set(...box.position);
      m.rotation.set(0, box.rotation, 0);
      m.scale.set(...box.scale);
      this.add(m);
    }
    for (const light of neutral.lights) {
      const material = new MeshBasicMaterial();
      material.color.setScalar(light.intensity);
      const m = new Mesh(geometry, material);
      m.position.set(...light.position);
      m.scale.set(...light.scale);
      this.add(m);
    }
  }
}

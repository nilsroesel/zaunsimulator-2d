import { NORMAL_FENCE  as normal } from './normal.fence';
import { LASER_FENCE as laser } from './laser.fence';
import { WIRE_MESH_FENCE as wireMesh } from './wire-mesh.fence';
import { MODERN_BARBED_WIRE as modernBarbedWire } from './modern-barbed-wire.fence';
import { RUSTY_BARBED_WIRE as rustyBarbedWire } from './rusty-barbed-wire.fence';

export const NORMAL_FENCE = normal;
export const WIRE_MESH_FENCE = wireMesh;
export const LASER_FENCE = laser;
export const MODERN_BARBED_WIRE = modernBarbedWire;
export const RUSTY_BARBED_WIRE = rustyBarbedWire;

export const FENCES = [NORMAL_FENCE, LASER_FENCE, WIRE_MESH_FENCE, RUSTY_BARBED_WIRE, MODERN_BARBED_WIRE];

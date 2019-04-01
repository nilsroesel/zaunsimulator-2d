import { NORMAL_FENCE  as normal } from './normal.fence';
import { LASER_FENCE as laser } from './laser.fence';
import { WIRE_MESH_FENCE as wireMesh } from './wire-mesh.fence';

export const NORMAL_FENCE = normal;
export const WIRE_MESH_FENCE = wireMesh;
export const LASER_FENCE = laser;

export const FENCES = [NORMAL_FENCE, LASER_FENCE, WIRE_MESH_FENCE];

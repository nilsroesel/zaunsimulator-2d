import { FenceAsset } from '../../model/fence-asset';
import { Feature } from '../../model/feature';

export const WIRE_MESH_FENCE: FenceAsset = {
    name: 'Maschendrahtzaun',
    path: 'assets/fences/maschendrahtzaun-sprite.png',
    feature: Feature.FENCE_MESH_WIRE,
    price: 80
};

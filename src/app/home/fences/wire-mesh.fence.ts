import { FenceAsset } from '../../service/game-loader.service';
import { Feature } from '../../service/persistence.service';

export const WIRE_MESH_FENCE: FenceAsset = {
    name: 'Maschendrahtzaun',
    path: 'assets/fences/maschendrahtzaun-sprite.png',
    feature: Feature.FENCE_MESH_WIRE,
    price: 80
};

import { FenceAsset } from '../../service/game-loader.service';
import { Feature } from '../../service/persistence.service';

export const LASER_FENCE: FenceAsset = {
    name: 'Laserzaun',
    path: 'assets/fences/laserzaun-sprite.png',
    feature: Feature.FENCE_LASER,
    price: 150
};

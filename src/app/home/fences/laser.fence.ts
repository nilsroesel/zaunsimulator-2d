import { FenceAsset } from '../../model/fence-asset';
import { Feature } from '../../model/feature';

export const LASER_FENCE: FenceAsset = {
    name: 'Laserzaun',
    path: 'assets/fences/laserzaun-sprite.png',
    feature: Feature.FENCE_LASER,
    price: 150
};

import { Feature } from './feature';

export interface FeatureAsset {
    readonly isEnabled?: boolean;
    readonly price?: number;
    readonly feature: Feature;
}

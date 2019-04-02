import { FeatureAsset } from './feature-asset';
import { Asset } from './asset';
import { BehaviourObject } from './behaviour-object';

export interface LevelAsset extends Asset, FeatureAsset {
    readonly behaviours: Array<BehaviourObject>;
}

import { Component, OnInit } from '@angular/core';
import { GameLoaderService, LevelAsset } from '../service/game-loader.service';
import { Router } from '@angular/router';
import { LEVELS } from '../home/levels';
import { FeatureService, Feature } from '../service/feature.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public levels: Array<LevelAsset>;

  constructor( private gameLoaderService: GameLoaderService, private router: Router, private featureService: FeatureService ) {}

  ngOnInit() {
      const dbLoadedLevels: Array<Promise<LevelAsset>> = LEVELS.map(e => {
          return new Promise(resolve => {
              this.featureService.testFeature(e.feature).then(isEnabled => {
                  resolve(Object.assign({}, e, { isEnabled }));
              });
          });
      });

      Promise.all(dbLoadedLevels).then(resolvedLevels => this.levels = resolvedLevels);
  }

  selectLevel( asset: LevelAsset ) {
    this.gameLoaderService.setLevelAsset(asset);
    setTimeout( () => this.router.navigateByUrl('/game'), 100);
  }

  jumpOffToShop( feature: Feature ) {
      setTimeout( () => this.router.navigateByUrl('/shop'), 100);
  }
}

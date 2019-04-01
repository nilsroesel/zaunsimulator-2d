import { Component, OnInit } from '@angular/core';
import { GameLoaderService, LevelAsset } from '../service/game-loader.service';
import { Router } from '@angular/router';
import { DESERT, MEADOW } from '../home/levels';
import { Feature, PersistenceService } from '../service/persistence.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public levels: Array<LevelAsset>;

  constructor( private gameLoaderService: GameLoaderService, private router: Router, private persistenceService: PersistenceService ) {}

  ngOnInit() {
      const dbLoadedLevels: Array<Promise<LevelAsset>> = [DESERT].map(e => {
          return new Promise(resolve => {
              this.persistenceService.testFeature(e.feature).then(isEnabled => {
                  resolve(Object.assign({}, e, { isEnabled }));
              });
          });
      });

      Promise.all(dbLoadedLevels).then(resolvedLevel => {
          this.levels = [MEADOW]
              .map(e => Object.assign({}, e, { isEnabled: true }))
              .concat(resolvedLevel);
      });
  }

  selectLevel( asset: LevelAsset ) {
    this.gameLoaderService.setLevelAsset(asset);
    setTimeout( () => this.router.navigateByUrl('/game'), 100);
  }

  jumpOffToShop( feature: Feature ) {
      setTimeout( () => this.router.navigateByUrl('/shop'), 100);
  }
}

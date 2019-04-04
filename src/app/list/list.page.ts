import { Component, OnInit } from '@angular/core';
import { FeatureService, GameLoaderService } from '../service';
import { Router } from '@angular/router';
import { LevelAsset } from '../model/level-asset';
import { Feature } from '../model/feature';
import { FenceAsset } from '../model/fence-asset';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public levels: Array<LevelAsset>;

  public fences: Array<FenceAsset>;

  constructor( private gameLoaderService: GameLoaderService, private router: Router, private featureService: FeatureService ) {}

  ngOnInit() {
     this.featureService.loadLevels(levels => this.levels = levels);
     this.featureService.loadFences(fences => this.fences = fences.filter(fence => !!fence.isEnabled));
  }

  selectLevel( asset: LevelAsset ) {
    this.gameLoaderService.setLevelAsset(asset);
    setTimeout( () => this.router.navigateByUrl('/game'), 100);
  }

  jumpOffToShop( feature: Feature ) {
      setTimeout( () => this.router.navigateByUrl('/shop'), 100);
  }

  createSpriteSettings(path: string) {
      return Object.assign({}, {
          width: 1200,
          height: 100,
          frames: 6,
          frame: 0,
          zoomFactor: 0.75,
          animationStartFrame: 0,
          animationEndFrame: 4
      },  { path });
  }

  classChangeFactory( fence: FenceAsset ) {
      const this$ = this;
      return (classList) => (!!classList.contains('swiper-slide-active' ))
          && this$.gameLoaderService.setFenceAsset(fence);
  }

}

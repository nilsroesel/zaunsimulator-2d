import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SettingsService } from './service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Label.Levels',
            url: '/list',
            icon: 'assets/icon/list.svg'
        },
        {
            title: 'Label.Shop',
            url: '/shop',
            icon: 'assets/icon/shop.svg'
        },
        {
            title: 'Label.Settings',
            url: '/settings',
            icon: 'assets/icon/settings.svg'
        }
    ];

    constructor(
        private platform: Platform,
        private settingsService: SettingsService,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private translate: TranslateService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
          this.initializeTranslations();
        });
    }

    initializeTranslations() {
        this.translate.setDefaultLang('en');
        this.translate.addLangs(['de', 'dk']);
        this.settingsService.loadLanguageSettings();
    }
}

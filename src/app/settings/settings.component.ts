import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../service';
import { Language } from '../model/language';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

    private languages = [
        {
            icon: './assets/icon/united-kingdom.svg',
            name: 'Label.Language.English',
            key: Language.ENGLISH,
            active: false
        },
        {
            icon: './assets/icon/germany.svg',
            name: 'Label.Language.German',
            key: Language.GERMAN,
            active: false
        },
        {
            icon: './assets/icon/denmark.svg',
            name: 'Label.Language.Danish',
            key: Language.DANISH,
            active: false
        }
    ];


    constructor( private translate: TranslateService, private settingsService: SettingsService ) { }

    ngOnInit() {
      this.loadLanguages();
    }

    loadLanguages() {
        this.languages = this.languages.map(language => {
            language.active = (this.translate.currentLang || this.translate.getDefaultLang()) === language.key;
            return language;
        });
    }

    switchLanguage( key: Language ) {
      this.settingsService.saveLanguageSettings(key, () => this.loadLanguages());
    }

}

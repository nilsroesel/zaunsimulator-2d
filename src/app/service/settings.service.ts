import { Injectable } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../model/language';

@Injectable()
export class SettingsService {

    constructor( private persistenceService: PersistenceService, private translation: TranslateService ) {}

    loadLanguageSettings() {
        this.persistenceService.getProperty('LANGUAGE').then(language =>
            this.setTranslations(language || this.translation.getDefaultLang()));
    }

    saveLanguageSettings( language: Language, callback: () => void ) {
        const onFulfilled = !!callback ? callback : () => {};
        this.setTranslations(language);
        this.persistenceService.setProperty('LANGUAGE', language).then(onFulfilled);
    }

    setTranslations( language: string ) {
        this.translation.getLangs().filter(l => l === language).forEach(l => this.translation.use(l));
    }

}

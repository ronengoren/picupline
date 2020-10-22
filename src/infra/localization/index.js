import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import {plural} from 'pluralize';
import indefinite from 'indefinite';
import {en, he, fr, esmx} from '../../localization/';
import {
  sharedEn,
  sharedHe,
  sharedFr,
  sharedEsmx,
} from '../../localization/shared';
import {
  user as userLocalStorage,
  misc as miscLocalStorage,
} from '../../infra/localStorage';
import {get} from '../../infra/utils';
import {updateMomentLocale} from '../../infra/utils/dateTimeUtils';
import {
  addSpaceOnCapitalsAndCapitalize,
  snakeToCamel,
  isRTL as checkIfRTLText,
} from '../../infra/utils/stringUtils';
import {getCountryImageByCode, getTranslatedName} from '../../vars/countries';
class Localization {
  init() {
    I18n.fallbacks = true;
    I18n.missingTranslation = (scope) => {
      const [lastTranslationKey] = scope.split('.').reverse();
      const fallback = addSpaceOnCapitalsAndCapitalize(
        snakeToCamel(lastTranslationKey),
      );
      return fallback;
    };

    const languagesMap = {
      en: {...en, shared: sharedEn},
      fr: {...fr, shared: sharedFr},
      'fr-be': {...fr, shared: sharedFr},
      'fr-ca': {...fr, shared: sharedFr},
      'fr-lu': {...fr, shared: sharedFr},
      'fr-ch': {...fr, shared: sharedFr},
      he: {...he, shared: sharedHe},
      es: {...esmx, shared: sharedEsmx},
      esmx: {...esmx, shared: sharedEsmx},
      'es-ar': {...esmx, shared: sharedEsmx},
      'es-bo': {...esmx, shared: sharedEsmx},
      'es-cl': {...esmx, shared: sharedEsmx},
      'es-co': {...esmx, shared: sharedEsmx},
      'es-cr': {...esmx, shared: sharedEsmx},
      'es-do': {...esmx, shared: sharedEsmx},
      'es-ec': {...esmx, shared: sharedEsmx},
      'es-sv': {...esmx, shared: sharedEsmx},
      'es-gt': {...esmx, shared: sharedEsmx},
      'es-hn': {...esmx, shared: sharedEsmx},
      'es-mx': {...esmx, shared: sharedEsmx},
      'es-ni': {...esmx, shared: sharedEsmx},
      'es-pa': {...esmx, shared: sharedEsmx},
      'es-py': {...esmx, shared: sharedEsmx},
      'es-pe': {...esmx, shared: sharedEsmx},
      'es-pr': {...esmx, shared: sharedEsmx},
      'es-uy': {...esmx, shared: sharedEsmx},
      'es-ve': {...esmx, shared: sharedEsmx},
    };

    const defaultLanguage = 'en';
    const {languageTag} = RNLocalize.findBestAvailableLanguage(
      Object.keys(languagesMap),
    ) || {languageTag: defaultLanguage};

    I18n.translations = languagesMap;
    this.setLocale(languageTag);
    this.conditionalyApplyPersistLanguage();
  }

  async conditionalyApplyPersistLanguage() {
    const misc = (await miscLocalStorage.get()) || {};
    const user = (await userLocalStorage.get()) || {};
    const userLocale = get(user, 'settings.language');
    const miscLocale = get(misc, 'language');
    if (userLocale || miscLocale) {
      this.setLocale(userLocale || miscLocale);
    }
  }

  changeLocalization = ({locale}) => {
    if (locale in I18n.translations) {
      miscLocalStorage.update({language: locale});
      this.setLocale(locale);
    }
  };

  changeUserLocalization = ({locale}) => {
    if (locale in I18n.translations) {
      userLocalStorage.updateSettings({language: locale});
      this.setLocale(locale);
    }
  };

  t = I18n.t.bind(I18n);

  p = I18n.p.bind(I18n);

  setLocale = (newLocale) => {
    I18n.locale = newLocale || 'en';
    updateMomentLocale();
  };

  getLocale = () => I18n.currentLocale();

  getLanguageName(language) {
    return this.languageNames[language];
  }

  isRtl = (textSample) => {
    if (typeof textSample === 'string') {
      return checkIfRTLText(textSample);
    }
    const rtlLanguages = [this.languageInitials.he.toLowerCase()];
    return rtlLanguages.includes(this.getLocale());
  };

  languageNames = {
    en: 'English',
    he: 'עברית',
    fr: 'Français',
    es: 'Español',
    'es-mx': 'Español',
    esmx: 'Español',
  };

  getLanguageInitials(locale) {
    return this.languageInitials[locale] || locale;
  }

  languageInitials = {
    en: 'EN',
    he: 'HE',
    fr: 'FR',
    es: 'ES',
    'es-mx': 'ES',
    esmx: 'ES',
  };

  languagesDescriptorArray = [
    {
      id: 'en',
      text: this.getLanguageName('en'),
      icon: getCountryImageByCode(840),
    },
    {
      id: 'he',
      text: this.getLanguageName('he'),
      icon: getCountryImageByCode(376),
    },
    {
      id: 'fr',
      text: this.getLanguageName('fr'),
      icon: getCountryImageByCode(250),
    },
    {
      id: 'es-mx',
      text: this.getLanguageName('es-mx'),
      icon: getCountryImageByCode(724),
    },
  ];

  getTranslatedCountryName = ({countryCode, countryName}) => {
    const language = this.getLocale();
    return getTranslatedName({countryCode, countryName, language});
  };

  getLinkWordPlaceholder = ({linkTo, forceLanguage}) => {
    if (!linkTo) return undefined;
    const targetLanguage = forceLanguage || I18n.currentLocale();
    const isPlural = plural(linkTo) === linkTo;
    switch (targetLanguage) {
      case 'fr': {
        if (isPlural) {
          return 'Aux';
        } else if (
          ['A', 'E', 'I', 'O', 'U', 'Y'].includes(linkTo[0].toUpperCase())
        ) {
          return 'En';
        } else {
          return 'Au';
        }
      }
      case 'en': {
        return indefinite(linkTo, {articleOnly: true});
      }
      default:
        return '';
    }
  };
}

export default new Localization();

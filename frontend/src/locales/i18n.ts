import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { auth as authEs, common as commonEs } from './es';
import { auth as authEn, common as commonEn } from './en';

export type Namespace = 'common' | 'auth' | 'dashboard';
export type Language = (typeof supportedLngs)[number];

const defaultNs: Namespace = 'common';

export const fallbackLng = 'es';
export const supportedLngs = ['en', 'es'];
export const defaultLanguage = fallbackLng;

const resources = {
	en: {
		auth: authEn,
		common: commonEn,
	},
	es: {
		auth: authEs,
		common: commonEs,
	},
};

export const getOptions = (lng = defaultLanguage) => ({
	supportedLngs,
	fallbackLng,
	lng,
	defaultNs,
	ns: Object.keys(resources[fallbackLng]) as Namespace[],
	resources,
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: true,
	},
});

void i18n.use(LanguageDetector).use(initReactI18next).init(getOptions());

declare module 'react-i18next' {
	interface CustomTypeOptions {
		defaultNS: 'common';
		resources: {
			auth: typeof authEs;
			common: typeof commonEs;
		};
	}
}

export default i18n;

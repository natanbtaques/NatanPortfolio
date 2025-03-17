import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'pt','es'],
  defaultLocale: 'en',
  localeDetection: false,
});


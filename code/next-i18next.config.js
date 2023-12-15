module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
    localeDetection: false
  },
  reloadOnPrerender: process.env.APP_ENV === 'development'
}

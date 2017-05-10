/**
 * Configuration for head elements added during the creation of index.html.
 *
 * All href attributes are added the publicPath (if exists) by default.
 * You can explicitly hint to prefix a publicPath by setting a boolean value to a key that has
 * the same name as the attribute you want to operate on, but prefix with =
 *
 * Example:
 * { name: 'msapplication-TileImage', content: '/assets/icon/ms-icon-144x144.png', '=content': true },
 * Will prefix the publicPath to content.
 *
 * { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icon/apple-icon-57x57.png', '=href': false },
 * Will not prefix the publicPath on href (href attributes are added by default
 *
 */
module.exports = {
  link: [
    /** <link> tags for fonts **/
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic', '=href': false },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons', '=href': false },

    /** realfavicongenerator.net **/
    { rel: 'apple-touch-icon', sizes: '180x180', href: 'assets/icon/apple-touch-icon.png' },

    { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'assets/icon/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'assets/icon/favicon-16x16.png' },

    { rel: 'manifest', href: 'assets/icon/manifest.json' },
    { rel: 'mask-icon', href: 'assets/icon/safari-pinned-tab.svg', color: '#673ab7' },
    { rel: 'shortcut icon', href: 'assets/icon/favicon.ico' }
  ],
  meta: [
    { name: 'msapplication-config', content: 'assets/icon/browserconfig.xml' },

    { name: 'theme-color', content: '#673ab7' },
    { name: 'mobile-web-app-capable', content: 'yes' },

    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
  ]
};

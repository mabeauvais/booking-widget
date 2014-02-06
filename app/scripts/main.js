'use strict';

(function() {

  var button = document.getElementById('cg-booking-widget');

  var isDev = function() {
    var env = button.getAttribute('data-env');
    return (env === 'dev') ? true : false;
  };

  var tldLookup = {
    'CA': 'ca',
    'US': 'com',
    'FR': 'fr'
  };

  var getTld = function(countryCode) {
    return tldLookup[countryCode];
  };

  var parseLocale = function(locale) {
    var info = locale.split('-');
    var tld  = getTld(info[1]);

    return {
      tld: tld,
      lang: info[0]
    };
  };

  var buildUrl = function(clubId, tld, lang) {
    if (isDev()) {
      return 'http://chronodev.' + tld + ':5000/' + lang + '/golf_clubs/widget/' + clubId;
    } else {
      return 'http://chronogolf.' + tld + '/' + lang + '/golf_clubs/widget/' + clubId;
    }
  };

  var buildIFrame = function(url) {
    var iframe = document.createElement('iframe');

    iframe.src         = url;
    iframe.scrolling   = 'auto';
    iframe.width       = '33%';
    iframe.height      = '100%';

    document.body.appendChild(iframe);
  };


  var main = function() {

    var clubId = button.getAttribute('data-id');
    var locale = button.getAttribute('data-locale');

    var I18n = parseLocale(locale);
    var url  = buildUrl(clubId, I18n.tld, I18n.lang);

    buildIFrame(url);

    // 3. Break out the of the page when booking is submitted
  };

  main();
})();

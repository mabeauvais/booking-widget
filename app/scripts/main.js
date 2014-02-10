'use strict';

(function() {

  var wrapper = document.getElementById('cg-booking-widget');
  var button  = document.getElementById('cg-booking-button');

  var isDev = function() {
    var env = wrapper.getAttribute('data-env');
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

  var toggleWidget = function() {
    // var el = document.getElementById('cg-booking-frame');

    // if (el.style.display === 'none') {
    //   el.style.display = 'block';
    // } else {
    //   el.style.display = 'none';
    // }
  };

  var buildIFrame = function(url) {
    var iframe = document.createElement('iframe');

    iframe.id            = 'cg-booking-frame';
    iframe.src           = url;
    // iframe.style.display = 'none';
    iframe.scrolling     = 'auto';
    iframe.width         = '33%';
    iframe.height        = '100%';
    iframe.marginHeight  = '0';
    iframe.marginWidth   = '0';
    iframe.frameBorder   = '0';

    wrapper.appendChild(iframe);
  };


  var main = function() {

    var clubId = wrapper.getAttribute('data-id');
    var locale = wrapper.getAttribute('data-locale');

    var I18n = parseLocale(locale);
    var url  = buildUrl(clubId, I18n.tld, I18n.lang);

    buildIFrame(url);

    button.onclick = toggleWidget;

    // 3. Break out the of the page when booking is submitted
  };

  main();
})();

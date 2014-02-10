'use strict';

// 3. add/remove class when button is clicked

(function() {

  var wrapper = document.getElementById('cg-booking-widget');

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

  var listenForCallback = function(url) {
    var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    eventer(messageEvent, function (e) {
      if (e.data === 'closeIframe') {
        toggleWidget();
        document.getElementById('cg-booking-frame').remove();
        buildIFrame(url);
      }
    }, false);
  };

  var toggleWidget = function() {
    var el = document.getElementById('cg-booking-widget');
    var classNames = el.className.split(' ');
    var isShown = (classNames.indexOf('cg--show') === -1) ? false : true;

    if (isShown === false) {
      el.setAttribute('class', classNames[0] + ' ' + 'cg--show');
    } else {
      el.setAttribute('class', classNames[0]);
    }

    return false;
  };

  var buildIFrame = function(url) {
    var iframe = document.createElement('iframe');

    iframe.id            = 'cg-booking-frame';
    iframe.src           = url;
    iframe.scrolling     = 'auto';
    iframe.width         = '33%';
    iframe.height        = '100%';
    iframe.marginHeight  = '0';
    iframe.marginWidth   = '0';
    iframe.frameBorder   = '0';

    wrapper.appendChild(iframe);
  };

  var buildImg = function(lang) {
    var imgUrl = 'images/cg-booking-button-' + lang + '.png';
    var image = document.createElement('img');

    image.src = imgUrl;

    return image;
  };

  var buildButton = function(lang) {
    var button   = document.createElement('a');
    var image = buildImg(lang);

    button.id = 'cg-booking-button';
    button.href = '';
    button.appendChild(image);
    wrapper.appendChild(button);
    return button;
  };

  var main = function() {

    var clubId = wrapper.getAttribute('data-id');
    var locale = wrapper.getAttribute('data-locale');

    var I18n = parseLocale(locale);
    var url  = buildUrl(clubId, I18n.tld, I18n.lang);

    var button = buildButton(I18n.lang);
    buildIFrame(url);
    button.onclick = toggleWidget;
    listenForCallback(url);

  };

  main();
})();

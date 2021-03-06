/*
 * Chronogolf Booking Widget
 * http://www.chronogolf.com/
 *
 * Copyright (c) 2015 Chronogolf Inc.
*/

(function BookingWidget() {
  'use strict';

  var wrapper      = document.getElementById('cg-booking-widget');

  var clubId = wrapper.getAttribute('data-id');
  var locale = wrapper.getAttribute('data-locale') || 'en-US';

  var iFrameLoaded = false;
  var body         = document.getElementsByTagName('body')[0];
  var amazonUrl    = '/scripts/chronogolf/styles/';
  var altText      = 'Golf Online Booking - Chronogolf';

  var I18n, url, button;

  var init = function() {

    I18n   = parseLocale(locale);
    url    = buildUrl(clubId, I18n.tld, I18n.lang, 'widget');
    button = buildButton(clubId, I18n);

    if (!isDev()) {
      loadCSS(amazonUrl);
    }

    if(!mobileBrowser()) {
      button.onmouseover = function() {
        buildIFrame(url);
        return false;
      };
      button.onclick = button.ontouchend = function() {
        buildIFrame(url);
        toggleWidget();
        return false;
      };
    }

    setPosition();
    listenForCallback();
  }

  var isDev = function() {
    var env = wrapper.getAttribute('data-env');
    return (env === 'dev') ? true : false;
  };

  var isStaging = function() {
    var env = wrapper.getAttribute('data-env');
    return (env === 'staging') ? true : false;
  };

  var tldLookup = {
    'CA': 'ca',
    'US': 'com',
    'FR': 'fr',
    'ES': 'es',
    'MA': 'ma'
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

  var getI18n = function() {
    var locale = wrapper.getAttribute('data-locale') || 'en-US';
    return parseLocale(locale);
  };

  var getPoweredURL = function() {
    var i18n = getI18n();
    var urlLang = '';
    if (i18n.lang === 'fr' && i18n.tld === 'ca') {
      urlLang = '/' + i18n.lang;
    }
    return 'http://pro.chronogolf.' + i18n.tld + urlLang + '?utm_source=booking-widget&utm_medium=inbound&utm_campaign=powered-by-chronogolf-pro';
  };

  var getPoweredTitle = function() {
    var text = {
      'en': 'Powered by Chronogolf PRO',
      'fr': 'Propulsé par Chronogolf PRO',
      'es': 'Provisto por Chronogolf PRO'
    };
    return text[getI18n().lang];
  };

  var buildUrl = function(clubId, tld, lang, action) {
    var url = 'http://';
    if (isDev()) {
      url += 'chronodev.' + tld + ':5000';
    } else if (isStaging()) {
      url += 'staging.chronogolf.' + tld;
    } else {
      url += 'www.chronogolf.' + tld;
    }
    url += '/' + lang + '/club/' + clubId + '/' + action;
    url += '/#/?source=club_website';
    return url;
  };

  var listenForCallback = function() {
    var eventMethod  = window.addEventListener ? 'addEventListener' : 'attachEvent';
    var eventer      = window[eventMethod];
    var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    eventer(messageEvent, function (e) {
      if (e.data === 'closeIframe') {
        toggleWidget();
      }
    }, false);
  };

  var toggleWidget = function() {
    var classNames = wrapper.className.split(' ');
    var isShown    = (classNames.indexOf('cg--show') === -1) ? false : true;

    if (isShown === false) {
      wrapper.setAttribute('class', classNames[0] + ' ' + 'cg--show');
      button.setAttribute('class', classNames[0] + ' ' + 'cg--show');
    } else {
      wrapper.setAttribute('class', classNames[0]);
      button.setAttribute('class', classNames[0]);
    }
  };

  var buildIFrame = function(url) {
    if(iFrameLoaded){ return; } else { iFrameLoaded = true; }

    var iframe = document.createElement('iframe');

    iframe.id            = 'cg-booking-frame';
    iframe.src           = url;
    iframe.scrolling     = 'auto';
    iframe.width         = '320';
    iframe.height        = '100%';
    iframe.marginHeight  = '0';
    iframe.marginWidth   = '0';
    iframe.frameBorder   = '0';

    var poweredBy = document.createElement('a');

    poweredBy.id        = 'cg-booking-powered';
    poweredBy.href      = getPoweredURL();
    poweredBy.title     = getPoweredTitle();
    poweredBy.target    = '_blank';
    poweredBy.innerText = getPoweredTitle();

    wrapper.appendChild(iframe);
    wrapper.appendChild(poweredBy);
  };

  var buildImg = function(lang) {
    var imgUrl = '../images/cg-booking-button-' + lang + '@2x.png';
    if (!isDev()) {
      imgUrl = amazonUrl + imgUrl;
    }
    var image  = document.createElement('img');
    image.width = 60;
    image.src = imgUrl;
    image.alt = altText;

    return image;
  };

  var buildButton = function(clubId, I18n) {
    var button = document.createElement('a');
    var image  = buildImg(I18n.lang);
    var url    = buildUrl(clubId, I18n.tld, I18n.lang, '');
    var title  = altText;

    button.id    = 'cg-booking-button';
    button.href  = url;
    button.title = title;
    button.target = '_blank';

    button.appendChild(image);
    body.appendChild(button);
    return button;
  };

  var setPosition = function() {
    var position = wrapper.getAttribute('data-position');
    if (position === 'left') {
      wrapper.setAttribute('class', 'cg--left');
      button.setAttribute('class', 'cg--left');
    }
  };

  var loadCSS = function(amazonUrl) {
    var cssLink = document.createElement('link');

    cssLink.rel  = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = amazonUrl + 'main.css';

    document.getElementsByTagName('head')[0].appendChild(cssLink);
  };

  //
  //  Detect Mobile Browsers
  //
  //  Credit: Chad Smith
  //  Source: http://detectmobilebrowsers.com/
  //
  var mobileBrowser = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){check = true;}})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  init();

})();

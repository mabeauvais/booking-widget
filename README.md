[Instructions en Français, cliquez-ici.](#fr)

---
![Chronogolf][crest]

Chronogolf Booking Widget
==============

This plugin installs Chronogolf's booking widget on your golf club's website.

## Installation
1. Contact us to get your Chronogolf ID
2. Copy and paste this HTML snippet at the bottom of your pages (before the `</body>`) 
	
		<div id="cg-booking-widget" data-id="{ID}" data-locale="{LOCALE}"></div>
		<script type="text/javascript" src="//chronogolf.s3.amazonaws.com/plugins/booking-widget/cg-booking-widget.min.js"></script>
	
3. Replace `{ID}` with your Chronogolf ID
4. Replace `{LOCALE}` with your regional settings (see table below)

## Options
Options can be passed via data attributes. Append the option name to `data-`, as in `data-position=""`.

name | type | description | values | default 
--- | --- | --- | --- | ---
position | string | Position of the button | left, right | 'right'

## Regional Settings
The `{LOCALE}` tells the widget in which language to render and on which  domain to redirect (e.g. fr-CA => French, www.chronogolf.ca/fr)

Locale | Country | Language
--- | --- | --- | ---
`en-CA`|Canada|English
`fr-CA`|Canada|French
`en-US`|United-States|English
`fr-FR`|France|French

## Demo
http://chronogolf.s3.amazonaws.com/booking-widget/demo.html


## Licence
Copyright © 2014 Chronogolf Inc.


[crest]: http://chronogolf.s3.amazonaws.com/promotionals/logos/cg-crest.png

---
<a name="fr"></a>

![Chronogolf][crest]

Widget de réservation de Chronogolf
==============

Ce module installe le widget de réservation de Chronogolf sur le site web de votre club de golf.

## Installation
1. Contactez-nous afin d'obtenir votre identifiant Chronogolf.
2. Copiez et collez ce code HTML à la fin de vos pages (avant la balise `</body>`)

		<div id="cg-booking-widget" data-id="{ID}" data-locale="{LOCALE}"></div>
		<script type="text/javascript" src="//chronogolf.s3.amazonaws.com/plugins/booking-widget/cg-booking-widget.min.js"></script>
	
3. Remplacez `{ID}` avec votre identifiant Chronogolf.
4. Remplacez `{LOCALE}` avec vos paramètres régionaux (voir tableau ci-dessous)

## Options
Les options peuvent être configurées au travers des attributs “data”. Annexez le nom de l’option à `data-`, par exemple `data-position=""`.

nom | type | description | valeurs | défaut
--- | --- | --- | --- | ---
position | string | Position du bouton | left, right | 'right'

## Paramètres régionaux
L'option `{LOCALE}` indique au widget la langue et le pays de votre club de golf (ex: fr-CA => Français, www.chronogolf.ca/fr)

Locale | Pays | Langage
--- | --- | --- | ---
`en-CA`|Canada|Anglais
`fr-CA`|Canada|Français
`en-US`|États-Unis|Anglais
`fr-FR`|France|Français

## Démo
http://chronogolf.s3.amazonaws.com/booking-widget/demo.html


## Licence
Copyright © 2014 Chronogolf Inc.


[crest]: http://chronogolf.s3.amazonaws.com/promotionals/logos/cg-crest.png

![Chronogolf][crest]

Widget de Réservation de Chronogolf
==============

Ce module installe le widget de réservation de Chronogolf sur le site web de votre club de golf.

## Installation
1. Contactez-nous afin d'obtenir votre identifiant Chronogolf.
2. Copiez et collez ce code HTML à la fin de vos pages (avant la balise `</body>`)

		<div id="cg-booking-widget" data-id="{ID}" data-locale="{LOCALE}"></div>
		<script type="text/javascript" src="//chronogolf.s3.amazonaws.com/booking-widget/cg-booking-widget.min.js"></script>
	
3. Remplacez `{ID}` avec votre identifiant Chronogolf.
4. Remplacez `{LOCALE}` avec vos paramètres régionaux (voir tableau ci-dessous)

## Options
Les options peuvent être configurées au travers des attributs “data”. Annexez le nom de l’option à `data-`, par exemple `data-position=""`.

nom | type | description | valeurs |défaut
--- | --- | --- | ---
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

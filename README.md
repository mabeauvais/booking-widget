![Chronogolf][crest]

Chronogolf Booking Widget
==============

This plugin installs Chronogolf's booking widget on your golf club's website.

## Installation
1. Contact us to get your Chronogolf ID
2. Copy and paste this HTML snippet at the bottom of your pages (before the `</body>`) 
	
		<div id="cg-booking-widget" data-id="{ID}" data-locale="{LOCALE}"></div>
		<script type="text/javascript" src="//chronogolf.s3.amazonaws.com/booking-widget/cg-booking-widget.min.js"></script>
	
3. Replace `{ID}` with your Chronogolf ID
4. Replace `{LOCALE}` with your regional settings (see table below)

## Options
Options can be passed via data attributes. Append the option name to `data-`, as in `data-position=""`.

name | type | description | values| default 
--- | --- | --- | ---
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

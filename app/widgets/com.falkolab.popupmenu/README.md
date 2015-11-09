# Popup menu Widget
![screenshot1](screenshot1.png?raw=true "Example screenshot 1")
![screenshot2](screenshot2.png?raw=true "Example screenshot 2")
![screenshot3](screenshot3.png?raw=true "Example screenshot 3")
![screenshot4](screenshot4.png?raw=true "Example screenshot 4")


## Quick Start

### Get it 
[![gitTio](http://gitt.io/badge.svg)](http://gitt.io/component/com.falkolab.popupmenu)

Download this repository and consult the [Alloy Documentation](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-ImportingWidgets) on how to install it, or simply use the [gitTio CLI](http://gitt.io/cli):

`$ gittio install com.falkolab.popupmenu`

## Usage

See demo on [popup menu widget demo](https://github.com/falkolab/Titanium-PopupMenu-Demo)

### Properties
* `classesPrefix` _(String)_ - Your custom prefix for widget tss classes
* `itemController` _(String)_ - Custom item controller (see widget_root/controllers/item as starting point)

**Source for items:**

* `items` _(Array)_ - you can set items as array of objects or use `generator` property
* or `generator` _(String)_ - Commonjs module as items generator
     
		module.exports = function() { 
			return [{
				title: "title 1"
			}, {
			...
			}]
or

		exports.getItems = function() {
			return [{...}, {...}];
		}
    
* or `generator` _(Function)_ - function as item generator
 
### Item properties
* `controller` - (optional) controller to render this item
* `handler` - (optional) item select event handler function

You can directly specify item controler in items `controller` property or `itemController` widget property.

Controller will be find in widget than in app.

### Item controller arguments
* `classesPrefix` - same as for widget
* `defaultClassPrefix` - constant `falkolab.popupmenu-`
* `index` - item index
* `item` - item from `generator` or `items` list

### Events
* `select` - fired when user select menu item. 

Event data: 

* `index` - selected item index
* `item` - selected item

### Methods
* `show` - show menu. Can accept `options` object with properties: 
	* `selectedIndex` - index of selected item.
* `hide` - hide menu
* `cleanup` - cleanup widget and unsubscribe event handlers

## Use cases:

Please see demo app.

	
Give me a star if the widget was useful for you.
var args = arguments[0] || {};
$.title.text = args.item.title;
$.description.text = args.item.description;

if(args.selected === true) {	
	$.item.applyProperties($.createStyle({
		apiName: 'View',
		classes: 'selected'
	}));
}
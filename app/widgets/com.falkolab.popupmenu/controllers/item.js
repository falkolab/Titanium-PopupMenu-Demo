var args = arguments[0] || {};

$.addClass($.item, args.classesPrefix + 'item');

$.addClass($.title, args.classesPrefix + 'title', {
	text: args.item.title
});
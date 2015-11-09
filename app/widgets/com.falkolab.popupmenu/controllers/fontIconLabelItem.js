var args = arguments[0] || {};

$.addClass($.item, args.classesPrefix + 'iconfont-item');

$.addClass($.title, args.classesPrefix + 'iconfont-title', {
	text: args.item.title
});

$.addClass($.icon, args.classesPrefix + 'iconfont-icon', {
	text: args.item.icon
});
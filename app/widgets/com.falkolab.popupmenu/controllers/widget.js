var items,
	defaultCpfx = "falkolab-popupmenu-",	
	cpfx = defaultCpfx,
	menuWindow, 
	table, 
	generator, 
	itemController;

function init(args) {
	exports.hide();
		
	cleanupItems();	
	if(_.isArray(args.items)) {
		items = args.items;
	} else if(_.isString(args.items)) {
		items = JSON.parse(args.items);
	//} else if (args.children && args.children.length) {
	//	items = args.children;
	} else {
		generator = args.generator;	
	}
	
	itemController = args.itemController;
	
	// classes prefix
	var newPrefix = args.classesPrefix;
	if (_.isString(newPrefix) && newPrefix !== cpfx) {
		cpfx = newPrefix;
	}
}

function collectItems() {
	if(!items) {
		if (_.isString(generator)) {
			var factory = require(generator);
			if(_.isFunction(factory)) {
				items = factory();
			} else if(_.isFunction(factory.getItems)) {
				items = factory.getItems();	
			}		
		} else if(_.isFunction(generator)) {
			items = generator();
		}
	}

	!_.isArray(items) && ( items = []);

	items = _.map(items, function(v) {
		return _.isObject(v) ? v : {
			title: v.toString(),
			value : v
		};
	});	
}

function cleanupItems() {
	items = undefined;
}

exports.cleanup = function() {
	generator = null;
	cleanupItems();
	this.off();
	this.hide();
};

exports.show = function(opts) {	
	if(menuWindow) {
		Ti.API.warn('Already shown!');
		return;
	}
	
	opts = opts || {};	
	collectItems();
	
	var rows = _.map(items, function(item, index) {
		var ctrl,				
		    ctrlArgs =  {
		    	classesPrefix: cpfx,
		    	defaultClassPrefix: defaultCpfx,
		    	index: index,
				item: item
			};
			
		if(!_.isUndefined(opts.selectedIndex)) {
			ctrlArgs.selected = index === opts.selectedIndex;
		}
					
		var customController = item.controller || itemController;
		
		if (_.isString(customController)) {
			try{
				ctrl = Widget.createController(customController, ctrlArgs);
			} catch(e) {
				ctrl = Alloy.createController(customController, ctrlArgs);
			}
		} else {			
			ctrl = Widget.createController('item', ctrlArgs);
		}
		
		var row = $.UI.create('TableViewRow', {
			classes: cpfx + 'row'
		});
				
		row.add(ctrl.getView());
		ctrl = undefined;			
		return row;				
	});
	
	var tableClasses = [defaultCpfx + 'table'];
    if(defaultCpfx !== cpfx) {
    	tableClasses.push(cpfx + 'table');
    }
	
	table = $.UI.create('TableView', {    	
    	classes: tableClasses,
    	data: rows
  	});      
    	
    rows = undefined;
    
    if(!_.isUndefined(opts.selectedIndex)) {
    	table.selectRow(parseInt(opts.selectedIndex));
    }
    
    var winClasses = [defaultCpfx + 'window'];
    if(defaultCpfx !== cpfx) {
    	winClasses.push(cpfx + 'window');
    }
	
	if(OS_ANDROID) {
		menuWindow = $.UI.create('OptionDialog', {
			classes: winClasses,
			androidView: table
		});
		menuWindow.show();	
	} else if(OS_IOS) {
		menuWindow = $.UI.create('Window', {
			classes: winClasses
		});
		menuWindow.add(table);
		menuWindow.addEventListener('click', function onModalClick(evt) {
    		evt.source.removeEventListener(evt.type, onModalClick);
    		evt.source.close();
    	});
    	menuWindow.open();
    	
	}	
		
	table.addEventListener('singletap', function menuWindowListener(evt) {	    	
        evt.source.removeEventListener(evt.type, menuWindowListener);
    	exports.hide();
    	
        // Вызов обработчика меню
        var item = items[evt.index],
        	evt = {
	        	index: evt.index,
	        	item: item
	        };
        
        _.isFunction(item.handler) && item.handler(evt);
        $.trigger('select', evt);                
    });
    	
	return menuWindow;	
};

exports.hide = function() {
	if(!menuWindow) {		
		return;
	}
	
	if(OS_ANDROID) {		
		menuWindow.hide();		
	} else if(OS_IOS) {		
		menuWindow.remove(table);
		menuWindow.close();
	}
	
	menuWindow = undefined;
	table = undefined;
};

init(arguments[0] || {});
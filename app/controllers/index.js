function openMenu(evt) {
    if(evt.source.id == 'simpleMenu') {
    	simpleMenu();
    } else if(evt.source.id == 'iconfontMenu') {
    	iconfontMenu();
    } else if(evt.source.id == 'customItemMenu') {
    	$.customItemMenuWidget.show({selectedIndex: 4});    	
    } else if(evt.source.id == 'customItemMenu') {
    	$.inlineMenuWidget.show({selectedIndex: 4});    	
    }
}

function cleanup() {	
	$.customItemMenuWidget.cleanup();	
}

function simpleMenu() {
	Alloy.createWidget('com.falkolab.popupmenu', null, {
		items: [{
			title: 'Menu item #1',
			value: 'itemValue1',
			handler: function(evt) {
				alert('Index: ' + evt.index + '\nValue: ' + evt.item.value);
			}
		}, {
			title: 'Menu item #2',				
			value: 'itemValue2'
		}]		
	}).show();
}

function iconfontMenu() {
	function actionRunner(evt) {
		alert('Action: ' + evt.item.action);
	}
	
	Alloy.createWidget('com.falkolab.popupmenu', null, {
		classesPrefix: 'custom-menu-', // look at app.tss
		itemController: 'fontIconLabelItem',
		items: [{
			icon: '\uF254',
			title: 'Cut object',
			action: 'cut',
			handler: actionRunner		
		}, {
			icon: '\uf280',
			title: 'Delete object',				
			action: 'delete',
			handler: actionRunner
		}, {
			icon: '\uf256',
			title: 'Paste object',				
			action: 'paste',
			handler: actionRunner
		}, {			
			title: 'Info',
			action: 'info',
			controller: 'item', // override controller only for this item to controller implemented in widget.
			handler: actionRunner		
		}]		
	}).show();
} 

function onCustomItemMenuSelected(evt) {
	alert('customItemMenuWidget\n\nselected item index: ' + evt.index);
}

$.index.open();

ToolbarDemo.views.StuffsListView = Ext.extend(Ext.Panel, {
	id			 : 'listStuffs',
	stuffsStore: Ext.emptyFn,
	stuffsList : Ext.emptyFn,
	items:[
		{
			xtype		: 'list',
			store 		: ToolbarDemo.stores.stuffsStore,
			itemTpl		: '<div>{stuffID}-{description}-{stuffName}</div>',
			listeners	: {
				itemtap:function(record, index){	
            		vrecord=ToolbarDemo.stores.stuffsStore.getAt(index);
					console.log('Record selected ' + vrecord);
            		this.ownerCt.onEditStuff(vrecord, index);
					
            	}
			}
		}
	],
    listeners:{
    	activate:function(){console.log('StuffsListView.js_-> activate->Just activated stuffcard');}
    },
    layout: 'fit',
    initComponent: function () {

		this.topToolbar = new Ext.Toolbar({
            title: 'Stuffs',
            items: [ { xtype: 'spacer' } ]
        });

        this.dockedItems = [this.topToolbar];

       //if we move to the detail page this will fire, emptying the list!
		this.on('render', function(){console.log('StuffListView->render');}),
		this.on('afterrender',function(){console.log('StuffsListView->after render');}),

        ToolbarDemo.views.StuffsListView.superclass.initComponent.call(this);
    },

    onNewStuff: function () {
        Ext.dispatch({
            controller: ToolbarDemo.controllers.stuffsController,
            action: 'newStuff'
        });
    },

    onEditStuff: function (record, index) {
        Ext.dispatch({
            controller: ToolbarDemo.controllers.stuffsController,
            action: 'editstuff',
            stuff: record      //anything added at this line (or after) just gets dropped into [options] object
            					//the controller has access to it then, as options.stuff, options.stuff etc etc
        });
    },

    refreshList: function () {
		console.log('refresh list');
        this.stuffsList.refresh();
    }
});
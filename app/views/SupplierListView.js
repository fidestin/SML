ToolbarDemo.views.SuppliersListView = Ext.extend(Ext.Panel, {
	id			 : 'listSuppliers',
	suppliersStore: Ext.emptyFn,
	suppliersList : Ext.emptyFn,
	items:[
		{
			xtype		: 'list',
			store 		: ToolbarDemo.stores.supplierStore,
			itemTpl		: '<div>{supplierName}-{categoryID}</div>',
			listeners	: {
				itemtap:function(record, index){	
            		vrecord=ToolbarDemo.stores.suppliersStore.getAt(index);
            		this.ownerCt.onEditSupplier(vrecord, index);
            	}
			}
		}
	],
    listeners:{
    	activate:function(){
    		connole.log('SuppliersListView.js_-> activate->Just activated vouchercard');
    	}
		
		
    },
    layout: 'fit',
    initComponent: function () {

    	//DONT load vouchers here. MainView. this.on('render', function () loads them instead and sets badge
        this.topToolbar = new Ext.Toolbar({
            title: 'Vouchers',
            items: [ { xtype: 'spacer' } ]
        });

        this.dockedItems = [this.topToolbar];

		//if we move to the detail page this will fire, emptying the list!
		this.on('render', function(){
			console.log('SupplierListView->render');
		}),
        
		this.on('afterrender',function(){
			console.log('SuppliersListView->after render');	
		}),

        ToolbarDemo.views.SuppliersListView.superclass.initComponent.call(this);
    },

    onNewSupplier: function () {
        Ext.dispatch({
            controller: ToolbarDemo.controllers.suppliersController,
            action: 'newSupplier'
        });
    },

    onEditSupplier: function (record, index) {
        Ext.dispatch({
            controller: ToolbarDemo.controllers.suppliersController,
            action: 'editsupplier',
            supplier: record      ///anything added at this line (or after) just gets dropped into [options] object
            					//the controller has access to it then, as options.supplier, options.stuff etc etc
        });
    },

    refreshList: function () {
		console.log('refresh list');
        this.vouchersList.refresh();
    }
});
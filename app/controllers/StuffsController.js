//These are the CRUDS for the Stuff controller....
Ext.regController('StuffsController', {

	'cancelstuff': function(options){
			console.log('Do cancel stuff');
			console.log('StuffsController.js_cancelEdit');
    	if (ToolbarDemo.views.stuffView){
    		ToolbarDemo.views.stuffView.setActiveItem(
    	            ToolbarDemo.views.stuffsListView,
    	            { type: 'slide', direction: 'right' }
    	        );
    	}
	},
	
   //this will display the Stuff
    'editstuff': function (options) {
		//est using 	this.ownerCt.onEditStuff(vrecord, index) from the StuffsListView
        ToolbarDemo.views.stuffEditorView.load(options.stuff);
        ToolbarDemo.views.stuffView.setActiveItem(
            ToolbarDemo.views.stuffEditorView,
            { type: 'slide', direction: 'left' }
        );
    },

    //this will redeem the stuff
    'deletestuff': function (options) {

        var currentstuff = ToolbarDemo.views.stuffEditorView.getRecord();

        if (ToolbarDemo.stores.stuffsStore.findRecord('id', currentstuff.data.id)) {
            ToolbarDemo.stores.stuffsStore.remove(currentstuff);
        }

        ToolbarDemo.stores.stuffsStore.sync();
        //Going to have to call webservice here to update a flag on the stuff to say its redeemed.
        //ToolbarDemo.views.stuffsListView.refreshList();
        console.log('Returning to main page...');
        ToolbarDemo.views.mainView.setActiveItem(
            ToolbarDemo.views.stuffsListView,
            { type: 'slide', direction: 'right' }
        );
        console.log('Returned to main page...');
    },

    
});

ToolbarDemo.controllers.stuffsController = Ext.ControllerManager.get('StuffsController');
//These are the CRUDS for the Stuff controller....
Ext.regController('StuffsController', {

	
	
    'editstuffs': function (options) {						//loads the stuffslist - should filter this
		console.log('StuffsController.js_editstuffs');
		//ToolbarDemo.views.stuffsListView.load(options.category); no method load on this view (Panel)//Could apply a filter??
		if (ToolbarDemo.views.stuffView){
			ToolbarDemo.views.stuffView.setActiveItem(
				ToolbarDemo.views.stuffsListView,
				{ type: 'slide', direction: 'left' }
			);
		}
	},
	
	
	'cancelstuffs':function(options){							//reload the category view....
		console.log('StuffsController.js_cancelstuffs=>exit the stuffsList and return to category');
		if (ToolbarDemo.views.stuffView){
			ToolbarDemo.views.stuffView.setActiveItem(			//want to set this item active	
				ToolbarDemo.views.categoryView,					//this view active within the stuffView panel...
				  { type: 'slide', direction: 'right' }
			);
		}
	},
	
	
	
	
   //this will display the Stuff	- replace with the AboutCard to test
    'editstuff': function (options) {
		console.log('StuffsController.js_editstuff');
		//ToolbarDemo.views.Aboutcard.load(options.stuff);			//cant call load on this class...Panel
        //ToolbarDemo.views.stuffEditorView.load(options.stuff);		//Form_Panel has load method		
						//load on Form Panel...seems to 'bind' the single stuff object 											
						//to the details view. Loading a single object into a FieldSet
        ToolbarDemo.views.stuffView.setActiveItem(
            ToolbarDemo.views.siteView,			//the object, not the class
            { type: 'slide', direction: 'left' }
        );
    },

	'cancelstuff': function(options){							//cancels the detail, returns to list...
			console.log('Do cancel stuff');
			console.log('StuffsController.js_cancelstuff');
    	if (ToolbarDemo.views.stuffView){
    		ToolbarDemo.views.stuffView.setActiveItem(
    	            ToolbarDemo.views.stuffsListView,			//stuffView is a panel, has an ActiveItem
    	            { type: 'slide', direction: 'right' }
    	        );
    	}
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
	
	'openMap': function(options){							//cancels the detail, returns to list...
		console.log('StuffsController.js_openMap');
    	if (ToolbarDemo.views.stuffView){
    		ToolbarDemo.views.stuffView.setActiveItem(
    	            ToolbarDemo.views.mapView,			//stuffView is a panel, has an ActiveItem
    	            { type: 'slide', direction: 'left' }
    	        );
    	}
	},

	'cancelMap': function(options){							//cancels the detail, returns to list...
		console.log('StuffsController.js_cancelMap');
    	if (ToolbarDemo.views.stuffView){
    		ToolbarDemo.views.stuffView.setActiveItem(
    	            ToolbarDemo.views.siteView,			//stuffView is a panel, has an ActiveItem
    	            { type: 'slide', direction: 'right' }
    	        );
    	}
	},
    
});

ToolbarDemo.controllers.stuffsController = Ext.ControllerManager.get('StuffsController');
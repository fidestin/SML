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
			//FIX required to resize the map
			mimap=Ext.getCmp('map1').items.items[0].map;
			
			
			console.log('Adding DOM Listener on center changed');
			google.maps.event.addDomListener(mimap,'center_changed',function(){
				console.log('Firing resize');
				google.maps.event.trigger(mimap,"resize");	//ensures it displays correctly after pan
			});
			console.log('Opening map -> setActiveItem');
    		ToolbarDemo.views.stuffView.setActiveItem(
    	            ToolbarDemo.views.mapView,			//stuffView is a panel, has an ActiveItem
    	            { type: 'slide', direction: 'left' }
    	        );
			console.log('Adding googleMap_trigger - to resize');
			var galwayLocation=new google.maps.LatLng(53.27112, -9.0569);
			var galwayCrescents=new google.maps.LatLng(53.26878, -9.0660);
			//add another marker...
			var marker = new google.maps.Marker({
				  position: galwayCrescents,
				  map: mimap,
				  title: 'Uluru (Ayers Rock)'
			 });
			 var infowindow = new google.maps.InfoWindow({
				  content: 'Stuff about here',
				  maxWidth: 200
			  });
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(mimap,marker);
			  });
			 google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(mimap,marker);
			  }); 
			mimap.setCenter(galwayLocation);
			google.maps.event.trigger(mimap,"resize");		//ensures it displays correctly on opening	
			
			//get the toolbar component
			var tb=Ext.getCmp('mapcard');
			
			google.maps.event.addListener(mimap, 'zoom_changed', function(){
					console.log('Zoome ended');
					tb.dockedItems.items[0].setTitle('Loading...');
			});
			google.maps.event.addListener(mimap, 'idle', function(){
					console.log('All quiet now');
					tb.dockedItems.items[0].setTitle('Loaded!');
			});
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
//This can only be called as a result of a callback once the store is full.
//It then calculates the distances and (when all are resuls) - fires its own callback (inside updatePlanner)
//that refreshes the List with the newly calculated distances
function CallMapDisplay(){
	console.log('Calling topFunc - now there are ' + ToolbarDemo.stores.stuffsStore.data.items.length);
	topFunc();
}
//These are the CRUDS for the Stuff controller....
Ext.regController('StuffsController', {

	'loadmappedstuffs':function(options){
		ToolbarDemo.views.stuffView.setActiveItem(
					ToolbarDemo.views.stuffsListView,
					{ type: 'slide', direction: 'left' }
				);
	},
	
    'editstuffs': function (options) {						//loads the stuffslist - should filter this
		console.log('StuffsController.js_editstuffs');
		//ToolbarDemo.views.stuffsListView.load(options.category); no method load on this view (Panel)//Could apply a filter??
		if (ToolbarDemo.views.stuffView){
			mapValuesReturned=0;
			mapListDisplayed=false;
			
			var categoryTitle=options.category.data.catdescription;
			var tb=Ext.getCmp('listStuffs');		//grab the view
			tb.dockedItems.items[0].setTitle(categoryTitle);
			
			//based on categoryID passed in via options.
			thirdload(options.category.data.categoryID,function(){
					topFunc();		//Store now loaded, callback -> gets the map distances and saves it to the store
					}
			);		//pass thru the category ID. // this populates the data store - but without the distance calculated...
			console.log('StuffsController_editStuffs_data store loaded with ' + ToolbarDemo.stores.stuffsStore.data.items.length);
			//topFunc(); 		//this enables a counter, when complete we refresh the list...
			//need to call this as a result of a callback to thirdload
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
		ToolbarDemo.views.siteView.thisSupplierRecord=options.stuff.data;		//push record detail to view...smaller portion of data
		//Change the Toolbar title based on supplier (could this also be done in the Panel Listener event?)
		var tb=Ext.getCmp('sitecard');
		tb.dockedItems.items[0].setTitle(options.stuff.data.description);
		
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
	
	'openMapList': function(options){
		console.log('StuffsController.js_openMapList');
		mimap=Ext.getCmp('map1').items.items[0].map;	//grab the map object...
		
		var suppliers=ToolbarDemo.stores.stuffsStore.data.items;
		var centralDublin=new google.maps.LatLng(53.3497,-6.257);
		
		for (var i=0;i<suppliers.length;i++){
			var marker=new google.maps.Marker({
				map:mimap,
				position: new google.maps.LatLng(suppliers[i].data.latX, suppliers[i].data.latY),
				title: suppliers[i].data.description
			});
		}
		
		//Toggle the buttons...
		var mapBackButton=Ext.getCmp('mapBackButton');
		mapBackButton.setVisible(false);
		var mapListButton=Ext.getCmp('mapListButton');
		mapListButton.setVisible(true);
		
		
		google.maps.event.trigger(mimap,"resize");		//ensures it displays correctly on opening	
		mimap.setCenter(centralDublin);
		mimap.setZoom(13);
		
		//Need to add a <list> button to the View here, with a Dispatch back to the list view...
		//So it doenst get confused with the routing...
		
		//Can we just add this once at the start of the app - rather than in several places?
		google.maps.event.addDomListener(mimap,'center_changed',function(){
				console.log('Firing resize');
				google.maps.event.trigger(mimap,"resize");	//ensures it displays correctly after pan
		});
			
		ToolbarDemo.views.stuffView.setActiveItem(
    	            ToolbarDemo.views.mapView,			//stuffView is a panel, has an ActiveItem
    	            { type: 'slide', direction: 'left' }
    	);
	},
	
	'openMap': function(options){							//cancels the detail, returns to list...
		console.log('StuffsController.js_openMap');
    	if (ToolbarDemo.views.stuffView){
			
			var mapBackButton=Ext.getCmp('mapBackButton');
			mapBackButton.setVisible(true);
			var mapListButton=Ext.getCmp('mapListButton');
			mapListButton.setVisible(false);
		
			mimap=Ext.getCmp('map1').items.items[0].map;	//grab the map object...
			
			var supplier=ToolbarDemo.views.siteView.thisSupplierRecord;		//one way of getting the supplier
			var supplier2=options.suppData;		//another way of getting the supplier
			var supplierLocation=new google.maps.LatLng(supplier2.latX,supplier2.latY);
			
			console.log('Supplier location is :' + supplierLocation);
			google.maps.event.addDomListener(mimap,'center_changed',function(){
				console.log('Firing resize');
				google.maps.event.trigger(mimap,"resize");	//ensures it displays correctly after pan
			});
			
			console.log('Opening map -> setActiveItem');
    		ToolbarDemo.views.stuffView.setActiveItem(
    	            ToolbarDemo.views.mapView,			//stuffView is a panel, has an ActiveItem
    	            { type: 'slide', direction: 'left' }
    	        );
			
			var supplierMarker=new google.maps.Marker({
				  position: supplierLocation,
				  map: mimap,
				  title: supplier2.description
			 });
			 
			 var supplierInfowindow = new google.maps.InfoWindow({
				  content: supplier2.description,
				  maxWidth: 300
			  });
			  
			
			 google.maps.event.addListener(supplierMarker, 'click', function() {
				supplierInfowindow.open(mimap,supplierMarker);
			  }); 
			
			google.maps.event.trigger(mimap,"resize");		//ensures it displays correctly on opening	
			mimap.setCenter(supplierLocation);
			
			//get the toolbar component - Allows us update the ToolBar easily...
			var tb=Ext.getCmp('mapcard');
			
			google.maps.event.addListener(mimap, 'zoom_changed', function(){
					console.log('Zoome ended');
					tb.dockedItems.items[0].setTitle('Loading...');
			});
			google.maps.event.addListener(mimap, 'idle', function(){
					console.log('All quiet now');
					tb.dockedItems.items[0].setTitle('Loaded!');
			});
			
			//Just go and open the marker straight away...when map is displayed...
			supplierInfowindow.open(mimap,supplierMarker);
			infowindow.open(mimap,marker);		
			
			//Will need to close these, and reset the map when closing the map
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
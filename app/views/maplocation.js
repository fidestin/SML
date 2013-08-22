//Some map API calls based on adding an ID to the Panel that contains JUST the map...
//mimap.setCenter(new google.maps.LatLng(-25.363882, 131.044922))
//mimap.setCenter(new google.maps.LatLng(53, -9))
//var mimap=Ext.getCmp('map1').items.items[0].map
//mimap.setZoom(11)


//Capture the TilesLoading event to update the Toolbar title
//Once its loaded then reset the Toolbar...
//Change the title of the DockedToolbar
//var tb=Ext.getCmp('mapcard')
//tb.dockedItems.items[0].setTitle('The Quays')
//view-source:http://www.oxfordnewmedia.com/maps/loadingMsg.html

var Mymap;


bmcaFunction=function(){
	console.log('This is the map listener');
}

google.maps.event.addDomListener(window, 'load', bmcaFunction);

ToolbarDemo.views.Mapcard = Ext.extend(Ext.Panel, {
	//requires:'Ext.Map',
	title:'Map',
	iconCls:'map',
    id: 'mapcard',
	fullscreen:true,
	layout:'fit',
    initComponent: function() {
	
		var backButton=new Ext.Button({
				text:'Back',
				ui:'back',
				scope:this,
				handler:function(){
						Ext.dispatch({
							controller: ToolbarDemo.controllers.stuffsController,
							action: 'cancelMap'
						});
					}
		});
			
		this.topToolbar = new Ext.Toolbar({
	            title: 'Site Map3',
				id:'st1',
	            items: [
					backButton,
	                { xtype: 'spacer'}
	             ]
	    });
		
		this.dockedItems = [this.topToolbar];
		var HQposition = new google.maps.LatLng(53.27322, -9.0648);
		Mymap = new Ext.Panel({
			id:'map1',
			fullscreen:true,	
			items:[
				{
					xtype: 'map',
					//center:HQposition,
					//useCurrentLocation: true,
					mapOptions: {
						zoom: 15,
						 mapTypeId: google.maps.MapTypeId.ROADMAP
					},
					Marker: {
						visible: true,
						position:HQposition
					},
					listeners:{
						maprender:function(comp,map){
							console.log('Map rendered');
							var marker = new google.maps.Marker({
								  position: HQposition,
								  map: map,
								  title: 'Hello World!'
							 });
						},
						render:function(){
							console.log('_MAP_Render listener-gets fired when the component is init by StuffView');
							console.log('this' + this);
							google.maps.event.trigger(this,"resize");
						},
						activate:function(){
							console.log('_MAP_Acitvated map function');
						}
					}
				}
			],
			listeners:{
				activate:function(){
					console.log('_MAP.js_-> activate->Just activated vouchercard');
				}
			},
			onPainted: function(){
				alert('painted');
			},
			 onShow: function(){
				alert('show');
			}
		});
		
		
		this.items=[
			Mymap
		];
			
	     ToolbarDemo.views.Mapcard.superclass.initComponent.apply(this, arguments);       
    	}
});

Ext.reg('mapcard', ToolbarDemo.views.Mapcard);

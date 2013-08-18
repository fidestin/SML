var Mymap;

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
	            title: 'Site Map',
	            items: [
					backButton,
	                { xtype: 'spacer'}
	             ]
	    });
		
		this.dockedItems = [this.topToolbar];
		var HQposition = new google.maps.LatLng(37.44885, -122.158592);
		Mymap = new Ext.Panel({
			fullscreen:true,
			items:[
				{
					xtype: 'map',
					center:HQposition,
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
						}
					}
				}
			],
			
		});
		
		
		this.items=[
			Mymap
		];
			
	     ToolbarDemo.views.Mapcard.superclass.initComponent.apply(this, arguments);       
    	}
});

Ext.reg('mapcard', ToolbarDemo.views.Mapcard);

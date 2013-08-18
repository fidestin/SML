ToolbarDemo.views.Mapcard = Ext.extend(Ext.Panel, {
	title:'Map',
	iconCls:'map',
    id: 'mapcard',
	//fullscreen:true,
    initComponent: function() {
		Ext.apply(this,{
			fullscreen:true,
			items:[
				{
					xtype:'map',
					useCurrentLocation:true
				}
			]
		});
    		
	     ToolbarDemo.views.Mapcard.superclass.initComponent.apply(this, arguments);       
    	}
});

Ext.reg('mapcard', ToolbarDemo.views.Mapcard);

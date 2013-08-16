ToolbarDemo.views.Photocard = Ext.extend(Ext.Carousel, {
	//title:'About',
	iconCls:'about',
    id: 'photocard',
    initComponent: function() {
    		Ext.apply(this,{
				items :[
					{html:'asteroid'},
					{html:'house'},
					{html:'car'}
				],
			})
			
			ToolbarDemo.views.Photocard.superclass.initComponent.apply(this, arguments);
	}
});

Ext.reg('photocard', ToolbarDemo.views.Photocard);

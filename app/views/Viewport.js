//The Viewport is a TabPanel where the objects are full panels which come with bottom toolbar buttons etc etc
ToolbarDemo.views.Viewport = Ext.extend(Ext.TabPanel, {
    fullscreen: true,
    id:'viewport',
    initComponent: function() {
        Ext.apply(this, {
            tabBar: {
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
            items: [
                { xtype: 'homecard', 		id : 'home' },  		//only these panels appear on bottom toolbar
				{ xtype: 'categorycard',     id:'categorycard'},	//
                { xtype: 'pointscard',		id : 'pointscard' },
                ToolbarDemo.views.mainView,							//this is the vouchers panel
				
				ToolbarDemo.views.suppliermainView,							//this is the suppliers panel
				 //{ xtype: 'suppliermainview',		id : 'suppliermainview'},
                
				{ xtype: 'scancard',		id : 'scancard'},
                //{ xtype: 'verifycard',		id : 'verifycard'},		//part of the Managers App
				//{ xtype: 'storecard',		id : 'storecard'},			//part of the Managers App
             
                  { xtype: 'settingscard',	id : 'sett' }
                
                //could also do [ToolarDemo.views.Searchcard] to add a panel...
            ]
        });
        ToolbarDemo.views.Viewport.superclass.initComponent.apply(this, arguments);
   
       
    }
});

Ext.reg('viewport', ToolbarDemo.views.Viewport);
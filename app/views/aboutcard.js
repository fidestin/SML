ToolbarDemo.views.Aboutcard = Ext.extend(Ext.Panel, {
	//title:'About',
	iconCls:'about',
    id: 'aboutcard',
    styleHtmlContent: true,
    initComponent: function() {
    		
    		this.topToolbar = new Ext.Toolbar({
	            title: 'About',
	            items: [
	                { xtype: 'spacer' }
	             ]
	        });
	
	     
	        
	        this.dockedItems = [this.topToolbar];

    		this.items=[{
					xtype:'component',
					id:'aboutmessagetext',
					html:'Nearly there.....<p>You have registered your KeepM account with us, but it is not yet <b>activated</b>. <P>Pleases check your email again and click on the activate link.'
				}];
    		
	        ToolbarDemo.views.Aboutcard.superclass.initComponent.apply(this, arguments);
	        if (localStorage.activated=="1"){
	        	Ext.getCmp('aboutmessagetext').html='You are account is activated';
			}
    	}		//initcomponent
});

Ext.reg('aboutcard', ToolbarDemo.views.Aboutcard);

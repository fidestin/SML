

ToolbarDemo.views.Categorycard = Ext.extend(Ext.Panel, {
	title:'Categories',
	iconCls:'favorites',
    id: 'categorycard',
                                          items:[
                                                 {
                                                 xtype		: 'list',
                                                 store 		: ToolbarDemo.stores.categoryStore,
                                                 itemTpl:'<div class="list-item-title"><table border="0"><tr><td width="15%"><img src="gala.png" width="60" height="60"/></td>' + '<td width="85%"><table border="0"><tr><td width="90%" class="PLH">{catdescription}</td><td style="width:90%;font-size:20pt;color:#0080FF"><strong>{categoryID}</strong></td></tr>' +
                                                 '<tr><td colspan="2" style="vertical-align:bottom;height:10px">More detail?</td></tr></table></TD></TR></table></div>'
                                                 
                                                 
                                                 }
                                                 ],
    styleHtmlContent: true,
    listeners:{
    	activate:function(){
    		console.log('categoryCard.js_Just activated categoryCard');
          
    	}
    },
    layout:'fit',
    initComponent: function() {
    	  console.log('categoryCard.js-initComponent-');
            this.topToolbar = new Ext.Toolbar({
	            title: 'Points',
	            items: [
	                { xtype: 'spacer' }
                       ,
                       upLoadPoints
	            ]
	        });
	        
				
	        this.dockedItems = [this.topToolbar];
            ToolbarDemo.views.Categorycard.superclass.initComponent.apply(this, arguments);
    	}		
});

Ext.reg('categorycard', ToolbarDemo.views.Categorycard);

ToolbarDemo.views.Photocard = Ext.extend(Ext.Carousel, {
	//title:'About',
	iconCls:'about',
    id: 'photocard',
    initComponent: function() {
    		Ext.apply(this,{
				items :[
					{//Do a vbox for the first item...
						layout:{
							type:'vbox',
							align:'stretch'
						},
						items:[
							{
								flex:4,					//bigger size 4 > 1
								cls:'painting bridge',
							},
							{
								flex:1,
								styleHtmlContent:true,
								html:"<h3>Bridge</h3><p>More detail about this Dublin bridge</p>"
							}
						]
					},//next two items are regular Carousel items
					//{cls:'painting church'},
					//{cls:'painting halp'},
					{
						xtype:'paintingcard',
						slug:'halp',
						title:'Halpenny Bridge',
						description:'Just another bridge in Dublin'
					},
					{
						xtype:'paintingcard',
						slug:'church',
						title:'Some Church',
						description:'Just another church in Dublin'
					}
				],
			});
			
			var backButton=new Ext.Button({
				text:'Back',
				ui:'back',
				handler:this.backButtonTap,
				scope:this
			});
			
			this.topToolbar = new Ext.Toolbar({
	            title: 'Photos',
	            items: [
					backButton,
	                { xtype: 'spacer'}
	             ]
	        }),
			
			
		
			
			ToolbarDemo.views.Photocard.superclass.initComponent.apply(this, arguments);
	},
	
	backButtonTap: function () {
				Ext.dispatch({
					controller: ToolbarDemo.controllers.stuffsController,
					action: 'closePhotos'
				});
			},
			
	
});

Ext.reg('photocard', ToolbarDemo.views.Photocard);

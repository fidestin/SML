
			
ToolbarDemo.views.Aboutcard = Ext.extend(Ext.Panel, {
	title:'About',
	iconCls:'about',
    id: 'aboutcard',
	fullscreen:true,
	layout:{			//could be auto, fit, vbox, hbox
		type:'vbox',
		align:'stretch'
	},
	//defaults:{flex:1},		//apply this property value to all below..
	
    //styleHtmlContent: true,	//Remove this - 
    initComponent: function() {
    	
			
			var showDetailButton=new Ext.Button({
				text:"Detail",
				handler:this.backToDetail
			});
		
			var theText=new Ext.Panel({
				flex:4,
				html:'Mondrian was born in Amersfoort in The Netherlands, the second of his parents children. He was descended from Christian Dirkzoon Monderyan who lived in the Hague as early as 1670. The family moved to Winterswijk when his father, Pieter Cornelius Mondriaan, was appointed head teacher at a local primary school. Mondrian was introduced to art from a very early age: his father was a qualified drawing teacher, and with his uncle, Fritz Mondriaan (a pupil of Willem Maris of The Hague School of artists), the younger Piet often painted and drew along the river Gein.<p>After a strictly Protestant upbringing, in 1892, Mondrian entered the Academy for Fine Art in Amsterdam. He already was qualified as a teacher. He began his career as a teacher in primary education, but while teaching he also practiced painting. Most of his work from this period is naturalistic or impressionistic, consisting largely of landscapes. These pastoral images of his native country depict windmills, fields, and rivers, initially in the Dutch Impressionist manner of the Hague School and then in a variety of styles and techniques documenting his search for a personal style. These paintings are most definitely representational, and illustrate the influence that various artistic movements had on Mondrian, including pointillism and the vivid colors of fauvism',
				cls:'textInfo',
				 scroll: 'vertical'
				//layout:'fit'			//make sure it fills the entire space
			});
			
			var photoChanger=new Ext.Carousel({
				flex:3,
				items:[
					{
						xtype:'paintingcard',
						slug:'bridge',
						title:'Some big bridge',
						description:'Just another bridge in Dublin'
					},
					{
						xtype:'paintingcard',
						slug:'halp',
						title:'Some bridge',
						description:'Just another bridge in Dublin'
					},
					{
						xtype:'paintingcard',
						slug:'church',
						title:'Some Church',
						description:'Just another church in Dublin'
					}
				]
			});
			
			
			
    		this.topToolbar = new Ext.Toolbar({
	            title: 'Photos',
	            items: [
					{ xtype: 'spacer'},
					showDetailButton
	             ]
	        });
	        
	        this.dockedItems = [this.topToolbar];

    		this.items=[
					photoChanger,
				
					//theText
					
				];
    		
	        ToolbarDemo.views.Aboutcard.superclass.initComponent.apply(this, arguments);       
    	},		//initcomponent
		
		backToDetail: function () {
        Ext.dispatch({
            controller: ToolbarDemo.controllers.stuffsController,
            action: 'closePhotos'
        });
    }
});

Ext.reg('aboutcard', ToolbarDemo.views.Aboutcard);

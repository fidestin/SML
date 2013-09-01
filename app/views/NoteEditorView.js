var dispVouch;
ToolbarDemo.views.HideVoucherMask=function(){
	dispVouch=Ext.getCmp('editview');
	dispVouch.setLoading(false);	
}

ToolbarDemo.views.VoucherMask=function(){
	//Ext.Msg.alert('Showing loading mask');
	dispVouch=Ext.getCmp('editview');
	dispVouch.setLoading(true,true);	
		console.log('mask');
}


ToolbarDemo.views.NoteEditorView = Ext.extend(Ext.form.FormPanel, {
	id			: 'editview',
	listeners	:{
		activate : function(){
				console.log('Just activated NoteEditorView');
				//$('#loadingmsg').hide();
				//$('#qrcodestring').html(ToolbarDemo.views.Createqrinput());
				
				//Ext.getCmp('loadingmsg').hide();
			}
			,
		deactivate:function(){
			console.log('NoteEditorView.js_Deactivate_Listener');
			console.log('Just deativating the panel');
			console.log('Clear out old QR codes....');
			//$('#qrcode')[0].innerHTML="";
		}
	},
    initComponent: function () {

        this.backButton = new Ext.Button({
            text: 'Back',
            ui: 'back',
            handler: this.backButtonTap,
            scope: this
        });
                
       this.seeDetailButton= new Ext.Button({
           text: 'Detail',
           ui: 'useit',
           handler: function(){
				Ext.dispatch({
					controller: ToolbarDemo.controllers.stuffsController,
					action: 'editstuff',
					stuffID:'2643'
				});
			},
           scope: this
       });
  
        this.topToolbar = new Ext.Toolbar({
            title: 'Info',
            items: [
                this.backButton,
                { xtype: 'spacer' },
				this.seeDetailButton 		//load the details screen for that supplier?
            ]
        });

       
        this.on('hide',function(){
        		this.backButtonTap();
        }),	
       
       this.dockedItems = [this.topToolbar];

        ToolbarDemo.views.NoteEditorView.superclass.initComponent.call(this);
		this.on('render',function(){
			console.log('Rendered the page');
	   });	
		
    },

    backButtonTap: function () {
		console.log('Back button for Notes...calls notesController');
        Ext.dispatch({
            controller: ToolbarDemo.controllers.notesController,
            action: 'canceledit'
        });
    },

   

    

	//fields taken from ToolbarDemo.models.voucher stored in ToolbarDemo.stores.vouchersStore
    items: [
	{
		xtype:'component',
		name :'loadingmsg',
		id	:'loadingmsg',
		html:'Loading....',
		label:'L'
	},
    {
    	xtype:'hiddenfield',
    	id:'hiddenStoreID',
    	name:'storeID'
    },
	{
		xtype :'spacer',
		height: '40'
	},
	{
		xtype:'component',
		name:'qrcode',
		id:'qrcode',
		html:'',
		label:'QR'
	},
	{
        xtype: 'textfield',
        name: 'qrcodestring',
		id:	'qrcodestring',
        label: 'Code'
    },
	 {
        xtype: 'textfield',
        name: 'storename',
        label: 'Store'
    },{
        xtype: 'textfield',
        name: 'customername',
        label: 'Customer'
    },{
        xtype: 'textfield',
        name: 'datecreated',
        id:'datecreated',
        label: 'Purchased '
    },
	{
        xtype: 'textfield',
        name: 'expires',
        id:'expires',
        label: 'Expires '
    },
    {
    	xtype:'textareafield',
    	name:'description',
    	label:'Info',
		id:'description'
    	
    },{
        xtype: 'hiddenfield',
        name: 'voucherID',
        id :  'voucherID',
        label: 'Id',
        //required: true  this puts a star beside it...
    },
	]
});



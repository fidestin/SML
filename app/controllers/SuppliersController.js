Ext.regController('SuppliersController', {
   //this will display the voucher
    'editvoucher': function (options) {
        ToolbarDemo.views.supplierEditorView.load(options.supplier);
        ToolbarDemo.views.mainView.setActiveItem(
            ToolbarDemo.views.supplierEditorView,
            { type: 'slide', direction: 'left' }
        );
    }  
});
ToolbarDemo.controllers.suppliersController = Ext.ControllerManager.get('SuppliersController');
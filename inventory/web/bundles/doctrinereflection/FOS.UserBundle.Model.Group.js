Ext.define('FOS.UserBundle.Model.Group', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.FOS.UserBundle.Model.Group',

    idProperty: "@id",
    fields: [
                { name: 'name', type: 'string'},
                { name: 'roles', type: 'array'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:FOS.UserBundle.Model.Group'
            }
});

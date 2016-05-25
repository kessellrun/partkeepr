Ext.define('PartKeepr.AuthBundle.Entity.UserProvider', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.AuthBundle.Entity.UserProvider',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'type', type: 'string'},
                { name: 'editable', type: 'boolean'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/user_providers'
            }
});

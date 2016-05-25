Ext.define('PartKeepr.AuthBundle.Entity.UserPreference', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.AuthBundle.Entity.UserPreference',

    idProperty: "@id",
    fields: [
                { name: 'preferenceKey', type: 'string'},
                { name: 'preferenceValue', type: 'string'}
                            ,
                            { name: 'user',
                reference: 'PartKeepr.AuthBundle.Entity.User'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/user_preferences'
                , ignoreIds: true
            }
});

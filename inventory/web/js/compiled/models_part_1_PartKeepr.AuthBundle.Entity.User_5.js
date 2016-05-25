Ext.define('PartKeepr.AuthBundle.Entity.User', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.AuthBundle.Entity.User',

    idProperty: "@id",
    fields: [
                { name: 'newPassword', type: 'string'},
                { name: 'initialUserPreferences', type: 'string'},
                { name: '@id', type: 'string'},
                { name: 'username', type: 'string'},
                { name: 'password', type: 'string'},
                { name: 'email', type: 'string'},
                { name: 'admin', type: 'boolean'},
                { name: 'legacy', type: 'boolean'},
                { name: 'lastSeen', type: 'date'},
                { name: 'active', type: 'boolean'},
                { name: 'protected', type: 'boolean'}
                            ,
                            { name: 'provider',
                reference: 'PartKeepr.AuthBundle.Entity.UserProvider'
                }
                            
    ],

        hasMany: [
            {
        name: 'tipHistories',
        associationKey: 'tipHistories',
        model: 'PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDayHistory'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/users'
            }
});

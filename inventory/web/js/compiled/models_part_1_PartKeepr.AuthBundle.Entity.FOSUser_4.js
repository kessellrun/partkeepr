Ext.define('PartKeepr.AuthBundle.Entity.FOSUser', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.AuthBundle.Entity.FOSUser',

    idProperty: "@id",
    fields: [
                { name: 'username', type: 'string'},
                { name: 'usernameCanonical', type: 'string'},
                { name: 'enabled', type: 'boolean'},
                { name: 'salt', type: 'string'},
                { name: 'password', type: 'string'},
                { name: 'lastLogin', type: 'date'},
                { name: 'locked', type: 'boolean'},
                { name: 'expired', type: 'boolean'},
                { name: 'expiresAt', type: 'date'},
                { name: 'confirmationToken', type: 'string'},
                { name: 'passwordRequestedAt', type: 'date'},
                { name: 'roles', type: 'array'},
                { name: 'credentialsExpired', type: 'boolean'},
                { name: 'credentialsExpireAt', type: 'date'},
                { name: '@id', type: 'string'},
                { name: 'emailCanonical', type: 'string'},
                { name: 'email', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/f_o_s_users'
            }
});

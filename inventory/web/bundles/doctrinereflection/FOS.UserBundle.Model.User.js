Ext.define('FOS.UserBundle.Model.User', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.FOS.UserBundle.Model.User',

    idProperty: "@id",
    fields: [
                { name: 'username', type: 'string'},
                { name: 'usernameCanonical', type: 'string'},
                { name: 'email', type: 'string'},
                { name: 'emailCanonical', type: 'string'},
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
                { name: 'credentialsExpireAt', type: 'date'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:FOS.UserBundle.Model.User'
            }
});

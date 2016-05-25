Ext.define('PartKeepr.CoreBundle.Entity.SystemNotice', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.CoreBundle.Entity.SystemNotice',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'date', type: 'date'},
                { name: 'title', type: 'string'},
                { name: 'description', type: 'string'},
                { name: 'acknowledged', type: 'boolean'},
                { name: 'type', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/system_notices'
            }
});

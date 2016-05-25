Ext.define('PartKeepr.CoreBundle.Entity.BaseEntity', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.CoreBundle.Entity.BaseEntity',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.CoreBundle.Entity.BaseEntity'
            }
});

Ext.define('PartKeepr.ManufacturerBundle.Entity.Manufacturer', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.ManufacturerBundle.Entity.Manufacturer',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'address', type: 'string'},
                { name: 'url', type: 'string'},
                { name: 'email', type: 'string'},
                { name: 'comment', type: 'string'},
                { name: 'phone', type: 'string'},
                { name: 'fax', type: 'string'}
                        
    ],

        hasMany: [
            {
        name: 'icLogos',
        associationKey: 'icLogos',
        model: 'PartKeepr.ManufacturerBundle.Entity.ManufacturerICLogo'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/manufacturers'
            }
});

Ext.define('PartKeepr.PartBundle.Entity.PartManufacturer', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.PartManufacturer',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'partNumber', type: 'string'}
                            ,
                            { name: 'part',
                reference: 'PartKeepr.PartBundle.Entity.Part'
                },
                            { name: 'manufacturer',
                reference: 'PartKeepr.ManufacturerBundle.Entity.Manufacturer'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.PartBundle.Entity.PartManufacturer'
            }
});

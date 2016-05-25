Ext.define('PartKeepr.ManufacturerBundle.Entity.ManufacturerICLogo', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.ManufacturerBundle.Entity.ManufacturerICLogo',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'type', type: 'string'},
                { name: 'filename', type: 'string'},
                { name: 'originalFilename', type: 'string'},
                { name: 'mimetype', type: 'string'},
                { name: 'size', type: 'int'},
                { name: 'extension', type: 'string'},
                { name: 'description', type: 'string'},
                { name: 'created', type: 'date'}
                            ,
                            { name: 'manufacturer',
                reference: 'PartKeepr.ManufacturerBundle.Entity.Manufacturer'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.ManufacturerBundle.Entity.ManufacturerICLogo'
            }
});

Ext.define('PartKeepr.StorageLocationBundle.Entity.StorageLocationImage', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.StorageLocationBundle.Entity.StorageLocationImage',

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
                            { name: 'storageLocation',
                reference: 'PartKeepr.StorageLocationBundle.Entity.StorageLocation'
                }
                    
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.StorageLocationBundle.Entity.StorageLocationImage'
            }
});

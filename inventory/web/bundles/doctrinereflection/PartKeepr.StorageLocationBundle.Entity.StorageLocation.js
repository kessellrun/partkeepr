Ext.define('PartKeepr.StorageLocationBundle.Entity.StorageLocation', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.StorageLocationBundle.Entity.StorageLocation',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'}
                            ,
                            { name: 'category',
                reference: 'PartKeepr.StorageLocationBundle.Entity.StorageLocationCategory'
                }
                                        ,
                            { name: 'image',
                reference: 'PartKeepr.StorageLocationBundle.Entity.StorageLocationImage'
                }
                    
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/storage_locations'
            }
});

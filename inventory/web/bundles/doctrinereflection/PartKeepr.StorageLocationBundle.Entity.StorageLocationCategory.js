Ext.define('PartKeepr.StorageLocationBundle.Entity.StorageLocationCategory', {
    extend: 'PartKeepr.data.HydraTreeModel',
    alias: 'schema.PartKeepr.StorageLocationBundle.Entity.StorageLocationCategory',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'lft', type: 'int'},
                { name: 'rgt', type: 'int'},
                { name: 'lvl', type: 'int'},
                { name: 'root', type: 'int'},
                { name: 'name', type: 'string'},
                { name: 'description', type: 'string'},
                { name: 'categoryPath', type: 'string'}
                        
    ],

        hasMany: [
            {
        name: 'storageLocations',
        associationKey: 'storageLocations',
        model: 'PartKeepr.StorageLocationBundle.Entity.StorageLocation'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/storage_location_categories'
            }
});

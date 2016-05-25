Ext.define('PartKeepr.PartBundle.Entity.Part', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.Part',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'description', type: 'string'},
                { name: 'comment', type: 'string'},
                { name: 'stockLevel', type: 'int'},
                { name: 'minStockLevel', type: 'int'},
                { name: 'averagePrice', type: 'number'},
                { name: 'status', type: 'string'},
                { name: 'needsReview', type: 'boolean'},
                { name: 'partCondition', type: 'string'},
                { name: 'createDate', type: 'date'},
                { name: 'internalPartNumber', type: 'string'},
                { name: 'removals', type: 'boolean'},
                { name: 'lowStock', type: 'boolean'}
                            ,
                            { name: 'category',
                reference: 'PartKeepr.PartBundle.Entity.PartCategory'
                },
                            { name: 'footprint',
                reference: 'PartKeepr.FootprintBundle.Entity.Footprint'
                },
                            { name: 'partUnit',
                reference: 'PartKeepr.PartBundle.Entity.PartMeasurementUnit'
                },
                            { name: 'storageLocation',
                reference: 'PartKeepr.StorageLocationBundle.Entity.StorageLocation'
                }
                            
    ],

        hasMany: [
            {
        name: 'manufacturers',
        associationKey: 'manufacturers',
        model: 'PartKeepr.PartBundle.Entity.PartManufacturer'
        },
            {
        name: 'distributors',
        associationKey: 'distributors',
        model: 'PartKeepr.PartBundle.Entity.PartDistributor'
        },
            {
        name: 'attachments',
        associationKey: 'attachments',
        model: 'PartKeepr.PartBundle.Entity.PartAttachment'
        },
            {
        name: 'stockLevels',
        associationKey: 'stockLevels',
        model: 'PartKeepr.StockBundle.Entity.StockEntry'
        },
            {
        name: 'parameters',
        associationKey: 'parameters',
        model: 'PartKeepr.PartBundle.Entity.PartParameter'
        },
            {
        name: 'projectParts',
        associationKey: 'projectParts',
        model: 'PartKeepr.ProjectBundle.Entity.ProjectPart'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/parts'
            }
});

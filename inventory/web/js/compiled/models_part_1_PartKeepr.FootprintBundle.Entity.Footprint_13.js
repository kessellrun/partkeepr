Ext.define('PartKeepr.FootprintBundle.Entity.Footprint', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.FootprintBundle.Entity.Footprint',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'description', type: 'string'}
                            ,
                            { name: 'category',
                reference: 'PartKeepr.FootprintBundle.Entity.FootprintCategory'
                }
                                        ,
                            { name: 'image',
                reference: 'PartKeepr.FootprintBundle.Entity.FootprintImage'
                }
                    
    ],

        hasMany: [
            {
        name: 'attachments',
        associationKey: 'attachments',
        model: 'PartKeepr.FootprintBundle.Entity.FootprintAttachment'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/footprints'
            }
});

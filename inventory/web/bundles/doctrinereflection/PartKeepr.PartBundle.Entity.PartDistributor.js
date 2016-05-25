Ext.define('PartKeepr.PartBundle.Entity.PartDistributor', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.PartDistributor',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'orderNumber', type: 'string'},
                { name: 'packagingUnit', type: 'int'},
                { name: 'price', type: 'number'},
                { name: 'sku', type: 'string'}
                            ,
                            { name: 'part',
                reference: 'PartKeepr.PartBundle.Entity.Part'
                },
                            { name: 'distributor',
                reference: 'PartKeepr.DistributorBundle.Entity.Distributor'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.PartBundle.Entity.PartDistributor'
            }
});

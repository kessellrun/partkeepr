Ext.define('PartKeepr.StockBundle.Entity.StockEntry', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.StockBundle.Entity.StockEntry',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'stockLevel', type: 'int'},
                { name: 'price', type: 'number'},
                { name: 'dateTime', type: 'date'},
                { name: 'correction', type: 'boolean'},
                { name: 'comment', type: 'string'}
                            ,
                            { name: 'part',
                reference: 'PartKeepr.PartBundle.Entity.Part'
                },
                            { name: 'user',
                reference: 'PartKeepr.AuthBundle.Entity.User'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/stock_entries'
            }
});

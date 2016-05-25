Ext.define('PartKeepr.DistributorBundle.Entity.Distributor', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.DistributorBundle.Entity.Distributor',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'address', type: 'string'},
                { name: 'url', type: 'string'},
                { name: 'phone', type: 'string'},
                { name: 'fax', type: 'string'},
                { name: 'email', type: 'string'},
                { name: 'comment', type: 'string'},
                { name: 'skuurl', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/distributors'
            }
});

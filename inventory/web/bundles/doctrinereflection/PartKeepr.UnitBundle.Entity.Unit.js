Ext.define('PartKeepr.UnitBundle.Entity.Unit', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.UnitBundle.Entity.Unit',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'symbol', type: 'string'}
                        
    ],

    
        manyToMany: {
            prefixes: {
            type: 'PartKeepr.SiPrefixBundle.Entity.SiPrefix',
            role: 'prefixes',
            field: '@id',
            right: true
        }         },
    
    proxy: {
        type: "Hydra",
        url: '/api/units'
            }
});

Ext.define('PartKeepr.SiPrefixBundle.Entity.SiPrefix', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.SiPrefixBundle.Entity.SiPrefix',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'prefix', type: 'string'},
                { name: 'symbol', type: 'string'},
                { name: 'exponent', type: 'int'},
                { name: 'base', type: 'int'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/si_prefixes'
            }
});

Ext.define('PartKeepr.PartBundle.Entity.PartParameter', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.PartParameter',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'description', type: 'string'},
                { name: 'value', type: 'number'},
                { name: 'rawValue', type: 'number'}
                            ,
                            { name: 'part',
                reference: 'PartKeepr.PartBundle.Entity.Part'
                },
                            { name: 'unit',
                reference: 'PartKeepr.UnitBundle.Entity.Unit'
                },
                            { name: 'siPrefix',
                reference: 'PartKeepr.SiPrefixBundle.Entity.SiPrefix'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.PartBundle.Entity.PartParameter'
            }
});

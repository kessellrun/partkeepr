Ext.define('PartKeepr.StatisticBundle.Entity.StatisticSnapshot', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.StatisticBundle.Entity.StatisticSnapshot',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'dateTime', type: 'date'},
                { name: 'parts', type: 'int'},
                { name: 'categories', type: 'int'}
                        
    ],

        hasMany: [
            {
        name: 'units',
        associationKey: 'units',
        model: 'PartKeepr.StatisticBundle.Entity.StatisticSnapshotUnit'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.StatisticBundle.Entity.StatisticSnapshot'
            }
});

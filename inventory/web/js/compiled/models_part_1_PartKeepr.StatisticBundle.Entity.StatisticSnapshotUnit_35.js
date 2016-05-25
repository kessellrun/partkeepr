Ext.define('PartKeepr.StatisticBundle.Entity.StatisticSnapshotUnit', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.StatisticBundle.Entity.StatisticSnapshotUnit',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'stockLevel', type: 'int'}
                            ,
                            { name: 'statisticSnapshot',
                reference: 'PartKeepr.StatisticBundle.Entity.StatisticSnapshot'
                },
                            { name: 'partUnit',
                reference: 'PartKeepr.PartBundle.Entity.PartMeasurementUnit'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.StatisticBundle.Entity.StatisticSnapshotUnit'
            }
});

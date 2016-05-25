Ext.define('PartKeepr.PartBundle.Entity.PartMeasurementUnit', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.PartMeasurementUnit',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'shortName', type: 'string'},
                { name: 'default', type: 'boolean'}
                        
    ],

        hasMany: [
            {
        name: 'parts',
        associationKey: 'parts',
        model: 'PartKeepr.PartBundle.Entity.Part'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/part_measurement_units'
            }
});

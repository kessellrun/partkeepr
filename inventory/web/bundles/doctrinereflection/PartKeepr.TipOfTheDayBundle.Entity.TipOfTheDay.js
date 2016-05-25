Ext.define('PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDay', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDay',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/tip_of_the_days'
            }
});

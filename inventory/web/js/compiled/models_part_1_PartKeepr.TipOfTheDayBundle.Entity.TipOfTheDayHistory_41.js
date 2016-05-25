Ext.define('PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDayHistory', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDayHistory',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'}
                            ,
                            { name: 'user',
                reference: 'PartKeepr.AuthBundle.Entity.User'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/tip_of_the_day_histories'
            }
});

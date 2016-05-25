Ext.define('PartKeepr.CronLoggerBundle.Entity.CronLogger', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.CronLoggerBundle.Entity.CronLogger',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'lastRunDate', type: 'date'},
                { name: 'cronjob', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.CronLoggerBundle.Entity.CronLogger'
            }
});

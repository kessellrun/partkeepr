Ext.define('PartKeepr.ImageBundle.Entity.CachedImage', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.ImageBundle.Entity.CachedImage',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'originalId', type: 'int'},
                { name: 'originalType', type: 'string'},
                { name: 'cacheFile', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.ImageBundle.Entity.CachedImage'
            }
});

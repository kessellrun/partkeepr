Ext.define('PartKeepr.FootprintBundle.Entity.FootprintAttachment', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.FootprintBundle.Entity.FootprintAttachment',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'type', type: 'string'},
                { name: 'filename', type: 'string'},
                { name: 'originalFilename', type: 'string'},
                { name: 'mimetype', type: 'string'},
                { name: 'size', type: 'int'},
                { name: 'extension', type: 'string'},
                { name: 'description', type: 'string'},
                { name: 'created', type: 'date'}
                            ,
                            { name: 'footprint',
                reference: 'PartKeepr.FootprintBundle.Entity.Footprint'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.FootprintBundle.Entity.FootprintAttachment'
            }
});

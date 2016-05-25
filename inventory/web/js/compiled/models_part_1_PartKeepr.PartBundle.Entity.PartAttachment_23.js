Ext.define('PartKeepr.PartBundle.Entity.PartAttachment', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.PartAttachment',

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
                { name: 'created', type: 'date'},
                { name: 'isImage', type: 'boolean'}
                            ,
                            { name: 'part',
                reference: 'PartKeepr.PartBundle.Entity.Part'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.PartBundle.Entity.PartAttachment'
            }
});

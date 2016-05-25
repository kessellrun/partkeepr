Ext.define('PartKeepr.UploadedFileBundle.Entity.UploadedFile', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.UploadedFileBundle.Entity.UploadedFile',

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
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.UploadedFileBundle.Entity.UploadedFile'
            }
});

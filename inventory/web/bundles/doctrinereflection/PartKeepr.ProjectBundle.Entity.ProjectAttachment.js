Ext.define('PartKeepr.ProjectBundle.Entity.ProjectAttachment', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.ProjectBundle.Entity.ProjectAttachment',

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
                            { name: 'project',
                reference: 'PartKeepr.ProjectBundle.Entity.Project'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/project_attachments'
            }
});

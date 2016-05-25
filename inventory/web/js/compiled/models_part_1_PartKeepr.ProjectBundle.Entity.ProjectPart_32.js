Ext.define('PartKeepr.ProjectBundle.Entity.ProjectPart', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.ProjectBundle.Entity.ProjectPart',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'quantity', type: 'int'},
                { name: 'remarks', type: 'string'}
                            ,
                            { name: 'part',
                reference: 'PartKeepr.PartBundle.Entity.Part'
                },
                            { name: 'project',
                reference: 'PartKeepr.ProjectBundle.Entity.Project'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/project_parts'
            }
});

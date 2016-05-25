Ext.define('PartKeepr.PartBundle.Entity.PartCategory', {
    extend: 'PartKeepr.data.HydraTreeModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.PartCategory',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'lft', type: 'int'},
                { name: 'rgt', type: 'int'},
                { name: 'lvl', type: 'int'},
                { name: 'root', type: 'int'},
                { name: 'name', type: 'string'},
                { name: 'description', type: 'string'},
                { name: 'categoryPath', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/part_categories'
            }
});

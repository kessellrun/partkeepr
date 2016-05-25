Ext.define('PartKeepr.CategoryBundle.Entity.AbstractCategory', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.CategoryBundle.Entity.AbstractCategory',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'lft', type: 'int'},
                { name: 'rgt', type: 'int'},
                { name: 'lvl', type: 'int'},
                { name: 'root', type: 'int'},
                { name: 'name', type: 'string'},
                { name: 'description', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.CategoryBundle.Entity.AbstractCategory'
            }
});

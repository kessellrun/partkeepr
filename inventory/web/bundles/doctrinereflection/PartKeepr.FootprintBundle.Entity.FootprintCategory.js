Ext.define('PartKeepr.FootprintBundle.Entity.FootprintCategory', {
    extend: 'PartKeepr.data.HydraTreeModel',
    alias: 'schema.PartKeepr.FootprintBundle.Entity.FootprintCategory',

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

        hasMany: [
            {
        name: 'footprints',
        associationKey: 'footprints',
        model: 'PartKeepr.FootprintBundle.Entity.Footprint'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/footprint_categories'
            }
});

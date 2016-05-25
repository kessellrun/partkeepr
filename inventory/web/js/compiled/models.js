Ext.define('FOS.UserBundle.Model.Group', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.FOS.UserBundle.Model.Group',

    idProperty: "@id",
    fields: [
                { name: 'name', type: 'string'},
                { name: 'roles', type: 'array'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:FOS.UserBundle.Model.Group'
            }
});

Ext.define('FOS.UserBundle.Model.User', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.FOS.UserBundle.Model.User',

    idProperty: "@id",
    fields: [
                { name: 'username', type: 'string'},
                { name: 'usernameCanonical', type: 'string'},
                { name: 'email', type: 'string'},
                { name: 'emailCanonical', type: 'string'},
                { name: 'enabled', type: 'boolean'},
                { name: 'salt', type: 'string'},
                { name: 'password', type: 'string'},
                { name: 'lastLogin', type: 'date'},
                { name: 'locked', type: 'boolean'},
                { name: 'expired', type: 'boolean'},
                { name: 'expiresAt', type: 'date'},
                { name: 'confirmationToken', type: 'string'},
                { name: 'passwordRequestedAt', type: 'date'},
                { name: 'roles', type: 'array'},
                { name: 'credentialsExpired', type: 'boolean'},
                { name: 'credentialsExpireAt', type: 'date'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:FOS.UserBundle.Model.User'
            }
});

Ext.define('Gedmo.Tree.Entity.MappedSuperclass.AbstractClosure', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.Gedmo.Tree.Entity.MappedSuperclass.AbstractClosure',

    idProperty: "@id",
    fields: [
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:Gedmo.Tree.Entity.MappedSuperclass.AbstractClosure'
            }
});

Ext.define('PartKeepr.AuthBundle.Entity.FOSUser', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.AuthBundle.Entity.FOSUser',

    idProperty: "@id",
    fields: [
                { name: 'username', type: 'string'},
                { name: 'usernameCanonical', type: 'string'},
                { name: 'enabled', type: 'boolean'},
                { name: 'salt', type: 'string'},
                { name: 'password', type: 'string'},
                { name: 'lastLogin', type: 'date'},
                { name: 'locked', type: 'boolean'},
                { name: 'expired', type: 'boolean'},
                { name: 'expiresAt', type: 'date'},
                { name: 'confirmationToken', type: 'string'},
                { name: 'passwordRequestedAt', type: 'date'},
                { name: 'roles', type: 'array'},
                { name: 'credentialsExpired', type: 'boolean'},
                { name: 'credentialsExpireAt', type: 'date'},
                { name: '@id', type: 'string'},
                { name: 'emailCanonical', type: 'string'},
                { name: 'email', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/f_o_s_users'
            }
});

Ext.define('PartKeepr.AuthBundle.Entity.User', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.AuthBundle.Entity.User',

    idProperty: "@id",
    fields: [
                { name: 'newPassword', type: 'string'},
                { name: 'initialUserPreferences', type: 'string'},
                { name: '@id', type: 'string'},
                { name: 'username', type: 'string'},
                { name: 'password', type: 'string'},
                { name: 'email', type: 'string'},
                { name: 'admin', type: 'boolean'},
                { name: 'legacy', type: 'boolean'},
                { name: 'lastSeen', type: 'date'},
                { name: 'active', type: 'boolean'},
                { name: 'protected', type: 'boolean'}
                            ,
                            { name: 'provider',
                reference: 'PartKeepr.AuthBundle.Entity.UserProvider'
                }
                            
    ],

        hasMany: [
            {
        name: 'tipHistories',
        associationKey: 'tipHistories',
        model: 'PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDayHistory'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/users'
            }
});

Ext.define('PartKeepr.AuthBundle.Entity.UserPreference', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.AuthBundle.Entity.UserPreference',

    idProperty: "@id",
    fields: [
                { name: 'preferenceKey', type: 'string'},
                { name: 'preferenceValue', type: 'string'}
                            ,
                            { name: 'user',
                reference: 'PartKeepr.AuthBundle.Entity.User'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/user_preferences'
                , ignoreIds: true
            }
});

Ext.define('PartKeepr.AuthBundle.Entity.UserProvider', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.AuthBundle.Entity.UserProvider',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'type', type: 'string'},
                { name: 'editable', type: 'boolean'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/user_providers'
            }
});

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

Ext.define('PartKeepr.CoreBundle.Entity.BaseEntity', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.CoreBundle.Entity.BaseEntity',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.CoreBundle.Entity.BaseEntity'
            }
});

Ext.define('PartKeepr.CoreBundle.Entity.SystemNotice', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.CoreBundle.Entity.SystemNotice',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'date', type: 'date'},
                { name: 'title', type: 'string'},
                { name: 'description', type: 'string'},
                { name: 'acknowledged', type: 'boolean'},
                { name: 'type', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/system_notices'
            }
});

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

Ext.define('PartKeepr.DistributorBundle.Entity.Distributor', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.DistributorBundle.Entity.Distributor',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'address', type: 'string'},
                { name: 'url', type: 'string'},
                { name: 'phone', type: 'string'},
                { name: 'fax', type: 'string'},
                { name: 'email', type: 'string'},
                { name: 'comment', type: 'string'},
                { name: 'skuurl', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/distributors'
            }
});

Ext.define('PartKeepr.FootprintBundle.Entity.Footprint', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.FootprintBundle.Entity.Footprint',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'description', type: 'string'}
                            ,
                            { name: 'category',
                reference: 'PartKeepr.FootprintBundle.Entity.FootprintCategory'
                }
                                        ,
                            { name: 'image',
                reference: 'PartKeepr.FootprintBundle.Entity.FootprintImage'
                }
                    
    ],

        hasMany: [
            {
        name: 'attachments',
        associationKey: 'attachments',
        model: 'PartKeepr.FootprintBundle.Entity.FootprintAttachment'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/footprints'
            }
});

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

Ext.define('PartKeepr.FootprintBundle.Entity.FootprintImage', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.FootprintBundle.Entity.FootprintImage',

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
        url: 'undefined:PartKeepr.FootprintBundle.Entity.FootprintImage'
            }
});

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

Ext.define('PartKeepr.ImageBundle.Entity.Image', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.ImageBundle.Entity.Image',

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
        url: 'undefined:PartKeepr.ImageBundle.Entity.Image'
            }
});

Ext.define('PartKeepr.ImageBundle.Entity.TempImage', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.ImageBundle.Entity.TempImage',

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
        url: 'undefined:PartKeepr.ImageBundle.Entity.TempImage'
            }
});

Ext.define('PartKeepr.ManufacturerBundle.Entity.Manufacturer', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.ManufacturerBundle.Entity.Manufacturer',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'address', type: 'string'},
                { name: 'url', type: 'string'},
                { name: 'email', type: 'string'},
                { name: 'comment', type: 'string'},
                { name: 'phone', type: 'string'},
                { name: 'fax', type: 'string'}
                        
    ],

        hasMany: [
            {
        name: 'icLogos',
        associationKey: 'icLogos',
        model: 'PartKeepr.ManufacturerBundle.Entity.ManufacturerICLogo'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/manufacturers'
            }
});

Ext.define('PartKeepr.ManufacturerBundle.Entity.ManufacturerICLogo', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.ManufacturerBundle.Entity.ManufacturerICLogo',

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
                            { name: 'manufacturer',
                reference: 'PartKeepr.ManufacturerBundle.Entity.Manufacturer'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.ManufacturerBundle.Entity.ManufacturerICLogo'
            }
});

Ext.define('PartKeepr.PartBundle.Entity.Part', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.Part',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'description', type: 'string'},
                { name: 'comment', type: 'string'},
                { name: 'stockLevel', type: 'int'},
                { name: 'minStockLevel', type: 'int'},
                { name: 'averagePrice', type: 'number'},
                { name: 'status', type: 'string'},
                { name: 'needsReview', type: 'boolean'},
                { name: 'partCondition', type: 'string'},
                { name: 'createDate', type: 'date'},
                { name: 'internalPartNumber', type: 'string'},
                { name: 'removals', type: 'boolean'},
                { name: 'lowStock', type: 'boolean'}
                            ,
                            { name: 'category',
                reference: 'PartKeepr.PartBundle.Entity.PartCategory'
                },
                            { name: 'footprint',
                reference: 'PartKeepr.FootprintBundle.Entity.Footprint'
                },
                            { name: 'partUnit',
                reference: 'PartKeepr.PartBundle.Entity.PartMeasurementUnit'
                },
                            { name: 'storageLocation',
                reference: 'PartKeepr.StorageLocationBundle.Entity.StorageLocation'
                }
                            
    ],

        hasMany: [
            {
        name: 'manufacturers',
        associationKey: 'manufacturers',
        model: 'PartKeepr.PartBundle.Entity.PartManufacturer'
        },
            {
        name: 'distributors',
        associationKey: 'distributors',
        model: 'PartKeepr.PartBundle.Entity.PartDistributor'
        },
            {
        name: 'attachments',
        associationKey: 'attachments',
        model: 'PartKeepr.PartBundle.Entity.PartAttachment'
        },
            {
        name: 'stockLevels',
        associationKey: 'stockLevels',
        model: 'PartKeepr.StockBundle.Entity.StockEntry'
        },
            {
        name: 'parameters',
        associationKey: 'parameters',
        model: 'PartKeepr.PartBundle.Entity.PartParameter'
        },
            {
        name: 'projectParts',
        associationKey: 'projectParts',
        model: 'PartKeepr.ProjectBundle.Entity.ProjectPart'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/parts'
            }
});

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

Ext.define('PartKeepr.PartBundle.Entity.PartDistributor', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.PartDistributor',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'orderNumber', type: 'string'},
                { name: 'packagingUnit', type: 'int'},
                { name: 'price', type: 'number'},
                { name: 'sku', type: 'string'}
                            ,
                            { name: 'part',
                reference: 'PartKeepr.PartBundle.Entity.Part'
                },
                            { name: 'distributor',
                reference: 'PartKeepr.DistributorBundle.Entity.Distributor'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.PartBundle.Entity.PartDistributor'
            }
});

Ext.define('PartKeepr.PartBundle.Entity.PartImage', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.PartImage',

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
                            { name: 'part',
                reference: 'PartKeepr.PartBundle.Entity.Part'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.PartBundle.Entity.PartImage'
            }
});

Ext.define('PartKeepr.PartBundle.Entity.PartManufacturer', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.PartManufacturer',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'partNumber', type: 'string'}
                            ,
                            { name: 'part',
                reference: 'PartKeepr.PartBundle.Entity.Part'
                },
                            { name: 'manufacturer',
                reference: 'PartKeepr.ManufacturerBundle.Entity.Manufacturer'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.PartBundle.Entity.PartManufacturer'
            }
});

Ext.define('PartKeepr.PartBundle.Entity.PartMeasurementUnit', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.PartMeasurementUnit',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'shortName', type: 'string'},
                { name: 'default', type: 'boolean'}
                        
    ],

        hasMany: [
            {
        name: 'parts',
        associationKey: 'parts',
        model: 'PartKeepr.PartBundle.Entity.Part'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/part_measurement_units'
            }
});

Ext.define('PartKeepr.PartBundle.Entity.PartParameter', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.PartBundle.Entity.PartParameter',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'description', type: 'string'},
                { name: 'value', type: 'number'},
                { name: 'rawValue', type: 'number'}
                            ,
                            { name: 'part',
                reference: 'PartKeepr.PartBundle.Entity.Part'
                },
                            { name: 'unit',
                reference: 'PartKeepr.UnitBundle.Entity.Unit'
                },
                            { name: 'siPrefix',
                reference: 'PartKeepr.SiPrefixBundle.Entity.SiPrefix'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.PartBundle.Entity.PartParameter'
            }
});

Ext.define('PartKeepr.ProjectBundle.Entity.Project', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.ProjectBundle.Entity.Project',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'description', type: 'string'}
                            ,
                            { name: 'user',
                reference: 'PartKeepr.AuthBundle.Entity.User'
                }
                            
    ],

        hasMany: [
            {
        name: 'parts',
        associationKey: 'parts',
        model: 'PartKeepr.ProjectBundle.Entity.ProjectPart'
        },
            {
        name: 'attachments',
        associationKey: 'attachments',
        model: 'PartKeepr.ProjectBundle.Entity.ProjectAttachment'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/projects'
            }
});

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

Ext.define('PartKeepr.SiPrefixBundle.Entity.SiPrefix', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.SiPrefixBundle.Entity.SiPrefix',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'prefix', type: 'string'},
                { name: 'symbol', type: 'string'},
                { name: 'exponent', type: 'int'},
                { name: 'base', type: 'int'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/si_prefixes'
            }
});

Ext.define('PartKeepr.StatisticBundle.Entity.StatisticSnapshot', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.StatisticBundle.Entity.StatisticSnapshot',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'dateTime', type: 'date'},
                { name: 'parts', type: 'int'},
                { name: 'categories', type: 'int'}
                        
    ],

        hasMany: [
            {
        name: 'units',
        associationKey: 'units',
        model: 'PartKeepr.StatisticBundle.Entity.StatisticSnapshotUnit'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.StatisticBundle.Entity.StatisticSnapshot'
            }
});

Ext.define('PartKeepr.StatisticBundle.Entity.StatisticSnapshotUnit', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.StatisticBundle.Entity.StatisticSnapshotUnit',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'stockLevel', type: 'int'}
                            ,
                            { name: 'statisticSnapshot',
                reference: 'PartKeepr.StatisticBundle.Entity.StatisticSnapshot'
                },
                            { name: 'partUnit',
                reference: 'PartKeepr.PartBundle.Entity.PartMeasurementUnit'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.StatisticBundle.Entity.StatisticSnapshotUnit'
            }
});

Ext.define('PartKeepr.StockBundle.Entity.StockEntry', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.StockBundle.Entity.StockEntry',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'stockLevel', type: 'int'},
                { name: 'price', type: 'number'},
                { name: 'dateTime', type: 'date'},
                { name: 'correction', type: 'boolean'},
                { name: 'comment', type: 'string'}
                            ,
                            { name: 'part',
                reference: 'PartKeepr.PartBundle.Entity.Part'
                },
                            { name: 'user',
                reference: 'PartKeepr.AuthBundle.Entity.User'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/stock_entries'
            }
});

Ext.define('PartKeepr.StorageLocationBundle.Entity.StorageLocation', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.StorageLocationBundle.Entity.StorageLocation',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'}
                            ,
                            { name: 'category',
                reference: 'PartKeepr.StorageLocationBundle.Entity.StorageLocationCategory'
                }
                                        ,
                            { name: 'image',
                reference: 'PartKeepr.StorageLocationBundle.Entity.StorageLocationImage'
                }
                    
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/storage_locations'
            }
});

Ext.define('PartKeepr.StorageLocationBundle.Entity.StorageLocationCategory', {
    extend: 'PartKeepr.data.HydraTreeModel',
    alias: 'schema.PartKeepr.StorageLocationBundle.Entity.StorageLocationCategory',

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
        name: 'storageLocations',
        associationKey: 'storageLocations',
        model: 'PartKeepr.StorageLocationBundle.Entity.StorageLocation'
        }
        ],
    
    
    proxy: {
        type: "Hydra",
        url: '/api/storage_location_categories'
            }
});

Ext.define('PartKeepr.StorageLocationBundle.Entity.StorageLocationImage', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.StorageLocationBundle.Entity.StorageLocationImage',

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
                            { name: 'storageLocation',
                reference: 'PartKeepr.StorageLocationBundle.Entity.StorageLocation'
                }
                    
    ],

    
    
    proxy: {
        type: "Hydra",
        url: 'undefined:PartKeepr.StorageLocationBundle.Entity.StorageLocationImage'
            }
});

Ext.define('PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDay', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDay',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'}
                        
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/tip_of_the_days'
            }
});

Ext.define('PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDayHistory', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDayHistory',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'}
                            ,
                            { name: 'user',
                reference: 'PartKeepr.AuthBundle.Entity.User'
                }
                            
    ],

    
    
    proxy: {
        type: "Hydra",
        url: '/api/tip_of_the_day_histories'
            }
});

Ext.define('PartKeepr.UnitBundle.Entity.Unit', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.UnitBundle.Entity.Unit',

    idProperty: "@id",
    fields: [
                { name: '@id', type: 'string'},
                { name: 'name', type: 'string'},
                { name: 'symbol', type: 'string'}
                        
    ],

    
        manyToMany: {
            prefixes: {
            type: 'PartKeepr.SiPrefixBundle.Entity.SiPrefix',
            role: 'prefixes',
            field: '@id',
            right: true
        }         },
    
    proxy: {
        type: "Hydra",
        url: '/api/units'
            }
});

Ext.define('PartKeepr.UploadedFileBundle.Entity.TempUploadedFile', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.UploadedFileBundle.Entity.TempUploadedFile',

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
        url: 'undefined:PartKeepr.UploadedFileBundle.Entity.TempUploadedFile'
            }
});

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

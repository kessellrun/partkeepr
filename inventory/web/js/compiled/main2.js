/**
 * Returns an internationalized string.
 * @param string
 * @return {*}
 */
function i18n (string) {
	return string;
}
/**
 * Exports a grid with all visible fields and rows
 */
Ext.define("PartKeepr.Exporter.GridExporter", {
    constructor: function (gridPanel, format, extension)
    {
        this.gridPanel = gridPanel;
        this.format = format;
        this.extension = extension;
    },
    exportGrid: function ()
    {
        var columns = this.gridPanel.getColumns();

        var store = this.gridPanel.getStore();
        var records = store.getData();
        var record, i, j, value, column, fieldValue;
        var rows = [], rowValues = [], headers = [];

        for (i = 0; i < columns.length; i++) {
            if (!columns[i].isHidden()) {
                rowValues.push(Ext.util.Format.stripTags(columns[i].text));
            }
        }

        rows.push(rowValues);

        for (i = 0; i < records.length; i++) {
            rowValues = [];
            record = records.getAt(i);

            for (j = 0; j < columns.length; j++) {
                column = columns[j];

                fieldValue = record.data[column.dataIndex];

                if (column.renderer && column.renderer.call) {
                    value = column.renderer.call(
                        column.usingDefaultRenderer ? column : column.scope || this.gridPanel,
                        fieldValue,
                        null,
                        record,
                        i,
                        j,
                        store,
                        this.gridPanel.getView());

                } else {
                    value = fieldValue;
                }

                if (!column.isHidden()) {
                    rowValues.push(Ext.util.Format.stripTags(value));
                }
            }

            rows.push(rowValues);
        }


        var options = {
            headers: {}
        };

        options.headers["Accept"] = this.format;
        options.jsonData = rows;
        options.method = "POST";
        //this.down("#formatSelector").getValue().get("mimetype");
        options.url = PartKeepr.getBasePath() + "/api/export";
        options.callback = Ext.bind(this.onExportSuccessful, this);
        Ext.Ajax.request(options);
    },
    /**
     * Callback for when the export is complete. Creates a client-side blob object and forces
     * download of it.
     */
    onExportSuccessful: function (options, success, response)
    {
        var blob = new Blob([response.responseText], {type: this.format});
        saveAs(blob, "export." + this.extension);
    },
});

Ext.define("PartKeepr.Exporter.GridExporterButton", {
    extend: "Ext.button.Button",

    genericExporter: true,

    initComponent: function ()
    {
        this.menu = [
            {
                text: i18n("Export Grid"),
                menu: [
                    {
                        text: i18n("CSV"),
                        handler: "onCSVExport",
                        scope: this
                    }, {
                        text: i18n("Excel 2007 and later"),
                        handler: "onExcelExport",
                        scope: this
                    }
                ]
            }
        ];

        if (this.genericExporter) {
            this.menu.push({
                text: i18n("Custom Export…"),
                handler: "onCustomExport",
                scope: this
            });
        }
        this.callParent(arguments);
    },
    onCSVExport: function ()
    {
        var gridPanel = this.up("gridpanel");
        var exporter = Ext.create("PartKeepr.Exporter.GridExporter", gridPanel, "text/comma-separated-values", "csv");
        exporter.exportGrid();
    },
    onExcelExport: function ()
    {
        var gridPanel = this.up("gridpanel");
        var exporter = Ext.create("PartKeepr.Exporter.GridExporter", gridPanel,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx");
        exporter.exportGrid();
    },
    onCustomExport: function () {
        var j = Ext.create("Ext.window.Window", {
            items: Ext.create("PartKeepr.Exporter.Exporter", {
                model: this.up("gridpanel").getStore().getModel()
            }),
            title: i18n("Export"),
            width: "80%",
            height: "80%",
            layout: 'fit',
            maximizable: true,
            closeAction: 'destroy'

        });
        j.show();
    }
});

/* Blob.js
 * A Blob implementation.
 * 2014-07-24
 *
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/dsamarin
 * License: X11/MIT
 *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
 */

/*global self, unescape */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */

(function (view) {
	"use strict";

	view.URL = view.URL || view.webkitURL;

	if (view.Blob && view.URL) {
		try {
			new Blob;
			return;
		} catch (e) {}
	}

	// Internally we use a BlobBuilder implementation to base Blob off of
	// in order to support older browsers that only have BlobBuilder
	var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || (function(view) {
		var
			  get_class = function(object) {
				return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
			}
			, FakeBlobBuilder = function BlobBuilder() {
				this.data = [];
			}
			, FakeBlob = function Blob(data, type, encoding) {
				this.data = data;
				this.size = data.length;
				this.type = type;
				this.encoding = encoding;
			}
			, FBB_proto = FakeBlobBuilder.prototype
			, FB_proto = FakeBlob.prototype
			, FileReaderSync = view.FileReaderSync
			, FileException = function(type) {
				this.code = this[this.name = type];
			}
			, file_ex_codes = (
				  "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
				+ "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
			).split(" ")
			, file_ex_code = file_ex_codes.length
			, real_URL = view.URL || view.webkitURL || view
			, real_create_object_URL = real_URL.createObjectURL
			, real_revoke_object_URL = real_URL.revokeObjectURL
			, URL = real_URL
			, btoa = view.btoa
			, atob = view.atob

			, ArrayBuffer = view.ArrayBuffer
			, Uint8Array = view.Uint8Array

			, origin = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/
		;
		FakeBlob.fake = FB_proto.fake = true;
		while (file_ex_code--) {
			FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
		}
		// Polyfill URL
		if (!real_URL.createObjectURL) {
			URL = view.URL = function(uri) {
				var
					  uri_info = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
					, uri_origin
				;
				uri_info.href = uri;
				if (!("origin" in uri_info)) {
					if (uri_info.protocol.toLowerCase() === "data:") {
						uri_info.origin = null;
					} else {
						uri_origin = uri.match(origin);
						uri_info.origin = uri_origin && uri_origin[1];
					}
				}
				return uri_info;
			};
		}
		URL.createObjectURL = function(blob) {
			var
				  type = blob.type
				, data_URI_header
			;
			if (type === null) {
				type = "application/octet-stream";
			}
			if (blob instanceof FakeBlob) {
				data_URI_header = "data:" + type;
				if (blob.encoding === "base64") {
					return data_URI_header + ";base64," + blob.data;
				} else if (blob.encoding === "URI") {
					return data_URI_header + "," + decodeURIComponent(blob.data);
				} if (btoa) {
					return data_URI_header + ";base64," + btoa(blob.data);
				} else {
					return data_URI_header + "," + encodeURIComponent(blob.data);
				}
			} else if (real_create_object_URL) {
				return real_create_object_URL.call(real_URL, blob);
			}
		};
		URL.revokeObjectURL = function(object_URL) {
			if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
				real_revoke_object_URL.call(real_URL, object_URL);
			}
		};
		FBB_proto.append = function(data/*, endings*/) {
			var bb = this.data;
			// decode data to a binary string
			if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
				var
					  str = ""
					, buf = new Uint8Array(data)
					, i = 0
					, buf_len = buf.length
				;
				for (; i < buf_len; i++) {
					str += String.fromCharCode(buf[i]);
				}
				bb.push(str);
			} else if (get_class(data) === "Blob" || get_class(data) === "File") {
				if (FileReaderSync) {
					var fr = new FileReaderSync;
					bb.push(fr.readAsBinaryString(data));
				} else {
					// async FileReader won't work as BlobBuilder is sync
					throw new FileException("NOT_READABLE_ERR");
				}
			} else if (data instanceof FakeBlob) {
				if (data.encoding === "base64" && atob) {
					bb.push(atob(data.data));
				} else if (data.encoding === "URI") {
					bb.push(decodeURIComponent(data.data));
				} else if (data.encoding === "raw") {
					bb.push(data.data);
				}
			} else {
				if (typeof data !== "string") {
					data += ""; // convert unsupported types to strings
				}
				// decode UTF-16 to binary string
				bb.push(unescape(encodeURIComponent(data)));
			}
		};
		FBB_proto.getBlob = function(type) {
			if (!arguments.length) {
				type = null;
			}
			return new FakeBlob(this.data.join(""), type, "raw");
		};
		FBB_proto.toString = function() {
			return "[object BlobBuilder]";
		};
		FB_proto.slice = function(start, end, type) {
			var args = arguments.length;
			if (args < 3) {
				type = null;
			}
			return new FakeBlob(
				  this.data.slice(start, args > 1 ? end : this.data.length)
				, type
				, this.encoding
			);
		};
		FB_proto.toString = function() {
			return "[object Blob]";
		};
		FB_proto.close = function() {
			this.size = 0;
			delete this.data;
		};
		return FakeBlobBuilder;
	}(view));

	view.Blob = function(blobParts, options) {
		var type = options ? (options.type || "") : "";
		var builder = new BlobBuilder();
		if (blobParts) {
			for (var i = 0, len = blobParts.length; i < len; i++) {
				if (Uint8Array && blobParts[i] instanceof Uint8Array) {
					builder.append(blobParts[i].buffer);
				}
				else {
					builder.append(blobParts[i]);
				}
			}
		}
		var blob = builder.getBlob(type);
		if (!blob.slice && blob.webkitSlice) {
			blob.slice = blob.webkitSlice;
		}
		return blob;
	};

	var getPrototypeOf = Object.getPrototypeOf || function(object) {
		return object.__proto__;
	};
	view.Blob.prototype = getPrototypeOf(new view.Blob());
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this));

/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.1.20151003
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent)
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		// See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
		// https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
		// for the reasoning behind the timeout and revocation flow
		, arbitrary_revoke_timeout = 500 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			if (view.chrome) {
				revoker();
			} else {
				setTimeout(revoker, arbitrary_revoke_timeout);
			}
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob(["\ufeff", blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if (target_view && is_safari && typeof FileReader !== "undefined") {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var base64Data = reader.result;
							target_view.location.href = "data:attachment/file" + base64Data.slice(base64Data.search(/[,;]/));
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
						var new_tab = view.open(object_url, "_blank");
						if (new_tab == undefined && is_safari) {
							//Apple do not allow window.open, see http://bit.ly/1kZffRI
							view.location.href = object_url
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				save_link.href = object_url;
				save_link.download = name;
				setTimeout(function() {
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			// Update: Google errantly closed 91158, I submitted it again:
			// https://code.google.com/p/chromium/issues/detail?id=389642
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
									revoke(file);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name, no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name || "download");
		};
	}

	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
  define([], function() {
    return saveAs;
  });
}

Ext.define("PartKeepr.PagingToolbar", {
    extend: "Ext.toolbar.Paging",

    grid: null,

    getPagingItems: function () {
        var items = this.callParent(arguments);

        items.push(Ext.create("PartKeepr.Exporter.GridExporterButton", {
            itemId: 'export',
            tooltip: i18n("Export"),
            iconCls: "fugue-icon application-export",
            disabled: this.store.isLoading()
        }));
        return items;
    }
});

Ext.define("PartKeepr.Exporter.Exporter", {
    extend: "Ext.panel.Panel",
    layout: 'border',
    items: [
        {
            title: i18n("Preview"),
            xtype: 'grid',
            region: 'center',
            itemId: 'grid',
        }, {
            title: i18n("Available fields"),
            xtype: 'treepanel',
            region: 'east',
            width: 265,
            itemId: 'fieldTree',
            split: true,
            store: {
                folderSort: true,
                sorters: [
                    {
                        property: 'text',
                        direction: 'ASC'
                    }
                ]
            },
            useArrows: true
        }
    ],
    /**
     * @var {Array} Contains the models already in the field tree
     */
    visitedModels: [],

    /**
     * @var {Array} All configured columns
     */
    columns: [],

    /**
     * @var {Ext.data.Store} The store
     */
    store: null,

    initComponent: function ()
    {
        this.callParent(arguments);
        this.visitedModels = [];
        var schema = this.model.schema;

        var rootNode = this.down("#fieldTree").getRootNode();
        this.down("#fieldTree").on("itemdblclick", this.onTreeDblClick, this);
        rootNode.set("text", this.model.getName());

        this.treeMaker(rootNode, this.model, "");
        rootNode.expand();

        this.store = Ext.create("Ext.data.Store", {
            model: this.model.getName(),
            autoLoad: true
        });

        this.formatStore = Ext.create("Ext.data.Store", {
            fields: ['format', 'extension', 'mimetype'],
            data: [
                {
                    "format": i18n("CSV"),
                    "extension": "csv",
                    "mimetype": "text/comma-separated-values"
                },
                {
                    "format": i18n("Excel 2007 and later"),
                    "extension": "xlsx",
                    "mimetype": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }
            ]
        });

        this.formats = Ext.create("Ext.form.field.ComboBox", {
            store: this.formatStore,
            queryMode: "local",
            displayField: "format",
            forceSelection: true,
            returnObject: true,
            itemId: 'formatSelector',
            value: this.formatStore.getAt(0)
        });
        this.bottomToolbar = Ext.create("Ext.toolbar.Paging", {
            store: this.store,
            enableOverflow: true,
            dock: 'bottom',
            displayInfo: false
        });

        this.bottomToolbar.add([
            '-',
            this.formats,
            {
                xtype: 'button',
                iconCls: 'fugue-icon application-export',
                handler: "doExport",
                scope: this
            }
        ]);

        this.down("#fieldTree").addDocked({
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'web-icon add',
                    handler: "onAddColumn",
                    scope: this
                },
                {
                    xtype: 'button',
                    iconCls: 'web-icon delete',
                    handler: "onRemoveColumn",
                    scope: this
                }
            ]
        });
        this.down("#grid").addDocked(this.bottomToolbar);

        this.down("#grid").reconfigure(this.store, this.columns);
    },
    /**
     * Triggers the export. As we cannot force file downloads via XMLHttpRequest,
     * we need to process the response in a callback.
     */
    doExport: function ()
    {
        var options = {
            headers: {}
        };

        Ext.apply(options.headers, this.store.getProxy().getHeaders());
        options.headers["Accept"] = this.down("#formatSelector").getValue().get("mimetype");
        options.url = this.store.getProxy().getUrl() + "?" + Ext.Object.toQueryString(this.getParams());
        options.callback = Ext.bind(this.onExportSuccessful, this);
        Ext.Ajax.request(options);
    },
    /**
     * Callback for when the export is complete. Creates a client-side blob object and forces
     * download of it.
     */
    onExportSuccessful: function (options, success, response)
    {
        var blob = new Blob([response.responseText], {type: this.down("#formatSelector").getValue().get("mimetype")});
        saveAs(blob, "export." + this.down("#formatSelector").getValue().get("extension"));
    },
    /**
     * Returns the parameters for the query string.
     * @return {Object} An object containing all parameters
     */
    getParams: function ()
    {
        var i, originalColumns, columns = [];
        originalColumns = this.down('#grid').getColumns();
        for (var i = 0; i < originalColumns.length; i++) {
            columns.push(originalColumns[i].dataIndex);
        }

        return {
            itemsPerPage: 9999999,
            columns: Ext.encode(columns)
        };

    },
    /**
     * Event handler for the add button
     */
    onAddColumn: function ()
    {
        var selModel = this.down("#fieldTree").getSelectionModel();
        if (!selModel.hasSelection()) {
            return;
        }

        var record = this.down("#fieldTree").getSelectionModel().getSelection()[0];
        this.addColumn(record);
    }
    ,
    /**
     * Event handler for the remove button
     */
    onRemoveColumn: function ()
    {
        var selModel = this.down("#fieldTree").getSelectionModel();
        if (!selModel.hasSelection()) {
            return;
        }

        var record = this.down("#fieldTree").getSelectionModel().getSelection()[0];
        this.removeColumn(record);
    }
    ,
    /**
     * Adds a specific column to the grid. Must be a record and has the "data" property defined.
     *
     * @param {Ext.data.Model} The record to process
     */
    addColumn: function (record)
    {
        var columns;
        if (this.hasColumn(record) || record.get("data") === undefined) {
            return;
        }

        columns = this.down('#grid').getColumns();

        this.syncColumns();

        this.columns.push({
            dataIndex: record.get("data"),
            text: record.get("data"),
            renderer: function (value, metadata, record, rowIndex, colIndex, store, view)
            {
                return record.get(this.getColumns()[colIndex].dataIndex);
            },
            scope: this.down('#grid')
        });

        this.down("#grid").reconfigure(this.store, this.columns);
    }
    ,
    /**
     * Removes a specific column to the grid. Must be a record and has the "data" property defined.
     *
     * @param {Ext.data.Model} The record to process
     */
    removeColumn: function (record)
    {
        var i;

        if (!this.hasColumn(record) || record.get("data") === undefined) {
            return;
        }

        this.syncColumns();

        for (i = 0; i < this.columns.length; i++) {
            if (this.columns[i].dataIndex === record.get("data")) {
                Ext.Array.removeAt(this.columns, i);
            }
        }
        this.down("#grid").reconfigure(this.store, this.columns);

    }
    ,
    /**
     * Syncronizes the internal columns storage with the grid. The reason it is done that way is because we can't
     * operate on the return value of getColumns() directly, as these are instanciated objects which get removed
     * during a reconfigure operation.
     */
    syncColumns: function ()
    {
        var columns;
        this.columns = [];

        columns = this.down('#grid').getColumns();

        for (i = 0; i < columns.length; i++) {
            this.columns.push({
                dataIndex: columns[i].dataIndex,
                text: columns[i].text,
                renderer: function (value, metadata, record, rowIndex, colIndex, store, view)
                {
                    return record.get(this.getColumns()[colIndex].dataIndex);
                },
                scope: this.down('#grid')
            });
        }

    }
    ,
    /**
     * Returns if a specific column exists in the grid.Must be a record and has the "data" property defined.
     *
     * @param {Ext.data.Model} The record to process
     * @return {Boolean} true if the column exist, false otherwise
     */
    hasColumn: function (record)
    {
        var columns = this.down('#grid').getColumns();

        for (i = 0; i < columns.length; i++) {
            if (columns[i].dataIndex === record.get("data")) {
                return true;
            }
        }

        return false;

    }
    ,
    /**
     * Handles the double click on the tree. Adds the item if it doesn't exist, or remove it otherwise
     *
     * @param {Ext.tree.Tree} The tree panel
     * @param {Ext.data.Model} The double clicked record
     */
    onTreeDblClick: function (tree, record)
    {
        if (this.hasColumn(record)) {
            this.removeColumn(record);
        } else {
            this.addColumn(record);
        }

    }
    ,
    /**
     * Builds the field tree recursively. Handles infinite recursions (e.g. in trees).
     *
     * @param {Ext.data.NodeInterface} The current node
     * @param {Ext.data.Model} The model
     * @param {String} The prefix. Omit if first called
     */
    treeMaker: function (node, model, prefix)
    {
        var fields = model.getFields();
        this.visitedModels.push(model.getName());
        for (var i = 0; i < fields.length; i++) {

            if (fields[i]["$reference"] === undefined) {
                node.appendChild({
                    text: fields[i].name,
                    leaf: true,
                    data: prefix + fields[i].name
                });
            } else {
                for (var j = 0; j < this.visitedModels.length; j++) {
                    if (this.visitedModels[j] === fields[i].reference.cls.getName()) {
                        return;
                    }
                }

                var childNode = node.appendChild({
                    text: fields[i].name,
                    leaf: false
                });

                this.treeMaker(childNode, fields[i].reference.cls, prefix + fields[i].name + ".");
            }

        }
    }
});

Ext.define('PartKeepr.util.Filter', {
    extend: 'Ext.util.Filter',

    /**
     * Creates new Filter.
     * @param {Object} config Config object
     */
    constructor: function (config)
    {

        //config.filterFns

        this.operatorFns["notin"] = function (candidate)
        {
            var v = this._filterValue;
            return !Ext.Array.contains(v, this.getCandidateValue(candidate, v));
        };
        //<debug>
        var warn = Ext.util.Filter.isInvalid(config);
        if (warn) {
            Ext.log.warn(warn);
        }
        //</debug>
        this.initConfig(config);
    },

    preventConvert: {
        'in': 1,
        'notin': 1
    },
});

/**
 * The login manager is responsible for handling logins. Depending on the configuration, the user may be
 * pre-authenticated or the system needs to display a login dialog.
 */
Ext.define('PartKeepr.Auth.LoginManager', {

    mixins: ['Ext.mixin.Observable'],

    /**
     * @var {Object} An instance of the login dialog
     */
    loginDialog: null,

    /**
     * @var {Object} The authentication provider
     */
    provider: null,

    /**
     * @var {Boolean} If the user is logged in or not
     */
    loggedIn: false,

    config: {
        /**
         * @var {Boolean} True if auto-login is required
         */
        autoLogin: false,

        /**
         * @var {String} The username to use for auto-login
         */
        autoLoginUsername: null,

        /**
         * @var {String} The password to use for auto-login
         */
        autoLoginPassword: null
    },

    constructor: function (config)
    {
        this.mixins.observable.constructor.call(this, config);
        this.provider = PartKeepr.Auth.AuthenticationProvider.getAuthenticationProvider();
        this.provider.on("authenticate", this.onAuthenticate, this);

        this.loginDialog = Ext.create("PartKeepr.LoginDialog");
        this.loginDialog.on("login", this.onLoginDialog, this);
    },
    /**
     * Triggers the login process. If auto-login is required, directly calls authenticate(). If not, the
     * login dialog is shown.
     */
    login: function ()
    {
        if (this.config.autoLogin) {
            this.provider.setUsername(this.config.autoLoginUsername);
            this.provider.setPassword(this.config.autoLoginPassword);
            this.provider.authenticate();
        } else {
            this.loginDialog.show();
        }
    },
    /**
     * Triggers the logout process by calling the backend's logout function, which in turn
     * clears the session information and de-authenticates the user.
     */
    logout: function ()
    {
        PartKeepr.AuthBundle.Entity.User.callGetCollectionAction("logout",
            {},
            Ext.bind(this.onLogout, this),
            true
        );
    },
    /**
     * Callback for the logout action. Fires the logout event, which destroys
     * all windows.
     */
    onLogout: function () {
        this.loggedIn = false;
        this.fireEvent("logout");
    },
    /**
     * Callback when the authentication has completed. Fires the "login" event if the authentication was successful.
     * Displays an error message if the authentication was not successful.
     *
     * @param {Boolean} success If the authentication was successful or not
     */
    onAuthenticate: function (success)
    {
        if (success) {
            this.loginDialog.hide();
            this.fireEvent("login");
            this.loggedIn = true;
        } else {
            Ext.Msg.alert(i18n("Error"), i18n('Username or password invalid.'),
                function ()
                {
                    this.loginDialog.show();
                },
                this
            );
        }
    },
    /**
     * Returns the authenticated user
     *
     * @return {Object} The user object
     */
    getUser: function ()
    {
        return this.provider.getUser();
    },
    /**
     * Callback when the login dialog fired the "login" event. Passes the login data to the authentication provider
     * and starts the authentication process
     *
     * @param {String} username The username
     * @param {String} password The password
     */
    onLoginDialog: function (username, password)
    {
        this.provider.setUsername(username);
        this.provider.setPassword(password);
        this.provider.authenticate();
    },
    /**
     * Returns if the user is logged in or not
     *
     * @return {Boolean}
     */
    isLoggedIn: function ()
    {
        return this.loggedIn;
    }

});

/**
 * Fixeds an issue where the summaryRowSelector is null
 */
Ext.define('PartKeepr.grid.feature.Summary', {
    override: 'Ext.grid.feature.Summary',

    fullSummaryTpl: [
        '{%',
        'var me = this.summaryFeature,',
        '    record = me.summaryRecord,',
        '    view = values.view,',
        '    bufferedRenderer = view.bufferedRenderer;',
        'this.nextTpl.applyOut(values, out, parent);',
        'if (!me.disabled && me.showSummaryRow && view.store.isLast(values.record)) {',
        'if (bufferedRenderer) {',
        '    bufferedRenderer.variableRowHeight = true;',
        '}',
        'me.outputSummaryRecord((record && record.isModel) ? record : me.createSummaryRecord(view), values, out, parent);',
        '}',
        '%}',
        {
            priority: 300,
            beginRowSync: function (rowSync)
            {
                rowSync.add('fullSummary', this.summaryFeature.summaryRowSelector);
            },
            syncContent: function (destRow, sourceRow, columnsToUpdate)
            {
                destRow = Ext.fly(destRow, 'syncDest');
                sourceRow = Ext.fly(sourceRow, 'sycSrc');
                var selector = this.summaryFeature.summaryRowSelector;

                var
                    destSummaryRow = destRow.down(selector, true),
                    sourceSummaryRow = sourceRow.down(selector, true);
                // Sync just the updated columns in the summary row.
                if (destSummaryRow && sourceSummaryRow) {
                    // If we were passed a column set, only update those, otherwise do the entire row
                    if (columnsToUpdate) {
                        this.summaryFeature.view.updateColumns(destSummaryRow, sourceSummaryRow, columnsToUpdate);
                    } else {
                        Ext.fly(destSummaryRow).syncContent(sourceSummaryRow);
                    }
                }
            }
        }
    ],
});

/**
 * Base class for authentication providers
 */
Ext.define('PartKeepr.Auth.AuthenticationProvider', {

    mixins: ['Ext.mixin.Observable'],

    /**
     * @var {String} The username
     */
    username: null,

    /**
     * @var {String} The password
     */
    password: null,

    /**
     * @var {Object} The authenaticated user
     */
    user: null,

    constructor: function (config)
    {
        this.mixins.observable.constructor.call(this, config);
    },

    /**
     * Returns any additional headers for the requests.
     *
     * Must be overriden in the child classes.
     *
     * @return {Object} An object with all additional headers
     */
    getHeaders: function ()
    {
        return {};
    },

    /**
     * Sets the username for authentication
     *
     * @param {String} username The username
     */
    setUsername: function (username)
    {
        this.username = username;
    },

    /**
     * Returns the username for authentication
     *
     * @return {String} The username
     */
    getUsername: function ()
    {
        return this.username;
    },

    /**
     * Sets the password for authentication
     *
     * @param {String} password The password
     */
    setPassword: function (password)
    {
        this.password = password;
    },

    /**
     * Returns the password for authentication
     *
     * @return {String} The password
     */
    getPassword: function ()
    {
        return this.password;
    },

    /**
     * Triggers the authentication. By default, this simply calls the /api/users/login action, but
     * can be overriden in child classes to provide advanced logic.
     */
    authenticate: function ()
    {
        PartKeepr.AuthBundle.Entity.User.callPostCollectionAction("login",
            {},
            Ext.bind(this.onLogin, this),
            true
        );
    },
    /**
     * Sets the user object
     *
     * @var {Object} user The user object
     */
    setUser: function (user)
    {
        this.user = user;
    },
    /**
     * Returns the user object
     *
     * @return {Object} The user object
     */
    getUser: function ()
    {
        return this.user;
    },
    /**
     * Callback handler for the login action. Checks if the response contains a status code of 401.
     *
     * @param {Object} options The options object
     * @param {Boolean} success If the request was successful
     * @param {Object} response The response object
     */
    onLogin: function (options, success, response)
    {
        if (response.status == "401") {
            this.fireEvent("authenticate", false);
        } else {
            var records = PartKeepr.AuthBundle.Entity.User.getProxy().getReader().read(response);
            this.setUser(records.getRecords()[0]);
            this.fireEvent("authenticate", true);
        }
    },
    statics: {
        /**
         * @var {Object} The current authentication provider
         */
        authenticationProvider: null,

        /**
         * Retrieves the authentication provider. If no authentication provider is set, automatically
         * returns the base class, which doesn't have any functionality.
         *
         * @return {Object} The authentication provider
         */
        getAuthenticationProvider: function ()
        {
            if (!(this.authenticationProvider instanceof PartKeepr.Auth.AuthenticationProvider)) {
                this.authenticationProvider = Ext.create("PartKeepr.Auth.AuthenticationProvider");
            }

            return this.authenticationProvider;
        },

        /**
         * Sets the authentication provider
         *
         * @param {Object} The authentication provider
         */
        setAuthenticationProvider: function (authenticationProvider)
        {
            this.authenticationProvider = authenticationProvider;

        }
    }
});

/**
 * HTTP Basic Authentication Provider
 */
Ext.define('PartKeepr.Auth.HTTPBasicAuthenticationProvider', {
    extend: 'PartKeepr.Auth.AuthenticationProvider',

    /**
     * @method add
     * @inheritdoc PartKeepr.Auth.AuthenticationProvider#getHeaders
     */
    getHeaders: function ()
    {
        var hash = base64_encode(this.getUsername() + ":" + this.getPassword());

        return {
            "Authorization": "Basic " + hash
        };

    }
});

/**
 * WSSE Authentication Provider
 */
Ext.define('PartKeepr.Auth.WSSEAuthenticationProvider', {
    extend: 'PartKeepr.Auth.AuthenticationProvider',

    /**
     * @var {String} The WSSE secret
     */
    secret: null,

    /**
     * @var {String} The user's salt
     */
    salt: null,

    /**
     * Retrieves the salt for the user. Note that the authentication for WSSE is a two-part process:
     * In order to authenticate, we require the salt first to build the password hash.
     */
    authenticate: function ()
    {
        PartKeepr.AuthBundle.Entity.User.callPostCollectionAction("getSalt",
            {
                username: this.getUsername()
            },
            Ext.bind(this.onSaltRetrieved, this)
        );
    },

    /**
     * Callback when the salt was received. Generates the secret and attempts to login the user.
     *
     * @param {Object} options
     * @param {Object} success
     * @param {Object} response
     */
    onSaltRetrieved: function (options, success, response)
    {
        this.salt = Ext.decode(response.responseText);

        this.generateSecret();

        PartKeepr.AuthBundle.Entity.User.callPostCollectionAction("login",
            {},
            Ext.bind(this.onLogin, this),
            true
        );

    },

    /**
     * @method add
     * @inheritdoc PartKeepr.Auth.AuthenticationProvider#getHeaders
     */
    getHeaders: function ()
    {
        if (this.secret !== null) {
            return {"X-WSSE": this.getWSSE()};
        }
    },

    /**
     * Generates the WSSE Secret
     */
    generateSecret: function ()
    {
        this.secret = CryptoJS.enc.Base64.stringify(CryptoJS.SHA512(this.getPassword() + "{" + this.salt + "}"));
    },

    /**
     * Generates the nonce
     *
     * @param {Integer} length The length of the nonce
     * @return {String} The generated nonce
     */
    generateNonce: function (length)
    {
        var nonceChars = "0123456789abcdef";
        var result = "";
        for (var i = 0; i < length; i++) {
            result += nonceChars.charAt(Math.floor(Math.random() * nonceChars.length));
        }
        return result;
    },

    /**
     * Returns a W3C-Compliant date
     *
     * @param {Object} date The DateTime object to convert
     * @return {String} The W3C-compliant date
     */
    getW3CDate: function (date)
    {
        var yyyy = date.getUTCFullYear();
        var mm = (date.getUTCMonth() + 1);
        if (mm < 10) {
            mm = "0" + mm;
        }
        var dd = (date.getUTCDate());
        if (dd < 10) {
            dd = "0" + dd;
        }
        var hh = (date.getUTCHours());
        if (hh < 10) {
            hh = "0" + hh;
        }
        var mn = (date.getUTCMinutes());
        if (mn < 10) {
            mn = "0" + mn;
        }
        var ss = (date.getUTCSeconds());
        if (ss < 10) {
            ss = "0" + ss;
        }
        return yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + mn + ":" + ss + "Z";
    },

    /**
     * Returns the WSSE string for authentication
     *
     * @return {String}
     */
    getWSSE: function ()
    {
        var nonce = this.generateNonce(16);
        var nonce64 = base64_encode(nonce);
        var created = this.getW3CDate(new Date());

        var digest = this.encodePassword(nonce + created + this.secret, this.salt, 1);
        return "UsernameToken Username=\""
            + this.getUsername() + "\", PasswordDigest=\""
            + digest + "\", Nonce=\""
            + nonce64 + "\", Created=\""
            + created + "\"";
    },

    /**
     * Merges the password and salt
     *
     * @param {String} raw The raw password
     * @param {String} salt The salt
     */
    mergePasswordAndSalt: function (raw, salt)
    {
        return raw + "{" + salt + "}";
    },

    /**
     * Encodes the password with the salt and a specific number of iterations
     *
     * @param {String} raw The raw password
     * @param {String} salt The salt
     * @param {Integer} iterations The number of iterations
     */
    encodePassword: function (raw, salt, iterations)
    {
        var salted = this.mergePasswordAndSalt(raw, salt);

        var digest = CryptoJS.SHA512(salted);

        for (var i = 1; i < digest; i++) {
            digest = CryptoJS.SHA512(digest + salted);
        }

        return CryptoJS.enc.Base64.stringify(digest);
    }
});

Ext.define('PartKeepr.data.store.TipOfTheDayStore', {
    extend: 'Ext.data.Store',

    /**
     * The store ID to use
     */
    storeId: 'TipOfTheDayStore',

    /**
     * Automatically load the store
     */
    autoLoad: true,

    /**
     * The model to use
     */
    model: "PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDay",

    pageSize: 99999999
});

Ext.define('PartKeepr.data.store.TipOfTheDayHistoryStore', {
    extend: 'Ext.data.Store',

    /**
     * The store ID to use
     */
    storeId: 'TipOfTheDayHistoryStore',

    /**
     * Automatically load the store
     */
    autoLoad: true,

    /**
     * The model to use
     */
    model: "PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDayHistory",

    pageSize: 99999999
});

Ext.define('PartKeepr.data.store.UserProviderStore', {
    extend: 'Ext.data.Store',

    /**
     * The store ID to use
     */
    storeId: 'UserProviderStore',

    /**
     * Automatically load the store
     */
    autoLoad: true,

    /**
     * The model to use
     */
    model: "PartKeepr.AuthBundle.Entity.UserProvider",

    pageSize: 99999999
});

/**
 * Represents a project report
 */
Ext.define("PartKeepr.ProjectBundle.Entity.ProjectReport", {
    extend: "PartKeepr.data.HydraModel",
    fields: [
        {name: 'quantity', type: 'int'},
        {name: 'storageLocation_name', type: 'string'},
        {name: 'available', type: 'int'},
        {name: 'missing', type: 'int'},
        {name: 'distributor_order_number', type: 'string'},
        {name: 'sum_order', type: 'float'},
        {name: 'sum', type: 'float'},
        {name: 'projects', type: 'string'},
        {name: 'remarks', type: 'string'},
        {name: 'part', reference: 'PartKeepr.PartBundle.Entity.Part'},
        {name: 'distributor', reference: 'PartKeepr.DistributorBundle.Entity.Distributor'}
    ],

    proxy: {
        type: "Hydra",
        url: '/api/project_reports'
    }
});

Ext.define('PartKeepr.ProjectBundle.Entity.ProjectReportList', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.ProjectBundle.Entity.ProjectReportList',

    idProperty: "@id",

    fields: [
        {name: '@id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'quantity', type: 'integer'},
        {name: 'description', type: 'string'},
        {
            name: 'user',
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

Ext.define('PartKeepr.SystemInformationRecord', {
    extend: 'PartKeepr.data.HydraModel',
    alias: 'schema.PartKeepr.SystemInformationRecord',

    fields: [
                { name: 'name', type: 'string'},
                { name: 'category', type: 'string'},
                { name: 'value', type: 'string'},
    ],



    proxy: {
        type: "Hydra",
        url: '/api/system_information'
    }
});
Ext.define("PartKeepr.StatisticSample", {
	extend: "Ext.data.Model",
	fields: [
	         {	name: 'start',	type: 'date', dateFormat: 'Y-m-d H:i:s'},
	         {	name: 'parts',	type: 'int', useNull: true },
	         {	name: 'categories',	type: 'int', useNull: true }
	         ]
});

/* ----------------------------------------------------------------------
 * Copyright (c) 2012 Yves-Marie K. Rinquin
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * ----------------------------------------------------------------------
 *
 * ISAAC is a cryptographically secure pseudo-random number generator
 * (or CSPRNG for short) designed by Robert J. Jenkins Jr. in 1996 and
 * based on RC4. It is designed for speed and security.
 *
 * ISAAC's informations & analysis:
 *   http://burtleburtle.net/bob/rand/isaac.html
 * ISAAC's implementation details:
 *   http://burtleburtle.net/bob/rand/isaacafa.html
 *
 * ISAAC succesfully passed TestU01
 *
 * ----------------------------------------------------------------------
 *
 * Usage:
 *   <script src="isaac.js"></script>
 *   var random_number = isaac.random();
 *
 * Output: [ 0x00000000; 0xffffffff]
 *         [-2147483648; 2147483647]
 *
 */


/* js string (ucs-2/utf16) to a 32-bit integer (utf-8 chars, little-endian) array */
String.prototype.toIntArray = function() {
  var w1, w2, u, r4 = [], r = [], i = 0;
  var s = this + '\0\0\0'; // pad string to avoid discarding last chars
  var l = s.length - 1;

  while(i < l) {
    w1 = s.charCodeAt(i++);
    w2 = s.charCodeAt(i+1);
    if       (w1 < 0x0080) {
      // 0x0000 - 0x007f code point: basic ascii
      r4.push(w1);
    } else if(w1 < 0x0800) {
      // 0x0080 - 0x07ff code point
      r4.push(((w1 >>>  6) & 0x1f) | 0xc0);
      r4.push(((w1 >>>  0) & 0x3f) | 0x80);
    } else if((w1 & 0xf800) != 0xd800) {
      // 0x0800 - 0xd7ff / 0xe000 - 0xffff code point
      r4.push(((w1 >>> 12) & 0x0f) | 0xe0);
      r4.push(((w1 >>>  6) & 0x3f) | 0x80);
      r4.push(((w1 >>>  0) & 0x3f) | 0x80);
    } else if(((w1 & 0xfc00) == 0xd800)
           && ((w2 & 0xfc00) == 0xdc00)) {
      // 0xd800 - 0xdfff surrogate / 0x10ffff - 0x10000 code point
      u = ((w2 & 0x3f) | ((w1 & 0x3f) << 10)) + 0x10000;
      r4.push(((u >>> 18) & 0x07) | 0xf0);
      r4.push(((u >>> 12) & 0x3f) | 0x80);
      r4.push(((u >>>  6) & 0x3f) | 0x80);
      r4.push(((u >>>  0) & 0x3f) | 0x80);
      i++;
    } else {
      // invalid char
    }
    /* add integer (four utf-8 value) to array */
    if(r4.length > 3) {
      // little endian
      r.push((r4.shift() <<  0) | (r4.shift() <<  8) |
             (r4.shift() << 16) | (r4.shift() << 24));
    }
  }

  return r;
}

/* isaac module pattern */
var isaac = (function(){

  /* private: internal states */
  var m = Array(256), // internal memory
      acc = 0,        // accumulator
      brs = 0,        // last result
      cnt = 0,        // counter
      r = Array(256), // result array
      gnt = 0;        // generation counter

  seed(Math.random() * 0xffffffff);

  /* private: 32-bit integer safe adder */
  function add(x, y) {
    var lsb = (x & 0xffff) + (y & 0xffff);
    var msb = (x >>>   16) + (y >>>   16) + (lsb >>> 16);
    return (msb << 16) | (lsb & 0xffff);
  }

  /* public: initialisation */
  function reset() {
    acc = brs = cnt = 0;
    for(var i = 0; i < 256; ++i)
      m[i] = r[i] = 0;
    gnt = 0;
  }

  /* public: seeding function */
  function seed(s) {
    var a, b, c, d, e, f, g, h, i;

    /* seeding the seeds of love */
    a = b = c = d =
    e = f = g = h = 0x9e3779b9; /* the golden ratio */

    if(s && typeof(s) === 'string')
      s = s.toIntArray();

    if(s && typeof(s) === 'number') {
      s = [s];
    }

    if(s instanceof Array) {
      reset();
      for(i = 0; i < s.length; i++)
        r[i & 0xff] += (typeof(s[i]) === 'number') ? s[i] : 0;
    }

    /* private: seed mixer */
    function seed_mix() {
      a ^= b <<  11; d = add(d, a); b = add(b, c);
      b ^= c >>>  2; e = add(e, b); c = add(c, d);
      c ^= d <<   8; f = add(f, c); d = add(d, e);
      d ^= e >>> 16; g = add(g, d); e = add(e, f);
      e ^= f <<  10; h = add(h, e); f = add(f, g);
      f ^= g >>>  4; a = add(a, f); g = add(g, h);
      g ^= h <<   8; b = add(b, g); h = add(h, a);
      h ^= a >>>  9; c = add(c, h); a = add(a, b);
    }

    for(i = 0; i < 4; i++) /* scramble it */
      seed_mix();

    for(i = 0; i < 256; i += 8) {
      if(s) { /* use all the information in the seed */
        a = add(a, r[i + 0]); b = add(b, r[i + 1]);
        c = add(c, r[i + 2]); d = add(d, r[i + 3]);
        e = add(e, r[i + 4]); f = add(f, r[i + 5]);
        g = add(g, r[i + 6]); h = add(h, r[i + 7]);
      }
      seed_mix();
      /* fill in m[] with messy stuff */
      m[i + 0] = a; m[i + 1] = b; m[i + 2] = c; m[i + 3] = d;
      m[i + 4] = e; m[i + 5] = f; m[i + 6] = g; m[i + 7] = h;
    }
    if(s) {
      /* do a second pass to make all of the seed affect all of m[] */
      for(i = 0; i < 256; i += 8) {
        a = add(a, m[i + 0]); b = add(b, m[i + 1]);
        c = add(c, m[i + 2]); d = add(d, m[i + 3]);
        e = add(e, m[i + 4]); f = add(f, m[i + 5]);
        g = add(g, m[i + 6]); h = add(h, m[i + 7]);
        seed_mix();
        /* fill in m[] with messy stuff (again) */
        m[i + 0] = a; m[i + 1] = b; m[i + 2] = c; m[i + 3] = d;
        m[i + 4] = e; m[i + 5] = f; m[i + 6] = g; m[i + 7] = h;
      }
    }

    prng(); /* fill in the first set of results */
    gnt = 256;  /* prepare to use the first set of results */;
  }

  /* public: isaac generator, n = number of run */
  function prng(n){
    var i, x, y;

    n = (n && typeof(n) === 'number')
      ? Math.abs(Math.floor(n)) : 1;

    while(n--) {
      cnt = add(cnt,   1);
      brs = add(brs, cnt);

      for(i = 0; i < 256; i++) {
        switch(i & 3) {
          case 0: acc ^= acc <<  13; break;
          case 1: acc ^= acc >>>  6; break;
          case 2: acc ^= acc <<   2; break;
          case 3: acc ^= acc >>> 16; break;
        }
        acc        = add(m[(i +  128) & 0xff], acc); x = m[i];
        m[i] =   y = add(m[(x >>>  2) & 0xff], add(acc, brs));
        r[i] = brs = add(m[(y >>> 10) & 0xff], x);
      }
    }
  }

  /* public: return a random number between */
  function rand() {
    if(!gnt--) {
      prng(); gnt = 255;
    }
    return r[gnt];
  }

  /* public: return internals in an object*/
  function internals(){
    return {a: acc, b: brs, c: cnt, m: m, r: r};
  }

  function random(){
    return 0.5 + this.rand() * 2.3283064365386963e-10; // 2^-32
  }

  /* return class object */
  return {
    'reset': reset,
    'seed':  seed,
    'prng':  prng,
    'rand':  rand,
    'random': random,
    'internals': internals
  };
})(); /* declare and execute */

( "undefined" !== ( typeof( module ) ) ) && module.exports && ( module.exports = isaac );
function bCrypt() {
	this.GENSALT_DEFAULT_LOG2_ROUNDS = 10;
	this.BCRYPT_SALT_LEN = 16;
	this.BLOWFISH_NUM_ROUNDS = 16;
	this.MAX_EXECUTION_TIME = 100;
	this.P_orig = [0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344, 0xa4093822,
			0x299f31d0, 0x082efa98, 0xec4e6c89, 0x452821e6, 0x38d01377,
			0xbe5466cf, 0x34e90c6c, 0xc0ac29b7, 0xc97c50dd, 0x3f84d5b5,
			0xb5470917, 0x9216d5d9, 0x8979fb1b];
	this.S_orig = [0xd1310ba6, 0x98dfb5ac, 0x2ffd72db, 0xd01adfb7, 0xb8e1afed,
			0x6a267e96, 0xba7c9045, 0xf12c7f99, 0x24a19947, 0xb3916cf7,
			0x0801f2e2, 0x858efc16, 0x636920d8, 0x71574e69, 0xa458fea3,
			0xf4933d7e, 0x0d95748f, 0x728eb658, 0x718bcd58, 0x82154aee,
			0x7b54a41d, 0xc25a59b5, 0x9c30d539, 0x2af26013, 0xc5d1b023,
			0x286085f0, 0xca417918, 0xb8db38ef, 0x8e79dcb0, 0x603a180e,
			0x6c9e0e8b, 0xb01e8a3e, 0xd71577c1, 0xbd314b27, 0x78af2fda,
			0x55605c60, 0xe65525f3, 0xaa55ab94, 0x57489862, 0x63e81440,
			0x55ca396a, 0x2aab10b6, 0xb4cc5c34, 0x1141e8ce, 0xa15486af,
			0x7c72e993, 0xb3ee1411, 0x636fbc2a, 0x2ba9c55d, 0x741831f6,
			0xce5c3e16, 0x9b87931e, 0xafd6ba33, 0x6c24cf5c, 0x7a325381,
			0x28958677, 0x3b8f4898, 0x6b4bb9af, 0xc4bfe81b, 0x66282193,
			0x61d809cc, 0xfb21a991, 0x487cac60, 0x5dec8032, 0xef845d5d,
			0xe98575b1, 0xdc262302, 0xeb651b88, 0x23893e81, 0xd396acc5,
			0x0f6d6ff3, 0x83f44239, 0x2e0b4482, 0xa4842004, 0x69c8f04a,
			0x9e1f9b5e, 0x21c66842, 0xf6e96c9a, 0x670c9c61, 0xabd388f0,
			0x6a51a0d2, 0xd8542f68, 0x960fa728, 0xab5133a3, 0x6eef0b6c,
			0x137a3be4, 0xba3bf050, 0x7efb2a98, 0xa1f1651d, 0x39af0176,
			0x66ca593e, 0x82430e88, 0x8cee8619, 0x456f9fb4, 0x7d84a5c3,
			0x3b8b5ebe, 0xe06f75d8, 0x85c12073, 0x401a449f, 0x56c16aa6,
			0x4ed3aa62, 0x363f7706, 0x1bfedf72, 0x429b023d, 0x37d0d724,
			0xd00a1248, 0xdb0fead3, 0x49f1c09b, 0x075372c9, 0x80991b7b,
			0x25d479d8, 0xf6e8def7, 0xe3fe501a, 0xb6794c3b, 0x976ce0bd,
			0x04c006ba, 0xc1a94fb6, 0x409f60c4, 0x5e5c9ec2, 0x196a2463,
			0x68fb6faf, 0x3e6c53b5, 0x1339b2eb, 0x3b52ec6f, 0x6dfc511f,
			0x9b30952c, 0xcc814544, 0xaf5ebd09, 0xbee3d004, 0xde334afd,
			0x660f2807, 0x192e4bb3, 0xc0cba857, 0x45c8740f, 0xd20b5f39,
			0xb9d3fbdb, 0x5579c0bd, 0x1a60320a, 0xd6a100c6, 0x402c7279,
			0x679f25fe, 0xfb1fa3cc, 0x8ea5e9f8, 0xdb3222f8, 0x3c7516df,
			0xfd616b15, 0x2f501ec8, 0xad0552ab, 0x323db5fa, 0xfd238760,
			0x53317b48, 0x3e00df82, 0x9e5c57bb, 0xca6f8ca0, 0x1a87562e,
			0xdf1769db, 0xd542a8f6, 0x287effc3, 0xac6732c6, 0x8c4f5573,
			0x695b27b0, 0xbbca58c8, 0xe1ffa35d, 0xb8f011a0, 0x10fa3d98,
			0xfd2183b8, 0x4afcb56c, 0x2dd1d35b, 0x9a53e479, 0xb6f84565,
			0xd28e49bc, 0x4bfb9790, 0xe1ddf2da, 0xa4cb7e33, 0x62fb1341,
			0xcee4c6e8, 0xef20cada, 0x36774c01, 0xd07e9efe, 0x2bf11fb4,
			0x95dbda4d, 0xae909198, 0xeaad8e71, 0x6b93d5a0, 0xd08ed1d0,
			0xafc725e0, 0x8e3c5b2f, 0x8e7594b7, 0x8ff6e2fb, 0xf2122b64,
			0x8888b812, 0x900df01c, 0x4fad5ea0, 0x688fc31c, 0xd1cff191,
			0xb3a8c1ad, 0x2f2f2218, 0xbe0e1777, 0xea752dfe, 0x8b021fa1,
			0xe5a0cc0f, 0xb56f74e8, 0x18acf3d6, 0xce89e299, 0xb4a84fe0,
			0xfd13e0b7, 0x7cc43b81, 0xd2ada8d9, 0x165fa266, 0x80957705,
			0x93cc7314, 0x211a1477, 0xe6ad2065, 0x77b5fa86, 0xc75442f5,
			0xfb9d35cf, 0xebcdaf0c, 0x7b3e89a0, 0xd6411bd3, 0xae1e7e49,
			0x00250e2d, 0x2071b35e, 0x226800bb, 0x57b8e0af, 0x2464369b,
			0xf009b91e, 0x5563911d, 0x59dfa6aa, 0x78c14389, 0xd95a537f,
			0x207d5ba2, 0x02e5b9c5, 0x83260376, 0x6295cfa9, 0x11c81968,
			0x4e734a41, 0xb3472dca, 0x7b14a94a, 0x1b510052, 0x9a532915,
			0xd60f573f, 0xbc9bc6e4, 0x2b60a476, 0x81e67400, 0x08ba6fb5,
			0x571be91f, 0xf296ec6b, 0x2a0dd915, 0xb6636521, 0xe7b9f9b6,
			0xff34052e, 0xc5855664, 0x53b02d5d, 0xa99f8fa1, 0x08ba4799,
			0x6e85076a, 0x4b7a70e9, 0xb5b32944, 0xdb75092e, 0xc4192623,
			0xad6ea6b0, 0x49a7df7d, 0x9cee60b8, 0x8fedb266, 0xecaa8c71,
			0x699a17ff, 0x5664526c, 0xc2b19ee1, 0x193602a5, 0x75094c29,
			0xa0591340, 0xe4183a3e, 0x3f54989a, 0x5b429d65, 0x6b8fe4d6,
			0x99f73fd6, 0xa1d29c07, 0xefe830f5, 0x4d2d38e6, 0xf0255dc1,
			0x4cdd2086, 0x8470eb26, 0x6382e9c6, 0x021ecc5e, 0x09686b3f,
			0x3ebaefc9, 0x3c971814, 0x6b6a70a1, 0x687f3584, 0x52a0e286,
			0xb79c5305, 0xaa500737, 0x3e07841c, 0x7fdeae5c, 0x8e7d44ec,
			0x5716f2b8, 0xb03ada37, 0xf0500c0d, 0xf01c1f04, 0x0200b3ff,
			0xae0cf51a, 0x3cb574b2, 0x25837a58, 0xdc0921bd, 0xd19113f9,
			0x7ca92ff6, 0x94324773, 0x22f54701, 0x3ae5e581, 0x37c2dadc,
			0xc8b57634, 0x9af3dda7, 0xa9446146, 0x0fd0030e, 0xecc8c73e,
			0xa4751e41, 0xe238cd99, 0x3bea0e2f, 0x3280bba1, 0x183eb331,
			0x4e548b38, 0x4f6db908, 0x6f420d03, 0xf60a04bf, 0x2cb81290,
			0x24977c79, 0x5679b072, 0xbcaf89af, 0xde9a771f, 0xd9930810,
			0xb38bae12, 0xdccf3f2e, 0x5512721f, 0x2e6b7124, 0x501adde6,
			0x9f84cd87, 0x7a584718, 0x7408da17, 0xbc9f9abc, 0xe94b7d8c,
			0xec7aec3a, 0xdb851dfa, 0x63094366, 0xc464c3d2, 0xef1c1847,
			0x3215d908, 0xdd433b37, 0x24c2ba16, 0x12a14d43, 0x2a65c451,
			0x50940002, 0x133ae4dd, 0x71dff89e, 0x10314e55, 0x81ac77d6,
			0x5f11199b, 0x043556f1, 0xd7a3c76b, 0x3c11183b, 0x5924a509,
			0xf28fe6ed, 0x97f1fbfa, 0x9ebabf2c, 0x1e153c6e, 0x86e34570,
			0xeae96fb1, 0x860e5e0a, 0x5a3e2ab3, 0x771fe71c, 0x4e3d06fa,
			0x2965dcb9, 0x99e71d0f, 0x803e89d6, 0x5266c825, 0x2e4cc978,
			0x9c10b36a, 0xc6150eba, 0x94e2ea78, 0xa5fc3c53, 0x1e0a2df4,
			0xf2f74ea7, 0x361d2b3d, 0x1939260f, 0x19c27960, 0x5223a708,
			0xf71312b6, 0xebadfe6e, 0xeac31f66, 0xe3bc4595, 0xa67bc883,
			0xb17f37d1, 0x018cff28, 0xc332ddef, 0xbe6c5aa5, 0x65582185,
			0x68ab9802, 0xeecea50f, 0xdb2f953b, 0x2aef7dad, 0x5b6e2f84,
			0x1521b628, 0x29076170, 0xecdd4775, 0x619f1510, 0x13cca830,
			0xeb61bd96, 0x0334fe1e, 0xaa0363cf, 0xb5735c90, 0x4c70a239,
			0xd59e9e0b, 0xcbaade14, 0xeecc86bc, 0x60622ca7, 0x9cab5cab,
			0xb2f3846e, 0x648b1eaf, 0x19bdf0ca, 0xa02369b9, 0x655abb50,
			0x40685a32, 0x3c2ab4b3, 0x319ee9d5, 0xc021b8f7, 0x9b540b19,
			0x875fa099, 0x95f7997e, 0x623d7da8, 0xf837889a, 0x97e32d77,
			0x11ed935f, 0x16681281, 0x0e358829, 0xc7e61fd6, 0x96dedfa1,
			0x7858ba99, 0x57f584a5, 0x1b227263, 0x9b83c3ff, 0x1ac24696,
			0xcdb30aeb, 0x532e3054, 0x8fd948e4, 0x6dbc3128, 0x58ebf2ef,
			0x34c6ffea, 0xfe28ed61, 0xee7c3c73, 0x5d4a14d9, 0xe864b7e3,
			0x42105d14, 0x203e13e0, 0x45eee2b6, 0xa3aaabea, 0xdb6c4f15,
			0xfacb4fd0, 0xc742f442, 0xef6abbb5, 0x654f3b1d, 0x41cd2105,
			0xd81e799e, 0x86854dc7, 0xe44b476a, 0x3d816250, 0xcf62a1f2,
			0x5b8d2646, 0xfc8883a0, 0xc1c7b6a3, 0x7f1524c3, 0x69cb7492,
			0x47848a0b, 0x5692b285, 0x095bbf00, 0xad19489d, 0x1462b174,
			0x23820e00, 0x58428d2a, 0x0c55f5ea, 0x1dadf43e, 0x233f7061,
			0x3372f092, 0x8d937e41, 0xd65fecf1, 0x6c223bdb, 0x7cde3759,
			0xcbee7460, 0x4085f2a7, 0xce77326e, 0xa6078084, 0x19f8509e,
			0xe8efd855, 0x61d99735, 0xa969a7aa, 0xc50c06c2, 0x5a04abfc,
			0x800bcadc, 0x9e447a2e, 0xc3453484, 0xfdd56705, 0x0e1e9ec9,
			0xdb73dbd3, 0x105588cd, 0x675fda79, 0xe3674340, 0xc5c43465,
			0x713e38d8, 0x3d28f89e, 0xf16dff20, 0x153e21e7, 0x8fb03d4a,
			0xe6e39f2b, 0xdb83adf7, 0xe93d5a68, 0x948140f7, 0xf64c261c,
			0x94692934, 0x411520f7, 0x7602d4f7, 0xbcf46b2e, 0xd4a20068,
			0xd4082471, 0x3320f46a, 0x43b7d4b7, 0x500061af, 0x1e39f62e,
			0x97244546, 0x14214f74, 0xbf8b8840, 0x4d95fc1d, 0x96b591af,
			0x70f4ddd3, 0x66a02f45, 0xbfbc09ec, 0x03bd9785, 0x7fac6dd0,
			0x31cb8504, 0x96eb27b3, 0x55fd3941, 0xda2547e6, 0xabca0a9a,
			0x28507825, 0x530429f4, 0x0a2c86da, 0xe9b66dfb, 0x68dc1462,
			0xd7486900, 0x680ec0a4, 0x27a18dee, 0x4f3ffea2, 0xe887ad8c,
			0xb58ce006, 0x7af4d6b6, 0xaace1e7c, 0xd3375fec, 0xce78a399,
			0x406b2a42, 0x20fe9e35, 0xd9f385b9, 0xee39d7ab, 0x3b124e8b,
			0x1dc9faf7, 0x4b6d1856, 0x26a36631, 0xeae397b2, 0x3a6efa74,
			0xdd5b4332, 0x6841e7f7, 0xca7820fb, 0xfb0af54e, 0xd8feb397,
			0x454056ac, 0xba489527, 0x55533a3a, 0x20838d87, 0xfe6ba9b7,
			0xd096954b, 0x55a867bc, 0xa1159a58, 0xcca92963, 0x99e1db33,
			0xa62a4a56, 0x3f3125f9, 0x5ef47e1c, 0x9029317c, 0xfdf8e802,
			0x04272f70, 0x80bb155c, 0x05282ce3, 0x95c11548, 0xe4c66d22,
			0x48c1133f, 0xc70f86dc, 0x07f9c9ee, 0x41041f0f, 0x404779a4,
			0x5d886e17, 0x325f51eb, 0xd59bc0d1, 0xf2bcc18f, 0x41113564,
			0x257b7834, 0x602a9c60, 0xdff8e8a3, 0x1f636c1b, 0x0e12b4c2,
			0x02e1329e, 0xaf664fd1, 0xcad18115, 0x6b2395e0, 0x333e92e1,
			0x3b240b62, 0xeebeb922, 0x85b2a20e, 0xe6ba0d99, 0xde720c8c,
			0x2da2f728, 0xd0127845, 0x95b794fd, 0x647d0862, 0xe7ccf5f0,
			0x5449a36f, 0x877d48fa, 0xc39dfd27, 0xf33e8d1e, 0x0a476341,
			0x992eff74, 0x3a6f6eab, 0xf4f8fd37, 0xa812dc60, 0xa1ebddf8,
			0x991be14c, 0xdb6e6b0d, 0xc67b5510, 0x6d672c37, 0x2765d43b,
			0xdcd0e804, 0xf1290dc7, 0xcc00ffa3, 0xb5390f92, 0x690fed0b,
			0x667b9ffb, 0xcedb7d9c, 0xa091cf0b, 0xd9155ea3, 0xbb132f88,
			0x515bad24, 0x7b9479bf, 0x763bd6eb, 0x37392eb3, 0xcc115979,
			0x8026e297, 0xf42e312d, 0x6842ada7, 0xc66a2b3b, 0x12754ccc,
			0x782ef11c, 0x6a124237, 0xb79251e7, 0x06a1bbe6, 0x4bfb6350,
			0x1a6b1018, 0x11caedfa, 0x3d25bdd8, 0xe2e1c3c9, 0x44421659,
			0x0a121386, 0xd90cec6e, 0xd5abea2a, 0x64af674e, 0xda86a85f,
			0xbebfe988, 0x64e4c3fe, 0x9dbc8057, 0xf0f7c086, 0x60787bf8,
			0x6003604d, 0xd1fd8346, 0xf6381fb0, 0x7745ae04, 0xd736fccc,
			0x83426b33, 0xf01eab71, 0xb0804187, 0x3c005e5f, 0x77a057be,
			0xbde8ae24, 0x55464299, 0xbf582e61, 0x4e58f48f, 0xf2ddfda2,
			0xf474ef38, 0x8789bdc2, 0x5366f9c3, 0xc8b38e74, 0xb475f255,
			0x46fcd9b9, 0x7aeb2661, 0x8b1ddf84, 0x846a0e79, 0x915f95e2,
			0x466e598e, 0x20b45770, 0x8cd55591, 0xc902de4c, 0xb90bace1,
			0xbb8205d0, 0x11a86248, 0x7574a99e, 0xb77f19b6, 0xe0a9dc09,
			0x662d09a1, 0xc4324633, 0xe85a1f02, 0x09f0be8c, 0x4a99a025,
			0x1d6efe10, 0x1ab93d1d, 0x0ba5a4df, 0xa186f20f, 0x2868f169,
			0xdcb7da83, 0x573906fe, 0xa1e2ce9b, 0x4fcd7f52, 0x50115e01,
			0xa70683fa, 0xa002b5c4, 0x0de6d027, 0x9af88c27, 0x773f8641,
			0xc3604c06, 0x61a806b5, 0xf0177a28, 0xc0f586e0, 0x006058aa,
			0x30dc7d62, 0x11e69ed7, 0x2338ea63, 0x53c2dd94, 0xc2c21634,
			0xbbcbee56, 0x90bcb6de, 0xebfc7da1, 0xce591d76, 0x6f05e409,
			0x4b7c0188, 0x39720a3d, 0x7c927c24, 0x86e3725f, 0x724d9db9,
			0x1ac15bb4, 0xd39eb8fc, 0xed545578, 0x08fca5b5, 0xd83d7cd3,
			0x4dad0fc4, 0x1e50ef5e, 0xb161e6f8, 0xa28514d9, 0x6c51133c,
			0x6fd5c7e7, 0x56e14ec4, 0x362abfce, 0xddc6c837, 0xd79a3234,
			0x92638212, 0x670efa8e, 0x406000e0, 0x3a39ce37, 0xd3faf5cf,
			0xabc27737, 0x5ac52d1b, 0x5cb0679e, 0x4fa33742, 0xd3822740,
			0x99bc9bbe, 0xd5118e9d, 0xbf0f7315, 0xd62d1c7e, 0xc700c47b,
			0xb78c1b6b, 0x21a19045, 0xb26eb1be, 0x6a366eb4, 0x5748ab2f,
			0xbc946e79, 0xc6a376d2, 0x6549c2c8, 0x530ff8ee, 0x468dde7d,
			0xd5730a1d, 0x4cd04dc6, 0x2939bbdb, 0xa9ba4650, 0xac9526e8,
			0xbe5ee304, 0xa1fad5f0, 0x6a2d519a, 0x63ef8ce2, 0x9a86ee22,
			0xc089c2b8, 0x43242ef6, 0xa51e03aa, 0x9cf2d0a4, 0x83c061ba,
			0x9be96a4d, 0x8fe51550, 0xba645bd6, 0x2826a2f9, 0xa73a3ae1,
			0x4ba99586, 0xef5562e9, 0xc72fefd3, 0xf752f7da, 0x3f046f69,
			0x77fa0a59, 0x80e4a915, 0x87b08601, 0x9b09e6ad, 0x3b3ee593,
			0xe990fd5a, 0x9e34d797, 0x2cf0b7d9, 0x022b8b51, 0x96d5ac3a,
			0x017da67d, 0xd1cf3ed6, 0x7c7d2d28, 0x1f9f25cf, 0xadf2b89b,
			0x5ad6b472, 0x5a88f54c, 0xe029ac71, 0xe019a5e6, 0x47b0acfd,
			0xed93fa9b, 0xe8d3c48d, 0x283b57cc, 0xf8d56629, 0x79132e28,
			0x785f0191, 0xed756055, 0xf7960e44, 0xe3d35e8c, 0x15056dd4,
			0x88f46dba, 0x03a16125, 0x0564f0bd, 0xc3eb9e15, 0x3c9057a2,
			0x97271aec, 0xa93a072a, 0x1b3f6d9b, 0x1e6321f5, 0xf59c66fb,
			0x26dcf319, 0x7533d928, 0xb155fdf5, 0x03563482, 0x8aba3cbb,
			0x28517711, 0xc20ad9f8, 0xabcc5167, 0xccad925f, 0x4de81751,
			0x3830dc8e, 0x379d5862, 0x9320f991, 0xea7a90c2, 0xfb3e7bce,
			0x5121ce64, 0x774fbe32, 0xa8b6e37e, 0xc3293d46, 0x48de5369,
			0x6413e680, 0xa2ae0810, 0xdd6db224, 0x69852dfd, 0x09072166,
			0xb39a460a, 0x6445c0dd, 0x586cdecf, 0x1c20c8ae, 0x5bbef7dd,
			0x1b588d40, 0xccd2017f, 0x6bb4e3bb, 0xdda26a7e, 0x3a59ff45,
			0x3e350a44, 0xbcb4cdd5, 0x72eacea8, 0xfa6484bb, 0x8d6612ae,
			0xbf3c6f47, 0xd29be463, 0x542f5d9e, 0xaec2771b, 0xf64e6370,
			0x740e0d8d, 0xe75b1357, 0xf8721671, 0xaf537d5d, 0x4040cb08,
			0x4eb4e2cc, 0x34d2466a, 0x0115af84, 0xe1b00428, 0x95983a1d,
			0x06b89fb4, 0xce6ea048, 0x6f3f3b82, 0x3520ab82, 0x011a1d4b,
			0x277227f8, 0x611560b1, 0xe7933fdc, 0xbb3a792b, 0x344525bd,
			0xa08839e1, 0x51ce794b, 0x2f32c9b7, 0xa01fbac9, 0xe01cc87e,
			0xbcc7d1f6, 0xcf0111c3, 0xa1e8aac7, 0x1a908749, 0xd44fbd9a,
			0xd0dadecb, 0xd50ada38, 0x0339c32a, 0xc6913667, 0x8df9317c,
			0xe0b12b4f, 0xf79e59b7, 0x43f5bb3a, 0xf2d519ff, 0x27d9459c,
			0xbf97222c, 0x15e6fc2a, 0x0f91fc71, 0x9b941525, 0xfae59361,
			0xceb69ceb, 0xc2a86459, 0x12baa8d1, 0xb6c1075e, 0xe3056a0c,
			0x10d25065, 0xcb03a442, 0xe0ec6e0e, 0x1698db3b, 0x4c98a0be,
			0x3278e964, 0x9f1f9532, 0xe0d392df, 0xd3a0342b, 0x8971f21e,
			0x1b0a7441, 0x4ba3348c, 0xc5be7120, 0xc37632d8, 0xdf359f8d,
			0x9b992f2e, 0xe60b6f47, 0x0fe3f11d, 0xe54cda54, 0x1edad891,
			0xce6279cf, 0xcd3e7e6f, 0x1618b166, 0xfd2c1d05, 0x848fd2c5,
			0xf6fb2299, 0xf523f357, 0xa6327623, 0x93a83531, 0x56cccd02,
			0xacf08162, 0x5a75ebb5, 0x6e163697, 0x88d273cc, 0xde966292,
			0x81b949d0, 0x4c50901b, 0x71c65614, 0xe6c6c7bd, 0x327a140a,
			0x45e1d006, 0xc3f27b9a, 0xc9aa53fd, 0x62a80f00, 0xbb25bfe2,
			0x35bdd2f6, 0x71126905, 0xb2040222, 0xb6cbcf7c, 0xcd769c2b,
			0x53113ec0, 0x1640e3d3, 0x38abbd60, 0x2547adf0, 0xba38209c,
			0xf746ce76, 0x77afa1c5, 0x20756060, 0x85cbfe4e, 0x8ae88dd8,
			0x7aaaf9b0, 0x4cf9aa7e, 0x1948c25c, 0x02fb8a8c, 0x01c36ae4,
			0xd6ebe1f9, 0x90d4f869, 0xa65cdea0, 0x3f09252d, 0xc208e69f,
			0xb74e6132, 0xce77e25b, 0x578fdfe3, 0x3ac372e6];
	this.bf_crypt_ciphertext = [0x4f727068, 0x65616e42, 0x65686f6c, 0x64657253,
			0x63727944, 0x6f756274];
	this.base64_code = ['.', '/', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
			'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
			'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
			'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
			'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8',
			'9'];
	this.index_64 = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1,
			54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1, -1,
			2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28, 29, 30, 31,
			32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
			49, 50, 51, 52, 53, -1, -1, -1, -1, -1];
	this.P;
	this.S;
	this.lr;
	this.offp;
};
bCrypt.prototype.getByte = function(c) {
	var ret = 0;
	try {
		var b = c.charCodeAt(0);
	} catch (err) {
		b = c;
	}
	if (b > 127) {
		return -128 + (b % 128);
	} else {
		return b;
	}
};
bCrypt.prototype.encode_base64 = function(d, len) {
	var off = 0;
	var rs = [];
	var c1;
	var c2;
	if (len <= 0 || len > d.length)
		throw "Invalid len";
	while (off < len) {
		c1 = d[off++] & 0xff;
		rs.push(this.base64_code[(c1 >> 2) & 0x3f]);
		c1 = (c1 & 0x03) << 4;
		if (off >= len) {
			rs.push(this.base64_code[c1 & 0x3f]);
			break;
		}
		c2 = d[off++] & 0xff;
		c1 |= (c2 >> 4) & 0x0f;
		rs.push(this.base64_code[c1 & 0x3f]);
		c1 = (c2 & 0x0f) << 2;
		if (off >= len) {
			rs.push(this.base64_code[c1 & 0x3f]);
			break;
		}
		c2 = d[off++] & 0xff;
		c1 |= (c2 >> 6) & 0x03;
		rs.push(this.base64_code[c1 & 0x3f]);
		rs.push(this.base64_code[c2 & 0x3f]);
	}
	return rs.join('');
};
bCrypt.prototype.char64 = function(x) {
	var code = x.charCodeAt(0);
	if (code < 0 || code > this.index_64.length) {
		return -1;
	}
	return this.index_64[code];
};
bCrypt.prototype.decode_base64 = function(s, maxolen) {
	var off = 0;
	var slen = s.length;
	var olen = 0;
	var rs = [];
	var c1, c2, c3, c4, o;
	if (maxolen <= 0)
		throw "Invalid maxolen";
	while (off < slen - 1 && olen < maxolen) {
		c1 = this.char64(s.charAt(off++));
		c2 = this.char64(s.charAt(off++));
		if (c1 == -1 || c2 == -1) {
			break;
		}
		o = this.getByte(c1 << 2);
		o |= (c2 & 0x30) >> 4;
		rs.push(String.fromCharCode(o));
		if (++olen >= maxolen || off >= slen) {
			break;
		}
		c3 = this.char64(s.charAt(off++));
		if (c3 == -1) {
			break;
		}
		o = this.getByte((c2 & 0x0f) << 4);
		o |= (c3 & 0x3c) >> 2;
		rs.push(String.fromCharCode(o));
		if (++olen >= maxolen || off >= slen) {
			break;
		}
		c4 = this.char64(s.charAt(off++));
		o = this.getByte((c3 & 0x03) << 6);
		o |= c4;
		rs.push(String.fromCharCode(o));
		++olen;
	}
	var ret = [];
	for (off = 0; off < olen; off++) {
		ret.push(this.getByte(rs[off]));
	}
	return ret;
};
bCrypt.prototype.encipher = function(lr, off) {
	var i;
	var n;
	var l = lr[off];
	var r = lr[off + 1];

	l ^= this.P[0];
	for (i = 0; i <= this.BLOWFISH_NUM_ROUNDS - 2;) {
		// Feistel substitution on left word
		n = this.S[(l >> 24) & 0xff];
		n += this.S[0x100 | ((l >> 16) & 0xff)];
		n ^= this.S[0x200 | ((l >> 8) & 0xff)];
		n += this.S[0x300 | (l & 0xff)];
		r ^= n ^ this.P[++i];

		// Feistel substitution on right word
		n = this.S[(r >> 24) & 0xff];
		n += this.S[0x100 | ((r >> 16) & 0xff)];
		n ^= this.S[0x200 | ((r >> 8) & 0xff)];
		n += this.S[0x300 | (r & 0xff)];
		l ^= n ^ this.P[++i];
	}
	lr[off] = r ^ this.P[this.BLOWFISH_NUM_ROUNDS + 1];
	lr[off + 1] = l;
};
bCrypt.prototype.streamtoword = function(data, offp) {
	var i;
	var word = 0;
	var off = offp;
	for (i = 0; i < 4; i++) {
		word = (word << 8) | (data[off] & 0xff);
		off = (off + 1) % data.length;
	}
	this.offp = off;
	return word;
};
bCrypt.prototype.init_key = function() {
	this.P = this.P_orig.slice();
	this.S = this.S_orig.slice();
};
bCrypt.prototype.key = function(key) {
	var i;
	this.offp = 0;
	var lr = new Array(0x00000000, 0x00000000);
	var plen = this.P.length;
	var slen = this.S.length;

	for (i = 0; i < plen; i++) {
		this.P[i] = this.P[i] ^ this.streamtoword(key, this.offp);
	}
	for (i = 0; i < plen; i += 2) {
		this.encipher(lr, 0);
		this.P[i] = lr[0];
		this.P[i + 1] = lr[1];
	}

	for (i = 0; i < slen; i += 2) {
		this.encipher(lr, 0);
		this.S[i] = lr[0];
		this.S[i + 1] = lr[1];
	}
};
bCrypt.prototype.ekskey = function(data, key) {
	var i;
	this.offp = 0;
	var lr = new Array(0x00000000, 0x00000000);
	var plen = this.P.length;
	var slen = this.S.length;

	for (i = 0; i < plen; i++)
		this.P[i] = this.P[i] ^ this.streamtoword(key, this.offp);
	this.offp = 0;
	for (i = 0; i < plen; i += 2) {
		lr[0] ^= this.streamtoword(data, this.offp);
		lr[1] ^= this.streamtoword(data, this.offp);
		this.encipher(lr, 0);
		this.P[i] = lr[0];
		this.P[i + 1] = lr[1];
	}
	for (i = 0; i < slen; i += 2) {
		lr[0] ^= this.streamtoword(data, this.offp);
		lr[1] ^= this.streamtoword(data, this.offp);
		this.encipher(lr, 0);
		this.S[i] = lr[0];
		this.S[i + 1] = lr[1];
	}
};

bCrypt.prototype.crypt_raw = function(password, salt, log_rounds, cdata, callback, progress) {
	var rounds;
	var j;
	var clen = cdata.length;
	var one_percent;

	if (log_rounds < 4) {
        throw "Minium of 4 rounds required, changing to default";
    }
	if (log_rounds > 30) {
        throw "Maximum of 30 rounds exceded";
    }

	if (salt.length != this.BCRYPT_SALT_LEN)
		throw "Bad salt length";

	rounds = 1 << log_rounds;
	one_percent = Math.floor(rounds / 100) + 1;
	this.init_key();
	this.ekskey(salt, password);

	var obj = this;
	var i = 0;
	setTimeout(function(){
		if(i < rounds){
			var start = new Date();
			for (; i != rounds;) {
				i = i + 1;
				obj.key(password);
				obj.key(salt);
		                if(i % one_percent == 0){
			        	progress();
                		}
		                if((new Date() - start) > obj.MAX_EXECUTION_TIME){
                    			break;
		                }
            		}
		        setTimeout(arguments.callee, 0);
        	}else{
 	        	for (i = 0; i < 64; i++) {
                		for (j = 0; j < (clen >> 1); j++) {
                    			obj.encipher(cdata, j << 1);
                		}
            		}
			var ret = [];
		        for (i = 0; i < clen; i++) {
                		ret.push(obj.getByte((cdata[i] >> 24) & 0xff));
                		ret.push(obj.getByte((cdata[i] >> 16) & 0xff));
                		ret.push(obj.getByte((cdata[i] >> 8) & 0xff));
                		ret.push(obj.getByte(cdata[i] & 0xff));
            		}
            		callback(ret);
        	}
    	}, 0);
};
/*
 * callback: a function that will be passed the hash when it is complete
 * progress: optional - this function will be called every time 1% of hashing
 *      is complete.
 */
bCrypt.prototype.hashpw = function(password, salt, callback, progress) {
	var real_salt;
	var passwordb = [];
	var saltb = [];
	var hashed = [];
	var minor = String.fromCharCode(0);
	var rounds = 0;
	var off = 0;

	if (!progress){
	        var progress = function() {};
	}

	if (salt.charAt(0) != '$' || salt.charAt(1) != '2')
		throw "Invalid salt version";
	if (salt.charAt(2) == '$')
		off = 3;
	else {
		minor = salt.charAt(2);
		if (minor != 'y' || salt.charAt(3) != '$')
			throw "Invalid salt revision";
		off = 4;
	}

	// Extract number of rounds
	if (salt.charAt(off + 2) > '$')
		throw "Missing salt rounds";
	var r1 = parseInt(salt.substring(off, off + 1)) * 10;
	var r2 = parseInt(salt.substring(off + 1, off + 2));
	rounds = r1 + r2;
	real_salt = salt.substring(off + 3, off + 25);
	password = password + (minor >= 'a' ? "\000" : "");
	for (var n = 0; n < password.length; n++) {
    var c = password.charCodeAt(n);
    if (c < 128) {
        passwordb.push(c);
    }
    else if((c > 127) && (c < 2048)) {
        passwordb.push((c >> 6) | 192);
        passwordb.push((c & 63) | 128);
    }
    else if ((c >= 55296) && (c <= 56319)) {
        n++;
        if (n > password.length) {
            throw "utf-16 Decoding error: lead surrogate found without trail surrogate";
        }
        c = password.charCodeAt(n);
        if (c < 56320 || c > 57343) {
            throw "utf-16 Decoding error: trail surrogate not in the range of 0xdc00 through 0xdfff";
        }
        c = ((password.charCodeAt(n - 1) - 55296) << 10) + (c - 56320) + 65536;
        passwordb.push((c >> 18) | 240);
        passwordb.push(((c >> 12) & 63) | 128);
        passwordb.push(((c >> 6) & 63) | 128);
        passwordb.push((c & 63) | 128);
    }
    else {
        passwordb.push((c >> 12) | 224);
        passwordb.push(((c >> 6) & 63) | 128);
        passwordb.push((c & 63) | 128);
    }
	}
	saltb = this.decode_base64(real_salt, this.BCRYPT_SALT_LEN);
	var obj = this;
	this.crypt_raw(passwordb, saltb, rounds, obj.bf_crypt_ciphertext.slice(), function(hashed) {
		var rs = [];
	        rs.push("$2");
	        if (minor >= 'a')
			rs.push(minor);
		rs.push("$");
        	if (rounds < 10)
			rs.push("0");
        	rs.push(rounds.toString());
	        rs.push("$");
	        rs.push(obj.encode_base64(saltb, saltb.length));
	        rs.push(obj.encode_base64(hashed, obj.bf_crypt_ciphertext.length * 4 - 1));
	        callback(rs.join(''));
	}, progress);
};

bCrypt.prototype.gensalt = function(rounds) {
	var iteration_count = rounds;
	if (iteration_count < 4 || iteration_count > 30) {
		throw "Rounds exceded maximum (30)!"
	}
	var output = [];
	output.push("$2a$");
	if (iteration_count < 10)
		output.push("0");
	output.push(iteration_count.toString());
	output.push('$');
	var s1 = [];
	for (var r = 0; r < this.BCRYPT_SALT_LEN; r++){
		s1.push(Math.abs(isaac.rand()));
	}
	output.push(this.encode_base64(s1,this.BCRYPT_SALT_LEN))
	return output.join('');
};

bCrypt.prototype.ready = function(){
	return true;
};

bCrypt.prototype.checkpw = function(plaintext, hashed, callback, progress) {
	var off = 0;
	if (hashed.charAt(0) != '$' || hashed.charAt(1) != '2')
		throw "Invalid salt version";
	if (hashed.charAt(2) == '$')
		off = 3;
	else {
		minor = hashed.charAt(2);
		if (minor != 'a' || hashed.charAt(3) != '$') {
			throw "Invalid salt revision";
		}
		off = 4;
	}
	salt = hashed.substring(0, off + 25)
	this.hashpw(plaintext, salt, function(try_pass) {
		var ret = 0;
		for(var i = 0; i < hashed.length; i++){
			ret |= bcrypt.getByte(hashed[i]) ^ bcrypt.getByte(try_pass[i])
		}
		callback(ret == 0);
	}, progress);
};
/**
 * CryptoJS core components.
 */
var CryptoJS = CryptoJS || (function (Math, undefined) {
    /**
     * CryptoJS namespace.
     */
    var C = {};

    /**
     * Library namespace.
     */
    var C_lib = C.lib = {};

    /**
     * Base object for prototypal inheritance.
     */
    var Base = C_lib.Base = (function () {
        function F() {}

        return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function (overrides) {
                // Spawn
                F.prototype = this;
                var subtype = new F();

                // Augment
                if (overrides) {
                    subtype.mixIn(overrides);
                }

                // Create default initializer
                if (!subtype.hasOwnProperty('init')) {
                    subtype.init = function () {
                        subtype.$super.init.apply(this, arguments);
                    };
                }

                // Initializer's prototype is the subtype object
                subtype.init.prototype = subtype;

                // Reference supertype
                subtype.$super = this;

                return subtype;
            },

            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function () {
                var instance = this.extend();
                instance.init.apply(instance, arguments);

                return instance;
            },

            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function () {
            },

            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function (properties) {
                for (var propertyName in properties) {
                    if (properties.hasOwnProperty(propertyName)) {
                        this[propertyName] = properties[propertyName];
                    }
                }

                // IE won't copy toString using the loop above
                if (properties.hasOwnProperty('toString')) {
                    this.toString = properties.toString;
                }
            },

            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function () {
                return this.init.prototype.extend(this);
            }
        };
    }());

    /**
     * An array of 32-bit words.
     *
     * @property {Array} words The array of 32-bit words.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var WordArray = C_lib.WordArray = Base.extend({
        /**
         * Initializes a newly created word array.
         *
         * @param {Array} words (Optional) An array of 32-bit words.
         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
         *
         * @example
         *
         *     var wordArray = CryptoJS.lib.WordArray.create();
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
         */
        init: function (words, sigBytes) {
            words = this.words = words || [];

            if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 4;
            }
        },

        /**
         * Converts this word array to a string.
         *
         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
         *
         * @return {string} The stringified word array.
         *
         * @example
         *
         *     var string = wordArray + '';
         *     var string = wordArray.toString();
         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
         */
        toString: function (encoder) {
            return (encoder || Hex).stringify(this);
        },

        /**
         * Concatenates a word array to this word array.
         *
         * @param {WordArray} wordArray The word array to append.
         *
         * @return {WordArray} This word array.
         *
         * @example
         *
         *     wordArray1.concat(wordArray2);
         */
        concat: function (wordArray) {
            // Shortcuts
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;

            // Clamp excess bits
            this.clamp();

            // Concat
            if (thisSigBytes % 4) {
                // Copy one byte at a time
                for (var i = 0; i < thatSigBytes; i++) {
                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
                }
            } else if (thatWords.length > 0xffff) {
                // Copy one word at a time
                for (var i = 0; i < thatSigBytes; i += 4) {
                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
                }
            } else {
                // Copy all words at once
                thisWords.push.apply(thisWords, thatWords);
            }
            this.sigBytes += thatSigBytes;

            // Chainable
            return this;
        },

        /**
         * Removes insignificant bits.
         *
         * @example
         *
         *     wordArray.clamp();
         */
        clamp: function () {
            // Shortcuts
            var words = this.words;
            var sigBytes = this.sigBytes;

            // Clamp
            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
            words.length = Math.ceil(sigBytes / 4);
        },

        /**
         * Creates a copy of this word array.
         *
         * @return {WordArray} The clone.
         *
         * @example
         *
         *     var clone = wordArray.clone();
         */
        clone: function () {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);

            return clone;
        },

        /**
         * Creates a word array filled with random bytes.
         *
         * @param {number} nBytes The number of random bytes to generate.
         *
         * @return {WordArray} The random word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.lib.WordArray.random(16);
         */
        random: function (nBytes) {
            var words = [];
            for (var i = 0; i < nBytes; i += 4) {
                words.push((Math.random() * 0x100000000) | 0);
            }

            return new WordArray.init(words, nBytes);
        }
    });

    /**
     * Encoder namespace.
     */
    var C_enc = C.enc = {};

    /**
     * Hex encoding strategy.
     */
    var Hex = C_enc.Hex = {
        /**
         * Converts a word array to a hex string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The hex string.
         *
         * @static
         *
         * @example
         *
         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;

            // Convert
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 0x0f).toString(16));
            }

            return hexChars.join('');
        },

        /**
         * Converts a hex string to a word array.
         *
         * @param {string} hexStr The hex string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
         */
        parse: function (hexStr) {
            // Shortcut
            var hexStrLength = hexStr.length;

            // Convert
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
            }

            return new WordArray.init(words, hexStrLength / 2);
        }
    };

    /**
     * Latin1 encoding strategy.
     */
    var Latin1 = C_enc.Latin1 = {
        /**
         * Converts a word array to a Latin1 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Latin1 string.
         *
         * @static
         *
         * @example
         *
         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;

            // Convert
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                latin1Chars.push(String.fromCharCode(bite));
            }

            return latin1Chars.join('');
        },

        /**
         * Converts a Latin1 string to a word array.
         *
         * @param {string} latin1Str The Latin1 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
         */
        parse: function (latin1Str) {
            // Shortcut
            var latin1StrLength = latin1Str.length;

            // Convert
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
            }

            return new WordArray.init(words, latin1StrLength);
        }
    };

    /**
     * UTF-8 encoding strategy.
     */
    var Utf8 = C_enc.Utf8 = {
        /**
         * Converts a word array to a UTF-8 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The UTF-8 string.
         *
         * @static
         *
         * @example
         *
         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
         */
        stringify: function (wordArray) {
            try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
                throw new Error('Malformed UTF-8 data');
            }
        },

        /**
         * Converts a UTF-8 string to a word array.
         *
         * @param {string} utf8Str The UTF-8 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
         */
        parse: function (utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
    };

    /**
     * Abstract buffered block algorithm template.
     *
     * The property blockSize must be implemented in a concrete subtype.
     *
     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
     */
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        /**
         * Resets this block algorithm's data buffer to its initial state.
         *
         * @example
         *
         *     bufferedBlockAlgorithm.reset();
         */
        reset: function () {
            // Initial values
            this._data = new WordArray.init();
            this._nDataBytes = 0;
        },

        /**
         * Adds new data to this block algorithm's buffer.
         *
         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
         *
         * @example
         *
         *     bufferedBlockAlgorithm._append('data');
         *     bufferedBlockAlgorithm._append(wordArray);
         */
        _append: function (data) {
            // Convert string to WordArray, else assume WordArray already
            if (typeof data == 'string') {
                data = Utf8.parse(data);
            }

            // Append
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
        },

        /**
         * Processes available data blocks.
         *
         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
         *
         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
         *
         * @return {WordArray} The processed data.
         *
         * @example
         *
         *     var processedData = bufferedBlockAlgorithm._process();
         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
         */
        _process: function (doFlush) {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;

            // Count blocks ready
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
                // Round up to include partial blocks
                nBlocksReady = Math.ceil(nBlocksReady);
            } else {
                // Round down to include only full blocks,
                // less the number of blocks that must remain in the buffer
                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }

            // Count words ready
            var nWordsReady = nBlocksReady * blockSize;

            // Count bytes ready
            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

            // Process blocks
            if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                    // Perform concrete-algorithm logic
                    this._doProcessBlock(dataWords, offset);
                }

                // Remove processed words
                var processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
            }

            // Return processed words
            return new WordArray.init(processedWords, nBytesReady);
        },

        /**
         * Creates a copy of this object.
         *
         * @return {Object} The clone.
         *
         * @example
         *
         *     var clone = bufferedBlockAlgorithm.clone();
         */
        clone: function () {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();

            return clone;
        },

        _minBufferSize: 0
    });

    /**
     * Abstract hasher template.
     *
     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
     */
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
        /**
         * Configuration options.
         */
        cfg: Base.extend(),

        /**
         * Initializes a newly created hasher.
         *
         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
         *
         * @example
         *
         *     var hasher = CryptoJS.algo.SHA256.create();
         */
        init: function (cfg) {
            // Apply config defaults
            this.cfg = this.cfg.extend(cfg);

            // Set initial values
            this.reset();
        },

        /**
         * Resets this hasher to its initial state.
         *
         * @example
         *
         *     hasher.reset();
         */
        reset: function () {
            // Reset data buffer
            BufferedBlockAlgorithm.reset.call(this);

            // Perform concrete-hasher logic
            this._doReset();
        },

        /**
         * Updates this hasher with a message.
         *
         * @param {WordArray|string} messageUpdate The message to append.
         *
         * @return {Hasher} This hasher.
         *
         * @example
         *
         *     hasher.update('message');
         *     hasher.update(wordArray);
         */
        update: function (messageUpdate) {
            // Append
            this._append(messageUpdate);

            // Update the hash
            this._process();

            // Chainable
            return this;
        },

        /**
         * Finalizes the hash computation.
         * Note that the finalize operation is effectively a destructive, read-once operation.
         *
         * @param {WordArray|string} messageUpdate (Optional) A final message update.
         *
         * @return {WordArray} The hash.
         *
         * @example
         *
         *     var hash = hasher.finalize();
         *     var hash = hasher.finalize('message');
         *     var hash = hasher.finalize(wordArray);
         */
        finalize: function (messageUpdate) {
            // Final message update
            if (messageUpdate) {
                this._append(messageUpdate);
            }

            // Perform concrete-hasher logic
            var hash = this._doFinalize();

            return hash;
        },

        blockSize: 512/32,

        /**
         * Creates a shortcut function to a hasher's object interface.
         *
         * @param {Hasher} hasher The hasher to create a helper for.
         *
         * @return {Function} The shortcut function.
         *
         * @static
         *
         * @example
         *
         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
         */
        _createHelper: function (hasher) {
            return function (message, cfg) {
                return new hasher.init(cfg).finalize(message);
            };
        },

        /**
         * Creates a shortcut function to the HMAC's object interface.
         *
         * @param {Hasher} hasher The hasher to use in this HMAC helper.
         *
         * @return {Function} The shortcut function.
         *
         * @static
         *
         * @example
         *
         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
         */
        _createHmacHelper: function (hasher) {
            return function (message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
        }
    });

    /**
     * Algorithm namespace.
     */
    var C_algo = C.algo = {};

    return C;
}(Math));
(function (undefined) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var X32WordArray = C_lib.WordArray;

    /**
     * x64 namespace.
     */
    var C_x64 = C.x64 = {};

    /**
     * A 64-bit word.
     */
    var X64Word = C_x64.Word = Base.extend({
        /**
         * Initializes a newly created 64-bit word.
         *
         * @param {number} high The high 32 bits.
         * @param {number} low The low 32 bits.
         *
         * @example
         *
         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
         */
        init: function (high, low) {
            this.high = high;
            this.low = low;
        }

        /**
         * Bitwise NOTs this word.
         *
         * @return {X64Word} A new x64-Word object after negating.
         *
         * @example
         *
         *     var negated = x64Word.not();
         */
        // not: function () {
            // var high = ~this.high;
            // var low = ~this.low;

            // return X64Word.create(high, low);
        // },

        /**
         * Bitwise ANDs this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to AND with this word.
         *
         * @return {X64Word} A new x64-Word object after ANDing.
         *
         * @example
         *
         *     var anded = x64Word.and(anotherX64Word);
         */
        // and: function (word) {
            // var high = this.high & word.high;
            // var low = this.low & word.low;

            // return X64Word.create(high, low);
        // },

        /**
         * Bitwise ORs this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to OR with this word.
         *
         * @return {X64Word} A new x64-Word object after ORing.
         *
         * @example
         *
         *     var ored = x64Word.or(anotherX64Word);
         */
        // or: function (word) {
            // var high = this.high | word.high;
            // var low = this.low | word.low;

            // return X64Word.create(high, low);
        // },

        /**
         * Bitwise XORs this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to XOR with this word.
         *
         * @return {X64Word} A new x64-Word object after XORing.
         *
         * @example
         *
         *     var xored = x64Word.xor(anotherX64Word);
         */
        // xor: function (word) {
            // var high = this.high ^ word.high;
            // var low = this.low ^ word.low;

            // return X64Word.create(high, low);
        // },

        /**
         * Shifts this word n bits to the left.
         *
         * @param {number} n The number of bits to shift.
         *
         * @return {X64Word} A new x64-Word object after shifting.
         *
         * @example
         *
         *     var shifted = x64Word.shiftL(25);
         */
        // shiftL: function (n) {
            // if (n < 32) {
                // var high = (this.high << n) | (this.low >>> (32 - n));
                // var low = this.low << n;
            // } else {
                // var high = this.low << (n - 32);
                // var low = 0;
            // }

            // return X64Word.create(high, low);
        // },

        /**
         * Shifts this word n bits to the right.
         *
         * @param {number} n The number of bits to shift.
         *
         * @return {X64Word} A new x64-Word object after shifting.
         *
         * @example
         *
         *     var shifted = x64Word.shiftR(7);
         */
        // shiftR: function (n) {
            // if (n < 32) {
                // var low = (this.low >>> n) | (this.high << (32 - n));
                // var high = this.high >>> n;
            // } else {
                // var low = this.high >>> (n - 32);
                // var high = 0;
            // }

            // return X64Word.create(high, low);
        // },

        /**
         * Rotates this word n bits to the left.
         *
         * @param {number} n The number of bits to rotate.
         *
         * @return {X64Word} A new x64-Word object after rotating.
         *
         * @example
         *
         *     var rotated = x64Word.rotL(25);
         */
        // rotL: function (n) {
            // return this.shiftL(n).or(this.shiftR(64 - n));
        // },

        /**
         * Rotates this word n bits to the right.
         *
         * @param {number} n The number of bits to rotate.
         *
         * @return {X64Word} A new x64-Word object after rotating.
         *
         * @example
         *
         *     var rotated = x64Word.rotR(7);
         */
        // rotR: function (n) {
            // return this.shiftR(n).or(this.shiftL(64 - n));
        // },

        /**
         * Adds this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to add with this word.
         *
         * @return {X64Word} A new x64-Word object after adding.
         *
         * @example
         *
         *     var added = x64Word.add(anotherX64Word);
         */
        // add: function (word) {
            // var low = (this.low + word.low) | 0;
            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
            // var high = (this.high + word.high + carry) | 0;

            // return X64Word.create(high, low);
        // }
    });

    /**
     * An array of 64-bit words.
     *
     * @property {Array} words The array of CryptoJS.x64.Word objects.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var X64WordArray = C_x64.WordArray = Base.extend({
        /**
         * Initializes a newly created word array.
         *
         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
         *
         * @example
         *
         *     var wordArray = CryptoJS.x64.WordArray.create();
         *
         *     var wordArray = CryptoJS.x64.WordArray.create([
         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
         *     ]);
         *
         *     var wordArray = CryptoJS.x64.WordArray.create([
         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
         *     ], 10);
         */
        init: function (words, sigBytes) {
            words = this.words = words || [];

            if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 8;
            }
        },

        /**
         * Converts this 64-bit word array to a 32-bit word array.
         *
         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
         *
         * @example
         *
         *     var x32WordArray = x64WordArray.toX32();
         */
        toX32: function () {
            // Shortcuts
            var x64Words = this.words;
            var x64WordsLength = x64Words.length;

            // Convert
            var x32Words = [];
            for (var i = 0; i < x64WordsLength; i++) {
                var x64Word = x64Words[i];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
            }

            return X32WordArray.create(x32Words, this.sigBytes);
        },

        /**
         * Creates a copy of this word array.
         *
         * @return {X64WordArray} The clone.
         *
         * @example
         *
         *     var clone = x64WordArray.clone();
         */
        clone: function () {
            var clone = Base.clone.call(this);

            // Clone "words" array
            var words = clone.words = this.words.slice(0);

            // Clone each X64Word object
            var wordsLength = words.length;
            for (var i = 0; i < wordsLength; i++) {
                words[i] = words[i].clone();
            }

            return clone;
        }
    });
}());
(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Hasher = C_lib.Hasher;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var X64WordArray = C_x64.WordArray;
    var C_algo = C.algo;

    function X64Word_create() {
        return X64Word.create.apply(X64Word, arguments);
    }

    // Constants
    var K = [
        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
    ];

    // Reusable objects
    var W = [];
    (function () {
        for (var i = 0; i < 80; i++) {
            W[i] = X64Word_create();
        }
    }());

    /**
     * SHA-512 hash algorithm.
     */
    var SHA512 = C_algo.SHA512 = Hasher.extend({
        _doReset: function () {
            this._hash = new X64WordArray.init([
                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
            ]);
        },

        _doProcessBlock: function (M, offset) {
            // Shortcuts
            var H = this._hash.words;

            var H0 = H[0];
            var H1 = H[1];
            var H2 = H[2];
            var H3 = H[3];
            var H4 = H[4];
            var H5 = H[5];
            var H6 = H[6];
            var H7 = H[7];

            var H0h = H0.high;
            var H0l = H0.low;
            var H1h = H1.high;
            var H1l = H1.low;
            var H2h = H2.high;
            var H2l = H2.low;
            var H3h = H3.high;
            var H3l = H3.low;
            var H4h = H4.high;
            var H4l = H4.low;
            var H5h = H5.high;
            var H5l = H5.low;
            var H6h = H6.high;
            var H6l = H6.low;
            var H7h = H7.high;
            var H7l = H7.low;

            // Working variables
            var ah = H0h;
            var al = H0l;
            var bh = H1h;
            var bl = H1l;
            var ch = H2h;
            var cl = H2l;
            var dh = H3h;
            var dl = H3l;
            var eh = H4h;
            var el = H4l;
            var fh = H5h;
            var fl = H5l;
            var gh = H6h;
            var gl = H6l;
            var hh = H7h;
            var hl = H7l;

            // Rounds
            for (var i = 0; i < 80; i++) {
                // Shortcut
                var Wi = W[i];

                // Extend message
                if (i < 16) {
                    var Wih = Wi.high = M[offset + i * 2]     | 0;
                    var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
                } else {
                    // Gamma0
                    var gamma0x  = W[i - 15];
                    var gamma0xh = gamma0x.high;
                    var gamma0xl = gamma0x.low;
                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

                    // Gamma1
                    var gamma1x  = W[i - 2];
                    var gamma1xh = gamma1x.high;
                    var gamma1xl = gamma1x.low;
                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
                    var Wi7  = W[i - 7];
                    var Wi7h = Wi7.high;
                    var Wi7l = Wi7.low;

                    var Wi16  = W[i - 16];
                    var Wi16h = Wi16.high;
                    var Wi16l = Wi16.low;

                    var Wil = gamma0l + Wi7l;
                    var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
                    var Wil = Wil + gamma1l;
                    var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
                    var Wil = Wil + Wi16l;
                    var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

                    Wi.high = Wih;
                    Wi.low  = Wil;
                }

                var chh  = (eh & fh) ^ (~eh & gh);
                var chl  = (el & fl) ^ (~el & gl);
                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

                // t1 = h + sigma1 + ch + K[i] + W[i]
                var Ki  = K[i];
                var Kih = Ki.high;
                var Kil = Ki.low;

                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

                // t2 = sigma0 + maj
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

                // Update working variables
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = (dl + t1l) | 0;
                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = (t1l + t2l) | 0;
                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
            }

            // Intermediate hash value
            H0l = H0.low  = (H0l + al);
            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
            H1l = H1.low  = (H1l + bl);
            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
            H2l = H2.low  = (H2l + cl);
            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
            H3l = H3.low  = (H3l + dl);
            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
            H4l = H4.low  = (H4l + el);
            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
            H5l = H5.low  = (H5l + fl);
            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
            H6l = H6.low  = (H6l + gl);
            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
            H7l = H7.low  = (H7l + hl);
            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
        },

        _doFinalize: function () {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;

            // Hash final blocks
            this._process();

            // Convert hash to 32-bit word array before returning
            var hash = this._hash.toX32();

            // Return final computed hash
            return hash;
        },

        clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();

            return clone;
        },

        blockSize: 1024/32
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA512('message');
     *     var hash = CryptoJS.SHA512(wordArray);
     */
    C.SHA512 = Hasher._createHelper(SHA512);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA512(message, key);
     */
    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
}());
(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Reusable object
    var W = [];

    /**
     * SHA-1 hash algorithm.
     */
    var SHA1 = C_algo.SHA1 = Hasher.extend({
        _doReset: function () {
            this._hash = new WordArray.init([
                0x67452301, 0xefcdab89,
                0x98badcfe, 0x10325476,
                0xc3d2e1f0
            ]);
        },

        _doProcessBlock: function (M, offset) {
            // Shortcut
            var H = this._hash.words;

            // Working variables
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];

            // Computation
            for (var i = 0; i < 80; i++) {
                if (i < 16) {
                    W[i] = M[offset + i] | 0;
                } else {
                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                    W[i] = (n << 1) | (n >>> 31);
                }

                var t = ((a << 5) | (a >>> 27)) + e + W[i];
                if (i < 20) {
                    t += ((b & c) | (~b & d)) + 0x5a827999;
                } else if (i < 40) {
                    t += (b ^ c ^ d) + 0x6ed9eba1;
                } else if (i < 60) {
                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
                } else /* if (i < 80) */ {
                    t += (b ^ c ^ d) - 0x359d3e2a;
                }

                e = d;
                d = c;
                c = (b << 30) | (b >>> 2);
                b = a;
                a = t;
            }

            // Intermediate hash value
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
            H[4] = (H[4] + e) | 0;
        },

        _doFinalize: function () {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;

            // Hash final blocks
            this._process();

            // Return final computed hash
            return this._hash;
        },

        clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();

            return clone;
        }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA1('message');
     *     var hash = CryptoJS.SHA1(wordArray);
     */
    C.SHA1 = Hasher._createHelper(SHA1);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA1(message, key);
     */
    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
}());
(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Base64 encoding strategy.
     */
    var Base64 = C_enc.Base64 = {
        /**
         * Converts a word array to a Base64 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Base64 string.
         *
         * @static
         *
         * @example
         *
         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;

            // Clamp excess bits
            wordArray.clamp();

            // Convert
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
                }
            }

            // Add padding
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                while (base64Chars.length % 4) {
                    base64Chars.push(paddingChar);
                }
            }

            return base64Chars.join('');
        },

        /**
         * Converts a Base64 string to a word array.
         *
         * @param {string} base64Str The Base64 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
         */
        parse: function (base64Str) {
            // Shortcuts
            var base64StrLength = base64Str.length;
            var map = this._map;

            // Ignore padding
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex != -1) {
                    base64StrLength = paddingIndex;
                }
            }

            // Convert
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
                if (i % 4) {
                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);
                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2);
                    words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
                    nBytes++;
                }
            }

            return WordArray.create(words, nBytes);
        },

        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };
}());
/**
 * This is a bugfix when a save operation on a model does not update associations returned by the server.
 *
 * The forum thread can be found at https://www.sencha.com/forum/showthread.php?302635-Ext.data.operation.Operation.doProcess-doesn-t-update-associations&p=1106828
 */
Ext.define("PartKeepr.data.Model", {
    override: 'Ext.data.Model',

    hasField: function (fieldName) {
        var fields = this.getFields();


        for (var i in fields) {
            if (fields[i].name == fieldName && fields[i].reference === null) {
                return true;
            }
        }

        return false;
    },
    /**
     * Saves the model instance using the configured proxy.
     * @param {Object} [options] Options to pass to the proxy. Config object for {@link Ext.data.operation.Operation}.
     * @return {Ext.data.operation.Operation} The operation
     */
    save: function (options) {
        options = Ext.apply({}, options);

        var me = this,
            phantom = me.phantom,
            dropped = me.dropped,
            action = dropped ? 'destroy' : (phantom ? 'create' : 'update'),
            scope = options.scope || me,
            callback = options.callback,
            proxy = me.getProxy(),
            operation;

        options.records = [me];

        options.recordCreator = function (data, type, readOptions) {
            // Important to change this here, because we might be loading associations,
            // so we do not want this to propagate down. If we have a session, use that
            // so that we end up getting the same record. Otherwise, just remove it.
            var session = me.session;
            if (readOptions) {
                readOptions.recordCreator = session ? session.recordCreator : null;
            }
            me.set(data, me._commitOptions);
            //<debug>
            // Do the id check after set since converters may have run
            /*if (doIdCheck && me.getId() !== id) {
             Ext.Error.raise('Invalid record id returned for ' + id + '@' + me.entityName);
             }*/
            //</debug>
            return me;
        };

        options.internalCallback = function (operation) {
            var args = [me, operation],
                success = operation.wasSuccessful();
            if (success) {
                Ext.callback(options.success, scope, args);
            } else {
                Ext.callback(options.failure, scope, args);
            }
            args.push(success);
            Ext.callback(callback, scope, args);
        };
        delete options.callback;

        operation = proxy.createOperation(action, options);

        // Not a phantom, then we must perform this operation on the remote datasource.
        // Record will be removed from the store in the callback upon a success response
        if (dropped && phantom) {
            // If it's a phantom, then call the callback directly with a dummy successful ResultSet
            operation.setResultSet(Ext.data.reader.Reader.prototype.nullResultSet);
            me.setErased();
            operation.setSuccessful(true);
        } else {
            operation.execute();
        }
        return operation;
    }
});

Ext.define('PartKeepr.data.operation.Update', {
    override: 'Ext.data.operation.Update',

    action: 'update',

    isUpdateOperation: true,

    order: 20,
    doProcess: Ext.emptyFn,
    doExecute: function () {
        return this.getProxy().update(this);
    }
});

Ext.define('PartKeepr.data.operation.Create', {
    override: 'Ext.data.operation.Create',

    action: 'create',

    isCreateOperation: true,

    order: 10,
    doProcess: Ext.emptyFn,
    doExecute: function() {
        return this.getProxy().create(this);
    }
});

Ext.define("PartKeepr.data.schema.Role", {
    override: "Ext.data.schema.Role",

    getAssociatedStore: function (inverseRecord, options, scope, records, isComplete) {
        // Consider the Comment entity with a ticketId to a Ticket entity. The Comment
        // is on the left (the FK holder's side) so we are implementing the guts of
        // the comments() method to load the Store of Comment entities. This trek
        // begins from a Ticket (inverseRecord).

        var me = this,
            storeName = me.getStoreName(),
            store = inverseRecord[storeName],
            load = options && options.reload,
            source = inverseRecord.$source,
            session = inverseRecord.session,
            args, i, len, raw, rec, sourceStore;

        if (!store) {
            // We want to check whether we can automatically get the store contents from the parent session.
            // For this to occur, we need to have a parent in the session, and the store needs to be created
            // and loaded with the initial dataset.
            if (!records && source) {
                source = source[storeName];
                if (source && !source.isLoading()) {
                    sourceStore = source;
                    records = [];
                    raw = source.getData().items;

                    for (i = 0, len = raw.length; i < len; ++i) {
                        rec = raw[i];
                        records.push(session.getRecord(rec.self, rec.id));
                    }
                    isComplete = true;
                }
            }
            store = me.createAssociationStore(session, inverseRecord, records, isComplete);
            store.$source = sourceStore;

            if (!records && (me.autoLoad || options)) {
                load = true;
            }

            inverseRecord[storeName] = store;
        } else {
            if (records) {
                store.loadData(records);
            }
        }

        if (options) {
            // We need to trigger a load or the store is already loading. Defer
            // callbacks until that happens
            if (load || store.isLoading()) {
                store.on('load', function (store, records, success, operation) {
                    args = [store, operation];
                    scope = scope || options.scope || inverseRecord;

                    if (success) {
                        Ext.callback(options.success, scope, args);
                    } else {
                        Ext.callback(options.failure, scope, args);
                    }
                    args.push(success);
                    Ext.callback(options, scope, args);
                    Ext.callback(options.callback, scope, args);
                }, null, {single: true});
            } else {
                // Trigger straight away
                args = [store, null];
                scope = scope || options.scope || inverseRecord;

                Ext.callback(options.success, scope, args);
                args.push(true);
                Ext.callback(options, scope, args);
                Ext.callback(options.callback, scope, args);
            }
        }

        if (load && !store.isLoading()) {
            store.load();
        }

        return store;
    },
});

Ext.define("PartKeepr.data.proxy.Proxy", {
    override: "Ext.data.proxy.Proxy",

    batch: function (options, /* deprecated */listeners) {
        return this.callParent(arguments);
    }
});
Ext.define("PartKeepr.JsonWithAssociations", {
	extend: 'Ext.data.writer.Json',
	alias: 'writer.jsonwithassociations',

	/**
	 * @cfg {Array} associations Which associations to include.
	 */
	associations: [],
	writeRecordId: false,

	getRecordData: function(record) {
		var me = this, i, key, subStore,
		data = me.callParent(arguments);

		var storeName;
		
		Ext.apply(data, record.getAssociatedData());

		return data;
	}
});
Ext.namespace('PartKeepr');

PartKeepr.application = null;

Ext.application({
    name: 'PartKeepr',
    loginManager: null,

    init: function () {


    },
    launch: function ()
    {
        Ext.setGlyphFontFamily('FontAwesome');
        Ext.get("loading").hide();
        Ext.setLocale('en_US');

        this.createLayout();

        PartKeepr.application = this;

        // Set static data of the server
        PartKeepr.setMaxUploadSize(window.parameters.maxUploadSize);
        PartKeepr.setAvailableImageFormats(window.parameters.availableImageFormats);

        var authenticationProvider = Ext.create(window.parameters.authentication_provider);
        PartKeepr.Auth.AuthenticationProvider.setAuthenticationProvider(authenticationProvider);

        this.control ({
            'MenuBar menuitem': {
                click: this.onAppMenuClick,
                scope: this
            }
        });

        var config = {};

        if (window.parameters.autoLoginUsername) {
            config.autoLogin = true;
            config.autoLoginUsername = window.parameters.autoLoginUsername;
            config.autoLoginPassword = window.parameters.autoLoginPassword;
        }

        this.loginManager = Ext.create("PartKeepr.Auth.LoginManager", config);
        this.loginManager.on("login", this.onLogin, this);
        this.loginManager.on("logout", this.onLogout, this);
        this.loginManager.login();
    },
    onAppMenuClick: function (item) {
        if (typeof item.target === "function") {
            this.openAppItem(item.target["$className"]);
        }
    },
    openAppItem: function (target) {
        targetClass = Ext.ClassManager.get(target);

        var config = {
            title: targetClass.title,
            closable: targetClass.closable,
            iconCls: targetClass.iconCls
        };

        var j = Ext.create(target, config);

        if (targetClass.superclass["$className"] == "PartKeepr.Actions.BaseAction") {
            j.execute();
        } else {
            PartKeepr.getApplication().addItem(j);
            j.show();
        }
    },
    getParameter: function (parameter)
    {
        if (window.parameters[parameter] !== undefined) {
            return window.parameters[parameter];
        }
    },
    getLoginManager: function ()
    {
        return this.loginManager;
    },
    getPartManager: function ()
    {
        return this.partManager;
    },
    /**
     * Handles the login function. Initializes the part manager window,
     * enables the menu bar and creates the stores+loads them.
     */
    onLogin: function ()
    {
        this.createGlobalStores();

        var initialUserPreferences = Ext.decode(this.getLoginManager().getUser().get("initialUserPreferences"));

        var records = this.getUserPreferenceStore().getProxy().getReader().read(initialUserPreferences);

        this.getUserPreferenceStore().loadRecords(records.records);

        this.createPartManager();

        this.menuBar.enable();

        this.doSystemStatusCheck();

        this.unacknowledgedNoticesTask = Ext.TaskManager.start({
            run: this.doUnacknowledgedNoticesCheck,
            scope: this,
            interval: 100000
        });

        this.displayTipWindowTask = new Ext.util.DelayedTask(this.displayTipOfTheDayWindow, this);
        this.displayTipWindowTask.delay(100);

        if (window.parameters.motd) {
            this.displayMOTD();
        }

        this.getStatusbar().setConnected();

    },
    onLogout: function ()
    {
        this.menuBar.disable();
        this.centerPanel.removeAll(true);
        this.getStatusbar().setDisconnected();

        Ext.TaskManager.stop(this.unacknowledgedNoticesTask);
    },
    /**
     * Re-creates the part manager. This is usually called when the "compactLayout" configuration option has been
     * changed.
     *
     * @param none
     * @return nothing
     */
    recreatePartManager: function ()
    {
        this.centerPanel.remove(this.partManager);
        this.getPartManager().destroy();

        this.createPartManager();
    },
    /**
     * Creates the part manager. While this is usually only done after login, it can also happen when the user changes
     * the "compact" preference.
     */
    createPartManager: function ()
    {
        this.partManager = Ext.create("PartKeepr.PartManager", {
            title: i18n("Part Manager"),
            compactLayout: PartKeepr.getApplication().getUserPreference("partkeepr.partmanager.compactlayout", false),
            iconCls: 'web-icon brick',
            closable: false
        });

        this.centerPanel.insert(0, this.partManager);
    },
    /**
     * Sets the initial user preferences, which are applied into the userPreferenceStore after login.
     */
    setInitialUserPreferences: function (obj)
    {
        PartKeepr.initialUserPreferences = obj;
    },
    /**
     * Displays the tip of the day window.
     *
     * This method checks if the user has disabled tips, and if so, this method
     * avoids showing the window.
     */
    displayTipOfTheDayWindow: function ()
    {
        if (!Ext.data.StoreManager.lookup('TipOfTheDayStore') || !Ext.data.StoreManager.lookup(
                'TipOfTheDayStore').isLoaded() || !Ext.data.StoreManager.lookup(
                'TipOfTheDayHistoryStore') || !Ext.data.StoreManager.lookup('TipOfTheDayHistoryStore').isLoaded() ||
                !this.getUserPreferenceStore().isLoaded()
        ) {
            this.displayTipWindowTask.delay(100);
            return;
        }

        if (PartKeepr.getApplication().getUserPreference("partkeepr.tipoftheday.showtips") !== false) {
            var j = Ext.create("PartKeepr.TipOfTheDayWindow");

            if (j.hasTips()) {
                j.show();
            }
        }
    },
    /**
     * Displays a message-of-the-day
     */
    displayMOTD: function ()
    {
        Ext.MessageBox.alert(i18n("Message of the day"), window.parameters.motd);
    },
    /**
     * Does a schema status call against the PartKeepr installation, in order to verify if the schema is up-to-date.
     *
     * @param none
     * @return nothing
     */
    doSystemStatusCheck: function ()
    {
        var call = new PartKeepr.ServiceCall("api", "system_status");
        call.setHandler(Ext.bind(this.onSystemStatusCheck, this));
        call.doCall();
    },
    /**
     * Handler for the schema check
     * @param data The data returned from the server
     */
    onSystemStatusCheck: function (data)
    {
        if (data.schemaStatus !== "complete") {
            alert(i18n("Your database schema is not up-to-date! Please re-run setup immediately!"));
        }

        if (data.inactiveCronjobCount > 0) {
            alert(i18n("The following cronjobs aren't running:") + "\n\n" + data.inactiveCronjobs.join("\n"));
        }
    },
    /*
     * Checks for unacknowledged system notices. Triggers a service call against the server.
     * 
     * Checks if a session is active; otherwise, nothing will happen.
     * 
     * @param none
     * @return nothing
     */
    doUnacknowledgedNoticesCheck: function ()
    {
        this.systemNoticeStore.load({
            scope: this,
            callback: this.onUnacknowledgedNoticesCheck
        });
    },
    /**
     * Handler for the unacknowledged system notices check
     * @param data The data returned from the server
     */
    onUnacknowledgedNoticesCheck: function ()
    {
        if (this.systemNoticeStore.count() > 0) {
            this.statusBar.systemNoticeButton.show();
        } else {
            this.statusBar.systemNoticeButton.hide();
        }
    },
    createGlobalStores: function ()
    {
        this.footprintStore = Ext.create("Ext.data.Store",
            {
                model: 'PartKeepr.FootprintBundle.Entity.Footprint',
                pageSize: 99999999,
                autoLoad: true
            });

        this.siPrefixStore = Ext.create("Ext.data.Store",
            {
                model: 'PartKeepr.SiPrefixBundle.Entity.SiPrefix',
                pageSize: 99999999,
                autoLoad: true
            });

        this.distributorStore = Ext.create("Ext.data.Store",
            {
                model: 'PartKeepr.DistributorBundle.Entity.Distributor',
                pageSize: 99999999,
                autoLoad: true
            });

        this.manufacturerStore = Ext.create("Ext.data.Store",
            {
                model: 'PartKeepr.ManufacturerBundle.Entity.Manufacturer',
                pageSize: 99999999,
                autoLoad: true
            });

        this.partUnitStore = Ext.create("Ext.data.Store",
            {
                model: 'PartKeepr.PartBundle.Entity.PartMeasurementUnit',
                pageSize: 99999999,
                autoLoad: true
            });

        this.unitStore = Ext.create("Ext.data.Store",
            {
                model: 'PartKeepr.UnitBundle.Entity.Unit',
                pageSize: 99999999,
                autoLoad: true
            });

        this.userStore = Ext.create("Ext.data.Store",
            {
                model: 'PartKeepr.AuthBundle.Entity.User',
                pageSize: 99999999,
                autoLoad: true
            });

        this.userPreferenceStore = Ext.create("PartKeepr.data.store.UserPreferenceStore",
            {
                model: 'PartKeepr.AuthBundle.Entity.UserPreference',
                autoLoad: false
            });

        this.tipOfTheDayStore = Ext.create("PartKeepr.data.store.TipOfTheDayStore");
        this.tipOfTheDayHistoryStore = Ext.create("PartKeepr.data.store.TipOfTheDayHistoryStore");
        this.systemNoticeStore = Ext.create("PartKeepr.data.store.SystemNoticeStore");

    },
    storeLoaded: function (store)
    {
        store._loaded = true;
    },
    setAdmin: function (admin)
    {
        this.admin = admin;
    },
    isAdmin: function ()
    {
        return this.admin;
    },
    /**
     * Queries for a specific user preference. Returns either the value or a default value if
     * the preference was not found.
     * @param key The key to query
     * @param defaultValue A default value to return (optional)
     * @returns the key value, or defaultValue if preference key was not found
     */
    getUserPreference: function (key, defaultValue)
    {
        var record = this.userPreferenceStore.findRecord("preferenceKey", key);

        if (record) {
            var value = record.get("preferenceValue");
            var decodedValue = Ext.decode(value, true);

            if (decodedValue === null) {
                return value;
            } else {
                return decodedValue;
            }
        } else {
            return (typeof defaultValue == "undefined") ? null : defaultValue;
        }
    },
    /**
     * Sets a specific user preference. Directly commits the change to the server.
     *
     * @param key The key to set
     * @param value The value to set
     */
    setUserPreference: function (key, value)
    {
        var record = this.userPreferenceStore.findRecord("preferenceKey", key);
        value = Ext.encode(value);

        if (record) {
            if (record.get("preferenceValue") != value) {
                record.set("preferenceValue", value);
                record.save();
            }
        } else {
            var j = new PartKeepr.AuthBundle.Entity.UserPreference();
            j.set("preferenceKey", key);
            j.set("preferenceValue", value);
            j.save();
            this.userPreferenceStore.add(j);
        }
    },
    getUserPreferenceStore: function ()
    {
        return this.userPreferenceStore;
    },
    getUnitStore: function ()
    {
        return this.unitStore;
    },
    getPartUnitStore: function ()
    {
        return this.partUnitStore;
    },
    getFootprintStore: function ()
    {
        return this.footprintStore;
    },
    getManufacturerStore: function ()
    {
        return this.manufacturerStore;
    },
    getDistributorStore: function ()
    {
        return this.distributorStore;
    },
    getDefaultPartUnit: function ()
    {
        return this.partUnitStore.findRecord("default", true);
    },
    getUserStore: function ()
    {
        return this.userStore;
    },
    getSiPrefixStore: function ()
    {
        return this.siPrefixStore;
    },
    /**
     * Converts the Character "micro" (µ, available on german keyboards via AltGr+m) to the Character "Mu" (μ).
     *
     *  The standard for Si-Prefixes defines that the "Mu"-character should be used instead of the "micro" character.
     *
     *  Wikipedia Entry for the "Micro" Si Prefix: http://en.wikipedia.org/wiki/Micro-
     *
     */
    convertMicroToMu: function (value)
    {
        /**
         * Since the Si-Prefix for "micro" is μ, but keyboard have "µ" on it
         * (note: both chars might look identical, depending on your font), we need
         * to convert "µ" (on the keyboard, Unicode U+00B5) to the Mu (U+03BC).
         */

        return str_replace("µ", "μ", value);
    },
    /**
     * Creates the main view of PartKeepr.
     */
    createLayout: function ()
    {

        this.statusBar = Ext.create("PartKeepr.Statusbar");

        this.messageLog = this.createMessageLog();

        this.centerPanel = Ext.create("Ext.tab.Panel", {
            xtype: 'tabpanel',
            border: false,
            region: 'center',
            bodyStyle: 'background:#DBDBDB',
            plugins: Ext.create('Ext.ux.TabCloseMenu')

        });

        this.menuBar = Ext.create("PartKeepr.MenuBar");

        this.menuBar.disable();
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    layout: 'border',
                    items: [
                        this.centerPanel,
                        this.messageLog
                    ],
                    bbar: this.statusBar,
                    tbar: this.menuBar
                }
            ]

        });
    },
    addItem: function (item)
    {
        this.centerPanel.add(item);
    },
    createMessageLog: function ()
    {
        return Ext.create("PartKeepr.MessageLog", {
            height: 200,
            hidden: true,
            split: true,
            title: i18n("Message Log"),
            titleCollapse: true,
            collapsible: true,
            region: 'south',
            listeners: {
                beforecollapse: Ext.bind(
                    function (obj)
                    {
                        this.hideMessageLog();
                        return false;
                    },
                    this)
            }
        });
    },
    log: function (message)
    {
        this.logMessage(message, "none");
    },
    logMessage: function (message, severity)
    {
        if (message != i18n("Ready.")) {
            var r = Ext.ModelManager.create({
                message: message,
                severity: severity,
                date: new Date()
            }, 'PartKeepr.Message');

            this.messageLog.getStore().add(r);
        }
    },
    hideMessageLog: function ()
    {
        this.messageLog.hide();
    },
    showMessageLog: function ()
    {
        this.messageLog.show();
    },
    toggleMessageLog: function ()
    {
        if (this.messageLog.isHidden()) {
            this.showMessageLog();
        } else {
            this.hideMessageLog();
        }

    },
    getStatusbar: function ()
    {
        return this.statusBar;
    },
    /**
     * Sets the username. This should only be called from the login dialog.
     *
     * Also updates the statusbar to reflect the username.
     *
     * @param {string} username The username to set
     */
    setUsername: function (username)
    {
        this.username = username;
        this.getStatusbar().setCurrentUser(username);
    },
    /**
     * Returns the current username
     * @returns {string}
     */
    getUsername: function ()
    {
        return this.username;
    },
    formatCurrency: function (value)
    {
        var format = Ext.util.Format;
        format.currencyPrecision = PartKeepr.getApplication().getUserPreference(
            "partkeepr.formatting.currency.numdecimals", 2);
        format.currencySign = PartKeepr.getApplication().getUserPreference("partkeepr.formatting.currency.symbol", "€");
        format.currencyAtEnd = PartKeepr.getApplication().getUserPreference(
            "partkeepr.formatting.currency.currencySymbolAtEnd", true);

        if (PartKeepr.getApplication().getUserPreference("partkeepr.formatting.currency.thousandsSeparator",
                true) === true) {
            // @todo This is hard-coded for now
            format.thousandSeparator = ",";
        } else {
            format.thousandSeparator = "";
        }

        return format.currency(value);
    }
});

PartKeepr.getSession = function ()
{
    alert("This should not be called.");
    return "hli2ong0ktnise68p9f5nu6nk1";
};

PartKeepr.log = function (message)
{
    PartKeepr.getApplication().log(message);
};

/**
 * <p>This static method returns the instance of the application.</p>
 * @return {Object} The application
 */
PartKeepr.getApplication = function ()
{
    return PartKeepr.application;
};

PartKeepr.getBasePath = function ()
{
    var href = document.getElementsByTagName('base')[0].href;


    if(href.substr(-2) === '//') {
        return href.substr(0, href.length - 2);
    }

    if(href.substr(-1) === '/') {
        return href.substr(0, href.length - 1);
    }

    return href;
};

PartKeepr.getImagePath = function ()
{
    return "image.php";
};

PartKeepr.setMaxUploadSize = function (size)
{
    PartKeepr.maxUploadSize = size;
};

PartKeepr.getMaxUploadSize = function ()
{
    return PartKeepr.maxUploadSize;
};

PartKeepr.bytesToSize = function (bytes)
{
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
        return '0 Bytes';
    }
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

PartKeepr.setAvailableImageFormats = function (formats)
{
    PartKeepr.imageFormats = formats;
};

PartKeepr.getAvailableImageFormats = function ()
{
    return PartKeepr.imageFormats;
};

PartKeepr.serializeRecords = function (records)
{
    var finalData = [];

    for (var i = 0; i < records.length; i++) {
        finalData.push(records[i].data);
    }

    return finalData;
};

//Ext.Compat.showErrors = true;


/**
 * @author: Frédéric Thomas
 * Date: 22/03/12
 * Time: 16:37
 */
Ext.define('Ext.ux.NumericField', {
    extend: 'Ext.form.field.Number',
    alias: ['widget.currencyField'],
    config: {
        thousandSeparator: ' ',
        currencyAtEnd: true,
        currencySign: '€'
    },

    listeners: {
        /**
         * When this component get the focus, change the Currency
         * representation to a Float one for edition.
         *
         * @param me
         * @param eOpts
         */
        focus: function (me, eOpts) {
            me.inputEl.dom.value = this.getValue();
        }
    },

    /**
     * Converts a Float value into a currency formated value ready to display .
     *
     * @param {Object} value
     * @return {Object} The converted value.
     */
    valueToCurrency: function (value) {
        var format = Ext.util.Format;
        format.currencyPrecision = this.decimalPrecision;
        format.thousandSeparator = this.thousandSeparator;
        format.currencySign = this.currencySign;
        format.currencyAtEnd = this.currencyAtEnd;
        return format.currency(value);
    },
    /**
     * Converts a mixed-type value to a raw representation suitable for displaying in the field. This allows controlling
     * how value objects passed to {@link #setValue} are shown to the user, including localization.
     *
     * See {@link #rawToValue} for the opposite conversion.
     *
     * This implementation converts the raw value to a value formated as currency.
     *
     * @param {Object} value The mixed-type value to convert to the raw representation.
     * @return {Object} The converted raw value.
     */
    valueToRaw: function (value) {
        return this.valueToCurrency(value);
    },

    /**
     * Performs any necessary manipulation of a raw String value to prepare it for conversion and/or
     * {@link #validate validation}. Overrided to apply the {@link #parseValue}
     * to the raw value.
     *
     * @param {String} value The unprocessed string value
     * @return {String} The processed string value
     */
    processRawValue: function (value) {
    	value = this.callParent(arguments);
    	
    	if (isNaN(value) || value === null || value === "") {
    		return value;
    	}

        return this.parseValue(value);
    },
    /**
     * Runs all of Number's validations and returns an array of any errors. Note that this first runs Text's
     * validations, so the returned array is an amalgamation of all field errors. The additional validations run test
     * that the value is a number, and that it is within the configured min and max values.
     * @param {Object} [value] The value to get errors for (defaults to the current field value)
     * @return {String[]} All validation errors for this field
     */
    getErrors: function(value) {
        var me = this,
            errors = [], // This is a hack because of the strange class layout...
            format = Ext.String.format,
            num;

        value = Ext.isDefined(value) ? value : this.processRawValue(this.getRawValue());

        if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
             return errors;
        }

        value = this.parseValue(value);

        if(isNaN(value)){
            errors.push(format(me.nanText, value));
        }

        if (me.minValue === 0 && value < 0) {
            errors.push(this.negativeText);
        }
        else if (value < me.minValue) {
            errors.push(format(me.minText, me.minValue));
        }

        if (value > me.maxValue) {
            errors.push(format(me.maxText, me.maxValue));
        }


        return errors;
    },
    /**
     * Overrided to remove thousand separator.
     *
     * @param value
     */
    parseValue: function (value) {
        value = String(value).replace(this.thousandSeparator, "");
    	value = String(value).replace(this.currencySign, "");
        value = parseFloat(String(value).replace(this.decimalSeparator, '.'));
        return isNaN(value) ? null : value;
    }
});
Ext.define("PartKeepr.Widgets.TreePicker", {
       extend: "Ext.ux.TreePicker",

    /**
     * Creates and returns the tree panel to be used as this field's picker.
     */
    createPicker: function() {
        var me = this,
            picker = new Ext.tree.Panel({
                shrinkWrapDock: 2,
                store: me.store,
                floating: true,
                displayField: me.displayField,
                columns: me.columns,
                minHeight: me.minPickerHeight,
                maxHeight: me.maxPickerHeight,
                manageHeight: false,
                shadow: false,
                rootVisible: false,
                listeners: {
                    scope: me,
                    itemclick: me.onItemClick
                },
                viewConfig: {
                    listeners: {
                        scope: me,
                        render: me.onViewRender
                    }
                }
            }),
            view = picker.getView();

        if (Ext.isIE9 && Ext.isStrict) {
            // In IE9 strict mode, the tree view grows by the height of the horizontal scroll bar when the items are highlighted or unhighlighted.
            // Also when items are collapsed or expanded the height of the view is off. Forcing a repaint fixes the problem.
            view.on({
                scope: me,
                highlightitem: me.repaintPickerView,
                unhighlightitem: me.repaintPickerView,
                afteritemexpand: me.repaintPickerView,
                afteritemcollapse: me.repaintPickerView
            });
        }
        return picker;
    }
});

/**
 * Extends the Ext.ux.NumericField and applies defaults stored within the user preferences.
 */
Ext.define("PartKeepr.CurrencyField", {
	extend: "Ext.ux.NumericField",
    alias: 'widget.CurrencyField',
    
    initComponent: function () {
    	this.decimalPrecision 	= PartKeepr.getApplication().getUserPreference("partkeepr.formatting.currency.numdecimals", 2);
    	this.currencySign 		= PartKeepr.getApplication().getUserPreference("partkeepr.formatting.currency.symbol", "€");
    	this.currencyAtEnd		= PartKeepr.getApplication().getUserPreference("partkeepr.formatting.currency.currencySymbolAtEnd", true);
    	
    	if (PartKeepr.getApplication().getUserPreference("partkeepr.formatting.currency.thousandsSeparator", true) === true) {
    		// @todo This is hard-coded for now
    		this.thousandSeparator 	= ",";
    	} else {
    		this.thousandSeparator 	= "";
    	}
    	 
    	
    	
    	this.callParent();
    }
});
/**
 * Defines a search field, which automatically hooks into the passed store.
 *
 * The "clear" trigger is shown only when text is entered.
 */
Ext.define('PartKeepr.form.field.SearchField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.partkeepr-searchfield',

    triggers: {
        clear: {
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'resetSearch',
            scope: 'this',
        },
        search: {
            cls: Ext.baseCSSPrefix + 'form-search-trigger',
            handler: 'startSearch',
            scope: 'this'
        }
    },

    /**
     * @var {Boolean} Specifies if the search field has an active search
     */
    hasSearch: false,

    /**
     * @cfg {String} Specifies the target property to search
     */
    targetField: 'query',

    /**
     * @var {Ext.util.Filter} The filter set by the search field
     */
    filter: null,

    listeners: {
        'specialkey': {
            fn: 'keyHandler',
            scope: 'this'
        }
    },

    initComponent: function ()
    {
        this.callParent(arguments);

        this.filter = Ext.create("Ext.util.Filter", {
            property: this.targetField,
            value: '',
            operator: 'like'
        });
    },
    /**
     * Handles special keys used in this field.
     *
     * Enter: Starts the search
     * Escape: Removes the search and clears the field contents
     */
    keyHandler: function (field, e)
    {
        switch (e.getKey()) {
            case e.ENTER:
                this.startSearch();
                break;
            case e.ESC:
                this.resetSearch();
                break;
        }
    },
    /**
     * Resets the search field to empty and re-triggers the store to load the matching records.
     */
    resetSearch: function ()
    {
        var me = this,
            store = me.store;

        if (store.isLoading()) {
            Ext.defer(this.resetSearch, 200, this);
            return;
        }

        me.setValue('');
        this.filter.setValue('');

        if (me.hasSearch) {

            store.removeFilter(this.filter);

            store.currentPage = 1;
            store.load({start: 0});
            me.hasSearch = false;

            this.getTrigger("clear").hide();
        }
    },
    /**
     * Starts the search with the entered value.
     */
    startSearch: function ()
    {
        var me = this,
            store = me.store,
            value = me.getValue(),
            searchValue = "%" + value + "%";

        if (value.length < 1) {
            me.resetSearch();
            return;
        }

        if (store.isLoading()) {
            Ext.defer(this.startSearch, 200, this);
            return;
        }

        if (this.filter.getValue() === searchValue) {
            return;
        }
        this.filter.setValue(searchValue);
        store.addFilter(this.filter);
        store.currentPage = 1;
        store.load({start: 0});

        me.hasSearch = true;
        this.getTrigger("clear").show();
    },
    /**
     * Sets the store to use
     *
     * @param {Ext.data.Store} store The store to set
     */
    setStore: function (store)
    {
        this.store = store;
    }
});

Ext.define('Ext.ux.ClearableComboBox', {
	extend: "Ext.form.ComboBox",
	alias: "widget.clearcombo",
    initComponent: function() {
        this.triggerConfig = {
            tag:'span', cls:'x-form-twin-triggers', cn:[
            {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger x-form-clear-trigger"},
            {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger"}
        ]};
        
        this.callParent();
    },
    onTrigger1Click : function()
    {
        this.collapse();
        this.setValue('');
        this.fireEvent('cleared');
    },
    setValue : function(v){
	Ext.form.ClearableComboBox.superclass.setValue.call(this, v);
	if (this.rendered) {
		this.triggers[0][!Ext.isEmpty(v) ? 'show': 'hide']();
	}
    },
    onDestroy: function(){
        Ext.destroy(this.triggers);
        Ext.form.ClearableComboBox.superclass.onDestroy.apply(this, arguments);
    }
});

Ext.define('PartKeepr.ServiceCall', {
    extend: 'Ext.util.Observable',

    service: null,
    call: null,

    sHandler: null,
    parameters: {},
    loadMessage: null,
    anonymous: false,

    constructor: function (service, call)
    {
        this.setService(service);
        this.setCall(call);
        this.parameters = {};
    },

    /**
     * <p>This method activates anonymous mode.</p>
     * <p>Anonymous mode defines that the service is called without passing a valid session. Usually, the only anonymous call is to authenticate a user.</p>
     */
    enableAnonymous: function ()
    {
        this.anonymous = true;
    },
    /**
     * <p>This method deactivates anonymous mode.</p>
     */
    disableAnonymous: function ()
    {
        this.anonymous = false;
    },
    setService: function (service)
    {
        this.service = service;
    },
    setCall: function (call)
    {
        this.call = call;
    },
    setParameter: function (parameter, value)
    {
        this.parameters[parameter] = value;
    },
    setParameters: function (obj)
    {
        Ext.apply(this.parameters, obj);
    },
    setLoadMessage: function (message)
    {
        this.loadMessage = message;
    },
    setHandler: function (handler)
    {
        this.sHandler = handler;
    },
    doCall: function ()
    {
        /* Update the status bar to indicate that the call is in progress. */
        PartKeepr.getApplication().getStatusbar().startLoad(this.loadMessage);

        this.parameters._format = "json";

        var headers = {
            "call": this.call,
            "lang": Ext.getLocale()
        };

        if (!this.anonymous) {
            var provider = PartKeepr.Auth.AuthenticationProvider.getAuthenticationProvider();

            Ext.apply(headers, provider.getHeaders());
        }

        Ext.Ajax.request({
            url: PartKeepr.getBasePath() + '/' + this.service + "/" + this.call,
            success: Ext.bind(this.onSuccess, this),
            failure: Ext.bind(this.onError, this),
            method: "POST",
            jsonData: this.parameters,
            headers: headers
        });
    },
    onSuccess: function (responseObj, options)
    {
        PartKeepr.getApplication().getStatusbar().endLoad();

        try {
            var response = Ext.decode(responseObj.responseText);
        } catch (ex) {

            PartKeepr.ExceptionWindow.showException(responseObj);
            return;
        }


        /* Check the status */
        if (response.status == "error") {
            this.displayError(response.exception);
            PartKeepr.getApplication().getStatusbar().setStatus({
                text: this.getErrorMessage(response.exception),
                iconCls: 'x-status-error',
                clear: {
                    useDefaults: true,
                    anim: false
                }
            });
            return;
        }

        /* Check the status */
        if (response.status == "systemerror") {
            this.displaySystemError(response);
            PartKeepr.getApplication().getStatusbar().setStatus({
                text: this.getErrorMessage(response),
                iconCls: 'x-status-error',
                clear: {
                    useDefaults: true,
                    anim: false
                }
            });


            return;
        }


        if (this.sHandler) {
            this.sHandler(response);
        }
    },
    onError: function (response, options)
    {
        var request;

        PartKeepr.ExceptionWindow.showException(response);
        PartKeepr.getApplication().getStatusbar().endLoad();
    },
    displayError: function (obj)
    {
        Ext.Msg.show({
            title: i18n("Error"),
            msg: this.getErrorMessage(obj),
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    },
    getErrorMessage: function (obj)
    {
        var errorMsg;

        if (obj.message === "") {
            errorMsg = obj.exception;
        } else {
            errorMsg = obj.message;
        }

        return errorMsg;
    },
    displaySystemError: function (obj)
    {
        var errorMsg;

        errorMsg = "Error Message: " + obj.message + "<br>";
        errorMsg += "Exception:" + obj.exception + "<br>";
        errorMsg += "Backtrace:<br>" + str_replace("\n", "<br>", obj.backtrace);

        Ext.Msg.maxWidth = 800;

        Ext.Msg.show({
            title: i18n("System Error"),
            msg: errorMsg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR

        });
    }

});

/*
 * This file is part of the JerryMouse Framework.
 *
 * JerryMouse is free software; you can redistribute and/or modify it under the
 * terms of the GNU General Public License version 2 as published by the
 * Free Software Foundation.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Library General Public License for more details.
 *
 */

Ext.locales = {
		de_DE: {
			"flag": "de",
			"name": "Deutsch (Deutschland)",
			"dateformat": "d.m.Y H:i:s T"
		},
		en_US: {
			"flag": "us",
			"name": "English (USA)",
			"dateformat": "n/j/Y H:i:s T"
		}
};

Ext.setLocale = function (locale) {
	Ext.jm_locale = locale;
};

Ext.getLocale = function () {
	return Ext.jm_locale;
};

Ext.getLocaleFlag = function () {
	return Ext.locales[Ext.jm_locale].flag;
};

Ext.getDateFormat = function () {
	return Ext.locales[Ext.jm_locale].dateformat;
};

/**
 * Overrides the editing plugin to support editing of associations.
 */
Ext.define('PartKeepr.grid.plugin.CellEditing', {
    alias: 'plugin.cellediting',
    extend: 'Ext.grid.plugin.Editing',
    override: 'Ext.grid.plugin.CellEditing',
    requires: ['Ext.grid.CellEditor', 'Ext.util.DelayedTask'],

    onEditComplete: function (ed, value, startValue)
    {
        var me = this,
            context = ed.context,
            view, record;

        view = context.view;
        record = context.record;
        context.value = value;
        if (!me.validateEdit(context)) {
            me.editing = false;
            return;
        }

        // Only update the record if the new value is different than the
        // startValue. When the view refreshes its el will gain focus
        if (!record.isEqual(value, startValue)) {
            if (record.hasField(context.column.dataIndex)) {
                record.set(context.column.dataIndex, value);
            } else {
                if (record.associations[context.column.dataIndex]) {
                    var setterName = record.associations[context.column.dataIndex].setterName;

                    record[setterName](value);
                }
            }
            // Changing the record may impact the position
            context.rowIdx = view.indexOf(record);
        }

        me.fireEvent('edit', me, context);

        // We clear down our context here in response to the CellEditor completing.
        // We only do this if we have not already started editing a new context.
        if (me.context === context) {
            me.setActiveEditor(null);
            me.setActiveColumn(null);
            me.setActiveRecord(null);
            me.editing = false;
        }
    },
});

/**
 * Overrides the editing plugin to support editing of associations.
 */
Ext.define('PartKeepr.grid.plugin.Editing', {
    override: 'Ext.grid.plugin.Editing',
    extend: 'Ext.plugin.Abstract',
    alias: 'editing.editing',

    /**
     * @private
     * Collects all information necessary for any subclasses to perform their editing functions.
     * @param {Ext.data.Model/Number} record The record or record index to edit.
     * @param {Ext.grid.column.Column/Number} columnHeader The column of column index to edit.
     * @return {Ext.grid.CellContext/undefined} The editing context based upon the passed record and column
     */
    getEditingContext: function (record, columnHeader)
    {
        var me = this,
            grid = me.grid,
            colMgr = grid.visibleColumnManager,
            view,
            gridRow,
            rowIdx, colIdx,
            result,
            layoutView = me.grid.lockable ? me.grid : me.view;

        // The view must have had a layout to show the editor correctly, defer until that time.
        // In case a grid's startup code invokes editing immediately.
        if (!layoutView.componentLayoutCounter) {
            layoutView.on({
                boxready: Ext.Function.bind(me.startEdit, me, [record, columnHeader]),
                single: true
            });
            return;
        }

        // If disabled or grid collapsed, or view not truly visible, don't calculate a context - we cannot edit
        if (me.disabled || me.grid.collapsed || !me.grid.view.isVisible(true)) {
            return;
        }

        // They've asked to edit by column number.
        // Note that in a locked grid, the columns are enumerated in a unified set for this purpose.
        if (Ext.isNumber(columnHeader)) {
            columnHeader = colMgr.getHeaderAtIndex(columnHeader);
        }

        // No corresponding column. Possible if all columns have been moved to the other side of a lockable grid pair
        if (!columnHeader) {
            return;
        }

        // Coerce the column to the closest visible column
        if (columnHeader.hidden) {
            columnHeader = columnHeader.next(':not([hidden])') || columnHeader.prev(':not([hidden])');
        }

        // Navigate to the view and grid which the column header relates to.
        view = columnHeader.getView();
        grid = view.ownerCt;

        gridRow = view.getRow(record);

        // An intervening listener may have deleted the Record.
        if (!gridRow) {
            return;
        }

        colIdx = colMgr.getHeaderIndex(columnHeader);

        if (Ext.isNumber(record)) {
            // look up record if numeric row index was passed
            rowIdx = record;
            record = view.getRecord(gridRow);
        } else {
            rowIdx = view.indexOf(gridRow);
        }

        // The record may be removed from the store but the view
        // not yet updated, so check it exists
        if (!record) {
            return;
        }

        // Create a new CellContext
        result = new Ext.grid.CellContext(view).setAll(view, rowIdx, colIdx, record, columnHeader);

        // Add extra Editing information
        result.grid = grid;
        result.store = view.dataSource;
        result.field = columnHeader.dataIndex;

        if (record.hasField(columnHeader.dataIndex)) {
            result.value = result.originalValue = record.get(columnHeader.dataIndex);
        } else {
            if (record.associations[columnHeader.dataIndex]) {
                var getterName = record.associations[columnHeader.dataIndex].getterName;

                result.value = result.originalValue = record[getterName]();
            }
        }

        result.row = gridRow;
        result.node = view.getNode(record);
        result.cell = view.getCellByPosition(result, true);

        return result;
    },
});
/**
 * Overrides the ExtJS Combobox with a configuration option to return the selected object and not their ID value
 */
Ext.define('Ext.form.field.ComboBox', {
    override: 'Ext.form.field.ComboBox',

    config: {
        returnObject: false
    },
    getValue: function () {
        if (this.getReturnObject() == true) {
            return this.getSelection();
        } else {
            return this.callParent(arguments);
        }
    }
});
/**
 * Represents a hydra exception.
 *
 * @class
 */
Ext.define('PartKeepr.data.HydraException', {
   config: {
       /**
        * @cfg {String} description
        * The description of the exception
        */
       description: undefined,

       /**
        * @cfg {String} title
        * The title of the exception
        */
       title: undefined,

       /**
         * @cfg {Array} trace
         * The trace of the exception
         */
        trace: []
   },

    /**
     * Creates the HydraException object.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        if (config["hydra:description"]) {
            config.description = config["hydra:description"];
        }

        if (config["hydra:title"]) {
            config.title = config["hydra:title"];
        }

        this.initConfig(config);
    }
});
/**
 * Represents an exception window.
 */
Ext.define('PartKeepr.ExceptionWindow', {
    extend: 'Ext.window.Window',
    resizable: true,
    closeAction: 'hide',
    layout: 'fit',
    width: 500,
    autoHeight: true,
    maxHeight: 800,
    constrain: true,
    cls: Ext.baseCSSPrefix + 'message-box',

    initComponent: function ()
    {
        this.iconComponent = Ext.create('Ext.Component', {
            baseCls: Ext.baseCSSPrefix + 'message-box-icon' + " " + Ext.baseCSSPrefix + 'message-box-error'
        });

        this.messageDiv = Ext.create('Ext.Component', {
            autoEl: {tag: 'div'},
            cls: 'ext-mb-text',
            height: 20
        });

        this.detailDiv = Ext.create('Ext.Component', {
            flex: 1,
            autoEl: {tag: 'div'},
            cls: 'ext-mb-text',
            style: 'margin-top: 20px;overflow: auto;'
        });

        this.backtraceDetails = Ext.create('Ext.tree.Panel', {
            rootVisible: false
        });

        this.requestDetails = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: i18n("Request"),
            height: 65,
            minHeight: 65,
            readOnly: true
        });

        this.responseDetails = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: i18n("Response"),
            height: 65,
            minHeight: 65,
            readOnly: true
        });

        this.basicTab = Ext.create("Ext.panel.Panel", {
            style: 'padding: 10px;',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            title: i18n("Basic"),
            items: [
                this.iconComponent,
                {
                    border: false,
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    items: [this.messageDiv, this.detailDiv]
                }
            ]
        });

        this.detailTab = Ext.create("Ext.form.Panel", {
            style: 'padding: 10px;',
            height: 300,
            width: 500,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            title: i18n("Detail"),
            items: [
                this.requestDetails,
                this.responseDetails,
                {
                    xtype: 'fieldcontainer',
                    layout: "fit",
                    fieldLabel: i18n("Backtrace"),
                    flex: 1,
                    minHeight: 65,
                    readOnly: true,
                    items: this.backtraceDetails
                }
            ]

        });

        this.fullReport = Ext.create("Ext.form.field.TextArea", {
            readOnly: true,
            height: 300
        });

        this.backtraceTab = Ext.create("Ext.panel.Panel", {
            style: 'padding: 10px',
            layout: 'fit',
            anchor: '100% 100%',
            title: i18n("Full Report"),
            items: [this.fullReport]
        });

        this.topContainer = Ext.create("Ext.tab.Panel", {
            layout: "fit",
            items: [this.basicTab, this.detailTab, this.backtraceTab]
        });

        this.items = this.topContainer;

        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: {minWidth: 80},
                layout: {
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'button', text: 'OK', handler: Ext.bind(function ()
                    {
                        this.hide();
                    }, this)
                    }
                ]
            }
        ];

        this.callParent();

    },
    /**
     * Private. Updates the exception dialog with the exception data.
     *
     * @see showException
     *
     * @param {PartKeepr.data.HydraException} exception The exception data
     * @param {Object} response The response data
     */
    _showException: function (exception, response)
    {
        var separator = "==================================";

        this.messageDiv.update('<strong>' + exception.getTitle() + '</strong>');
        this.setTitle(exception.getTitle());

        var fullDetails = exception.getTitle();

        if (exception.getDescription()) {
            fullDetails += "\n\n" + i18n("Details") + "\n" + separator + "\n";
            fullDetails += exception.getDescription();

            this.detailDiv.update(exception.getDescription());
        } else {
            this.detailDiv.update("");
        }


        if (exception.getTrace()) {
            var traceData = this.convertTraceToTree(exception.getTrace());

            var store = Ext.create("Ext.data.TreeStore", {
                root: traceData
            });

            this.backtraceDetails.setStore(store);
        }

        if (!response.request) {
            response.request = {};
        }

        var requestData;

        if (response.request && response.request.options && response.request.options.method && response.request.options.url) {
            requestData = response.request.options.method + " " + response.request.options.url;
        } else {
            requestData = "";
        }

        if (response.request.jsonData) {
            requestData += "\n\n" + response.request.jsonData;
        }

        fullDetails += "\n\n" + i18n("Request") + "\n" + separator + "\n";
        fullDetails += requestData;

        this.requestDetails.setValue(nl2br(requestData));

        fullDetails += "\n\n" + i18n("Response Status Code") + "\n" + separator + "\n";
        fullDetails += response.status;

        fullDetails += "\n\n" + i18n("Response") + "\n" + separator + "\n";
        fullDetails += response.responseText;

        this.responseDetails.setValue(nl2br(response.responseText));

        fullDetails += "\n\n" + i18n("Server Configuration") + "\n" + separator + "\n";

        for (var j in window.parameters) {
            fullDetails += j + ": " + window.parameters[j] + "\n";
        }

        this.fullReport.setValue(fullDetails);

        this.show();
        this.topContainer.layout.setActiveItem(0);

        var keyMap = this.getKeyMap();
        keyMap.on(Ext.event.Event.ENTER, function ()
        {
            this.hide();
        }, this);
    },
    /**
     * Recursively converts a trace to an ExtJS tree
     *
     * @param {Object} node The current node to process
     * @param {String} prefixText A text to prefix the data with. If undefined, uses the type of the given node
     * @return {Object} An object comptable with {Ext.data.NodeInterface}
     */
    convertTraceToTree: function (node, prefixText)
    {
        if (!Ext.isDefined(prefixText)) {
            prefixText = typeof node;
        }

        var treeNode = {
            text: prefixText
        };


        if (Ext.isArray(node)) {
            treeNode.children = [];
            for (var j = 0; j < node.length; j++) {
                treeNode.children.push(this.convertTraceToTree(node[j], j));
            }

            if (treeNode.children.length === 0) {
                treeNode.leaf = true;
            }
            return treeNode;
        }

        if (Ext.isObject(node)) {
            treeNode.children = [];

            for (var property in node) {
                treeNode.children.push(this.convertTraceToTree(node[property], property));
            }

            if (treeNode.children.length === 0) {
                treeNode.leaf = true;
            }

            return treeNode;
        }

        treeNode.text += ": " + node;
        treeNode.leaf = true;

        return treeNode;
    },
    statics: {
        /**
         * Displays the exception window.
         *
         * @param {PartKeepr.data.HydraException} exception The exception object
         * @param {Object}                        response The response object
         */
        showException: function (response)
        {
            if (!PartKeepr.ExceptionWindow.activeInstance) {
                PartKeepr.ExceptionWindow.activeInstance = new PartKeepr.ExceptionWindow();
            }

            try {
                var data = Ext.decode(response.responseText);

                var exception = Ext.create("PartKeepr.data.HydraException", data);

                PartKeepr.ExceptionWindow.activeInstance._showException(exception, response);
            } catch (ex) {
                var exception = Ext.create("PartKeepr.data.HydraException", {
                    title: i18n("Critical Error"),
                    description: i18n("The server returned a response which we were not able to interpret.")
                });

                PartKeepr.ExceptionWindow.activeInstance._showException(exception, response);
            }
        }
    }
});

Ext.define('PartKeepr.FileUploadDialog', {
    extend: 'Ext.window.Window',

    title: i18n("File Upload"),
    fileFieldLabel: i18n("File"),
    uploadButtonText: i18n('Select File...'),
    uploadURL: PartKeepr.getBasePath() + "/api/temp_uploaded_files/upload",
    layout: 'fit',
    resizable: false,
    modal: true,
    defaults: {
        labelWidth: 80
    },
    initComponent: function ()
    {

        if (this.imageUpload) {
            this.uploadURL = PartKeepr.getBasePath() + "/api/temp_images/upload";
        }

        this.uploadButton = Ext.create("Ext.button.Button",
            {
                text: i18n('Upload'),
                iconCls: 'fugue-icon drive-upload',
                handler: Ext.bind(function ()
                {
                    var form = this.form.getForm();

                    if (this.fileField.getValue() === "" && this.urlField.getValue() === "") {
                        Ext.Msg.alert(i18n("Error"), i18n("Please select a file to upload or enter an URL"));
                        return;
                    }


                    if (form.isValid()) {
                        form.submit({
                            url: this.uploadURL,
                            success: Ext.bind(function (fp, o)
                            {
                                this.fireEvent("fileUploaded", o.result.response);
                                this.close();
                            }, this),
                            failure: function (form, action)
                            {
                                 PartKeepr.ExceptionWindow.showException(action.response);
                            }
                        });
                    }
                }, this)
            });

        this.urlField = Ext.create("Ext.form.field.Text", {
            fieldLabel: i18n("URL"),
            name: "url",
            anchor: '100%'
        });

        this.diskUsage = Ext.create("Ext.ProgressBar", {
            width: "200px"
        });

        this.diskUsage.updateProgress(0, i18n("Loading…"));

        this.tbButtons = [this.diskUsage, '->', this.uploadButton];

        if (this.imageUpload) {

            this.title = i18n("Image Upload");
            this.fileFieldLabel = i18n("Image");
            this.uploadButtonText = i18n("Select Image...");

            this.fileFormatButton = Ext.create("Ext.button.Button", {
                text: i18n("Available Formats"),
                iconCls: 'fugue-icon infocard',
                handler: this.showAvailableFormats,
                scope: this
            });

            this.tbButtons.push(this.fileFormatButton);
        }

        this.fileField = Ext.create("Ext.form.field.File", {
            xtype: 'filefield',
            name: 'userfile',
            fieldLabel: this.fileFieldLabel,
            msgTarget: 'side',
            anchor: '100%',
            buttonText: this.uploadButtonText
        });

        this.uploadSizeButton = Ext.create("Ext.button.Button", {
            xtype: 'button',
            iconCls: 'fugue-icon information-frame',
            handler: this.showUploadSizeInformation,
            scope: this
        });

        this.form = Ext.create('Ext.form.Panel', {
            width: 500,
            bodyPadding: 10,
            border: false,
            items: [
                {
                    html: i18n("Select a file to upload or enter an URL to load the file from"),
                    border: false,
                    style: "margin-bottom: 20px;"
                },
                this.fileField,
                {
                    xtype: 'fieldcontainer',
                    hideEmptyLabel: false,
                    border: false,
                    style: 'margin-bottom: 20px;',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'middle'
                    },
                    items: [
                        {
                            html: sprintf(i18n("Maximum upload size: %s"),
                                PartKeepr.bytesToSize(PartKeepr.getMaxUploadSize())),
                            style: 'margin-right: 10px;',
                            border: false
                        },
                        this.uploadSizeButton
                    ]
                },
                this.urlField
            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: {minWidth: 120},
                items: this.tbButtons
            }]
        });

        this.on("beforedestroy", this.onBeforeDestroy, this);

        this.items = this.form;

        var call = new PartKeepr.ServiceCall("api", "disk_space");
        call.setHandler(Ext.bind(this.onDiskSpaceRetrieved, this));
        call.doCall();

        this.callParent();
    },
    onDiskSpaceRetrieved: function (data) {
        var usedString = PartKeepr.bytesToSize(data.disk_used),
            totalString = PartKeepr.bytesToSize(data.disk_total);

        var text = usedString + " / " + totalString + " " + i18n("used");

        this.diskUsage.updateProgress(data.disk_used / data.disk_total, text);
    },
    /**
     * Displays a little hint regarding the maximum upload size
     */
    showUploadSizeInformation: function ()
    {
        if (!this.uploadSizeTip) {
            this.uploadSizeTip = Ext.create("Ext.tip.ToolTip", {
                title: i18n("Upload Size Information"),
                anchor: 'left',
                width: 350,
                height: 132,
                autoScroll: true,
                target: this.uploadSizeButton.getEl(),
                closable: true,
                html: i18n("The maximum upload size can be configured in your php.ini file. There are two separate options:<br/>- post_max_size<br/>- upload_max_filesize<br/><br/>You need to set both values high enough.") +
                '<br/><br/><a target="_blank" href="http://de2.php.net/manual/en/ini.core.php#ini.post-max-size">' + i18n("More Information") + '</a>',
                autoHide: false
            });
        }


        this.uploadSizeTip.show();
    },
    /**
     * Shows a tooltip for all available image formats.
     */
    showAvailableFormats: function ()
    {
        if (!this.imageFormatsTip) {
            this.imageFormatsTip = Ext.create("Ext.tip.ToolTip", {
                title: i18n("Available Image Formats"),
                anchor: 'left',
                width: 200,
                height: 300,
                autoScroll: true,
                target: this.fileFormatButton.getEl(),
                closable: true,
                html: implode("<br>", PartKeepr.getAvailableImageFormats()),
                autoHide: false
            });
        }


        this.imageFormatsTip.show();
    },
    onBeforeDestroy: function ()
    {
        if (this.imageFormatsTip) {
            this.imageFormatsTip.destroy();
        }

        if (this.uploadSizeTip) {
            this.uploadSizeTip.destroy();
        }
    }
});

/**
 * Implementation of a message box which supports a "remember choice" checkbox.
 */
Ext.define('PartKeepr.RememberChoiceMessageBox', {
    extend: 'Ext.window.MessageBox',

    escButtonAction: null,

    /**
     * The user preference to set when "remember choice" is selected
     * @var string
     */
    dontAskAgainProperty: null,

    /**
     * The value to set the user preference to
     */
    dontAskAgainValue: false,

    initComponent: function ()
    {
        this.callParent();

        this.rememberChoiceCheckbox = Ext.create("Ext.form.field.Checkbox", {
            boxLabel: i18n("Don't ask again"),
            margin: {
                top: 10
            }
        });

        this.promptContainer.add(this.rememberChoiceCheckbox);

    },
    onEsc: function ()
    {
        if (this.escButtonAction !== null) {
            var btnIdx;

            switch (this.escButtonAction) {
                case "ok":
                    btnIdx = 0;
                    break;
                case "yes":
                    btnIdx = 1;
                    break;
                case "no":
                    btnIdx = 2;
                    break;
                case "cancel":
                    btnIdx = 3;
                    break;
                default:
                    btnIdx = 3;
                    break;
            }

            this.btnCallback(this.msgButtons[btnIdx]);
        } else {
            this.callParent();
        }
    },
    btnCallback: function (btn, event)
    {
        this.callParent(arguments);

        if (btn === "ok") {
            PartKeepr.getApplication().setUserPreference(this.dontAskAgainProperty, this.dontAskAgainValue);
        }

    }
});
Ext.define("PartKeepr.data.HydraProxy", {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.Hydra',

    reader: {
        type: 'hydra'
    },
    writer: {
        type: 'jsonwithassociations',
        writeAllFields: true
    },
    appendId: false,
    limitParam: "itemsPerPage",
    defaultListenerScope: true,
    sortParam: "order",
    headers: {},

    /**
     * An ID which should be ignored when loading items. Usually we use the item ID as URL as per JSON-LD spec,
     * but sometimes you might require loading an item from the url parameter instead.
     *
     * This is mainly a workaround for ExtJS trees because we need a virtual root node for which the ID cannot be
     * changed.
     */
    ignoreLoadId: null,

    /**
     * If true, ignores IDs when updating/deletes entries. This is mostly used for entities where no primary key exists.
     */
    ignoreIds: false,

    constructor: function (config)
    {
        config.url = PartKeepr.getBasePath() + config.url;
        this.callParent(arguments);
    },
    listeners: {
        exception: function (reader, response)
        {
            this.showException(response);
        }
    },
    getHeaders: function ()
    {
        var headers = this.callParent(arguments);

        var provider = PartKeepr.Auth.AuthenticationProvider.getAuthenticationProvider();

        Ext.apply(headers, provider.getHeaders());

        return headers;
    },
    buildUrl: function (request)
    {
        var operation = request.getOperation();

        // Set the URI to the ID, as JSON-LD operates on IRIs.
        if (request.getAction() == "read") {
            if (operation.getId()) {
                if (operation.getId() !== this.ignoreLoadId) {
                    request.setUrl(operation.getId());
                }
            }
        }

        if (request.getAction() == "update") {
            if (request.getRecords().length != 1) {
                throw "The amount of records updating must be exactly one";
            }

            if (!this.ignoreIds) {
                this.api.update = request.getRecords()[0].getId();
            }
        }

        if (request.getAction() == "destroy") {
            if (request.getRecords().length != 1) {
                throw "The amount of records updating must be exactly one";
            }

            if (!this.ignoreIds) {
                this.api.destroy = request.getRecords()[0].getId();
            }
        }

        return this.callParent([request]);
    },
    /**
     * Calls a specific action on the record.
     * @todo Document on how we call actions on entities
     *
     *
     */
    callAction: function (record, action, method, parameters, callback, reload)
    {
        var url;

        if (action !== null) {
            url = record.getId() + "/" + action;
        } else {
            url = record.getId();
        }
        var request = Ext.create("Ext.data.Request");

        request.setMethod(method);
        request.setUrl(url);
        if (Ext.isObject(parameters)) {
            request.setParams(parameters);
        }

        request.setHeaders(this.getHeaders());

        request.setCallback(function (options, success, response)
        {
            this.processCallActionResponse(options, success, response);

            if (reload) {
                record.load();
            }

            if (Ext.isFunction(callback)) {
                callback(options, success, response);
            }
        }.bind(this));

        this.sendRequest(request);
    },
    /**
     * Encodes the array of {@link Ext.util.Filter} objects into a string to be sent in the request url. By default,
     * this simply JSON-encodes the filter data.
     *
     * Additionally converts any model instances to the ID representation in order to save bytes during a request.
     *
     * @param {Ext.util.Filter[]} filters The array of {@link Ext.util.Filter Filter} objects
     * @return {String} The encoded filters
     */
    encodeFilters: function (filters)
    {
        var out = [],
            length = filters.length,
            i, filter, j;

        for (i = 0; i < length; i++) {
            filter = filters[i].serialize();

            if (Object.prototype.toString.call(filter.value) === '[object Array]') {
                for (j = 0; j < filter.value.length; j++) {
                    if (filter.value[j].isModel && filter.value[j].isModel === true) {
                        filter.value[j] = filter.value[j].getId();
                    }
                }
            } else {
                if (typeof filter.value === "object" && filter.value !== null) {
                    if (filter.value.isModel && filter.value.isModel === true) {
                        filter.value = filter.value.getId();
                    }
                }
            }
            out[i] = filter;
        }

        return this.applyEncoding(out);
    },
    /**
     * Calls a specific action on the collection
     * @todo Document on how we call actions on entities
     *
     *
     */
    callCollectionAction: function (action, method, parameters, callback, ignoreException)
    {
        var url;

        if (action !== null) {
            url = this.url + "/" + action;
        } else {
            url = this.url;
        }

        var request = Ext.create("Ext.data.Request");

        request.setMethod(method);
        request.setUrl(url);
        if (Ext.isObject(parameters)) {
            request.setParams(parameters);
        }

        request.setHeaders(this.getHeaders());

        request.setCallback(function (options, success, response)
        {
            this.processCallActionResponse(options, success, response, ignoreException);

            if (Ext.isFunction(callback)) {
                callback(options, success, response);
            }
        }.bind(this));

        this.sendRequest(request);
    },
    processCallActionResponse: function (options, success, response, ignoreException)
    {
        if (success === true) {
            return;
        }

        if (!ignoreException) {
            this.showException(response);
        }
    },
    showException: function (response)
    {
        PartKeepr.ExceptionWindow.showException(response);
    }
});

Ext.define("PartKeepr.data.HydraReader", {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.hydra',

    totalProperty: 'hydra:totalItems',

    getResponseData: function (response) {
        var data = this.callParent([response]);

        if (data["@type"] == "hydra:PagedCollection" || data["@type"] == "hydra:Collection") {
            this.setRootProperty("hydra:member");
        } else {
            this.setRootProperty("");
        }
        return data;
    }
});
Ext.define("PartKeepr.data.TreeReader", {
    extend: 'Ext.data.reader.Json',

    alias: 'reader.tree',

   getResponseData: function(response) {
       var data = this.callParent(arguments);
        return {
            children: data
        };
    }
});


Ext.define('PartKeepr.data.store.PartCategoryStore', {
    extend: 'Ext.data.TreeStore',

    /**
     * The store ID to use
     */
    storeId: 'PartCategoryStore',

    /**
     * Don't sort remotely as this is a tree store
     */
    remoteSort: false,

    /**
     * Sort folders alphabetically
     */
    folderSort: true,

    /**
     * Show the root node by default
     */
    rootVisible: false,

    /**
     * Automatically load the store
     */
    autoLoad: true,

    /**
     * Sort by name ascending by default
     */
    sorters: [
        {
            property: 'name',
            direction: 'ASC'
        }
    ],

    /**
     * Virtual Root Node
     */
    root: {
        "@id": "@local-tree-root",
        "name": "virtual root - should not be visible"
    },

    /**
     * The model to use
     */
    model: "PartKeepr.PartBundle.Entity.PartCategory",

    proxy: {
        ignoreLoadId: '@local-tree-root',
        url: "/api/part_categories/getExtJSRootNode",
        type: "Hydra",
        appendId: false,
        reader: {
            type: 'tree'
        }
    }
});

Ext.define('PartKeepr.data.store.FootprintCategoryStore', {
    extend: 'Ext.data.TreeStore',

    /**
     * The store ID to use
     */
    storeId: 'FootprintCategoryStore',

    /**
     * Don't sort remotely as this is a tree store
     */
    remoteSort: false,

    /**
     * Sort folders alphabetically
     */
    folderSort: true,

    /**
     * Show the root node by default
     */
    rootVisible: false,

    /**
     * Automatically load the store
     */
    autoLoad: true,

    /**
     * Sort by name ascending by default
     */
    sorters: [
        {
            property: 'name',
            direction: 'ASC'
        }
    ],

    /**
     * Virtual Root Node
     */
    root: {
        "@id": "@local-tree-root",
        "name": "virtual root - should not be visible"
    },

    /**
     * The model to use
     */
    model: "PartKeepr.FootprintBundle.Entity.FootprintCategory",

    proxy: {
        ignoreLoadId: '@local-tree-root',
        url: "/api/footprint_categories/getExtJSRootNode",
        type: "Hydra",
        appendId: false,
        reader: {
            type: 'tree'
        }
    }
});

Ext.define('PartKeepr.data.store.StorageLocationCategoryStore', {
    extend: 'Ext.data.TreeStore',

    /**
     * The store ID to use
     */
    storeId: 'StorageLocationCategoryStore',

    /**
     * Don't sort remotely as this is a tree store
     */
    remoteSort: false,

    /**
     * Sort folders alphabetically
     */
    folderSort: true,

    /**
     * Show the root node by default
     */
    rootVisible: false,

    /**
     * Automatically load the store
     */
    autoLoad: true,

    /**
     * Sort by name ascending by default
     */
    sorters: [
        {
            property: 'name',
            direction: 'ASC'
        }
    ],

    /**
     * Virtual Root Node
     */
    root: {
        "@id": "@local-tree-root",
        "name": "virtual root - should not be visible"
    },

    /**
     * The model to use
     */
    model: "PartKeepr.StorageLocationBundle.Entity.StorageLocationCategory",

    proxy: {
        ignoreLoadId: '@local-tree-root',
        url: "/api/storage_location_categories/getExtJSRootNode",
        type: "Hydra",
        appendId: false,
        reader: {
            type: 'tree'
        }
    }
});

Ext.define('PartKeepr.data.store.UserPreferenceStore', {
    extend: 'Ext.data.Store',

    /**
     * The store ID to use
     */
    storeId: 'UserPreferenceStore',

    /**
     * Automatically load the store
     */
    autoLoad: false,

    /**
     * The model to use
     */
    model: "PartKeepr.AuthBundle.Entity.UserPreference",

    pageSize: 99999999
});

/**
 * Enhancements for Ext.tree.View:
 *
 * Ported ensureVisible and scrollIntoView from ExtJS3
 */
Ext.define("PartKeepr.tree.View", {
    override: "Ext.tree.View",

    /**
     * Expands all parent nodes so the child is visible.
     * @param {Ext.data.Model} record The record to make visible
     */
    ensureVisible: function (record)
    {
        if (!record) {
            return;
        }

        if (record.parentNode) {
            record.parentNode.expand();
            this.ensureVisible(record.parentNode);
        }
    }
});
/**
 * Overrides Ext.form.Basic to implement getter support for loadRecord(). This enables us to directly
 * assign comboboxes to associations.
 */
Ext.define("PartKeepr.form.Basic", {
    override: "Ext.form.Basic",

    loadRecord: function (record)
    {
        this._record = record;

        var values = record.getData();

        for (var i in record.associations) {
            var getterName = record.associations[i].getterName;
            values[i] = record[getterName]();
        }

        return this.setValues(values);
    },
    /**
     * Persists the values in this form into the passed {@link Ext.data.Model} object in a beginEdit/endEdit block.
     * If the record is not specified, it will attempt to update (if it exists) the record provided to loadRecord.
     * @param {Ext.data.Model} [record] The record to edit
     * @return {Ext.form.Basic} this
     */
    updateRecord: function(record) {
        record = record || this._record;
        if (!record) {
            //<debug>
            Ext.raise("A record is required.");
            //</debug>
            return this;
        }

        var fields = record.self.fields,
            values = this.getFieldValues(),
            obj = {},
            associations = {},
            i = 0,
            len = fields.length,
            name;

        for (; i < len; ++i) {
            name  = fields[i].name;

            if (values.hasOwnProperty(name)) {
                if (record.hasField(name)) {
                    obj[name] = values[name];
                } else {
                    associations[name] = values[name];
                }
            }
        }

        record.beginEdit();
        record.set(obj);

        for (i in associations) {
            if (record.associations[i]) {
                var setterName = record.associations[i].setterName;
                record[setterName](associations[i]);
            }
        }
        record.endEdit();

        return this;
    },
});
/**
 * Enhancements for Ext.ux.TreePicker:
 *
 * - Allow setValue to be a model. If it's a model, select by the idProperty
 * - Use | as separator for getPath/selectPath, because the default "/" separator doesn't work with JSON-LD IDs
 */
Ext.define("PartKeepr.ux.TreePicker", {
    override: "Ext.ux.TreePicker",

   /**
     * Sets the specified value into the field
     * @param {Mixed} value
     * @return {Ext.ux.TreePicker} this
     */
    setValue: function(value) {
        var me = this,
            record;

        me.value = value;

        if (me.store.loading) {
            // Called while the Store is loading. Ensure it is processed by the onLoad method.
            return me;
        }

        // try to find a record in the store that matches the value
        record = value ? me.store.getNodeById(value) : me.store.getRoot();
        if (value === undefined || value === null) {
            record = me.store.getRoot().firstChild;
            me.value = record.getId();
        } else {
            if (value.isModel) {
                record = me.store.getNodeById(value.getId());
            } else {
                record = me.store.getNodeById(value);
            }
        }

        // set the raw value to the record's display field if a record was found
        me.setRawValue(record ? record.get(me.displayField) : '');

        return me;
    },
    /**
     * Runs when the picker is expanded.  Selects the appropriate tree node based on the value of the input element,
     * and focuses the picker so that keyboard navigation will work.
     * @private
     */
    onExpand: function()
    {
        var me = this,
            picker = me.picker,
            store = picker.store,
            value = me.value,
            node;

        if (value) {
            if (value.isModel) {
                node = store.getNodeById(value.getId());
            } else {
                node = store.getNodeById(value);
            }
        }

        if (!node) {
            node = store.getRoot();
        }

        var path = node.getPath("@id", "|");

        picker.selectPath(path, "@id", "|");
    },
     /**
     * Changes the selection to a given record and closes the picker
     * @private
     * @param {Ext.data.Model} record
     */
    selectItem: function(record) {
        var me = this;
        me.setValue(record);
        me.fireEvent('select', me, record);
        me.collapse();
    },
});

Ext.define("PartKeepr.Actions.BaseAction", {
   execute: function () {}
});

Ext.define("PartKeepr.Actions.LogoutAction", {
    extend: "PartKeepr.Actions.BaseAction",

    execute: function ()
    {
        PartKeepr.getApplication().getLoginManager().logout();
    },
    statics: {
        iconCls: 'web-icon disconnect',
        title: i18n('Disconnect'),
        closable: true,
        menuPath: [{text: i18n("System")}]
    }
});

Ext.define('PartKeepr.Statusbar', {
    extend: 'Ext.ux.statusbar.StatusBar',

    defaultText: i18n("Ready."),
    defaultIconCls: 'x-status-valid',
    iconCls: 'x-status-valid',
    autoClear: 3000,
    initComponent: function ()
    {
        this.connectionButton = new PartKeepr.ConnectionButton();
        this.connectionButton.on("click", this.onConnectionButtonClick, this);
        this.timeDisplay = Ext.create("PartKeepr.TimeDisplay");
        this.currentUserDisplay = Ext.create("Ext.toolbar.TextItem");

        this.showMessageLog = Ext.create("Ext.Button", {
            iconCls: 'web-icon application_osx_terminal',
            cls: 'x-btn-icon',
            handler: function ()
            {
                PartKeepr.getApplication().toggleMessageLog();
            }
        });

        this.systemNoticeButton = Ext.create("PartKeepr.SystemNoticeButton", {
            hidden: true
        });

        Ext.apply(this, {
            items: [
                this.currentUserDisplay,
                {xtype: 'tbseparator'},
                this.timeDisplay,
                {xtype: 'tbseparator'},
                this.showMessageLog,
                {xtype: 'tbseparator'},
                this.connectionButton,
                this.systemNoticeButton

            ]
        });

        this.setDisconnected();

        this.callParent();
    },
    getConnectionButton: function ()
    {
        return this.connectionButton;
    },
    setCurrentUser: function (username)
    {
        this.currentUserDisplay.setText(i18n("Logged in as") + ": " + username);
    },
    startLoad: function (message)
    {
        if (message !== null) {
            this.showBusy({text: message, iconCls: "x-status-busy"});
        } else {
            this.showBusy();
        }
    },
    endLoad: function ()
    {
        this.clearStatus({useDefaults: true});
    },
    setConnected: function ()
    {
        var user = PartKeepr.getApplication().getLoginManager().getUser();

        this.setCurrentUser(user.get("username"));
        this.connectionButton.setConnected();
    },
    setDisconnected: function ()
    {
        this.connectionButton.setDisconnected();
        this.currentUserDisplay.setText(i18n("Not logged in"));
    },
    onConnectionButtonClick: function ()
    {
        var loginManager = PartKeepr.getApplication().getLoginManager();
        if (loginManager.isLoggedIn()) {
            loginManager.logout();
        } else {
            loginManager.login();
        }
    }
});



/**
 * Defines the login dialog
 */
Ext.define('PartKeepr.LoginDialog', {
	extend: 'Ext.Window',

	title: i18n("PartKeepr: Login"),
	
	maxWidth: 400,

	modal: true,
	resizable: false,
	
	layout: 'anchor',
	bodyStyle: 'padding: 5px;',
	
	/**
	 * Initializes the login dialog component
     *
     * @todo Get rid of this stuff and implement it ExtJS5 (modern style)
	 */
	initComponent: function () {
		
		this.loginField = Ext.ComponentMgr.create({
	    	xtype: 'textfield',
	    	value: "",
	    	fieldLabel: i18n("Username"),
	    	anchor: '100%'
	    });

		this.passwordField = Ext.ComponentMgr.create({
        	xtype: 'textfield',
        	inputType: "password",
        	value: "",
        	fieldLabel: i18n("Password"),
        	anchor: '100%'
        });
		
		Ext.apply(this, {
			items: [
			        	this.loginField,
			        	this.passwordField
			],
			dockedItems: [{
			       xtype: 'toolbar',
			       enableOverflow: false,
			       dock: 'bottom',
			       ui: 'footer',
			       pack: 'start',
			       defaults: {minWidth: 100},
			       items: [
			       	{
			       		text: i18n("Connect"),
                        iconCls: "web-icon connect",
			       		handler: Ext.bind(this.login, this)
			       	},{
			       		text: i18n("Close"),
                        iconCls: "web-icon cancel",
			       		handler: Ext.bind(this.close, this)
			       	}]
			}]
		});
		
		this.callParent(arguments);

		this.on("render", this.assignEnterKey, this);
		// Focus the login field on show
		// @workaround Set the focus 100ms after the dialog has been shown.
		this.on("show", function () { this.loginField.focus(); }, this, { delay: 100 });
	},
	/**
	 * Assigns the enter key to the login window.
	 */
	assignEnterKey: function () {
		var keyMap = this.getKeyMap();
    	keyMap.on(Ext.event.Event.ENTER, this.login, this);
	},
	/**
	 * Fires the "login" event
	 */
	login: function () {
		this.fireEvent("login", this.loginField.getValue(), this.passwordField.getValue());
	}

});

/**
 * @class PartKeepr.PartImageDisplay
 * Provides a display of all part images with scroll-through functionality.
 */
Ext.define('PartKeepr.PartImageDisplay', {
    extend: 'Ext.panel.Panel',

    displayedImageIndex: 0,
    imageMaxHeight: 150,
    layout: 'hbox',
    border: false,

    /**
     * Initializes the component and creates all widgets.
     */
    initComponent: function ()
    {

        this.store = Ext.create("Ext.data.ChainedStore");

        this.prevButton = Ext.create("Ext.button.Button", {
            text: '<',
            width: 20,
            height: this.imageMaxHeight,
            handler: this.onPreviousClick,
            scope: this
        });

        this.nextButton = Ext.create("Ext.button.Button", {
            text: '>',
            width: 20,
            height: this.imageMaxHeight,
            handler: this.onNextClick,
            scope: this
        });

        this.image = Ext.create("Ext.Img", {
            maxHeight: this.imageMaxHeight,
            autoEl: 'div',
            height: this.imageMaxHeight,
            width: 200
        });

        this.items = [this.prevButton, this.image, this.nextButton];

        this.callParent();
    },
    /**
     * Sets the stored when a new part is selected.
     * @param store The store
     */
    setStore: function (store)
    {
        this.store.setSource(store);

        this.store.setRemoteFilter(false);

        this.store.addFilter({
            property: "isImage",
            operator: "=",
            value: true
        });

        this.displayedImageIndex = 0;
        this.setImage();
    },
    /**
     * Sets the image
     * @param id The attachment ID to set
     */
    setImage: function ()
    {
        var image = this.store.getAt(this.displayedImageIndex);

        if (image) {
            this.image.setSrc(image.getId() + "/getImage?maxHeight=" + this.imageMaxHeight + "&ts=" + new Date().getTime());
        } else {
            this.image.setSrc(null);
        }
    },
    /**
     * Handler for the "next" button
     */
    onNextClick: function ()
    {
        if (this.displayedImageIndex < this.store.getCount() - 1) {
            this.displayedImageIndex++;
        }

        this.setImage();
    },
    /**
     * Handler for the "previous" button
     */
    onPreviousClick: function ()
    {
        if (this.displayedImageIndex > 0) {
            this.displayedImageIndex--;
        }

        this.setImage();
    }
});
/**
 * @class PartKeepr.PartManager
 * @todo Document the editor system a bit better
 *
 * The part manager encapsulates the category tree, the part display grid and the part detail view.
 */
Ext.define('PartKeepr.PartManager', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.PartManager',
    layout: 'border',
    id: 'partkeepr-partmanager',
    border: false,
    padding: 5,
    dragAndDrop: true,

    /**
     * Defines if the border layout should be compact or regular.
     *
     * Compact style stacks the tree panel and the part detail panel on top of each other to save space, which is a bit
     * odd in terms of usability. Regular style means that the layout will be Category Tree->Part List->Part details.
     *
     * @var boolean True if compact layout should be used, false otherwise.
     */
    compactLayout: false,

    selectedCategory: null,

    initComponent: function ()
    {

        /**
         * Create the store with the default sorter "name ASC"
         */
        this.createStore({
            model: 'PartKeepr.PartBundle.Entity.Part',
            groupField: 'categoryPath',
            sorters: [
                {
                    property: 'category.categoryPath',
                    direction: 'ASC'
                },
                {
                    property: 'name',
                    direction: 'ASC'
                }
            ]
        });

        var treeConfig = {
            region: 'west',
            ddGroup: 'CategoryTree'
        };

        if (this.compactLayout) {
            treeConfig.region = 'center';
        } else {
            treeConfig.floatable = false;
            treeConfig.split = true;
            treeConfig.width = 300; // @todo Make this configurable
            treeConfig.title = i18n("Categories");
            treeConfig.collapsible = true; // We want to collapse the tree panel on small screens
        }

        // Create the tree
        this.tree = Ext.create("PartKeepr.PartCategoryTree", treeConfig);

        // Trigger a grid reload on category change
        this.tree.on("itemclick", this.onCategoryClick, this);

        // Create the detail panel
        this.detail = Ext.create("PartKeepr.PartDisplay", {title: i18n("Part Details")});
        this.detail.on("editPart", this.onEditPart, this);

        var gridConfig = {
            title: i18n("Parts List"), region: 'center', layout: 'fit', store: this.getStore()
        };

        if (this.dragAndDrop) {
            gridConfig.viewConfig = {
                plugins: {
                    ddGroup: 'PartTree',
                    ptype: 'gridviewdragdrop',
                    enableDrop: false
                }
            };

            gridConfig.enableDragDrop = true;
        }

        // Create the grid
        this.grid = Ext.create("PartKeepr.PartsGrid", gridConfig);
        this.grid.on("editPart", this.onEditPart, this);

        // Create the grid listeners
        this.grid.on("itemSelect", this.onItemSelect, this);
        this.grid.on("itemDeselect", this.onItemSelect, this);
        this.grid.on("itemAdd", this.onItemAdd, this);
        this.grid.on("itemDelete", this.onItemDelete, this);
        this.grid.on("duplicateItemWithBasicData", this.onDuplicateItemWithBasicData, this);
        this.grid.on("duplicateItemWithAllData", this.onDuplicateItemWithAllData, this);
        this.tree.on("syncCategory", this.onSyncCategory, this);

        // Create the stock level panel
        this.stockLevel = Ext.create("PartKeepr.PartStockHistory", {title: "Stock History"});

        var detailPanelConfig = {
            title: i18n("Part Details"),
            collapsed: true,
            collapsible: true,
            region: 'east',
            floatable: false,
            titleCollapse: true,
            split: true,
            animCollapse: false,
            items: [this.detail, this.stockLevel]
        };

        if (this.compactLayout) {
            detailPanelConfig.height = 300;
            detailPanelConfig.region = 'south';
        } else {
            detailPanelConfig.width = 300;
        }

        this.detailPanel = Ext.create("Ext.tab.Panel", detailPanelConfig);

        this.filterPanel = Ext.create("PartKeepr.PartFilterPanel", {
            title: i18n("Filter"),
            region: 'south',
            height: 225,
            animCollapse: false,
            floatable: false,
            titleCollapse: true,
            split: true,
            collapsed: true,
            collapsible: true,
            store: this.store,
            partManager: this
        });

        if (this.compactLayout) {
            // Create two border layouts: One for the center panel and one for the left panel. Each border layout
            // has two columns each, containing Categories+Part Details and Part List+Part Filter Panel.
            this.items = [
                {
                    layout: 'border',
                    border: false,
                    region: 'west',
                    animCollapse: false,
                    width: 300,
                    split: true,
                    title: i18n("Categories / Part Details"),
                    titleCollapse: true,
                    collapsed: false,
                    collapsible: true,
                    items: [this.tree, this.detailPanel]
                }, {
                    layout: 'border',
                    border: false,
                    region: 'center',
                    items: [this.grid, this.filterPanel]
                }
            ];
        } else {
            // The regular 3-column layout. The tree, then the part list+part filter, then the part details.
            this.items = [
                this.tree, {
                    layout: 'border',
                    border: false,
                    region: 'center',
                    items: [this.grid, this.filterPanel]
                }, this.detailPanel
            ];
        }

        this.callParent();
    },
    /**
     * Applies the category filter to the store when a category is selected
     *
     * @param {Ext.tree.View} tree The tree view
     * @param {Ext.data.Model} record the selected record
     */
    onCategoryClick: function (tree, record)
    {
        this.selectedCategory = record;

        var filter = Ext.create("Ext.util.Filter", {
            id: 'categoryFilter',
            property: 'category',
            operator: 'IN',
            value: this.getChildrenIds(record)
        });

        if (record.parentNode.isRoot()) {
            // Workaround for big installations: Passing all child categories for the root node
            // to the filter exceeds the HTTP URI length. See
            // https://github.com/partkeepr/PartKeepr/issues/473
            this.store.removeFilter(filter);
        } else {
            this.store.addFilter(filter);
        }
    },
    getSelectedCategory: function ()
    {
        return this.selectedCategory;
    },
    /**
     * Returns the ID for this node and all child nodes
     *
     * @param {Ext.data.Model} The node
     * @return Array
     */
    getChildrenIds: function (node)
    {
        var childNodes = [node];

        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++) {
                childNodes = childNodes.concat(this.getChildrenIds(node.childNodes[i]));
            }
        }

        return childNodes;
    },
    /**
     * Called when the sync button was clicked. Highlights the category
     * of the selected part for a short time. We can't select the category
     * as this would affect the parts grid.
     */
    onSyncCategory: function ()
    {
        var r = this.grid.getSelectionModel().getSelection();

        if (r.length != 1) {
            return;
        }

        var rootNode = this.tree.getRootNode();
        var cat = r[0].getCategory().getId();

        var node = rootNode.findChild("@id", cat, true);

        if (node) {
            this.tree.getView().ensureVisible(node);
            this.tree.getView().focusNode(node);
        }
    },
    /**
     * Called when the delete button was clicked.
     *
     * Prompts the user if he really wishes to delete the part. If yes, it calls deletePart.
     */
    onItemDelete: function ()
    {
        var r = this.grid.getSelectionModel().getLastSelected();

        Ext.Msg.confirm(i18n("Delete Part"), sprintf(i18n("Do you really wish to delete the part %s?"), r.get("name")),
            this.deletePart, this);
    },
    /**
     * Creates a duplicate with the basic data only from the selected item. Loads the selected part and calls
     * createPartDuplicate after the part was loaded.
     *
     * @param none
     * @return nothing
     */
    onDuplicateItemWithBasicData: function ()
    {
        var r = this.grid.getSelectionModel().getLastSelected();

        this.loadPart(r.getId(), Ext.bind(this.createPartDuplicate, this));
    },
    /**
     * Creates a full duplicate from the selected item. Loads the selected part and calls createPartDuplicate
     * after the part was loaded.
     *
     * @param none
     * @return nothing
     */
    onDuplicateItemWithAllData: function ()
    {
        var r = this.grid.getSelectionModel().getLastSelected();

        this.loadPart(r.getId(), Ext.bind(this.createFullPartDuplicate, this));
    },
    /**
     * Creates a part duplicate from the given record and opens the editor window.
     * @param rec The record to duplicate
     */
    createPartDuplicate: function (rec)
    {
        var data = rec.getData();
        var associationData = rec.getAssociationData();

        var newItem = Ext.create("PartKeepr.PartBundle.Entity.Part");
        newItem.set(data);
        newItem.setAssociationData({
            category: associationData.category,
            partUnit: associationData.partUnit,
            storageLocation: associationData.storageLocation,
            footprint: associationData.footprint
        });

        var j = Ext.create("PartKeepr.PartEditorWindow", {
            partMode: 'create'
        });

        j.editor.on("partSaved", this.onNewPartSaved, this);
        j.editor.editItem(newItem);
        j.show();
    },
    /**
     * Creates a part duplicate from the given record and opens the editor window.
     * @param rec The record to duplicate
     */
    createFullPartDuplicate: function (rec)
    {
        var data = rec.getData();

        var newItem = Ext.create("PartKeepr.PartBundle.Entity.Part");
        newItem.set(data);
        newItem.setAssociationData(rec.getAssociationData());

        var j = Ext.create("PartKeepr.PartEditorWindow", {
            partMode: 'create'
        });

        j.editor.on("partSaved", this.onNewPartSaved, this);
        j.editor.editItem(newItem);
        j.show();
    },
    /**
     * Deletes the selected part.
     *
     * @param {String} btn The clicked button in the message box window.
     * @todo We use the current selection of the grid. If for some reason the selection changes during the user is prompted,
     * we delete the wrong part. Fix that to pass the selected item to the onItemDelete then to this function.
     */
    deletePart: function (btn)
    {
        var r = this.grid.getSelectionModel().getLastSelected();

        if (btn == "yes") {
            this.detailPanel.collapse();
            this.detail.clear();
            r.erase();
        }
    },
    /**
     * Creates a new, empty part editor window
     */
    onItemAdd: function ()
    {
        var j = Ext.create("PartKeepr.PartEditorWindow", {
            partMode: 'create'
        });

        var defaultPartUnit = PartKeepr.getApplication().getPartUnitStore().findRecord("default", true);

        var record = Ext.create("PartKeepr.PartBundle.Entity.Part");

        if (this.getSelectedCategory() !== null) {
            record.setCategory(this.getSelectedCategory());
        } else {
            record.setCategory(this.tree.getRootNode().firstChild);
        }

        record.setPartUnit(defaultPartUnit);

        j.editor.editItem(record);
        j.editor.on("partSaved", this.onNewPartSaved, this);
        j.show();

        return j;
    },
    /**
     * Called when a part was edited. Refreshes the grid.
     */
    onEditPart: function (part)
    {
        var j = Ext.create("PartKeepr.PartEditorWindow");
        j.editor.on("partSaved", this.onPartSaved, this);
        j.editor.editItem(part);
        j.show();
    },
    onNewPartSaved: function (record)
    {
        this.grid.getStore().reload();
    },
    onPartSaved: function (record)
    {
        this.detail.setValues(record);
    },
    /**
     * Called when a part was selected in the grid. Displays the details for this part.
     */
    onItemSelect: function ()
    {
        if (this.grid.getSelection().length > 1) {
            this.detailPanel.collapse();
            this.tree.syncButton.disable();
        } else {
            if (this.grid.getSelection().length == 1) {
                var selection = this.grid.getSelection();

                var r = selection[0];

                this.detailPanel.setActiveTab(this.detail);
                this.detailPanel.expand();
                this.detail.setValues(r);
                this.stockLevel.part = r.getId();

                this.tree.syncButton.enable();
            } else {
                this.tree.syncButton.disable();
            }
        }

    },
    /**
     * Triggers loading of a part
     * @param {Integer} id The ID of the part to load
     * @param {Function} handler The callback to call when the part was loaded
     */
    loadPart: function (id, handler)
    {
        // @todo we have this method duplicated in PartEditor

        PartKeepr.PartBundle.Entity.Part.load(id, {
            scope: this,
            success: handler
        });
    },
    /**
     * Creates the store
     */
    createStore: function (config)
    {
        Ext.Object.merge(config, {
            autoLoad: true,
            autoSync: false, // Do not change. If true, new (empty) records would be immediately commited to the database.
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50
        });

        this.store = Ext.create('Ext.data.Store', config);

        // Workaround for bug http://www.sencha.com/forum/showthread.php?133767-Store.sync()-does-not-update-dirty-flag&p=607093#post607093
        this.store.on('write', function (store, operation)
        {
            var success = operation.wasSuccessful();
            if (success) {
                Ext.each(operation.records, function (record)
                {
                    if (record.dirty) {
                        record.commit();
                    }
                });
            }
        });
    },
    /**
     * Returns the store
     */
    getStore: function ()
    {
        return this.store;
    }
});

/**
 * @class PartKeepr.PartEditorWindow

 * <p>The PartEditorWindow encapsulates the PartKeepr.PartEditor within a window.</p>
 */
Ext.define('PartKeepr.PartEditorWindow', {
	extend: 'Ext.window.Window',
	
	/* Constrain the window to fit the viewport */
	constrainHeader: true,
	
	/* Fit the editor within the window */
	layout: 'fit',
	
	/* Width and height settings */
	width: 600,
	minWidth: 600,
	minHeight: 415,
	height: 415,
	
	saveText: i18n("Save"),
	cancelText: i18n("Cancel"),

	/* Default edit mode. If mode = "create", we show additional fields */
	partMode: 'edit',
	title: i18n("Add Part"),
	
	saveButtonReenableTask: null,
	
	/**
	 * Creates the part editor and put it into the window.
	 */
	initComponent: function () {
		this.editor = Ext.create("PartKeepr.PartEditor", {
			border: false,
			partMode: this.partMode,
			enableButtons: false
		});
		
		/* If the edit mode is "create", we need to enlarge the window a bit to fit the fields without scrolling */
		if (this.partMode && this.partMode == "create") {
			this.height = 500;
			this.minHeight = 500;
		}
		
		this.items = [ this.editor ];

		/**
		 * We need a delay, since if others are listening for "editorClose", the dialog plus the record could be destroyed
		 * before any following listeners have a chance to receive the record, resulting in strange problems.
		 */
		this.editor.on("editorClose", function (context) { this.close();}, this, { delay: 200 });
		
		this.editor.on("_titleChange", function (val) { this.setTitle(val); }, this);
		this.editor.on("itemSaved", this.onItemSaved, this);
		
		this.saveButton = Ext.create("Ext.button.Button", {
			text: this.saveText,
			iconCls: 'fugue-icon disk',
			handler: Ext.bind(this.onItemSave, this)
		});
		
		this.cancelButton = Ext.create("Ext.button.Button", {
			text: this.cancelText,
			iconCls: 'web-icon cancel',
			handler: Ext.bind(this.onCancelEdit, this)
		});
		
		this.bottomToolbar = Ext.create("Ext.toolbar.Toolbar", {
			enableOverflow: true,
			defaults: {minWidth: 100},
			dock: 'bottom',
			ui: 'footer',
			pack: 'start',
			items: [ this.saveButton, this.cancelButton ]
		});
		
		this.dockedItems = [ this.bottomToolbar ];
		
		this.keepOpenCheckbox = Ext.create("Ext.form.field.Checkbox", {
			boxLabel: i18n("Create blank item after save")
		});
		
		this.createCopyCheckbox = Ext.create("Ext.form.field.Checkbox", {
			boxLabel: i18n("Create Copy after save")
		});
		
		this.copyPartDataCheckbox = Ext.create("Ext.form.field.Checkbox", {
			boxLabel: i18n("Takeover all data"),
			disabled: true
		});
		
		if (this.partMode == "create") {
			this.bottomToolbar.add(this.keepOpenCheckbox);
			this.bottomToolbar.add(this.copyPartDataCheckbox);
		} else {
			this.bottomToolbar.add(this.createCopyCheckbox);
		}
		
		this.keepOpenCheckbox.on("change", this.onKeepOpenCheckboxClick, this);
		
		this.editor.keepOpenCheckbox = this.keepOpenCheckbox;
		this.editor.copyPartDataCheckbox = this.copyPartDataCheckbox;
		this.editor.createCopyCheckbox = this.createCopyCheckbox;
		
		this.callParent();
	},
	onCancelEdit: function () {
		this.editor.onCancelEdit();
	},
	/**
	 * Listens to the keepOpenCheckbox clicks and enables/disables the copyPartDataCheckbox
	 * @param value
	 */
	onKeepOpenCheckboxClick: function (field, value) {
		if (value) {
			this.copyPartDataCheckbox.enable();
		} else {
			this.copyPartDataCheckbox.disable();
		}
	},
	/**
	 * Called when the save button was clicked
	 */
	onItemSave: function () {
		if (!this.editor.getForm().isValid()) { return; }
		
		// Disable the save button to indicate progress
		this.saveButton.disable();
		
		// Sanity: If the save process fails, re-enable the button after 30 seconds
		if (this.saveButtonReenableTask === null){
			this.saveButtonReenableTask = new Ext.util.DelayedTask(function(){ this.saveButton.enable(); }, this);
			this.on( 'destroy', function(){ this.saveButtonReenableTask.cancel(); }, this );
		}
		this.saveButtonReenableTask.delay(30000);

		this.editor._onItemSave();
	},
	/**
	 * Called when the item was saved
	 */
	onItemSaved: function () {
		this.saveButton.enable();
	}
});

/**
 * @class PartKeepr.PartDisplay
 * <p>This component displays information about a specific part.</p>
 */
Ext.define('PartKeepr.PartDisplay', {
    extend: 'Ext.panel.Panel',
    bodyCls: 'partdisplay',

    overflowY: 'auto',

    fieldConfigs: {
        "category.name": {
            displayName: i18n("Category Name")
        },
        stockLevel: {
            displayName: i18n("Stock Level")
        },
        minStockLevel: {
            displayName: i18n("Minimum Stock Level")
        },
        "footprint.name": {
            displayName: i18n("Footprint")
        },
        "storageLocation.name": {
            displayName: i18n("Storage Location")
        },
        comment: {
            displayName: i18n("Comment")
        },
        createDate: {
            displayName: i18n("Create Date"),
            type: 'date',
        },
        status: {
            displayName: i18n("Status")
        },
        partCondition: {
            displayName: i18n("Condition")
        },
        needsReview: {
            displayName: i18n("Needs Review"),
            type: 'boolean'
        },
        projectNames: {
            displayName: i18n("Used in Projects")
        },
        "@id": {
            displayName: i18n("Internal ID"),
            renderer: function (value)
            {
                var values = value.split("/");
                return values[values.length - 1];
            }
        }
    },

    /**
     * Initializes the component and adds a template as well as the add/remove stock and edit part buttons.
     */
    initComponent: function ()
    {
        /**
         * Create the "add stock" button
         */
        this.addButton = new Ext.Button({
            text: i18n("Add Stock"),
            iconCls: 'web-icon brick_add',
            handler: Ext.bind(this.addPartPrompt, this)
        });

        /**
         * Create the "remove stock" button
         */
        this.deleteButton = new Ext.Button({
            text: i18n("Remove Stock"),
            iconCls: 'web-icon brick_delete',
            handler: Ext.bind(this.deletePartPrompt, this)
        });

        /**
         * Create the "edit part" button
         */
        this.editButton = new Ext.Button({
            text: i18n("Edit Part"),
            iconCls: 'web-icon brick_edit',
            handler: Ext.bind(function ()
            {
                this.fireEvent("editPart", this.record);
            }, this)
        });

        /**
         * Create the toolbar which holds our buttons
         */
        this.tbar = Ext.create("Ext.toolbar.Toolbar", {
            enableOverflow: true,
            items: [
                this.addButton,
                this.deleteButton,
                this.editButton
            ]
        });

        /**
         * Add the event "editPart". This event is fired as soon as the "edit" button is clicked.
         *
         * @todo Add the events "addStock" and "removeStock" and manage these events from the PartManager.
         */

        this.attachmentDisplay = Ext.create("Ext.view.View", {
            title: "Foobar",
            store: null,
            itemSelector: 'div.foobar',
            selectedItemCls: "",
            focusCls: "",
            margin: 5,
            emptyText: i18n("No attachments"),
            tpl: [
                '<tpl for=".">',
                '<div class="foobar"><a href="{[values["@id"]]}/getFile" target="_blank">{[values.originalFilename]}</a></div>',
                '</tpl>'
            ]
        });

        this.imageDisplay = Ext.create("PartKeepr.PartImageDisplay", {
            title: i18n("Images"),
        });

        this.infoGrid = Ext.create("Ext.grid.property.Grid", {
            listeners: {
                'beforeedit': function (e)
                {
                    return false;
                }
            },
            hideHeaders: true,
            nameColumnWidth: 150,
            title: {
                height: 'auto',
                cls: 'x-title-wrappable-text'
            },
            cls: 'x-wrappable-grid',
            sourceConfig: this.fieldConfigs
        });

        this.items = [
            this.infoGrid, {
                xtype: 'panel',
                title: i18n("Attachments"),
                items: this.attachmentDisplay
            }, this.imageDisplay
        ];
        this.callParent();
    },
    clear: function ()
    {
        this.attachmentDisplay.bindStore(null);
        this.imageDisplay.setStore(null);

    },
    /**
     * Sets the values for the template.
     *
     * Note that the data of the record is applied with htmlentities(), i.e. <b>Test</b> will be
     * displayed as such and not in bold.
     */
    setValues: function (r)
    {
        this.record = r;

        var values = {}, value;

        var recordData = this.record.getData();

        for (var i in this.fieldConfigs) {
            value = this.record.get(i);
            if (value !== undefined) {
                if (typeof(value === "string")) {
                    values[i] = htmlentities(value); // phpjs
                } else {
                    values[i] = value;
                }
            } else {
                values[i] = i18n("none");
            }
        }

        this.attachmentDisplay.bindStore(this.record.attachments());
        this.infoGrid.setSource(values);
        this.infoGrid.setTitle(
            "<div>" + this.record.get("name") + "</div><small>" + this.record.get("description") + "</small>");
        this.imageDisplay.setStore(this.record.attachments());

        // Scroll the container to top in case the user scrolled the part, then switched to another part
        this.scrollTo(0, 0);

    },
    /**
     * Prompt the user for the stock level he wishes to add.
     */
    addPartPrompt: function ()
    {
        var j = new PartKeepr.PartStockWindow({partUnitName: this.record.get("partUnitName")});
        j.addStock(this.addPartHandler, this);
    },
    /**
     * Callback after the "add stock" dialog is complete.
     */
    addPartHandler: function (quantity, price, comment)
    {
        this.record.callPutAction("addStock", {
            quantity: quantity,
            price: price,
            comment: comment
        }, null, true);
    },
    /**
     * Prompts the user for the stock level to decrease for the item.
     */
    deletePartPrompt: function ()
    {
        var j = new PartKeepr.PartStockWindow({partUnitName: this.record.get("partUnitName")});
        j.removeStock(this.deletePartHandler, this);
    },
    /**
     * Callback after the "delete stock" dialog is complete.
     */
    deletePartHandler: function (quantity, unused_price, comment)
    {
        this.record.callPutAction("removeStock", {
            quantity: quantity,
            comment: comment,
        }, null, true);
    },
    /**
     * Load the part from the database.
     */
    loadPart: function ()
    {
        this.record.load({
            scope: this,
            success: this.onPartLoaded
        });
    },
    /**
     * Callback after the part is loaded
     */
    onPartLoaded: function (record)
    {
        this.setValues(this.record);
    }
});

/**
 * This class defines a window which is used to in- or decrease the stock level for a specific part. Logic and service
 * calls are not contained in this window, and need to be implemented from the caller.
 */
Ext.define('PartKeepr.PartStockWindow', {
    extend: 'Ext.window.Window',

    // Configurations
    constrainHeader: true,
    width: 305,
    height: 180,

    resizable: false,

    // We set the title later
    title: "",

    // Window title texts
    removePartText: i18n("Remove Part(s)"),
    addPartText: i18n("Add Part(s)"),

    layout: 'anchor',
    bodyStyle: {
        padding: "5px"
    },

    /*
     * Initializes the window with the quantity and price fields. The price field is hidden when a stock decrease
     * happens.
     */
    initComponent: function ()
    {

        this.quantityField = Ext.create("Ext.form.field.Number", {
            value: 0, // The initial value is 0, to indicate that this is a number field
            minValue: 1, // The minimum value is 1. That way we force the user to enter a value
            width: 100,
            listeners: {
                specialkey: {
                    fn: function (field, e)
                    {
                        if (e.getKey() == e.ENTER) {
                            this.onOKClick();
                        }
                    },
                    scope: this
                }
            }
        });

        this.priceField = Ext.create("PartKeepr.CurrencyField", {
            anchor: '100%',
            value: 0,
            fieldLabel: i18n("Price"),
            listeners: {
                specialkey: {
                    fn: function (field, e)
                    {
                        if (e.getKey() == e.ENTER) {
                            this.onOKClick();
                        }
                    },
                    scope: this
                }
            }
        });

        this.priceCheckbox = Ext.create("Ext.form.field.Checkbox", {
            boxLabel: i18n("Price per item"),
            hideEmptyLabel: false,
            checked: true
        });

        this.commentField = Ext.create("Ext.form.field.Text", {
            anchor: '100%',
            fieldLabel: i18n("Comment"),
            maxLength: 255,
            enforceMaxLength: true,
            listeners: {
                specialkey: {
                    fn: function (field, e)
                    {
                        if (e.getKey() == e.ENTER) {
                            this.onOKClick();
                        }
                    },
                    scope: this
                }
            }
        });

        this.form = Ext.create("Ext.form.Panel", {
            border: false,
            bodyStyle: 'background-color: transparent',
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: i18n("Quantity"),
                    layout: 'hbox',
                    items: [
                        this.quantityField, {
                            width: 75,
                            xtype: 'displayfield',
                            margin: "0 0 0 5",
                            value: this.partUnitName
                        }
                    ]
                }, this.priceField, this.priceCheckbox, this.commentField
            ]
        });

        this.items = this.form;

        this.okButton = Ext.create("Ext.button.Button", {
            text: i18n("OK"),
            handler: this.onOKClick,
            scope: this
        });

        this.buttons = [
            {
                text: i18n("Close"),
                handler: this.onCloseClick,
                iconCls: "web-icon cancel",
                scope: this
            }, this.okButton
        ];
        this.on("show", function ()
        {
            this.quantityField.focus();
            this.quantityField.selectText(0);
        }, this, {
            delay: 100
        });
        this.callParent();
    },
    /**
     * Closes the window
     */
    onCloseClick: function ()
    {
        this.close();
    },
    /**
     * Checks if the form is valid. If yes, execute the callback.
     */
    onOKClick: function ()
    {
        if (this.form.getForm().isValid()) {
            var price;
            if (this.priceCheckbox.getValue()) {
                price = this.priceField.getValue();
            } else {
                price = this.priceField.getValue() / this.quantityField.getValue();
            }

            Ext.callback(this.callbackFn,
                this.callbackScope,
                [this.quantityField.getValue(), price, this.commentField.getValue()]);
            this.close();
        }
    },
    /**
     * Opens the window in "add stock" mode. The target callback receives three parameters: the value of the quantity
     * field, the value of the price field and the value of the comment field.
     *
     * @param fn
     *            The callback
     * @param scope
     *            The scope in which to execute the callback
     */
    addStock: function (fn, scope)
    {
        this.callbackFn = fn;
        this.callbackScope = scope;
        this.setTitle(this.addPartText);
        this.okButton.setIconCls("web-icon brick_add");
        this.show();
    },
    /**
     * Opens the window in "remove stock" mode. The target callback receives one parameters: the value of the quantity
     * field
     *
     * @param fn
     *            The callback
     * @param scope
     *            The scope in which to execute the callback
     */
    removeStock: function (fn, scope)
    {
        this.callbackFn = fn;
        this.callbackScope = scope;
        this.setTitle(this.removePartText);
        this.priceField.hide();
        this.priceCheckbox.hide();
        this.setHeight(132);
        this.okButton.setIconCls("web-icon brick_delete");
        this.show();
    }
});

/**
 * Defines the part filter panel.
 *
 *
 */
Ext.define('PartKeepr.PartFilterPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PartFilterPanel',

    /**
     * Define a padding of 10px
     */
    bodyPadding: '10px',

    /**
     * The items are aligned in a wrappable column layout
     */
    layout: 'column',

    /**
     * Automatically scroll the container if the items exceed the container size.
     */
    autoScroll: true,

    /**
     * Fixed body background color style
     */
    bodyStyle: 'background:#DBDBDB;',

    partManager: null,
    storageLocationFilter: null,
    storageLocationFilterCheckbox: null,
    storageLocationContainer: null,
    categoryFilter: null,
    stockFilter: null,
    partsWithoutPrice: null,
    distributorOrderNumberFilter: null,
    manufacturerPartNumberFilter: null,
    createDateField: null,
    createDateFilterSelect: null,
    createDateFilter: null,
    partsWithoutStockRemovals: null,
    needsReview: null,
    manufacturerFilterCheckbox: null,
    manufacturerFilterCombo: null,
    manufacturerFilter: null,
    distributorFilterCombo: null,
    distributorFilter: null,
    footprintFilterCheckbox: null,
    footprintFilterCombo: null,
    footprintFilter: null,
    statusFilter: null,
    conditionFilter: null,
    internalPartNumberFilter: null,
    commentFilter: null,

    /**
     * Initializes the component
     */
    initComponent: function ()
    {

        // Create the filter fields
        this.createFilterFields();

        // Creates the left column of the filter panel
        this.leftColumn = {
            xtype: 'container',
            anchor: '100%',
            layout: 'anchor',
            minWidth: 340,
            style: 'margin-right: 10px',
            columnWidth: 0.5,
            items: [
                this.storageLocationContainer,
                this.categoryFilter,
                this.partsWithoutPrice,
                this.createDateFilter,
                this.partsWithoutStockRemovals,
                this.needsReview
            ]
        };

        // Creates the right column of the filter panel
        this.rightColumn = {
            xtype: 'container',
            anchor: '100%',
            minWidth: 340,
            columnWidth: 0.5,
            layout: 'anchor',
            items: [
                this.stockFilter,
                this.distributorOrderNumberFilter,
                this.distributorFilter,
                this.manufacturerFilter,
                this.manufacturerPartNumberFilter,
                this.footprintFilter,
                this.statusFilter,
                this.conditionFilter,
                this.internalPartNumberFilter,
                this.commentFilter
            ]
        };

        // Apply both columns to this panel
        this.items = [this.leftColumn, this.rightColumn];

        // Create the reset button
        this.resetButton = Ext.create("Ext.button.Button", {
            text: i18n("Reset"),
            handler: this.onReset,
            iconCls: 'web-icon cancel',
            scope: this
        });

        // Create the apply button
        this.applyButton = Ext.create("Ext.button.Button", {
            text: i18n("Apply"),
            iconCls: 'web-icon accept',
            handler: this.onApply,
            scope: this
        });

        // Append both buttons to a toolbar
        this.dockedItems = [
            {
                xtype: 'toolbar',
                enableOverflow: true,
                dock: 'bottom',
                defaults: {minWidth: 100},
                items: [this.applyButton, this.resetButton]
            }
        ];

        this.callParent();
    },
    /**
     * Applies the parameters from the filter panel to the proxy, then
     * reload the store to refresh the grid.
     *
     * @param none
     * @return nothing
     */
    onApply: function ()
    {
        var filters = this.getFilters();

        this.store.clearFilter(true);

        if (filters.length !== 0) {
            this.store.addFilter(this.getFilters(), true);
        }

        this.store.load();
    },
    /**
     * Resets the fields to their original values, then call onApply()
     * to reload the store.
     */
    onReset: function ()
    {
        this.storageLocationFilter.setValue("");
        this.storageLocationFilterCheckbox.setValue(false);

        this.categoryFilter.setValue({category: 'all'});
        this.stockFilter.setValue({stock: 'any'});
        this.distributorOrderNumberFilter.setValue("");
        this.manufacturerPartNumberFilter.setValue("");

        this.createDateFilterSelect.setValue("");
        this.createDateField.setValue("");
        this.partsWithoutStockRemovals.setValue(false);
        this.needsReview.setValue(false);
        this.partsWithoutPrice.setValue(false);

        this.distributorFilterCombo.setValue("");
        this.distributorFilterCheckbox.setValue(false);

        this.manufacturerFilterCombo.setValue("");
        this.manufacturerFilterCheckbox.setValue(false);

        this.footprintFilterCombo.setValue("");
        this.footprintFilterCheckbox.setValue(false);

        this.statusFilter.setValue("");

        this.conditionFilter.setValue("");
        this.internalPartNumberFilter.setValue("");
        this.commentFilter.setValue("");

        this.onApply();
    },
    /**
     * Creates the filter fields required for this filter panel
     */
    createFilterFields: function ()
    {

        // Create the storage location filter field
        this.storageLocationFilter = Ext.create("PartKeepr.StorageLocationComboBox", {
            flex: 1,
            forceSelection: true,
            listeners: {
                select: function ()
                {
                    this.storageLocationFilterCheckbox.setValue(true);
                },
                scope: this
            }
        });

        this.storageLocationFilterCheckbox = Ext.create("Ext.form.field.Checkbox", {
            width: "20px",
            listeners: {
                change: function (obj, value)
                {

                    if (!value) {
                        this.storageLocationFilter.setValue("");
                    }
                },
                scope: this
            }
        });

        this.storageLocationContainer = Ext.create("Ext.form.FieldContainer", {
            layout: 'hbox',
            items: [this.storageLocationFilterCheckbox, this.storageLocationFilter],
            anchor: '100%',
            minWidth: 300,
            fieldLabel: i18n("Storage Location")
        });

        if (this.partManager !== null) {
            // Create the category scope field
            this.categoryFilter = Ext.create("Ext.form.RadioGroup", {
                fieldLabel: i18n("Category Scope"),
                columns: 1,
                items: [
                    {
                        boxLabel: i18n("All Subcategories"),
                        name: 'category',
                        inputValue: "all",
                        checked: true
                    },
                    {
                        boxLabel: i18n("Selected Category"),
                        name: 'category',
                        inputValue: "selected"
                    }
                ]
            });
        }

        // Create the stock level filter field
        this.stockFilter = Ext.create("Ext.form.RadioGroup", {
            fieldLabel: i18n("Stock Mode"),
            columns: 1,
            items: [
                {
                    boxLabel: i18n("Any Stock Level"),
                    name: 'stock',
                    inputValue: "any",
                    checked: true
                }, {
                    boxLabel: i18n("Stock Level = 0"),
                    name: 'stock',
                    inputValue: "zero"
                }, {
                    boxLabel: i18n("Stock Level > 0"),
                    name: 'stock',
                    inputValue: "nonzero"
                }, {
                    boxLabel: i18n("Stock Level < Minimum Stock Level"),
                    name: 'stock',
                    inputValue: "below"
                }
            ]
        });

        this.partsWithoutPrice = Ext.create("Ext.form.field.Checkbox", {
            fieldLabel: i18n("Item Price"),
            boxLabel: i18n("Show Parts without Price only")
        });

        this.distributorOrderNumberFilter = Ext.create("Ext.form.field.Text", {
            fieldLabel: i18n("Order Number"),
            anchor: '100%'
        });

        this.manufacturerPartNumberFilter = Ext.create("Ext.form.field.Text", {
            fieldLabel: i18n("Manufacturer Part Number"),
            anchor: '100%'
        });

        this.createDateField = Ext.create("Ext.form.field.Date", {
            flex: 1
        });

        var filter = Ext.create('Ext.data.Store', {
            fields: ['type', 'name'],
            data: [
                {"type": "<", "name": "before"},
                {"type": ">", "name": "after"},
                {"type": "", "name": "- none -"}
            ]
        });

        this.createDateFilterSelect = Ext.create('Ext.form.ComboBox', {
            store: filter,
            queryMode: 'local',
            forceSelection: true,
            editable: false,
            width: 60,
            value: '',
            triggerAction: 'all',
            displayField: 'name',
            valueField: 'type'
        });

        this.createDateFilter = {
            xtype: 'fieldcontainer',
            anchor: '100%',
            fieldLabel: i18n("Create date"),
            layout: 'hbox',
            border: false,
            items: [this.createDateFilterSelect, this.createDateField]
        };

        this.partsWithoutStockRemovals = Ext.create("Ext.form.field.Checkbox", {
            fieldLabel: i18n("Stock Settings"),
            boxLabel: i18n("Show Parts without stock removals only")
        });

        this.needsReview = Ext.create("Ext.form.field.Checkbox", {
            fieldLabel: i18n("Needs Review"),
            boxLabel: i18n("Show Parts that need to reviewed only")
        });

        this.manufacturerFilterCheckbox = Ext.create("Ext.form.field.Checkbox", {
            width: "20px",
            listeners: {
                change: function (obj, value)
                {

                    if (!value) {
                        this.manufacturerFilterCombo.setValue("");
                    }
                },
                scope: this
            }
        });

        this.manufacturerFilterCombo = Ext.create("PartKeepr.ManufacturerComboBox", {
            flex: 1,
            listeners: {
                select: function ()
                {
                    this.manufacturerFilterCheckbox.setValue(true);
                },
                scope: this
            }
        });

        this.manufacturerFilter = Ext.create("Ext.form.FieldContainer", {
            layout: 'hbox',
            items: [this.manufacturerFilterCheckbox, this.manufacturerFilterCombo],
            fieldLabel: i18n("Manufacturer")
        });

        this.distributorFilterCheckbox = Ext.create("Ext.form.field.Checkbox", {
            width: "20px",
            listeners: {
                change: function (obj, value)
                {
                    if (!value) {
                        this.distributorFilterCombo.setValue("");
                    }
                },
                scope: this
            }
        });

        this.distributorFilterCombo = Ext.create("PartKeepr.DistributorComboBox", {
            flex: 1,
            listeners: {
                select: function ()
                {
                    this.distributorFilterCheckbox.setValue(true);
                },
                scope: this
            }
        });

        this.distributorFilter = Ext.create("Ext.form.FieldContainer", {
            layout: 'hbox',
            items: [this.distributorFilterCheckbox, this.distributorFilterCombo],
            fieldLabel: i18n("Distributor")
        });

        this.footprintFilterCheckbox = Ext.create("Ext.form.field.Checkbox", {
            width: "20px",
            listeners: {
                change: function (obj, value)
                {
                    if (!value) {
                        this.footprintFilterCombo.setValue("");
                    }
                },
                scope: this
            }
        });

        this.footprintFilterCombo = Ext.create("PartKeepr.FootprintComboBox", {
            flex: 1,
            listeners: {
                select: function ()
                {
                    this.footprintFilterCheckbox.setValue(true);
                },
                scope: this
            }
        });

        this.footprintFilter = Ext.create("Ext.form.FieldContainer", {
            layout: 'hbox',
            items: [this.footprintFilterCheckbox, this.footprintFilterCombo],
            fieldLabel: i18n("Footprint")
        });

        /** **/

        this.statusFilter = Ext.create("Ext.form.field.Text", {
            fieldLabel: i18n("Status"),
            anchor: '100%'
        });

        this.conditionFilter = Ext.create("Ext.form.field.Text", {
            fieldLabel: i18n("Condition"),
            anchor: '100%'
        });

        this.internalPartNumberFilter = Ext.create("Ext.form.field.Text", {
            fieldLabel: i18n("Internal Part Number"),
            anchor: '100%'
        });

        this.commentFilter = Ext.create("Ext.form.field.Text", {
            fieldLabel: i18n("Comment"),
            anchor: '100%'
        });

    },
    /**
     * Applies the filter parameters to the passed extraParams object.
     * @param extraParams An object containing the extraParams from a proxy.
     */
    getFilters: function ()
    {
        var filters = [];

        if (this.storageLocationFilterCheckbox.getValue() === true) {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'storageLocation',
                operator: "=",
                value: this.storageLocationFilter.getValue()
            }));
        }

        if (this.partManager !== null) {
            if (this.categoryFilter.getValue().category === "all") {
                if (this.partManager.getSelectedCategory() !== null) {
                    filters.push(Ext.create("Ext.util.Filter", {
                        id: 'categoryFilter',
                        property: 'category',
                        operator: 'IN',
                        value: this.partManager.getChildrenIds(this.partManager.getSelectedCategory())
                    }));
                }
            } else {
                filters.push(Ext.create("Ext.util.Filter", {
                    id: 'categoryFilter',
                    property: 'category',
                    operator: '=',
                    value: this.partManager.getSelectedCategory()
                }));
            }
        }

        if (this.partsWithoutPrice.getValue() === true) {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'averagePrice',
                operator: '=',
                value: 0
            }));
        }

        if (this.createDateFilterSelect.getValue() !== "") {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'createDate',
                operator: this.createDateFilterSelect.getValue(),
                value: this.createDateField.getValue()
            }));
        }

        if (this.partsWithoutStockRemovals.getValue() === true) {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'removals',
                operator: "=",
                value: false
            }));
        }

        if (this.needsReview.getValue() === true) {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'needsReview',
                operator: "=",
                value: true
            }));
        }


        if (this.stockFilter.getValue().stock !== "any") {
            switch (this.stockFilter.getValue().stock) {
                case "zero":
                    filters.push(Ext.create("Ext.util.Filter", {
                        property: 'stockLevel',
                        operator: "=",
                        value: 0
                    }));
                    break;
                case "nonzero":
                    filters.push(Ext.create("Ext.util.Filter", {
                        property: 'stockLevel',
                        operator: ">",
                        value: 0
                    }));
                    break;
                case "below":
                    filters.push(Ext.create("Ext.util.Filter", {
                        property: 'lowStock',
                        operator: "=",
                        value: true
                    }));
                    break;
            }
        }

        if (this.distributorOrderNumberFilter.getValue() !== "") {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'distributors.orderNumber',
                operator: "LIKE",
                value: "%" + this.distributorOrderNumberFilter.getValue() + "%"
            }));
        }

        if (this.manufacturerPartNumberFilter.getValue() !== "") {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'manufacturers.partNumber',
                operator: "LIKE",
                value: "%" + this.manufacturerPartNumberFilter.getValue() + "%"
            }));
        }

        if (this.distributorFilterCheckbox.getValue() === true) {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'distributors.distributor',
                operator: "=",
                value: this.distributorFilterCombo.getValue()
            }));
        }

        if (this.manufacturerFilterCheckbox.getValue() === true) {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'manufacturers.manufacturer',
                operator: "=",
                value: this.manufacturerFilterCombo.getValue()
            }));
        }

        if (this.footprintFilterCheckbox.getValue() === true) {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'footprint',
                operator: "=",
                value: this.footprintFilterCombo.getValue()
            }));
        }

        if (this.statusFilter.getValue() !== "") {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'status',
                operator: "LIKE",
                value: "%" + this.statusFilter.getValue() + "%"
            }));
        }

        if (this.conditionFilter.getValue() !== "") {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'condition',
                operator: "LIKE",
                value: "%" + this.conditionFilter.getValue() + "%"
            }));
        }

        if (this.internalPartNumberFilter.getValue() !== "") {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'internalPartNumber',
                operator: "LIKE",
                value: "%" + this.internalPartNumberFilter.getValue() + "%"
            }));
        }

        if (this.commentFilter.getValue() !== "") {
            filters.push(Ext.create("Ext.util.Filter", {
                property: 'comment',
                operator: "LIKE",
                value: "%" + this.commentFilter.getValue() + "%"
            }));
        }
        return filters;
    }
});

Ext.define('PartKeepr.MenuBar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: "widget.MenuBar",
    menu: {
        text: "Root",
        menu: []
    },

    createMenu: function (target, menuPath, root) {
        var item = menuPath.shift();

        if (item === undefined) {
            var newItem = { text: target.title, iconCls: target.iconCls, target: target };

            root.menu.push(newItem);
            return root;
        }

        var foundItem = false;

        for (var i=0;i<root.menu.length;i++) {
                if (root.menu[i].text == item.text) {
                    Ext.applyIf(root.menu[i], item);
                    foundItem = i;
                }
        }

        if (foundItem === false) {
            var newItem = { menu: []};

            Ext.applyIf(newItem, item);

            var data = this.createMenu(target, menuPath, newItem);
            root.menu.push(data);
        } else {
            this.createMenu(target, menuPath, root.menu[foundItem]);

        }

        return root;
    },
    initComponent: function ()
    {
        var target, menus, menuItemIterator, menuPathIterator;

        this.ui = "mainmenu";

        var menuItems = [
            // System Menu
            "PartKeepr.UserPreferencePanel",
            "PartKeepr.Actions.LogoutAction",

            // Edit Menu
            "PartKeepr.ProjectEditorComponent",
            "PartKeepr.FootprintEditorComponent",
            "PartKeepr.ManufacturerEditorComponent",
            "PartKeepr.StorageLocationEditorComponent",
            "PartKeepr.DistributorEditorComponent",
            "PartKeepr.UserEditorComponent",
            "PartKeepr.PartMeasurementUnitEditorComponent",
            "PartKeepr.UnitEditorComponent",

            // View Menu
            "PartKeepr.SummaryStatisticsPanel",
            "PartKeepr.StatisticsChartPanel",
            "PartKeepr.SystemInformationGrid",
            "PartKeepr.ProjectReportView",
            "PartKeepr.SystemNoticeEditorComponent",
            "PartKeepr.StockHistoryGrid"
        ];


        for (menuItemIterator=0;menuItemIterator < menuItems.length;menuItemIterator++) {
            target = Ext.ClassManager.get(menuItems[menuItemIterator]);

            if (!target) {
                console.log("Error: "+menuItems[menuItemIterator] + " not found!");
            }

            if (!target.menuPath) {
                console.log("Error: "+menuItems[menuItemIterator] + " has no menuPath defined!");
            }
            this.createMenu(target, target.menuPath, this.menu);
        }

        this.items = this.menu.menu;

        this.callParent();
    }
});

/**
 * Defines an abstract grid which includes the grid menu plugin. 
 * 
 */
Ext.define('PartKeepr.BaseGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.BaseGrid',

	/**
	 * Initializes the component
	 */
	initComponent: function () {
		
		/**
		 * Check if the plugins already exist (e.g. by a superclass). If yes, assume it is an array, and append
		 * the plugin to it.
		 */
		if (this.plugins) {
			this.plugins.push('gridmenu');
		} else {
			this.plugins = [ 'gridmenu' ];
		}
		
		this.callParent();
	}
});
Ext.define('PartKeepr.PartParameterGrid', {
	extend: 'PartKeepr.BaseGrid',
	alias: 'widget.PartParameterGrid',
	border: false,
	initComponent: function () {
		this.store = Ext.create("Ext.data.Store", {
			model: 'PartKeepr.PartBundle.Entity.PartParameter',
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			}			
		});
		
		this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
            	scope: this,
            	beforeedit: this.onBeforeEdit,
            	edit: this.onAfterEdit
            }
        });
		
		this.plugins =  [ this.editing ];
		
		this.deleteButton = Ext.create("Ext.button.Button", {
                text: i18n('Delete'),
                disabled: true,
                itemId: 'delete',
                scope: this,
                iconCls: 'fugue-icon table--minus',
                handler: this.onDeleteClick
            });
		
		this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text: i18n('Add'),
                scope: this,
                iconCls: 'fugue-icon table--plus',
                handler: this.onAddClick
            }, this.deleteButton]
        }];
		
		this.columns = [
		                {
		                	header: i18n("Parameter"),
		                	dataIndex: 'name',
		                	flex: 0.2,
		                	editor: {
		                        xtype:'PartParameterComboBox',
		                        allowBlank:false,
		                        lazyRender: true,
		                        listClass: 'x-combo-list-small',
		                        selectOnTab: true
		                    }
		                },
		                {
		                	header: i18n("Value"),
		                	flex: 0.2,
		                	dataIndex: "prefixedValue",
		                	renderer: function (val,p,rec) {
		                		if (!Ext.isObject(val)) { return ""; }
		                		
								var unitStore = PartKeepr.getApplication().getUnitStore();
								var foundRec = unitStore.findRecord("id", rec.get("unit_id"), 0, false, false, true);
		                		
		                		if (foundRec) {
		                			return val.value + " "+val.symbol + foundRec.get("symbol");
		                		} else {
		                			return val.value + " "+val.symbol;
		                		}
		                		
		                	},
		                	editor: {
		                		xtype: 'SiUnitField',
		                		decimalPrecision: 20
		                	}
		                },
		                {
		                	header: i18n("Unit"),
		                	flex: 0.2,
		                	dataIndex: 'unit_id',
		                	renderer: function (val,p,rec) {
		                		var unitStore = PartKeepr.getApplication().getUnitStore();
		                		var foundRec = unitStore.findRecord("id", val, 0, false, false, true);
		                		
		                		if (foundRec) {
		                			return foundRec.get("name");
		                		} else {
		                			return "";
		                		}
		                	},
		                	editor: {
		                        xtype:'UnitComboBox',
		                        allowBlank:true
		                    }
		                },
		                { 	
		                	header: i18n("Description"),
		                	dataIndex: 'description',
		                	flex: 0.3,
		                	editor: {
		                        xtype:'textfield',
		                        allowBlank:true
		                    }
		                }
		                ];
		
		this.callParent();
		
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onAddClick: function () {
		this.editing.cancelEdit();
		
		var rec = new PartKeepr.PartBundle.Entity.PartParameter({
			
		});
		
		this.store.insert(0, rec);
		
		this.editing.startEditByPosition({ row: 0, column: 0});
	},
	onDeleteClick: function () {
		var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
	},
	onSelectChange: function(selModel, selections){
        this.deleteButton.setDisabled(selections.length === 0);
    },
    onBeforeEdit: function (editor, e, o) {
    	var header = this.headerCt.getHeaderAtIndex(e.colIdx);
    	var edit = this.editing.getEditor(editor.record, header);
    	
    	if (e.field == "prefixedValue") {
    		var unit = PartKeepr.getApplication().getUnitStore().getById(e.record.get("unit_id"));
    		if (unit) {
    			edit.field.setStore(unit.prefixes());
    		}
    	}
    },
    onAfterEdit: function (editor, e) {
    	var f = e.record.get("prefixedValue");
    	e.record.set("siprefix_id", f.siprefix_id);
    	e.record.set("value", f.value);
    }
});

Ext.define('PartKeepr.PartDistributorGrid', {
    extend: 'PartKeepr.BaseGrid',
    alias: 'widget.PartDistributorGrid',
    border: false,
    initComponent: function ()
    {
        this.store = Ext.create("Ext.data.Store", {
            model: 'PartKeepr.PartBundle.Entity.PartDistributor',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }

        });

        this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        this.plugins = [this.editing];

        this.deleteButton = Ext.create("Ext.button.Button", {
            text: 'Delete',
            disabled: true,
            itemId: 'delete',
            scope: this,
            iconCls: 'web-icon lorry_delete',
            handler: this.onDeleteClick
        });

        this.dockedItems = [
            {
                xtype: 'toolbar',
                items: [
                    {
                        text: 'Add',
                        scope: this,
                        iconCls: 'web-icon lorry_add',
                        handler: this.onAddClick
                    }, this.deleteButton
                ]
            }
        ];

        this.columns = [
            {
                header: i18n("Distributor"),
                dataIndex: 'distributor',
                renderer: function (val, p, rec)
                {
                    if (rec.getDistributor() !== null) {
                        return rec.getDistributor().get("name");
                    } else {
                        return null;
                    }
                },
                flex: 1,
                editor: {
                    xtype: 'DistributorComboBox',
                    returnObject: true,
                    allowBlank: true
                }
            }, {
                header: i18n("Order Number"),
                dataIndex: 'orderNumber',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    allowBlank: true
                }
            }, {
                header: i18n("Packaging Unit"),
                dataIndex: 'packagingUnit',
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    allowDecimals: false,
                    allowBlank: false,
                    minValue: 1
                }
            }, {
                header: i18n("Price per Item"),
                dataIndex: 'price',
                flex: 1,
                renderer: function (val, p, rec)
                {
                    return PartKeepr.getApplication().formatCurrency(val);
                },
                editor: {
                    xtype: 'CurrencyField',
                    allowBlank: false
                }
            }, {
                header: i18n("Package Price"),
                flex: 1,
                dataIndex: 'packagePrice',
                renderer: function (val, p, rec)
                {
                    return PartKeepr.getApplication().formatCurrency(rec.get("price") * rec.get("packagingUnit"));
                }
            }, {
                header: i18n("SKU"),
                dataIndex: 'sku',
                flex: 1,
                editor: {
                    xtype: 'urltextfield',
                    allowBlank: true,
                    triggerCls: 'x-form-trigger-link',

                    getUrl: function ()
                    {
                        var distributor = this.ownerCt.context.record.getDistributor();

                        if (distributor !== null) {
                            skuurl = distributor.get("skuurl");

                            if (skuurl) {
                                skuurl = skuurl.replace("%s", this.value);
                                return skuurl;
                            }
                        }

                        return false;
                    },
                }
            }
        ];

        this.callParent();

        this.getSelectionModel().on('selectionchange',
            this.onSelectChange,
            this);
    },
    onAddClick: function ()
    {
        this.editing.cancelEdit();

        var rec = Ext.create("PartKeepr.PartBundle.Entity.PartDistributor", {
            packagingUnit: 1
        });

        this.store.insert(0, rec);

        this.editing.startEdit(0, 0);
    },
    onDeleteClick: function ()
    {
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },
    onSelectChange: function (selModel, selections)
    {
        this.deleteButton.setDisabled(selections.length === 0);
    }
});

Ext.define('PartKeepr.PartManufacturerGrid', {
    extend: 'PartKeepr.BaseGrid',
    alias: 'widget.PartManufacturerGrid',
    border: false,
    initComponent: function ()
    {
        this.store = Ext.create("Ext.data.Store", {
            model: 'PartKeepr.PartBundle.Entity.PartManufacturer',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }

        });

        this.editing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1
        });

        this.plugins = [this.editing];

        this.deleteButton = Ext.create("Ext.button.Button", {
            text: 'Delete',
            disabled: true,
            itemId: 'delete',
            scope: this,
            iconCls: 'web-icon building_delete',
            handler: this.onDeleteClick
        });

        this.dockedItems = [
            {
                xtype: 'toolbar',
                items: [
                    {
                        text: 'Add',
                        scope: this,
                        iconCls: 'web-icon building_add',
                        handler: this.onAddClick
                    }, this.deleteButton
                ]
            }
        ];

        this.columns = [
            {
                header: i18n("Manufacturer"),
                dataIndex: 'manufacturer',
                flex: 0.4,
                renderer: function (val, p, rec)
                {
                    if (rec.getManufacturer() !== null) {
                        return rec.getManufacturer().get("name");
                    } else {
                        return null;
                    }
                },
                editor: {
                    xtype: 'ManufacturerComboBox',
                    allowBlank: true,
                    returnObject: true
                }
            },
            {
                header: i18n("Part Number"),
                dataIndex: 'partNumber',
                flex: 0.4,
                editor: {
                    xtype: 'textfield',
                    allowBlank: true
                }
            }
        ];

        this.callParent();

        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        this.on("edit", this.onEdit, this);
    },
    onEdit: function (editor, data)
    {
        var id = data.record.get("manufacturer_id");

        var rec = PartKeepr.getApplication().getManufacturerStore().findRecord("id", id);

        if (rec) {
            data.record.set("manufacturer_name", rec.get("name"));
        }
    },
    onAddClick: function ()
    {
        this.editing.cancelEdit();

        var rec = Ext.create("PartKeepr.PartBundle.Entity.PartManufacturer");

        this.store.insert(0, rec);

        this.editing.startEdit(0, 0);
    },
    onDeleteClick: function ()
    {
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },
    onSelectChange: function (selModel, selections)
    {
        this.deleteButton.setDisabled(selections.length === 0);
    }
});

/**
 * Represents the stock history grid.
 */
Ext.define('PartKeepr.AbstractStockHistoryGrid', {
    extend: 'PartKeepr.BaseGrid',

    pageSize: 25,

    defineColumns: function () {
        this.columns = [
            {
                header: "",
                xtype: 'actioncolumn',
                renderer: function (val, p, rec) {
                    if (rec.get("stockLevel") < 0) {
                        return '<span title="' + i18n(
                                "Parts removed") + '" style="vertical-align: top;" class="web-icon brick_delete">ad</span>';
                    } else {
                        return '<span title="' + i18n(
                                "Parts added") + '" style="vertical-align: top;" class="web-icon brick_add"></span>';
                    }
                },
                width: 20
            },
            {header: i18n("Date"), dataIndex: 'dateTime', width: 120},
            {
                header: i18n("User"),
                flex: 1,
                minWidth: 80,
                renderer: function (val, p, rec) {
                    if (rec.getUser() !== null) {
                        return rec.getUser().get("username");
                    }
                },
                editor: {
                    xtype: 'UserComboBox'
                }
            },
            {
                header: i18n("Amount"), dataIndex: 'stockLevel', width: 50,
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false
                }
            },

            {
                header: i18n("Price"),
                editor: {
                    xtype: 'CurrencyField',
                    allowBlank: false
                },
                dataIndex: 'price',
                width: 60,
                renderer: function (val, p, rec) {
                    if (rec.get("dir") == "out") {
                        return "-";
                    } else {
                        return PartKeepr.getApplication().formatCurrency(val);
                    }
                }
            }, {
                header: i18n("Comment"),
                dataIndex: 'comment',
                renderer: Ext.util.Format.htmlEncode,
                width: 60,
                editor: {
                    xtype: 'textfield',
                    allowBlank: true
                }
            }
        ];
    },
    model: 'PartKeepr.StockBundle.Entity.StockEntry',
    /**
     * Initializes the stock history grid.
     */
    initComponent: function () {

        this.defineColumns();

        var config = {
            autoLoad: false,
            autoSync: true,
            remoteFilter: true,
            remoteSort: true,
            model: this.model,
            sorters: [
                {
                    property: 'dateTime',
                    direction: 'DESC'
                }
            ],
            pageSize: this.pageSize
        };

        this.store = Ext.create('Ext.data.Store', config);

        this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        this.plugins = [this.editing];

        this.bottomToolbar = Ext.create("PartKeepr.PagingToolbar", {
            store: this.store,
            enableOverflow: true,
            dock: 'bottom',
            displayInfo: false,
            grid: this
        });


        this.dockedItems = [];
        this.dockedItems.push(this.bottomToolbar);

        this.editing.on("beforeedit", this.onBeforeEdit, this);

        this.callParent();
    },
    /**
     * Called before editing a cell. Checks if the user may actually make the requested changes.
     *
     * @param e Passed from ExtJS
     * @returns {Boolean}
     */
    onBeforeEdit: function (editor, context, eOpts) {
        var sameUser = false;

        // Checks if the usernames match
        if (context.record.getUser() !== null) {
            sameUser = context.record.getUser().getId() == PartKeepr.getApplication().getLoginManager().getUser().getId();
        }

        switch (context.field) {
            case "price":
                // Check the direction is "out". If yes, editing the price field is not allowed
                if (context.record.get("direction") == "out") {
                    return false;
                }

                // If it's not the same user or an admin, editing is not allowed
                if (!sameUser && !PartKeepr.getApplication().isAdmin()) {
                    return false;
                }
                break;
            case "stockLevel":
                // Only an admin may edit the amount. Regular users must put the stock back in manually.
                if (!PartKeepr.getApplication().isAdmin()) {
                    return false;
                }
                break;
            case "user":
                if (!PartKeepr.getApplication().isAdmin()) {
                    return false;
                }
                break;
            case "comment":
                if (!sameUser && !PartKeepr.getApplication().isAdmin()) {
                    return false;
                }
                break;
            default:
                return true;
        }

        return true;
    }
});

Ext.define('PartKeepr.PartStockHistory', {
    extend: 'PartKeepr.AbstractStockHistoryGrid',
    alias: 'widget.PartStockHistory',

    part: null,

    initComponent: function ()
    {
        this.callParent();

        this.on("activate", this.onActivate, this);
    },
    /**
     * Called when the view is activated.
     */
    onActivate: function ()
    {
        var filter = Ext.create("Ext.util.Filter", {
            property: 'part',
            operator: '=',
            value: this.part
        });

        this.store.clearFilter(true);
        this.store.addFilter(filter);
    }
});

/**
 * The stock history grid. It shows all stock transactions.
 */
Ext.define('PartKeepr.StockHistoryGrid', {
    extend: 'PartKeepr.AbstractStockHistoryGrid',
    alias: 'widget.PartStockHistoryGrid',

    pageSize: 25,

    defineColumns: function ()
    {
        this.callParent();

        this.columns.splice(2, 0, {
            header: i18n("Part"),
            renderer: function (val, q, rec) {
                return rec.getPart().get("name");
            },
            flex: 1,
            minWidth: 200
        });

        this.columns.splice(3, 0, {
            header: i18n("Storage Location"),
            renderer: function (val, q, rec) {
                return rec.getPart().getStorageLocation().get("name");
            },
            flex: 1,
            minWidth: 200
        });
    },
    initComponent: function ()
    {
        this.callParent();

        this.on("activate", this.onActivate, this);
    },
    /**
     * Called when the view is activated.
     */
    onActivate: function ()
    {
        this.store.load();
    },
    statics: {
        iconCls: 'fugue-icon notebook',
        title: i18n('Stock History'),
        closable: true,
        menuPath: [{text: i18n("View")}]
    }
});

Ext.define('PartKeepr.UserPreferenceGrid', {
    extend: 'PartKeepr.BaseGrid',

    columnLines: true,

    columns: [
        {
            header: i18n("Key"),
            dataIndex: 'preferenceKey',
            flex: 0.3,
            minWidth: 200,
            renderer: Ext.util.Format.htmlEncode
        }, {
            header: i18n("Value"),
            dataIndex: 'preferenceValue',
            flex: 0.7,
            minWidth: 200,
            renderer: Ext.util.Format.htmlEncode
        }
    ],
    userId: null,

    initComponent: function ()
    {
        this.deleteButton = Ext.create("Ext.button.Button", {
            text: i18n('Delete'),
            disabled: true,
            itemId: 'delete',
            scope: this,
            iconCls: 'web-icon delete',
            handler: this.onDeleteClick
        });

        this.dockedItems = [
            {
                xtype: 'toolbar',
                items: [
                    this.deleteButton
                ]
            }
        ];
        this.store = Ext.create("Ext.data.Store", {
            model: 'PartKeepr.AuthBundle.Entity.UserPreference',
            remoteFilter: true,
            pageSize: 999999999
        });

        this.callParent();

        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    onDeleteClick: function ()
    {
        var selection = this.getView().getSelectionModel().getSelection()[0];

        if (selection) {
            selection.getProxy().callCollectionAction(null, "DELETE", {
                "preferenceKey": selection.get("preferenceKey")
            }, Ext.bind(this.onPreferenceDeleted, this));
        }
    },
    onPreferenceDeleted: function ()
    {
        this.store.load();
    },
    onSelectChange: function (selModel, selections)
    {
        this.deleteButton.setDisabled(selections.length === 0);
    }
});

Ext.define('PartKeepr.AttachmentGrid', {
    extend: 'PartKeepr.BaseGrid',
    alias: 'widget.AttachmentGrid',
    border: false,
    model: null,
    initComponent: function ()
    {
        this.store = Ext.create("Ext.data.Store", {
            model: this.model,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }

        });

        this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        this.plugins = [this.editing];

        this.deleteButton = Ext.create("Ext.button.Button", {
            text: i18n('Delete'),
            disabled: true,
            itemId: 'delete',
            scope: this,
            iconCls: 'web-icon delete',
            handler: this.onDeleteClick
        });

        this.viewButton = Ext.create("Ext.button.Button", {
            text: i18n("View"),
            handler: this.onViewClick,
            scope: this,
            iconCls: 'web-icon zoom',
            disabled: true
        });

        this.webcamButton = Ext.create("Ext.button.Button", {
            text: i18n("Take image"),
            handler: this.onWebcamClick,
            scope: this,
            iconCls: 'fugue-icon webcam'
        });

        this.dockedItems = [
            {
                xtype: 'toolbar',
                items: [
                    {
                        text: i18n('Add'),
                        scope: this,
                        iconCls: 'web-icon attach',
                        handler: this.onAddClick
                    },
                    this.webcamButton,
                    this.viewButton,
                    this.deleteButton
                ]
            }
        ];

        this.columns = [
            {
                dataIndex: 'extension',
                width: 30,
                renderer: function (value, metadata, record)
                {
                    return '<img src="' + record.getId() + '/getMimeTypeIcon"/>';
                }
            },
            {
                header: i18n("Filename"),
                dataIndex: 'originalFilename',
                width: 200
            },
            {
                header: i18n("Size"),
                dataIndex: 'size',
                width: 80,
                renderer: PartKeepr.bytesToSize
            },
            {
                header: i18n("Description"),
                dataIndex: 'description',
                flex: 0.4,
                editor: {
                    xtype: 'textfield',
                    allowBlank: true
                }
            }
        ];

        this.callParent();

        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        this.on("itemdblclick", this.onDoubleClick, this);
    },
    onWebcamClick: function ()
    {
        if (Ext.isIE) {
            Ext.MessageBox.alert(i18n("Webcam not supported"),
                i18n("Internet Explorer does not support HTML5 webcams"));
            return;
        }

        var wp = Ext.create("PartKeepr.WebcamPanel");
        wp.on("fileUploaded", this.onFileUploaded, this);

        var j = Ext.create("Ext.window.Window", {
            title: i18n("Take Webcam Photo"),
            layout: 'fit',
            items: [
                wp
            ]
        });

        wp.on("fileUploaded", function ()
        {
            j.close();
        });

        j.show();
    },
    onDoubleClick: function (view, record)
    {
        if (record) {
            this.viewAttachment(record);
        }
    },
    onAddClick: function ()
    {
        var j = Ext.create("PartKeepr.FileUploadDialog");
        j.on("fileUploaded", this.onFileUploaded, this);
        j.show();
    },
    onFileUploaded: function (response)
    {
        this.editing.cancelEdit();

        this.store.add(response);

    },
    onDeleteClick: function ()
    {
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },
    onSelectChange: function (selModel, selections)
    {
        this.deleteButton.setDisabled(selections.length === 0);
        this.viewButton.setDisabled(selections.length === 0);
    },
    onViewClick: function ()
    {
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.viewAttachment(selection);
        }
    },
    viewAttachment: function (record)
    {
        var mySrc = record.getId() + "/getFile";

        new Ext.Window({
            title: i18n("Display File"),
            width: 640,
            height: 600,
            maximizable: true,
            constrain: true,
            layout: 'fit',
            items: [
                {
                    xtype: "component",
                    autoEl: {
                        tag: "iframe",
                        src: mySrc
                    }
                }
            ]
        }).show();
    }
});

Ext.define('PartKeepr.PartAttachmentGrid', {
	extend: 'PartKeepr.AttachmentGrid',
	alias: 'widget.PartAttachmentGrid',
	
	model: "PartKeepr.PartBundle.Entity.PartAttachment"
});
Ext.define('PartKeepr.FootprintAttachmentGrid', {
    extend: 'PartKeepr.AttachmentGrid',
    alias: 'widget.FootprintAttachmentGrid',

    model: "PartKeepr.FootprintBundle.Entity.FootprintAttachment"
});

Ext.define('PartKeepr.ProjectAttachmentGrid', {
    extend: 'PartKeepr.AttachmentGrid',
    alias: 'widget.ProjectAttachmentGrid',

    model: "PartKeepr.ProjectBundle.Entity.ProjectAttachment"
});

/**
 * This class extends a regular GridPanel with the following features:
 *
 * - Buttons to add/delete items
 * - Enable/Disable the delete button if an item is selected
 * - Search field
 * - Paging Toolbar
 */
Ext.define('PartKeepr.EditorGrid', {
    extend: 'PartKeepr.BaseGrid',
    alias: 'widget.EditorGrid',

    /**
     * @cfg {String} text The text for the "delete" button
     */
    deleteButtonText: i18n("Delete Item"),

    /**
     * @cfg {String} text The path to the 'delete' icon
     */
    deleteButtonIcon: '',

    /**
     * @cfg {String} text The CSS class for the 'delete' icon
     */
    deleteButtonIconCls: 'web-icon delete',

    /**
     * @cfg {String} text The text for the "add" button
     */
    addButtonText: i18n("Add Item"),

    /**
     * @cfg {String} text The path to the 'add' icon
     */
    addButtonIcon: '',

    /**
     * @cfg {String} text The CSS class for the 'add' icon
     */
    addButtonIconCls: 'web-icon add',

    /**
     * @cfg {Boolean} boolean Specifies whether to enable the top toolbar or not
     */
    enableTopToolbar: true,

    /**
     * @cfg {String} text Defines if the "add"/"delete" buttons should show their text or icon only. If "hide", the
     * button text is hidden, anything else shows the text.
     */
    buttonTextMode: 'hide',

    /**
     * @cfg {Boolean} boolean Defines if the grid should automatically calculate it's page size
     */
    automaticPageSize: false,

    /**
     * @cfg {Integer} integer Defines the row height with which the calculator should assume
     */
    automaticPageSizeRowHeight: 21,

    /**
     * @cfg {Boolean} boolean Defines if the list should be read-only, or if the list can be edited. Defaults to true.
     */
    enableEditing: true,

    /**
     * @cfg {Boolean} boolean Defines if the edit event should pass the object (true) or as id (false)
     */
    editItemAsObject: false,

    /**
     * @cfg {String} The title property
     */
    titleProperty: null,

    listeners: {
        'reconfigure': 'onReconfigure'
    },

    /**
     * @event itemSelect
     * Fires if a record was selected within the grid.
     * @param {Object} record The selected record
     */
    initComponent: function ()
    {

        /**
         * @event itemDeselect
         * Fires if a record was deselected within the grid.
         * @param {Object} record The deselected record
         */

        /**
         * @event itemEdit
         * Fires if a record should be edited.
         * @param {Object} record The record to edit
         */

        /**
         * @event itemDelete
         * Fires if the delete button was clicked.
         */

        /**
         * @event itemAdd
         * Fires if the add button was clicked.
         */

        this.on("itemclick", this._onItemEdit, this);

        this.deleteButton = Ext.create("Ext.button.Button", {
            text: (this.buttonTextMode !== "hide") ? this.deleteButtonText : '',
            tooltip: this.deleteButtonText,
            icon: this.deleteButtonIcon,
            iconCls: this.deleteButtonIconCls,
            handler: Ext.bind(function ()
            {
                this.fireEvent("itemDelete");
            }, this),
            disabled: true
        });

        this.addButton = Ext.create("Ext.button.Button", {
            text: (this.buttonTextMode !== "hide") ? this.addButtonText : '',
            tooltip: this.addButtonText,
            icon: this.addButtonIcon,
            iconCls: this.addButtonIconCls,
            handler: Ext.bind(function ()
            {
                this.fireEvent("itemAdd");
            }, this)
        });

        this.searchField = Ext.create("PartKeepr.form.field.SearchField", {
            store: this.store,
            targetField: this.titleProperty
        });

        var topToolbarItems = [];

        if (this.enableEditing) {
            topToolbarItems.push(this.addButton);
            topToolbarItems.push(this.deleteButton);
        }

        topToolbarItems.push({xtype: 'tbfill'});
        topToolbarItems.push(this.searchField);

        this.topToolbar = Ext.create("Ext.toolbar.Toolbar", {
            dock: 'top',
            enableOverflow: true,
            items: topToolbarItems
        });

        this.bottomToolbar = Ext.create("PartKeepr.PagingToolbar", {
            store: this.store,
            enableOverflow: true,
            dock: 'bottom',
            displayInfo: false,
            grid: this
        });

        this.dockedItems = new Array();

        this.dockedItems.push(this.bottomToolbar);

        if (this.enableTopToolbar) {
            this.dockedItems.push(this.topToolbar);
        }

        if (!Ext.isArray(this.plugins)) {
            this.plugins = [];
        }

        this.plugins.push('gridmenu');

        this.callParent();

        this.getSelectionModel().on("select", this._onItemSelect, this);
        this.getSelectionModel().on("deselect", this._onItemDeselect, this);
        this.getView().on("itemkeydown", this._onItemKeyPress, this);

        if (this.automaticPageSize) {
            this.on("resize", this.reassignPageSize, this);
        }
    },
    /**
     * Re-calculates and re-assigns the page size for the assigned store.
     *
     * Automatically reloads the store.
     *
     * @param none
     * @return nothing
     */
    reassignPageSize: function ()
    {
        if (this.store.isLoading()) {
            return;
        }
        if (this.getView().getHeight() === 0) {
            return;
        }

        var numRecords = Math.floor(this.getView().getHeight() / this.automaticPageSizeRowHeight);

        if (numRecords < 1) {
            numRecords = 1;
        }

        var oldStartIndex = this.store.pageSize * this.store.currentPage;

        this.store.pageSize = numRecords;

        var newStartPage = Math.floor(oldStartIndex / numRecords);

        if (newStartPage < 1) {
            newStartPage = 1;
        }

        this.store.loadPage(newStartPage);
    },
    onReconfigure: function (me, store)
    {
        this.searchField.setStore(store);
        this.bottomToolbar.setStore(store);

    },
    syncChanges: function (record)
    {
        // Simply reload the store for now
        this.store.load();
    },
    /**
     * Called when an item was selected. Enables/disables the delete button.
     */
    _updateDeleteButton: function (selectionModel, record)
    {
        /* Right now, we support delete on a single record only */
        if (this.getSelectionModel().getCount() == 1) {
            this.deleteButton.enable();
        } else {
            this.deleteButton.disable();
        }
    },
    _onItemKeyPress: function (view, record, item, index, e) {
        if (e.getKey() == e.ENTER || e.getKey() == e.TAB) {
            this._onItemEdit(view, record);
        }
    },
    /**
     * Called when an item should be edited
     */
    _onItemEdit: function (view, record)
    {
        if (this.editItemAsObject) {
            this.fireEvent("itemEdit", record);
        } else {
            this.fireEvent("itemEdit", record.getId());
        }
    },
    /**
     * Called when an item was selected
     */
    _onItemSelect: function (selectionModel, record)
    {
        this._updateDeleteButton(selectionModel, record);
        this.fireEvent("itemSelect", record);
    },
    /**
     * Called when an item was deselected
     */
    _onItemDeselect: function (selectionModel, record)
    {
        this._updateDeleteButton(selectionModel, record);
        this.fireEvent("itemDeselect", record);
    }
});

Ext.define('PartKeepr.DistributorGrid', {
    extend: 'PartKeepr.EditorGrid',
    alias: 'widget.DistributorGrid',
    columns: [
        {header: i18n("Distributor"), dataIndex: 'name', flex: 1}
    ],
    addButtonText: i18n("Add Distributor"),
    addButtonIconCls: 'web-icon lorry_add',
    deleteButtonText: i18n("Delete Distributor"),
    deleteButtonIconCls: 'web-icon lorry_delete',
    automaticPageSize: true
});

/**
 * This class is the main part list grid.
 *
 */
Ext.define('PartKeepr.PartsGrid', {
    extend: 'PartKeepr.EditorGrid',
    alias: 'widget.PartsGrid',

    /**
     * Display button texts by default
     */
    buttonTextMode: 'show',

    /**
     * @cfg {String} Defines the text of the "Add" button
     */
    addButtonText: i18n("Add Part"),

    /**
     * @cfg {String} Defines the icon of the "Add" button
     */
    addButtonIconCls: 'web-icon brick_add',

    /**
     * @cfg {String} Defines the text of the "Delete" button
     */
    deleteButtonText: i18n("Delete Part"),

    /**
     * @cfg {String} Defines the icon of the "Add" button
     */
    deleteButtonIconCls: 'web-icon brick_delete',

    /**
     * @cfg {String} Defines the icon of the "Expand Row" button
     */
    expandRowButtonIconCls: 'partkeepr-icon group-expand',

    /**
     * @cfg {String} Defines the icon of the "Collapse Row" button
     */
    collapseRowButtonIconCls: 'partkeepr-icon group-collapse',

    /**
     * Configure drag'n'drop.
     * @todo Check if this messes up with the Part Dropdown in the project view
     */
    viewConfig: {
        plugins: {
            ddGroup: 'CategoryTree',
            ptype: 'gridviewdragdrop',
            enableDrop: false
        }
    },
    enableDragDrop: true,
    stripeRows: true,
    multiSelect: true,
    autoScroll: false,
    invalidateScrollerOnRefresh: true,
    titleProperty: 'name',
    initComponent: function ()
    {

        this.groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            //enableGroupingMenu: false,
            groupHeaderTpl: '{name} ({rows.length} ' + i18n("Part(s)") + ")"
        });

        // Create the columns
        this.defineColumns();


        this.features = [this.groupingFeature];

        this.on("itemdblclick", this.onDoubleClick, this);

        // Bugfix for scroller becoming detached.
        // @todo Remove with ExtJS 4.1
        this.on('scrollershow', function (scroller)
        {
            if (scroller && scroller.scrollEl) {
                scroller.clearManagedListeners();
                scroller.mon(scroller.scrollEl, 'scroll', scroller.onElScroll, scroller);
            }
        });

        if (this.enableEditing) {
            this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            });

            this.editing.on("edit", this.onEdit, this);

            this.plugins = [this.editing];
        }

        // Initialize the panel
        this.callParent();

        this.bottomToolbar.add({
            xtype: 'button',
            tooltip: i18n("Expand all Groups"),
            iconCls: this.expandRowButtonIconCls,
            listeners: {
                scope: this.groupingFeature,
                click: this.groupingFeature.expandAll
            }

        });

        this.bottomToolbar.add({
            xtype: 'button',
            tooltip: i18n("Collapse all Groups"),
            iconCls: this.collapseRowButtonIconCls,
            listeners: {
                scope: this.groupingFeature,
                click: this.groupingFeature.collapseAll
            }
        });

        var duplicateBasicData = i18n(
            "Duplicates the selected part with the data found in the \"basic\" tab and opens the editor. Doesn't immediately saves the duplicate, in order to allow editing.");
        var duplicateAllData = i18n(
            "Duplicates the selected part with all data including attachments, distributors etc. Doesn't immediately saves the duplicate, in order to allow editing.");

        this.addFromTemplateButton = Ext.create("Ext.button.Split", {
            disabled: true,
            handler: Ext.bind(function ()
            {
                this.fireEvent("duplicateItemWithBasicData");
            }, this),
            tooltip: duplicateBasicData,
            text: i18n("Duplicate"),
            iconCls: 'web-icon brick_link',
            menu: new Ext.menu.Menu({
                items: [
                    {
                        text: i18n("Duplicate with all data"),
                        tooltip: duplicateAllData,
                        handler: function ()
                        {
                            this.fireEvent("duplicateItemWithAllData");
                        },
                        scope: this
                    }, {
                        text: i18n("Duplicate basic data only"),
                        tooltip: duplicateBasicData,
                        handler: function ()
                        {
                            this.fireEvent("duplicateItemWithBasicData");
                        },
                        scope: this
                    }
                ]
            })
        });

        if (this.enableEditing) {
            this.topToolbar.insert(2, this.addFromTemplateButton);
        }


        this.mapSearchHotkey();
    },
    /**
     * Maps a search hotkey to the search box.
     *
     * Right now, this is hardcoded to alt+x.
     *
     * @param none
     * @return nothing
     */
    mapSearchHotkey: function ()
    {
        this.searchKey = new Ext.util.KeyMap(Ext.get(document), {
            key: 'x',
            ctrl: false,
            alt: true,
            fn: function ()
            {
                var searchBox = this.searchField;
                if (Ext.get(document).activeElement != searchBox) {
                    searchBox.focus('', 10);
                }
                searchBox.setValue('');
            },
            scope: this,
            stopEvent: true
        });
    },
    /**
     * Called when an item was selected. Enables/disables the delete button.
     */
    _updateAddTemplateButton: function ()
    {
        /* Right now, we support delete on a single record only */
        if (this.getSelectionModel().getCount() == 1) {
            this.addFromTemplateButton.enable();
        } else {
            this.addFromTemplateButton.disable();
        }
    },
    /**
     * Called when an item was selected
     */
    _onItemSelect: function (selectionModel, record)
    {
        this._updateAddTemplateButton(selectionModel, record);
        this.callParent(arguments);
    },
    /**
     * Called when an item was deselected
     */
    _onItemDeselect: function (selectionModel, record)
    {
        this._updateAddTemplateButton(selectionModel, record);
        this.callParent(arguments);
    },
    /**
     * Called when the record was double-clicked
     */
    onDoubleClick: function (view, record)
    {
        if (record) {
            this.fireEvent("editPart", record);
        }
    },
    /**
     * Defines the columns used in this grid.
     */
    defineColumns: function ()
    {
        this.columns = [
            {
                header: '<span class="web-icon fugue-icon paper-clip"></span>',
                dataIndex: "",
                width: 30,
                tooltip: i18n("Has attachments?"),
                renderer: this.iconRenderer
            }, {
                text: '<span class="web-icon flag_orange"></span>',
                dataIndex: "needsReview",
                width: 30,
                tooltip: i18n("Needs Review?"),
                renderer: this.reviewRenderer
            }, {
                header: i18n("Name"),
                dataIndex: 'name',
                flex: 1,
                minWidth: 150,
                renderer: Ext.util.Format.htmlEncode
            }, {
                header: i18n("Description"),
                dataIndex: 'description',
                flex: 2,
                minWidth: 150,
                renderer: Ext.util.Format.htmlEncode
            }, {
                header: i18n("Storage Location"),
                dataIndex: 'storageLocation.name',
                renderer: this.storageLocationRenderer
            }, {
                header: i18n("Status"),
                dataIndex: "status",
                renderer: Ext.util.Format.htmlEncode
            }, {
                header: i18n("Condition"),
                dataIndex: "partCondition",
                renderer: Ext.util.Format.htmlEncode
            }, {
                header: i18n("Stock"),
                dataIndex: 'stockLevel',
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                },
                renderer: this.stockLevelRenderer
            }, {
                header: i18n("Min. Stock"),
                dataIndex: 'minStockLevel',
                renderer: this.stockLevelRenderer
            }, {
                header: i18n("Avg. Price"),
                dataIndex: 'averagePrice',
                align: 'right',
                renderer: this.averagePriceRenderer
            }, {
                header: i18n("Footprint"),
                dataIndex: 'footprint.name',
                renderer: this.footprintRenderer
            }, {
                header: i18n("Category"),
                renderer: this.categoryPathRenderer,
                hidden: true
            }, {
                header: i18n("Create Date"),
                dataIndex: 'createDate',
                hidden: true
            }

        ];
    },
    averagePriceRenderer: function (val)
    {
        return PartKeepr.getApplication().formatCurrency(val);
    },
    /**
     * Renders the storage location
     */
    storageLocationRenderer: function (val, q, rec)
    {
        if (rec.getStorageLocation() !== null) {
            return rec.getStorageLocation().get("name");
        }
    },
    /**
     * Renders the storage location
     */
    categoryPathRenderer: function (val, q, rec)
    {
        if (rec.getCategory() !== null) {
            return rec.getCategory().get("categoryPath");
        }
    },
    /**
     * Renders the storage location
     */
    footprintRenderer: function (val, q, rec)
    {
        if (rec.getFootprint()) {
            return rec.getFootprint().get("name");
        }
    },
    /**
     * Used as renderer for the stock level columns.
     *
     * If a part contains a non-default unit, we display it.
     * Otherwise we hide it.
     */
    stockLevelRenderer: function (val, q, rec)
    {
        if (rec.getPartUnit()) {
            return val + " " + rec.getPartUnit().get("shortName");
        } else {
            return val;
        }
    },
    /**
     * Used as renderer for the icon column.
     */
    iconRenderer: function (val, q, rec)
    {
        var ret = "";
        if (rec.attachments().getCount() > 0) {
            ret += '<span class="web-icon fugue-icon paper-clip" title="' + i18n("Has attachments") + '"/>';
        }

        return ret;
    },
    /**
     * Used as renderer for the review column.
     */
    reviewRenderer: function (val, q, rec)
    {
        var ret = "";
        if (rec.get("needsReview") === true) {
            ret += '<span class="web-icon flag_orange"' + '" title="' + i18n("Needs review") + '"></span>';
        }

        return ret;
    },
    /**
     * Sets the category. Triggers a store reload with a category filter.
     */
    setCategory: function (category)
    {
        var proxy = this.store.getProxy();

        proxy.extraParams.category = category;

        this.store.currentPage = 1;
        this.store.load({
            start: 0
        });
    },
    /**
     * Handles editing of the grid fields. Right now, only the stock level editing is supported.
     *
     * @param e An edit event, as documented in
     *            http://docs.sencha.com/ext-js/4-0/#!/api/Ext.grid.plugin.CellEditing-event-edit
     */
    onEdit: function (editor, e)
    {
        switch (e.field) {
            case "stockLevel":
                if (e.value !== e.originalValue.toString()) {
                    this.handleStockFieldEdit(e);
                }
                break;
            default:
                break;
        }
    },
    /**
     * Handles the editing of the stock level field. Checks if the user has opted in to skip the
     * online stock edit confirm window, and runs the changes afterwards.
     *
     * @param e An edit event, as documented in
     *            http://docs.sencha.com/ext-js/4-0/#!/api/Ext.grid.plugin.CellEditing-event-edit
     */
    handleStockFieldEdit: function (e)
    {
        if (PartKeepr.getApplication().getUserPreference("partkeepr.inline-stock-change.confirm") === false) {
            this.handleStockChange(e);
        } else {
            this.confirmStockChange(e);
        }
    },
    getStockChangeMode: function (value)
    {
        var n = value.indexOf("+");

        if (n !== -1) {
            return "addition";
        }

        n = value.indexOf("-");

        if (n !== -1) {
            return "removal";
        }

        return "fixed";
    },
    /**
     * Opens the confirm dialog
     *
     * @param e An edit event, as documented in
     *            http://docs.sencha.com/ext-js/4-0/#!/api/Ext.grid.plugin.CellEditing-event-edit
     */
    confirmStockChange: function (e)
    {
        var mode = this.getStockChangeMode(e.value);
        var value = Math.abs(parseInt(e.value));
        var confirmText = "";
        var headerText = "";

        switch (mode) {
            case "removal":
                confirmText = sprintf(
                    i18n("You wish to remove <b>%s %s</b> of the part <b>%s</b>. Is this correct?"),
                    value, e.record.getPartUnit().get("name"), e.record.get("name"));

                // Set the stock level to a temporary calculated value.
                e.record.set("stockLevel", (e.originalValue - value));
                headerText = i18n("Remove Part(s)");
                break;
            case "addition":
                confirmText = sprintf(
                    i18n("You wish to add  <b>%s %s</b> of part <b>%s</b>. Is this correct?"),
                    value, e.record.getPartUnit().get("name"), e.record.get("name"));

                e.record.set("stockLevel", (e.originalValue + value));
                headerText = i18n("Add Part(s)");
                break;
            case "fixed":
                confirmText = sprintf(
                    i18n("You wish to set the stock level to <b>%s %s</b> for part <b>%s</b>. Is this correct?"),
                    value, e.record.getPartUnit().get("name"), e.record.get("name"));

                e.record.set("stockLevel", value);
                headerText = i18n("Set Stock Level for Part(s)");
                break;
        }


        var j = Ext.create("PartKeepr.RememberChoiceMessageBox", {
            escButtonAction: "cancel",
            dontAskAgainProperty: "partkeepr.inline-stock-change.confirm",
            dontAskAgainValue: false
        });

        j.show({
            title: headerText,
            msg: confirmText,
            buttons: Ext.Msg.OKCANCEL,
            fn: this.afterConfirmStockChange,
            scope: this,
            originalOnEdit: e,
            dialog: j
        });
    },
    /**
     * Callback for the stock removal confirm window.
     *
     * The parameters are documented on:
     * http://docs.sencha.com/ext-js/4-0/#!/api/Ext.window.MessageBox-method-show
     */
    afterConfirmStockChange: function (buttonId, text, opts)
    {
        if (buttonId == "cancel") {
            opts.originalOnEdit.record.set("stockLevel", opts.originalOnEdit.originalValue);
            return;
        }

        this.handleStockChange(opts.originalOnEdit);
    },
    /**
     * Handles the stock change. Automatically figures out which method to call (deleteStock or addStock) and
     * sets the correct quantity.
     *
     * @param e An edit event, as documented in
     *            http://docs.sencha.com/ext-js/4-0/#!/api/Ext.grid.plugin.CellEditing-event-edit
     */
    handleStockChange: function (e)
    {
        var mode = this.getStockChangeMode(e.value);
        var value = Math.abs(parseInt(e.value));
        var call;

        if (e.value === 0) {
            return;
        }

        switch (mode) {
            case "removal":
                call = "removeStock";
                break;
            case "addition":
                call = "addStock";
                break;
            case "fixed":
                call = "setStock";
                break;
            default:
                return;
        }

        e.record.callPutAction(call, {
            quantity: value
        }, Ext.bind(this.reloadPart, this, [e]));
    },
    /**
     * Reloads the current part
     */
    reloadPart: function (opts)
    {
        this.loadPart(opts.record.getId(), opts);
    },
    /**
     * Load the part from the database.
     */
    loadPart: function (id)
    {
        PartKeepr.PartBundle.Entity.Part.load(id, {
            scope: this,
            success: this.onPartLoaded
        });
    },
    /**
     * Callback after the part is loaded
     */
    onPartLoaded: function (record)
    {
        var rec = this.store.findRecord("id", record.getId());
        if (rec) {
            rec.set("stockLevel", record.get("stockLevel"));
        }
    }
});

Ext.define('PartKeepr.ManufacturerGrid', {
    extend: 'PartKeepr.EditorGrid',
    alias: 'widget.ManufacturerGrid',
    columns: [
        {header: i18n("Manufacturer"), dataIndex: 'name', flex: 1}
    ],
    addButtonText: i18n("Add Manufacturer"),
    addButtonIconCls: 'web-icon building_add',
    deleteButtonText: i18n("Delete Manufacturer"),
    deleteButtonIconCls: 'web-icon building_delete',
    automaticPageSize: true
});

Ext.define('PartKeepr.PartMeasurementUnitGrid', {
    extend: 'PartKeepr.EditorGrid',
    alias: 'widget.PartMeasurementUnitGrid',
    columns: [
        {header: i18n("Part Measurement Unit"), dataIndex: 'name', flex: 1},
        {
            header: i18n("Default"), dataIndex: 'default', width: 60, renderer: function (val)
        {
            if (val === true) {
                return "✓";
            } else {
                return "";
            }
        }
        }
    ],
    addButtonText: i18n("Add Part Measurement Unit"),
    addButtonIconCls: 'fugue-icon ruler--plus',
    deleteButtonText: i18n("Delete Part Measurement Unit"),
    deleteButtonIconCls: 'fugue-icon ruler--minus',
    defaultButtonIconCls: "fugue-icon ruler--pencil",
    automaticPageSize: true,
    initComponent: function ()
    {
        this.callParent();

        this.defaultButton = Ext.create("Ext.button.Button", {
            iconCls: this.defaultButtonIconCls,
            tooltip: i18n('Mark Part Measurement Unit as Default'),
            disabled: true,
            handler: this.onDefaultClick,
            scope: this
        });

        this.getSelectionModel().on("deselect",
            Ext.bind(function (rsm, r, i)
            {
                this.defaultButton.disable();
            }, this));

        this.getSelectionModel().on("select",
            Ext.bind(function (rsm, r, i)
            {
                this.defaultButton.enable();
            }, this));
        this.topToolbar.insert(2, {xtype: 'tbseparator'});
        this.topToolbar.insert(3, this.defaultButton);
    },
    onDefaultClick: function ()
    {
        var r = this.getSelectionModel().getLastSelected();

        r.callPutAction("setDefault", {}, this.onDefaultHandler.bind(this));
    },
    onDefaultHandler: function ()
    {
        this.store.load();
    }
});

Ext.define('PartKeepr.UnitGrid', {
    extend: 'PartKeepr.EditorGrid',
    alias: 'widget.UnitGrid',
    columns: [
        {header: i18n("Unit"), dataIndex: 'name', flex: 1},
        {header: i18n("Symbol"), dataIndex: 'symbol', width: 60}
    ],
    addButtonText: i18n("Add Unit"),
    addButtonIconCls: 'partkeepr-icon unit_add',
    deleteButtonText: i18n("Delete Unit"),
    deleteButtonIconCls: 'partkeepr-icon unit_delete',
    automaticPageSize: true,
    initComponent: function ()
    {
        this.callParent();
    }
});

Ext.define('PartKeepr.UserGrid', {
    extend: 'PartKeepr.EditorGrid',
    alias: 'widget.UserGrid',
    columns: [
        {
            header: i18n("User"),
            dataIndex: 'username',
            flex: 1
        }, {
            header: i18n("Provider"),
            renderer: function (value, metaData, record)
            {
                if (record.getProvider() !== null) {
                    return record.getProvider().get("type");
                } else {
                    return "";
                }


            },
            flex: 1
        },
        {
            header: i18n("Active"),
            xtype: 'booleancolumn',
            dataIndex: 'active',
            trueText: '<span style="vertical-align: top;" class="web-icon accept"/>',
            falseText: '<span style="vertical-align: top;" class="web-icon cancel"/>',
            flex: 0.5
        }
    ],
    addButtonText: i18n("Add User"),
    addButtonIconCls: 'web-icon user_add',
    deleteButtonText: i18n("Delete User"),
    deleteButtonIconCls: 'web-icon user_delete',
    automaticPageSize: true,

    initComponent: function ()
    {
        this.callParent(arguments);

        this.providerStore = Ext.create("PartKeepr.data.store.UserProviderStore");

        this.providerCombo = Ext.create("Ext.form.field.ComboBox", {
            store: this.providerStore,
            displayField: 'type',
            valueField: '@Id',
            editable: false,
            forceSelection: true,
            fieldLabel: i18n("Type"),
            listeners: {
                select: "onProviderSelect",
                scope: this
            }
        });

        this.providerToolbar = Ext.create("Ext.toolbar.Toolbar", {
            dock: 'top',
            enableOverflow: true,
            items: this.providerCombo
        });

        this.filter = Ext.create("Ext.util.Filter", {
            property: "provider",
            operator: "=",
            value: ""
        });

        this.addDocked(this.providerToolbar);
    },
    onProviderSelect: function (combo, record)
    {
        this.filter.setValue(record);
        this.store.addFilter(this.filter);
    }
});

/**
 * Represents the project grid
 */
Ext.define('PartKeepr.SystemNoticeGrid', {
    extend: 'PartKeepr.EditorGrid',
    alias: 'widget.SystemNoticeGrid',
    columns: [
        {header: i18n("Name"), dataIndex: 'title', flex: 1}
    ],
    enableTopToolbar: false
});

Ext.define('PartKeepr.StorageLocationGrid', {
    extend: 'PartKeepr.EditorGrid',
    xtype: 'partkeepr.StorageLocationGrid',

    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: '{name} ({children.length})',
            enableNoGroups: true
        }
    ],

    columns: [
        {header: i18n("Storage Location"), dataIndex: 'name', flex: 1}
    ],
    addButtonText: i18n("Add Storage Location"),
    addButtonIconCls: 'fugue-icon wooden-box--plus',
    deleteButtonText: i18n("Delete Storage Location"),
    deleteButtonIconCls: 'fugue-icon wooden-box--minus',
    initComponent: function ()
    {
        this.callParent();

        if (this.enableEditing) {
            // Adds a button which shows the multi-create window
            this.multiCreateButton = Ext.create("Ext.button.Button", {
                iconCls: 'partkeepr-icon storagelocation_multiadd',
                tooltip: i18n("Multi-create storage locations"),
                handler: this.onMultiCreateClick,
                scope: this
            });

            this.topToolbar.insert(2, {xtype: 'tbseparator'});
            this.topToolbar.insert(3, this.multiCreateButton);
        }
    },
    /**
     * Creates a new storage location multi-create window.
     */
    onMultiCreateClick: function ()
    {
        this.fireEvent("storageLocationMultiAdd");
    }
});

/**
 * Represents the project grid
 */
Ext.define('PartKeepr.ProjectGrid', {
    extend: 'PartKeepr.EditorGrid',
    alias: 'widget.ProjectGrid',
    columns: [
        {header: i18n("Project"), dataIndex: 'name', flex: 1}
    ],
    addButtonText: i18n("Add Project"),
    addButtonIconCls: 'fugue-icon drill--plus',
    deleteButtonText: i18n("Delete Project"),
    deleteButtonIconCls: 'fugue-icon drill--minus',
    automaticPageSize: true
});

Ext.define('PartKeepr.MessageLog', {
	extend: 'PartKeepr.BaseGrid',
	store: {
		model: "PartKeepr.Message"
		},
		columns: [
	    	        {header: i18n("Message"),  dataIndex: 'message', flex: 1},
	    	        {header: i18n("Date"), dataIndex: 'date', width: 300},
	    	        {header: i18n("Severity"), dataIndex: 'severity'}
	    	    ],
	    	    proxy: {
	    	        type: 'memory',
	    	        reader: {
	    	            type: 'json',
	    	            root: 'items'
	    	        }
	    	    },
	    	    sorters: [{
	                property: 'date',
	                direction:'DESC'
	            }]
});
/**
 * Represents an editable list of project parts.
 */
Ext.define('PartKeepr.ProjectPartGrid', {
    extend: 'PartKeepr.BaseGrid',

    /* Column definitions */
    columns: [
        {
            header: i18n("Quantity"), dataIndex: 'quantity',
            wdith: 50,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 1
            }
        }, {
            header: i18n("Part"),
            dataIndex: 'part',
            flex: 1,
            editor: {
                xtype: 'RemotePartComboBox'
            },
            renderer: function (val, p, rec)
            {
                var part = rec.getPart();

                if (part !== null) {
                    return Ext.util.Format.htmlEncode(part.get("name"));
                }
            }
        }, {
            header: i18n("Remarks"), dataIndex: 'remarks',
            flex: 1,
            editor: {
                xtype: 'textfield'
            }
        }
    ],

    /**
     * Initializes the component
     */
    initComponent: function ()
    {

        this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,

        });

        this.plugins = [this.editing];

        this.deleteButton = Ext.create("Ext.button.Button", {
            text: i18n('Delete'),
            disabled: true,
            itemId: 'delete',
            scope: this,
            iconCls: 'web-icon brick_delete',
            handler: this.onDeleteClick
        });

        this.viewButton = Ext.create("Ext.button.Button", {
            text: i18n('View Part'),
            disabled: true,
            itemId: 'view',
            scope: this,
            iconCls: 'web-icon brick_go',
            handler: this.onViewClick
        });

        this.dockedItems = [
            {
                xtype: 'toolbar',
                items: [
                    {
                        text: i18n('Add'),
                        scope: this,
                        iconCls: 'web-icon brick_add',
                        handler: this.onAddClick
                    }, {
                        text: i18n("Create new Part"),
                        scope: this,
                        iconCls: 'web-icon brick_add',
                        handler: this.onAddPartClick
                    },
                    this.deleteButton,
                    this.viewButton
                ]
            }
        ];

        this.callParent();

        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    /**
     * Creates a new row and sets the default quantity to 1.
     */
    onAddClick: function ()
    {
        this.editing.cancelEdit();

        var rec = Ext.create("PartKeepr.ProjectBundle.Entity.ProjectPart", {
            quantity: 1
        });

        this.store.insert(this.store.count(), rec);

        this.editing.startEdit(rec, this.columns[0]);
    },
    /**
     * Creates a new part, adds it to the list and sets the default quantity to 1.
     */
    onAddPartClick: function ()
    {
        var win = Ext.getCmp("partkeepr-partmanager").onItemAdd();
        win.editor.on("editorClose", function (context)
        {
            // End this if the record is a phatom and thus hasn't been saved yet
            if (context.record.phantom) {
                return;
            }

            // Insert the new record
            this.editing.cancelEdit();

            var rec = Ext.create("PartKeepr.ProjectBundle.Entity.ProjectPart", {
                quantity: 1,
                part_id: context.record.get("id"),
                part_name: context.record.get("name")
            });

            this.store.insert(this.store.count(), rec);

            this.editing.startEdit(rec, this.columns[0]);
        }, this);
    },
    /**
     * Removes the currently selected row
     */
    onDeleteClick: function ()
    {
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },
    /**
     * Removes the currently selected row
     */
    onViewClick: function ()
    {
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            Ext.getCmp("partkeepr-partmanager").onEditPart(selection.getPart());
        }
    },

    /**
     * Enables or disables the delete button, depending on the row selection
     */
    onSelectChange: function (selModel, selections)
    {
        this.deleteButton.setDisabled(selections.length === 0);
        this.viewButton.setDisabled(selections.length === 0);
    }
});

/**
 * This class represents a list of all system information records.
 */
Ext.define('PartKeepr.SystemInformationGrid', {
    extend: 'PartKeepr.BaseGrid',

    /* Define the columns */
    columns: [
        {
            header: 'Name',
            dataIndex: 'name',
            width: 200
        }, {
            header: 'Value',
            dataIndex: 'value',
            renderer: Ext.util.Format.htmlEncode,
            flex: 1
        }, {
            header: 'Category',
            dataIndex: 'category',
            hidden: true
        }
    ],

    /**
     * Initializes the component
     */
    initComponent: function ()
    {

        /* Add grouping */
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: '{name}'
        });

        this.features = [groupingFeature];

        /* Create the store using an in-memory proxy */
        this.store = Ext.create("Ext.data.Store", {
            model: 'PartKeepr.SystemInformationRecord',
            sorters: ['category', 'name'],
            groupField: 'category'
        });


        /* Add the refresh button */
        this.refreshButton = Ext.create("Ext.button.Button", {
            handler: function () { this.store.load(); },
            scope: this,
            text: i18n("Refresh")
        });

        this.bottomToolbar = Ext.create("Ext.toolbar.Toolbar", {
            dock: 'bottom',
            ui: 'footer',
            items: [this.refreshButton]
        });

        this.dockedItems = [this.bottomToolbar];

        // Initialize the panel
        this.callParent();

        // Retrieve the system information
       this.store.load();
    },
    statics: {
        iconCls: 'fugue-icon system-monitor',
        title: i18n('System Information'),
        closable: true,
        menuPath: [{text: i18n("View")}]
    }
});

/**
 * Defines a grid menu plugin which appears when a grid is right-clicked.
 * 
 * Currently only contains an export menu.
 */
Ext.define("PartKeepr.GridMenuPlugin", {
	alias: 'plugin.gridmenu',
	
	// Private: The assigned grid
	grid: null,
	
	/**
	 * Initializes the plugin.
	 * @param grid {Object} The grid to which this plugin is bound
	 */
	init: function(grid) {
		this.grid = grid;
		
		this.menu = new Ext.menu.Menu({
			floating: true,
			renderTo: Ext.getBody(),
			items: [{
				text: i18n("Export"),
				glyph: 0xf152,
				menu: [{
                    icon: 'resources/mimetypes/csv.png',
                    text: 'Export as semicolon-delimited CSV (.csv)',
                    handler: this.exportSSV,
                    scope: this
                },{
					icon: 'resources/mimetypes/csv.png',
					text: i18n('Export as comma-delimited CSV (.csv)'),
					handler: this.exportCSV,
					scope: this
				},{
					icon: 'blue-document-excel.png',
					text: i18n('Export as Excel XML (.xlsx)'),
					handler: this.exportXLSX,
					scope: this
				},{
					icon: 'bundles/partkeeprfrontend/images/icons/mediawiki_icon.png',
					text: i18n('Export as MediaWiki table (.txt)'),
					handler: this.exportWiki,
					scope: this
				}]
			},{
				glypt: 0xf02f,
				text: i18n('Print ...'),
				handler: this.exportPrint,
				scope: this
			}]
		});
		
		// Show the menu when an item was clicked
		grid.on("itemcontextmenu", function (view, record, item, index, e, eOpts) {
			this.menu.showAt(e.xy[0], e.xy[1]);
		}, this);
		
		// Show the menu when no item but the grid was clicked
		grid.on("containercontextmenu", function (view, e, eOpts) {
			this.menu.showAt(e.xy[0], e.xy[1]);
		}, this);
	},
	/**
	 * Exports the grid to CSV
	 */
	exportCSV: function () {
        var csvFormatter = Ext.ux.exporter.Exporter.getFormatterByName("csv");
        csvFormatter.separator = ",";

		this.doExport(Ext.ux.exporter.Exporter.exportAny(this.grid, csvFormatter, {}), this.getExportFilename() + ".csv");
	},
    /**
     * Exports the grid to SSV (semicolon separated file)
     */
    exportSSV: function () {
        var csvFormatter = Ext.ux.exporter.Exporter.getFormatterByName("csv");
        csvFormatter.separator = ";";

        this.doExport(Ext.ux.exporter.Exporter.exportAny(this.grid, "csv", {}), this.getExportFilename() + ".csv");
    },
	/**
	 * Exports the grid to MediaWiki format
	 */
	exportWiki: function () {
		this.doExport(Ext.ux.exporter.Exporter.exportAny(this.grid, "wiki", {}), this.getExportFilename() + ".txt");
	},
	/**
	 * Exports the grid to XLSX
	 */
	exportXLSX: function () {
		this.doExport(Ext.ux.exporter.Exporter.exportAny(this.grid, "excel", {}), this.getExportFilename() + ".xlsx");
	},
	/**
	 * Exports selection to print
	 */
	exportPrint: function () {
		selection = this.grid.getSelectionModel().getSelection();
		var ids = new Array();
		for (var i=0;i<selection.length;i++) {
			ids.push(selection[i].get("id"));
		}
		
		var val = Ext.create("PartKeepr.PrintingWindow");
		val.setObjectType('PartKeepr\\PartBundle\\Entity\\Part');
		val.setObjectIds(ids);
		val.show();
	},
	/**
	 * Returns the filename without extension for the grid. Defaults to the grid's title
	 * @returns {String} the filename
	 */
	getExportFilename: function () {
		return this.grid.title;
	},
	/**
	 * Triggers the export. Calls the jsonUpload method and redirects to the uploaded file.
	 * 
	 * @param data {String} The data 
	 * @param filename {String} The filename
	 */
	doExport: function (data, filename) {
		var call = new PartKeepr.ServiceCall("TempFile", "jsonUpload");
		call.setParameter("filedata", Ext.ux.exporter.Base64.encode(data));
		call.setParameter("filename", filename);
		call.setHandler(function (response) {
			var loc = "file.php?type=temp&download=true&id=TMP:"+response.id;
			
			window.location.href = loc;
		});
		call.doCall();
	}
});
Ext.define('PartKeepr.TimeDisplay', {
    extend: 'Ext.Toolbar.TextItem',

    /**
     * Holds the time update task
     * @var object
     */
    updateTimeTask: null,

    /**
     * Holds the layout task
     * @var object
     */
    updateLayoutTask: null,

    /**
     * Stores the currently assigned date format
     * @var string
     */
    dateFormat: null,

    /**
     * Inits the component. Sets up two timers for updating the time and updating the widget's layout.
     *
     * @param none
     * @return nothing
     */
    initComponent: function ()
    {
        this.callParent();

        this.dateFormat = Ext.getDateFormat();

        this.updateTimeTask = {
            run: this.updateTime,
            interval: 280, // Update every 280ms. This is NOT 1 second due to overhead, causing skipping seconds
            scope: this
        };
    },
    /**
     * Start both updating tasks just before rendering starts.
     * @param none
     * @return nothing
     */
    beforeRender: function ()
    {
        this.callParent();
        Ext.TaskManager.start(this.updateTimeTask);
    },
    /**
     * Updates the time. Avoids setText because it's slow.
     *
     * @param none
     * @return nothing
     */
    updateTime: function ()
    {
        var dt = new Date();

        var format = Ext.getDateFormat();
        var string = Ext.Date.format(dt, format);

        this.el.update(string);
    },
    /**
     * When the widget is removed, destroy both tasks.
     *
     * @param none
     * @return nothing
     */
    onDestroy: function ()
    {
        Ext.TaskManager.stop(this.updateTimeTask);
    }
});


Ext.define('PartKeepr.Menu', {
	extend: 'Ext.toolbar.Toolbar',
	items: [{
		
	}]
});
/**
 * Simple text field with an URL button to easily visit the entered URL.
 *
 * The getUrl function may be overridden for custom functionality.
 */
Ext.define("PartKeepr.form.field.Text", {
    extend: "Ext.form.field.Text",

    alias: 'widget.urltextfield',

    triggers: {
        url: {
            cls: 'x-form-trigger-link',
            handler: function () {
                if (this.getUrl() !== false) {
                    window.open(this.getUrl(), '_blank');
                }
            },
            scope: 'this'
        }
    },
    getUrl: function () {
        return this.getValue();
    }
});

Ext.define('PartKeepr.DisplayPreferencesPanel', {
    extend: 'Ext.form.FormPanel',
    title: i18n("Display"),
    bodyStyle: 'background:#DBDBDB;padding: 10px;',
    initComponent: function ()
    {
        this.showDescriptionsCheckbox = Ext.create("Ext.form.field.Checkbox", {
            labelWidth: 120,
            hideEmptyLabel: false,
            boxLabel: i18n("Show category descriptions"),
            handler: Ext.bind(this.showDescriptionsHandler, this)
        });

        if (PartKeepr.getApplication().getUserPreference("partkeepr.categorytree.showdescriptions") == false) {
            this.showDescriptionsCheckbox.setValue(false);
        } else {
            this.showDescriptionsCheckbox.setValue(true);
        }

        this.compactLayout = Ext.create("Ext.form.field.Radio", {
            boxLabel: i18n(
                "Compact Layout") + '<br/> <span class="partkeepr-part-manager-compact"/>',
            name: 'rb',
            inputValue: 'compact'
        });

        this.standardLayout = Ext.create("Ext.form.field.Radio", {
            boxLabel: i18n(
                "Standard Layout") + '<br/> <span class="partkeepr-part-manager-standard"/>',
            name: 'rb',
            inputValue: 'standard'
        });

        if (PartKeepr.getApplication().getUserPreference("partkeepr.partmanager.compactlayout", false) == true) {
            this.compactLayout.setValue(true);
        } else {
            this.standardLayout.setValue(true);
        }
        this.compactLayoutChooser = Ext.create("Ext.form.RadioGroup", {
            fieldLabel: i18n("Part Manager Layout"),
            labelWidth: 120,
            columns: 2,
            width: 400,
            vertical: true,
            listeners: {
                change: function (field, newValue)
                {
                    if (newValue.rb == "standard") {
                        value = false;
                    } else {
                        value = true;
                    }

                    PartKeepr.getApplication().setUserPreference("partkeepr.partmanager.compactlayout", value);
                    PartKeepr.getApplication().recreatePartManager();
                }
            },
            items: [
                this.compactLayout,
                this.standardLayout
            ]
        });

        this.items = [this.showDescriptionsCheckbox, this.compactLayoutChooser];

        this.callParent();
    },
    /**
     * Handler when the "show descriptions" checkbox is clicked.
     */
    showDescriptionsHandler: function (checkbox, checked)
    {
        PartKeepr.getApplication().setUserPreference("partkeepr.categorytree.showdescriptions", checked);
    }
});


Ext.define('PartKeepr.UserPasswordChangePanel', {
    extend: 'Ext.form.FormPanel',
    title: i18n("Change Password"),
    bodyStyle: 'background:#DBDBDB;padding: 10px;',
    layout: 'card',
    initComponent: function ()
    {

        this.oldPassword = Ext.create("Ext.form.field.Text", {
            inputType: "password",
            name: 'password',
            labelWidth: 150,
            style: 'border-bottom: 1px solid grey; padding-bottom: 10px;',
            width: 300,
            fieldLabel: i18n("Current Password")
        });

        this.newPassword = Ext.create("Ext.form.field.Text", {
            style: 'margin-top: 10px',
            inputType: "password",
            name: 'password',
            labelWidth: 150,
            width: 300,
            fieldLabel: i18n("New Password")
        });

        this.newPasswordConfirm = Ext.create("Ext.form.field.Text", {
            inputType: "password",
            name: 'password',
            labelWidth: 150,
            width: 300,
            validator: Ext.bind(this.validatePassword, this),
            fieldLabel: i18n("New Password (Confirm)")
        });

        this.items = [
            {
                border: false,
                bodyStyle: 'background:#DBDBDB;padding: 10px;',
                items: [
                    this.oldPassword,
                    this.newPassword,
                    this.newPasswordConfirm,
                    {
                    xtype: 'fieldcontainer',
                    hideEmptyLabel: false,
                    width: 300,
                    labelWidth: 150,
                    items: {
                        xtype: 'button',
                        handler: this.onChangePassword,
                        scope: this,
                        width: 145,
                        iconCls: 'web-icon accept',
                        text: i18n("Change Password")
                    }}]
            },{
                border: false,
                bodyStyle: 'background:#DBDBDB;padding: 10px;',
                html: i18n("You are authenticated via an external user provider, password changing is not available.")
            }
        ];

        this.callParent();

        if (PartKeepr.getApplication().getLoginManager().getUser().getProvider().get("editable") === false) {
            this.layout.setActiveItem(1);
        }
    },
    onChangePassword: function ()
    {
        if (this.getForm().isValid()) {

            var user = PartKeepr.getApplication().getLoginManager().getUser();

            user.callPutAction("changePassword", {
                "oldpassword": this.oldPassword.getValue(),
                "newpassword": this.newPassword.getValue()
            },  Ext.bind(this.onAfterPasswordChange, this));
        }
    },
    onAfterPasswordChange: function (opts, success, response)
    {
        if (success) {
            Ext.MessageBox.alert(i18n("Password successfully changed"), i18n("You need to re-login with the new password. Click OK to re-login."), this.relogin, this);
        }
    },
    relogin: function () {
        PartKeepr.getApplication().getLoginManager().logout();
        PartKeepr.getApplication().getLoginManager().login();
    },
    validatePassword: function ()
    {
        if (this.newPassword.getValue() != this.newPasswordConfirm.getValue()) {
            return i18n("Passwords don't match");
        }

        return true;
    }
});

Ext.define('PartKeepr.StockPreferencesPanel', {
	extend: 'Ext.form.FormPanel',
	title: i18n("Stock Preferences"),
        bodyStyle: 'background:#DBDBDB;padding: 10px;',
        initComponent: function () {
            this.confirmInlineStockLevelChangesCheckbox = Ext.create("Ext.form.field.Checkbox", {
                boxLabel: i18n("Confirm in-line stock level changes from the parts grid"),
                handler: Ext.bind(this.confirmInlineStockLevelChangesHandler, this)
            });

            if (PartKeepr.getApplication().getUserPreference("partkeepr.inline-stock-change.confirm") == false) {
    			this.confirmInlineStockLevelChangesCheckbox.setValue(false);
    		} else {
    			this.confirmInlineStockLevelChangesCheckbox.setValue(true);
    		}
            
            this.items = [ this.confirmInlineStockLevelChangesCheckbox ];
                   
            this.callParent();
    },
    /**
	 * Handler when the "confirm changes" checkbox was clicked. 
	 */
    confirmInlineStockLevelChangesHandler: function (checkbox, checked) {
		PartKeepr.getApplication().setUserPreference("partkeepr.inline-stock-change.confirm", checked);
	}
});

/**
 * Contains the formatting preferences for various places throughout the system
 */
Ext.define('PartKeepr.FormattingPreferencesPanel', {
    extend: 'Ext.form.Panel',
    title: i18n("Formatting"),
    bodyStyle: 'background:#DBDBDB;padding: 10px;',

    buttonAlign: 'left',

    initComponent: function ()
    {

        this.createWidgets();
        this.loadDefaults();


        this.buttons = [
        {
            text: i18n("Save"),
            handler: "saveSettings",
            scope: this
        }
    ];
        this.items = [
            this.priceNumDecimalsField,
            this.useThousandSeparatorCheckbox,
            this.currencySymbolField,
            this.currencyAtEndCheckbox
        ];

        this.callParent();
    },
    saveSettings: function ()
    {
        PartKeepr.getApplication().setUserPreference("partkeepr.formatting.currency.numdecimals",
            this.priceNumDecimalsField.getValue());

        PartKeepr.getApplication().setUserPreference("partkeepr.formatting.currency.thousandsSeparator",
            this.useThousandSeparatorCheckbox.getValue());

        PartKeepr.getApplication().setUserPreference("partkeepr.formatting.currency.symbol",
            this.currencySymbolField.getValue());

        PartKeepr.getApplication().setUserPreference(
            "partkeepr.formatting.currency.currencySymbolAtEnd", this.currencyAtEndCheckbox.getValue());

    },
    /**
     * Loads the defaults for the user preferences
     *
     * @param none
     * @return nothing
     */
    loadDefaults: function ()
    {
        var numDecimals = PartKeepr.getApplication().getUserPreference("partkeepr.formatting.currency.numdecimals", 2);
        this.priceNumDecimalsField.setValue(numDecimals);

        var useThousandsSeparator = PartKeepr.getApplication().getUserPreference(
            "partkeepr.formatting.currency.thousandsSeparator", true);
        this.useThousandSeparatorCheckbox.setValue(useThousandsSeparator);


        var currencyAtEnd = PartKeepr.getApplication().getUserPreference(
            "partkeepr.formatting.currency.currencySymbolAtEnd", true);
        this.currencyAtEndCheckbox.setValue(currencyAtEnd);

        var currencySymbol = PartKeepr.getApplication().getUserPreference("partkeepr.formatting.currency.symbol", "€");
        this.currencySymbolField.setValue(currencySymbol);
    },
    /**
     * Creates the widgets used in this form.
     *
     * @param none
     * @return nothing
     *
     */
    createWidgets: function ()
    {
        this.priceNumDecimalsField = Ext.create("Ext.form.field.Number", {
            name: 'priceNumDecimalsField',
            fieldLabel: i18n('Decimal precision'),
            labelWidth: 120,
            columnWidth: 0.5,
            minValue: 0,
            maxValue: 4,
            allowDecimals: false
        });

        this.useThousandSeparatorCheckbox = Ext.create("Ext.form.field.Checkbox", {
            boxLabel: i18n("Separate thousands"),
            labelWidth: 120,
            hideEmptyLabel: false
        });

        this.currencySymbolField = Ext.create("Ext.form.field.Text", {
            fieldLabel: i18n("Currency Symbol"),
            labelWidth: 120,
            maxLength: 5
        });

        this.currencyAtEndCheckbox = Ext.create("Ext.form.field.Checkbox", {
            boxLabel: i18n("Currency Symbol after value"),
            labelWidth: 120,
            hideEmptyLabel: false
        });
    }
});

Ext.define('PartKeepr.TipOfTheDayPreferencesPanel', {
    extend: 'Ext.form.FormPanel',
    title: i18n("Tip of the Day"),
    bodyStyle: 'background:#DBDBDB;padding: 10px;',
    initComponent: function ()
    {
        this.displayTipsOnLoginCheckbox = Ext.create("Ext.form.field.Checkbox", {
            boxLabel: i18n("Display tips on login"),
            handler: Ext.bind(this.showTipsHandler, this)
        });

        if (PartKeepr.getApplication().getUserPreference("partkeepr.tipoftheday.showtips") == false) {
            this.displayTipsOnLoginCheckbox.setValue(false);
        } else {
            this.displayTipsOnLoginCheckbox.setValue(true);
        }


        this.resetTipsButton = Ext.create("Ext.button.Button", {
            text: i18n("Mark all tips unread"),
            handler: this.onMarkAllTipsUnreadClick,
            scope: this
        });

        this.items = [
            this.displayTipsOnLoginCheckbox,
            this.resetTipsButton
        ];

        this.callParent();
    },
    /**
     * Handler when the "show tips" checkbox was clicked.
     */
    showTipsHandler: function (checkbox, checked)
    {
        PartKeepr.getApplication().setUserPreference("partkeepr.tipoftheday.showtips", checked);
    },
    /**
     * Marks all tips as unread
     */
    onMarkAllTipsUnreadClick: function ()
    {
        PartKeepr.TipOfTheDayBundle.Entity.TipOfTheDay.callPostCollectionAction("markAllTipsAsUnread", {}, function ()
            {
                var msg = i18n("All tips have been marked as unread");
                Ext.Msg.alert(msg, msg);
            }
        );
    }
});

Ext.define('PartKeepr.UserPreferencePanel', {
    extend: 'Ext.tab.Panel',
    title: i18n("User Preferences"),
    tabPosition: 'bottom',
    //bodyStyle: 'background:#DBDBDB;padding: 10px;',
    initComponent: function ()
    {

        this.passwordChangePanel = Ext.create("PartKeepr.UserPasswordChangePanel");
        this.tipsPanel = Ext.create("PartKeepr.TipOfTheDayPreferencesPanel");
        this.formattingPanel = Ext.create("PartKeepr.FormattingPreferencesPanel");
        this.displayPreferencesPanel = Ext.create("PartKeepr.DisplayPreferencesPanel");
        this.stockPanel = Ext.create("PartKeepr.StockPreferencesPanel");
        this.items = [
            this.tipsPanel,
            this.formattingPanel,
            this.displayPreferencesPanel,
            this.passwordChangePanel,
            this.stockPanel
        ];

        if (PartKeepr.getApplication().getParameter("password_change") === false) {
            Ext.Array.remove(this.items, this.passwordChangePanel);
        }
        this.callParent();
    },
    statics: {
        iconCls: 'fugue-icon gear',
        title: i18n('User Preferences'),
        closable: true,
        menuPath: [{text: i18n("System")}]
    }

});


/**
 * A part picker with an attached grid.
 */
Ext.define("PartKeepr.RemotePartComboBox", {
    extend: "Ext.form.field.Picker",
    alias: 'widget.RemotePartComboBox',
    requires: ["Ext.grid.Panel"],
    selectedValue: null,
    editable: false,

    /**
     * Initializes the component.
     */
    initComponent: function ()
    {
        /**
         * Create the store with the default sorter "name ASC"
         */
        this.createStore({
            model: 'PartKeepr.PartBundle.Entity.Part',
            groupField: 'categoryPath',
            sorters: [
                {
                    property: 'name',
                    direction: 'ASC'
                }
            ]
        });

        this.callParent();
        this.createPicker();

        // Automatically expand field when focused
        this.on("focus", function ()
        {
            this.onTriggerClick();
        }, this);
    },
    // Creates a store. To be called from child's initComponent
    createStore: function (config)
    {
        Ext.Object.merge(config, {
            autoLoad: true,
            autoSync: false, // Do not change. If true, new (empty) records would be immediately commited to the database.
            remoteFilter: true,
            remoteSort: true,
            pageSize: 15
        });

        this.store = Ext.create('Ext.data.Store', config);

        // Workaround for bug http://www.sencha.com/forum/showthread.php?133767-Store.sync()-does-not-update-dirty-flag&p=607093#post607093
        this.store.on('write', function (store, operation)
        {
            var success = operation.wasSuccessful();
            if (success) {
                Ext.each(operation.records, function (record)
                {
                    if (record.dirty) {
                        record.commit();
                    }
                });
            }
        });
    },
    createPicker: function ()
    {
        this.partsGrid = Ext.create("PartKeepr.PartsGrid", {
            enableTopToolbar: true,
            enableEditing: false,
            store: this.store,
            region: 'center'
        });

        this.filter = Ext.create("PartKeepr.PartFilterPanel", {
            region: 'south',
            floatable: false,
            titleCollapse: true,
            height: 225,
            autoScroll: true,
            store: this.store,
            title: i18n("Part Filter"),
            split: true,
            collapsed: true,
            collapsible: true,
            listeners: {
                beforeCollapse: function ()
                {
                    this.partsGrid.focus();
                },
                scope: this
            }
        });

        this.picker = Ext.create("Ext.panel.Panel", {
            shrinkWrapDock: 2,
            layout: 'border',
            floating: true,
            focusOnToFront: false,
            manageHeight: false,
            height: 300,
            minWidth: 350,
            shadow: false,
            ownerCmp: this,
            items: [this.partsGrid, this.filter]
        });

        this.picker.on({
            show: function ()
            {
                this.partsGrid.searchField.setValue(this.getDisplayValue());
                this.partsGrid.searchField.startSearch();
            },
            scope: this
        });

        this.partsGrid.on("select",
            function (selModel, record)
            {
                this.setSelectedValue(record);
                this.setDisplayValue(record.get("name"));
                this.collapse();
            }, this);

        return this.picker;
    },
    getDisplayValue: function ()
    {
        return this.displayValue;
    },
    setSelectedValue: function (data)
    {
        this.selectedValue = data;
    },
    getValue: function ()
    {
        return this.selectedValue;
    },
    setDisplayValue: function (value)
    {
        this.setRawValue(value);
        this.displayValue = value;
    },
    setValue: function (data)
    {
        this.selectedValue = data;

        if (data instanceof Ext.data.Model) {
            this.setDisplayValue(data.get("name"));
        } else {
            this.setDisplayValue("");
        }

    },
    _selectRecords: function (r)
    {
        this.picker.getView().select(r);
        this.picker.getView().ensureVisible(r);
        this.picker.getView().scrollIntoView(r);
    },
    getErrors: function (value)
    {
        if (this.getValue() === null) {
            return [i18n("You need to select a part")];
        }

        return [];
    }
});

Ext.define('PartKeepr.FadingButton', {
	extend: 'Ext.Button',

    /**
     * Holds the fadeButtonTask
     * @var object
     */
    fadeButtonTask: null,

    /**
     * Holds the selector for the button's icon
     * @var string
     */
    selector: ".x-btn-icon",

    /**
     * Initializes the component and adds the fadeButtonTask.
     */
	initComponent: function () {
		this.callParent();

        this.fadeButtonTask = {
            run: this.fadeButton,
            interval: 10000, // No constant fading, because fading eats quite some CPU
            scope: this
        };

	},
    /**
     * Adds an animation to the button's icon. This is only done once and needs to be refreshed (done automatically
     * by startFading).
     *
     * @param none
     * @return nothing
     */
	fadeButton: function () {
		var iconEl = this.getEl().down(this.selector);

		iconEl.animate({
			duration: 1000, // One second
			iterations: 1,
		    keyframes: {
			        50: {
			            opacity: 0
			        },
			        100: {
			            opacity: 1
			        }
			        }});
	},
    /**
     * Starts button fading by adding the task from the task manager
     * @param none
     * @return nothing
     */
    startFading: function () {
        Ext.TaskManager.start(this.fadeButtonTask);
    },
    /**
     * Stops button fading by removing the task from the task manager
     * @param none
     * @return nothing
     */
	stopFading: function () {
        Ext.TaskManager.stop(this.fadeButtonTask);
	}
});
Ext.define('PartKeepr.SystemNoticeButton', {
	extend: 'PartKeepr.FadingButton',
	iconCls: 'fugue-icon service-bell',
	tooltip: i18n("Unacknowledged System Notices"),

    /**
     * Initializes the component. Adds the start/stop and click fading handlers.
     *
     * @param none
     * @return nothing
     */
	initComponent: function () {
		this.callParent();
		
		this.on("show", this.startFading, this);
        this.on("hide", this.stopFading, this);
		this.on("click", this.onClick, this);
	},
    /**
     * Open the system notices when clicked.
     *
     * @param none
     * @return nothing
     */
	onClick: function () {
		PartKeepr.getApplication().openAppItem("PartKeepr.SystemNoticeEditorComponent");
	}
});

/**
 * Implements a simple connection button which can cycle between disconnected and connected state.
 */
Ext.define('PartKeepr.ConnectionButton', {
    extend: 'Ext.Button',

    /**
     * The icon class to use when the button is in "connected" state
     * @var string
     */
    connectedIconCls: 'web-icon connect',

    /**
     * The icon class to use when the button is in "disconnected" state
     * @var string
     */
    disconnectedIconCls: 'web-icon disconnect',

    cls: 'x-btn-icon',
    iconCls: 'web-icon disconnect',
    tooltip: i18n("Disconnected"),

    setConnected: function ()
    {
        this.setIconCls(this.connectedIconCls);
        this.setTooltip(i18n("Connected"));
    },
    setDisconnected: function ()
    {
        this.setIconCls(this.disconnectedIconCls);
        this.setTooltip(i18n("Disconnected"));
    }
});

Ext.define('PartKeepr.SiUnitList', {
    extend: 'Ext.view.BoundList',
    alias: 'widget.siunitlist',
    getInnerTpl: function(displayField) {
        return '<span style="display: inline-block; width: 15px;">{' + displayField + '}</span><span style="display: inline-block; width: 40px;">{prefix}</span>(10<sup>{exponent}</span>)';
    }
});
/**
 * This class represents a field which can handle a number (value) bound to a specific SI prefix.
 * 
 * Internally, we use an object as value. Example:
 * 
 * {
 *     value: 10 		// The base value, in our case 10
 *     symbol: "n" 		// The symbol for display
 *     power: -9    	// The power
 *     siprefix_id: 5	// The ID of the siprefix record  
 * }
 * 
 */
Ext.define("PartKeepr.SiUnitField",{
    extend:"Ext.form.field.Picker",
    alias: 'widget.SiUnitField',
    
    siPrefix: null,
    
    /**
     * @cfg {RegExp} stripCharsRe @hide
     */
    /**
     * @cfg {RegExp} maskRe @hide
     */

    /**
     * @cfg {Boolean} allowDecimals False to disallow decimal values (defaults to true)
     */
    allowDecimals : true,

    /**
     * @cfg {String} decimalSeparator Character(s) to allow as the decimal separator (defaults to '.')
     */
    decimalSeparator : '.',

    /**
     * @cfg {Number} decimalPrecision The maximum precision to display after the decimal separator (defaults to 2)
     */
    decimalPrecision : 2,

    /**
     * @cfg {Number} minValue The minimum allowed value (defaults to Number.NEGATIVE_INFINITY). Will be used by
     * the field's validation logic.
     */
    minValue: Number.NEGATIVE_INFINITY,

    /**
     * @cfg {Number} maxValue The maximum allowed value (defaults to Number.MAX_VALUE). Will be used by
     * the field's validation logic.
     */
    maxValue: Number.MAX_VALUE,

    /**
     * @cfg {String} minText Error text to display if the minimum value validation fails (defaults to 'The minimum
     * value for this field is {minValue}')
     */
    minText : 'The minimum value for this field is {0}',

    /**
     * @cfg {String} maxText Error text to display if the maximum value validation fails (defaults to 'The maximum
     * value for this field is {maxValue}')
     */
    maxText : 'The maximum value for this field is {0}',

    /**
     * @cfg {String} nanText Error text to display if the value is not a valid number.  For example, this can happen
     * if a valid character like '.' or '-' is left in the field with no number (defaults to '{value} is not a valid number')
     */
    nanText : '{0} is not a valid number',

    /**
     * @cfg {String} negativeText Error text to display if the value is negative and {@link #minValue} is set to
     * <tt>0</tt>. This is used instead of the {@link #minText} in that circumstance only.
     */
    negativeText : 'The value cannot be negative',

    /**
     * @cfg {String} baseChars The base set of characters to evaluate as valid numbers (defaults to '0123456789').
     */
    baseChars : '0123456789',

    /**
     * @cfg {Boolean} autoStripChars True to automatically strip not allowed characters from the field. Defaults to <tt>false</tt>
     */
    autoStripChars: false,

    initComponent: function() {
        var me = this,
            allowed;

        me.callParent();

        me.setMinValue(me.minValue);
        me.setMaxValue(me.maxValue);

        // Build regexes for masking and stripping based on the configured options
        if (me.disableKeyFilter !== true) {
            allowed = me.baseChars + '';
            
            var store = PartKeepr.getApplication().getSiPrefixStore();
        	
        	for (var i=0;i<store.count();i++) {
        		allowed += store.getAt(i).get("symbol");
        	}
        	
        	/**
        	 * Fix because the µ-symbol on your keyboard is not greek "Mu" as defined by the Si standard. We wish that
        	 * the user still can enter "µ", which automatically gets converted to "Mu".
        	 */
        	allowed += "µ";
        	
            if (me.allowDecimals) {
                allowed += me.decimalSeparator;
            }
            if (me.minValue < 0) {
                allowed += '-';
            }
            allowed = Ext.String.escapeRegex(allowed);
            me.maskRe = new RegExp('[' + allowed + ']');
            if (me.autoStripChars) {
                me.stripCharsRe = new RegExp('[^' + allowed + ']', 'gi');
            }
        }
    },
    onTriggerClick: function () {
    	this.expand();
    	
    	var node = this.picker.getNode(this.siPrefix);
    	
    	if (node) {
    		this.picker.highlightItem(node);
        	this.picker.listEl.scrollChildIntoView(node, false);	
    	}
    },
    getStore: function () {
    	if (this.store) {
    		return this.store;
    	}
    	
    	return PartKeepr.getApplication().getSiPrefixStore();
    },
    setStore: function (store) {
    	if (this.picker) {
    		this.picker.bindStore(store);
    	} else {
    		this.store = store;
    	}
    },
    createPicker: function() {
    	var siprefixtpl = new Ext.XTemplate(
    		    '<tpl for=".">',
    		        '<div class="thumb-wrap">',
    		          '{symbol} {prefix}',
    		        '</div>',
    		    '</tpl>');
    	
    	var tmp = Ext.create('PartKeepr.SiUnitList', {
    	    store: this.getStore(),
    	    singleSelect: true,
    	    ownerCt: this.ownerCt,
            renderTo: document.body,
            //width: 200,
            //height:200,
            floating: true,
            maxHeight: 300,
            shadow: 'sides',
            focusOnToFront: false,
            hidden: true,
            focusOnShow: true,
            displayField: 'symbol',
            isteners: {
                scope: this,
                itemclick: this.onSelect
            }
    	});
    	
    	this.mon(tmp, {
             itemclick: this.onSelect,
             scope: this
         });
        return tmp;
    },
    onSelect: function (t, rec) {
    	var val = this.getValue();
    	
    	val.symbol = rec.get("symbol");
    	val.power = rec.get("power");
    	val.siprefix_id = rec.get("id");
    	
    	//this.siUnit = rec;
    	this.setValue(val);
    	this.collapse();
    },
    /**
     * Runs all of Number's validations and returns an array of any errors. Note that this first
     * runs Text's validations, so the returned array is an amalgamation of all field errors.
     * The additional validations run test that the value is a number, and that it is within the
     * configured min and max values.
     * @param {Mixed} value The value to get errors for (defaults to the current field value)
     * @return {Array} All validation errors for this field
     */
    getErrors: function(value) {
        var me = this,
            errors = me.callParent(arguments),
            format = Ext.String.format,
            num, retVal;

        retVal = Ext.isDefined(value) ? value : this.processRawValue(this.getRawValue());
        
        value = retVal.value;
        
        if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
             return errors;
        }

        value = String(value).replace(me.decimalSeparator, '.');

        if(isNaN(value)){
            errors.push(format(me.nanText, value));
        }

        num = me.parseValue(value);

        if (me.minValue === 0 && num < 0) {
            errors.push(this.negativeText);
        }
        else if (num < me.minValue) {
            errors.push(format(me.minText, me.minValue));
        }

        if (num > me.maxValue) {
            errors.push(format(me.maxText, me.maxValue));
        }


        return errors;
    },
    rawToValue: function(rawValue) {
    	var processValue;
    	
    	if (Ext.isObject(rawValue)) {
    		processValue = rawValue.value;
    	} else {
    		processValue = rawValue;
    	}
    	
    	return this.fixPrecision(this.parseValue(processValue)) || processValue || null;
    },

    valueToRaw: function(value) {
        var me = this,
            decimalSeparator = me.decimalSeparator;
        value = me.parseValue(value);
        value = me.fixPrecision(value);
        value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
        value = isNaN(value) ? '' : String(value).replace('.', decimalSeparator);
        
        if (Ext.isObject(this.siPrefix) && this.siPrefix.get("symbol") !== "") {
        	return value + " "+this.siPrefix.get("symbol");
        } else {
        	return value;
        }
        
    },

    onChange: function() {
        var me = this,
            value = me.getValue(),
            valueIsNull = value === null;
        
        me.callParent(arguments);
    },
    getValue: function () {
    	var v = this.callParent(arguments);
    	
    	if (this.siPrefix) {
    		return {
        		value: v,
        		symbol: this.siPrefix.get("symbol"),
        		power: this.siPrefix.get("power"),
        		siprefix_id: this.siPrefix.get("id")
        		};
    	} else {
    		return {
    			value: v,
    			symbol: "",
    			power: 1,
    			siprefix_id: null
    		};
    	}
    },
    /**
     * Replaces any existing {@link #minValue} with the new value.
     * @param {Number} value The minimum value
     */
    setMinValue : function(value) {
        this.minValue = Ext.Number.from(value, Number.NEGATIVE_INFINITY);
    },

    /**
     * Replaces any existing {@link #maxValue} with the new value.
     * @param {Number} value The maximum value
     */
    setMaxValue: function(value) {
        this.maxValue = Ext.Number.from(value, Number.MAX_VALUE);
    },

    // private
    parseValue : function(value) {
        value = parseFloat(String(value).replace(this.decimalSeparator, '.'));
        return isNaN(value) ? null : value;
    },

    /**
     * @private
     *
     */
    fixPrecision : function(value) {
        var me = this,
            nan = isNaN(value),
            precision = me.decimalPrecision;

        if (nan || !value) {
            return nan ? '' : value;
        } else if (!me.allowDecimals || precision <= 0) {
            precision = 0;
        }

        return parseFloat(Ext.Number.toFixed(parseFloat(value), precision));
    },

    beforeBlur : function() {
        var me = this,
            v = me.parseValue(me.getRawValue());

        if (!Ext.isEmpty(v)) {
            me.setValue(v);
        }
    },
    findSiPrefix: function (value) {
    	var store = PartKeepr.getApplication().getSiPrefixStore();
    	var symbol;
    	
    	for (var i=0;i<store.count();i++) {
    		
    		symbol = store.getAt(i).get("symbol");
    		
    		if (symbol !== "") {
    			if (strpos(value, symbol) !== false) {
        			return store.getAt(i);
        		}	
    		} else {
    			emptyPrefix = store.getAt(i);
    		}
    		
    	}
    	
    	if (emptyPrefix) {
    		return emptyPrefix;
    	} else {
    		return null;
    	}
    },
    setValue: function (v) {
    	if (Ext.isObject(v)) {
    		this.siPrefix = PartKeepr.getApplication().getSiPrefixStore().getById(v.siprefix_id);
    	
    		return this.callParent([v.value]);
    	} else {
    		return v;
    	}
    },
    processRawValue: function (value) {
    	var prefix;
    	
    	value = PartKeepr.getApplication().convertMicroToMu(value);
    	
        var siPrefix = this.findSiPrefix(value);

        this.siPrefix = siPrefix;
        
        if (siPrefix !== null) {
        	value = str_replace(siPrefix.get("symbol"), "", value);
        	return { value: value, symbol: siPrefix.get("symbol"), power: siPrefix.get("power"), siprefix_id: siPrefix.get("id") };
        } else {
        	return { value: value, symbol: "", power: 0, siprefix_id: null };
        }
    }
});
Ext.define("PartKeepr.CategoryComboBox", {
    extend: "PartKeepr.Widgets.TreePicker",
    alias: 'widget.CategoryComboBox',


    editable: true,

    /**
     * @cfg {Number} typeAheadDelay
     * The length of time in milliseconds to wait until the typeahead function is called
     */
    typeAheadDelay: 250,

    /**
     * @var {Ext.util.DelayedTask} typeAheadTask
     * The internal task for the typeAhead delay
     */
    typeAheadTask: null,

    /**
     * @var {PartKeepr.StorageLocationBundle.Entity.StorageLocation} selectedStorageLocation
     * The selected storage location
     */
    selectedCategory: null,

    enableKeyEvents: true,

    listeners: {
        'specialkey': {
            fn: 'keyHandler',
            scope: 'this'
        }
    },

    triggers: {
        reload: {
            cls: "x-form-reload-trigger",
            weight: -1,
            handler: function () {
                this.store.load();
            },
            scope: 'this'
        }
    },

    _oldValue: null,

    initComponent: function () {
        this.store = Ext.create("PartKeepr.data.store.PartCategoryStore");

        this.on("keyup", Ext.bind(this.onFieldChange, this));
        this.on("blur", Ext.bind(this.onBlur, this));

        this.listenersStore = this.store.on({
            scope: this,
            // Workaround to remember the value when loading
            beforeload: function () {
                this._oldValue = this.getValue();
            },
            // Set the old value when load is complete
            load: function () {
                if (this._oldValue !== null) {
                    this.setValue(this._oldValue);
                }
            }
        });

        this.callParent();
    },
    onBlur: function () {
        this.applySelection();
        this.validate();
    },
    onFieldChange: function () {
        var newValue = this.inputEl.getValue();

        if (!this.typeAheadTask) {
            this.typeAheadTask = new Ext.util.DelayedTask(this.onTypeAhead, this, [newValue]);
        }

        this.typeAheadTask.delay(this.typeAheadDelay, false, false, [newValue]);
    },
    setValue: function (value) {
        if (value !== null) {
            this.textValue = value.get("name");
        } else {
            this.textValue = "";
        }
        this.callParent(arguments);
        this.validate();
    },
    onTypeAhead: function (newValue) {
        if (newValue !== this.textValue) {
            var picker = this.getPicker();
            var store = picker.getStore();

            var node = store.findNode("name", newValue, false, false);
            this.expand();

            if (node !== null) {
                picker.getSelectionModel().select(node);
            } else {
                picker.getSelectionModel().deselectAll();
            }

            this.inputEl.focus();

            this.textValue = newValue;
        }
    },
    /**
     * Handles special keys used in this field.
     *
     * Enter: Starts the search
     * Escape: Removes the search and clears the field contents
     */
    keyHandler: function (field, e) {
        var picker = this.getPicker(),
            currentSelection, index;
        switch (e.getKey()) {
            case e.DOWN:
                currentSelection = picker.getSelectionModel().getSelection();

                if (currentSelection.length === 0) {
                    picker.getSelectionModel().select(0);
                } else {
                    index = picker.getStore().indexOf(currentSelection[0]) + 1;

                    if (index < picker.getStore().count()) {
                        picker.getSelectionModel().select(index);
                    }
                }
                break;
            case e.UP:
                currentSelection = picker.getSelectionModel().getSelection();

                if (currentSelection.length === 0) {
                    picker.getSelectionModel().select(0);
                } else {
                    index = picker.getStore().indexOf(currentSelection[0]) - 1;

                    if (index >= 0) {
                        picker.getSelectionModel().select(index);
                    }
                }
                break;
            case e.ENTER:
                if (!this.isExpanded) {
                    this.expand();
                    return;
                } else {
                    this.applySelection();
                }
                break;
            case e.TAB:
                this.applySelection();
                break;
        }

        this.inputEl.focus();
    },
    applySelection: function () {
        var currentSelection = this.getPicker().getSelectionModel().getSelection();

        if (currentSelection.length === 1) {
            this.setValue(currentSelection[0]);
        }

        this.collapse();
    },
    getErrors: function (value) {
        var errors = this.callParent(arguments);

        if (!this.inputEl) {
            return errors;
        }

        if (!(this.getValue() instanceof PartKeepr.PartBundle.Entity.PartCategory) ||
            this.inputEl.getValue() !== this.getValue().get("name")) {
            errors.push(i18n("A category must be selected"));
        }

        return errors;
    }
});

Ext.define("PartKeepr.PartParameterComboBox",{
    extend:"Ext.form.field.ComboBox",
    alias: 'widget.PartParameterComboBox',
    displayField: 'name',
    valueField: 'name',
    autoSelect: false,
    allowBlank: false,
    queryMode: 'local',
    triggerAction: 'all',
    forceSelection: false,
    editable: true,
    initComponent: function () {
		//this.store = PartKeepr.getApplication().getPartUnitStore();
    	
    	this.store = Ext.create("Ext.data.Store", {
    		fields: [{ name: 'name' }],
    		proxy: {
    			type: 'ajax',
    			url: PartKeepr.getBasePath() + "/Part/getPartParameterNames",
    			reader: {
    				type: 'json',
    				root: 'response.data'
    			}
    		}
    	});
    	
    	this.store.load();
		
		/* Workaround to remember the value when loading */
		this.store.on("beforeload", function () {
			this._oldValue = this.getValue();
		}, this);
		
		/* Set the old value when load is complete */
		this.store.on("load", function () {
			this.setValue(this._oldValue);
		}, this);
		
		this.callParent();
    }
});


/**
 * @class PartKeepr.RemoteImageField
 * <p>The RemoteImageField is a form field which can be used to upload one image. It automatically
 * displays the remote image by id, assigns a temporary ID if it's a new image so the model can be
 * syncronized at once.
 *
 */
Ext.define('PartKeepr.RemoteImageField', {
    extend: 'Ext.container.Container',
    alias: 'widget.remoteimagefield',

    xtype: 'remoteimagefield',

    listeners: {
        'click': "onClick"
    },
    layout: 'vbox',
    /**
     * Initializes the field
     */
    initComponent: function ()
    {

        this.image = Ext.create("Ext.Img", {
            maxHeight: this.maxHeight,
            maxWidth: this.maxWidth,
            autoEl: 'div',
            width: this.maxWidth,
            height: this.maxHeight,
            flex: 1,
            cls: 'remote-image-background'
        });

        this.button = Ext.create("Ext.button.Button", {
            text: i18n("Change Image"),
            scope: this,
            handler: this.onClick
        });

        this.items = [this.image, this.button];
        this.minHeight = this.maxHeight;
        this.minWidth = this.maxWidth;

        this.callParent();
    },
    onClick: function ()
    {
        var j = Ext.create("PartKeepr.FileUploadDialog", {imageUpload: true});
        j.on("fileUploaded", this.onFileUploaded, this);
        j.show();
    },
    onFileUploaded: function (data)
    {
        this.fireEvent("fileUploaded", data);
    },
    /**
     * Sets a value for the field. If the value is numeric, we call the image service
     * with the specified id and the specified type. If the value is a string and prefixed
     * with TMP:, we use the type "TempImage" and pass the id which has to be specified after TMP:.
     *
     * Example
     * TMP:12     would retrieve the temporary image with the ID 12
     * @param {Mixed} value The value to set
     * @return {Ext.form.field.Field} this
     */
    setValue: function (value)
    {
        this.value = value;

        if (value !== null) {
            this.image.setSrc(
                value.getId() + "/getImage?maxWidth=" + this.maxWidth + "&maxHeight=" + this.maxHeight + "&ts=" + new Date().getTime());
        } else {
            this.image.setSrc("");
        }

        return this;
    }
});


/**
 * Creates a panel with a webcam widget. The webcam widget is
 * a flash (jpegcam).
 */
Ext.define('PartKeepr.WebcamPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.WebcamPanel',

    layout: 'fit',
    width: 320,
    height: 286,
    items: [{
        xtype: 'component',
        itemId: 'video',
        autoEl: {
            tag: 'video',
            autoplay: 'true'
        }
    },{
        xtype: 'component',
        itemId: 'canvas',
        autoEl: {
            tag: 'canvas'
        }
    }],
    video: null,
    stream: null,

    initComponent: function ()
    {
        this.takePhotoButton = Ext.create("Ext.button.Button", {
            text: i18n("Take picture and upload"),
            iconCls: 'fugue-icon webcam',
            handler: this.takePhoto,
            scope: this
        });

        // Create a toolbar with the "take photo" button
        this.bbar = Ext.create("Ext.toolbar.Toolbar", {
            enableOverflow: true,
            items: [this.takePhotoButton]
        });


        this.callParent();

        this.on("afterrender", this._onAfterRender, this);
        this.on("beforedestroy", this._onBeforeDestroy, this);
    },
    handleVideo: function (stream) {
        this.stream = stream;
        this.video.src = window.URL.createObjectURL(stream);
    },
    videoError: function () {
        // @todo: Implement video error handler
    },
    _onAfterRender: function () {
        this.video = this.down("#video").getEl().dom;
        this.canvas = this.down("#canvas").getEl().dom;

        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, Ext.bind(this.handleVideo, this), Ext.bind(this.videoError, this));
        }
    },
    /**
     * Takes a photo using the webcam.
     */
    takePhoto: function ()
    {
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;

        var ctx = this.canvas.getContext('2d');
        ctx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);

        Ext.Ajax.request({
            // Might need to adjust the path, depending on if we are uploading a file or image
            url: PartKeepr.getBasePath() + "/api/temp_uploaded_files/webcamUpload",
            params: this.canvas.toDataURL(),
            success: function (response) {
                var responseObject = Ext.decode(response.responseText);
                this.fireEvent("fileUploaded", responseObject);
            },
            //@todo implement failure handler
            scope: this
        });

        this.takePhotoButton.disable();
        this.takePhotoButton.setText(i18n("Uploading..."));
    },
    _onBeforeDestroy: function () {
        // stream.stop is deprecated for newer chrome versions,
        // use getTracks instead
        if (this.stream.getTracks) {
            var tracks= this.stream.getTracks();

            for (var i=0;i<tracks.length;i++) {
                tracks[i].stop();
            }
        } else {
            this.stream.stop();
        }

        this.video.pause();
        this.video.src=null;
    }

});

Ext.define("PartKeepr.ReloadableComboBox",{
    extend:"Ext.form.field.ComboBox",
    alias: 'widget.ReloadableComboBox',
    displayField: 'name',
    valueField: '@id',
    autoSelect: true,
    queryMode: 'local',
    triggerAction: 'all',
    forceSelection: true,
    editable: true,
    triggers: {
        reload: {
            cls: "x-form-reload-trigger",
            weight: -1,
            handler: function ()
            {
                this.store.load();
            },
            scope: 'this'
        }
    },
    initComponent: function () {
		this.listenersStore = this.store.on({
				scope: this,
				// Workaround to remember the value when loading 
				beforeload: function () {
                    this._oldValue = this.getSelection();
                },
				// Set the old value when load is complete
				load: function () {
                    this.setSelection(this._oldValue);
                }
    		});
		
		this.callParent();
    }
});

Ext.define("PartKeepr.DistributorComboBox",{
    extend:"PartKeepr.ReloadableComboBox",
    alias: 'widget.DistributorComboBox',
    ignoreQuery: false,
    initComponent: function () {
		this.store = PartKeepr.getApplication().getDistributorStore();
		this.callParent();
    },
    onTriggerClick: function() {
    	if (!this.ignoreQuery) {
    		this.callParent();
    	} else {
    		var me = this;
            if (!me.readOnly && !me.disabled) {
                if (me.isExpanded) {
                    me.collapse();
                } else {
                    me.onFocus({});
                    me.expand();
                }
                me.inputEl.focus();
            }	
    	}
        
    }
});

Ext.define("PartKeepr.UserComboBox", {
    extend: "PartKeepr.ReloadableComboBox",
    alias: 'widget.UserComboBox',
    displayField: "username",

    initComponent: function ()
    {
        this.store = PartKeepr.getApplication().getUserStore();
        this.callParent();
    }
});

Ext.define("PartKeepr.FootprintComboBox",{
    extend:"PartKeepr.ReloadableComboBox",
    alias: 'widget.FootprintComboBox',
    initComponent: function () {
		this.store = PartKeepr.getApplication().getFootprintStore();
		this.callParent();
    }
});


Ext.define("PartKeepr.ManufacturerComboBox",{
    extend:"PartKeepr.ReloadableComboBox",
    alias: 'widget.ManufacturerComboBox',
    initComponent: function () {
		this.store = PartKeepr.getApplication().getManufacturerStore();
		this.callParent();
    }
});

Ext.define("PartKeepr.UnitComboBox",{
    extend:"PartKeepr.ReloadableComboBox",
    alias: 'widget.UnitComboBox',
    initComponent: function () {
		this.store = PartKeepr.getApplication().getUnitStore();
		this.callParent();
    }
});

Ext.define("PartKeepr.PartUnitComboBox",{
    extend:"PartKeepr.ReloadableComboBox",
    alias: 'widget.PartUnitComboBox',
    initComponent: function () {
		this.store = PartKeepr.getApplication().getPartUnitStore();
		this.callParent();
    }
});

Ext.define("PartKeepr.StorageLocationComboBox",{
    extend:"PartKeepr.ReloadableComboBox",
    alias: 'widget.StorageLocationComboBox',
    displayField: 'name',
    valueField: '@id',
    queryMode: 'local',
    triggerAction: 'all',
    
    trigger2Cls: Ext.baseCSSPrefix + 'form-reload-trigger',
    
    onTrigger1Click: function () {
    	this.onTriggerClick();
    },
    onTrigger2Click: function () {
    	this.expand();
    	this.store.load();
    },
    initComponent: function () {
		this.store = Ext.create("Ext.data.Store",
			{
				model: 'PartKeepr.StorageLocationBundle.Entity.StorageLocation',
				pageSize: 99999999,
				autoLoad: true
			});
		
		this.callParent();
    },
    setValue: function (val) {
    	if (val === 0) {
    		return;
    	}
    	this.callParent(arguments);
    }
});


Ext.define("PartKeepr.ResistorCalculator",{
    extend:"Ext.window.Window",
    alias: 'widget.ResistorCalculator',
    
    width: 300,
    height: 300,
    layout: 'fit',
    initComponent: function () {
    	
    	//this.resistorValueField = Ext.create("Ext.form.field.Number");
    	this.resistorDisplay = Ext.create("PartKeepr.ResistorDisplay", {
    		viewBox: false
    	});
    	
    	/*this.resistorDisplay = Ext.create('Ext.draw.Component', {
    	    viewBox: false,
    	    items: [{
    	        type: 'circle',
    	        fill: '#79BB3F',
    	        radius: 100,
    	        x: 100,
    	        y: 100
    	    }]
    	});*/ 
    	
    	this.items = [ this.resistorDisplay ];
    	this.callParent();
    }
});
Ext.define('PartKeepr.ContextMenu.CharPicker', {
     extend: 'Ext.menu.Menu',

     alias: 'widget.charpickermenu',

    /**
     * @cfg {Boolean} hideOnClick
     * False to continue showing the menu after a date is selected.
     */
    hideOnClick : true,

    /**
     * @cfg {String} pickerId
     * An id to assign to the underlying char picker.
     */
    pickerId : null,

    /**
     * @cfg {Number} maxHeight
     * @hide
     */

    /**
     * @property {PartKeepr.picker.Char} picker
     * The {@link PartKeepr.picker.Char} instance for this char picker
     */

    /**
     * @event click
     * @hide
     */

    /**
     * @event itemclick
     * @hide
     */

    initComponent : function(){
        var me = this,
            cfg = Ext.apply({}, me.initialConfig);

        // Ensure we don't get duplicate listeners
        delete cfg.listeners;
        Ext.apply(me, {
            plain: true,
            showSeparator: false,
            items: Ext.applyIf({
                cls: Ext.baseCSSPrefix + 'menu-char-item',
                id: me.pickerId,
                xtype: 'charpicker'
            }, cfg)
        });

        me.callParent(arguments);

        me.picker = me.down('charpicker');

        /**
         * @event select
         * @alias PartKeepr.picker.Char#select
         */
        me.relayEvents(me.picker, ['select']);

        if (me.hideOnClick) {
            me.on('select', me.hidePickerOnSelect, me);
        }
    },

    /**
     * Hides picker on select if hideOnClick is true
     * @private
     */
    hidePickerOnSelect: function() {
        Ext.menu.Manager.hideAll();
    }
 });

Ext.define('PartKeepr.Editor', {
    extend: 'Ext.form.Panel',
    alias: 'widget.Editor',
    trackResetOnLoad: true,
    bodyPadding: 10,
    record: null,		// The record which is currently edited
    saveText: i18n("Save"),
    cancelText: i18n("Cancel"),
    model: null,
    layout: 'anchor',
    change: false,
    autoScroll: true,
    defaults: {
        anchor: '100%',
        labelWidth: 150
    },
    enableButtons: true,
    titleProperty: 'name',
    editAfterSave: true,

    // If false, determinates if we should sync via the store or the record itself.
    // If true, always syncs the record via it's own proxy.
    syncDirect: false,

    initComponent: function ()
    {
        if (this.enableButtons) {
            this.saveButton = Ext.create("Ext.button.Button", {
                text: this.saveText,
                iconCls: 'fugue-icon disk',
                handler: Ext.bind(this._onItemSave, this)
            });

            this.cancelButton = Ext.create("Ext.button.Button", {
                text: this.cancelText,
                iconCls: 'web-icon cancel',
                handler: Ext.bind(this.onCancelEdit, this)
            });

            this.bottomToolbar = Ext.create("Ext.toolbar.Toolbar", {
                enableOverflow: true,
                margin: '10px',
                defaults: {minWidth: 100},
                dock: 'bottom',
                ui: 'footer',
                items: [this.saveButton, this.cancelButton]
            });

            Ext.apply(this, {
                dockedItems: [this.bottomToolbar]
            });
        }

        this.callParent();
    },
    onCancelEdit: function ()
    {
        this.fireEvent("editorClose", this);
    },
    newItem: function (defaults)
    {
        Ext.apply(defaults, {});
        var j = Ext.create(this.model, defaults);
        this.editItem(j);
    },
    editItem: function (record)
    {
        this.record = record;
        this.getForm().loadRecord(this.record);
        this.show();
        if (this.record.get(this.titleProperty) !== "") {
            this.setTitle(this.record.get(this.titleProperty));
        }

        this.change = false;
        this.fireEvent("startEdit", this);
    },
    getRecordId: function ()
    {
        if (this.record) {
            return this.record.getId();
        } else {
            return null;
        }
    },
    _onItemSave: function ()
    {
        // Disable the save button to indicate progress
        if (this.enableButtons) {
            this.saveButton.disable();

            // Sanity: If the save process fails, re-enable the button after 30 seconds
            // @todo This is quite a hack. Needs verification if that's still required
            Ext.defer(function ()
            {
                if (this.saveButton.getEl()) {
                    this.saveButton.enable();
                }
            }, 30000, this);
        }

        this.getForm().updateRecord(this.record);

        this.fireEvent("itemSave", this.record);

        this.record.save({
            callback: this._onSave,
            scope: this
        });
    },
    _onSave: function (record, response)
    {
        if (this.enableButtons) {
            // Re-enable the save button
            this.saveButton.enable();
        }

        if (response.success === true) {
            this.record = record;
            this.fireEvent("itemSaved", this.record);
        }

        if (this.editAfterSave) {
            this.editItem(record);
        }
    }
});

Ext.define('PartKeepr.DistributorEditor', {
    extend: 'PartKeepr.Editor',
    alias: 'widget.DistributorEditor',
    items: [
        {
            xtype: 'textfield',
            name: 'name',
            fieldLabel: i18n("Distributor")
        }, {
            xtype: 'textarea',
            name: 'address',
            fieldLabel: i18n("Address")
        }, {
            xtype: 'urltextfield',
            name: 'url',
            fieldLabel: i18n("Website")
        }, {
            xtype: 'textfield',
            name: 'skuurl',
            fieldLabel: i18n("SKU URL"),
            triggers: {
                help: {
                    cls: 'x-form-trigger-help',
                    handler: function ()
                    {
                        Ext.Msg.alert(i18n("Help"), i18n(
                            "Enter the URL of the distributor's SKU URL. Use %s as a placeholder for the SKU. Example: http://de.farnell.com/product/dp/%s"));
                    }
                }
            },
        }, {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: i18n("Email")
        }, {
            xtype: 'textfield',
            name: 'phone',
            fieldLabel: i18n("Phone")
        }, {
            xtype: 'textfield',
            name: 'fax',
            fieldLabel: i18n("Fax")
        }, {
            xtype: 'textarea',
            name: 'comment',
            fieldLabel: i18n("Comment")
        }
    ],
    saveText: i18n("Save Distributor")
});

/**
 * @class PartKeepr.PartEditor

 * <p>The PartEditor provides an editing form for a part. It contains multiple tabs, one for each nested record.</p>
 */
Ext.define('PartKeepr.PartEditor', {
    extend: 'PartKeepr.Editor',

    // Assigned model
    model: 'PartKeepr.PartBundle.Entity.Part',
    bodyPadding: '0 0 0 0',
    // Layout stuff
    border: false,
    layout: 'fit',
    editAfterSave: false,

    /**
     * Initializes the editor fields
     */
    initComponent: function ()
    {
        // Defines the overall height of all fields, used to calculate the anchoring for the description field
        var overallHeight = (this.partMode == "create") ? '-300' : '-245';

        this.nameField = Ext.create("Ext.form.field.Text", {
            name: 'name',
            fieldLabel: i18n("Name"),
            allowBlank: false,
            labelWidth: 150
        });

        this.storageLocationComboBox = Ext.create("PartKeepr.StorageLocationPicker",
            {
                fieldLabel: i18n("Storage Location"),
                name: 'storageLocation',
                allowBlank: false,
                labelWidth: 150
            });

        this.footprintNone = Ext.create("Ext.form.field.Radio", {
            boxLabel: i18n("None"),
            name: 'footprint_mode',
            value: "unset",
            width: 70,
            listeners: {
                scope: this,
                change: function (field, newValue)
                {
                    if (newValue === true) {
                        this.footprintComboBox.clearValue();
                    }
                }
            }
        });

        this.footprintSet = Ext.create("Ext.form.field.Radio", {
            name: 'footprint_mode',
            width: 20,
            value: "set"
        });

        /*
         * Creates the footprint combo box. We listen for the "change" event, because we need to set the footprint
         * comboboxes to the right state, depending on the selection. Another way would be to patch the combobox
         * to support "null" values, however, this is a major change within ExtJS and probably not supported for
         * updates of ExtJS.
         */
        this.footprintComboBox = Ext.create("PartKeepr.FootprintComboBox", {
            name: 'footprint',
            returnObject: true,
            flex: 1,
            listeners: {
                scope: this,
                change: function (field, newValue)
                {
                    if (typeof(newValue) === 'object') {
                        this.footprintSet.setValue(true);
                    }
                }
            }
        });

        // Defines the basic editor fields
        var basicEditorFields = [
            this.nameField,
            {
                xtype: 'textfield',
                fieldLabel: i18n("Description"),
                name: 'description'
            }, {
                layout: 'column',
                border: false,
                items: [
                    {
                        xtype: 'numberfield',
                        fieldLabel: i18n('Minimum Stock'),
                        allowDecimals: false,
                        allowBlank: false,
                        labelWidth: 150,
                        name: 'minStockLevel',
                        value: 0,
                        columnWidth: 0.5,
                        minValue: 0
                    }, {
                        xtype: 'PartUnitComboBox',
                        fieldLabel: i18n("Measurement Unit"),
                        labelWidth: 120,
                        columnWidth: 0.5,
                        returnObject: true,
                        name: 'partUnit'
                    }
                ]
            }, {
                xtype: 'CategoryComboBox',
                fieldLabel: i18n("Category"),
                name: 'category',
                displayField: "name",
                returnObject: true
            },
            this.storageLocationComboBox,
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                fieldLabel: i18n("Footprint"),
                defaults: {
                    hideLabel: true
                },
                items: [
                    this.footprintNone,
                    this.footprintSet,
                    this.footprintComboBox
                ]
            }, {
                xtype: 'textarea',
                fieldLabel: i18n("Comment"),
                name: 'comment',
                anchor: '100% ' + overallHeight
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                fieldLabel: i18n("Status"),
                defaults: {
                    hideLabel: true
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: i18n("Status"),
                        flex: 1,
                        name: 'status'
                    }, {
                        xtype: 'checkbox',
                        hideEmptyLabel: false,
                        fieldLabel: '',
                        boxLabel: i18n("Needs Review"),
                        name: 'needsReview'
                    }
                ]
            }, {
                xtype: 'textfield',
                fieldLabel: i18n("Condition"),
                name: 'partCondition'
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'textfield',
                        labelWidth: 150,
                        fieldLabel: i18n("Internal Part Number"),
                        name: 'internalPartNumber',
                        flex: 1
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: i18n("Internal ID"),
                        name: '@id',
                        renderer: function (value)
                        {
                            var values = value.split("/");
                            return values[values.length - 1];
                        }
                    }
                ]

            }
        ];

        // Creates the distributor grid
        this.partDistributorGrid = Ext.create("PartKeepr.PartDistributorGrid", {
            title: i18n("Distributors"),
            iconCls: 'web-icon lorry',
            layout: 'fit'
        });

        // Creates the manufacturer grid
        this.partManufacturerGrid = Ext.create("PartKeepr.PartManufacturerGrid", {
            title: i18n("Manufacturers"),
            iconCls: 'web-icon building',
            layout: 'fit'
        });

        // Creates the attachment grid
        this.partAttachmentGrid = Ext.create("PartKeepr.PartAttachmentGrid", {
            title: i18n("Attachments"),
            iconCls: 'web-icon attach',
            layout: 'fit'
        });

        // Adds stock level fields for new items
        if (this.partMode && this.partMode == "create") {
            this.initialStockLevel = Ext.create("Ext.form.field.Number", {
                fieldLabel: i18n("Initial Stock Level"),
                name: "initialStockLevel",
                labelWidth: 150,
                columnWidth: 0.5
            });

            this.initialStockLevelUser = Ext.create("PartKeepr.UserComboBox", {
                fieldLabel: i18n("Stock User"),
                name: 'initialStockLevelUser',
                columnWidth: 0.5,
                returnObject: true
            });

            basicEditorFields.push({
                layout: 'column',
                border: false,
                items: [
                    this.initialStockLevel,
                    this.initialStockLevelUser
                ]
            });

            this.initialStockLevelPrice = Ext.create("PartKeepr.CurrencyField", {
                fieldLabel: i18n('Price'),
                labelWidth: 150,
                columnWidth: 0.5,
                name: 'initialStockLevelPrice'
            });

            this.initialStockLevelPricePerItem = Ext.create("Ext.form.field.Checkbox", {
                boxLabel: i18n("Per Item"),
                columnWidth: 0.5,
                name: 'initialStockLevelPricePerItem'
            });

            basicEditorFields.push({
                layout: 'column',
                border: false,
                items: [
                    this.initialStockLevelPrice,
                    this.initialStockLevelPricePerItem
                ]
            });


        }

        // Create a tab panel of all fields
        this.items = {
            xtype: 'tabpanel',
            border: false,
            items: [
                {
                    iconCls: 'web-icon brick',
                    xtype: 'panel',
                    autoScroll: false,
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 150
                    },
                    title: i18n("Basic Data"),
                    items: basicEditorFields
                },
                this.partDistributorGrid,
                this.partManufacturerGrid,
                this.partAttachmentGrid
            ]
        };

        this.on("startEdit", this.onEditStart, this, {delay: 200});
        this.on("itemSaved", this._onItemSaved, this);

        this.callParent();

        this.on("itemSave", this.onItemSave, this);

    },
    /**
     * Cleans up the record prior saving.
     */
    onItemSave: function ()
    {
        var removeRecords = [], j;

        /**
         * Iterate through all records and check if a valid distributor
         * ID is assigned. If not, the record is removed as it is assumed
         * that the record is invalid and being removed.
         */
        for (j = 0; j < this.record.distributors().getCount(); j++) {
            if (this.record.distributors().getAt(j).getDistributor() === null) {
                removeRecords.push(this.record.distributors().getAt(j));
            }
        }

        if (removeRecords.length > 0) {
            this.record.distributors().remove(removeRecords);
        }

        removeRecords = [];

        /**
         * Iterate through all records and check if a valid parameter
         * ID is assigned. If not, the record is removed as it is assumed
         * that the record is invalid and being removed.
         */

        for (j = 0; j < this.record.parameters().getCount(); j++) {
            if (this.record.parameters().getAt(j).get("unit_id") === 0) {
                removeRecords.push(this.record.parameters().getAt(j));
            }
        }

        if (removeRecords.length > 0) {
            this.record.parameters().remove(removeRecords);
        }

        removeRecords = [];

        /**
         * Iterate through all records and check if a valid manufacturer
         * ID is assigned. If not, the record is removed as it is assumed
         * that the record is invalid and being removed.
         */

        for (j = 0; j < this.record.manufacturers().getCount(); j++) {
            if (this.record.manufacturers().getAt(j).getManufacturer() === null) {
                removeRecords.push(this.record.manufacturers().getAt(j));
            }
        }

        if (removeRecords.length > 0) {
            this.record.manufacturers().remove(removeRecords);
        }

        // Force footprint to be "null" when the checkbox is checked.
        if (this.footprintNone.getValue() === true) {
            this.record.setFootprint(null);
        }

        if (this.initialStockLevel) {
            var initialStockLevel = this.initialStockLevel.getValue();

            if (this.record.phantom && initialStockLevel > 0) {
                var stockLevel = Ext.create("PartKeepr.StockBundle.Entity.StockEntry");
                stockLevel.set("stockLevel", initialStockLevel);
                stockLevel.setUser(this.initialStockLevelUser.getValue());

                if (this.initialStockLevelPricePerItem.getValue() === false) {
                    stockLevel.set("price", this.initialStockLevelPrice.getValue() / initialStockLevel);
                } else {
                    stockLevel.set("price", this.initialStockLevelPrice.getValue());
                }

                this.record.stockLevels().add(stockLevel);
            }
        }
    },
    onEditStart: function ()
    {
        this.bindChildStores();
        this.nameField.focus();

        // Re-trigger validation because of asynchronous loading of the storage location field,
        // which would be marked invalid because validation happens immediately, but after loading
        // the storage locations, the field is valid, but not re-validated.

        // This workaround is done twice; once after the store is loaded and once when we start editing,
        // because we don't know which event will come first
        this.getForm().isValid();

        if (this.record.getFootprint() !== null) {
            this.footprintSet.setValue(true);
        } else {
            this.footprintNone.setValue(true);
        }
    },
    _onItemSaved: function ()
    {
        this.fireEvent("partSaved", this.record);

        if (this.keepOpenCheckbox.getValue() !== true && this.createCopyCheckbox.getValue() !== true) {
            this.fireEvent("editorClose", this);
        } else {
            var newItem, data;

            if (this.partMode == "create") {
                if (this.copyPartDataCheckbox.getValue() === true) {
                    data = this.record.getData();
                    delete data["@id"];

                    newItem = Ext.create("PartKeepr.PartBundle.Entity.Part");
                    newItem.set(data);
                    newItem.setAssociationData(this.record.getAssociationData());
                    newItem.stockLevels().removeAll();
                    newItem.set("stockLevel", 0);
                    this.editItem(newItem);

                } else {
                    newItem = Ext.create("PartKeepr.PartBundle.Entity.Part");
                    newItem.setPartUnit(PartKeepr.getApplication().getDefaultPartUnit());

                    newItem.setCategory(this.record.getCategory());

                    this.editItem(newItem);
                }
            } else {
                data = this.record.getData();
                delete data["@id"];

                newItem = Ext.create("PartKeepr.PartBundle.Entity.Part");
                newItem.set(data);
                newItem.setAssociationData(this.record.getAssociationData());
                this.editItem(newItem);
            }
        }
    },
    bindChildStores: function ()
    {
        this.partDistributorGrid.bindStore(this.record.distributors());
        this.partManufacturerGrid.bindStore(this.record.manufacturers());
        this.partAttachmentGrid.bindStore(this.record.attachments());
    },
    setTitle: function (title)
    {
        var tmpTitle;

        if (this.record.phantom) {
            tmpTitle = i18n("Add Part");
        } else {
            tmpTitle = i18n("Edit Part");
        }

        if (title !== "") {
            tmpTitle = tmpTitle + ": " + title;
        }

        this.fireEvent("_titleChange", tmpTitle);
    }
});

Ext.define('PartKeepr.ManufacturerEditor', {
    extend: 'PartKeepr.Editor',
    alias: 'widget.ManufacturerEditor',
    saveText: i18n("Save Manufacturer"),
    labelWidth: 150,
    initComponent: function ()
    {
        this.on("startEdit", Ext.bind(this.onEditStart, this));

        this.tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="dataview-multisort-item iclogo"><img src="{[values["@id"]]}/getImage?maxWidth=100&maxHeight=100"/></div>',
            '</tpl>');

        this.addLogoButton = Ext.create("Ext.button.Button", {
            iconCls: "web-icon add",
            text: i18n("Add Logo"),
            handler: Ext.bind(this.uploadImage, this)
        });

        this.deleteLogoButton = Ext.create("Ext.button.Button", {
            iconCls: "web-icon delete",
            text: i18n("Delete Logo"),
            disabled: true,
            handler: Ext.bind(this.deleteImage, this)
        });

        this.iclogoGrid = Ext.create("Ext.view.View", {
            store: null,
            border: true,
            frame: true,
            style: 'background-color: white',
            emptyText: 'No images to display',
            height: 200,
            fieldLabel: i18n("Logos"),
            componentCls: 'manufacturer-ic-logos',
            itemSelector: 'div.dataview-multisort-item',
            singleSelect: true,
            anchor: '100%',
            tpl: this.tpl,
            listeners: {
                selectionchange: Ext.bind(function (view, selections)
                {
                    if (selections.length > 0) {
                        this.deleteLogoButton.enable();
                    } else {
                        this.deleteLogoButton.disable();
                    }
                }, this)
            }
        });

        this.items = [
            {
                xtype: 'textfield',
                name: 'name',
                fieldLabel: i18n("Manufacturer Name")
            }, {
                xtype: 'textarea',
                name: 'address',
                fieldLabel: i18n("Address")
            }, {
                xtype: 'urltextfield',
                name: 'url',
                fieldLabel: i18n("Website")
            }, {
                xtype: 'textfield',
                name: 'email',
                fieldLabel: i18n("Email")
            }, {
                xtype: 'textfield',
                name: 'phone',
                fieldLabel: i18n("Phone")
            }, {
                xtype: 'textfield',
                name: 'fax',
                fieldLabel: i18n("Fax")
            }, {
                xtype: 'textarea',
                name: 'comment',
                fieldLabel: i18n("Comment")
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: i18n("Manufacturer Logos"),
                items: [
                    {
                        xtype: 'panel',
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'bottom',
                                items: [this.addLogoButton, this.deleteLogoButton]
                            }
                        ],
                        items: this.iclogoGrid
                    }
                ]

            }
        ];


        this.on("itemSaved", this._onItemSaved, this);
        this.callParent();

    },
    _onItemSaved: function (record)
    {
        this.iclogoGrid.bindStore(record.icLogos());
    },
    onFileUploaded: function (response)
    {
        this.iclogoGrid.getStore().add(response);
    },
    uploadImage: function ()
    {
        var j = Ext.create("PartKeepr.FileUploadDialog", {imageUpload: true});
        j.on("fileUploaded", Ext.bind(this.onFileUploaded, this));
        j.show();
    },
    deleteImage: function ()
    {
        this.iclogoGrid.getStore().remove(this.iclogoGrid.getSelectionModel().getLastSelected());
    },
    onEditStart: function ()
    {
        var store = this.record.icLogos();
        this.iclogoGrid.bindStore(store);
    }
});

Ext.define('PartKeepr.PartMeasurementUnitEditor', {
	extend: 'PartKeepr.Editor',
	alias: 'widget.PartMeasurementUnitEditor',
	items: [{
		xtype: 'textfield',
		name: 'name',
		fieldLabel: i18n("Measurement Unit Name")
	},{
		xtype: 'textfield',
		name: 'shortName',
		fieldLabel: i18n("Short Name")
	}],
	saveText: i18n("Save Part Measurement Unit")
});

Ext.define('PartKeepr.UnitEditor', {
	extend: 'PartKeepr.Editor',
	alias: 'widget.UnitEditor',
	saveText: i18n("Save Unit"),
	initComponent: function () {
		
		var sm = Ext.create('Ext.selection.CheckboxModel',{
			checkOnly: true
		});
		
		this.gridPanel = Ext.create("PartKeepr.BaseGrid", {
			store: PartKeepr.getApplication().getSiPrefixStore(),
			selModel: sm,
			columnLines: true,
			columns: [
			          { text: i18n("Prefix"), dataIndex: "prefix", width: 60 },
			          { text: i18n("Symbol"), dataIndex: "symbol", width: 60 },
			          { text: i18n("Power"), dataIndex: "exponent", flex: 1, renderer: function (value) { return "10<sup>"+value+"</sup>"; } }
			          ]
		});

		var container = Ext.create("Ext.form.FieldContainer", {
			fieldLabel: i18n("Allowed SI-Prefixes"),
			labelWidth: 150,
			items: this.gridPanel
		});
		
		this.items = [{
				xtype: 'textfield',
				name: 'name',
				fieldLabel: i18n("Unit Name")
			},{
				xtype: 'textfield',
				name: 'symbol',
				fieldLabel: i18n("Symbol")
			},
			container];
		
		this.callParent();
		
		this.on("startEdit", this.onStartEdit, this);
		this.on("itemSave", this.onItemSave, this);
	},
	onStartEdit: function () {
		var records = this.record.prefixes().getRange();
		var toSelect = [];
		var pfxStore = PartKeepr.getApplication().getSiPrefixStore();
		
		for (var i=0;i<records.length;i++) {
			toSelect.push(pfxStore.getById(records[i].getId()));
		}

		this.gridPanel.getSelectionModel().select(toSelect);
	},
	onItemSave: function () {
		var selection = this.gridPanel.getSelectionModel().getSelection();
		
		this.record.prefixes().removeAll(true);
		
		for (var i=0;i<selection.length;i++) {
			this.record.prefixes().add(selection[i]);
		}
	}
});

Ext.define('PartKeepr.FootprintEditor', {
	extend: 'PartKeepr.Editor',
	alias: 'widget.FootprintEditor',
	saveText: i18n("Save Footprint"),
	layout: 'column',
	defaultListenerScope: true,
	syncDirect: true,
	labelWidth: 75,
	initComponent: function () {
		this.on("startEdit", this.onEditStart, this, { delay: 50 });
		
		this.attachmentGrid = Ext.create("PartKeepr.FootprintAttachmentGrid", {
			height: 200,
			width: '100%',
			border: true
		});
		
		this.items = [{
			columnWidth: 1,
			minWidth: 500,
			layout: 'anchor',
			xtype: 'container',
			margin: '0 5 0 0',
			items: [				
							{
								xtype: 'textfield',
								name: 'name',
								labelWidth: 75,
								anchor: '100%',
								fieldLabel: i18n("Name")
							},{
								labelWidth: 75,
								xtype: 'textarea',
								name: 'description',
								anchor: '100%',
								fieldLabel: i18n("Description")
							},{
								labelWidth: 75,
								xtype: 'fieldcontainer',
								anchor: '100%',
								fieldLabel: i18n("Attachments"),
								items: this.attachmentGrid
							}
				        ]
			},{
				width: 370,
				height: 250,
				xtype: 'fieldcontainer',
				items: {
					xtype: 'remoteimagefield',
					itemId: 'image',
					maxHeight: 256,
					maxWidth: 256,
					listeners: {
						'fileUploaded': "onFileUploaded"
					}
				},
				labelWidth: 75,
				fieldLabel: i18n("Image")

			}];
		
		this.on("itemSaved", this._onItemSaved, this);
		this.callParent();
	},
	onFileUploaded: function (data) {
		var uploadedFile = Ext.create("PartKeepr.UploadedFileBundle.Entity.TempUploadedFile", data);

		if (this.record.getImage() === null) {
			this.record.setImage(data);
		} else {
			this.record.getImage().set("replacement", uploadedFile.getId());
		}

		this.down('#image').setValue(uploadedFile);
	},
	_onItemSaved: function (record) {
		this.attachmentGrid.bindStore(record.attachments());
	},
	onEditStart: function () {
		var store = this.record.attachments();
		this.attachmentGrid.bindStore(store);
		this.down('#image').setValue(this.record.getImage());

	}
});

Ext.define('PartKeepr.UserEditor', {
    extend: 'PartKeepr.Editor',
    alias: 'widget.UserEditor',

    saveText: i18n("Save User"),
    titleProperty: 'username',

    initComponent: function ()
    {
        this.items = [
            {
                xtype: 'textfield',
                name: 'username',
                regex: /^[a-zA-Za0-9.\-_\/\\]{3,50}$/,
                regexText: i18n("The username must be 3-50 characters in length and may only contain the following characters: a-z, A-Z, 0-9, an underscore (_), a backslash (\), a slash (/), a dot (.) or a dash (-)"),
                fieldLabel: i18n("User")
            }, {
                xtype: 'textfield',
                name: 'email',
                vtype: 'email',
                fieldLabel: i18n("E-Mail")
            }, {
                xtype: 'textfield',
                inputType: "password",
                name: 'newPassword',
                fieldLabel: i18n("Password")
            }, {
                xtype: 'displayfield',
                itemId: 'legacyField',
                fieldLabel: i18n("Legacy User"),
                value: i18n(
                    'This user is a legacy user. You must provide a password in order to change the user. Please read <a href="https://wiki.partkeepr.org/wiki/Authentication" target="_blank">the PartKeepr Wiki regarding Authentication</a> for further information.'),
                hidden: true
            }, {
                xtype: 'checkbox',
                itemId: 'activeCheckbox',
                fieldLabel: i18n("Active"),
                name: "active",
                hidden: true
            }, {
                value: i18n("This is a protected user, which may not be changed"),
                xtype: 'displayfield',
                itemId: 'protectedNotice',
                hidden: true
            }
        ];

        this.on("startEdit", this.onStartEdit, this, {delay: 200});
        this.callParent();
    },
    onStartEdit: function ()
    {
        if (this.record.get("protected") === true) {
            this.items.each(function (item) {
                if (item instanceof Ext.form.field.Base && !(item instanceof Ext.form.field.Display)) {
                    item.disable();
                }
            });
            this.saveButton.disable();
        } else {
            this.items.each(function (item) {
                if (item instanceof Ext.form.field.Base && !(item instanceof Ext.form.field.Display)) {
                    item.enable();
                }
            });
            this.saveButton.enable();
        }

        var isBuiltInProvider = this.record.getProvider() !== null &&
            this.record.getProvider().get("type") === "Builtin" &&
            this.record.get("legacy") === false;

        if (isBuiltInProvider || this.record.phantom === true) {
            this.down("#activeCheckbox").setVisible(true);
        } else {
            this.down("#activeCheckbox").setVisible(false);
        }

        if (this.record.phantom) {
            this.down("#activeCheckbox").setValue(true);
        }

        if (this.record.get("protected") === true) {
            this.down("#protectedNotice").setVisible(true);
        } else {
            this.down("#protectedNotice").setVisible(false);
        }

        if (this.record.get("legacy") === true) {
            this.down("#legacyField").setVisible(true);
        } else {
            this.down("#legacyField").setVisible(false);
        }
    }
});

/**
 * Represents the system notice editor
 */
Ext.define('PartKeepr.SystemNoticeEditor', {
    extend: 'PartKeepr.Editor',
    alias: 'widget.SystemNoticeEditor',

    // Various style configurations
    saveText: i18n("Save System Notice"),
    defaults: {
        anchor: '100%',
        labelWidth: 110
    },
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    enableButtons: false,

    /**
     * Initializes the component
     */
    initComponent: function ()
    {

        this.acknowledgeButton = Ext.create("Ext.button.Button", {
            text: i18n("Acknowledge Notice"),
            iconCls: 'web-icon accept'
        });

        this.acknowledgeButton.on("click", this.onAcknowledgeClick, this);

        this.bottomToolbar = Ext.create("Ext.toolbar.Toolbar", {
            enableOverflow: true,
            margin: '10px',
            defaults: {minWidth: 100},
            dock: 'bottom',
            ui: 'footer',
            items: [this.acknowledgeButton]
        });

        this.dockedItems = new Array(this.bottomToolbar);

        this.items = [
            {
                xtype: 'textfield',
                readOnly: true,
                name: 'title',
                fieldLabel: i18n("Title")
            }, {
                xtype: 'textarea',
                readOnly: true,
                flex: 1,
                name: 'description',
                fieldLabel: i18n("Description")
            }, {
                xtype: 'datefield',
                readOnly: true,
                hideTrigger: true,
                name: 'date',
                fieldLabel: i18n("Date")
            }
        ];

        this.callParent();
    },
    onAcknowledgeClick: function ()
    {
        this.record.callPutAction("acknowledge", [], Ext.bind(this.onAcknowledged, this));
    },
    onAcknowledged: function ()
    {
        this.fireEvent("editorClose", this);
        this.store.load();
    }
});

Ext.define('PartKeepr.StorageLocationEditor', {
    extend: 'PartKeepr.Editor',
    alias: 'widget.StorageLocationEditor',
    saveText: i18n("Save Storage Location"),

    layout: 'column',
    defaultListenerScope: true,

    initComponent: function ()
    {
        var config = {};

        Ext.Object.merge(config, {
            autoLoad: false,
            model: "PartKeepr.PartBundle.Entity.Part",
            autoSync: false, // Do not change. If true, new (empty) records would be immediately commited to the database.
            remoteFilter: true,
            remoteSort: true,
            pageSize: 15
        });

        this.store = Ext.create('Ext.data.Store', config);

        this.bottomToolbar = Ext.create("PartKeepr.PagingToolbar", {
            store: this.store,
            enableOverflow: true,
            dock: 'bottom',
            displayInfo: false
        });

        this.gridPanel = Ext.create("PartKeepr.BaseGrid", {
            store: this.store,
            columnLines: true,
            dockedItems: [this.bottomToolbar],
            columns: [
                {
                    header: i18n("Name"),
                    dataIndex: 'name',
                    flex: 1,
                    minWidth: 200,
                    renderer: Ext.util.Format.htmlEncode
                },
                {
                    header: i18n("Qty"),
                    width: 50,
                    dataIndex: 'stockLevel'
                }
            ]
        });

        var container = Ext.create("Ext.form.FieldContainer", {
            fieldLabel: i18n("Contained Parts"),
            labelWidth: 110,
            layout: 'fit',
            height: 246,
            itemId: 'containedParts',
            items: this.gridPanel
        });


        this.items = [
            {
                columnWidth: 1,
                minWidth: 500,
                layout: 'anchor',
                xtype: 'container',
                margin: '0 5 0 0',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        anchor: '100%',
                        labelWidth: 110,
                        fieldLabel: i18n("Storage Location")
                    },
                    container
                ]
            }, {
                width: 370,
                height: 250,
                xtype: 'fieldcontainer',
                items: {
                    xtype: 'remoteimagefield',
                    itemId: 'image',
                    maxHeight: 256,
                    maxWidth: 256,
                    listeners: {
                        'fileUploaded': "onFileUploaded"
                    }
                },
                labelWidth: 75,
                fieldLabel: i18n("Image")
            }
        ];

        this.on("startEdit", this.onStartEdit, this);
        this.callParent();
    },
    onFileUploaded: function (data)
    {
        var uploadedFile = Ext.create("PartKeepr.UploadedFileBundle.Entity.TempUploadedFile", data);

        if (this.record.getImage() === null) {
            this.record.setImage(data);
        } else {
            this.record.getImage().set("replacement", uploadedFile.getId());
        }

        this.down('#image').setValue(uploadedFile);
    },
    /**
     * Gets called as soon as storage location editing begins.
     */
    onStartEdit: function ()
    {
        if (!this.record.phantom) {
            this.down('#containedParts').setVisible(true);
            var filter = Ext.create("Ext.util.Filter", {
                property: "storageLocation",
                operator: "=",
                value: this.record.getId()
            });

            this.store.addFilter(filter);
            this.store.load();
        } else {
            this.down('#containedParts').setVisible(false);
        }


        this.down('#image').setValue(this.record.getImage());
    }
});

/**
 * Represents the project editor view
 */
Ext.define('PartKeepr.ProjectEditor', {
    extend: 'PartKeepr.Editor',
    alias: 'widget.ProjectEditor',

    // Various style configurations
    saveText: i18n("Save Project"),
    defaults: {
        anchor: '100%',
        labelWidth: 110
    },
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },

    /**
     * Initializes the component
     */
    initComponent: function ()
    {
        /**
         * Due to an ExtJS issue, we need to delay the event
         * for a bit.
         *
         * @todo Fix this in a cleaner way
         */
        this.on("startEdit", this.onEditStart, this, {
            delay: 200
        });

        this.on("itemSaved", this._onItemSaved, this);

        var config = {};

        // Build the initial (empty) store for the project parts
        Ext.Object.merge(config, {
            autoLoad: false,
            model: "PartKeepr.ProjectBundle.Entity.ProjectPart",
            autoSync: false, // Do not change. If true, new (empty) records would be immediately committed to the database.
            remoteFilter: false,
            remoteSort: false
        });

        this.store = Ext.create('Ext.data.Store', config);

        this.partGrid = Ext.create("PartKeepr.ProjectPartGrid", {
            store: this.store,
            listeners: {
                edit: this.onProjectGridEdit
            }
        });

        var container = Ext.create("Ext.form.FieldContainer", {
            fieldLabel: i18n("Project Parts"),
            labelWidth: 110,
            layout: 'fit',
            flex: 1,
            items: this.partGrid
        });

        this.attachmentGrid = Ext.create("PartKeepr.ProjectAttachmentGrid", {
            border: true
        });

        var container2 = Ext.create("Ext.form.FieldContainer", {
            fieldLabel: i18n("Attachments"),
            labelWidth: 110,
            layout: 'fit',
            flex: 1,
            items: this.attachmentGrid
        });

        this.items = [
            {
                xtype: 'textfield',
                name: 'name',
                height: 20,
                fieldLabel: i18n("Project Name")
            }, {
                xtype: 'textarea',
                name: 'description',
                fieldLabel: i18n("Project Description"),
                height: 70
            },
            container,
            container2
        ];
        this.callParent();

    },
    /**
     * Handle transparent setting of the part name after a value was selected from the combobox
     */
    onProjectGridEdit: function (editor, e)
    {
        if (e.field == "part_id") {
            /**
             * If the user cancelled the editing, set the field to the original value
             */
            if (e.value === null) {
                e.record.set("part_id", e.originalValue);
            }

            /**
             * Inject the name into the record
             */
            var rec = e.column.getEditor().store.getById(e.value);
            if (rec) {
                e.record.set("part_name", rec.get("name"));
            }
        }
    },
    /**
     * Re-bind the store after an item was saved
     */
    _onItemSaved: function (record)
    {
        this.partGrid.bindStore(record.parts());
        this.attachmentGrid.bindStore(record.attachments());
    },
    /**
     * Bind the store as soon as the view was rendered.
     *
     * @todo This is a hack, because invocation of this method is delayed.
     */
    onEditStart: function ()
    {
        var store = this.record.parts();
        this.partGrid.bindStore(store);

        var store2 = this.record.attachments();
        this.attachmentGrid.bindStore(store2);
    }
});

/**
 * @class PartKeepr.EditorComponent

 * <p>The EditorComponent encapsulates an editing workflow. In general, we have four actions
 * for each object: create, update, delete, view. These actions stay exactly the same for each
 * distinct object.</p>
 * <p>The EditorComponent is a border layout, which has a navigation and an editor area.</p>
 * @todo Document the editor system a bit better
 */
Ext.define('PartKeepr.EditorComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.EditorComponent',

    /**
     * Misc layout settings
     */
    layout: 'border',
    padding: 5,
    border: false,

    /**
     * Specifies the class name of the navigation. The navigation is placed in the "west" region
     * and needs to fire the event "itemSelect". The component listens on that event and
     * creates an editor based on the selected record.
     */
    navigationClass: null,

    /**
     * Specifies the class name of the editor.
     */
    editorClass: null,

    /**
     * Contains the store for the item overview.
     */
    store: null,

    /**
     * Contains the associated model to load a record for.
     */
    model: null,

    /**
     * Defines the store to use. Defaults to {Ext.data.Store}
     */
    storeType: "Ext.data.Store",

    /**
     * Some default text messages. Can be overridden by sub classes.
     */
    deleteMessage: i18n("Do you really wish to delete the item %s?"),
    deleteTitle: i18n("Delete Item"),
    newItemText: i18n("New Item"),

    /**
     * @var {string} The record field to read the title property from
     */
    titleProperty: 'name',

    initComponent: function ()
    {

        /**
         * Create the navigation panel
         */
        this.navigation = Ext.create(this.navigationClass, {
            region: 'west',
            width: 300,
            split: true,
            store: this.store,
            titleProperty: this.titleProperty
        });

        this.navigation.on("itemAdd", this.newRecord, this);
        this.navigation.on("itemDelete", this.confirmDelete, this);
        this.navigation.on("itemEdit", this.startEdit, this);

        /**
         * Create the editor panel
         */
        this.editorTabPanel = Ext.create("Ext.tab.Panel", {
            region: "center",
            layout: 'fit',
            plugins: Ext.create('Ext.ux.TabCloseMenu')
        });

        this.items = [this.navigation, this.editorTabPanel];

        this.callParent();
    },
    /**
     * Creates a new record. Creates a new instance of the editor.
     */
    newRecord: function (defaults)
    {
        Ext.apply(defaults, {});

        var editor = this.createEditor(this.newItemText);
        editor.newItem(defaults);
        this.editorTabPanel.add(editor).show();
    },
    /**
     * Instructs the component to edit a new record.
     * @param {Record} record The record to edit
     */
    startEdit: function (id)
    {
        /* Search for an open editor for the current record. If we
         * already have an editor, show the editor instead of loading
         * a new record.
         */
        var editor = this.findEditor(id);

        if (editor !== null) {
            editor.show();
            return;
        }

        // Still here? OK, we don't have an editor open. Create a new one
        var model = Ext.ClassManager.get(this.model);

        model.load(id, {
            scope: this,
            success: function (record, operation)
            {
                editor = this.createEditor(record.get(this.titleProperty));
                editor.editItem(record);
                this.editorTabPanel.add(editor).show();
            }
        });
    },
    findEditor: function (id)
    {
        for (var i = 0; i < this.editorTabPanel.items.getCount(); i++) {
            if (this.editorTabPanel.items.getAt(i).getRecordId() == id) {
                return this.editorTabPanel.items.getAt(i);
            }
        }

        return null;
    },
    createEditor: function (title)
    {
        var editor = Ext.create(this.editorClass, {
            store: this.store,
            title: title,
            model: this.model,
            closable: true,
            titleProperty: this.titleProperty,
            listeners: {
                editorClose: Ext.bind(function (m)
                {
                    this.editorTabPanel.remove(m);
                }, this)
            }
        });

        editor.on("itemSaved", this.onItemSaved, this);
        return editor;
    },
    confirmDelete: function ()
    {
        var r = this.navigation.getSelectionModel().getLastSelected();
        var recordName;

        recordName = r.get(this.titleProperty);

        Ext.Msg.confirm(
            this.deleteTitle,
            sprintf(this.deleteMessage, recordName),
            function (but)
            {
                if (but == "yes") {
                    this.deleteRecord(r);
                }
            }, this);
    },
    deleteRecord: function (r)
    {
        var editor = this.findEditor(r.getId());

        if (editor !== null) {
            this.editorTabPanel.remove(editor);
        }

        r.erase();
        this.store.load();
    },
    // Creates a store. To be called from child's initComponent
    createStore: function (config)
    {
        Ext.applyIf(config, {
            autoLoad: true,
            model: this.model,
            autoSync: false, // Do not change. If true, new (empty) records would be immediately committed to the database.
            remoteFilter: true,
            remoteSort: true,
            pageSize: 15
        });

        this.store = Ext.create(this.storeType, config);

        // Workaround for bug http://www.sencha.com/forum/showthread.php?133767-Store.sync()-does-not-update-dirty-flag&p=607093#post607093
        this.store.on('write', function (store, operation)
        {
            var success = operation.wasSuccessful();
            if (success) {
                Ext.each(operation.records, function (record)
                {
                    if (record.dirty) {
                        record.commit();
                    }
                });
            }
        });
    },
    getStore: function ()
    {
        return this.store;
    },
    onItemSaved: function (record)
    {
        this.navigation.syncChanges(record);
    }
});

Ext.define('PartKeepr.DistributorEditorComponent', {
	extend: 'PartKeepr.EditorComponent',
	alias: 'widget.DistributorEditorComponent',
	navigationClass: 'PartKeepr.DistributorGrid',
	editorClass: 'PartKeepr.DistributorEditor',
	newItemText: i18n("New Distributor"),
	model: 'PartKeepr.DistributorBundle.Entity.Distributor',
	initComponent: function () {
		this.createStore({
			sorters: [{
	              property: 'name',
	              direction:'ASC'
	          }]
		});
		
		this.callParent();
	},
    statics: {
        iconCls: 'web-icon lorry',
        title: i18n('Distributors'),
        closable: true,
        menuPath: [{text: i18n("Edit")}]
    }
});

Ext.define('PartKeepr.ManufacturerEditorComponent', {
    extend: 'PartKeepr.EditorComponent',
    alias: 'widget.ManufacturerEditorComponent',
    navigationClass: 'PartKeepr.ManufacturerGrid',
    editorClass: 'PartKeepr.ManufacturerEditor',
    newItemText: i18n("New Manufacturer"),
    model: 'PartKeepr.ManufacturerBundle.Entity.Manufacturer',
    initComponent: function ()
    {
        this.createStore({
            sorters: [
                {
                    property: 'name',
                    direction: 'ASC'
                }
            ]
        });

        this.callParent();
    },
    statics: {
        iconCls: 'web-icon building',
        title: i18n('Manufacturers'),
        closable: true,
        menuPath: [{text: i18n("Edit")}]
    }
});

Ext.define('PartKeepr.PartMeasurementUnitEditorComponent', {
	extend: 'PartKeepr.EditorComponent',
	alias: 'widget.PartMeasurementUnitEditorComponent',
	navigationClass: 'PartKeepr.PartMeasurementUnitGrid',
	editorClass: 'PartKeepr.PartMeasurementUnitEditor',
	newItemText: i18n("New Part Measurement Unit"),
	deleteMessage: i18n("Do you really wish to delete the part measurement unit'%s'?"),
	deleteTitle: i18n("Delete Part Measurement Unit"),
	model: 'PartKeepr.PartBundle.Entity.PartMeasurementUnit',
	initComponent: function () {
		this.createStore({
			sorters: [{
				property: 'name',
				direction:'ASC'
	          }]
		});
		
		this.callParent();
	},
    statics: {
        iconCls: 'fugue-icon ruler',
        title: i18n('Part Measurement Units'),
        closable: true,
        menuPath: [{text: i18n("Edit")}]
    }
});

Ext.define('PartKeepr.UnitEditorComponent', {
	extend: 'PartKeepr.EditorComponent',
	alias: 'widget.UnitEditorComponent',
	navigationClass: 'PartKeepr.UnitGrid',
	editorClass: 'PartKeepr.UnitEditor',
	newItemText: i18n("New Unit"),
	deleteMessage: i18n("Do you really wish to delete the unit'%s'?"),
	deleteTitle: i18n("Delete Unit"),
	model: 'PartKeepr.UnitBundle.Entity.Unit',
	initComponent: function () {
		this.createStore({
			sorters: [{
				property: 'name',
				direction:'ASC'
	          }]
		});
		
		this.callParent();
	},
    statics: {
        iconCls: 'partkeepr-icon unit',
        title: i18n('Units'),
        closable: true,
        menuPath: [{text: i18n("Edit")}]
    }
});

Ext.define('PartKeepr.FootprintEditorComponent', {
    extend: 'PartKeepr.EditorComponent',
    alias: 'widget.FootprintEditorComponent',
    navigationClass: 'PartKeepr.FootprintNavigation',
    editorClass: 'PartKeepr.FootprintEditor',
    newItemText: i18n("New Footprint"),
    model: 'PartKeepr.FootprintBundle.Entity.Footprint',
    initComponent: function () {
        this.createStore({
			sorters: [
                {
                    property: 'category.categoryPath',
                    direction: 'ASC'
                },{
                    property: 'name',
                    direction:'ASC'
                }
        ],
            groupField: 'categoryPath'
		});

        this.callParent();
    },
    statics: {
        iconCls: 'fugue-icon fingerprint',
        title: i18n('Footprints'),
        closable: true,
        menuPath: [{ text: i18n("Edit")}]
    }
});

Ext.define("PartKeepr.FootprintNavigation", {
    extend: 'Ext.panel.Panel',

    layout: 'border',

    /**
     * @var {Ext.data.Store}
     */
    store: null,
    items: [
        {
            xtype: 'partkeepr.FootprintTree',
            region: 'center',
            rootVisible: false
        }, {
            xtype: 'partkeepr.FootprintGrid',
            resizable: true,
            split: true,
            region: 'south',
            height: "50%",
            titleProperty: "name",
            viewConfig: {
                plugins: {
                    ddGroup: 'FootprintCategoryTree',
                    ptype: 'gridviewdragdrop',
                    enableDrop: false
                }
            },
            enableDragDrop: true
        }
    ],

    initComponent: function ()
    {
        this.callParent(arguments);

        this.down("partkeepr\\.FootprintTree").on("itemclick", this.onCategoryClick, this);
        this.down("partkeepr\\.FootprintGrid").setStore(this.store);
        this.down("partkeepr\\.FootprintGrid").on("itemAdd", this.onAddFootprint, this);
        this.down("partkeepr\\.FootprintGrid").on("itemDelete", function (id)
            {
                this.fireEvent("itemDelete", id);
            }, this
        );
        this.down("partkeepr\\.FootprintGrid").on("itemEdit", function (id)
            {
                this.fireEvent("itemEdit", id);
            }, this
        );

    },
    /**
     * Applies the category filter to the store when a category is selected
     *
     * @param {Ext.tree.View} tree The tree view
     * @param {Ext.data.Model} record the selected record
     */
    onCategoryClick: function (tree, record)
    {
        var filter = Ext.create("Ext.util.Filter", {
            property: 'category',
            operator: 'IN',
            value: this.getChildrenIds(record)
        });

        this.store.addFilter(filter);
    },
    /**
     * Returns the ID for this node and all child nodes
     *
     * @param {Ext.data.Model} The node
     * @return Array
     */
    getChildrenIds: function (node)
    {
        var childNodes = [node.getId()];

        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++) {
                childNodes = childNodes.concat(this.getChildrenIds(node.childNodes[i]));
            }
        }

        return childNodes;
    },
    /**
     * Called when a footprint is about to be added. This prepares the to-be-edited record with the proper category id.
     */
    onAddFootprint: function ()
    {
        var selection = this.down("partkeepr\\.FootprintTree").getSelection();

        var category;
        if (selection.length === 0) {
            category = this.down("partkeepr\\.FootprintTree").getRootNode().firstChild.getId();
        } else {
            var item = selection.shift();
            category = item.getId();
        }

        this.fireEvent("itemAdd", {
            category: category
        });
    },
    /**
     * Triggers a reload of the store when an edited record affects the store
     */
    syncChanges: function ()
    {
        this.down("partkeepr\\.FootprintGrid").getStore().load();
    },
    /**
     * Returns the selection model of the footprint grid
     * @return {Ext.selection.Model} The selection model
     */
    getSelectionModel: function ()
    {
        "use strict";
        return this.down("partkeepr\\.FootprintGrid").getSelectionModel();
    }


});

Ext.define('PartKeepr.FootprintGrid', {
    extend: 'PartKeepr.EditorGrid',
    xtype: 'partkeepr.FootprintGrid',
    columns: [
        {header: i18n("Footprint"), dataIndex: 'name', flex: 1}
    ],
    addButtonText: i18n("Add Footprint"),
    addButtonIconCls: 'partkeepr-icon footprint_add',
    deleteButtonText: i18n("Delete Footprint"),
    deleteButtonIconCls: 'partkeepr-icon footprint_delete',
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: '{name} ({children.length})',
            enableNoGroups: true
        }
    ]
});

Ext.define('PartKeepr.UserEditorComponent', {
    extend: 'PartKeepr.EditorComponent',
    alias: 'widget.UserEditorComponent',
    navigationClass: 'PartKeepr.UserGrid',
    editorClass: 'PartKeepr.UserEditor',
    newItemText: i18n("New User"),
    deleteMessage: i18n("Do you really wish to delete the user '%s'?"),
    deleteTitle: i18n("Delete User"),

    model: 'PartKeepr.AuthBundle.Entity.User',

    titleProperty: 'username',

    initComponent: function ()
    {
        this.createStore({
            sorters: [
                {
                    property: 'username',
                    direction: 'ASC'
                }
            ],
            autoLoad: false
        });

        this.callParent();
    },
    statics: {
        iconCls: 'web-icon user',
        title: i18n('Users'),
        closable: true,
        menuPath: [{text: i18n("Edit")}]
    }
});

/**
 * Represents the system notice editor component
 */
Ext.define('PartKeepr.SystemNoticeEditorComponent', {
    extend: 'PartKeepr.EditorComponent',
    alias: 'widget.SystemNoticeEditorComponent',
    navigationClass: 'PartKeepr.SystemNoticeGrid',
    editorClass: 'PartKeepr.SystemNoticeEditor',
    newItemText: i18n("New System Notice"),
    model: 'PartKeepr.CoreBundle.Entity.SystemNotice',
    titleProperty: "title",
    initComponent: function ()
    {
        this.createStore({
            filters: [
                {
                    property: 'acknowledged',
                    operator: "=",
                    value: false
                }
            ],
            sorters: [
                {
                    property: 'date',
                    direction: 'DESC'
                },

            ]
        });

        this.callParent();
    },
    statics: {
        iconCls: 'fugue-icon service-bell',
        title: i18n('System Notices'),
        closable: true,
        menuPath: [{text: i18n("View")}]
    }
});

Ext.define('PartKeepr.StorageLocationEditorComponent', {
	extend: 'PartKeepr.EditorComponent',
	alias: 'widget.StorageLocationEditorComponent',
	navigationClass: 'PartKeepr.StorageLocationNavigation',
	editorClass: 'PartKeepr.StorageLocationEditor',
	newItemText: i18n("New Storage Location"),
	model: 'PartKeepr.StorageLocationBundle.Entity.StorageLocation',
	initComponent: function () {
		this.createStore({
			sorters: [
                {
                    property: 'category.categoryPath',
                    direction: 'ASC'
                },{
                    property: 'name',
                    direction:'ASC'
                }
        ],
            groupField: 'categoryPath'
		});
		
		this.callParent();
	},
    statics: {
        iconCls: 'fugue-icon wooden-box',
        title: i18n('Storage Locations'),
        closable: true,
        menuPath: [{text: i18n("Edit")}]
    }
});

/**
 * Represents the project editor component
 */
Ext.define('PartKeepr.ProjectEditorComponent', {
    extend: 'PartKeepr.EditorComponent',
    alias: 'widget.ProjectEditorComponent',
    navigationClass: 'PartKeepr.ProjectGrid',
    editorClass: 'PartKeepr.ProjectEditor',
    newItemText: i18n("New Project"),
    model: 'PartKeepr.ProjectBundle.Entity.Project',
    initComponent: function ()
    {
        this.createStore({
            sorters: [
                {
                    property: 'name',
                    direction: 'ASC'
                }
            ]
        });

        this.callParent();
    },
    statics: {
        iconCls: 'fugue-icon drill',
        title: i18n('Projects'),
        closable: true,
        menuPath: [{ text: i18n("Edit")}]
    }
});

/**
 * Represents the multi create window.
 * @class PartKeepr.StorageLocationMultiCreateWindow
 */
Ext.define("PartKeepr.StorageLocationMultiCreateWindow", {
    extend: 'Ext.Window',

    // Layout stuff
    layout: 'fit',
    width: 500,
    height: 250,

    // Title
    title: i18n("Multi-Create Storage Locations"),

    /**
     * Initializes the window by adding the buttons and the form
     */
    initComponent: function () {
        this.form = Ext.create("PartKeepr.StorageLocationMultiAddDialog");

        this.items = [this.form];

        // Creates the add button as instance, so we can disable it easily.
        this.addButton = Ext.create("Ext.button.Button", {
            text: i18n("Create Storage Locations"),
            iconCls: 'web-icon add',
            handler: this.onAddClick,
            scope: this
        });

        this.dockedItems = [{
            xtype: 'toolbar',
            defaults: {minWidth: 100},
            dock: 'bottom',
            ui: 'footer',
            pack: 'start',
            items: [this.addButton,
                {
                    text: i18n("Close"),
                    handler: this.onCloseClick,
                    scope: this,
                    iconCls: 'web-icon cancel'
                }]
        }];

        this.callParent();
    },
    /**
     * Called when the "Add" button was clicked. Sends a call to the server
     * to create the storage locations
     */
    onAddClick: function () {
        this.addButton.disable();

        var storageLocations = this.form.getStorageLocations();

        for (var i=0;i<storageLocations.length;i++) {
            var j = Ext.create("PartKeepr.StorageLocationBundle.Entity.StorageLocation");
            j.setCategory(this.category);
            j.set("name", storageLocations[i]);


            if (i == storageLocations.length -1) {
                j.save({
                    scope: this,
                    success: function (a) {
                        this.close();
                    }
                });
            } else {
                j.save();
            }
        }
    },
    /**
     * Called when the service call was completed. Displays an error dialog
     * if something went wrong.
     * @param response The server response
     */
    onAdded: function (response) {
        this.addButton.enable();

        if (response.data.length > 0) {
            Ext.Msg.alert(i18n("Errors occured"), implode("<br>", response.data));
        } else {
            this.close();
        }
    },
    /**
     * Close the dialog
     */
    onCloseClick: function () {
        this.close();
    }

});

/**
 * Represents a form which is used to create multiple storage locations at once.
 * @class PartKeepr.StorageLocationMultiAddDialog
 */
Ext.define('PartKeepr.StorageLocationMultiAddDialog', {
    extend: 'Ext.form.Panel',

    // Layout settings
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    defaults: {
        border: false
    },

    bodyPadding: 5,

    /**
     * Initializes the component. Adds all form fields
     */
    initComponent: function () {

        /**
         * The prefix represents the first part of the storage location name,
         * e.g. "A" for storage locations "A0001".
         */
        this.storageLocationPrefix = Ext.create("Ext.form.field.Text", {
            fieldLabel: i18n("Name Prefix"),
            listeners: {
                change: {
                    fn: this.onFormChange,
                    scope: this
                }
            }
        });

        /**
         * Specifies the start of the numeric range.
         */
        this.storageLocationStart = Ext.create("Ext.form.field.Number", {
            fieldLabel: i18n("Start"),
            flex: 1,
            value: 1,
            minValue: 0,
            listeners: {
                change: {
                    fn: this.onFormChange,
                    scope: this
                }
            }
        });

        /**
         * Specifies the end of the numeric range.
         */
        this.storageLocationEnd = Ext.create("Ext.form.field.Number", {
            fieldLabel: i18n("End"),
            flex: 1,
            anchor: '100%',
            value: 10,
            minValue: 1,
            listeners: {
                change: {
                    fn: this.onFormChange,
                    scope: this
                }
            }
        });

        /**
         * Specifies if the storage locations should be prefixed with a zero (e.g. creates A0001 instead of A1).
         */
        this.storageLocationZeroPrefix = Ext.create("Ext.form.field.Checkbox", {
            boxLabel: i18n("Prefix with zeroes"),
            flex: 1,
            hideEmptyLabel: false,
            listeners: {
                change: {
                    fn: this.onFormChange,
                    scope: this
                }
            }
        });

        /**
         * Specifies the overall length of the storage location name. If you have a prefix "A" and numbers up to
         * 100, you can set the overall length to 5 to achieve "A0100", or to 6 to achieve "A00100".
         */
        this.storageLocationOverallLength = Ext.create("Ext.form.field.Number", {
            fieldLabel: i18n("Length"),
            flex: 1,
            disabled: true,
            listeners: {
                change: {
                    fn: this.onFormChange,
                    scope: this
                }
            }
        });

        /**
         * Creates a field which displays the storage locations to be created.
         */
        this.outputField = Ext.create("Ext.form.field.TextArea", {
            fieldLabel: i18n("Sample"),
            readOnly: true,
            flex: 1
        });

        this.items = [
            this.storageLocationPrefix,
            {
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    this.storageLocationStart,
                    this.storageLocationEnd
                ]
            },
            {
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    this.storageLocationZeroPrefix,
                    this.storageLocationOverallLength
                ]
            },
            this.outputField
        ];

        this.callParent();

        this.recalculateDemo();
    },
    /**
     * Called when something in the form has changed.
     */
    onFormChange: function () {
        /**
         * If the overall length is less than the prefix plus the length of the highest number, update it
         */
        if (this.storageLocationOverallLength.getValue() < this.getMinLength()) {
            this.storageLocationOverallLength.setValue(this.getMinLength());
        }

        /**
         * Make sure that the end value is bigger than the start value.
         */
        if (this.storageLocationStart.getValue() > this.storageLocationEnd.getValue()) {
            this.storageLocationEnd.setValue(this.storageLocationStart.getValue());
        }

        /**
         * Enable/Disable the length field if zero prefix is wanted
         */
        if (this.storageLocationZeroPrefix.getValue()) {
            this.storageLocationOverallLength.enable();
        } else {
            this.storageLocationOverallLength.disable();
        }

        this.recalculateDemo();
    },
    /**
     * Calculates the minimum length possible
     * @returns int The minimum length possible
     */
    getMinLength: function () {
        return strlen(this.storageLocationPrefix.getValue()) +
            strlen((this.storageLocationEnd.getValue()).toString());
    },
    /**
     * Updates the sample field
     */
    recalculateDemo: function () {
        this.outputField.setValue(implode("\n", this.getStorageLocations()));
    },
    /**
     * Returns all storage locations which are to be created
     * @returns {Array} The storage locations
     */
    getStorageLocations: function () {
        var j = [];

        for (var i = this.storageLocationStart.getValue(); i < this.storageLocationEnd.getValue() + 1; i++) {
            if (!this.storageLocationZeroPrefix.getValue()) {
                // No padding wanted
                j.push(this.storageLocationPrefix.getValue() + i);
            } else {
                var padLength = this.storageLocationOverallLength.getValue() -
                    ( strlen(this.storageLocationPrefix.getValue()) +
                    strlen(i));

                j.push(this.storageLocationPrefix.getValue() + str_repeat("0", padLength) + i);
            }

        }

        return j;
    }

});
Ext.define("PartKeepr.StorageLocationNavigation", {
    extend: 'Ext.panel.Panel',

    layout: 'border',

    /**
     * @var {Ext.data.Store}
     */
    store: null,
    verticalLayout: false,
    dragAndDrop: true,
    categoryEditActions: true,
    itemEditActions: true,
    editItemAsObject: false,

    initComponent: function ()
    {
        var gridConfig = {
            xtype: 'partkeepr.StorageLocationGrid',
            resizable: true,
            split: true,
            titleProperty: "name"
        };

        if (this.verticalLayout) {
            gridConfig.region = "east";
            gridConfig.width = "75%";
        } else {
            gridConfig.region = "south";
            gridConfig.height = "50%";
        }

        if (this.dragAndDrop) {
            gridConfig.viewConfig = {
                plugins: {
                    ddGroup: 'StorageLocationTree',
                    ptype: 'gridviewdragdrop',
                    enableDrop: false
                }
            };

            gridConfig.enableDragDrop = true;
        }

        gridConfig.enableEditing = this.itemEditActions;
        gridConfig.editItemAsObject = this.editItemAsObject;

        this.items = [
            {
                xtype: 'partkeepr.StorageLocationTree',
                region: 'center',
                categoryEditActions: this.categoryEditActions
            }, gridConfig
        ];

        this.callParent(arguments);

        this.getTree().on("itemclick", this.onCategoryClick, this);
        this.getGrid().setStore(this.store);

        this.getGrid().on("storageLocationMultiAdd", this.onMultiAddStorageLocation,
            this);
        this.getGrid().on("itemAdd", this.onAddStorageLocation, this);
        this.getGrid().on("itemDelete", function (id)
            {
                this.fireEvent("itemDelete", id);
            }, this
        );
        this.getGrid().on("itemEdit", function (id)
            {
                this.fireEvent("itemEdit", id);
            }, this
        );
    },
    getGrid: function () {
        return this.down("partkeepr\\.StorageLocationGrid");
    },
    getTree: function () {
        return this.down("partkeepr\\.StorageLocationTree");
    },
    setSearchValue: function (val) {
        var searchField = this.getGrid().searchField;
        searchField.setValue(val);
        searchField.startSearch();
    },
    /**
     * Applies the category filter to the store when a category is selected
     *
     * @param {Ext.tree.View} tree The tree view
     * @param {Ext.data.Model} record the selected record
     */
    onCategoryClick: function (tree, record)
    {
        this.setCategoryFilter(record);
    },
    setCategoryFilter: function (record) {
        var filter = Ext.create("Ext.util.Filter", {
            property: 'category',
            operator: 'IN',
            value: this.getChildrenIds(record)
        });

        this.store.addFilter(filter);

    },
    /**
     * Returns the ID for this node and all child nodes
     *
     * @param {Ext.data.Model} The node
     * @return Array
     */
    getChildrenIds: function (node)
    {
        var childNodes = [node.getId()];

        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++) {
                childNodes = childNodes.concat(this.getChildrenIds(node.childNodes[i]));
            }
        }

        return childNodes;
    },
    /**
     * Called when a storage location is about to be added. This prepares the to-be-edited record with the proper category id.
     */
    onAddStorageLocation: function ()
    {
        var selection = this.getTree().getSelection();

        var category;
        if (selection.length === 0) {
            category = this.getTree().getRootNode().firstChild.getId();
        } else {
            var item = selection.shift();
            category = item.getId();
        }
        this.fireEvent("itemAdd", {
            category: category
        });
    },
    /**
     * Called when a storage location is about to be added. This prepares the to-be-edited record with the proper category id.
     */
    onMultiAddStorageLocation: function ()
    {
        var selection = this.getTree().getSelection();

        var category;
        if (selection.length === 0) {
            category = this.getTree().getRootNode().firstChild.getId();
        } else {
            var item = selection.shift();
            category = item.getId();
        }

        var j = Ext.create("PartKeepr.StorageLocationMultiCreateWindow", {
            category: category,
            listeners: {
                destroy: {
                    fn: this.onMultiCreateWindowDestroy,
                    scope: this
                }
            }
        });
        j.show();

    },
    /**
     * Reloads the store after the multi-create window was closed
     */
    onMultiCreateWindowDestroy: function ()
    {
        this.store.load();
    },
    /**
     * Triggers a reload of the store when an edited record affects the store
     */
    syncChanges: function ()
    {
        this.getGrid().getStore().load();
    },
    /**
     * Returns the selection model of the storage location grid
     * @return {Ext.selection.Model} The selection model
     */
    getSelectionModel: function ()
    {
        return this.getGrid().getSelectionModel();
    }


});

/**
 * Represents the project report view
 */
Ext.define('PartKeepr.ProjectReportView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ProjectReportView',

    bodyStyle: 'background:#DBDBDB;padding: 5px',
    border: false,

    defaults: {
        bodyStyle: 'padding:10px'
    },

    layout: 'border',

    initComponent: function ()
    {
        this.createStores();

        this.upperGridEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        this.reportList = Ext.create("PartKeepr.BaseGrid", {
            selModel: {
                mode: 'MULTI'
            },
            selType: 'checkboxmodel',
            flex: 1,
            columns: [
                {
                    header: i18n("Quantity"), dataIndex: 'quantity',
                    width: 50,
                    editor: {
                        xtype: 'numberfield'
                    }
                }, {
                    header: i18n("Project Name"), dataIndex: 'name',
                    flex: 1
                }, {
                    header: i18n("Description"), dataIndex: 'description',
                    flex: 1
                }
            ],
            store: this.store,
            plugins: [this.upperGridEditing]
        });

        this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                beforeedit: this.onBeforeEdit,
                edit: this.onEdit,
                scope: this
            }
        });

        this.reportResult = Ext.create("PartKeepr.BaseGrid", {
            flex: 1,
            features: [
                {
                    ftype: 'summary'
                }
            ],
            columns: [
                {
                    header: i18n("Quantity"), dataIndex: 'quantity',
                    width: 50
                }, {
                    header: i18n("Part Name"),
                    renderer: function (val, p, rec)
                    {
                        return rec.getPart().get("name");
                    },
                    flex: 1
                }, {
                    header: i18n("Part Description"),
                    renderer: function (val, p, rec)
                    {
                        return rec.getPart().get("description");
                    },
                    flex: 1
                }, {
                    header: i18n("Remarks"),
                    dataIndex: 'remarks',
                    flex: 1
                }, {
                    header: i18n("Projects"),
                    dataIndex: 'projects',
                    flex: 1
                }, {
                    header: i18n("Storage Location"), dataIndex: 'storageLocation_name',
                    width: 100
                }, {
                    header: i18n("Available"), dataIndex: 'available',
                    width: 75
                }, {
                    header: i18n("Distributor"),
                    dataIndex: 'distributor',
                    renderer: function (val, p, rec)
                    {
                        if (rec.getDistributor() !== null) {
                            return rec.getDistributor().get("name");
                        }
                    },
                    flex: 1,
                    editor: {
                        xtype: 'DistributorComboBox',
                        returnObject: true,
                        triggerAction: 'query',
                        ignoreQuery: true,
                        forceSelection: true,
                        editable: false
                    }
                }, {
                    header: i18n("Distributor Order Number"), dataIndex: 'distributor_order_number',
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                }, {
                    header: i18n("Price per Item"), dataIndex: 'price',
                    renderer: PartKeepr.getApplication().formatCurrency,
                    width: 100
                }, {
                    header: i18n("Sum"),
                    dataIndex: 'sum',
                    renderer: PartKeepr.getApplication().formatCurrency,
                    summaryType: 'sum',
                    summaryRenderer: PartKeepr.getApplication().formatCurrency,
                    width: 100
                }, {
                    header: i18n("Amount to Order"), dataIndex: 'missing',
                    width: 100
                }, {
                    header: i18n("Sum (Order)"),
                    dataIndex: 'sum_order',
                    renderer: PartKeepr.getApplication().formatCurrency,
                    summaryType: 'sum',
                    summaryRenderer: PartKeepr.getApplication().formatCurrency,
                    width: 100
                }
            ],
            store: this.projectReportStore,
            plugins: [this.editing],
            bbar: [
                Ext.create("PartKeepr.Exporter.GridExporterButton", {
                    itemId: 'export',
                    genericExporter: false,
                    tooltip: i18n("Export"),
                    iconCls: "fugue-icon application-export",
                    disabled: this.store.isLoading()
                })
            ]
        });

        this.createReportButton = Ext.create('Ext.button.Button', {
            xtype: 'button',
            text: i18n("Create Report"),
            width: 120,
            margins: {
                right: 10
            },
            listeners: {
                click: this.onCreateReportClick,
                scope: this
            }
        });

        this.autoFillButton = Ext.create('Ext.button.Button', {
            text: i18n("Autofill"),
            width: 120,
            margins: {
                right: 20
            },
            listeners: {
                click: this.onAutoFillClick,
                scope: this
            }
        });

        this.removeStockButton = Ext.create('Ext.button.Button', {
            text: i18n("Remove parts from stock"),
            width: 160,
            listeners: {
                click: this.onStockRemovalClick,
                scope: this
            }

        });

        this.items = [
            {
                title: i18n("Choose Projects to create a report for"),
                split: true,
                minHeight: 300,
                height: 300,
                bodyStyle: 'background:#DBDBDB;padding: 10px;',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },
                region: 'north',
                items: [
                    this.reportList,
                    {
                        layout: {
                            type: 'hbox',
                            pack: 'start'
                        },
                        margins: {
                            top: 10
                        },
                        border: false,
                        bodyStyle: 'background:#DBDBDB',
                        items: [
                            this.createReportButton,
                            this.autoFillButton,
                            {xtype: 'tbspacer'},
                            this.removeStockButton
                        ]
                    }
                ]
            }, {
                region: 'center',
                layout: 'fit',
                bodyStyle: 'background:#DBDBDB;padding: 10px;',
                title: i18n("Project Report"),
                items: this.reportResult
            }
        ];


        this.callParent();
    },
    /**
     * Called when the distributor field is about to be edited.
     *
     * Filters the distributor list and show only distributors which are assigned to the particular item.
     * @param e
     */
    onBeforeEdit: function (e, context)
    {
        if (context.field !== "distributor") {
            return;
        }

        var distributors = context.record.getPart().distributors();

        var filterIds = [];
        for (var i = 0; i < distributors.count(); i++) {
            filterIds.push(distributors.getAt(i).getDistributor().getId());
        }

        var filter = Ext.create("Ext.util.Filter", {
            property: "@id",
            operator: 'in',
            value: filterIds
        });

        context.column.getEditor().store.clearFilter();
        context.column.getEditor().store.addFilter(filter);
    },
    /**
     * Removes all parts in the project view.
     */
    onStockRemovalClick: function ()
    {
        Ext.Msg.confirm(i18n("Remove parts from stock"),
            i18n("Do you really want to remove the parts in the project report from the stock?"),
            this.removeStocks, this);
    },
    removeStocks: function (btn)
    {
        if (btn == "yes") {

            var store = this.reportResult.getStore();
            var removals = [];

            for (var i = 0; i < store.count(); i++) {
                var item = store.getAt(i);

                removals.push({
                    part: item.getPart().getId(),
                    amount: item.get("quantity"),
                    comment: item.get("projects")
                });
            }

            PartKeepr.PartBundle.Entity.Part.callPostCollectionAction("massRemoveStock",
                {"removals": Ext.encode(removals)});
        }
    },
    onEdit: function (editor, context)
    {
        if (context.field == "distributor" && context.record.getDistributor() !== null) {
            var partDistributors = context.record.getPart().distributors();

            for (var i = 0; i < partDistributors.count(); i++) {
                if (partDistributors.getAt(i).getDistributor().getId() == context.record.getDistributor().getId()) {
                    context.record.set("price", partDistributors.getAt(i).get("price"));
                    context.record.set("distributor_order_number", partDistributors.getAt(i).get("orderNumber"));
                    context.record.set("sum_order", context.record.get("missing") * context.record.get("price"));
                    context.record.set("sum", context.record.get("quantity") * context.record.get("price"));
                }
            }
        }

        this.reportResult.getView().refresh(true);

    },
    onAutoFillClick: function ()
    {
        var partCount = this.reportResult.store.count();
        var cheapestDistributor, activeDistributor;
        var lowestPrice;
		var firstPositive;
        var activeRecord;

        for (var i = 0; i < partCount; i++) {
            activeRecord = this.reportResult.store.getAt(i);
			firstPositive = true;
			lowestPrice = 0;
			cheapestDistributor = null;

            for (var j = 0; j < activeRecord.getPart().distributors().count(); j++) {
                activeDistributor = activeRecord.getPart().distributors().getAt(j);
				currentPrice = parseFloat(activeDistributor.get("price"));
				
				if (currentPrice != 0) 	{
					if (firstPositive) {
						lowestPrice = currentPrice;
						cheapestDistributor = activeDistributor;
						firstPositive = false;
					}
					else {
						if (currentPrice < lowestPrice) {
							lowestPrice = currentPrice;
							cheapestDistributor = activeDistributor;
						}
					}
				}
            }

            if (cheapestDistributor !== null) {
                activeRecord.setDistributor(cheapestDistributor.getDistributor());
                activeRecord.set("distributor_order_number", cheapestDistributor.get("orderNumber"));
                activeRecord.set("price", cheapestDistributor.get("price"));
                activeRecord.set("sum_order", activeRecord.get("missing") * activeRecord.get("price"));
                activeRecord.set("sum", activeRecord.get("quantity") * activeRecord.get("price"));
            }
        }

        this.reportResult.getView().refresh(true);
    },
    /**
     *
     */
    onCreateReportClick: function ()
    {
        var selection = this.reportList.getSelectionModel().getSelection();

        var projects = [];

        for (var i = 0; i < selection.length; i++) {
            projects.push({project: selection[i].getId(), quantity: selection[i].get("quantity")});
        }

        this.projectReportStore.load({
            params: {
                projects: Ext.encode(projects)
            }
        });
    },
    /**
     * Creates the store used in this view.
     */
    createStores: function ()
    {
        var config = {
            autoLoad: true,
            model: "PartKeepr.ProjectBundle.Entity.ProjectReportList",
            pageSize: 999999999
        };

        this.store = Ext.create('Ext.data.Store', config);

        this.projectReportStore = Ext.create('Ext.data.Store', {
            model: "PartKeepr.ProjectBundle.Entity.ProjectReport",
            pageSize: -1
        });
    },
    statics: {
        iconCls: 'fugue-icon drill',
        title: i18n('Project Reports'),
        closable: true,
        menuPath: [{text: i18n("View")}]
    }
});

Ext.define('PartKeepr.StatisticsChart', {
    extend: 'Ext.chart.CartesianChart',
    animate: true,
    shadow: true,

    style: 'border: 1px solid #AAA;background-color: white;box-shadow: 5px 5px 0px #aaa',
    legend: {
        position: 'right'
    },
    theme: 'Base',
    series: [
        {
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            xField: 'start',
            yField: 'parts',
            style: {
                    lineWidth: 4
                },
                marker: {
                    radius: 4
                },
            tooltip: {
                trackMouse: true,
                renderer: function (tip, item)
                {
                    tip.update(
                        Ext.Date.format(item.get('start'), "Y-m-d") + ": " + item.get("parts") + " " + i18n(
                            "Parts"));
                }
            },
            title: i18n("Parts"),
            markerConfig: {
                type: 'cross',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }, {
            type: 'line',
            style: {
                    lineWidth: 4
                },
                marker: {
                    radius: 4
                },
            highlight: {
                size: 7,
                radius: 7
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tip, item)
                {
                    tip.update(Ext.Date.format(item.get('start'), "Y-m-d") + ": " + item.get(
                            "categories") + " " + i18n("Categories"));
                }
            },
            axis: 'left',
            title: i18n("Categories"),
            smooth: true,
            xField: 'start',
            yField: 'categories',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }
    ],
    axes: [
        {
            type: 'numeric',
            minimum: 0,
            position: 'left',
            fields: ['parts', 'categories'],
            title: i18n("Count"),
            minorTickSteps: 1,
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#eee',
                    stroke: '#bbb',
                    'stroke-width': 0.5
                },
                even: {
                    opacity: 1,
                    stroke: '#bbb',
                    'stroke-width': 0.5
                }
            }
        },
        {
            type: 'time',
            dateFormat: 'Y-m-d',
            position: 'bottom',
            aggregateOp: "avg",
            fields: ['start'],
            title: i18n("Date"),
            grid: true
        }
    ],
    store: {
        model: 'PartKeepr.StatisticSample',
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    rootProperty: ''
                },
                url: PartKeepr.getBasePath() + "/api/statistics/sampled",
                extraParams: {
                    "start": "2011-01-01 00:00:00",
                    "end": "2011-12-01 23:59:59"
                }
            },
            autoLoad: false
    },
    initComponent: function () {
        this.mask = new Ext.LoadMask({
            msg: i18n("Loading…"),
            target: this
        });
        this.callParent();

        this.store.on("beforeload", Ext.bind(this.onBeforeLoad, this));
        this.store.on("load", Ext.bind(this.onLoad, this));
    },
    /**
     * Sets the start date for the chart. Does not trigger a reload of the dataset.
     * @param date A valid date object
     */
    setStart: function (date)
    {
        if (!(date instanceof Date)) {
            return;
        }
        this.store.getProxy().extraParams.start = Ext.Date.format(date, "Y-m-d H:i:s");
    },
    /**
     * Sets the end date for the chart. Does not trigger a reload of the dataset.
     * @param date A valid date object
     */
    setEnd: function (date)
    {
        if (!(date instanceof Date)) {
            return;
        }

        // Always set the end date to the end of the day
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);

        this.store.getProxy().extraParams.end = Ext.Date.format(date, "Y-m-d H:i:s");
    },
    onBeforeLoad: function () {
        this.mask.show();
    },
    onLoad: function () {
        this.mask.hide();

    }
});

Ext.define('PartKeepr.StatisticsChartPanel', {
    extend: 'Ext.form.Panel',
    title: i18n("Statistics Chart"),

    layout: 'anchor',
    bodyStyle: 'background:#DBDBDB;padding: 15px;',

    initComponent: function ()
    {
        this.chart = Ext.create("PartKeepr.StatisticsChart", {anchor: '100% -60'});

        this.dateSelector1 = Ext.create("Ext.form.field.Date", {
            style: 'margin-top: 10px',
            fieldLabel: i18n("From"),
            listeners: {
                change: Ext.bind(this.onDateChanged, this)
            }
        });

        this.dateSelector2 = Ext.create("Ext.form.field.Date", {
            fieldLabel: i18n("To"),
            listeners: {
                change: Ext.bind(this.onDateChanged, this)
            }
        });

        this.items = [this.chart, this.dateSelector1, this.dateSelector2];

        this.reloadDates();

        this.callParent();
    },
    onDateChanged: function ()
    {
        this.chart.setStart(this.dateSelector1.getValue());
        this.chart.setEnd(this.dateSelector2.getValue());
        this.chart.store.load();
    },
    reloadDates: function ()
    {
        var options = {
            url: PartKeepr.getBasePath() + "/api/statistics/range",
            method: "GET",
            callback: Ext.bind(this.onReloadDates, this)
        };

        Ext.Ajax.request(options);
    },
    onReloadDates: function (options, success, response)
    {
        var data = Ext.decode(response.responseText);

        if (data.startDate === null || data.endDate === null) {
            Ext.Msg.alert(
                i18n("Unable to retrieve the statistic data"),
                i18n(
                    "The system was unable to retrieve the statistic data. The most probable cause is that the CreateStatisticSnapshot.php cronjob is not running."));
            return;
        }

        var start = Ext.Date.parse(data.startDate, "Y-m-d H:i:s");
        var end = Ext.Date.parse(data.endDate, "Y-m-d H:i:s");

        this.dateSelector1.setMinValue(start);
        this.dateSelector1.setMaxValue(end);
        this.dateSelector1.suspendEvents();

        this.dateSelector1.setValue(start);
        this.dateSelector1.resumeEvents();


        this.dateSelector2.setMinValue(start);
        this.dateSelector2.setMaxValue(end);

        this.dateSelector2.suspendEvents();
        this.dateSelector2.setValue(end);
        this.dateSelector2.resumeEvents();

        this.chart.setStart(start);
        this.chart.setEnd(end);
        this.chart.store.load();
    },
    statics: {
        iconCls: 'web-icon chart_bar',
        title: i18n('Chart'),
        closable: true,
        menuPath: [{text: i18n("View")}, {text: i18n("Statistics"), iconCls: "web-icon chart_bar"}]
    }
});

Ext.define('PartKeepr.SummaryStatisticsPanel', {
    extend: 'Ext.panel.Panel',
    width: 400,
    height: 250,
    title: i18n("Current Statistics"),
    bodyStyle: {
        padding: "5px"
    },
    layout: 'fit',
    /**
     * Initializes the component and adds a template
     */
    initComponent: function ()
    {
        /**
         * Create the template
         */
        this.tpl = new Ext.XTemplate(
            '<h1>' + i18n("Current Statistics") + '</h1>',
            '<table>',
                '<tr>',
                    '<td style="width: 200px;" class="o">' + i18n("Different Parts") + ':</td>',
                    '<td style="width: 200px;" class="o">{partCount}</td>',
                '</tr>',
                '<tr>',
                    '<td style="width: 200px;" class="e">' + i18n("Total Part Value") + ':</td>',
                    '<td style="width: 200px;" class="e">{[PartKeepr.getApplication().formatCurrency(values.totalPrice)]}</td>',
                '</tr>',
                '<tr>',
                    '<td style="width: 200px;" class="o">' + i18n("Average Part Value") + ':</td>',
                    '<td style="width: 200px;" class="o">{[PartKeepr.getApplication().formatCurrency(values.averagePrice)]}</td>',
                '</tr>',
                '<tr>',
                    '<td style="width: 200px;" class="e">' + i18n("Parts with price") + ':</td>',
                    '<td style="width: 200px;" class="e">{partsWithPrice}</td>',
                '</tr>',
                '<tr>',
                    '<td style="width: 200px;" class="o">' + i18n("Parts without price") + ':</td>',
                    '<td style="width: 200px;" class="o">{partsWithoutPrice}</td>',
                '</tr>',
                '<tr>',
                    '<td class="e">' + i18n("Categories") + ':</td>',
                '<td class="e">{partCategoryCount}</td>',
                '</tr>',
            '</table>',
            '<h1>' + i18n("Counts per Unit") + '</h1>',
            '<table>',
                '<tpl for="units">',
                '<tr>',
                    '<td style="width: 200px;" class="{[xindex % 2 === 0 ? "e" : "o"]}">{partMeasurementUnit.name}</td>',
                    '<td style="width: 200px;" class="{[xindex % 2 === 0 ? "e" : "o"]}">{stockLevel}</td>',
                '</tr>',
                '</tpl>',
            '</table>');

        this.tbButtons = [
            {
                text: i18n("Refresh"),
                handler: this.loadStats,
                scope: this
            }, {
                text: i18n("Close"),
                handler: this.close,
                scope: this
            }
        ];

        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: this.tbButtons
            }
        ];

        this.view = Ext.create("Ext.panel.Panel", {
            autoScroll: true
        });

        this.items = this.view;
        this.callParent();

        this.loadStats();
    },
    loadStats: function ()
    {
        var options = {
            url: PartKeepr.getBasePath() + "/api/statistics/current",
            method: "GET",
            callback: Ext.bind(this.onStatsLoaded, this)
        };

        Ext.Ajax.request(options);
    },
    onStatsLoaded: function (options, success, response)
    {
        var data = Ext.decode(response.responseText);
        this.tpl.overwrite(this.view.getTargetEl(), data);
    },
    statics: {
        iconCls: 'web-icon chart_bar',
        title: i18n('Summary'),
        closable: true,
        menuPath: [{text: i18n("View")}, {text: i18n("Statistics"), iconCls: "web-icon chart_bar"}]
    }
});

Ext.define('PartKeepr.data.store.SystemNoticeStore', {
    extend: 'Ext.data.Store',

    /**
     * The store ID to use
     */
    storeId: 'SystemNoticeStore',

    /**
     * Automatically load the store
     */
    autoLoad: true,

    /**
     * The model to use
     */
    model: "PartKeepr.CoreBundle.Entity.SystemNotice",

    pageSize: 99999999,

    sorters: [
        {
            property: 'date',
            direction: 'DESC'
        }
    ],

    filters: [
        {
            property: 'acknowledged',
            operator: "=",
            value: false
        }
    ]
});

/**
 * This class represents the tip of the day window and its logic.
 */
Ext.define("PartKeepr.TipOfTheDayWindow", {
    extend: 'Ext.window.Window',

    /* Defines the title template. */
    titleTemplate: i18n("Tip of the Day"),

    /* Cosmetic settings */
    width: 600,
    height: 300,

    minWidth: 600,
    minHeight: 300,

    layout: 'fit',

    /**
     * Stores the currently displayed tip, or null if none is displayed
     * @var Ext.data.Record
     */
    currentTip: null,

    /**
     * Holds an instance of the TipOfTheDay store.
     */
    tipStore: null,

    /**
     * Holds an instance of the TipOfTheDayHistory store
     */
    tipHistoryStore: null,

    /**
     * Initializes the window. Adds the iframe used for displaying tips, as well
     * as the user controls (prev/next buttons, config checkboxes).
     */
    initComponent: function ()
    {
        // Initialize the window with the title template
        this.title = this.titleTemplate;

        // Set the tip store
        this.tipStore = Ext.data.StoreManager.lookup('TipOfTheDayStore');
        this.tipHistoryStore = Ext.data.StoreManager.lookup('TipOfTheDayHistoryStore');

        // Set the tip display iframe and add it to the items
        this.tipDisplay = Ext.create("Ext.ux.IFrame", {
            border: false
        });

        this.items = this.tipDisplay;

        // Initialize previous and next buttons
        this.previousButton = Ext.create("Ext.button.Button", {
            text: i18n("Previous Tip"),
            handler: Ext.bind(this.displayPreviousTip, this),
            iconCls: 'partkeepr-icon tip_previous',
            disabled: true
        });

        this.nextButton = Ext.create("Ext.button.Button", {
            text: i18n("Next Tip"),
            iconCls: 'partkeepr-icon tip_next',
            handler: Ext.bind(this.displayNextTip, this)
        });

        // Initializes the "show tips on login" checkbox as well as the "show read tips" checkbox
        this.showTipsCheckbox = Ext.create("Ext.form.field.Checkbox", {
            boxLabel: i18n("Show Tips on login"),
            handler: Ext.bind(this.showTipsHandler, this)
        });

        this.displayReadTipsCheckbox = Ext.create("Ext.form.field.Checkbox", {
            boxLabel: i18n("Show read tips"),
            handler: Ext.bind(this.showReadTipsHandler, this)
        });

        // Initialize the "show tips" checkbox with the user preference
        if (PartKeepr.getApplication().getUserPreference("partkeepr.tipoftheday.showtips") === false) {
            this.showTipsCheckbox.setValue(false);
        } else {
            this.showTipsCheckbox.setValue(true);
        }

        // Append the controls to the bottom toolbar
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: {minWidth: 100},
                pack: 'start',
                items: [
                    this.previousButton,
                    this.nextButton,
                    '->',
                    this.showTipsCheckbox,
                    this.displayReadTipsCheckbox
                ]
            }
        ];

        // Auto-load the next unread tip on window display
        this.updateFilter();
        this.currentTip = this.tipStore.getAt(0);
        this.on("show", this.displayTip, this);

        // Window destroy handler
        this.on("destroy", this.onDestroy, this);
        this.callParent();
    },
    /**
     * Displays the previous tip
     */
    displayPreviousTip: function ()
    {
        var idx = this.tipStore.indexOf(this.currentTip);
        this.currentTip = this.tipStore.getAt(idx - 1);

        if (this.currentTip === null) {
            this.currentTip = this.tipStore.getAt(0);
        }
        this.displayTip(this.currentTip);
    },
    /**
     * Displays the next tip
     */
    displayNextTip: function ()
    {
        var idx = this.tipStore.indexOf(this.currentTip);
        this.currentTip = this.tipStore.getAt(idx + 1);

        if (this.currentTip === null) {
            this.currentTip = this.tipStore.getAt(0);
        }
        this.displayTip(this.currentTip);
    },
    /**
     * Updates the filter for the tip store to exclude read tips.
     */
    updateFilter: function ()
    {
        this.tipStore.clearFilter();

        if (this.displayReadTipsCheckbox.getValue() === true) {
            return;
        }
        var filterItems = [];

        this.tipHistoryStore.each(function (record)
        {
            filterItems.push(record.get("name"));
        });

        var tipFilter = Ext.create("PartKeepr.util.Filter", {
            property: "name",
            operator: "notin",
            value: filterItems
        });

        this.tipStore.addFilter(tipFilter);
    },
    /**
     * If the "show read tips" checkbox was clicked, update the buttons
     * to reflect the tip navigation.
     */
    showReadTipsHandler: function ()
    {
        this.updateFilter();
        this.updateButtons(this.currentTip);
    },
    /**
     * Destroy handler. Removes the "read tip" timer.
     */
    onDestroy: function ()
    {
        this.cancelReadTimer();
    },
    /**
     * Cancels the read timer.
     */
    cancelReadTimer: function ()
    {
        if (this.markAsReadTask) {
            this.markAsReadTask.cancel();
        }
    },
    /**
     * Handler when the "show tips" checkbox was clicked.
     */
    showTipsHandler: function (checkbox, checked)
    {
        PartKeepr.getApplication().setUserPreference("partkeepr.tipoftheday.showtips", checked);
    },
    /**
     * Displays a specific tip of the day.
     * @param record The record which contains the information regarding the tip
     */
    displayTip: function ()
    {
        if (!this.currentTip) {
            return;
        }

        // Cancel the old read timer
        this.cancelReadTimer();

        // Update buttons to reflect position
        this.updateButtons(this.currentTip);

        // Set the title to the tip name
        this.setTitle(this.titleTemplate + ": " + this.currentTip.get("name"));

        // Set iframe to the tip url
        this.tipDisplay.load(
            sprintf(PartKeepr.getApplication().getParameter("tip_of_the_day_uri"), this.currentTip.get("name")));

        // Fire up delayed task to mark the tip as read
        if (this.markAsReadTask) {
            this.markAsReadTask.cancel();
        }

        this.markAsReadTask = new Ext.util.DelayedTask(this.markTipRead, this);
        this.markAsReadTask.delay(5000);

    },
    /**
     * Updates the navigation buttons.
     *
     * This method has two modes, depending on which state the "show read tips" checkbox is in.
     * @param record The currently displayed tip
     */
    updateButtons: function (record)
    {
        if (this.tipStore.indexOf(record) > 0) {
            this.previousButton.enable();
        } else {
            this.previousButton.disable();
        }

        if (this.tipStore.indexOf(record) === this.tipStore.getCount() - 1) {
            this.nextButton.disable();
        } else {
            this.nextButton.enable();
        }

    },
    /**
     * Marks the current tip as read. Commits the information to the server.
     */
    markTipRead: function ()
    {
        this.currentTip.callPutAction("markTipRead", {}, Ext.bind(this.onMarkTipRead, this));
    },
    /**
     * Callback for when the markTipRead action has been completed. Re-loads the history store
     */
    onMarkTipRead: function ()
    {
        this.tipHistoryStore.load({
            scope: this,
            callback: this.onHistoryStoreLoaded
        });
    },
    /**
     * Callback for when the history store has been loaded. Updates the filter
     */
    onHistoryStoreLoaded: function ()
    {
        this.updateFilter();
    },
    /**
     * Returns if there are tips in the tip database which aren't read.
     *
     * @return {Boolean} True if there are tips available, false otherwise
     */
    hasTips: function ()
    {
        if (this.tipStore.count() > 0) {
            return true;
        } else {
            return false;
        }

    }
});

Ext.define("PartKeepr.CategoryTree", {
	alias: 'widget.CategoryTree',
	extend: 'Ext.tree.Panel',
	categoryModel: null,
    viewConfig: {
    	animate: false
    },
    loaded: false,
    rootVisible: false
});

Ext.define("PartKeepr.CategoryEditorTree", {
    alias: 'widget.CategoryEditorTree',
    extend: 'PartKeepr.CategoryTree',
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            sortOnDrop: true
        }
    },
    hideHeaders: true,
    categoryModel: null,
    categoryService: null,
    categoryEditActions: true,
    columns: [
        {
            xtype: 'treecolumn',
            header: 'Name',
            dataIndex: 'name',
            flex: 1
        }
    ],
    initComponent: function ()
    {
        this.createToolbar();


        this.callParent();

        this.getView().on("drop", Ext.bind(this.onCategoryDrop, this));
        this.getView().on("beforedrop", Ext.bind(this.onBeforeDrop, this));
        this.on("selectionchange", Ext.bind(this.onItemSelect, this));
    },
    onBeforeDrop: function (node, data, overModel, dropPosition, dropHandlers)
    {
        var draggedRecords = data.records;
        var droppedOn = this.getView().getRecord(node);

        for (draggedRecord in draggedRecords) {
            if (!(draggedRecord instanceof PartKeepr.data.HydraTreeModel)) {
                // Workaround for EXTJS-13725 where dropping of non-tree-models cause issues
                dropHandlers.cancelDrop();
            }

            this.fireEvent("foreignModelDrop", draggedRecords, droppedOn);
        }
    },
    onItemSelect: function (selected) {
        if (selected.getCount() === 0) {
            this.toolbarAddButton.disable();
            this.toolbarDeleteButton.disable();
            this.toolbarEditButton.disable();
        }

        this.toolbarAddButton.enable();
        this.toolbarEditButton.enable();
        this.toolbarDeleteButton.enable();

        var record = selected.getSelection()[0];


        if (!(record instanceof PartKeepr.data.HydraTreeModel)) {
            return;
        }

        if (record.parentNode !== null && record.parentNode.isRoot()) {
            this.toolbarDeleteButton.disable();
        }

        if (record.hasChildNodes()) {
            this.toolbarDeleteButton.disable();
        }

    },
    onCategoryDrop: function (node, data, overModel, dropPosition)
    {
        var draggedRecord = data.records[0];

        if (!(draggedRecord instanceof PartKeepr.data.HydraTreeModel)) {
            return;
        } else {
            var targetRecord;

            if (dropPosition === "after" || dropPosition === "before") {
                targetRecord = overModel.parentNode;
            } else {
                targetRecord = overModel;
            }

            draggedRecord.callPutAction("move", {
                "parent": targetRecord.getId()
            });
        }
    },
    createToolbar: function ()
    {
        this.toolbarExpandButton = Ext.create("Ext.button.Button", {
            iconCls: 'fugue-icon toggle-expand',
            tooltip: i18n("Expand All"),
            handler: this._onExpandClick,
            scope: this
        });

        this.toolbarCollapseButton = Ext.create("Ext.button.Button", {
            iconCls: 'fugue-icon toggle',
            tooltip: i18n("Collapse All"),
            handler: this._onCollapseClick,
            scope: this
        });

        this.toolbarReloadButton = Ext.create("Ext.button.Button", {
            iconCls: 'x-tbar-loading',
            tooltip: i18n("Reload"),
            handler: this._onReloadClick,
            scope: this
        });

        this.toolbarAddButton = Ext.create("Ext.button.Button", {
            tooltip: i18n("Add Category"),
            handler: Ext.bind(this.showCategoryAddDialog, this),
            iconCls: 'web-icon folder_add',
            disabled: true
        });

        this.toolbarDeleteButton = Ext.create("Ext.button.Button", {
            tooltip: i18n("Delete Category"),
            handler: Ext.bind(this.confirmCategoryDelete, this),
            iconCls: 'web-icon folder_delete',
            disabled: true
        });

        this.toolbarEditButton = Ext.create("Ext.button.Button", {
            tooltip: i18n("Edit Category"),
            handler: Ext.bind(this.showCategoryEditDialog, this),
            iconCls: 'web-icon folder_edit',
            disabled: true
        });

        var actions = [
            this.toolbarExpandButton,
            this.toolbarCollapseButton,
            this.toolbarReloadButton
        ];

        if (this.categoryEditActions) {
            actions.push(
                {
                    xtype: 'tbseparator'
                },
                this.toolbarAddButton,
                this.toolbarEditButton,
                this.toolbarDeleteButton
            );
        }
        this.toolbar = Ext.create("Ext.toolbar.Toolbar", {
            enableOverflow: true,
            dock: 'top',
            items: actions
        });

        Ext.apply(this, {
            dockedItems: [this.toolbar]
        });
    },
    _onReloadClick: function ()
    {
        this.store.load();
    },
    _onExpandClick: function ()
    {
        this.getRootNode().firstChild.expand(true);
    },
    _onCollapseClick: function ()
    {
        this.getRootNode().firstChild.collapse(true);
    },
    confirmCategoryDelete: function ()
    {
        Ext.Msg.confirm(i18n("Confirm Category Delete"),
            sprintf(i18n("Do you really wish to delete the category %s?"), this.getSelection()[0].get("name")),
            this.onCategoryDelete, this);
    },
    showCategoryAddDialog: function ()
    {
        var j = Ext.create("PartKeepr.CategoryEditorWindow", {
            record: Ext.create(this.categoryModel),
            categoryModel: this.categoryModel,
            parentRecord: this.getSelection()[0],
            listeners: {
                save: Ext.bind(this.onUpdateRecord, this)
            }
        });

        j.show();
    },
    showCategoryEditDialog: function ()
    {
        var j = Ext.create("PartKeepr.CategoryEditorWindow", {
            record: this.getSelection()[0],
            parentRecord: null,
            categoryModel: this.categoryModel,
            listeners: {
                save: Ext.bind(this.onUpdateRecord, this)
            }
        });

        j.show();
    },
    onUpdateRecord: function ()
    {
        this.store.load();
    },
    onCategoryDelete: function (btn)
    {
        if (btn == "yes") {
            this.getSelection()[0].erase();
        }
    }
});

Ext.define("PartKeepr.StorageLocationTree", {
    extend: 'PartKeepr.CategoryEditorTree',
    alias: 'widget.StorageLocationTree',
    xtype: 'partkeepr.StorageLocationTree',
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            sortOnDrop: true,
            ddGroup: 'StorageLocationTree'
        }
    },
    folderSort: true,

    categoryModel: "PartKeepr.StorageLocationBundle.Entity.StorageLocationCategory",

    initComponent: function ()
    {
        this.store = Ext.create("PartKeepr.data.store.StorageLocationCategoryStore");
        this.callParent();
    },
    listeners: {
        "foreignModelDrop": function (records, target)
        {
            for (var i in records) {
                records[i].setCategory(target);
                records[i].save({
                    success: function ()
                    {
                        if (records[i].store && records[i].store.reload) {
                            records[i].store.reload();
                        }
                    }
                });
            }
        }
    }
});

Ext.define("PartKeepr.PartCategoryTree", {
    extend: 'PartKeepr.CategoryEditorTree',
    alias: 'widget.PartCategoryTree',

    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            sortOnDrop: true,
            ddGroup: 'PartTree'
        }
    },
    categoryModel: 'PartKeepr.PartBundle.Entity.PartCategory',
    rootVisible: false,

    initComponent: function ()
    {
        this.store = Ext.create("PartKeepr.data.store.PartCategoryStore");

        this.callParent();

        this.syncButton = Ext.create("Ext.button.Button", {
            tooltip: i18n("Reveal Category for selected part"),
            iconCls: 'fugue-icon arrow-split-180',
            handler: Ext.bind(function ()
            {
                this.fireEvent("syncCategory");
            }, this),
            disabled: true
        });
        this.toolbar.add(['->', this.syncButton]);
    },
    listeners: {
        "foreignModelDrop": function (records, target)
        {
            for (var i in records) {
                records[i].setCategory(target);
                records[i].save();
            }
        }
    }
});

Ext.define("PartKeepr.FootprintTree", {
    extend: 'PartKeepr.CategoryEditorTree',
    alias: 'widget.FootprintTree',
    xtype: 'partkeepr.FootprintTree',
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            sortOnDrop: true,
            ddGroup: 'FootprintCategoryTree'
        }
    },
    folderSort: true,

    categoryModel: "PartKeepr.FootprintBundle.Entity.FootprintCategory",

    initComponent: function ()
    {
        this.store = Ext.create("PartKeepr.data.store.FootprintCategoryStore");
        this.callParent();
    },

    listeners: {
        "foreignModelDrop": function (records, target)
        {
            for (var i in records) {
                records[i].setCategory(target);
                records[i].save({
                    success: function ()
                    {
                        if (records[i].store && records[i].store.reload) {
                            records[i].store.reload();
                        }
                    }
                });
            }
        }
    }
});

Ext.define('PartKeepr.CategoryEditorWindow', {
    extend: 'Ext.window.Window',
    border: false,
    width: 400,
    categoryModel: null,
    layout: 'fit',
    items: [
        {
            xtype: "CategoryEditorForm"
        }
    ],
    initComponent: function ()
    {
        this.buttons = [
            {
                text: i18n("Save"),
                handler: Ext.bind(this.onSave, this)
            }, {
                text: i18n("Cancel"),
                handler: Ext.bind(this.onCancel, this)
            }
        ];

        this.callParent();

        if (!this.record.phantom) {
            this.setTitle(i18n("Edit Category"));
        } else {
            this.record.set("parent", this.parentRecord.getId());
            this.setTitle(i18n("Add Category"));
        }

        this.down("CategoryEditorForm").loadRecord(this.record);

        this.down("textfield[name=name]").on("keypress", this.onEnter, this);
        this.down("textfield[name=description]").on("keypress", this.onEnter, this);

        this.on("show", Ext.bind(this._onShow, this));
    },
    onEnter: function (field, e)
    {
        if (e.getKey() == e.ENTER) {
            this.onSave();
        }
    },
    _onShow: function () {
        this.down("CategoryEditorForm").items.first().focus();
    },
    onSave: function ()
    {
        this.down("CategoryEditorForm").updateRecord(this.record);

        this.record.save({
            success: Ext.bind(function (response)
            {
                this.fireEvent("save", response);
                this.destroy();
            }, this)
        });
    },
    onCancel: function ()
    {
        this.destroy();
    }
});

Ext.define('PartKeepr.CategoryEditorForm', {
    extend: 'Ext.form.Panel',
    layout: 'anchor',
    border: false,
    frame: false,
    bodyStyle: 'background:#DBDBDB;padding: 10px;',
    xtype: "CategoryEditorForm",
    items: [
        {
            xtype: 'textfield',
            name: 'name',
            anchor: '100%',
            enableKeyEvents: true,
            fieldLabel: i18n("Name")
        }, {
            xtype: 'textarea',
            name: 'description',
            anchor: '100%',
            enableKeyEvents: true,
            fieldLabel: i18n("Description")
        }
    ]
});

Ext.define('PartKeepr.picker.Char', {
    extend: 'Ext.picker.Color',
    alias: 'widget.charpicker',

    /**
     * @cfg {String} [componentCls='x-char-picker']
     * The CSS class to apply to the containing element.
     */
    componentCls : Ext.baseCSSPrefix + 'char-picker',

    /**
     * @cfg {String} [selectedCls='x-char-picker-selected']
     * The CSS class to apply to the selected element
     */
    selectedCls: Ext.baseCSSPrefix + 'char-picker-selected',

    /**
     * @cfg {String} value
     * The initial char to highlight.
     */
    value : null,

    /**
     * @cfg {String} clickEvent
     * The DOM event that will cause a char to be selected. This can be any valid event name (dblclick, contextmenu).
     */
    clickEvent :'click',

    /**
     * @cfg {Boolean} allowReselect
     * If set to true then reselecting a char that is already selected fires the {@link #select} event
     */
    allowReselect : true,

    /**
     * @property {String[]} chars
     */
    chars : [
        ' ', '&', '"', '¢', '€', '£', '¥', '©', '®', '™', '‰', 'µ', '·', '•', '…', '′', '″', '§', '¶', 'ß',
        '‹', '›', '«', '»', '‘', '’', '“', '”', '‚', '„', '<', '>', '≤', '≥', '–', '—', '¯', '‾', '¤', '¦',
        '¨', '¡', '¿', 'ˆ', '˜', '°', '−', '±', '÷', '⁄', '×', '¹', '²', '³', '¼', '½', '¾', 'ƒ', '∫', '∑',
        '∞', '√', '≈', '≠', '≡', '∏', '¬', '∩', '∂', '´', '¸', 'ª', 'º', '†', '‡', 'À', 'Á', 'Â', 'Ã', 'Ä',
        'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Œ',
        'Š', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Ÿ', 'Þ', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë',
        'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ø', 'œ', 'š', 'ù', 'ú', 'û', 'ü', 'ý', 'þ',
        'ÿ', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ',
        'Υ', 'Φ', 'Χ', 'Ψ', 'Ω', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο',
        'π', 'ρ', 'ς', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω', '←', '↑', '→', '↓', '↔', '◊', '♠', '♣', '♥', '♦',
        '⌀', '∅'
    ],

    /**
     * @cfg {Function} handler
     * A function that will handle the select event of this picker. The handler is passed the following parameters:
     *
     * - `picker` : CharPicker
     *
     * - `char` : String
     */

    /**
     * @cfg {Object} scope
     * The scope (`this` reference) in which the `{@link #handler}` function will be called. Defaults to this
     * Char picker instance.
     */

    renderTpl: [
        '<tpl for="chars">',
            '<a href="#" hidefocus="on">',
                '<em><span unselectable="on">{.}</span></em>',
            '</a>',
        '</tpl>'
    ],

    // private
    initRenderData : function(){
        var me = this;
        return Ext.apply(me.callParent(), {
            iitemCls: me.itemCls,
            chars: me.chars
        });
    },

    // private
    handleClick : function(event, target){
        var me = this;

        event.stopEvent();
        if (!me.disabled) {
        	var el = Ext.get(target);
        	me.select(el.down("span").dom.textContent);
        }
    },

    /**
     * Selects the specified char in the picker (fires the {@link #select} event)
     * @param {String} char The char
     * @param {Boolean} suppressEvent (optional) True to stop the select event from firing. Defaults to false.
     */
    select : function(chr, suppressEvent){

        var me = this,
            selectedCls = me.selectedCls,
            value = me.value,
            el;

        if (!me.rendered) {
            me.value = chr;
            return;
        }


        if (chr != value || me.allowReselect) {
            me.value = chr;
            if (suppressEvent !== true) {
                me.fireEvent('select', me, chr);
            }
        }
    }
});
Ext.define("PartKeepr.StorageLocationPicker", {
    extend: "Ext.form.field.Picker",
    alias: 'widget.StorageLocationPicker',

    /**
     * @cfg {Number} typeAheadDelay
     * The length of time in milliseconds to wait until the typeahead function is called
     */
    typeAheadDelay: 250,

    /**
     * @var {Ext.util.DelayedTask} typeAheadTask
     * The internal task for the typeAhead delay
     */
    typeAheadTask: null,

    /**
     * @var {PartKeepr.StorageLocationBundle.Entity.StorageLocation} selectedStorageLocation
     * The selected storage location
     */
    selectedStorageLocation: null,

    textValue: "",

    enableKeyEvents: true,

    listeners: {
        'specialkey': {
            fn: 'keyHandler',
            scope: 'this'
        }
    },

    initComponent: function ()
    {
        this.store = Ext.create("Ext.data.Store", {
            model: 'PartKeepr.StorageLocationBundle.Entity.StorageLocation',
            autoLoad: true,
            remoteFilter: true,
            remoteSort: true,
            sorters: [
                {
                    property: 'category.categoryPath',
                    direction: 'ASC'
                }, {
                    property: 'name',
                    direction: 'ASC'
                }
            ],
            groupField: 'categoryPath'
        });

        this.on("keyup", Ext.bind(this.onFieldChange, this));
        this.on("blur", Ext.bind(this.onBlur, this));

        this.callParent();
    },
    onFieldChange: function (field, e)
    {
        var newValue = this.inputEl.getValue();

        if (!this.typeAheadTask) {
            this.typeAheadTask = new Ext.util.DelayedTask(this.onTypeAhead, this, [newValue]);
        }

        this.typeAheadTask.delay(this.typeAheadDelay, false, false, [newValue]);
    },
    /**
     * Handles special keys used in this field.
     *
     * Enter: Starts the search
     * Escape: Removes the search and clears the field contents
     */
    keyHandler: function (field, e)
    {
        var picker = this.getPicker();
        var grid = picker.getGrid();

        switch (e.getKey()) {
            case e.DOWN:
                var currentSelection = grid.getSelectionModel().getSelection();

                if (currentSelection.length === 0) {
                    grid.getSelectionModel().select(0);
                } else {
                    var index = grid.getStore().indexOf(currentSelection[0]) + 1;

                    if (index < grid.getStore().count()) {
                        grid.getSelectionModel().select(index);
                        grid.getView().focusRow(grid.getStore().getAt(index));
                    }
                }
                break;
            case e.UP:
                var currentSelection = grid.getSelectionModel().getSelection();

                if (currentSelection.length === 0) {
                    grid.getSelectionModel().select(grid.getStore().count());
                } else {
                    var index = grid.getStore().indexOf(currentSelection[0]) - 1;

                    if (index >= 0) {
                        grid.getSelectionModel().select(index);
                        grid.getView().focusRow(grid.getStore().getAt(index));
                    }
                }
                break;
            case e.ENTER:
                if (!this.isExpanded) {
                    this.expand();
                    return;
                } else {
                    this.applyGridSelection(grid);
                }
                break;
            case e.TAB:
                this.applyGridSelection(grid);
                break;
        }
    },
    applyGridSelection: function (grid)
    {
        var currentSelection = grid.getSelectionModel().getSelection();

        if (currentSelection.length === 1) {
            this.setValue(currentSelection[0]);
        }

        this.collapse();

    },
    getValue: function ()
    {
        return this.selectedStorageLocation;
    },
    onTypeAhead: function (newValue)
    {
        var picker = this.getPicker();

        if (picker.getTree().getStore().isLoading()) {
            Ext.defer(this.onTypeAhead, 200, this, [newValue]);
            return;
        }

        if (newValue !== this.textValue) {
            picker.setCategoryFilter(picker.getTree().getRootNode().firstChild);
            picker.getTree().getSelectionModel().select(picker.getTree().getRootNode().firstChild);
            picker.setSearchValue(newValue);
            picker.getGrid().getSelectionModel().deselectAll();
            this.expand();
            this.textValue = newValue;
        }
    },
    onBlur: function ()
    {
        var picker = this.getPicker();

        if (picker.getGrid().getStore().count() === 1) {
            this.setValue(picker.getGrid().getStore().getAt(0));
        }

        this.validate();
    },
    setValue: function (value)
    {
        if (value === null || !(value instanceof PartKeepr.StorageLocationBundle.Entity.StorageLocation)) {
            return;
        }
        this.selectedStorageLocation = value;
        this.textValue = value.get("name");
        PartKeepr.StorageLocationPicker.superclass.setValue.call(this, value.get("name"));
        this.validate();
    },
    getErrors: function (value) {
        var errors = this.callParent(arguments);

        if (!this.inputEl) {
            return errors;
        }

        if (!(this.selectedStorageLocation instanceof PartKeepr.StorageLocationBundle.Entity.StorageLocation) ||
                this.inputEl.getValue() !== this.selectedStorageLocation.get("name")) {
            errors.push(i18n("An existing storage location must be selected"));
        }

        return errors;

    },
    /**
     * Creates and returns the tree panel to be used as this field's picker.
     */
    createPicker: function ()
    {
        var me = this,
            picker = new PartKeepr.StorageLocationNavigation({
                store: me.store,
                floating: true,
                minHeight: me.minPickerHeight,
                maxHeight: me.maxPickerHeight,
                manageHeight: false,
                shadow: false,
                height: 250,
                verticalLayout: true,
                dragAndDrop: false,
                categoryEditActions: false,
                itemEditActions: false,
                editItemAsObject: true,
                listeners: {
                    itemEdit: function (v)
                    {
                        this.setValue(v);
                        this.collapse();
                    },
                    scope: this
                }
            });

        return picker;
    }
});

Ext.define("PartKeepr.Message", {
	extend: "Ext.data.Model",
	fields: [
	         {	name: 'message', type: 'string' },
	         {	name: 'severity',	type: 'string'},
	         { name: 'date', type: 'date' }
	         ]
});
/**
 * Licensed under GNU LESSER GENERAL PUBLIC LICENSE Version 3
 *
 * @author Thorsten Suckow-Homberg <ts@siteartwork.de>
 * @url http://www.siteartwork.de/wizardcomponent
 */

/**
 * @class Ext.ux.Wiz.Card
 * @extends Ext.FormPanel
 *
 * A specific {@link Ext.FormPanel} that can be used as a card in a
 * {@link Ext.ux.Wiz}-component. An instance of this card does only work properly
 * if used in a panel that uses a {@see Ext.layout.CardLayout}-layout.
 *
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext.ux.wizard.Card', {
    extend: 'Ext.form.Panel',
    cardTitle: '',
    cls: 'ux-wiz-card',

    /**
    * @cfg {Boolean} header "True" to create the header element. Defaults to
    * "false". See {@link Ext.form.FormPanel#header}
    */
    header: false,

    /**
    * @cfg {Strting} hideMode Hidemode of this component. Defaults to "offsets".
    * See {@link Ext.form.FormPanel#hideMode}
    */
    hideMode: 'display',

    initComponent: function () {

        this.cardTitle = this.title;
        this.title = (this.showTitle ? '<span style="' + this.titleStyle + '" class="' + this.titleCls + '" >' + this.title + '</span>' : '');

        if (this.showTitle) {
            this.header = true;
        }

        this.dockedItems = [{
            xtype: 'container',
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                // id: 'formErrorState',
                errorpanel: true,
                baseCls: 'form-error-state',
                flex: 1,
                validText: this.validText,
                invalidText: this.invalidText || 'Error/s detected. Please modify...',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for="."><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function () {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: true,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function (errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                        tip.show();
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }]
        }];

        this.callParent();

    },

    // -------- helper
    isValid: function () {

        return !this.getForm().isDirty();
    },

    // -------- overrides

    /**
    * Overrides parent implementation since we allow to add any element
    * in this component which must not be neccessarily be a form-element.
    * So before a call to "isValid()" is about to be made, this implementation
    * checks first if the specific item sitting in this component has a method "isValid" - if it
    * does not exists, it will be added on the fly.
    */
    bindHandler: function () {

        Ext.each(this.form.items, function (f) {
            if (!f.isValid) {
                f.isValid = Ext.emptyFn;
            }
        });
    },

    /*
    * Listen for validity change on the entire form and update the combined error icon
    */
    listeners: {
        fieldvaliditychange: function () {
            this.updateErrorState();
        },
        fielderrorchange: function () {
            this.updateErrorState();
        }
    },

    updateErrorState: function () {
        var me = this,
                errorCmp, fields, errors;

        if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
            errorCmp = me.down('component[errorpanel]');
            fields = me.getForm().getFields();
            errors = [];
            fields.each(function (field) {
                Ext.Array.forEach(field.getErrors(), function (error) {
                    errors.push({ name: field.getFieldLabel(), error: error });
                });
            });
            errorCmp.setErrors(errors);
            me.hasBeenDirty = true;
        }
    },

    /**
    * Overrides parent implementation. This is needed because in case
    * this method uses "monitorValid=true", the method "startMonitoring" must
    * not be called, until the "show"-event of this card fires.
    */
    initEvents: function () {
        var old = this.monitorValid;
        this.monitorValid = false;
        this.callParent();
        this.monitorValid = old;
    },

    // -------- listener
    /**
    * Checks wether the beforecardhide-event may be triggered.
    */
    bubbleBeforeHideEvent: function () {
        var ly = this.ownerCt.layout;
        var activeItem = ly.activeItem;

        if (activeItem && activeItem.id === this.id) {
            //return this.fireEvent('beforedeactivate', this);
        }

        return true;
    },

    /**
    * Stops monitoring the form elements in this component when the
    * 'hide'-event gets fired.
    */
    onCardHide: function () {
        if (this.monitorValid) {
            this.stopMonitoring();
        }
    },

    /**
    * Starts monitoring the form elements in this component when the
    * 'show'-event gets fired.
    */
    onCardShow: function () {
        if (this.monitorValid) {
            this.startMonitoring();
        }
    },


    /**
    * startMonitoring he form elements
    *
    */
    startMonitoring: function () {
        this.startPolling();
    },


    /**
    * startMonitoring he form elements
    *
    */
    stopMonitoring: function () {
        this.stopPolling();
    }

});
/**
 * Licensed under GNU LESSER GENERAL PUBLIC LICENSE Version 3
 *
 * @author Thorsten Suckow-Homberg <ts@siteartwork.de>
 * @url http://www.siteartwork.de/wizardcomponent
 */

/**
 * @class Ext.ux.Wiz.Header
 * @extends Ext.BoxComponent
 *
 * A specific {@link Ext.BoxComponent} that can be used to show the current process in an
 * {@link Ext.ux.Wiz}.
 *
 * An instance of this class is usually being created by {@link Ext.ux.Wiz#initPanels} using the
 * {@link Ext.ux.Wiz#headerConfig}-object.
 *
 * @private
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext.ux.wizard.Header', {
    extend: 'Ext.container.Container',
    alias: 'widget.wizardheader',

    /**
    * @cfg {Number} height The height of this component. Defaults to "55".
    */
    height: 55,

    /**
    * @cfg {String} region The Region of this component. Since a {@link Ext.ux.Wiz}
    * usually uses a {@link Ext.layout.BorderLayout}, this property defaults to
    * "north". If you want to change this property, you should also change the appropriate
    * css-classes that are used for this component.
    */
    region: 'north',

    /**
    * @cfg {String} title The title that gets rendered in the head of the component. This
    * should be a text describing the purpose of the wizard.
    */
    title: 'Wizard',

    /**
    * @cfg {Number} steps The overall number of steps the user has to go through
    * to finish the wizard.
    */
    steps: 0,

    /**
    * @cfg {String} stepText The text in the header indicating the current process in the wizard.
    * (defaults to "Step {0} of {1}: {2}").
    * {0} is replaced with the index (+1) of the current card, {1} is replaced by the
    * total number of cards in the wizard and {2} is replaced with the title-property of the
    * {@link Ext.ux.Wiz.Card}
    * @type String
    */
    // stepText: "Step {0} of {1}: {2}",
    stepText: '<div class="ext-ux-wiz-Header">' +
              '    <div class="ext-ux-wiz-Header-title"></div>' +
              '    <div> ' +
              '       <div class="ext-ux-wiz-Header-step">Step {0} of {1}: {2} </div>' +
              '       <div class="ext-ux-wiz-Header-stepIndicator-container"> ' +
              '{stepIndicator}' +
              '       </div>' +
              '    </div> ' +
              '</div>',

    /**
    * @cfg {Object} autoEl The element markup used to render this component.
    */
    autoEl: {
        tag: 'div',
        cls: 'ext-ux-wiz-Header',
        children: [{
            tag: 'div',
            cls: 'ext-ux-wiz-Header-title'
        }, {
            tag: 'div',
            children: [{
                tag: 'div',
                cls: 'ext-ux-wiz-Header-step'
            }, {
                tag: 'div',
                cls: 'ext-ux-wiz-Header-stepIndicator-container'
            }]
        }]
    },

    /**
    * @param {Ext.Element}
    */
    titleEl: null,

    /**
    * @param {Ext.Element}
    */
    stepEl: null,

    /**
    * @param {Ext.Element}
    */
    imageContainer: null,

    /**
    * @param {Array}
    */
    indicators: null,

    /**
    * @param {Ext.Template}
    */
    stepTemplate: null,

    /**
    * @param {Number} lastActiveStep Stores the index of the last active card that
    * was shown-
    */
    lastActiveStep: -1,

    // -------- helper
    /**
    * Gets called by  {@link Ext.ux.Wiz#onCardShow()} and updates the header
    * with the approppriate information, such as the progress of the wizard
    * (i.e. which card is being shown etc.)
    *
    * @param {Number} currentStep The index of the card currently shown in
    * the wizard
    * @param {String} title The title-property of the {@link Ext.ux.Wiz.Card}
    *
    * @private
    */
    updateStep: function (currentStep, title) {
        var html = this.stepTemplate.apply({
            0: currentStep + 1,
            1: this.steps,
            2: title,
            step: currentStep,
            steps: this.steps,
            title: title
        });

        this.update(html);

        this.lastActiveStep = currentStep;
    },


    // -------- listener
    /**
    * Overrides parent implementation to initComponent this component properly.
    */
    initComponent: function () {
		this.autoEl.cls = this.autoEl.cls + " " + this.cls;
        this.callParent(arguments);
    },

    /**
    * Overrides parent implementation to render this component properly.
    */
    onRender: function (ct, position) {

        var image = null;
        var steptxt = this.stepText.split("{stepIndicator}");
        var stepboxs = "\n";

        if (steptxt.length > 1) {
            for (var i = 0, len = this.steps; i < len; i++) {
                stepboxs += '<div class=\'ext-ux-wiz-Header-stepIndicator <tpl if="step == ' + i + '" >ext-ux-wiz-Header-stepIndicator-active</tpl>\'>&#160;</div>\n';
            }

            stepboxs = ('<tpl for=".">' + steptxt[0] + stepboxs + steptxt[1] + '</tpl>');

            if (this.region == "west" || this.region == "east") {
                this.stepText = stepboxs.replace(/Header/gi, "Side");
            } else {
                this.stepText = stepboxs;
            }
        } 

        this.stepTemplate = new Ext.XTemplate(this.stepText);
        this.stepTemplate.compile();

        this.callParent(arguments);
    }
});
Ext.define('Ext.ux.Wizard', {
    extend: 'Ext.window.Window',
    // layout: 'Ext.ux.wizard.CardLayout',
    layout: 'fit',
    loadMaskConfig: {
        'default': '',
        'saving': 'Saving...',
        'checking': 'Checking...'
    },
    autoRender: true,

    /**
    * @cfg {Number} height The height of the dialog. Defaults to "400".
    */
    height: 650,

    /**
    * @cfg {Number} width The width of the dialog. Defaults to "540".
    */
    width: 800,

    /**
    * @cfg {Boolean} closable Wether the dialog is closable. Defaults to "true".
    * This property will be changed by the "switchDialogState"-method, which will
    * enable/disable controls based on the passed argument. Thus, this config property
    * serves two purposes: Tell the init config to render a "close"-tool, and create a
    * "beforeclose"-listener which will either return true or false, indicating if the
    * dialog may be closed.
    */
    closable: true,

    /**
    * @cfg {Boolean} resizable Wether the dialog is resizable. Defaults to "false".
    */
    resizable: false,

    /**
    * @cfg {Boolean} resizable Wether the dialog is modal. Defaults to "true".
    */
    modal: true,

    /**
    * @cfg {Array} cards A numeric array with the configured {@link Ext.ux.Wiz.Card}s.
    * The index of the cards in the array represent the order in which they get displayed
    * in the wizard (i.e. card at index 0 gets displayed in the first step, card at index 1 gets
    * displayed in the second step and so on).
    */
    cards: [],

    /**
    * @cfg {String} previousButtonText The text to render the previous-button with.
    * Defaults to "&lt; Back" (< Back)
    */
    previousButtonText: '&lt; Previous',

    /**
    * @cfg {String} nextButtonText The text to render the next-button with.
    * Defaults to "Next &gt;" (Next >)
    */
    nextButtonText: 'Next &gt;',

    /**
    * @cfg {String} cancelButtonText The text to render the cancel-button with.
    * Defaults to "Cancel"
    */
    cancelButtonText: 'Cancel',

    /**
    * @cfg {String} finishButtonText The text to render the next-button with when the last
    * step of the wizard is reached. Defaults to "Finish"
    */
    finishButtonText: 'Finish',

    /**
    * @cfg {Object} headerConfig A config-object to use with {@link Ext.ux.Wiz.Header}.
    * If not present, it defaults to an empty object.
    */
    headConfig: null,

    /**
    * @cfg {Object} sideConfig A config-object to use with {@link Ext.ux.Wizard}.
    * If not present, it defaults to an empty object.
    */
    sideConfig: null,

    /**
    * @cfg {Object} cardPanelConfig A config-object to use with {@link Ext.Panel}, which
    * represents the card-panel in this dialog.
    * If not present, it defaults to an empty object
    */
    cardPanelConfig: {},

    /**
    * @param {Ext.Button} The window-button for paging to the previous card.
    * @private
    */
    previousButton: null,

    /**
    * @param {Ext.Button} The window-button for paging to the next card. When the
    * last card is reached, the event fired by and the text rendered to this button
    * will change.
    * @private
    */
    nextButton: null,

    /**
    * @param {Ext.Button} The window-button for canceling the wizard. The event
    * fired by this button will usually close the dialog.
    * @private
    */
    cancelButton: null,

    /**
    * @param {Ex.Panel} The card-panel that holds the various wizard cards
    * ({@link Ext.ux.Wiz.Card}). The card-panel itself uses the custom
    * {@link Ext.ux.layout.CardLayout}, which needs to be accessible by this class.
    * You can get it at {@link http://www.siteartwork.de/cardlayout}.
    * @private
    */
    cardPanel: null,

    /**
    * @param {Number} currentCard The current {@link Ext.ux.Wiz.Card} displayed.
    * Defaults to 0.
    * @private
    */
    currentCard: 0,

    /**
    * @param {Ext.ux.Wiz.Header} The header-panel of the wizard.
    * @private
    */
    headPanel: null,

    /**
    * @param {Number} cardCount Helper for storing the number of cards used
    * by this wizard. Defaults to 0 (inherits "cards.length" later on).
    * @private
    */
    cardCount: 0,

    /**
    * Inits this component with the specified config-properties and automatically
    * creates its components.
    */
    initComponent: function () {

        var c = this.initialConfig, sregion, hregion;

        if (!this.sideConfig) this.sideConfig = {};
        if (!this.headConfig) this.headConfig = {};

        if (c.sideConfig && c.sideConfig.position == 'right') { sregion = 'east'; } else { sregion = 'west'; }
        if (c.headConfig && c.headConfig.position == 'bottom') { hregion = 'south'; } else { hregion = 'north'; }

        Ext.applyIf(this.cardPanelConfig, { region: 'center', items: (this.cards || [{}]), layout: new Ext.ux.wizard.CardLayout(), border: false, activeItem: 0, baseCls: 'ux-wizard-cardpanel' });
        Ext.applyIf(this.sideConfig, { region: sregion, width: 150, layout: 'fit', xtype: 'wizardheader', headerPosition: 'side', steps: this.cards.length, hidden: !(c.sideConfig) });
        Ext.applyIf(this.headConfig, { region: hregion, height: 150, layout: 'fit', xtype: 'wizardheader', headerPosition: 'top', steps: this.cards.length, hidden: !(c.headConfig) });

        this.initButtons();
        this.initPanels();

        var title = this.title || this.headConfig.title;
        title = title || "";

        var items = [];

        items.push(this.sidePanel);
        items.push(this.headPanel);
        items.push(this.cardPanel);

        Ext.apply(this, {
            title: title,
            layout: 'border',
            cardCount: this.cards.length,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: { minWidth: 60 },
                items: [
                    { xtype: 'component', flex: 1 },
                    this.previousButton,
                    this.nextButton,
                    this.cancelButton
                ]
            }],
            items: items
        });

        this.callParent();
    },

    // -------- helper
    /**
    * Returns the form-data of all cards in this wizard. The first index is the
    * id of the card in this wizard,
    * and the values are objects containing key/value pairs in the form of
    * fieldName : fieldValue.
    *
    * @return {Array}
    */
    getWizardData: function () {
        var formValues = {};
        var cards = this.cards;
        for (var i = 0, len = cards.length; i < len; i++) {
            if (cards[i].form) {
                formValues[cards[i].id] = cards[i].form.getValues(false);
            } else {
                formValues[cards[i].id] = {};
            }
        }

        return formValues;
    },

    /**
    * Switches the state of this wizard between disabled/enabled.
    * A disabled dialog will have a {@link Ext.LoadMask} covering the card-panel
    * to prevent user input, and the buttons will be rendered disabled/enabled.
    * If the dialog is closable, the close-tool will be masked, too, and the dialog will not
    * be closable by clicking the "close" tool.
    *
    * @param {Boolean} enabled "false" to prevent user input and mask the elements,
    * otherwise true.
    * @param {String} type The type of msg for the {@Ext.LoadMask} covering
    * the cardPanel, as defined in the cfg property "loadMaskConfig"
    */
    switchDialogState: function (enabled, type) {
        this.showLoadMask(!enabled, type);

        this.previousButton.setDisabled(!enabled);
        this.nextButton.setDisabled(!enabled);
        this.cancelButton.setDisabled(!enabled);

        var ct = this.tools['close'];

        if (ct) {
            switch (enabled) {
                case true:
                    this.tools['close'].unmask();
                    break;

                default:
                    this.tools['close'].mask();
                    break;
            }
        }

        this.closable = enabled;
    },

    /**
    * Shows the load mask for this wizard. By default, the cardPanel's body
    * will be masked.
    *
    * @param {Boolean} show true to show the load mask, otherwise false.
    * @param {String} type The type of message for the {@Ext.LoadMask} covering
    * the cardPanel, as defined in the cfg property "loadMaskConfig"
    */
    showLoadMask: function (show, type) {
        if (!type) {
            type = 'default';
        }

        if (show) {
            if (this.loadMask == null) {
                this.loadMask = new Ext.LoadMask(this.body);
            }
            this.loadMask.msg = this.loadMaskConfig[type];
            this.loadMask.show();
        } else {
            if (this.loadMask) {
                this.loadMask.hide();
            }
        }
    },


    /**
    * show the side panel
    * 
    */
    showSidePanel: function () {
        this.sidePanel.show();
    },


    /**
    * show the side panel
    * 
    */
    showHeadPanel: function () {
        this.headPanel.show();
    },


    /**
    * hide the side panel
    * 
    */
    showSidePanel: function () {
        this.sidePanel.hide();
    },


    /**
    * hide the head panel
    * 
    */
    hideHeadPanel: function () {
        this.headPanel.hide();
    },




    /**
    * Inits the listener for the various {@link Ext.ux.Wiz.Card}s used
    * by this component.
    */
    initEvents: function () {
        this.callParent();

        this.on('beforeclose', this.onBeforeClose, this);
    },

    /**
    * Creates the head- and the card-panel.
    * Be sure to have the custom {@link Ext.ux.layout.CardLayout} available
    * in order to make the card-panel work as expected by this component
    * ({@link http://www.siteartwork.de/cardlayout}).
    */
    initPanels: function () {
        var cards = this.cards;
        var cardPanelConfig = this.cardPanelConfig;

        Ext.apply(this.headConfig, {
            steps: this.cards.length
        });

        this.headPanel = Ext.create('Ext.ux.wizard.Header', this.headConfig);

        this.sidePanel = Ext.create('Ext.ux.wizard.Header', this.sideConfig);

        Ext.apply(cardPanelConfig, {
            layout: 'card', // new Ext.ux.wizard.CardLayout(),
            items: cards
        });

        Ext.applyIf(cardPanelConfig, {
            region: 'center',
            border: false,
            activeItem: 0
        });

        // var cards = this.cards;

        for (var i = 0, len = cards.length; i < len; i++) {
            cards[i].on('beforeactivate', this.onCardShow, this);
            cards[i].on('clientvalidation', this.onClientValidation, this);
        }

        this.cardPanel = Ext.create('Ext.panel.Panel', cardPanelConfig);
    },

    /**
    * Creates the instances for the the window buttons.
    */
    initButtons: function () {
        this.previousButton = new Ext.Button({
            text: this.previousButtonText,
            id: 'wizard-move-prev',
            disabled: true,
            minWidth: 75,
            handler: this.onPreviousClick,
            scope: this
        });

        this.nextButton = new Ext.Button({
            text: this.nextButtonText,
            id: 'wizard-move-next',
            minWidth: 75,
            handler: this.onNextClick,
            scope: this
        });

        this.cancelButton = new Ext.Button({
            text: this.cancelButtonText,
            handler: this.onCancelClick,
            scope: this,
            minWidth: 75
        });
    },

    // -------- listeners

    /**
    * Listener for the beforeclose event.
    * This listener will return true or false based on the "closable"
    * property by this component. This property will be changed by the "switchDialogState"
    * method, indicating if there is currently any process running that should prevent
    * this dialog from being closed.
    *
    * @param {Ext.Panel} panel The panel being closed
    *
    * @return {Boolean}
    */
    onBeforeClose: function (panel) {
        return this.closable;
    },

    /**
    * By default, the card firing this event monitors user input in a frequent
    * interval and fires the 'clientvalidation'-event along with it. This listener
    * will enable/disable the next/finish-button in accordance with it, based upon
    * the parameter isValid. isValid" will be set by the form validation and depends
    * on the validators you are using for the different input-elemnts in your form.
    * If the card does not contain any forms, this listener will never be called by the
    * card itself.
    *
    * @param {Ext.ux.Wiz.Card} The card that triggered the event.
    * @param {Boolean} isValid "true", if the user input was valid, otherwise
    * "false"
    */
    onClientValidation: function (card, isValid) {
        if (!isValid) {
            console.log("setting disabled in onClientValidation");
            this.nextButton.setDisabled(true);
        } else {
            this.nextButton.setDisabled(false);
        }
    },

    /**
    * Listener for the "show" event of the card that gets shown in the card-panel.
    * Renders the next/previous buttons based on the position of the card in the wizard
    * and updates the head-panel accordingly.
    *
    * @param {Ext.ux.Wiz.Card} The card being shown.
    */
    onCardShow: function (card) {
        var parent = card.ownerCt;

        var items = parent.items;

        for (var i = 0, len = items.length; i < len; i++) {
            if (items.get(i).id == card.id) {
                break;
            }
        }

        this.currentCard = i;
        this.headPanel.updateStep(i, card.carTitle);
        this.sidePanel.updateStep(i, card.carTitle);

        if (i == len - 1) {
            this.nextButton.setText(this.finishButtonText);
        } else {
            this.nextButton.setText(this.nextButtonText);
        }

        if (card.isValid()) {
            this.nextButton.setDisabled(false);
        }

        if (i == 0) {
            this.previousButton.setDisabled(true);
        } else {
            this.previousButton.setDisabled(false);
        }

    },


    /**
    * Fires the 'cancel'-event. Closes this dialog if the return value of the
    * listeners does not equal to "false".
    */
    onCancelClick: function () {
        if (this.fireEvent('cancel', this, this.getWizardData()) !== false) {
            this.closable = true;
            this.close();
        }
    },

    /**
    * Fires the 'finish'-event. Closes this dialog if the return value of the
    * listeners does not equal to "false".
    */
    onFinish: function () {
        if (this.fireEvent('finish', this, this.getWizardData()) !== false) {
            this.closable = true;
            this.close();
        }
    },

    /**
    * Listener for the previous-button.
    * Switches to the previous displayed {@link Ext.ux.Wiz.Card}.
    */
    onPreviousClick: function (btn) {
        if (this.currentCard > 0) {
            // this.cardPanel.getLayout().setActiveItem(this.currentCard - 1);
            var mywiz = btn.up('panel').cardPanel;
            this.navigate(mywiz, 'prev');
        }
    },

    /**
    * Listener for the next-button. Switches to the next {@link Ext.ux.Wiz.Card}
    * if the 'beforehide'-method of it did not return false. The functionality
    * for this is implemented in {@link Ext.ux.layout.CardLayout}, which is needed
    * as the layout for the card-panel of this component.
    */
    onNextClick: function (btn) {
        if (this.currentCard == this.cardCount - 1) {
            this.onFinish();
        } else {
            // this.cardPanel.getLayout().setActiveItem(this.currentCard + 1);
            var p = this.cardPanel.items.items[this.currentCard];

            if (p) {
                f = p.getForm();
                if (f.isValid()) {
                    this.navigate(btn.up('panel').cardPanel, "next");
                } else {
                    p.items.items[0].el.frame("#ff0000");
                }
            }
        }
    },
    navigate: function (panel, direction) {
        // This routine could contain business logic required to manage the navigation steps.
        // It would call setActiveItem as needed, manage navigation button state, handle any
        // branching logic that might be required, handle alternate actions like cancellation
        // or finalization, etc.  A complete wizard implementation could get pretty
        // sophisticated depending on the complexity required, and should probably be
        // done as a subclass of CardLayout in a real-world implementation.
        var layout = panel.getLayout();
        layout[direction]();
        Ext.getCmp('wizard-move-prev').setDisabled(!layout.getPrev());
        // Ext.getCmp('wizard-move-next').setDisabled(!layout.getNext());
    },
    afterRender: function () {
        this.callParent();

        var ly = this.cardPanel.getLayout();
    }
});
/**
 * Licensed under GNU LESSER GENERAL PUBLIC LICENSE Version 3
 *
 * @author Thorsten Suckow-Homberg <ts@siteartwork.de>
 * @url http://www.siteartwork.de/cardlayout
 */

/**
 * @class Ext.ux.layout.CardLayout
 * @extends Ext.layout.CardLayout
 *
 * A specific {@link Ext.layout.CardLayout} that only sets the active item
 * if the 'beforehide'-method of the card to hide did not return false (in this case,
 * components usually won't be hidden).
 * The original implementation of {@link Ext.layout.CardLayout} does not take
 * the return value of the 'beforehide'-method into account.
 *
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('Ext.ux.wizard.CardLayout', {
	
	extend: 'Ext.layout.container.Card',

    /**
     * Sets the active (visible) item in the layout.
     *
     * If the currently visible item is still visible after calling the 'hide()
     * method on it, this implementation assumes that the 'beforehide'-event returned
     * false, thus not the item was not allowed to be hidden. The active item will then
     * equal to the item that was active, before this method was called.
     *
     * @param {String/Number} item The string component id or numeric index of the item to activate
     */
    setActiveItem : function(item){
        item = this.container.getComponent(item);
        if(this.activeItem != item){
            if(this.activeItem){
                this.activeItem.hide();
            }
            // check if the beforehide method allowed to
            // hide the current item
            if (this.activeItem && !this.activeItem.hidden) {
                return;
            }
            var layout = item.doLayout && (this.layoutOnCardChange || !item.rendered);
            this.activeItem = item;
            item.show();
            this.layout();
            if(layout){
                item.doLayout();
            }
        }
    }

});
/* 
 * More info at: http://phpjs.org
 * 
 * This is version: 2.4
 * php.js is copyright 2009 Kevin van Zonneveld.
 * 
 * Portions copyright Brett Zamir, Kevin van Zonneveld
 * (http://kevin.vanzonneveld.net), Onno Marsman, Michael White
 * (http://getsprink.com), Waldo Malqui Silva, Paulo Ricardo F. Santos, Jack,
 * Jonas Raoni Soares Silva (http://www.jsfromhell.com), Philip Peterson,
 * Legaev Andrey, Ates Goral (http://magnetiq.com), Martijn Wieringa, Nate,
 * Philippe Baumann, Enrique Gonzalez, Webtoolkit.info
 * (http://www.webtoolkit.info/), Jani Hartikainen, Carlos R. L. Rodrigues
 * (http://www.jsfromhell.com), Ash Searle (http://hexmen.com/blog/), Johnny
 * Mast (http://www.phpvrouwen.nl), GeekFG (http://geekfg.blogspot.com),
 * Erkekjetter, Alex, d3x, marrtins, Andrea Giammarchi
 * (http://webreflection.blogspot.com), mdsjack (http://www.mdsjack.bo.it),
 * Mirek Slugen, Steven Levithan (http://blog.stevenlevithan.com), Marc Palau,
 * Public Domain (http://www.json.org/json2.js), David, Arpad Ray
 * (mailto:arpad@php.net), Caio Ariede (http://caioariede.com), Pellentesque
 * Malesuada, Sakimori, AJ, Tyler Akins (http://rumkin.com), Thunder.m, Aman
 * Gupta, Karol Kowalski, Steve Hilder, Alfonso Jimenez
 * (http://www.alfonsojimenez.com), gorthaur, T. Wild, Sanjoy Roy, Felix
 * Geisendoerfer (http://www.debuggable.com/felix), 0m3r, kenneth, Hyam Singer
 * (http://www.impact-computing.com/), Paul, class_exists, Steve Clay, john
 * (http://www.jd-tech.net), ger, marc andreu, nobbler, Douglas Crockford
 * (http://javascript.crockford.com), madipta, David James, Subhasis Deb,
 * noname, Marco, sankai, Francesco, J A R, Bayron Guevara, T0bsn, Peter-Paul
 * Koch (http://www.quirksmode.org/js/beat.html), MeEtc
 * (http://yass.meetcweb.com), Pyerre, Jon Hohle, Lincoln Ramsay, djmix,
 * Linuxworld, Thiago Mata (http://thiagomata.blog.com), Brad Touesnard, Tim
 * Wiel, Der Simon (http://innerdom.sourceforge.net/), Gilbert, LH, Marc
 * Jansen, echo is bad, duncan, Bryan Elliott, David Randall, Ozh, XoraX
 * (http://www.xorax.info), Francois, Nathan, Bobby Drake, Pul, Eric Nagel,
 * rezna, Martin Pool, Kirk Strobeck, Mick@el, Luke Godfrey, Blues
 * (http://tech.bluesmoon.info/), YUI Library:
 * http://developer.yahoo.com/yui/docs/YAHOO.util.DateLocale.html, Blues at
 * http://hacks.bluesmoon.info/strftime/strftime.js, Christian Doebler,
 * penutbutterjelly, Anton Ongson, Simon Willison (http://simonwillison.net),
 * Gabriel Paderni, Pierre-Luc Paour, Kristof Coomans (SCK-CEN Belgian
 * Nucleair Research Centre), hitwork, Norman "zEh" Fuchs, sowberry, Yves
 * Sucaet, Nick Callen, ejsanders, johnrembo, dptr1988, Pedro Tainha
 * (http://www.pedrotainha.com), uestla, Valentina De Rosa, Saulo Vallory,
 * T.Wild, metjay, DxGx, Alexander Ermolaev
 * (http://snippets.dzone.com/user/AlexanderErmolaev), ChaosNo1, Andreas,
 * Garagoth, Robin, Matt Bradley, taith, FremyCompany, Tod Gentille, Breaking
 * Par Consulting Inc
 * (http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7),
 * Josh Fraser
 * (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/),
 * Manish, Cord, ReverseSyntax, Mateusz "loonquawl" Zalega, Arno, Slawomir
 * Kaniecki, Scott Cariss, Victor, stensi, Jalal Berrami, baris ozdil,
 * FGFEmperor, booeyOH, Cagri Ekin, Ben Bryan, Leslie Hoare, Andrej Pavlovic,
 * Dino, mk.keck, Luke Smith (http://lucassmith.name), Rival, jakes, Yannoo,
 * gabriel paderni, Atli Þór, Benjamin Lupton, Diogo Resende, Howard Yeend,
 * Allan Jensen (http://www.winternet.no)
 * 
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */ 


// Compression: minified


function abs(mixed_number){return Math.abs(mixed_number)||0;}
function acos(arg){return Math.acos(arg);}
function acosh(arg){return Math.log(arg+Math.sqrt(arg*arg-1));}
function addslashes(str){return(str+'').replace(/([\\"'])/g,"\\$1").replace(/\0/g,"\\0");}
function array_change_key_case(array){var case_fn,tmp_ar=new Object,argc=arguments.length,argv=arguments,key;if(array instanceof Array){return array;}
if(array instanceof Object){if(argc==1||argv[1]=='CASE_LOWER'||argv[1]==0){case_fn="toLowerCase";}else{case_fn="toUpperCase";}
for(key in array){tmp_ar[key[case_fn]()]=array[key];}
return tmp_ar;}
return false;}
function array_chunk(input,size){for(var x,i=0,c=-1,l=input.length,n=[];i<l;i++){(x=i%size)?n[c][x]=input[i]:n[++c]=[input[i]];}
return n;}
function array_combine(keys,values){var new_array={},keycount=keys.length,i;if(!keys||!values||keys.constructor!==Array||values.constructor!==Array){return false;}
if(keycount!=values.length){return false;}
for(i=0;i<keycount;i++){new_array[keys[i]]=values[i];}
return new_array;}
function array_count_values(array){var tmp_arr={},key='',t='';var __getType=function(obj){var t=typeof obj;t=t.toLowerCase();if(t=="object"){t="array";}
return t;}
var __countValue=function(value){switch(typeof(value)){case"number":if(Math.floor(value)!=value){return;}
case"string":if(value in this){++this[value];}else{this[value]=1;}}};t=__getType(array);if(t=='array'){for(key in array){__countValue.call(tmp_arr,array[key]);}}
return tmp_arr;}
function array_diff(){var arr1=arguments[0],retArr={};var k1='',i=1,k='',arr={};arr1keys:for(k1 in arr1){for(i=1;i<arguments.length;i++){arr=arguments[i];for(k in arr){if(arr[k]===arr1[k1]){continue arr1keys;}}
retArr[k1]=arr1[k1];}}
return retArr;}
function array_diff_assoc(){var arr1=arguments[0],retArr={};var k1='',i=1,k='',arr={};arr1keys:for(k1 in arr1){for(i=1;i<arguments.length;i++){arr=arguments[i];for(k in arr){if(arr[k]===arr1[k1]&&k===k1){continue arr1keys;}}
retArr[k1]=arr1[k1];}}
return retArr;}
function array_diff_key(){var arr1=arguments[0],retArr={};var k1='',i=1,k='',arr={};arr1keys:for(k1 in arr1){for(i=1;i<arguments.length;i++){arr=arguments[i];for(k in arr){if(k===k1){continue arr1keys;}}
retArr[k1]=arr1[k1];}}
return retArr;}
function array_diff_uassoc(){var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];var arr={},i=1,k1='',k='';cb=(typeof cb==='string')?window[cb]:(cb instanceof Array)?window[cb[0]][cb[1]]:cb;arr1keys:for(k1 in arr1){for(i=1;i<arguments.length-1;i++){arr=arguments[i];for(k in arr){if(arr[k]===arr1[k1]&&cb(k,k1)===0){continue arr1keys;}}
retArr[k1]=arr1[k1];}}
return retArr;}
function array_diff_ukey(){var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];var arr={},i=1,k1='',k='';cb=(typeof cb==='string')?window[cb]:(cb instanceof Array)?window[cb[0]][cb[1]]:cb;arr1keys:for(k1 in arr1){for(i=1;i<arguments.length-1;i++){arr=arguments[i];for(k in arr){if(cb(k,k1)===0){continue arr1keys;}}
retArr[k1]=arr1[k1];}}
return retArr;}
function array_fill(start_index,num,mixed_val){var key,tmp_arr={};if(!isNaN(start_index)&&!isNaN(num)){for(key=0;key<num;key++){tmp_arr[(key+start_index)]=mixed_val;}}
return tmp_arr;}
function array_fill_keys(keys,value){var retObj={},key='';for(key in keys){retObj[keys[key]]=value;}
return retObj;}
function array_filter(arr,func){var retObj={},k;for(k in arr){if(func(arr[k])){retObj[k]=arr[k];}}
return retObj;}
function array_flip(trans){var key,tmp_ar={};for(key in trans){tmp_ar[trans[key]]=key;}
return tmp_ar;}
function array_intersect(){var arr1=arguments[0],retArr={};var k1='',arr={},i=0,k='';arr1keys:for(k1 in arr1){arrs:for(i=1;i<arguments.length;i++){arr=arguments[i];for(k in arr){if(arr[k]===arr1[k1]){if(i===arguments.length-1){retArr[k1]=arr1[k1];}
continue arrs;}}
continue arr1keys;}}
return retArr;}
function array_intersect_assoc(){var arr1=arguments[0],retArr={};var k1='',arr={},i=0,k='';arr1keys:for(k1 in arr1){arrs:for(i=1;i<arguments.length;i++){arr=arguments[i];for(k in arr){if(arr[k]===arr1[k1]&&k===k1){if(i===arguments.length-1){retArr[k1]=arr1[k1];}
continue arrs;}}
continue arr1keys;}}
return retArr;}
function array_intersect_key(){var arr1=arguments[0],retArr={};var k1='',arr={},i=0,k='';arr1keys:for(k1 in arr1){arrs:for(i=1;i<arguments.length;i++){arr=arguments[i];for(k in arr){if(k===k1){if(i===arguments.length-1){retArr[k1]=arr1[k1];}
continue arrs;}}
continue arr1keys;}}
return retArr;}
function array_intersect_uassoc(){var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];var k1='',i=1,arr={},k='';cb=(typeof cb==='string')?window[cb]:(cb instanceof Array)?window[cb[0]][cb[1]]:cb;arr1keys:for(k1 in arr1){arrs:for(i=1;i<arguments.length-1;i++){arr=arguments[i];for(k in arr){if(arr[k]===arr1[k1]&&cb(k,k1)===0){if(i===arguments.length-2){retArr[k1]=arr1[k1];}
continue arrs;}}
continue arr1keys;}}
return retArr;}
function array_intersect_ukey(){var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];var k1='',i=1,arr={},k='';cb=(typeof cb==='string')?window[cb]:(cb instanceof Array)?window[cb[0]][cb[1]]:cb;arr1keys:for(k1 in arr1){arrs:for(i=1;i<arguments.length-1;i++){arr=arguments[i];for(k in arr){if(cb(k,k1)===0){if(i===arguments.length-2){retArr[k1]=arr1[k1];}
continue arrs;}}
continue arr1keys;}}
return retArr;}
function array_key_exists(key,search){if(!search||(search.constructor!==Array&&search.constructor!==Object)){return false;}
return key in search;}
function array_keys(input,search_value,argStrict){var tmp_arr={},strict=!!argStrict,include=true,cnt=0;var key='';for(key in input){include=true;if(search_value!=undefined){if(strict&&input[key]!==search_value){include=false;}else if(input[key]!=search_value){include=false;}}
if(include){tmp_arr[cnt]=key;cnt++;}}
return tmp_arr;}
function array_map(callback){var argc=arguments.length,argv=arguments;var j=argv[1].length,i=0,k=1,m=0;var tmp=[],tmp_ar=[];while(i<j){while(k<argc){tmp[m++]=argv[k++][i];}
m=0;k=1;if(callback){tmp_ar[i++]=callback.apply(null,tmp);}else{tmp_ar[i++]=tmp;}
tmp=[];}
return tmp_ar;}
function array_merge(){var args=Array.prototype.slice.call(arguments);var retObj={},k,j=0,i=0;var retArr;for(i=0,retArr=true;i<args.length;i++){if(!(args[i]instanceof Array)){retArr=false;break;}}
if(retArr){return args;}
var ct=0;for(i=0,ct=0;i<args.length;i++){if(args[i]instanceof Array){for(j=0;j<args[i].length;j++){retObj[ct++]=args[i][j];}}else{for(k in args[i]){if(is_int(k)){retObj[ct++]=args[i][k];}else{retObj[k]=args[i][k];}}}}
return retObj;}
function array_merge_recursive(arr1,arr2){var idx='';if((arr1&&(arr1 instanceof Array))&&(arr2&&(arr2 instanceof Array))){for(idx in arr2){arr1.push(arr2[idx]);}}else if((arr1&&(arr1 instanceof Object))&&(arr2&&(arr2 instanceof Object))){for(idx in arr2){if(idx in arr1){if(typeof arr1[idx]=='object'&&typeof arr2=='object'){arr1[idx]=array_merge(arr1[idx],arr2[idx]);}else{arr1[idx]=arr2[idx];}}else{arr1[idx]=arr2[idx];}}}
return arr1;}
function array_pad(input,pad_size,pad_value){var pad=[],newArray=[],newLength,i=0;if(input instanceof Array&&!isNaN(pad_size)){newLength=((pad_size<0)?(pad_size*-1):pad_size);if(newLength>input.length){for(i=0;i<(newLength-input.length);i++){newArray[i]=pad_value;}
pad=((pad_size<0)?newArray.concat(input):input.concat(newArray));}else{pad=input;}}
return pad;}
function array_pop(array){var key='',cnt=0;if(array.hasOwnProperty('length')){if(!array.length){return null;}
return array.pop();}else{for(key in array){cnt++;}
if(cnt){delete(array[key]);return array[key];}else{return null;}}}
function array_product(input){var Index=0,Product=1;if(input instanceof Array){while(Index<input.length){Product*=(!isNaN(input[Index])?input[Index]:0);Index++;}}else{Product=null;}
return Product;}
function array_push(array){var i,argv=arguments,argc=argv.length;for(i=1;i<argc;i++){array[array.length++]=argv[i];}
return array.length;}
function array_rand(input,num_req){var Indexes=[];var Ticks=num_req||1;var checkDuplicate=function(input,value){var Exist=false,Index=0;while(Index<input.length){if(input[Index]===value){Exist=true;break;}
Index++;}
return Exist;};if(input instanceof Array&&Ticks<=input.length){while(true){var Rand=Math.floor((Math.random()*input.length));if(Indexes.length===Ticks){break;}
if(!checkDuplicate(Indexes,Rand)){Indexes.push(Rand);}}}else{Indexes=null;}
return((Ticks==1)?Indexes.join():Indexes);}
function array_reduce(a_input,callback){var lon=a_input.length;var res=0,i=0;var tmp=[];for(i=0;i<lon;i+=2){tmp[0]=a_input[i];if(a_input[(i+1)]){tmp[1]=a_input[(i+1)];}else{tmp[1]=0;}
res+=callback.apply(null,tmp);tmp=[];}
return res;}
function array_reverse(array,preserve_keys){var arr_len=array.length,newkey=0,tmp_arr={},key='';preserve_keys=!!preserve_keys;for(key in array){newkey=arr_len-key-1;tmp_arr[preserve_keys?key:newkey]=array[key];}
return tmp_arr;}
function array_search(needle,haystack,argStrict){var strict=!!argStrict;var key='';for(key in haystack){if((strict&&haystack[key]===needle)||(!strict&&haystack[key]==needle)){return key;}}
return false;}
function array_shift(array){if(array.length>0){return array.shift();}
return null;}
function array_slice(arr,offst,lgth,preserve_keys){var key='';if(!(arr instanceof Array)||(preserve_keys&&offst!=0)){var lgt=0,newAssoc={};for(key in arr){lgt+=1;newAssoc[key]=arr[key];}
arr=newAssoc;offst=(offst<0)?lgt+offst:offst;lgth=lgth==undefined?lgt:(lgth<0)?lgt+lgth-offst:lgth;var assoc={};var start=false,it=-1,arrlgth=0,no_pk_idx=0;for(key in arr){++it;if(arrlgth>=lgth){break;}
if(it==offst){start=true;}
if(!start){continue;}
++arrlgth;if(is_int(key)&&!preserve_keys){assoc[no_pk_idx++]=arr[key];}else{assoc[key]=arr[key];}}
return assoc;}
if(lgth===undefined){return arr.slice(offst);}else if(lgth>=0){return arr.slice(offst,offst+lgth);}else{return arr.slice(offst,lgth);}}
function array_splice(arr,offst,lgth,replacement){var checkToUpIndices=function(arr,ct,key){if(arr[ct]!==undefined){var tmp=ct;ct+=1;if(ct===key){ct+=1;}
ct=checkToUpIndices(arr,ct,key);arr[ct]=arr[tmp];delete arr[tmp];}
return ct;}
if(replacement&&!(typeof replacement==='object')){replacement=[replacement];}
if(lgth===undefined){lgth=offst>=0?arr.length-offst:-offst;}else if(lgth<0){lgth=(offst>=0?arr.length-offst:-offst)+lgth;}
if(!(arr instanceof Array)){var lgt=0,ct=-1,rmvd=[],rmvdObj={},repl_ct=-1,int_ct=-1;var returnArr=true,rmvd_ct=0,rmvd_lgth=0,key='';for(key in arr){lgt+=1;}
offst=(offst>=0)?offst:lgt+offst;for(key in arr){ct+=1;if(ct<offst){if(is_int(key)){int_ct+=1;if(parseInt(key,10)===int_ct){continue;}
checkToUpIndices(arr,int_ct,key);arr[int_ct]=arr[key];delete arr[key];}
continue;}
if(returnArr&&is_int(key)){rmvd.push(arr[key]);rmvdObj[rmvd_ct++]=arr[key];}else{rmvdObj[key]=arr[key];returnArr=false;}
rmvd_lgth+=1;if(replacement&&replacement[++repl_ct]){arr[key]=replacement[repl_ct]}else{delete arr[key];}}
return returnArr?rmvd:rmvdObj;}
if(replacement){replacement.unshift(offst,lgth);return Array.prototype.splice.apply(arr,replacement);}
return arr.splice(offst,lgth);}
function array_sum(array){var key,sum=0;if(typeof array!=='object'){return null;}
for(key in array){sum+=(array[key]*1);}
return sum;}
function array_udiff(){var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];var arr='',i=1,k1='',k='';cb=(typeof cb==='string')?window[cb]:(cb instanceof Array)?window[cb[0]][cb[1]]:cb;arr1keys:for(k1 in arr1){for(i=1;i<arguments.length-1;i++){arr=arguments[i];for(k in arr){if(cb(arr[k],arr1[k1])===0){continue arr1keys;}}
retArr[k1]=arr1[k1];}}
return retArr;}
function array_udiff_assoc(){var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];var arr={},i=1,k1='',k='';cb=(typeof cb==='string')?window[cb]:(cb instanceof Array)?window[cb[0]][cb[1]]:cb;arr1keys:for(k1 in arr1){for(i=1;i<arguments.length-1;i++){arr=arguments[i];for(k in arr){if(cb(arr[k],arr1[k1])===0&&k===k1){continue arr1keys;}}
retArr[k1]=arr1[k1];}}
return retArr;}
function array_udiff_uassoc(){var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1],cb0=arguments[arguments.length-2];var k1='',i=1,k='',arr={};cb=(typeof cb==='string')?window[cb]:(cb instanceof Array)?window[cb[0]][cb[1]]:cb;cb0=(typeof cb0==='string')?window[cb0]:(cb0 instanceof Array)?window[cb0[0]][cb0[1]]:cb0;arr1keys:for(k1 in arr1){for(i=1;i<arguments.length-2;i++){arr=arguments[i];for(k in arr){if(cb0(arr[k],arr1[k1])===0&&cb(k,k1)===0){continue arr1keys;}}
retArr[k1]=arr1[k1];}}
return retArr;}
function array_uintersect(){var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];var k1='',i=1,arr={},k='';cb=(typeof cb==='string')?window[cb]:(cb instanceof Array)?window[cb[0]][cb[1]]:cb;arr1keys:for(k1 in arr1){arrs:for(i=1;i<arguments.length-1;i++){arr=arguments[i];for(k in arr){if(cb(arr[k],arr1[k1])===0){if(i===arguments.length-2){retArr[k1]=arr1[k1];}
continue arrs;}}
continue arr1keys;}}
return retArr;}
function array_uintersect_assoc(){var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];var k1='',i=1,arr={},k='';cb=(typeof cb==='string')?window[cb]:(cb instanceof Array)?window[cb[0]][cb[1]]:cb;arr1keys:for(k1 in arr1){arrs:for(i=1;i<arguments.length-1;i++){arr=arguments[i];for(k in arr){if(cb(arr[k],arr1[k1])===0&&k===k1){if(i===arguments.length-2){retArr[k1]=arr1[k1];}
continue arrs;}}
continue arr1keys;}}
return retArr;}
function array_uintersect_uassoc(){var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1],cb0=arguments[arguments.length-2];var k1='',i=1,k='',arr={};cb=(typeof cb==='string')?window[cb]:(cb instanceof Array)?window[cb[0]][cb[1]]:cb;cb0=(typeof cb0==='string')?window[cb0]:(cb0 instanceof Array)?window[cb0[0]][cb0[1]]:cb0;arr1keys:for(k1 in arr1){arrs:for(i=1;i<arguments.length-2;i++){arr=arguments[i];for(k in arr){if(cb0(arr[k],arr1[k1])===0&&cb(k,k1)===0){if(i===arguments.length-3){retArr[k1]=arr1[k1];}
continue arrs;}}
continue arr1keys;}}
return retArr;}
function array_unique(array){var key='',tmp_arr1={},tmp_arr2={};var val='';tmp_arr1=array;var __array_search=function(needle,haystack,argStrict){var fkey='';var strict=!!argStrict;for(fkey in haystack){if((strict&&haystack[fkey]===needle)||(!strict&&haystack[fkey]==needle)){return fkey;}}
return false;}
for(key in tmp_arr1){val=tmp_arr1[key];if(false===__array_search(val,tmp_arr2)){tmp_arr2[key]=val;}
delete tmp_arr1[key];}
return tmp_arr2;}
function array_unshift(array){var argc=arguments.length,argv=arguments,i;for(i=1;i<argc;i++){array.unshift(argv[i]);}
return(array.length);}
function array_values(input){var tmp_arr=[],cnt=0;var key='';for(key in input){tmp_arr[cnt]=input[key];cnt++;}
return tmp_arr;}
function array_walk(array,funcname,userdata){var key;if(typeof array!='object'){return false;}
for(key in array){if(typeof(userdata)!='undefined'){eval(funcname+'( array [key] , key , userdata  )');}else{eval(funcname+'(  userdata ) ');}}
return true;}
function array_walk_recursive(array,funcname,userdata){var key;if(typeof array!='object'){return false;}
for(key in array){if(typeof array[key]=='object'){return array_walk_recursive(array[key],funcname,userdata);}
if(typeof(userdata)!='undefined'){eval(funcname+'( array [key] , key , userdata  )');}else{eval(funcname+'(  userdata ) ');}}
return true;}
function arsort(inputArr,sort_flags){var valArr=[],keyArr=[],k,i,ret,sorter;switch(sort_flags){case'SORT_STRING':sorter=function(a,b){return strnatcmp(b,a);};break;case'SORT_LOCALE_STRING':sorter=function(a,b){return(b.localeCompare(a));};break;case'SORT_NUMERIC':sorter=function(a,b){return(a-b);};break;case'SORT_REGULAR':default:sorter=function(a,b){if(a>b)
return 1;if(a<b)
return-1;return 0;};break;}
var bubbleSort=function(keyArr,inputArr){var i,j,tempValue,tempKeyVal;for(i=inputArr.length-2;i>=0;i--){for(j=0;j<=i;j++){ret=sorter(inputArr[j+1],inputArr[j]);if(ret>0){tempValue=inputArr[j];inputArr[j]=inputArr[j+1];inputArr[j+1]=tempValue;tempKeyVal=keyArr[j];keyArr[j]=keyArr[j+1];keyArr[j+1]=tempKeyVal;}}}};for(k in inputArr){valArr.push(inputArr[k]);keyArr.push(k);delete inputArr[k];}
try{bubbleSort(keyArr,valArr);}catch(e){return false;}
for(i=0;i<valArr.length;i++){inputArr[keyArr[i]]=valArr[i];}
return true;}
function asin(arg){return Math.asin(arg);}
function asinh(arg){return Math.log(arg+Math.sqrt(arg*arg+1));}
function asort(inputArr,sort_flags){var valArr=[],keyArr=[],k,i,ret,sorter;switch(sort_flags){case'SORT_STRING':sorter=function(a,b){return strnatcmp(a,b);};break;case'SORT_LOCALE_STRING':sorter=function(a,b){return(a.localeCompare(b));};break;case'SORT_NUMERIC':sorter=function(a,b){return(a-b);};break;case'SORT_REGULAR':default:sorter=function(a,b){if(a>b)
return 1;if(a<b)
return-1;return 0;};break;}
var bubbleSort=function(keyArr,inputArr){var i,j,tempValue,tempKeyVal;for(i=inputArr.length-2;i>=0;i--){for(j=0;j<=i;j++){ret=sorter(inputArr[j+1],inputArr[j]);if(ret<0){tempValue=inputArr[j];inputArr[j]=inputArr[j+1];inputArr[j+1]=tempValue;tempKeyVal=keyArr[j];keyArr[j]=keyArr[j+1];keyArr[j+1]=tempKeyVal;}}}};for(k in inputArr){valArr.push(inputArr[k]);keyArr.push(k);delete inputArr[k];}
try{bubbleSort(keyArr,valArr);}catch(e){return false;}
for(i=0;i<valArr.length;i++){inputArr[keyArr[i]]=valArr[i];}
return true;}
function atan(arg){return Math.atan(arg);}
function atanh(arg){return 0.5*Math.log((1+arg)/(1-arg));}
function base64_decode(data){var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var o1,o2,o3,h1,h2,h3,h4,bits,i=0,ac=0,dec="",tmp_arr=[];if(!data){return data;}
data+='';do{h1=b64.indexOf(data.charAt(i++));h2=b64.indexOf(data.charAt(i++));h3=b64.indexOf(data.charAt(i++));h4=b64.indexOf(data.charAt(i++));bits=h1<<18|h2<<12|h3<<6|h4;o1=bits>>16&0xff;o2=bits>>8&0xff;o3=bits&0xff;if(h3==64){tmp_arr[ac++]=String.fromCharCode(o1);}else if(h4==64){tmp_arr[ac++]=String.fromCharCode(o1,o2);}else{tmp_arr[ac++]=String.fromCharCode(o1,o2,o3);}}while(i<data.length);dec=tmp_arr.join('');dec=utf8_decode(dec);return dec;}
function base64_encode(data){var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var o1,o2,o3,h1,h2,h3,h4,bits,i=0,ac=0,enc="",tmp_arr=[];if(!data){return data;}
data=utf8_encode(data+'');do{o1=data.charCodeAt(i++);o2=data.charCodeAt(i++);o3=data.charCodeAt(i++);bits=o1<<16|o2<<8|o3;h1=bits>>18&0x3f;h2=bits>>12&0x3f;h3=bits>>6&0x3f;h4=bits&0x3f;tmp_arr[ac++]=b64.charAt(h1)+b64.charAt(h2)+b64.charAt(h3)+b64.charAt(h4);}while(i<data.length);enc=tmp_arr.join('');switch(data.length%3){case 1:enc=enc.slice(0,-2)+'==';break;case 2:enc=enc.slice(0,-1)+'=';break;}
return enc;}
function base_convert(number,frombase,tobase){return parseInt(number+'',frombase+0).toString(tobase+0);}
function bin2hex(s){var i,f=0,a=[];s+='';f=s.length;for(i=0;i<f;i++){a[i]=s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");}
return a.join('');}
function bindec(binary_string){binary_string=(binary_string+'').replace(/[^01]/gi,'');return parseInt(binary_string,2);}
function ceil(value){return Math.ceil(value);}
function checkdate(month,day,year){var myDate=new Date();myDate.setFullYear(year,(month-1),day);return((myDate.getMonth()+1)==month&&day<32);}
function chop(str,charlist){return rtrim(str,charlist);}
function chr(ascii){return String.fromCharCode(ascii);}
function chunk_split(body,argChunklen,argEnd){if(chunklen<1){return false;}
var result='',chunklen=argChunklen||76,end=argEnd||'\r\n';while(body.length>chunklen){result+=body.substring(0,chunklen)+end;body=body.substring(chunklen);}
return result+body+end;}
function class_exists(cls){var i='';cls=window[cls];if(typeof cls!=='function'){return false;}
for(i in cls.prototype){return true;}
for(i in cls){if(i!=='prototype'){return true;}}
if(cls.toSource&&cls.toSource().match(/this\./)){return true;}
return false;}
function compact(){var Matrix={};var key_value;var process=function(value){var i=0,l=value.length,key_value='';for(i=0;i<l;i++){key_value=value[i];if(key_value instanceof Array){process(key_value);}else{if(typeof window[key_value]!=='undefined'){Matrix[key_value]=window[key_value];}}}
return true;};process(arguments);return Matrix;}
function cos(arg){return Math.cos(arg);}
function cosh(arg){return(Math.exp(arg)+Math.exp(-arg))/2;}
function count(mixed_var,mode){var key,cnt=0;if(mode=='COUNT_RECURSIVE')mode=1;if(mode!=1)mode=0;for(key in mixed_var){cnt++;if(mode==1&&mixed_var[key]&&(mixed_var[key].constructor===Array||mixed_var[key].constructor===Object)){cnt+=count(mixed_var[key],1);}}
return cnt;}
function count_chars(str,mode){var histogram={},tmp_arr=[];var key,i,code,strl=0;var argc=arguments.length;var mode_even=0;if(argc==1){mode=0;}
mode_even=(mode&1)==0;if(mode_even){for(i=1;i<256;++i){histogram[i]=0;}}
str+='';strl=str.length;for(i=0;i<strl;++i){code=str.charCodeAt(i);if(code in histogram){++histogram[code];}else{histogram[code]=1;}}
if(mode>0){for(key in histogram){if(histogram[key]==0!=mode_even){delete histogram[key];}}}
if(mode<3){return histogram;}else{for(key in histogram){tmp_arr.push(String.fromCharCode(key));}
return tmp_arr.join("");}}
function crc32(str){str=utf8_encode(str);var table="00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";var crc=0;var x=0;var y=0;crc=crc^(-1);for(var i=0,iTop=str.length;i<iTop;i++){y=(crc^str.charCodeAt(i))&0xFF;x="0x"+table.substr(y*9,8);crc=(crc>>>8)^x;}
return crc^(-1);}
function date(format,timestamp){var a,tal=[],jsdate=((typeof(timestamp)=='undefined')?new Date():(typeof(timestamp)=='number')?new Date(timestamp*1000):new Date(timestamp));var pad=function(n,c){if((n=n+"").length<c){return new Array(++c-n.length).join("0")+n;}else{return n;}};var ret='';var txt_weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var txt_ordin={1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"};var txt_months=["","January","February","March","April","May","June","July","August","September","October","November","December"];var f={d:function(){return pad(f.j(),2);},D:function(){var t=f.l();return t.substr(0,3);},j:function(){return jsdate.getDate();},l:function(){return txt_weekdays[f.w()];},N:function(){return f.w()+1;},S:function(){return txt_ordin[f.j()]?txt_ordin[f.j()]:'th';},w:function(){return jsdate.getDay();},z:function(){return(jsdate-new Date(jsdate.getFullYear()+"/1/1"))/864e5>>0;},W:function(){var a=f.z(),b=364+f.L()-a;var nd2,nd=(new Date(jsdate.getFullYear()+"/1/1").getDay()||7)-1;if(b<=2&&((jsdate.getDay()||7)-1)<=2-b){return 1;}else{if(a<=2&&nd>=4&&a>=(6-nd)){nd2=new Date(jsdate.getFullYear()-1+"/12/31");return date("W",Math.round(nd2.getTime()/1000));}else{return(1+(nd<=3?((a+nd)/7):(a-(7-nd))/7)>>0);}}},F:function(){return txt_months[f.n()];},m:function(){return pad(f.n(),2);},M:function(){var t;t=f.F();return t.substr(0,3);},n:function(){return jsdate.getMonth()+1;},t:function(){var n;if((n=jsdate.getMonth()+1)==2){return 28+f.L();}else{if(n&1&&n<8||!(n&1)&&n>7){return 31;}else{return 30;}}},L:function(){var y=f.Y();return(!(y&3)&&(y%1e2||!(y%4e2)))?1:0;},o:function(){if(f.n()===12&&f.W()===1){return jsdate.getFullYear()+1;}
if(f.n()===1&&f.W()>=52){return jsdate.getFullYear()-1;}
return jsdate.getFullYear();},Y:function(){return jsdate.getFullYear();},y:function(){return(jsdate.getFullYear()+"").slice(2);},a:function(){return jsdate.getHours()>11?"pm":"am";},A:function(){return f.a().toUpperCase();},B:function(){var off=(jsdate.getTimezoneOffset()+60)*60;var theSeconds=(jsdate.getHours()*3600)+
(jsdate.getMinutes()*60)+
jsdate.getSeconds()+off;var beat=Math.floor(theSeconds/86.4);if(beat>1000)beat-=1000;if(beat<0)beat+=1000;if((String(beat)).length==1)beat="00"+beat;if((String(beat)).length==2)beat="0"+beat;return beat;},g:function(){return jsdate.getHours()%12||12;},G:function(){return jsdate.getHours();},h:function(){return pad(f.g(),2);},H:function(){return pad(jsdate.getHours(),2);},i:function(){return pad(jsdate.getMinutes(),2);},s:function(){return pad(jsdate.getSeconds(),2);},u:function(){return pad(jsdate.getMilliseconds()*1000,6);},e:function(){var abbr='',i=0;if(this.php_js&&this.php_js.default_timezone){return this.php_js.default_timezone;}
if(!tal.length){tal=timezone_abbreviations_list();}
for(abbr in tal){for(i=0;i<tal[abbr].length;i++){if(tal[abbr][i].offset===-jsdate.getTimezoneOffset()*60){return tal[abbr][i].timezone_id;}}}
return'UTC';},I:function(){var DST=(new Date(jsdate.getFullYear(),6,1,0,0,0));DST=DST.getHours()-DST.getUTCHours();var ref=jsdate.getHours()-jsdate.getUTCHours();return ref!=DST?1:0;},O:function(){var t=pad(Math.abs(jsdate.getTimezoneOffset()/60*100),4);if(jsdate.getTimezoneOffset()>0)t="-"+t;else t="+"+t;return t;},P:function(){var O=f.O();return(O.substr(0,3)+":"+O.substr(3,2));},T:function(){var abbr='',i=0;if(!tal.length){tal=timezone_abbreviations_list();}
if(this.php_js&&this.php_js.default_timezone){for(abbr in tal){for(i=0;i<tal[abbr].length;i++){if(tal[abbr][i].timezone_id===this.php_js.default_timezone){return abbr.toUpperCase();}}}}
for(abbr in tal){for(i=0;i<tal[abbr].length;i++){if(tal[abbr][i].offset===-jsdate.getTimezoneOffset()*60){return abbr.toUpperCase();}}}
return'UTC';},Z:function(){var t=-jsdate.getTimezoneOffset()*60;return t;},c:function(){return f.Y()+"-"+f.m()+"-"+f.d()+"T"+f.h()+":"+f.i()+":"+f.s()+f.P();},r:function(){return f.D()+', '+f.d()+' '+f.M()+' '+f.Y()+' '+f.H()+':'+f.i()+':'+f.s()+' '+f.O();},U:function(){return Math.round(jsdate.getTime()/1000);}};return format.replace(/[\\]?([a-zA-Z])/g,function(t,s){if(t!=s){ret=s;}else if(f[s]){ret=f[s]();}else{ret=s;}
return ret;});}
function decbin(number){return parseInt(number).toString(2);}
function dechex(number){return parseInt(number).toString(16);}
function decoct(number){return parseInt(number).toString(8);}
function deg2rad(angle){return(angle/180)*Math.PI;}
function doubleval(mixed_var){return floatval(mixed_var);}
function echo(){var arg='',argc=arguments.length,argv=arguments,i=0;var stringToDOM=function(q){var d=document;var r=function(a){return a.replace(/\r/g,' ').replace(/\n/g,' ');};var s=function(a){return a.replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"');};var t=function(a){return a.replace(/ /g,'');};var u=function(a){var b,c,e,f,g,h,i;b=d.createDocumentFragment();c=a.indexOf(' ');if(c===-1){b.appendChild(d.createElement(a.toLowerCase()));}else{i=t(a.substring(0,c)).toLowerCase();a=a.substr(c+1);b.appendChild(d.createElement(i));while(a.length){e=a.indexOf('=');if(e>=0){f=t(a.substring(0,e)).toLowerCase();g=a.indexOf('"');a=a.substr(g+1);g=a.indexOf('"');h=s(a.substring(0,g));a=a.substr(g+2);b.lastChild.setAttribute(f,h);}else{break}}}
return b;}
var v=function(a,b,c){var e,f;e=b;c=c.toLowerCase();f=e.indexOf('</'+c+'>');a=a.concat(e.substring(0,f));e=e.substr(f);while(a.indexOf('<'+c)!=-1){a=a.substr(a.indexOf('<'+c));a=a.substr(a.indexOf('>')+1);e=e.substr(e.indexOf('>')+1);f=e.indexOf('</'+c+'>');a=a.concat(e.substring(0,f));e=e.substr(f);}
return b.length-e.length;};var w=function(a){var b,c,e,f,g,h,i,j,k,l,m,n,o,p,q;b=d.createDocumentFragment();while(a&&a.length){c=a.indexOf('<');if(c===-1){a=s(a);b.appendChild(d.createTextNode(a));a=null;}else if(c){q=s(a.substring(0,c));b.appendChild(d.createTextNode(q));a=a.substr(c);}else{e=a.indexOf('<!--');if(!e){f=a.indexOf('-->');g=a.substring(4,f);g=s(g);b.appendChild(d.createComment(g));a=a.substr(f+3);}else{h=a.indexOf('>');if(a.substring(h-1,h)==='/'){i=a.indexOf('/>');j=a.substring(1,i);b.appendChild(u(j));a=a.substr(i+2);}else{k=a.indexOf('>');l=a.substring(1,k);m=d.createDocumentFragment();m.appendChild(u(l));a=a.substr(k+1);n=a.substring(0,a.indexOf('</'));a=a.substr(a.indexOf('</'));if(n.indexOf('<')!=-1){o=m.lastChild.nodeName;p=v(n,a,o);n=n.concat(a.substring(0,p));a=a.substr(p);}
a=a.substr(a.indexOf('>')+1);m.lastChild.appendChild(w(n));b.appendChild(m);}}}}
return b;};return w(q);}
for(i=0;i<argc;i++){arg=argv[i];if(document.createDocumentFragment&&document.createTextNode&&document.appendChild){if(document.body){document.body.appendChild(stringToDOM(arg));}else{document.documentElement.appendChild(stringToDOM(arg));}}else if(document.write){document.write(arg);}else{print(arg);}}}
function end(arr){if(!this.php_js)this.php_js={};if(!this.php_js.pointers)this.php_js.pointers=[];var pointers=this.php_js.pointers;if(pointers.indexOf(arr)===-1){pointers.push(arr,0);}
var arrpos=pointers.indexOf(arr);if(!(arr instanceof Array)){var ct=0;for(var k in arr){ct++;var val=arr[k];}
if(ct===0){return false;}
pointers[arrpos+1]=ct-1;return val;}
if(arr.length===0){return false;}
pointers[arrpos+1]=arr.length-1;return arr[pointers[arrpos+1]];}
function exp(arg){return Math.exp(arg);}
function explode(delimiter,string,limit){var emptyArray={0:''};if(arguments.length<2||typeof arguments[0]=='undefined'||typeof arguments[1]=='undefined')
{return null;}
if(delimiter===''||delimiter===false||delimiter===null)
{return false;}
if(typeof delimiter=='function'||typeof delimiter=='object'||typeof string=='function'||typeof string=='object')
{return emptyArray;}
if(delimiter===true){delimiter='1';}
if(!limit){return string.toString().split(delimiter.toString());}else{var splitted=string.toString().split(delimiter.toString());var partA=splitted.splice(0,limit-1);var partB=splitted.join(delimiter.toString());partA.push(partB);return partA;}}
function floatval(mixed_var){return(parseFloat(mixed_var)||0);}
function floor(value){return Math.floor(value);}
function fmod(x,y){var tmp,tmp2,p=0,pY=0,l=0.0,l2=0.0;tmp=x.toExponential().match(/^.\.?(.*)e(.+)$/);p=parseInt(tmp[2])-(tmp[1]+'').length;tmp=y.toExponential().match(/^.\.?(.*)e(.+)$/);pY=parseInt(tmp[2])-(tmp[1]+'').length;if(pY>p){p=pY;}
tmp2=(x%y);if(p<-100||p>20){l=Math.round(Math.log(tmp2)/Math.log(10));l2=Math.pow(10,l);return(tmp2/l2).toFixed(l-p)*l2;}else{return parseFloat(tmp2.toFixed(-p));}}
function get_class(obj){if(obj instanceof Object&&!(obj instanceof Array)&&!(obj instanceof Function)&&obj.constructor&&obj!=window){var arr=obj.constructor.toString().match(/function\s*(\w+)/);if(arr&&arr.length==2){return arr[1];}}
return false;}
function get_defined_vars(){var i='',arr=[],already={};for(i in window){try{if(typeof window[i]==='function'){if(!already[i]){already[i]=1;arr.push(i);}}
else if(typeof window[i]==='object'){for(var j in window[i]){if(typeof window[j]==='function'&&window[j]&&!already[j]){already[j]=1;arr.push(j);}}}}
catch(e){}}
return arr;}
function get_headers(url,format){var req=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(!req)throw new Error('XMLHttpRequest not supported');var tmp,headers,pair,i;req.open('HEAD',url,false);req.send(null);if(req.readyState<3){return false;}
tmp=req.getAllResponseHeaders();alert(tmp);tmp=tmp.split('\n');tmp=array_filter(tmp,function(value){return value.substring(1)!='';});headers=[req.status+' '+req.statusText];for(i in tmp){if(format){pair=tmp[i].split(':');headers[pair.splice(0,1)]=pair.join(':').substring(1);}else{headers[headers.length]=tmp[i];}}
return headers;}
function get_html_translation_table(table,quote_style){var entities={},histogram={},decimal=0,symbol='';var constMappingTable={},constMappingQuoteStyle={};var useTable={},useQuoteStyle={};useTable=(table?table.toUpperCase():'HTML_SPECIALCHARS');useQuoteStyle=(quote_style?quote_style.toUpperCase():'ENT_COMPAT');constMappingTable[0]='HTML_SPECIALCHARS';constMappingTable[1]='HTML_ENTITIES';constMappingQuoteStyle[0]='ENT_NOQUOTES';constMappingQuoteStyle[2]='ENT_COMPAT';constMappingQuoteStyle[3]='ENT_QUOTES';if(!isNaN(useTable)){useTable=constMappingTable[useTable];}
if(!isNaN(useQuoteStyle)){useQuoteStyle=constMappingQuoteStyle[useQuoteStyle];}
if(useTable=='HTML_SPECIALCHARS'){entities['38']='&amp;';if(useQuoteStyle!='ENT_NOQUOTES'){entities['34']='&quot;';}
if(useQuoteStyle=='ENT_QUOTES'){entities['39']='&#039;';}
entities['60']='&lt;';entities['62']='&gt;';}else if(useTable=='HTML_ENTITIES'){entities['38']='&amp;';if(useQuoteStyle!='ENT_NOQUOTES'){entities['34']='&quot;';}
if(useQuoteStyle=='ENT_QUOTES'){entities['39']='&#039;';}
entities['60']='&lt;';entities['62']='&gt;';entities['160']='&nbsp;';entities['161']='&iexcl;';entities['162']='&cent;';entities['163']='&pound;';entities['164']='&curren;';entities['165']='&yen;';entities['166']='&brvbar;';entities['167']='&sect;';entities['168']='&uml;';entities['169']='&copy;';entities['170']='&ordf;';entities['171']='&laquo;';entities['172']='&not;';entities['173']='&shy;';entities['174']='&reg;';entities['175']='&macr;';entities['176']='&deg;';entities['177']='&plusmn;';entities['178']='&sup2;';entities['179']='&sup3;';entities['180']='&acute;';entities['181']='&micro;';entities['182']='&para;';entities['183']='&middot;';entities['184']='&cedil;';entities['185']='&sup1;';entities['186']='&ordm;';entities['187']='&raquo;';entities['188']='&frac14;';entities['189']='&frac12;';entities['190']='&frac34;';entities['191']='&iquest;';entities['192']='&Agrave;';entities['193']='&Aacute;';entities['194']='&Acirc;';entities['195']='&Atilde;';entities['196']='&Auml;';entities['197']='&Aring;';entities['198']='&AElig;';entities['199']='&Ccedil;';entities['200']='&Egrave;';entities['201']='&Eacute;';entities['202']='&Ecirc;';entities['203']='&Euml;';entities['204']='&Igrave;';entities['205']='&Iacute;';entities['206']='&Icirc;';entities['207']='&Iuml;';entities['208']='&ETH;';entities['209']='&Ntilde;';entities['210']='&Ograve;';entities['211']='&Oacute;';entities['212']='&Ocirc;';entities['213']='&Otilde;';entities['214']='&Ouml;';entities['215']='&times;';entities['216']='&Oslash;';entities['217']='&Ugrave;';entities['218']='&Uacute;';entities['219']='&Ucirc;';entities['220']='&Uuml;';entities['221']='&Yacute;';entities['222']='&THORN;';entities['223']='&szlig;';entities['224']='&agrave;';entities['225']='&aacute;';entities['226']='&acirc;';entities['227']='&atilde;';entities['228']='&auml;';entities['229']='&aring;';entities['230']='&aelig;';entities['231']='&ccedil;';entities['232']='&egrave;';entities['233']='&eacute;';entities['234']='&ecirc;';entities['235']='&euml;';entities['236']='&igrave;';entities['237']='&iacute;';entities['238']='&icirc;';entities['239']='&iuml;';entities['240']='&eth;';entities['241']='&ntilde;';entities['242']='&ograve;';entities['243']='&oacute;';entities['244']='&ocirc;';entities['245']='&otilde;';entities['246']='&ouml;';entities['247']='&divide;';entities['248']='&oslash;';entities['249']='&ugrave;';entities['250']='&uacute;';entities['251']='&ucirc;';entities['252']='&uuml;';entities['253']='&yacute;';entities['254']='&thorn;';entities['255']='&yuml;';}else{throw Error("Table: "+useTable+' not supported');return false;}
for(decimal in entities){symbol=String.fromCharCode(decimal);histogram[symbol]=entities[decimal];}
return histogram;}
function getdate(timestamp){var _w=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];var _m=['January','February','March','April','May','June','July','August','September','October','November','December'];var d=(typeof timestamp=='number')?new Date(timestamp*1000):new Date();var w=d.getDay();var m=d.getMonth();var y=d.getFullYear();var r={};r['seconds']=d.getSeconds();r['minutes']=d.getMinutes();r['hours']=d.getHours();r['mday']=d.getDate();r['wday']=w;r['mon']=m+1;r['year']=y;r['yday']=Math.floor((d-(new Date(y,0,1)))/86400000);r['weekday']=_w[w];r['month']=_m[m];r['0']=parseInt(d.getTime()/1000);return r;}
function getrandmax()
{return 2147483647;}
function hexdec(hex_string){hex_string=(hex_string+'').replace(/[^a-f0-9]/gi,'');return parseInt(hex_string,16);}
function html_entity_decode(string,quote_style){var histogram={},symbol='',tmp_str='',entity='';tmp_str=string.toString();if(false===(histogram=get_html_translation_table('HTML_ENTITIES',quote_style))){return false;}
delete(histogram['&']);histogram['&']='&amp;';for(symbol in histogram){entity=histogram[symbol];tmp_str=tmp_str.split(entity).join(symbol);}
return tmp_str;}
function htmlentities(string,quote_style){var histogram={},symbol='',tmp_str='',entity='';tmp_str=string.toString();if(false===(histogram=get_html_translation_table('HTML_ENTITIES',quote_style))){return false;}
for(symbol in histogram){entity=histogram[symbol];tmp_str=tmp_str.split(symbol).join(entity);}
return tmp_str;}
function htmlspecialchars(string,quote_style){var histogram={},symbol='',tmp_str='',entity='';tmp_str=string.toString();if(false===(histogram=get_html_translation_table('HTML_SPECIALCHARS',quote_style))){return false;}
for(symbol in histogram){entity=histogram[symbol];tmp_str=tmp_str.split(symbol).join(entity);}
return tmp_str;}
function htmlspecialchars_decode(string,quote_style){var histogram={},symbol='',tmp_str='',entity='';tmp_str=string.toString();if(false===(histogram=get_html_translation_table('HTML_SPECIALCHARS',quote_style))){return false;}
delete(histogram['&']);histogram['&']='&amp;';for(symbol in histogram){entity=histogram[symbol];tmp_str=tmp_str.split(entity).join(symbol);}
return tmp_str;}
function http_build_query(formdata,numeric_prefix,arg_separator){var key,use_val,use_key,i=0,j=0,tmp_arr=[];if(!arg_separator){arg_separator='&';}
for(key in formdata){use_val=urlencode(formdata[key].toString());use_key=urlencode(key);if(numeric_prefix&&!isNaN(key)){use_key=numeric_prefix+j;j++;}
tmp_arr[i++]=use_key+'='+use_val;}
return tmp_arr.join(arg_separator);}
function hypot(x,y){return Math.sqrt(x*x+y*y)||0;}
function implode(glue,pieces){return((pieces instanceof Array)?pieces.join(glue):pieces);}
function in_array(needle,haystack,argStrict){var found=false,key,strict=!!argStrict;for(key in haystack){if((strict&&haystack[key]===needle)||(!strict&&haystack[key]==needle)){found=true;break;}}
return found;}
function intval(mixed_var,base){var tmp;var type=typeof(mixed_var);if(type=='boolean'){if(mixed_var==true){return 1;}else{return 0;}}else if(type=='string'){tmp=parseInt(mixed_var*1);if(isNaN(tmp)||!isFinite(tmp)){return 0;}else{return tmp.toString(base||10);}}else if(type=='number'&&isFinite(mixed_var)){return Math.floor(mixed_var);}else{return 0;}}
function ip2long(ip_address){var output=false;var parts=[];if(ip_address.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)){parts=ip_address.split('.');output=(parts[0]*16777216+
(parts[1]*65536)+
(parts[2]*256)+
(parts[3]*1));}
return output;}
function is_bool(mixed_var)
{return(typeof mixed_var=='boolean');}
function is_double(mixed_var){return is_float(mixed_var);}
function is_finite(val){var warningType='';if(val===Infinity||val===-Infinity){return false;}
if(typeof val=='object'){warningType=(val instanceof Array?'array':'object');}else if(typeof val=='string'&&!val.match(/^[\+\-]?\d/)){warningType='string';}
if(warningType){throw new Error('Warning: is_finite() expects parameter 1 to be double, '+warningType+' given');}
return true;}
function is_float(mixed_var){return parseFloat(mixed_var*1)!=parseInt(mixed_var*1);}
function is_infinite(val){var warningType='';if(val===Infinity||val===-Infinity){return true;}
if(typeof val=='object'){warningType=(val instanceof Array?'array':'object');}else if(typeof val=='string'&&!val.match(/^[\+\-]?\d/)){warningType='string';}
if(warningType){throw new Error('Warning: is_infinite() expects parameter 1 to be double, '+warningType+' given');}
return false;}
function is_int(mixed_var){if(typeof mixed_var!=='number'){return false;}
if(parseFloat(mixed_var)!=parseInt(mixed_var)){return false;}
return true;}
function is_integer(mixed_var){return is_int(mixed_var);}
function is_long(mixed_var){return is_float(mixed_var);}
function is_nan(val){var warningType='';if(typeof val=='number'&&isNaN(val)){return true;}
if(typeof val=='object'){warningType=(val instanceof Array?'array':'object');}else if(typeof val=='string'&&!val.match(/^[\+\-]?\d/)){warningType='string';}
if(warningType){throw new Error('Warning: is_nan() expects parameter 1 to be double, '+warningType+' given');}
return false;}
function is_null(mixed_var){return(mixed_var===null);}
function is_numeric(mixed_var){return!isNaN(mixed_var*1);}
function is_real(mixed_var){return is_float(mixed_var);}
function is_scalar(mixed_var){return/boolean|number|string/.test(typeof mixed_var);}
function is_string(mixed_var){return(typeof(mixed_var)=='string');}
function join(glue,pieces){return implode(glue,pieces);}
function json_decode(str_json){var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;var j;var text=str_json;var walk=function(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('json_decode');}
function json_encode(mixed_val){var indent;var value=mixed_val;var i;var quote=function(string){var escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;var meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
var str=function(key,holder){var gap='';var indent='    ';var i=0;var k='';var v='';var length=0;var mind=gap;var partial=[];var value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}};return str('',{'':value});}
function krsort(array,sort_flags){var tmp_arr={},keys=[],sorter,i,key;switch(sort_flags){case'SORT_STRING':sorter=function(a,b){return strnatcmp(b,a);};break;case'SORT_LOCALE_STRING':sorter=function(a,b){return(b.localeCompare(a));};break;case'SORT_NUMERIC':sorter=function(a,b){return(b-a);};break;case'SORT_REGULAR':default:sorter=function(a,b){if(a<b)
return 1;if(a>b)
return-1;return 0;};break;}
for(key in array){keys.push(key);}
keys.sort(sorter);for(i=0;i<keys.length;i++){key=keys[i];tmp_arr[key]=array[key];delete array[key];}
for(i in tmp_arr){array[i]=tmp_arr[i]}
return true;}
function ksort(array,sort_flags){var tmp_arr={},keys=[],sorter,i,key;switch(sort_flags){case'SORT_STRING':sorter=function(a,b){return strnatcmp(a,b);};break;case'SORT_LOCALE_STRING':sorter=function(a,b){return(a.localeCompare(b));};break;case'SORT_NUMERIC':sorter=function(a,b){return(a-b);};break;case'SORT_REGULAR':default:sorter=function(a,b){if(a>b)
return 1;if(a<b)
return-1;return 0;};break;}
for(key in array){keys.push(key);}
keys.sort(sorter);for(i=0;i<keys.length;i++){key=keys[i];tmp_arr[key]=array[key];delete array[key];}
for(i in tmp_arr){array[i]=tmp_arr[i]}
return true;}
function lcfirst(str){str+='';var f=str.charAt(0).toLowerCase();return f+str.substr(1);}
function lcg_value(){return Math.random();}
function levenshtein(a,b){var min=Math.min,len1=0,len2=0,I=0,i=0,d=[],c='',j=0,J=0;var split=false;try{split=!('0')[0];}catch(i){split=true;}
if(a==b){return 0;}
if(!a.length||!b.length){return b.length||a.length;}
if(split){a=a.split('');b=b.split('');}
len1=a.length+1;len2=b.length+1;d=[[0]];while(++i<len2){d[0][i]=i;}
i=0;while(++i<len1){J=j=0;c=a[I];d[i]=[i];while(++j<len2){d[i][j]=min(d[I][j]+1,d[i][J]+1,d[I][J]+(c!=b[J]));++J;}
++I;}
return d[len1-1][len2-1];}
function log(arg,base){if(base===undefined){return Math.log(arg);}else{return Math.log(arg)/Math.log(base);}}
function log10(arg){return Math.log(arg)/Math.LN10;}
function long2ip(proper_address){var output=false;if(!isNaN(proper_address)&&(proper_address>=0||proper_address<=4294967295)){output=Math.floor(proper_address/Math.pow(256,3))+'.'+
Math.floor((proper_address%Math.pow(256,3))/Math.pow(256,2))+'.'+
Math.floor(((proper_address%Math.pow(256,3))%Math.pow(256,2))/Math.pow(256,1))+'.'+
Math.floor((((proper_address%Math.pow(256,3))%Math.pow(256,2))%Math.pow(256,1))/Math.pow(256,0));}
return output;}
function ltrim(str,charlist){charlist=!charlist?' \s\xA0':(charlist+'').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,'\$1');var re=new RegExp('^['+charlist+']+','g');return(str+'').replace(re,'');}
function max(){var ar,retVal,i=0,n=0;var argv=arguments,argc=argv.length;var _obj2Array=function(obj){if(obj instanceof Array){return obj;}else{var ar=[];for(var i in obj){ar.push(obj[i]);}
return ar;}}
var _compare=function(current,next){var i=0,n=0,tmp=0;var nl=0,cl=0;if(current===next){return 0;}else if(typeof current=='object'){if(typeof next=='object'){current=_obj2Array(current);next=_obj2Array(next);cl=current.length;nl=next.length;if(nl>cl){return 1;}else if(nl<cl){return-1;}else{for(i=0,n=cl;i<n;++i){tmp=_compare(current[i],next[i]);if(tmp==1){return 1;}else if(tmp==-1){return-1;}}
return 0;}}else{return-1;}}else if(typeof next=='object'){return 1;}else if(isNaN(next)&&!isNaN(current)){if(current==0){return 0;}else{return(current<0?1:-1);}}else if(isNaN(current)&&!isNaN(next)){if(next==0){return 0;}else{return(next>0?1:-1);}}else{if(next==current){return 0;}else{return(next>current?1:-1);}}}
if(argc==0){throw new Error('At least one value should be passed to max()');}else if(argc==1){if(typeof argv[0]=='object'){ar=_obj2Array(argv[0]);}else{throw new Error('Wrong parameter count for max()');}
if(ar.length==0){throw new Error('Array must contain at least one element for max()');}}else{ar=argv;}
retVal=ar[0];for(i=1,n=ar.length;i<n;++i){if(_compare(retVal,ar[i])==1){retVal=ar[i];}}
return retVal;}
function md5(str){var xl;var RotateLeft=function(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits));};var AddUnsigned=function(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4){return(lResult^0x80000000^lX8^lY8);}
if(lX4|lY4){if(lResult&0x40000000){return(lResult^0xC0000000^lX8^lY8);}else{return(lResult^0x40000000^lX8^lY8);}}else{return(lResult^lX8^lY8);}};var F=function(x,y,z){return(x&y)|((~x)&z);};var G=function(x,y,z){return(x&z)|(y&(~z));};var H=function(x,y,z){return(x^y^z);};var I=function(x,y,z){return(y^(x|(~z)));};var FF=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};var GG=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};var HH=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};var II=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};var ConvertToWordArray=function(str){var lWordCount;var lMessageLength=str.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(str.charCodeAt(lByteCount)<<lBytePosition));lByteCount++;}
lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray;};var WordToHex=function(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);}
return WordToHexValue;};var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;str=utf8_encode(str);x=ConvertToWordArray(str);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;xl=x.length;for(k=0;k<xl;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD);}
var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase();}
function method_exists(obj,method){if(typeof obj==='string'){return window[obj]&&typeof window[obj][method]==='function'}
return typeof obj[method]==='function';}
function microtime(get_as_float){var now=new Date().getTime()/1000;var s=parseInt(now);return(get_as_float)?now:(Math.round((now-s)*1000)/1000)+' '+s;}
function min(){var ar,retVal,i=0,n=0;var argv=arguments,argc=argv.length;var _obj2Array=function(obj){if(obj instanceof Array){return obj;}else{var ar=[];for(var i in obj){ar.push(obj[i]);}
return ar;}}
var _compare=function(current,next){var i=0,n=0,tmp=0;var nl=0,cl=0;if(current===next){return 0;}else if(typeof current=='object'){if(typeof next=='object'){current=_obj2Array(current);next=_obj2Array(next);cl=current.length;nl=next.length;if(nl>cl){return 1;}else if(nl<cl){return-1;}else{for(i=0,n=cl;i<n;++i){tmp=_compare(current[i],next[i]);if(tmp==1){return 1;}else if(tmp==-1){return-1;}}
return 0;}}else{return-1;}}else if(typeof next=='object'){return 1;}else if(isNaN(next)&&!isNaN(current)){if(current==0){return 0;}else{return(current<0?1:-1);}}else if(isNaN(current)&&!isNaN(next)){if(next==0){return 0;}else{return(next>0?1:-1);}}else{if(next==current){return 0;}else{return(next>current?1:-1);}}}
if(argc==0){throw new Error('At least one value should be passed to min()');}else if(argc==1){if(typeof argv[0]=='object'){ar=_obj2Array(argv[0]);}else{throw new Error('Wrong parameter count for min()');}
if(ar.length==0){throw new Error('Array must contain at least one element for min()');}}else{ar=argv;}
retVal=ar[0];for(i=1,n=ar.length;i<n;++i){if(_compare(retVal,ar[i])==-1){retVal=ar[i];}}
return retVal;}
function mktime(){var no,ma=0,mb=0,i=0,d=new Date(),argv=arguments,argc=argv.length;if(argc>0){d.setHours(0,0,0);d.setDate(1);d.setMonth(1);d.setYear(1972);}
var dateManip={0:function(tt){return d.setHours(tt);},1:function(tt){return d.setMinutes(tt);},2:function(tt){var set=d.setSeconds(tt);mb=d.getDate()-1;return set;},3:function(tt){var set=d.setMonth(parseInt(tt)-1);ma=d.getFullYear()-1972;return set;},4:function(tt){return d.setDate(tt+mb);},5:function(tt){return d.setYear(tt+ma);}};for(i=0;i<argc;i++){no=parseInt(argv[i]*1);if(isNaN(no)){return false;}else{if(!dateManip[i](no)){return false;}}}
return Math.floor(d.getTime()/1000);}
function mt_getrandmax()
{return 2147483647;}
function mt_rand(min,max){var argc=arguments.length;if(argc==0){min=0;max=2147483647;}else if(argc==1){throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');}
return Math.floor(Math.random()*(max-min+1))+min;}
function natcasesort(inputArr){var valArr=[],keyArr=[],k,i,ret;var bubbleSort=function(keyArr,inputArr){var i,j,tempValue,tempKeyVal;for(i=inputArr.length-2;i>=0;i--){for(j=0;j<=i;j++){ret=strnatcasecmp(inputArr[j+1],inputArr[j]);if(ret<0){tempValue=inputArr[j];inputArr[j]=inputArr[j+1];inputArr[j+1]=tempValue;tempKeyVal=keyArr[j];keyArr[j]=keyArr[j+1];keyArr[j+1]=tempKeyVal;}}}};for(k in inputArr){valArr.push(inputArr[k]);keyArr.push(k);delete inputArr[k];}
try{bubbleSort(keyArr,valArr);}catch(e){return false;}
for(i=0;i<valArr.length;i++){inputArr[keyArr[i]]=valArr[i];}
return true;}
function natsort(inputArr){var valArr=[],keyArr=[],k,i,ret;var bubbleSort=function(keyArr,inputArr){var i,j,tempValue,tempKeyVal;for(i=inputArr.length-2;i>=0;i--){for(j=0;j<=i;j++){ret=strnatcmp(inputArr[j+1],inputArr[j]);if(ret<0){tempValue=inputArr[j];inputArr[j]=inputArr[j+1];inputArr[j+1]=tempValue;tempKeyVal=keyArr[j];keyArr[j]=keyArr[j+1];keyArr[j+1]=tempKeyVal;}}}};for(k in inputArr){valArr.push(inputArr[k]);keyArr.push(k);delete inputArr[k];}
try{bubbleSort(keyArr,valArr);}catch(e){return false;}
for(i=0;i<valArr.length;i++){inputArr[keyArr[i]]=valArr[i];}
return true;}
function nl2br(str,is_xhtml){var breakTag='';breakTag='<br />';if(typeof is_xhtml!='undefined'&&!is_xhtml){breakTag='<br>';}
return(str+'').replace(/([^>]?)\n/g,'$1'+breakTag+'\n');}
function number_format(number,decimals,dec_point,thousands_sep){var n=number,prec=decimals;n=!isFinite(+n)?0:+n;prec=!isFinite(+prec)?0:Math.abs(prec);var sep=(typeof thousands_sep=="undefined")?',':thousands_sep;var dec=(typeof dec_point=="undefined")?'.':dec_point;var s=(prec>0)?n.toFixed(prec):Math.round(n).toFixed(prec);var abs=Math.abs(n).toFixed(prec);var _,i;if(abs>=1000){_=abs.split(/\D/);i=_[0].length%3||3;_[0]=s.slice(0,i+(n<0))+
_[0].slice(i).replace(/(\d{3})/g,sep+'$1');s=_.join(dec);}else{s=s.replace('.',dec);}
return s;}
function octdec(oct_string){oct_string=(oct_string+'').replace(/[^0-7]/gi,'');return parseInt(oct_string,8);}
function ord(string){return(string+'').charCodeAt(0);}
function parse_str(str,array){var glue1='=';var glue2='&';var array2=(str+'').split(glue2);var array2l=0,tmp='',x=0;array2l=array2.length;for(x=0;x<array2l;x++){tmp=array2[x].split(glue1);array[unescape(tmp[0])]=unescape(tmp[1]).replace(/[+]/g,' ');}}
function parse_url(str,component){var o={strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var m=o.parser[o.strictMode?"strict":"loose"].exec(str),uri={},i=14;while(i--)uri[o.key[i]]=m[i]||"";switch(component){case'PHP_URL_SCHEME':return uri.protocol;case'PHP_URL_HOST':return uri.host;case'PHP_URL_PORT':return uri.port;case'PHP_URL_USER':return uri.user;case'PHP_URL_PASS':return uri.password;case'PHP_URL_PATH':return uri.path;case'PHP_URL_QUERY':return uri.query;case'PHP_URL_FRAGMENT':return uri.anchor;default:var retArr={};if(uri.protocol!=='')retArr.scheme=uri.protocol;if(uri.host!=='')retArr.host=uri.host;if(uri.port!=='')retArr.port=uri.port;if(uri.user!=='')retArr.user=uri.user;if(uri.password!=='')retArr.pass=uri.password;if(uri.path!=='')retArr.path=uri.path;if(uri.query!=='')retArr.query=uri.query;if(uri.anchor!=='')retArr.fragment=uri.anchor;return retArr;}}
function pi(){return Math.PI;}
function pow(base,exp){return Math.pow(base,exp);}
function preg_quote(str){return(str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g,"\\$1");}
function print_r(array,return_val){var output="",pad_char=" ",pad_val=4;var formatArray=function(obj,cur_depth,pad_val,pad_char){if(cur_depth>0){cur_depth++;}
var base_pad=repeat_char(pad_val*cur_depth,pad_char);var thick_pad=repeat_char(pad_val*(cur_depth+1),pad_char);var str="";if(obj instanceof Array||obj instanceof Object){str+="Array\n"+base_pad+"(\n";for(var key in obj){if(obj[key]instanceof Array){str+=thick_pad+"["+key+"] => "+formatArray(obj[key],cur_depth+1,pad_val,pad_char);}else{str+=thick_pad+"["+key+"] => "+obj[key]+"\n";}}
str+=base_pad+")\n";}else if(obj==null||obj==undefined){str='';}else{str=obj.toString();}
return str;};var repeat_char=function(len,pad_char){var str="";for(var i=0;i<len;i++){str+=pad_char;}
return str;};output=formatArray(array,0,pad_val,pad_char);if(return_val!==true){if(document.body){echo(output);}
else{try{XULDocument;echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">'+output+'</pre>');}
catch(e){echo(output);}}
return true;}else{return output;}}
function property_exists(cls,prop){cls=(typeof cls==='string')?window[cls]:cls;if(typeof cls==='function'&&cls.toSource&&cls.toSource().match(new RegExp('this\\.'+prop+'\\s'))){return true;}
return(cls[prop]!==undefined&&typeof cls[prop]!=='function')||(cls.prototype!==undefined&&cls.prototype[prop]!==undefined&&typeof cls.prototype[prop]!=='function')||(cls.constructor&&cls.constructor[prop]!==undefined&&typeof cls.constructor[prop]!=='function');}
function quotemeta(str){return(str+'').replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g,'\\$1');}
function rad2deg(angle){return(angle/Math.PI)*180;}
function rand(min,max){var argc=arguments.length;if(argc==0){min=0;max=2147483647;}else if(argc==1){throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');}
return Math.floor(Math.random()*(max-min+1))+min;}
function range(low,high,step){var matrix=[];var inival,endval,plus;var walker=step||1;var chars=false;if(!isNaN(low)&&!isNaN(high)){inival=low;endval=high;}else if(isNaN(low)&&isNaN(high)){chars=true;inival=low.charCodeAt(0);endval=high.charCodeAt(0);}else{inival=(isNaN(low)?0:low);endval=(isNaN(high)?0:high);}
plus=((inival>endval)?false:true);if(plus){while(inival<=endval){matrix.push(((chars)?String.fromCharCode(inival):inival));inival+=walker;}}else{while(inival>=endval){matrix.push(((chars)?String.fromCharCode(inival):inival));inival-=walker;}}
return matrix;}
function rawurldecode(str){var histogram={};var ret=str.toString();var replacer=function(search,replace,str){var tmp_arr=[];tmp_arr=str.split(search);return tmp_arr.join(replace);};histogram["'"]='%27';histogram['(']='%28';histogram[')']='%29';histogram['*']='%2A';histogram['~']='%7E';histogram['!']='%21';for(replace in histogram){search=histogram[replace];ret=replacer(search,replace,ret)}
ret=decodeURIComponent(ret);return ret;}
function rawurlencode(str){var histogram={},tmp_arr=[];var ret=str.toString();var replacer=function(search,replace,str){var tmp_arr=[];tmp_arr=str.split(search);return tmp_arr.join(replace);};histogram["'"]='%27';histogram['(']='%28';histogram[')']='%29';histogram['*']='%2A';histogram['~']='%7E';histogram['!']='%21';ret=encodeURIComponent(ret);ret=replacer('%20',' ',ret);for(search in histogram){replace=histogram[search];ret=replacer(search,replace,ret)}
return ret.replace(/(\%([a-z0-9]{2}))/g,function(full,m1,m2){return"%"+m2.toUpperCase();});return ret;}
function reset(arr){if(!this.php_js)this.php_js={};if(!this.php_js.pointers)this.php_js.pointers=[];var pointers=this.php_js.pointers;if(pointers.indexOf(arr)===-1){pointers.push(arr,0);}
var arrpos=pointers.indexOf(arr);if(!(arr instanceof Array)){for(var k in arr){if(pointers.indexOf(arr)===-1){pointers.push(arr,0);}else{pointers[arrpos+1]=0;}
return arr[k];}
return false;}
if(arr.length===0){return false;}
pointers[arrpos+1]=0;return arr[pointers[arrpos+1]];}
function round(val,precision){return parseFloat(parseFloat(val).toFixed(precision));}
function rsort(inputArr,sort_flags){var valArr=[],keyArr=[];var k='',i=0,sorter=false;for(k in inputArr){valArr.push(inputArr[k]);delete inputArr[k];}
switch(sort_flags){case'SORT_STRING':sorter=function(a,b){return strnatcmp(b,a);};break;case'SORT_LOCALE_STRING':sorter=function(a,b){return(b.localeCompare(a));};break;case'SORT_NUMERIC':sorter=function(a,b){return(b-a);};break;case'SORT_REGULAR':default:sorter=function(a,b){if(a<b)
return 1;if(a>b)
return-1;return 0;};break;}
valArr.sort(sorter);for(i=0;i<valArr.length;i++){inputArr[i]=valArr[i];}
return true;}
function rtrim(str,charlist){charlist=!charlist?' \s\xA0':(charlist+'').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,'\$1');var re=new RegExp('['+charlist+']+$','g');return(str+'').replace(re,'');}
function serialize(mixed_value){var _getType=function(inp){var type=typeof inp,match;var key;if(type=='object'&&!inp){return'null';}
if(type=="object"){if(!inp.constructor){return'object';}
var cons=inp.constructor.toString();if(match=cons.match(/(\w+)\(/)){cons=match[1].toLowerCase();}
var types=["boolean","number","string","array"];for(key in types){if(cons==types[key]){type=types[key];break;}}}
return type;};var type=_getType(mixed_value);var val,ktype='';switch(type){case"function":val="";break;case"undefined":val="N";break;case"boolean":val="b:"+(mixed_value?"1":"0");break;case"number":val=(Math.round(mixed_value)==mixed_value?"i":"d")+":"+mixed_value;break;case"string":val="s:"+mixed_value.length+":\""+mixed_value+"\"";break;case"array":case"object":val="a";var count=0;var vals="";var okey;var key;for(key in mixed_value){ktype=_getType(mixed_value[key]);if(ktype=="function"){continue;}
okey=(key.match(/^[0-9]+$/)?parseInt(key):key);vals+=serialize(okey)+
serialize(mixed_value[key]);count++;}
val+=":"+count+":{"+vals+"}";break;}
if(type!="object"&&type!="array")val+=";";return val;}
function setcookie(name,value,expires,path,domain,secure){return setrawcookie(name,encodeURIComponent(value),expires,path,domain,secure)}
function setrawcookie(name,value,expires,path,domain,secure){if(expires instanceof Date){expires=expires.toGMTString();}else if(typeof(expires)=='number'){expires=(new Date(+(new Date)+expires*1e3)).toGMTString();}
var r=[name+"="+value],s,i;for(i in s={expires:expires,path:path,domain:domain}){s[i]&&r.push(i+"="+s[i]);}
return secure&&r.push("secure"),document.cookie=r.join(";"),true;}
function settype(vr,type){var is_array=function(arr){return typeof arr==='object'&&typeof arr.length==='number'&&!(arr.propertyIsEnumerable('length'))&&typeof arr.splice==='function';};var v,mtch,i,obj;v=this[vr]?this[vr]:vr;try{switch(type){case'boolean':if(is_array(v)&&v.length===0){this[vr]=false;}
else if(v==='0'){this[vr]=false;}
else if(typeof v==='object'&&!is_array(v)){var lgth=false;for(i in v){lgth=true;}
this[vr]=lgth;}
else{this[vr]=!!v;}
break;case'integer':if(typeof v==='number'){this[vr]=parseInt(v,10);}
else if(typeof v==='string'){mtch=v.match(/^([+-]?)(\d+)/);if(!mtch){this[vr]=0;}
else{this[vr]=parseInt(v,10);}}
else if(v===true){this[vr]=1;}
else if(v===false||v===null){this[vr]=0;}
else if(is_array(v)&&v.length===0){this[vr]=0;}
else if(typeof v==='object'){this[vr]=1;}
break;case'float':if(typeof v==='string'){mtch=v.match(/^([+-]?)(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?/);if(!mtch){this[vr]=0;}
else{this[vr]=parseFloat(v,10);}}
else if(v===true){this[vr]=1;}
else if(v===false||v===null){this[vr]=0;}
else if(is_array(v)&&v.length===0){this[vr]=0;}
else if(typeof v==='object'){this[vr]=1;}
break;case'string':if(v===null||v===false){this[vr]='';}
else if(is_array(v)){this[vr]='Array';}
else if(typeof v==='object'){this[vr]='Object';}
else if(v===true){this[vr]='1';}
else{this[vr]+='';}
break;case'array':if(v===null){this[vr]=[];}
else if(typeof v!=='object'){this[vr]=[v];}
break;case'object':if(v===null){this[vr]={};}
else if(is_array(v)){for(i=0,obj={};i<v.length;i++){obj[i]=v;}
this[vr]=obj;}
else if(typeof v!=='object'){this[vr]={scalar:v};}
break;case'null':delete this[vr];break;}
return true;}catch(e){return false;}}
function sha1(str){var rotate_left=function(n,s){var t4=(n<<s)|(n>>>(32-s));return t4;};var lsb_hex=function(val){var str="";var i;var vh;var vl;for(i=0;i<=6;i+=2){vh=(val>>>(i*4+4))&0x0f;vl=(val>>>(i*4))&0x0f;str+=vh.toString(16)+vl.toString(16);}
return str;};var cvt_hex=function(val){var str="";var i;var v;for(i=7;i>=0;i--){v=(val>>>(i*4))&0x0f;str+=v.toString(16);}
return str;};var blockstart;var i,j;var W=new Array(80);var H0=0x67452301;var H1=0xEFCDAB89;var H2=0x98BADCFE;var H3=0x10325476;var H4=0xC3D2E1F0;var A,B,C,D,E;var temp;str=utf8_encode(str);var str_len=str.length;var word_array=[];for(i=0;i<str_len-3;i+=4){j=str.charCodeAt(i)<<24|str.charCodeAt(i+1)<<16|str.charCodeAt(i+2)<<8|str.charCodeAt(i+3);word_array.push(j);}
switch(str_len%4){case 0:i=0x080000000;break;case 1:i=str.charCodeAt(str_len-1)<<24|0x0800000;break;case 2:i=str.charCodeAt(str_len-2)<<24|str.charCodeAt(str_len-1)<<16|0x08000;break;case 3:i=str.charCodeAt(str_len-3)<<24|str.charCodeAt(str_len-2)<<16|str.charCodeAt(str_len-1)<<8|0x80;break;}
word_array.push(i);while((word_array.length%16)!=14)word_array.push(0);word_array.push(str_len>>>29);word_array.push((str_len<<3)&0x0ffffffff);for(blockstart=0;blockstart<word_array.length;blockstart+=16){for(i=0;i<16;i++)W[i]=word_array[blockstart+i];for(i=16;i<=79;i++)W[i]=rotate_left(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);A=H0;B=H1;C=H2;D=H3;E=H4;for(i=0;i<=19;i++){temp=(rotate_left(A,5)+((B&C)|(~B&D))+E+W[i]+0x5A827999)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
for(i=20;i<=39;i++){temp=(rotate_left(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
for(i=40;i<=59;i++){temp=(rotate_left(A,5)+((B&C)|(B&D)|(C&D))+E+W[i]+0x8F1BBCDC)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
for(i=60;i<=79;i++){temp=(rotate_left(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
H0=(H0+A)&0x0ffffffff;H1=(H1+B)&0x0ffffffff;H2=(H2+C)&0x0ffffffff;H3=(H3+D)&0x0ffffffff;H4=(H4+E)&0x0ffffffff;}
temp=cvt_hex(H0)+cvt_hex(H1)+cvt_hex(H2)+cvt_hex(H3)+cvt_hex(H4);return temp.toLowerCase();}
function shuffle(inputArr){var valArr=[];var k='',i=0;for(k in inputArr){valArr.push(inputArr[k]);delete inputArr[k];}
valArr.sort(function(){return 0.5-Math.random();});for(i=0;i<valArr.length;i++){inputArr[i]=valArr[i];}
return true;}
function sin(arg){return Math.sin(arg);}
function sinh(arg){return(Math.exp(arg)-Math.exp(-arg))/2;}
function sizeof(mixed_var,mode){return count(mixed_var,mode);}
function sort(inputArr,sort_flags){var valArr=[],keyArr=[];var k='',i=0,sorter=false;for(k in inputArr){valArr.push(inputArr[k]);delete inputArr[k];}
switch(sort_flags){case'SORT_STRING':sorter=function(a,b){return strnatcmp(a,b);};break;case'SORT_LOCALE_STRING':sorter=function(a,b){return(a.localeCompare(b));};break;case'SORT_NUMERIC':sorter=function(a,b){return(a-b);};break;case'SORT_REGULAR':default:sorter=function(a,b){if(a>b)
return 1;if(a<b)
return-1;return 0;};break;}
valArr.sort(sorter);for(i=0;i<valArr.length;i++){inputArr[i]=valArr[i];}
return true;}
function soundex(str){var s='';var i,j,l,p=isNaN(p)?4:p>10?10:p<4?4:p;var m={BFPV:1,CGJKQSXZ:2,DT:3,L:4,MN:5,R:6};var r=(s=(str+'').toUpperCase().replace(/[^A-Z]/g,"").split("")).splice(0,1);var sl=0;sl=s.length;for(i=-1,l=sl;++i<l;){for(j in m){if(j.indexOf(s[i])+1&&r[r.length-1]!=m[j]&&r.push(m[j])){break;}}}
return r.length>p&&(r.length=p),r.join("")+(new Array(p-r.length+1)).join("0");}
function split(delimiter,string){return explode(delimiter,string);}
function sprintf(){var regex=/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;var a=arguments,i=0,format=a[i++];var pad=function(str,len,chr,leftJustify){if(!chr)chr=' ';var padding=(str.length>=len)?'':Array(1+len-str.length>>>0).join(chr);return leftJustify?str+padding:padding+str;};var justify=function(value,prefix,leftJustify,minWidth,zeroPad,customPadChar){var diff=minWidth-value.length;if(diff>0){if(leftJustify||!zeroPad){value=pad(value,minWidth,customPadChar,leftJustify);}else{value=value.slice(0,prefix.length)+pad('',diff,'0',true)+value.slice(prefix.length);}}
return value;};var formatBaseX=function(value,base,prefix,leftJustify,minWidth,precision,zeroPad){var number=value>>>0;prefix=prefix&&number&&{'2':'0b','8':'0','16':'0x'}[base]||'';value=prefix+pad(number.toString(base),precision||0,'0',false);return justify(value,prefix,leftJustify,minWidth,zeroPad);};var formatString=function(value,leftJustify,minWidth,precision,zeroPad,customPadChar){if(precision!=null){value=value.slice(0,precision);}
return justify(value,'',leftJustify,minWidth,zeroPad,customPadChar);};var doFormat=function(substring,valueIndex,flags,minWidth,_,precision,type){var number;var prefix;var method;var textTransform;var value;if(substring=='%%')return'%';var leftJustify=false,positivePrefix='',zeroPad=false,prefixBaseX=false,customPadChar=' ';var flagsl=flags.length;for(var j=0;flags&&j<flagsl;j++)switch(flags.charAt(j)){case' ':positivePrefix=' ';break;case'+':positivePrefix='+';break;case'-':leftJustify=true;break;case"'":customPadChar=flags.charAt(j+1);break;case'0':zeroPad=true;break;case'#':prefixBaseX=true;break;}
if(!minWidth){minWidth=0;}else if(minWidth=='*'){minWidth=+a[i++];}else if(minWidth.charAt(0)=='*'){minWidth=+a[minWidth.slice(1,-1)];}else{minWidth=+minWidth;}
if(minWidth<0){minWidth=-minWidth;leftJustify=true;}
if(!isFinite(minWidth)){throw new Error('sprintf: (minimum-)width must be finite');}
if(!precision){precision='fFeE'.indexOf(type)>-1?6:(type=='d')?0:void(0);}else if(precision=='*'){precision=+a[i++];}else if(precision.charAt(0)=='*'){precision=+a[precision.slice(1,-1)];}else{precision=+precision;}
value=valueIndex?a[valueIndex.slice(0,-1)]:a[i++];switch(type){case's':return formatString(String(value),leftJustify,minWidth,precision,zeroPad,customPadChar);case'c':return formatString(String.fromCharCode(+value),leftJustify,minWidth,precision,zeroPad);case'b':return formatBaseX(value,2,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'o':return formatBaseX(value,8,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'x':return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'X':return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad).toUpperCase();case'u':return formatBaseX(value,10,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'i':case'd':{number=parseInt(+value);prefix=number<0?'-':positivePrefix;value=prefix+pad(String(Math.abs(number)),precision,'0',false);return justify(value,prefix,leftJustify,minWidth,zeroPad);}
case'e':case'E':case'f':case'F':case'g':case'G':{number=+value;prefix=number<0?'-':positivePrefix;method=['toExponential','toFixed','toPrecision']['efg'.indexOf(type.toLowerCase())];textTransform=['toString','toUpperCase']['eEfFgG'.indexOf(type)%2];value=prefix+Math.abs(number)[method](precision);return justify(value,prefix,leftJustify,minWidth,zeroPad)[textTransform]();}
default:return substring;}};return format.replace(regex,doFormat);}
function sqrt(arg){return Math.sqrt(arg);}
function str_ireplace(search,replace,subject){var i,k='';var searchl=0;var reg;search+='';searchl=search.length;if(!(replace instanceof Array)){replace=new Array(replace);if(search instanceof Array){while(searchl>replace.length){replace[replace.length]=replace[0];}}}
if(!(search instanceof Array)){search=new Array(search);}
while(search.length>replace.length){replace[replace.length]='';}
if(subject instanceof Array){for(k in subject){subject[k]=str_ireplace(search,replace,subject[k]);}
return subject;}
searchl=search.length;for(i=0;i<searchl;i++){reg=new RegExp(search[i],'gi');subject=subject.replace(reg,replace[i]);}
return subject;}
function str_pad(input,pad_length,pad_string,pad_type){var half='',pad_to_go;var str_pad_repeater=function(s,len){var collect='',i;while(collect.length<len)collect+=s;collect=collect.substr(0,len);return collect;};input+='';if(pad_type!='STR_PAD_LEFT'&&pad_type!='STR_PAD_RIGHT'&&pad_type!='STR_PAD_BOTH'){pad_type='STR_PAD_RIGHT';}
if((pad_to_go=pad_length-input.length)>0){if(pad_type=='STR_PAD_LEFT'){input=str_pad_repeater(pad_string,pad_to_go)+input;}
else if(pad_type=='STR_PAD_RIGHT'){input=input+str_pad_repeater(pad_string,pad_to_go);}
else if(pad_type=='STR_PAD_BOTH'){half=str_pad_repeater(pad_string,Math.ceil(pad_to_go/2));input=half+input+half;input=input.substr(0,pad_length);}}
return input;}
function str_repeat(input,multiplier){return new Array(multiplier+1).join(input);}
function str_replace(search,replace,subject){var s=subject;var ra=r instanceof Array,sa=s instanceof Array;var f=[].concat(search);var r=[].concat(replace);var i=(s=[].concat(s)).length;var j=0;while(j=0,i--){if(s[i]){while(s[i]=(s[i]+'').split(f[j]).join(ra?r[j]||"":r[0]),++j in f){};}}
return sa?s:s[0];}
function str_rot13(str){return(str+'').replace(/[A-Za-z]/g,function(c){return String.fromCharCode((((c=c.charCodeAt(0))&223)-52)%26+(c&32)+65);});}
function str_shuffle(str){if(str==undefined){throw'Wrong parameter count for str_shuffle()';}
var getRandomInt=function(max){return Math.floor(Math.random()*(max+1));};var newStr='',rand=0;while(str.length){rand=getRandomInt(str.length-1);newStr+=str[rand];str=str.substring(0,rand)+str.substr(rand+1);}
return newStr;}
function str_split(f_string,f_split_length){f_string+='';if(f_split_length==undefined){f_split_length=1;}
if(f_split_length>0){var result=[];while(f_string.length>f_split_length){result[result.length]=f_string.substring(0,f_split_length);f_string=f_string.substring(f_split_length);}
result[result.length]=f_string;return result;}
return false;}
function strcasecmp(f_string1,f_string2){var string1=(f_string1+'').toLowerCase();var string2=(f_string2+'').toLowerCase();if(string1>string2){return 1;}
else if(string1==string2){return 0;}
return-1;}
function strchr(haystack,needle,bool){return strstr(haystack,needle,bool);}
function strcmp(str1,str2){return((str1==str2)?0:((str1>str2)?1:-1));}
function strcspn(str,mask,start,length){start=start?start:0;var count=(length&&((start+length)<str.length))?start+length:str.length;strct:for(var i=start,lgth=0;i<count;i++){for(var j=0;j<mask.length;j++){if(str[i].indexOf(mask[j])!==-1){continue strct;}}
++lgth;}
return lgth;}
function strip_tags(str,allowed_tags){var key='',allowed=false;var matches=[];var allowed_array=[];var allowed_tag='';var i=0;var k='';var html='';var replacer=function(search,replace,str){return str.split(search).join(replace);};if(allowed_tags){allowed_array=allowed_tags.match(/([a-zA-Z]+)/gi);}
str+='';matches=str.match(/(<\/?[\S][^>]*>)/gi);for(key in matches){if(isNaN(key)){continue;}
html=matches[key].toString();allowed=false;for(k in allowed_array){allowed_tag=allowed_array[k];i=-1;if(i!=0){i=html.toLowerCase().indexOf('<'+allowed_tag+'>');}
if(i!=0){i=html.toLowerCase().indexOf('<'+allowed_tag+' ');}
if(i!=0){i=html.toLowerCase().indexOf('</'+allowed_tag);}
if(i==0){allowed=true;break;}}
if(!allowed){str=replacer(html,"",str);}}
return str;}
function stripos(f_haystack,f_needle,f_offset){var haystack=(f_haystack+'').toLowerCase();var needle=(f_needle+'').toLowerCase();var index=0;if((index=haystack.indexOf(needle,f_offset))!==-1){return index;}
return false;}
function stripslashes(str){return(str+'').replace(/\0/g,'0').replace(/\\([\\'"])/g,'$1');}
function stristr(haystack,needle,bool){var pos=0;haystack+='';pos=haystack.toLowerCase().indexOf((needle+'').toLowerCase());if(pos==-1){return false;}else{if(bool){return haystack.substr(0,pos);}else{return haystack.slice(pos);}}}
function strlen(string){var str=string+'';var i=0,chr='',lgth=0;var getWholeChar=function(str,i){var code=str.charCodeAt(i);var next='',prev='';if(0xD800<=code&&code<=0xDBFF){if(str.length<=(i+1)){throw'High surrogate without following low surrogate';}
next=str.charCodeAt(i+1);if(0xDC00>next||next>0xDFFF){throw'High surrogate without following low surrogate';}
return str[i]+str[i+1];}else if(0xDC00<=code&&code<=0xDFFF){if(i===0){throw'Low surrogate without preceding high surrogate';}
prev=str.charCodeAt(i-1);if(0xD800>prev||prev>0xDBFF){throw'Low surrogate without preceding high surrogate';}
return false;}
return str[i];};for(i=0,lgth=0;i<str.length;i++){if((chr=getWholeChar(str,i))===false){continue;}
lgth++;}
return lgth;}
function strnatcasecmp(str1,str2){a=(str1+'').toLowerCase();b=(str2+'').toLowerCase();var isWhitespaceChar=function(a){return a.charCodeAt(0)<=32;}
var isDigitChar=function(a){var charCode=a.charCodeAt(0);return(charCode>=48&&charCode<=57);}
var compareRight=function(a,b){var bias=0;var ia=0;var ib=0;var ca;var cb;for(;;ia++,ib++){ca=a.charAt(ia);cb=b.charAt(ib);if(!isDigitChar(ca)&&!isDigitChar(cb)){return bias;}else if(!isDigitChar(ca)){return-1;}else if(!isDigitChar(cb)){return+1;}else if(ca<cb){if(bias==0){bias=-1;}}else if(ca>cb){if(bias==0)
bias=+1;}else if(ca==0&&cb==0){return bias;}}}
var ia=0,ib=0;var nza=0,nzb=0;var ca,cb;var result;while(true){nza=nzb=0;ca=a.charAt(ia);cb=b.charAt(ib);while(isWhitespaceChar(ca)||ca=='0'){if(ca=='0'){nza++;}else{nza=0;}
ca=a.charAt(++ia);}
while(isWhitespaceChar(cb)||cb=='0'){if(cb=='0'){nzb++;}else{nzb=0;}
cb=b.charAt(++ib);}
if(isDigitChar(ca)&&isDigitChar(cb)){if((result=compareRight(a.substring(ia),b.substring(ib)))!=0){return result;}}
if(ca==0&&cb==0){return nza-nzb;}
if(ca<cb){return-1;}else if(ca>cb){return+1;}
++ia;++ib;}}
function strnatcmp(f_string1,f_string2,f_version){if(f_version==undefined){f_version=false;}
var __strnatcmp_split=function(f_string){var result=[];var buffer='';var chr='';var i=0,f_stringl=0;var text=true;f_stringl=f_string.length;for(i=0;i<f_stringl;i++){chr=f_string.substring(i,i+1);if(chr.match(/[0-9]/)){if(text){if(buffer.length>0){result[result.length]=buffer;buffer='';}
text=false;}
buffer+=chr;}else if((text==false)&&(chr=='.')&&(i<(f_string.length-1))&&(f_string.substring(i+1,i+2).match(/[0-9]/))){result[result.length]=buffer;buffer='';}else{if(text==false){if(buffer.length>0){result[result.length]=parseInt(buffer);buffer='';}
text=true;}
buffer+=chr;}}
if(buffer.length>0){if(text){result[result.length]=buffer;}else{result[result.length]=parseInt(buffer);}}
return result;};var array1=__strnatcmp_split(f_string1+'');var array2=__strnatcmp_split(f_string2+'');var len=array1.length;var text=true;var result=-1;var r=0;if(len>array2.length){len=array2.length;result=1;}
for(i=0;i<len;i++){if(isNaN(array1[i])){if(isNaN(array2[i])){text=true;if((r=strcmp(array1[i],array2[i]))!=0){return r;}}else if(text){return 1;}else{return-1;}}else if(isNaN(array2[i])){if(text){return-1;}else{return 1;}}else{if(text||f_version){if((r=(array1[i]-array2[i]))!=0){return r;}}else{if((r=strcmp(array1[i].toString(),array2[i].toString()))!=0){return r;}}
text=false;}}
return result;}
function strncasecmp(argStr1,argStr2,len){var diff,i=0;var str1=(argStr1+'').toLowerCase().substr(0,len);var str2=(argStr2+'').toLowerCase().substr(0,len);if(str1.length!==str2.length){if(str1.length<str2.length){len=str1.length;if(str2.substr(0,str1.length)==str1){return str1.length-str2.length;}}else{len=str2.length;if(str1.substr(0,str2.length)==str2){return str1.length-str2.length;}}}else{len=str1.length;}
for(diff=0,i=0;i<len;i++){diff=str1.charCodeAt(i)-str2.charCodeAt(i);if(diff!==0){return diff;}}
return 0;}
function strncmp(str1,str2,lgth){var s1=(str1+'').substr(0,lgth);var s2=(str2+'').substr(0,lgth);return((s1==s2)?0:((s1>s2)?1:-1));}
function strpbrk(haystack,char_list){haystack+='';char_list+='';var lon=haystack.length;var lon_search=char_list.length;var ret=false;var stack='';var i=0,j=0;if(lon>=lon_search){if(lon==lon_search){if(haystack==char_list){ret=haystack;}}else{j=0;i=0;while(i<lon_search&&j<lon&&!ret){if(char_list[i]==haystack[j]){i++;if(i==lon_search){ret=true;}}
j++;}
if(ret){for(i=(j-lon_search);i<lon;i++){stack+=haystack[i];}}
if(stack!=''){ret=stack;}}}
return ret;}
function strpos(haystack,needle,offset){var i=(haystack+'').indexOf(needle,offset);return i===-1?false:i;}
function strrchr(haystack,needle){var pos=0;if(typeof needle!=='string'){needle=String.fromCharCode(parseInt(needle,10));}
needle=needle[0];pos=haystack.lastIndexOf(needle);if(pos===-1){return false;}
return haystack.substr(pos);}
function strrev(string){var ret='',i=0;string+='';for(i=string.length-1;i>=0;i--){ret+=string.charAt(i);}
return ret;}
function strripos(haystack,needle,offset){var i=(haystack+'').toLowerCase().lastIndexOf((needle+'').toLowerCase(),offset);return i>=0?i:false;}
function strrpos(haystack,needle,offset){var i=(haystack+'').lastIndexOf(needle,offset);return i>=0?i:false;}
function strspn(str1,str2,start,lgth){var found;var stri;var strj;var j=0;var i=0;start=start?(start<0?(str1.length+start):start):0;lgth=lgth?((lgth<0)?(str1.length+lgth-start):lgth):str1.length-start;str1=str1.substr(start,lgth);for(i=0;i<str1.length;i++){found=0;stri=str1.substring(i,i+1);for(j=0;j<=str2.length;j++){strj=str2.substring(j,j+1);if(stri==strj){found=1;break;}}
if(found!=1){return i;}}
return i;}
function strstr(haystack,needle,bool){var pos=0;haystack+='';pos=haystack.indexOf(needle);if(pos==-1){return false;}else{if(bool){return haystack.substr(0,pos);}else{return haystack.slice(pos);}}}
function strtok(str,tokens){if(tokens===undefined){tokens=str;str=strtok.leftOver;}
if(str.length===0){return false;}
if(tokens.indexOf(str[0])!==-1){return strtok(str.substr(1),tokens);}
for(var i=0;i<str.length;i++){if(tokens.indexOf(str[i])!==-1){break;}}
strtok.leftOver=str.substr(i+1);return str.substring(0,i);}
function strtolower(str){return(str+'').toLowerCase();}
function strtotime(str,now){var i,match,s,strTmp='',parse='';strTmp=str;strTmp=strTmp.replace(/\s{2,}|^\s|\s$/g,' ');strTmp=strTmp.replace(/[\t\r\n]/g,'');if(strTmp=='now'){return(new Date()).getTime();}else if(!isNaN(parse=Date.parse(strTmp))){return parse/1000;}else if(now){now=new Date(now);}else{now=new Date();}
strTmp=strTmp.toLowerCase();var process=function(m){var ago=(m[2]&&m[2]=='ago');var num=(num=m[0]=='last'?-1:1)*(ago?-1:1);switch(m[0]){case'last':case'next':switch(m[1].substring(0,3)){case'yea':now.setFullYear(now.getFullYear()+num);break;case'mon':now.setMonth(now.getMonth()+num);break;case'wee':now.setDate(now.getDate()+(num*7));break;case'day':now.setDate(now.getDate()+num);break;case'hou':now.setHours(now.getHours()+num);break;case'min':now.setMinutes(now.getMinutes()+num);break;case'sec':now.setSeconds(now.getSeconds()+num);break;default:var day;if(typeof(day=__is_day[m[1].substring(0,3)])!='undefined'){var diff=day-now.getDay();if(diff==0){diff=7*num;}else if(diff>0){if(m[0]=='last')diff-=7;}else{if(m[0]=='next')diff+=7;}
now.setDate(now.getDate()+diff);}}
break;default:if(/\d+/.test(m[0])){num*=parseInt(m[0]);switch(m[1].substring(0,3)){case'yea':now.setFullYear(now.getFullYear()+num);break;case'mon':now.setMonth(now.getMonth()+num);break;case'wee':now.setDate(now.getDate()+(num*7));break;case'day':now.setDate(now.getDate()+num);break;case'hou':now.setHours(now.getHours()+num);break;case'min':now.setMinutes(now.getMinutes()+num);break;case'sec':now.setSeconds(now.getSeconds()+num);break;}}else{return false;}
break;}
return true;}
var __is={day:{'sun':0,'mon':1,'tue':2,'wed':3,'thu':4,'fri':5,'sat':6},mon:{'jan':0,'feb':1,'mar':2,'apr':3,'may':4,'jun':5,'jul':6,'aug':7,'sep':8,'oct':9,'nov':10,'dec':11}}
match=strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(\s\d{1,2}:\d{1,2}(:\d{1,2})?)?$/);if(match!=null){if(!match[2]){match[2]='00:00:00';}else if(!match[3]){match[2]+=':00';}
s=match[1].split(/-/g);for(i in __is.mon){if(__is.mon[i]==s[1]-1){s[1]=i;}}
return strtotime(s[2]+' '+s[1]+' '+s[0]+' '+match[2]);}
var regex='([+-]?\\d+\\s'
+'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'
+'|sun\.?|sunday|mon\.?|monday|tue\.?|tuesday|wed\.?|wednesday'
+'|thu\.?|thursday|fri\.?|friday|sat\.?|saturday)'
+'|(last|next)\\s'
+'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'
+'|sun\.?|sunday|mon\.?|monday|tue\.?|tuesday|wed\.?|wednesday'
+'|thu\.?|thursday|fri\.?|friday|sat\.?|saturday))'
+'(\\sago)?';match=strTmp.match(new RegExp(regex,'g'));if(match==null){return false;}
for(i in match){if(!process(match[i].split(' '))){return false;}}
return(now);}
function strtoupper(str){return(str+'').toUpperCase();}
function strtr(str,from,to){var fr='',i=0,lgth=0;if(typeof from==='object'){for(fr in from){str=str.replace(fr,from[fr]);}
return str;}
lgth=to.length;if(from.length<to.length){lgth=from.length;}
for(i=0;i<lgth;i++){str=str.replace(from[i],to[i],'g');}
return str;}
function substr(f_string,f_start,f_length){f_string+='';if(f_start<0){f_start+=f_string.length;}
if(f_length==undefined){f_length=f_string.length;}else if(f_length<0){f_length+=f_string.length;}else{f_length+=f_start;}
if(f_length<f_start){f_length=f_start;}
return f_string.substring(f_start,f_length);}
function substr_count(haystack,needle,offset,length){var pos=0,cnt=0;haystack+='';needle+='';if(isNaN(offset))offset=0;if(isNaN(length))length=0;offset--;while((offset=haystack.indexOf(needle,offset+1))!=-1){if(length>0&&(offset+needle.length)>length){return false;}else{cnt++;}}
return cnt;}
function tan(arg){return Math.tan(arg);}
function tanh(arg){return(Math.exp(arg)-Math.exp(-arg))/(Math.exp(arg)+Math.exp(-arg));}
function time(){return Math.round(new Date().getTime()/1000);}
function trim(str,charlist){var whitespace,l=0,i=0;str+='';if(!charlist){whitespace=" \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";}else{charlist+='';whitespace=charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,'\$1');}
l=str.length;for(i=0;i<l;i++){if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(i);break;}}
l=str.length;for(i=l-1;i>=0;i--){if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(0,i+1);break;}}
return whitespace.indexOf(str.charAt(0))===-1?str:'';}
function uasort(inputArr,sorter){if(typeof sorter==='string'){sorter=this[sorter];}else if(sorter instanceof Array){sorter=this[sorter[0]][sorter[1]];}
var valArr=[],keyArr=[],tempKeyVal,tempValue,ret;var k='',i=0;var sorterNew=function(keyArr,valArr){for(var i=valArr.length-2;i>=0;i--){for(var j=0;j<=i;j++){ret=sorter(valArr[j+1],valArr[j]);if(ret<0){tempValue=valArr[j];valArr[j]=valArr[j+1];valArr[j+1]=tempValue;tempKeyVal=keyArr[j];keyArr[j]=keyArr[j+1];keyArr[j+1]=tempKeyVal;}}}}
for(k in inputArr){valArr.push(inputArr[k]);keyArr.push(k);delete inputArr[k];}
try{sorterNew(keyArr,valArr);}catch(e){return false;}
for(i=0;i<valArr.length;i++){inputArr[keyArr[i]]=valArr[i];}
return true;}
function ucfirst(str){str+='';var f=str.charAt(0).toUpperCase();return f+str.substr(1);}
function ucwords(str){return(str+'').replace(/^(.)|\s(.)/g,function($1){return $1.toUpperCase();});}
function uksort(array,sorter){if(typeof sorter==='string'){sorter=window[sorter];}
var tmp_arr={},keys=[],i=0,key='';for(key in array){keys.push(key);}
try{if(sorter){keys.sort(sorter);}else{keys.sort();}}catch(e){return false;}
for(i=0;i<keys.length;i++){key=keys[i];tmp_arr[key]=array[key];delete array[key];}
for(i in tmp_arr){array[i]=tmp_arr[i]}
return true;}
function unserialize(data){var error=function(type,msg,filename,line){throw new window[type](msg,filename,line);};var read_until=function(data,offset,stopchr){var buf=[];var chr=data.slice(offset,offset+1);var i=2;while(chr!=stopchr){if((i+offset)>data.length){error('Error','Invalid');}
buf.push(chr);chr=data.slice(offset+(i-1),offset+i);i+=1;}
return[buf.length,buf.join('')];};var read_chrs=function(data,offset,length){var buf;buf=[];for(var i=0;i<length;i++){var chr=data.slice(offset+(i-1),offset+i);buf.push(chr);}
return[buf.length,buf.join('')];};var _unserialize=function(data,offset){var readdata;var readData;var chrs=0;var ccount;var stringlength;var keyandchrs;var keys;if(!offset)offset=0;var dtype=(data.slice(offset,offset+1)).toLowerCase();var dataoffset=offset+2;var typeconvert=new Function('x','return x');switch(dtype){case"i":typeconvert=new Function('x','return parseInt(x)');readData=read_until(data,dataoffset,';');chrs=readData[0];readdata=readData[1];dataoffset+=chrs+1;break;case"b":typeconvert=new Function('x','return (parseInt(x) == 1)');readData=read_until(data,dataoffset,';');chrs=readData[0];readdata=readData[1];dataoffset+=chrs+1;break;case"d":typeconvert=new Function('x','return parseFloat(x)');readData=read_until(data,dataoffset,';');chrs=readData[0];readdata=readData[1];dataoffset+=chrs+1;break;case"n":readdata=null;break;case"s":ccount=read_until(data,dataoffset,':');chrs=ccount[0];stringlength=ccount[1];dataoffset+=chrs+2;readData=read_chrs(data,dataoffset+1,parseInt(stringlength));chrs=readData[0];readdata=readData[1];dataoffset+=chrs+2;if(chrs!=parseInt(stringlength)&&chrs!=readdata.length){error('SyntaxError','String length mismatch');}
break;case"a":readdata={};keyandchrs=read_until(data,dataoffset,':');chrs=keyandchrs[0];keys=keyandchrs[1];dataoffset+=chrs+2;for(var i=0;i<parseInt(keys);i++){var kprops=_unserialize(data,dataoffset);var kchrs=kprops[1];var key=kprops[2];dataoffset+=kchrs;var vprops=_unserialize(data,dataoffset);var vchrs=vprops[1];var value=vprops[2];dataoffset+=vchrs;readdata[key]=value;}
dataoffset+=1;break;default:error('SyntaxError','Unknown / Unhandled data type(s): '+dtype);break;}
return[dtype,dataoffset-offset,typeconvert(readdata)];};return _unserialize(data,0)[2];}
function urldecode(str){var histogram={};var ret=str.toString();var replacer=function(search,replace,str){var tmp_arr=[];tmp_arr=str.split(search);return tmp_arr.join(replace);};histogram["'"]='%27';histogram['(']='%28';histogram[')']='%29';histogram['*']='%2A';histogram['~']='%7E';histogram['!']='%21';histogram['%20']='+';for(replace in histogram){search=histogram[replace];ret=replacer(search,replace,ret)}
ret=decodeURIComponent(ret);return ret;}
function urlencode(str){var histogram={},tmp_arr=[];var ret=str.toString();var replacer=function(search,replace,str){var tmp_arr=[];tmp_arr=str.split(search);return tmp_arr.join(replace);};histogram["'"]='%27';histogram['(']='%28';histogram[')']='%29';histogram['*']='%2A';histogram['~']='%7E';histogram['!']='%21';histogram['%20']='+';ret=encodeURIComponent(ret);for(search in histogram){replace=histogram[search];ret=replacer(search,replace,ret)}
return ret.replace(/(\%([a-z0-9]{2}))/g,function(full,m1,m2){return"%"+m2.toUpperCase();});return ret;}
function usort(inputArr,sorter){var valArr=[],keyArr=[];var k='',i=0;if(typeof sorter==='string'){sorter=this[sorter];}else if(sorter instanceof Array){sorter=this[sorter[0]][sorter[1]];}
for(k in inputArr){valArr.push(inputArr[k]);delete inputArr[k];}
try{valArr.sort(sorter);}catch(e){return false;}
for(i=0;i<valArr.length;i++){inputArr[i]=valArr[i];}
return true;}
function utf8_decode(str_data){var tmp_arr=[],i=0,ac=0,c1=0,c2=0,c3=0;str_data+='';while(i<str_data.length){c1=str_data.charCodeAt(i);if(c1<128){tmp_arr[ac++]=String.fromCharCode(c1);i++;}else if((c1>191)&&(c1<224)){c2=str_data.charCodeAt(i+1);tmp_arr[ac++]=String.fromCharCode(((c1&31)<<6)|(c2&63));i+=2;}else{c2=str_data.charCodeAt(i+1);c3=str_data.charCodeAt(i+2);tmp_arr[ac++]=String.fromCharCode(((c1&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}
return tmp_arr.join('');}
function utf8_encode(string){string=(string+'').replace(/\r\n/g,"\n").replace(/\r/g,"\n");var utftext="";var start,end;var stringl=0;start=end=0;stringl=string.length;for(var n=0;n<stringl;n++){var c1=string.charCodeAt(n);var enc=null;if(c1<128){end++;}else if((c1>127)&&(c1<2048)){enc=String.fromCharCode((c1>>6)|192)+String.fromCharCode((c1&63)|128);}else{enc=String.fromCharCode((c1>>12)|224)+String.fromCharCode(((c1>>6)&63)|128)+String.fromCharCode((c1&63)|128);}
if(enc!=null){if(end>start){utftext+=string.substring(start,end);}
utftext+=enc;start=end=n+1;}}
if(end>start){utftext+=string.substring(start,string.length);}
return utftext;}
function var_export(mixed_expression,bool_return){var retstr="";var iret="";var cnt=0;var x=[];var key='',i=0;var __getType=function(inp){var type=typeof inp,match;if(type=='object'&&!inp){return'null';}
if(type=="object"){if(!inp.constructor){return'object';}
var cons=inp.constructor.toString();if(match=cons.match(/(\w+)\(/)){cons=match[1].toLowerCase();}
var types=["boolean","number","string","array"];for(key in types){if(cons==types[key]){type=types[key];break;}}}
return type;};var type=__getType(mixed_expression);if(type===null){retstr="NULL";}else if(type=='array'||type=='object'){for(i in mixed_expression){x[cnt++]=var_export(i,true)+" => "+var_export(mixed_expression[i],true);}
iret=x.join(',\n  ');retstr="array (\n  "+iret+"\n)";}else{retstr=(!isNaN(mixed_expression))?mixed_expression:"'"+mixed_expression.replace('/(["\'\])/g',"\\$1").replace('/\0/g',"\\0")+"'";}
if(bool_return!=true){echo(retstr);return null;}else{return retstr;}}
function vsprintf(format,args){return sprintf.apply(this,[format].concat(args));}
function wordwrap(str,int_width,str_break,cut){var m=((arguments.length>=2)?arguments[1]:75);var b=((arguments.length>=3)?arguments[2]:"\n");var c=((arguments.length>=4)?arguments[3]:false);var i,j,l,s,r;str+='';if(m<1){return str;}
for(i=-1,l=(r=str.split("\n")).length;++i<l;r[i]+=s){for(s=r[i],r[i]="";s.length>m;r[i]+=s.slice(0,j)+((s=s.slice(j)).length?b:"")){j=c==2||(j=s.slice(0,m+1).match(/\S*(\s)?$/))[1]?m:j.input.length-j[0].length||c==1&&m||j.input.length+(j=s.slice(m).match(/^\S*/)).input.length;}}
return r.join("\n");}
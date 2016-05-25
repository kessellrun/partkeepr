<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * appSetup_testUrlMatcher.
 *
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appSetup_testUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    /**
     * Constructor.
     */
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function match($pathinfo)
    {
        $allow = array();
        $pathinfo = rawurldecode($pathinfo);
        $context = $this->context;
        $request = $this->request;

        if (0 === strpos($pathinfo, '/api')) {
            if (0 === strpos($pathinfo, '/api/users')) {
                // partkeepr_auth_default_getsalt
                if ($pathinfo === '/api/users/getSalt') {
                    if ($this->context->getMethod() != 'POST') {
                        $allow[] = 'POST';
                        goto not_partkeepr_auth_default_getsalt;
                    }

                    return array (  'method' => 'post',  '_format' => 'json',  '_controller' => 'PartKeepr\\AuthBundle\\Controller\\DefaultController::getSaltAction',  '_route' => 'partkeepr_auth_default_getsalt',);
                }
                not_partkeepr_auth_default_getsalt:

                // partkeepr_auth_default_logout
                if ($pathinfo === '/api/users/logout') {
                    return array (  'method' => 'GET',  '_format' => 'json',  '_controller' => 'PartKeepr\\AuthBundle\\Controller\\DefaultController::logoutAction',  '_route' => 'partkeepr_auth_default_logout',);
                }

            }

            if (0 === strpos($pathinfo, '/api/system_')) {
                // partkeepr_core_default_getsystemstatus
                if ($pathinfo === '/api/system_status') {
                    return array (  'method' => 'get',  '_format' => 'json',  '_controller' => 'PartKeepr\\CoreBundle\\Controller\\DefaultController::getSystemStatusAction',  '_route' => 'partkeepr_core_default_getsystemstatus',);
                }

                // partkeepr_core_default_getsysteminformation
                if ($pathinfo === '/api/system_information') {
                    return array (  'method' => 'get',  '_format' => 'json',  '_controller' => 'PartKeepr\\CoreBundle\\Controller\\DefaultController::getSystemInformationAction',  '_route' => 'partkeepr_core_default_getsysteminformation',);
                }

            }

            // partkeepr_core_default_getdiskfreespace
            if ($pathinfo === '/api/disk_space') {
                return array (  'method' => 'get',  '_format' => 'json',  '_controller' => 'PartKeepr\\CoreBundle\\Controller\\DefaultController::getDiskFreeSpaceAction',  '_route' => 'partkeepr_core_default_getdiskfreespace',);
            }

            // partkeepr_project_projectreport_getprojectreport
            if ($pathinfo === '/api/project_reports') {
                return array (  'method' => 'get',  '_format' => 'json',  '_controller' => 'PartKeepr\\ProjectBundle\\Controller\\ProjectReportController::getProjectReportAction',  '_route' => 'partkeepr_project_projectreport_getprojectreport',);
            }

            if (0 === strpos($pathinfo, '/api/statistics')) {
                // partkeepr_statistic_statistic_getcurrentstatistic
                if ($pathinfo === '/api/statistics/current') {
                    return array (  'method' => 'get',  '_format' => 'json',  '_controller' => 'PartKeepr\\StatisticBundle\\Controller\\StatisticController::getCurrentStatisticAction',  '_route' => 'partkeepr_statistic_statistic_getcurrentstatistic',);
                }

                // partkeepr_statistic_statistic_getsampledstatistic
                if ($pathinfo === '/api/statistics/sampled') {
                    return array (  'method' => 'get',  '_format' => 'json',  '_controller' => 'PartKeepr\\StatisticBundle\\Controller\\StatisticController::getSampledStatisticAction',  '_route' => 'partkeepr_statistic_statistic_getsampledstatistic',);
                }

                // partkeepr_statistic_statistic_getstatisticrange
                if ($pathinfo === '/api/statistics/range') {
                    return array (  'method' => 'get',  '_format' => 'json',  '_controller' => 'PartKeepr\\StatisticBundle\\Controller\\StatisticController::getStatisticRangeAction',  '_route' => 'partkeepr_statistic_statistic_getstatisticrange',);
                }

            }

            // partkeepr_cronlogger_cronrunner_runcrons
            if ($pathinfo === '/api/cron/run') {
                return array (  '_controller' => 'PartKeepr\\CronLoggerBundle\\Controller\\CronRunnerController::runCronsAction',  '_route' => 'partkeepr_cronlogger_cronrunner_runcrons',);
            }

            // partkeepr_part_part_massremovestock
            if ($pathinfo === '/api/parts/massRemoveStock') {
                return array (  'method' => 'get',  '_format' => 'json',  '_controller' => 'PartKeepr\\PartBundle\\Controller\\PartController::massRemoveStockAction',  '_route' => 'partkeepr_part_part_massremovestock',);
            }

        }

        // partkeepr_frontend_index_index
        if (rtrim($pathinfo, '/') === '') {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($pathinfo.'/', 'partkeepr_frontend_index_index');
            }

            return array (  '_controller' => 'PartKeepr\\FrontendBundle\\Controller\\IndexController::indexAction',  '_route' => 'partkeepr_frontend_index_index',);
        }

        // partkeepr_export_export_export
        if ($pathinfo === '/api/export') {
            return array (  'method' => 'post',  '_format' => 'json',  '_controller' => 'PartKeepr\\ExportBundle\\Controller\\ExportController::exportAction',  '_route' => 'partkeepr_export_export_export',);
        }

        if (0 === strpos($pathinfo, '/setup')) {
            // partkeepr_setup_setup_inttestconnectivity
            if ($pathinfo === '/setup/_int_test_connectivity') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\SetupController::intTestConnectivityAction',  '_route' => 'partkeepr_setup_setup_inttestconnectivity',);
            }

            // partkeepr_setup_setup_testconnectivity
            if ($pathinfo === '/setup/testConnectivity') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\SetupController::testConnectivityAction',  '_route' => 'partkeepr_setup_setup_testconnectivity',);
            }

            // partkeepr_setup_setup_saveconfig
            if ($pathinfo === '/setup/saveConfig') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\SetupController::saveConfigAction',  '_route' => 'partkeepr_setup_setup_saveconfig',);
            }

            // partkeepr_setup_setup_webservertest
            if ($pathinfo === '/setup/webserverTest') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\SetupController::webserverTestAction',  '_route' => 'partkeepr_setup_setup_webservertest',);
            }

            // partkeepr_setup_setup_generateauthkey
            if ($pathinfo === '/setup/generateAuthKey') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\SetupController::generateAuthKeyAction',  '_route' => 'partkeepr_setup_setup_generateauthkey',);
            }

            // partkeepr_setup_cachewarmupsetup_intcachewarmup
            if ($pathinfo === '/setup/_int_cache_warmup') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\CacheWarmupSetupController::intCacheWarmupAction',  '_route' => 'partkeepr_setup_cachewarmupsetup_intcachewarmup',);
            }

            // partkeepr_setup_cachewarmupsetup_cachewarmup
            if ($pathinfo === '/setup/warmupCache') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\CacheWarmupSetupController::cacheWarmupAction',  '_route' => 'partkeepr_setup_cachewarmupsetup_cachewarmup',);
            }

            // partkeepr_setup_schemasetup_intsetupschema
            if ($pathinfo === '/setup/_int_setup_schema') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\SchemaSetupController::intSetupSchemaAction',  '_route' => 'partkeepr_setup_schemasetup_intsetupschema',);
            }

            // partkeepr_setup_schemasetup_setupschema
            if ($pathinfo === '/setup/schemaSetup') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\SchemaSetupController::setupSchemaAction',  '_route' => 'partkeepr_setup_schemasetup_setupschema',);
            }

            // partkeepr_setup_adminusersetup_createuser
            if ($pathinfo === '/setup/createUser') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\AdminUserSetupController::createUserAction',  '_route' => 'partkeepr_setup_adminusersetup_createuser',);
            }

            if (0 === strpos($pathinfo, '/setup/_int_')) {
                // partkeepr_setup_adminusersetup_intcreateuser
                if ($pathinfo === '/setup/_int_create_user') {
                    return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\AdminUserSetupController::intCreateUserAction',  '_route' => 'partkeepr_setup_adminusersetup_intcreateuser',);
                }

                // partkeepr_setup_schemamigrationsetup_intmigrateschema
                if ($pathinfo === '/setup/_int_migrate_schema') {
                    return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\SchemaMigrationSetupController::intMigrateSchemaAction',  '_route' => 'partkeepr_setup_schemamigrationsetup_intmigrateschema',);
                }

            }

            // partkeepr_setup_schemamigrationsetup_migrateschema
            if ($pathinfo === '/setup/schemaMigration') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\SchemaMigrationSetupController::migrateSchemaAction',  '_route' => 'partkeepr_setup_schemamigrationsetup_migrateschema',);
            }

            // partkeepr_setup_partunitsetup_createpartunits
            if ($pathinfo === '/setup/createPartUnits') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\PartUnitSetupController::createPartUnitsAction',  '_route' => 'partkeepr_setup_partunitsetup_createpartunits',);
            }

            if (0 === strpos($pathinfo, '/setup/_int_create_')) {
                // partkeepr_setup_partunitsetup_intcreatepartunits
                if ($pathinfo === '/setup/_int_create_part_units') {
                    return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\PartUnitSetupController::intCreatePartUnitsAction',  '_route' => 'partkeepr_setup_partunitsetup_intcreatepartunits',);
                }

                // partkeepr_setup_footprintsetup_intcreatefootprints
                if ($pathinfo === '/setup/_int_create_footprints') {
                    return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\FootprintSetupController::intCreateFootprints',  '_route' => 'partkeepr_setup_footprintsetup_intcreatefootprints',);
                }

            }

            // partkeepr_setup_footprintsetup_createfootprints
            if ($pathinfo === '/setup/createFootprints') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\FootprintSetupController::createFootprintsAction',  '_route' => 'partkeepr_setup_footprintsetup_createfootprints',);
            }

            // partkeepr_setup_siprefixsetup_intcreatesiprefixes
            if ($pathinfo === '/setup/_int_create_si_prefixes') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\SiPrefixSetupController::intCreateSiPrefixes',  '_route' => 'partkeepr_setup_siprefixsetup_intcreatesiprefixes',);
            }

            // partkeepr_setup_siprefixsetup_createsiprefixes
            if ($pathinfo === '/setup/createSiPrefixes') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\SiPrefixSetupController::createSiPrefixesAction',  '_route' => 'partkeepr_setup_siprefixsetup_createsiprefixes',);
            }

            // partkeepr_setup_unitsetup_intcreateunits
            if ($pathinfo === '/setup/_int_create_units') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\UnitSetupController::intCreateUnitsAction',  '_route' => 'partkeepr_setup_unitsetup_intcreateunits',);
            }

            // partkeepr_setup_unitsetup_createunit
            if ($pathinfo === '/setup/createUnits') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\UnitSetupController::createUnitAction',  '_route' => 'partkeepr_setup_unitsetup_createunit',);
            }

            // partkeepr_setup_manufacturersetup_intcreatemanufacturers
            if ($pathinfo === '/setup/_int_create_manufacturers') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\ManufacturerSetupController::intCreateManufacturersAction',  '_route' => 'partkeepr_setup_manufacturersetup_intcreatemanufacturers',);
            }

            // partkeepr_setup_manufacturersetup_createmanufacturers
            if ($pathinfo === '/setup/createManufacturers') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\ManufacturerSetupController::createManufacturersAction',  '_route' => 'partkeepr_setup_manufacturersetup_createmanufacturers',);
            }

            // partkeepr_setup_existingconfigparser_parseexistingconfig
            if ($pathinfo === '/setup/parseExistingConfig') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\ExistingConfigParserController::parseExistingConfigAction',  '_route' => 'partkeepr_setup_existingconfigparser_parseexistingconfig',);
            }

            // partkeepr_setup_existingusersetup_testexistingusers
            if ($pathinfo === '/setup/testExistingUsers') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\ExistingUserSetupController::testExistingUsersAction',  '_route' => 'partkeepr_setup_existingusersetup_testexistingusers',);
            }

            // partkeepr_setup_existingusersetup_inttestexistingusers
            if ($pathinfo === '/setup/_int_test_existing_users') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\ExistingUserSetupController::intTestExistingUsersAction',  '_route' => 'partkeepr_setup_existingusersetup_inttestexistingusers',);
            }

            // partkeepr_setup_filemigration_migratefiles
            if ($pathinfo === '/setup/migrateFiles') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\FileMigrationController::migrateFilesAction',  '_route' => 'partkeepr_setup_filemigration_migratefiles',);
            }

            // partkeepr_setup_filemigration_intmigratefiles
            if ($pathinfo === '/setup/_int_migrate_files_action') {
                return array (  '_controller' => 'PartKeepr\\SetupBundle\\Controller\\FileMigrationController::intMigrateFilesAction',  '_route' => 'partkeepr_setup_filemigration_intmigratefiles',);
            }

        }

        if (0 === strpos($pathinfo, '/api')) {
            // api_jsonld_entrypoint
            if (rtrim($pathinfo, '/') === '/api') {
                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', 'api_jsonld_entrypoint');
                }

                return array (  '_controller' => 'api.jsonld.action.entrypoint',  '_route' => 'api_jsonld_entrypoint',);
            }

            // api_jsonld_context
            if (0 === strpos($pathinfo, '/api/contexts') && preg_match('#^/api/contexts/(?P<shortName>.+)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_jsonld_context')), array (  '_controller' => 'api.jsonld.action.context',));
            }

            // api_hydra_vocab
            if ($pathinfo === '/api/apidoc') {
                return array (  '_controller' => 'api.hydra.action.documentation',  '_route' => 'api_hydra_vocab',);
            }

            if (0 === strpos($pathinfo, '/api/distributors')) {
                // api_distributors_get_collection
                if ($pathinfo === '/api/distributors') {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_api_distributors_get_collection;
                    }

                    return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'Distributor',  '_route' => 'api_distributors_get_collection',);
                }
                not_api_distributors_get_collection:

                // api_distributors_post_collection
                if ($pathinfo === '/api/distributors') {
                    if ($this->context->getMethod() != 'POST') {
                        $allow[] = 'POST';
                        goto not_api_distributors_post_collection;
                    }

                    return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'Distributor',  '_route' => 'api_distributors_post_collection',);
                }
                not_api_distributors_post_collection:

                // api_distributors_get_item
                if (preg_match('#^/api/distributors/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_api_distributors_get_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_distributors_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'Distributor',));
                }
                not_api_distributors_get_item:

                // api_distributors_put_item
                if (preg_match('#^/api/distributors/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if ($this->context->getMethod() != 'PUT') {
                        $allow[] = 'PUT';
                        goto not_api_distributors_put_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_distributors_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'Distributor',));
                }
                not_api_distributors_put_item:

                // api_distributors_delete_item
                if (preg_match('#^/api/distributors/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if ($this->context->getMethod() != 'DELETE') {
                        $allow[] = 'DELETE';
                        goto not_api_distributors_delete_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_distributors_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'Distributor',));
                }
                not_api_distributors_delete_item:

            }

            if (0 === strpos($pathinfo, '/api/footprint')) {
                if (0 === strpos($pathinfo, '/api/footprints')) {
                    // api_footprints_get_collection
                    if ($pathinfo === '/api/footprints') {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_footprints_get_collection;
                        }

                        return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'Footprint',  '_route' => 'api_footprints_get_collection',);
                    }
                    not_api_footprints_get_collection:

                    // api_footprints_post_collection
                    if ($pathinfo === '/api/footprints') {
                        if ($this->context->getMethod() != 'POST') {
                            $allow[] = 'POST';
                            goto not_api_footprints_post_collection;
                        }

                        return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'Footprint',  '_route' => 'api_footprints_post_collection',);
                    }
                    not_api_footprints_post_collection:

                    // api_footprints_get_item
                    if (preg_match('#^/api/footprints/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_footprints_get_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_footprints_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'Footprint',));
                    }
                    not_api_footprints_get_item:

                    // api_footprints_put_item
                    if (preg_match('#^/api/footprints/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_api_footprints_put_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_footprints_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'Footprint',));
                    }
                    not_api_footprints_put_item:

                    // api_footprints_delete_item
                    if (preg_match('#^/api/footprints/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'DELETE') {
                            $allow[] = 'DELETE';
                            goto not_api_footprints_delete_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_footprints_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'Footprint',));
                    }
                    not_api_footprints_delete_item:

                }

                if (0 === strpos($pathinfo, '/api/footprint_')) {
                    if (0 === strpos($pathinfo, '/api/footprint_images')) {
                        // api_footprint_images_get_collection
                        if ($pathinfo === '/api/footprint_images') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_footprint_images_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'FootprintImage',  '_route' => 'api_footprint_images_get_collection',);
                        }
                        not_api_footprint_images_get_collection:

                        // api_footprint_images_post_collection
                        if ($pathinfo === '/api/footprint_images') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_footprint_images_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'FootprintImage',  '_route' => 'api_footprint_images_post_collection',);
                        }
                        not_api_footprint_images_post_collection:

                        // api_footprint_images_get_item
                        if (preg_match('#^/api/footprint_images/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_footprint_images_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_footprint_images_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'FootprintImage',));
                        }
                        not_api_footprint_images_get_item:

                        // FootprintImageGetImage
                        if (preg_match('#^/api/footprint_images/(?P<id>[^/]++)/getImage$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_FootprintImageGetImage;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'FootprintImageGetImage')), array (  '_controller' => 'PartKeepr\\FootprintBundle\\Controller\\FootprintImageController::getImageAction',  '_resource' => 'FootprintImage',));
                        }
                        not_FootprintImageGetImage:

                    }

                    if (0 === strpos($pathinfo, '/api/footprint_attachments')) {
                        // api_footprint_attachments_get_collection
                        if ($pathinfo === '/api/footprint_attachments') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_footprint_attachments_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'FootprintAttachment',  '_route' => 'api_footprint_attachments_get_collection',);
                        }
                        not_api_footprint_attachments_get_collection:

                        // api_footprint_attachments_post_collection
                        if ($pathinfo === '/api/footprint_attachments') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_footprint_attachments_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'FootprintAttachment',  '_route' => 'api_footprint_attachments_post_collection',);
                        }
                        not_api_footprint_attachments_post_collection:

                        // api_footprint_attachments_get_item
                        if (preg_match('#^/api/footprint_attachments/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_footprint_attachments_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_footprint_attachments_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'FootprintAttachment',));
                        }
                        not_api_footprint_attachments_get_item:

                        // FootprintAttachmentGet
                        if (preg_match('#^/api/footprint_attachments/(?P<id>[^/]++)/getFile$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_FootprintAttachmentGet;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'FootprintAttachmentGet')), array (  '_controller' => 'PartKeepr\\FootprintBundle\\Controller\\FootprintAttachmentController::getFileAction',  '_resource' => 'FootprintAttachment',));
                        }
                        not_FootprintAttachmentGet:

                        // FootprintAttachmentMimeTypeIcon
                        if (preg_match('#^/api/footprint_attachments/(?P<id>[^/]++)/getMimeTypeIcon$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_FootprintAttachmentMimeTypeIcon;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'FootprintAttachmentMimeTypeIcon')), array (  '_controller' => 'PartKeepr\\FootprintBundle\\Controller\\FootprintAttachmentController::getMimeTypeIconAction',  '_resource' => 'FootprintAttachment',));
                        }
                        not_FootprintAttachmentMimeTypeIcon:

                    }

                    if (0 === strpos($pathinfo, '/api/footprint_categories')) {
                        // api_footprint_categories_get_collection
                        if ($pathinfo === '/api/footprint_categories') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_footprint_categories_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'FootprintCategory',  '_route' => 'api_footprint_categories_get_collection',);
                        }
                        not_api_footprint_categories_get_collection:

                        // PartKeeprFootprintCategoryGetRootNode
                        if ($pathinfo === '/api/footprint_categories/getExtJSRootNode') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_PartKeeprFootprintCategoryGetRootNode;
                            }

                            return array (  '_controller' => 'partkeepr.category.get_root_node',  '_resource' => 'FootprintCategory',  '_route' => 'PartKeeprFootprintCategoryGetRootNode',);
                        }
                        not_PartKeeprFootprintCategoryGetRootNode:

                        // api_footprint_categories_post_collection
                        if ($pathinfo === '/api/footprint_categories') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_footprint_categories_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'FootprintCategory',  '_route' => 'api_footprint_categories_post_collection',);
                        }
                        not_api_footprint_categories_post_collection:

                        // api_footprint_categories_get_item
                        if (preg_match('#^/api/footprint_categories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_footprint_categories_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_footprint_categories_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'FootprintCategory',));
                        }
                        not_api_footprint_categories_get_item:

                        // api_footprint_categories_put_item
                        if (preg_match('#^/api/footprint_categories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'PUT') {
                                $allow[] = 'PUT';
                                goto not_api_footprint_categories_put_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_footprint_categories_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'FootprintCategory',));
                        }
                        not_api_footprint_categories_put_item:

                        // api_footprint_categories_delete_item
                        if (preg_match('#^/api/footprint_categories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'DELETE') {
                                $allow[] = 'DELETE';
                                goto not_api_footprint_categories_delete_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_footprint_categories_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'FootprintCategory',));
                        }
                        not_api_footprint_categories_delete_item:

                        // FootprintCategoryMove
                        if (preg_match('#^/api/footprint_categories/(?P<id>[^/]++)/move$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'PUT') {
                                $allow[] = 'PUT';
                                goto not_FootprintCategoryMove;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'FootprintCategoryMove')), array (  '_controller' => 'partkeepr.category.move',  '_resource' => 'FootprintCategory',));
                        }
                        not_FootprintCategoryMove:

                    }

                }

            }

            if (0 === strpos($pathinfo, '/api/part')) {
                if (0 === strpos($pathinfo, '/api/parts')) {
                    // api_parts_get_collection
                    if ($pathinfo === '/api/parts') {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_parts_get_collection;
                        }

                        return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'Part',  '_route' => 'api_parts_get_collection',);
                    }
                    not_api_parts_get_collection:

                    // PartPost
                    if ($pathinfo === '/api/parts') {
                        if ($this->context->getMethod() != 'POST') {
                            $allow[] = 'POST';
                            goto not_PartPost;
                        }

                        return array (  '_controller' => 'partkeepr.part.post',  '_resource' => 'Part',  '_route' => 'PartPost',);
                    }
                    not_PartPost:

                    // api_parts_get_item
                    if (preg_match('#^/api/parts/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_parts_get_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_parts_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'Part',));
                    }
                    not_api_parts_get_item:

                    // PartPut
                    if (preg_match('#^/api/parts/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_PartPut;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartPut')), array (  '_controller' => 'partkeepr.part.put',  '_resource' => 'Part',));
                    }
                    not_PartPut:

                    // api_parts_delete_item
                    if (preg_match('#^/api/parts/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'DELETE') {
                            $allow[] = 'DELETE';
                            goto not_api_parts_delete_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_parts_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'Part',));
                    }
                    not_api_parts_delete_item:

                    // PartAddStock
                    if (preg_match('#^/api/parts/(?P<id>[^/]++)/addStock$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_PartAddStock;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartAddStock')), array (  '_controller' => 'partkeepr.part.add_stock',  '_resource' => 'Part',));
                    }
                    not_PartAddStock:

                    // PartRemoveStock
                    if (preg_match('#^/api/parts/(?P<id>[^/]++)/removeStock$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_PartRemoveStock;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartRemoveStock')), array (  '_controller' => 'partkeepr.part.remove_stock',  '_resource' => 'Part',));
                    }
                    not_PartRemoveStock:

                    // PartSetStock
                    if (preg_match('#^/api/parts/(?P<id>[^/]++)/setStock$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_PartSetStock;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartSetStock')), array (  '_controller' => 'partkeepr.part.set_stock',  '_resource' => 'Part',));
                    }
                    not_PartSetStock:

                }

                if (0 === strpos($pathinfo, '/api/part_')) {
                    if (0 === strpos($pathinfo, '/api/part_attachments')) {
                        // api_part_attachments_get_collection
                        if ($pathinfo === '/api/part_attachments') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_part_attachments_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'PartAttachment',  '_route' => 'api_part_attachments_get_collection',);
                        }
                        not_api_part_attachments_get_collection:

                        // api_part_attachments_post_collection
                        if ($pathinfo === '/api/part_attachments') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_part_attachments_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'PartAttachment',  '_route' => 'api_part_attachments_post_collection',);
                        }
                        not_api_part_attachments_post_collection:

                        // api_part_attachments_get_item
                        if (preg_match('#^/api/part_attachments/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_part_attachments_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_attachments_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'PartAttachment',));
                        }
                        not_api_part_attachments_get_item:

                        // PartAttachmentGet
                        if (preg_match('#^/api/part_attachments/(?P<id>[^/]++)/getFile$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_PartAttachmentGet;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartAttachmentGet')), array (  '_controller' => 'PartKeepr\\PartBundle\\Controller\\PartAttachmentController::getFileAction',  '_resource' => 'PartAttachment',));
                        }
                        not_PartAttachmentGet:

                        // PartAttachmentMimeTypeIcon
                        if (preg_match('#^/api/part_attachments/(?P<id>[^/]++)/getMimeTypeIcon$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_PartAttachmentMimeTypeIcon;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartAttachmentMimeTypeIcon')), array (  '_controller' => 'PartKeepr\\PartBundle\\Controller\\PartAttachmentController::getMimeTypeIconAction',  '_resource' => 'PartAttachment',));
                        }
                        not_PartAttachmentMimeTypeIcon:

                        // PartAttachmentGetImage
                        if (preg_match('#^/api/part_attachments/(?P<id>[^/]++)/getImage$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_PartAttachmentGetImage;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartAttachmentGetImage')), array (  '_controller' => 'PartKeepr\\PartBundle\\Controller\\PartAttachmentController::getImageAction',  '_resource' => 'PartAttachment',));
                        }
                        not_PartAttachmentGetImage:

                    }

                    if (0 === strpos($pathinfo, '/api/part_categories')) {
                        // api_part_categories_get_collection
                        if ($pathinfo === '/api/part_categories') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_part_categories_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'PartCategory',  '_route' => 'api_part_categories_get_collection',);
                        }
                        not_api_part_categories_get_collection:

                        // PartKeeprPartCategoryGetRootNode
                        if ($pathinfo === '/api/part_categories/getExtJSRootNode') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_PartKeeprPartCategoryGetRootNode;
                            }

                            return array (  '_controller' => 'partkeepr.category.get_root_node',  '_resource' => 'PartCategory',  '_route' => 'PartKeeprPartCategoryGetRootNode',);
                        }
                        not_PartKeeprPartCategoryGetRootNode:

                        // api_part_categories_post_collection
                        if ($pathinfo === '/api/part_categories') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_part_categories_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'PartCategory',  '_route' => 'api_part_categories_post_collection',);
                        }
                        not_api_part_categories_post_collection:

                        // api_part_categories_get_item
                        if (preg_match('#^/api/part_categories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_part_categories_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_categories_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'PartCategory',));
                        }
                        not_api_part_categories_get_item:

                        // api_part_categories_put_item
                        if (preg_match('#^/api/part_categories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'PUT') {
                                $allow[] = 'PUT';
                                goto not_api_part_categories_put_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_categories_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'PartCategory',));
                        }
                        not_api_part_categories_put_item:

                        // api_part_categories_delete_item
                        if (preg_match('#^/api/part_categories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'DELETE') {
                                $allow[] = 'DELETE';
                                goto not_api_part_categories_delete_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_categories_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'PartCategory',));
                        }
                        not_api_part_categories_delete_item:

                        // PartKeeprPartCategoryMove
                        if (preg_match('#^/api/part_categories/(?P<id>[^/]++)/move$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'PUT') {
                                $allow[] = 'PUT';
                                goto not_PartKeeprPartCategoryMove;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartKeeprPartCategoryMove')), array (  '_controller' => 'partkeepr.category.move',  '_resource' => 'PartCategory',));
                        }
                        not_PartKeeprPartCategoryMove:

                    }

                    if (0 === strpos($pathinfo, '/api/part_distributors')) {
                        // api_part_distributors_get_collection
                        if ($pathinfo === '/api/part_distributors') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_part_distributors_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'PartDistributor',  '_route' => 'api_part_distributors_get_collection',);
                        }
                        not_api_part_distributors_get_collection:

                        // api_part_distributors_post_collection
                        if ($pathinfo === '/api/part_distributors') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_part_distributors_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'PartDistributor',  '_route' => 'api_part_distributors_post_collection',);
                        }
                        not_api_part_distributors_post_collection:

                        // api_part_distributors_get_item
                        if (preg_match('#^/api/part_distributors/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_part_distributors_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_distributors_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'PartDistributor',));
                        }
                        not_api_part_distributors_get_item:

                        // api_part_distributors_put_item
                        if (preg_match('#^/api/part_distributors/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'PUT') {
                                $allow[] = 'PUT';
                                goto not_api_part_distributors_put_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_distributors_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'PartDistributor',));
                        }
                        not_api_part_distributors_put_item:

                        // api_part_distributors_delete_item
                        if (preg_match('#^/api/part_distributors/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'DELETE') {
                                $allow[] = 'DELETE';
                                goto not_api_part_distributors_delete_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_distributors_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'PartDistributor',));
                        }
                        not_api_part_distributors_delete_item:

                    }

                    if (0 === strpos($pathinfo, '/api/part_manufacturers')) {
                        // api_part_manufacturers_get_collection
                        if ($pathinfo === '/api/part_manufacturers') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_part_manufacturers_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'PartManufacturer',  '_route' => 'api_part_manufacturers_get_collection',);
                        }
                        not_api_part_manufacturers_get_collection:

                        // api_part_manufacturers_post_collection
                        if ($pathinfo === '/api/part_manufacturers') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_part_manufacturers_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'PartManufacturer',  '_route' => 'api_part_manufacturers_post_collection',);
                        }
                        not_api_part_manufacturers_post_collection:

                        // api_part_manufacturers_get_item
                        if (preg_match('#^/api/part_manufacturers/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_part_manufacturers_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_manufacturers_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'PartManufacturer',));
                        }
                        not_api_part_manufacturers_get_item:

                        // api_part_manufacturers_put_item
                        if (preg_match('#^/api/part_manufacturers/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'PUT') {
                                $allow[] = 'PUT';
                                goto not_api_part_manufacturers_put_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_manufacturers_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'PartManufacturer',));
                        }
                        not_api_part_manufacturers_put_item:

                        // api_part_manufacturers_delete_item
                        if (preg_match('#^/api/part_manufacturers/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'DELETE') {
                                $allow[] = 'DELETE';
                                goto not_api_part_manufacturers_delete_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_manufacturers_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'PartManufacturer',));
                        }
                        not_api_part_manufacturers_delete_item:

                    }

                }

            }

            if (0 === strpos($pathinfo, '/api/manufacturer')) {
                if (0 === strpos($pathinfo, '/api/manufacturers')) {
                    // api_manufacturers_get_collection
                    if ($pathinfo === '/api/manufacturers') {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_manufacturers_get_collection;
                        }

                        return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'Manufacturer',  '_route' => 'api_manufacturers_get_collection',);
                    }
                    not_api_manufacturers_get_collection:

                    // api_manufacturers_post_collection
                    if ($pathinfo === '/api/manufacturers') {
                        if ($this->context->getMethod() != 'POST') {
                            $allow[] = 'POST';
                            goto not_api_manufacturers_post_collection;
                        }

                        return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'Manufacturer',  '_route' => 'api_manufacturers_post_collection',);
                    }
                    not_api_manufacturers_post_collection:

                    // api_manufacturers_get_item
                    if (preg_match('#^/api/manufacturers/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_manufacturers_get_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_manufacturers_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'Manufacturer',));
                    }
                    not_api_manufacturers_get_item:

                    // api_manufacturers_put_item
                    if (preg_match('#^/api/manufacturers/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_api_manufacturers_put_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_manufacturers_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'Manufacturer',));
                    }
                    not_api_manufacturers_put_item:

                    // api_manufacturers_delete_item
                    if (preg_match('#^/api/manufacturers/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'DELETE') {
                            $allow[] = 'DELETE';
                            goto not_api_manufacturers_delete_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_manufacturers_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'Manufacturer',));
                    }
                    not_api_manufacturers_delete_item:

                }

                if (0 === strpos($pathinfo, '/api/manufacturer_i_c_logos')) {
                    // api_manufacturer_i_c_logos_get_collection
                    if ($pathinfo === '/api/manufacturer_i_c_logos') {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_manufacturer_i_c_logos_get_collection;
                        }

                        return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'ManufacturerICLogo',  '_route' => 'api_manufacturer_i_c_logos_get_collection',);
                    }
                    not_api_manufacturer_i_c_logos_get_collection:

                    // api_manufacturer_i_c_logos_post_collection
                    if ($pathinfo === '/api/manufacturer_i_c_logos') {
                        if ($this->context->getMethod() != 'POST') {
                            $allow[] = 'POST';
                            goto not_api_manufacturer_i_c_logos_post_collection;
                        }

                        return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'ManufacturerICLogo',  '_route' => 'api_manufacturer_i_c_logos_post_collection',);
                    }
                    not_api_manufacturer_i_c_logos_post_collection:

                    // api_manufacturer_i_c_logos_get_item
                    if (preg_match('#^/api/manufacturer_i_c_logos/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_manufacturer_i_c_logos_get_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_manufacturer_i_c_logos_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'ManufacturerICLogo',));
                    }
                    not_api_manufacturer_i_c_logos_get_item:

                    // api_manufacturer_i_c_logos_put_item
                    if (preg_match('#^/api/manufacturer_i_c_logos/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_api_manufacturer_i_c_logos_put_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_manufacturer_i_c_logos_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'ManufacturerICLogo',));
                    }
                    not_api_manufacturer_i_c_logos_put_item:

                    // ManufacturerIcLogoGetImage
                    if (preg_match('#^/api/manufacturer_i_c_logos/(?P<id>[^/]++)/getImage$#s', $pathinfo, $matches)) {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_ManufacturerIcLogoGetImage;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'ManufacturerIcLogoGetImage')), array (  '_controller' => 'PartKeepr\\ManufacturerBundle\\Controller\\ManufacturerIcLogoController::getImageAction',  '_resource' => 'ManufacturerICLogo',));
                    }
                    not_ManufacturerIcLogoGetImage:

                }

            }

            if (0 === strpos($pathinfo, '/api/part_measurement_units')) {
                // api_part_measurement_units_get_collection
                if ($pathinfo === '/api/part_measurement_units') {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_api_part_measurement_units_get_collection;
                    }

                    return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'PartMeasurementUnit',  '_route' => 'api_part_measurement_units_get_collection',);
                }
                not_api_part_measurement_units_get_collection:

                // api_part_measurement_units_post_collection
                if ($pathinfo === '/api/part_measurement_units') {
                    if ($this->context->getMethod() != 'POST') {
                        $allow[] = 'POST';
                        goto not_api_part_measurement_units_post_collection;
                    }

                    return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'PartMeasurementUnit',  '_route' => 'api_part_measurement_units_post_collection',);
                }
                not_api_part_measurement_units_post_collection:

                // PartMeasurementUnitSetDefault
                if (preg_match('#^/api/part_measurement_units/(?P<id>[^/]++)/setDefault$#s', $pathinfo, $matches)) {
                    if ($this->context->getMethod() != 'PUT') {
                        $allow[] = 'PUT';
                        goto not_PartMeasurementUnitSetDefault;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartMeasurementUnitSetDefault')), array (  '_controller' => 'partkeepr.part_measurement_unit.set_default',  '_resource' => 'PartMeasurementUnit',));
                }
                not_PartMeasurementUnitSetDefault:

                // api_part_measurement_units_get_item
                if (preg_match('#^/api/part_measurement_units/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_api_part_measurement_units_get_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_measurement_units_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'PartMeasurementUnit',));
                }
                not_api_part_measurement_units_get_item:

                // api_part_measurement_units_put_item
                if (preg_match('#^/api/part_measurement_units/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if ($this->context->getMethod() != 'PUT') {
                        $allow[] = 'PUT';
                        goto not_api_part_measurement_units_put_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_part_measurement_units_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'PartMeasurementUnit',));
                }
                not_api_part_measurement_units_put_item:

            }

            if (0 === strpos($pathinfo, '/api/units')) {
                // api_units_get_collection
                if ($pathinfo === '/api/units') {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_api_units_get_collection;
                    }

                    return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'Unit',  '_route' => 'api_units_get_collection',);
                }
                not_api_units_get_collection:

                // api_units_post_collection
                if ($pathinfo === '/api/units') {
                    if ($this->context->getMethod() != 'POST') {
                        $allow[] = 'POST';
                        goto not_api_units_post_collection;
                    }

                    return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'Unit',  '_route' => 'api_units_post_collection',);
                }
                not_api_units_post_collection:

                // api_units_get_item
                if (preg_match('#^/api/units/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_api_units_get_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_units_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'Unit',));
                }
                not_api_units_get_item:

                // api_units_put_item
                if (preg_match('#^/api/units/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if ($this->context->getMethod() != 'PUT') {
                        $allow[] = 'PUT';
                        goto not_api_units_put_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_units_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'Unit',));
                }
                not_api_units_put_item:

                // api_units_delete_item
                if (preg_match('#^/api/units/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if ($this->context->getMethod() != 'DELETE') {
                        $allow[] = 'DELETE';
                        goto not_api_units_delete_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_units_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'Unit',));
                }
                not_api_units_delete_item:

            }

            if (0 === strpos($pathinfo, '/api/s')) {
                if (0 === strpos($pathinfo, '/api/si_prefixes')) {
                    // api_si_prefixes_get_collection
                    if ($pathinfo === '/api/si_prefixes') {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_si_prefixes_get_collection;
                        }

                        return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'SiPrefix',  '_route' => 'api_si_prefixes_get_collection',);
                    }
                    not_api_si_prefixes_get_collection:

                    // api_si_prefixes_post_collection
                    if ($pathinfo === '/api/si_prefixes') {
                        if ($this->context->getMethod() != 'POST') {
                            $allow[] = 'POST';
                            goto not_api_si_prefixes_post_collection;
                        }

                        return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'SiPrefix',  '_route' => 'api_si_prefixes_post_collection',);
                    }
                    not_api_si_prefixes_post_collection:

                    // api_si_prefixes_get_item
                    if (preg_match('#^/api/si_prefixes/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_si_prefixes_get_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_si_prefixes_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'SiPrefix',));
                    }
                    not_api_si_prefixes_get_item:

                    // api_si_prefixes_put_item
                    if (preg_match('#^/api/si_prefixes/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_api_si_prefixes_put_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_si_prefixes_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'SiPrefix',));
                    }
                    not_api_si_prefixes_put_item:

                    // api_si_prefixes_delete_item
                    if (preg_match('#^/api/si_prefixes/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'DELETE') {
                            $allow[] = 'DELETE';
                            goto not_api_si_prefixes_delete_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_si_prefixes_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'SiPrefix',));
                    }
                    not_api_si_prefixes_delete_item:

                }

                if (0 === strpos($pathinfo, '/api/sto')) {
                    if (0 === strpos($pathinfo, '/api/storage_locations')) {
                        // api_storage_locations_get_collection
                        if ($pathinfo === '/api/storage_locations') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_storage_locations_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'StorageLocation',  '_route' => 'api_storage_locations_get_collection',);
                        }
                        not_api_storage_locations_get_collection:

                        // api_storage_locations_post_collection
                        if ($pathinfo === '/api/storage_locations') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_storage_locations_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'StorageLocation',  '_route' => 'api_storage_locations_post_collection',);
                        }
                        not_api_storage_locations_post_collection:

                        // api_storage_locations_get_item
                        if (preg_match('#^/api/storage_locations/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_storage_locations_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_storage_locations_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'StorageLocation',));
                        }
                        not_api_storage_locations_get_item:

                        // api_storage_locations_put_item
                        if (preg_match('#^/api/storage_locations/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'PUT') {
                                $allow[] = 'PUT';
                                goto not_api_storage_locations_put_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_storage_locations_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'StorageLocation',));
                        }
                        not_api_storage_locations_put_item:

                        // api_storage_locations_delete_item
                        if (preg_match('#^/api/storage_locations/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'DELETE') {
                                $allow[] = 'DELETE';
                                goto not_api_storage_locations_delete_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_storage_locations_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'StorageLocation',));
                        }
                        not_api_storage_locations_delete_item:

                    }

                    if (0 === strpos($pathinfo, '/api/stock_entries')) {
                        // api_stock_entries_get_collection
                        if ($pathinfo === '/api/stock_entries') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_stock_entries_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'StockEntry',  '_route' => 'api_stock_entries_get_collection',);
                        }
                        not_api_stock_entries_get_collection:

                        // api_stock_entries_post_collection
                        if ($pathinfo === '/api/stock_entries') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_stock_entries_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'StockEntry',  '_route' => 'api_stock_entries_post_collection',);
                        }
                        not_api_stock_entries_post_collection:

                        // api_stock_entries_get_item
                        if (preg_match('#^/api/stock_entries/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_stock_entries_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_stock_entries_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'StockEntry',));
                        }
                        not_api_stock_entries_get_item:

                        // api_stock_entries_put_item
                        if (preg_match('#^/api/stock_entries/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'PUT') {
                                $allow[] = 'PUT';
                                goto not_api_stock_entries_put_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_stock_entries_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'StockEntry',));
                        }
                        not_api_stock_entries_put_item:

                        // api_stock_entries_delete_item
                        if (preg_match('#^/api/stock_entries/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'DELETE') {
                                $allow[] = 'DELETE';
                                goto not_api_stock_entries_delete_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_stock_entries_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'StockEntry',));
                        }
                        not_api_stock_entries_delete_item:

                    }

                    if (0 === strpos($pathinfo, '/api/storage_location_')) {
                        if (0 === strpos($pathinfo, '/api/storage_location_categories')) {
                            // api_storage_location_categories_get_collection
                            if ($pathinfo === '/api/storage_location_categories') {
                                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                    $allow = array_merge($allow, array('GET', 'HEAD'));
                                    goto not_api_storage_location_categories_get_collection;
                                }

                                return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'StorageLocationCategory',  '_route' => 'api_storage_location_categories_get_collection',);
                            }
                            not_api_storage_location_categories_get_collection:

                            // StorageLocationCategoryGetRoot
                            if ($pathinfo === '/api/storage_location_categories/getExtJSRootNode') {
                                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                    $allow = array_merge($allow, array('GET', 'HEAD'));
                                    goto not_StorageLocationCategoryGetRoot;
                                }

                                return array (  '_controller' => 'partkeepr.category.get_root_node',  '_resource' => 'StorageLocationCategory',  '_route' => 'StorageLocationCategoryGetRoot',);
                            }
                            not_StorageLocationCategoryGetRoot:

                            // api_storage_location_categories_post_collection
                            if ($pathinfo === '/api/storage_location_categories') {
                                if ($this->context->getMethod() != 'POST') {
                                    $allow[] = 'POST';
                                    goto not_api_storage_location_categories_post_collection;
                                }

                                return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'StorageLocationCategory',  '_route' => 'api_storage_location_categories_post_collection',);
                            }
                            not_api_storage_location_categories_post_collection:

                            // api_storage_location_categories_get_item
                            if (preg_match('#^/api/storage_location_categories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                    $allow = array_merge($allow, array('GET', 'HEAD'));
                                    goto not_api_storage_location_categories_get_item;
                                }

                                return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_storage_location_categories_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'StorageLocationCategory',));
                            }
                            not_api_storage_location_categories_get_item:

                            // api_storage_location_categories_put_item
                            if (preg_match('#^/api/storage_location_categories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                                if ($this->context->getMethod() != 'PUT') {
                                    $allow[] = 'PUT';
                                    goto not_api_storage_location_categories_put_item;
                                }

                                return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_storage_location_categories_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'StorageLocationCategory',));
                            }
                            not_api_storage_location_categories_put_item:

                            // api_storage_location_categories_delete_item
                            if (preg_match('#^/api/storage_location_categories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                                if ($this->context->getMethod() != 'DELETE') {
                                    $allow[] = 'DELETE';
                                    goto not_api_storage_location_categories_delete_item;
                                }

                                return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_storage_location_categories_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'StorageLocationCategory',));
                            }
                            not_api_storage_location_categories_delete_item:

                            // StorageLocationCategoryMove
                            if (preg_match('#^/api/storage_location_categories/(?P<id>[^/]++)/move$#s', $pathinfo, $matches)) {
                                if ($this->context->getMethod() != 'PUT') {
                                    $allow[] = 'PUT';
                                    goto not_StorageLocationCategoryMove;
                                }

                                return $this->mergeDefaults(array_replace($matches, array('_route' => 'StorageLocationCategoryMove')), array (  '_controller' => 'partkeepr.category.move',  '_resource' => 'StorageLocationCategory',));
                            }
                            not_StorageLocationCategoryMove:

                        }

                        if (0 === strpos($pathinfo, '/api/storage_location_images')) {
                            // api_storage_location_images_get_collection
                            if ($pathinfo === '/api/storage_location_images') {
                                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                    $allow = array_merge($allow, array('GET', 'HEAD'));
                                    goto not_api_storage_location_images_get_collection;
                                }

                                return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'StorageLocationImage',  '_route' => 'api_storage_location_images_get_collection',);
                            }
                            not_api_storage_location_images_get_collection:

                            // api_storage_location_images_post_collection
                            if ($pathinfo === '/api/storage_location_images') {
                                if ($this->context->getMethod() != 'POST') {
                                    $allow[] = 'POST';
                                    goto not_api_storage_location_images_post_collection;
                                }

                                return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'StorageLocationImage',  '_route' => 'api_storage_location_images_post_collection',);
                            }
                            not_api_storage_location_images_post_collection:

                            // api_storage_location_images_get_item
                            if (preg_match('#^/api/storage_location_images/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                    $allow = array_merge($allow, array('GET', 'HEAD'));
                                    goto not_api_storage_location_images_get_item;
                                }

                                return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_storage_location_images_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'StorageLocationImage',));
                            }
                            not_api_storage_location_images_get_item:

                            // StorageLocationGetImage
                            if (preg_match('#^/api/storage_location_images/(?P<id>[^/]++)/getImage$#s', $pathinfo, $matches)) {
                                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                    $allow = array_merge($allow, array('GET', 'HEAD'));
                                    goto not_StorageLocationGetImage;
                                }

                                return $this->mergeDefaults(array_replace($matches, array('_route' => 'StorageLocationGetImage')), array (  '_controller' => 'PartKeepr\\StorageLocationBundle\\Controller\\StorageLocationImageController::getImageAction',  '_resource' => 'StorageLocationImage',));
                            }
                            not_StorageLocationGetImage:

                        }

                    }

                }

            }

            if (0 === strpos($pathinfo, '/api/t')) {
                if (0 === strpos($pathinfo, '/api/temp_')) {
                    if (0 === strpos($pathinfo, '/api/temp_images')) {
                        // TemporaryImageUpload
                        if ($pathinfo === '/api/temp_images/upload') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_TemporaryImageUpload;
                            }

                            return array (  '_controller' => 'PartKeepr\\ImageBundle\\Controller\\TemporaryImageController::uploadAction',  '_resource' => 'TempImage',  '_route' => 'TemporaryImageUpload',);
                        }
                        not_TemporaryImageUpload:

                        // TemporaryImageUploadWebcam
                        if ($pathinfo === '/api/temp_images/webcamUpload') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_TemporaryImageUploadWebcam;
                            }

                            return array (  '_controller' => 'PartKeepr\\ImageBundle\\Controller\\TemporaryImageController::webcamUploadAction',  '_resource' => 'TempImage',  '_route' => 'TemporaryImageUploadWebcam',);
                        }
                        not_TemporaryImageUploadWebcam:

                        // api_temp_images_get_item
                        if (preg_match('#^/api/temp_images/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_temp_images_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_temp_images_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'TempImage',));
                        }
                        not_api_temp_images_get_item:

                        // TemporaryImageGet
                        if (preg_match('#^/api/temp_images/(?P<id>[^/]++)/getImage$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_TemporaryImageGet;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'TemporaryImageGet')), array (  '_controller' => 'PartKeepr\\ImageBundle\\Controller\\TemporaryImageController::getImageAction',  '_resource' => 'TempImage',));
                        }
                        not_TemporaryImageGet:

                    }

                    if (0 === strpos($pathinfo, '/api/temp_uploaded_files')) {
                        // TemporaryFileUpload
                        if ($pathinfo === '/api/temp_uploaded_files/upload') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_TemporaryFileUpload;
                            }

                            return array (  '_controller' => 'PartKeepr\\UploadedFileBundle\\Controller\\TemporaryFileController::uploadAction',  '_resource' => 'TempUploadedFile',  '_route' => 'TemporaryFileUpload',);
                        }
                        not_TemporaryFileUpload:

                        // api_temp_uploaded_files_get_item
                        if (preg_match('#^/api/temp_uploaded_files/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_temp_uploaded_files_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_temp_uploaded_files_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'TempUploadedFile',));
                        }
                        not_api_temp_uploaded_files_get_item:

                        // TemporaryFileGet
                        if (preg_match('#^/api/temp_uploaded_files/(?P<id>[^/]++)/getFile$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_TemporaryFileGet;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'TemporaryFileGet')), array (  '_controller' => 'PartKeepr\\UploadedFileBundle\\Controller\\TemporaryFileController::getFileAction',  '_resource' => 'TempUploadedFile',));
                        }
                        not_TemporaryFileGet:

                        // TemporaryFileGetMimeTypeIcon
                        if (preg_match('#^/api/temp_uploaded_files/(?P<id>[^/]++)/getMimeTypeIcon$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_TemporaryFileGetMimeTypeIcon;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'TemporaryFileGetMimeTypeIcon')), array (  '_controller' => 'PartKeepr\\UploadedFileBundle\\Controller\\TemporaryFileController::getMimeTypeIconAction',  '_resource' => 'TempUploadedFile',));
                        }
                        not_TemporaryFileGetMimeTypeIcon:

                        // TemporaryFileUploadWebcam
                        if ($pathinfo === '/api/temp_uploaded_files/webcamUpload') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_TemporaryFileUploadWebcam;
                            }

                            return array (  '_controller' => 'PartKeepr\\UploadedFileBundle\\Controller\\TemporaryFileController::webcamUploadAction',  '_resource' => 'TempUploadedFile',  '_route' => 'TemporaryFileUploadWebcam',);
                        }
                        not_TemporaryFileUploadWebcam:

                    }

                }

                if (0 === strpos($pathinfo, '/api/tip_of_the_day')) {
                    if (0 === strpos($pathinfo, '/api/tip_of_the_days')) {
                        // api_tip_of_the_days_get_collection
                        if ($pathinfo === '/api/tip_of_the_days') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_tip_of_the_days_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'TipOfTheDay',  '_route' => 'api_tip_of_the_days_get_collection',);
                        }
                        not_api_tip_of_the_days_get_collection:

                        // api_tip_of_the_days_post_collection
                        if ($pathinfo === '/api/tip_of_the_days') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_tip_of_the_days_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'TipOfTheDay',  '_route' => 'api_tip_of_the_days_post_collection',);
                        }
                        not_api_tip_of_the_days_post_collection:

                        // TipMarkAllUnrad
                        if ($pathinfo === '/api/tip_of_the_days/markAllTipsAsUnread') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_TipMarkAllUnrad;
                            }

                            return array (  '_controller' => 'partkeepr.tip_of_the_day.mark_all_unread',  '_resource' => 'TipOfTheDay',  '_route' => 'TipMarkAllUnrad',);
                        }
                        not_TipMarkAllUnrad:

                        // api_tip_of_the_days_get_item
                        if (preg_match('#^/api/tip_of_the_days/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_tip_of_the_days_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_tip_of_the_days_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'TipOfTheDay',));
                        }
                        not_api_tip_of_the_days_get_item:

                        // TipMarkRead
                        if (preg_match('#^/api/tip_of_the_days/(?P<id>[^/]++)/markTipRead$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'PUT') {
                                $allow[] = 'PUT';
                                goto not_TipMarkRead;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'TipMarkRead')), array (  '_controller' => 'partkeepr.tip_of_the_day.mark_read',  '_resource' => 'TipOfTheDay',));
                        }
                        not_TipMarkRead:

                    }

                    if (0 === strpos($pathinfo, '/api/tip_of_the_day_histories')) {
                        // TipHistoriesGet
                        if ($pathinfo === '/api/tip_of_the_day_histories') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_TipHistoriesGet;
                            }

                            return array (  '_controller' => 'partkeepr.tip_of_the_day_history.collection_get',  '_resource' => 'TipOfTheDayHistory',  '_route' => 'TipHistoriesGet',);
                        }
                        not_TipHistoriesGet:

                        // api_tip_of_the_day_histories_get_item
                        if (preg_match('#^/api/tip_of_the_day_histories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_tip_of_the_day_histories_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_tip_of_the_day_histories_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'TipOfTheDayHistory',));
                        }
                        not_api_tip_of_the_day_histories_get_item:

                        // api_tip_of_the_day_histories_put_item
                        if (preg_match('#^/api/tip_of_the_day_histories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'PUT') {
                                $allow[] = 'PUT';
                                goto not_api_tip_of_the_day_histories_put_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_tip_of_the_day_histories_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'TipOfTheDayHistory',));
                        }
                        not_api_tip_of_the_day_histories_put_item:

                        // api_tip_of_the_day_histories_delete_item
                        if (preg_match('#^/api/tip_of_the_day_histories/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'DELETE') {
                                $allow[] = 'DELETE';
                                goto not_api_tip_of_the_day_histories_delete_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_tip_of_the_day_histories_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'TipOfTheDayHistory',));
                        }
                        not_api_tip_of_the_day_histories_delete_item:

                    }

                }

            }

            if (0 === strpos($pathinfo, '/api/user')) {
                if (0 === strpos($pathinfo, '/api/user_providers')) {
                    // api_user_providers_get_collection
                    if ($pathinfo === '/api/user_providers') {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_user_providers_get_collection;
                        }

                        return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'UserProvider',  '_route' => 'api_user_providers_get_collection',);
                    }
                    not_api_user_providers_get_collection:

                    // api_user_providers_post_collection
                    if ($pathinfo === '/api/user_providers') {
                        if ($this->context->getMethod() != 'POST') {
                            $allow[] = 'POST';
                            goto not_api_user_providers_post_collection;
                        }

                        return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'UserProvider',  '_route' => 'api_user_providers_post_collection',);
                    }
                    not_api_user_providers_post_collection:

                    // api_user_providers_get_item
                    if (preg_match('#^/api/user_providers/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_user_providers_get_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_user_providers_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'UserProvider',));
                    }
                    not_api_user_providers_get_item:

                    // api_user_providers_put_item
                    if (preg_match('#^/api/user_providers/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_api_user_providers_put_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_user_providers_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'UserProvider',));
                    }
                    not_api_user_providers_put_item:

                    // api_user_providers_delete_item
                    if (preg_match('#^/api/user_providers/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'DELETE') {
                            $allow[] = 'DELETE';
                            goto not_api_user_providers_delete_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_user_providers_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'UserProvider',));
                    }
                    not_api_user_providers_delete_item:

                }

                if (0 === strpos($pathinfo, '/api/users')) {
                    // api_users_get_collection
                    if ($pathinfo === '/api/users') {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_users_get_collection;
                        }

                        return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'User',  '_route' => 'api_users_get_collection',);
                    }
                    not_api_users_get_collection:

                    // PartKeeprUserPost
                    if ($pathinfo === '/api/users') {
                        if ($this->context->getMethod() != 'POST') {
                            $allow[] = 'POST';
                            goto not_PartKeeprUserPost;
                        }

                        return array (  '_controller' => 'partkeepr.user.post',  '_resource' => 'User',  '_route' => 'PartKeeprUserPost',);
                    }
                    not_PartKeeprUserPost:

                    // PartKeeprAuthGetProviders
                    if ($pathinfo === '/api/users/get_user_providers') {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_PartKeeprAuthGetProviders;
                        }

                        return array (  '_controller' => 'partkeepr.auth.get_providers',  '_resource' => 'User',  '_route' => 'PartKeeprAuthGetProviders',);
                    }
                    not_PartKeeprAuthGetProviders:

                    // api_users_get_item
                    if (preg_match('#^/api/users/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_users_get_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_users_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'User',));
                    }
                    not_api_users_get_item:

                    // PartKeeprUserPut
                    if (preg_match('#^/api/users/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_PartKeeprUserPut;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartKeeprUserPut')), array (  '_controller' => 'partkeepr.user.put',  '_resource' => 'User',));
                    }
                    not_PartKeeprUserPut:

                    // PartKeeprUserDelete
                    if (preg_match('#^/api/users/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'DELETE') {
                            $allow[] = 'DELETE';
                            goto not_PartKeeprUserDelete;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartKeeprUserDelete')), array (  '_controller' => 'partkeepr.user.delete',  '_resource' => 'User',));
                    }
                    not_PartKeeprUserDelete:

                }

                if (0 === strpos($pathinfo, '/api/user_preferences')) {
                    // PartKeeprUserPreferenceGet
                    if ($pathinfo === '/api/user_preferences') {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_PartKeeprUserPreferenceGet;
                        }

                        return array (  '_controller' => 'partkeepr.user_preference.get_preferences',  '_resource' => 'User',  '_route' => 'PartKeeprUserPreferenceGet',);
                    }
                    not_PartKeeprUserPreferenceGet:

                    // PartKeeprUserPreferenceSet
                    if ($pathinfo === '/api/user_preferences') {
                        if (!in_array($this->context->getMethod(), array('POST', 'PUT'))) {
                            $allow = array_merge($allow, array('POST', 'PUT'));
                            goto not_PartKeeprUserPreferenceSet;
                        }

                        return array (  '_controller' => 'partkeepr.user_preference.set_preference',  '_resource' => 'User',  '_route' => 'PartKeeprUserPreferenceSet',);
                    }
                    not_PartKeeprUserPreferenceSet:

                    // PartKeeprUserPreferenceDelete
                    if ($pathinfo === '/api/user_preferences') {
                        if ($this->context->getMethod() != 'DELETE') {
                            $allow[] = 'DELETE';
                            goto not_PartKeeprUserPreferenceDelete;
                        }

                        return array (  '_controller' => 'partkeepr.user_preference.delete_preference',  '_resource' => 'User',  '_route' => 'PartKeeprUserPreferenceDelete',);
                    }
                    not_PartKeeprUserPreferenceDelete:

                }

                if (0 === strpos($pathinfo, '/api/users')) {
                    // PartKeeprAuthLogin
                    if ($pathinfo === '/api/users/login') {
                        if ($this->context->getMethod() != 'POST') {
                            $allow[] = 'POST';
                            goto not_PartKeeprAuthLogin;
                        }

                        return array (  '_controller' => 'partkeepr.auth.login',  '_resource' => 'User',  '_route' => 'PartKeeprAuthLogin',);
                    }
                    not_PartKeeprAuthLogin:

                    // PartKeeprAuthChangePassword
                    if (preg_match('#^/api/users/(?P<id>[^/]++)/changePassword$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_PartKeeprAuthChangePassword;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'PartKeeprAuthChangePassword')), array (  '_controller' => 'partkeepr.auth.change_password',  '_resource' => 'User',));
                    }
                    not_PartKeeprAuthChangePassword:

                }

            }

            if (0 === strpos($pathinfo, '/api/f_o_s_users')) {
                // api_f_o_s_users_get_collection
                if ($pathinfo === '/api/f_o_s_users') {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_api_f_o_s_users_get_collection;
                    }

                    return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'FOSUser',  '_route' => 'api_f_o_s_users_get_collection',);
                }
                not_api_f_o_s_users_get_collection:

                // api_f_o_s_users_post_collection
                if ($pathinfo === '/api/f_o_s_users') {
                    if ($this->context->getMethod() != 'POST') {
                        $allow[] = 'POST';
                        goto not_api_f_o_s_users_post_collection;
                    }

                    return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'FOSUser',  '_route' => 'api_f_o_s_users_post_collection',);
                }
                not_api_f_o_s_users_post_collection:

                // api_f_o_s_users_get_item
                if (preg_match('#^/api/f_o_s_users/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_api_f_o_s_users_get_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_f_o_s_users_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'FOSUser',));
                }
                not_api_f_o_s_users_get_item:

                // api_f_o_s_users_put_item
                if (preg_match('#^/api/f_o_s_users/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if ($this->context->getMethod() != 'PUT') {
                        $allow[] = 'PUT';
                        goto not_api_f_o_s_users_put_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_f_o_s_users_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'FOSUser',));
                }
                not_api_f_o_s_users_put_item:

                // api_f_o_s_users_delete_item
                if (preg_match('#^/api/f_o_s_users/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if ($this->context->getMethod() != 'DELETE') {
                        $allow[] = 'DELETE';
                        goto not_api_f_o_s_users_delete_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_f_o_s_users_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'FOSUser',));
                }
                not_api_f_o_s_users_delete_item:

            }

            if (0 === strpos($pathinfo, '/api/project')) {
                if (0 === strpos($pathinfo, '/api/projects')) {
                    // api_projects_get_collection
                    if ($pathinfo === '/api/projects') {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_projects_get_collection;
                        }

                        return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'Project',  '_route' => 'api_projects_get_collection',);
                    }
                    not_api_projects_get_collection:

                    // api_projects_post_collection
                    if ($pathinfo === '/api/projects') {
                        if ($this->context->getMethod() != 'POST') {
                            $allow[] = 'POST';
                            goto not_api_projects_post_collection;
                        }

                        return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'Project',  '_route' => 'api_projects_post_collection',);
                    }
                    not_api_projects_post_collection:

                    // api_projects_get_item
                    if (preg_match('#^/api/projects/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_api_projects_get_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_projects_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'Project',));
                    }
                    not_api_projects_get_item:

                    // api_projects_put_item
                    if (preg_match('#^/api/projects/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'PUT') {
                            $allow[] = 'PUT';
                            goto not_api_projects_put_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_projects_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'Project',));
                    }
                    not_api_projects_put_item:

                    // api_projects_delete_item
                    if (preg_match('#^/api/projects/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                        if ($this->context->getMethod() != 'DELETE') {
                            $allow[] = 'DELETE';
                            goto not_api_projects_delete_item;
                        }

                        return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_projects_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'Project',));
                    }
                    not_api_projects_delete_item:

                }

                if (0 === strpos($pathinfo, '/api/project_')) {
                    if (0 === strpos($pathinfo, '/api/project_parts')) {
                        // api_project_parts_get_collection
                        if ($pathinfo === '/api/project_parts') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_project_parts_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'ProjectPart',  '_route' => 'api_project_parts_get_collection',);
                        }
                        not_api_project_parts_get_collection:

                        // api_project_parts_post_collection
                        if ($pathinfo === '/api/project_parts') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_project_parts_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'ProjectPart',  '_route' => 'api_project_parts_post_collection',);
                        }
                        not_api_project_parts_post_collection:

                        // api_project_parts_get_item
                        if (preg_match('#^/api/project_parts/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_project_parts_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_project_parts_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'ProjectPart',));
                        }
                        not_api_project_parts_get_item:

                        // api_project_parts_put_item
                        if (preg_match('#^/api/project_parts/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'PUT') {
                                $allow[] = 'PUT';
                                goto not_api_project_parts_put_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_project_parts_put_item')), array (  '_controller' => 'api.action.put_item',  '_resource' => 'ProjectPart',));
                        }
                        not_api_project_parts_put_item:

                        // api_project_parts_delete_item
                        if (preg_match('#^/api/project_parts/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if ($this->context->getMethod() != 'DELETE') {
                                $allow[] = 'DELETE';
                                goto not_api_project_parts_delete_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_project_parts_delete_item')), array (  '_controller' => 'api.action.delete_item',  '_resource' => 'ProjectPart',));
                        }
                        not_api_project_parts_delete_item:

                    }

                    if (0 === strpos($pathinfo, '/api/project_attachments')) {
                        // api_project_attachments_get_collection
                        if ($pathinfo === '/api/project_attachments') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_project_attachments_get_collection;
                            }

                            return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'ProjectAttachment',  '_route' => 'api_project_attachments_get_collection',);
                        }
                        not_api_project_attachments_get_collection:

                        // api_project_attachments_post_collection
                        if ($pathinfo === '/api/project_attachments') {
                            if ($this->context->getMethod() != 'POST') {
                                $allow[] = 'POST';
                                goto not_api_project_attachments_post_collection;
                            }

                            return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'ProjectAttachment',  '_route' => 'api_project_attachments_post_collection',);
                        }
                        not_api_project_attachments_post_collection:

                        // api_project_attachments_get_item
                        if (preg_match('#^/api/project_attachments/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_api_project_attachments_get_item;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_project_attachments_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'ProjectAttachment',));
                        }
                        not_api_project_attachments_get_item:

                        // ProjectAttachmentGet
                        if (preg_match('#^/api/project_attachments/(?P<id>[^/]++)/getFile$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_ProjectAttachmentGet;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'ProjectAttachmentGet')), array (  '_controller' => 'PartKeepr\\ProjectBundle\\Controller\\ProjectAttachmentController::getFileAction',  '_resource' => 'ProjectAttachment',));
                        }
                        not_ProjectAttachmentGet:

                        // ProjectAttachmentMimeTypeIcon
                        if (preg_match('#^/api/project_attachments/(?P<id>[^/]++)/getMimeTypeIcon$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_ProjectAttachmentMimeTypeIcon;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'ProjectAttachmentMimeTypeIcon')), array (  '_controller' => 'PartKeepr\\ProjectBundle\\Controller\\ProjectAttachmentController::getMimeTypeIconAction',  '_resource' => 'ProjectAttachment',));
                        }
                        not_ProjectAttachmentMimeTypeIcon:

                        // ProjectAttachmentGetImage
                        if (preg_match('#^/api/project_attachments/(?P<id>[^/]++)/getImage$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_ProjectAttachmentGetImage;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'ProjectAttachmentGetImage')), array (  '_controller' => 'PartKeepr\\ProjectBundle\\Controller\\ProjectAttachmentController::getImageAction',  '_resource' => 'ProjectAttachment',));
                        }
                        not_ProjectAttachmentGetImage:

                    }

                }

            }

            if (0 === strpos($pathinfo, '/api/system_notices')) {
                // api_system_notices_get_collection
                if ($pathinfo === '/api/system_notices') {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_api_system_notices_get_collection;
                    }

                    return array (  '_controller' => 'api.action.get_collection',  '_resource' => 'SystemNotice',  '_route' => 'api_system_notices_get_collection',);
                }
                not_api_system_notices_get_collection:

                // api_system_notices_post_collection
                if ($pathinfo === '/api/system_notices') {
                    if ($this->context->getMethod() != 'POST') {
                        $allow[] = 'POST';
                        goto not_api_system_notices_post_collection;
                    }

                    return array (  '_controller' => 'api.action.post_collection',  '_resource' => 'SystemNotice',  '_route' => 'api_system_notices_post_collection',);
                }
                not_api_system_notices_post_collection:

                // api_system_notices_get_item
                if (preg_match('#^/api/system_notices/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_api_system_notices_get_item;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'api_system_notices_get_item')), array (  '_controller' => 'api.action.get_item',  '_resource' => 'SystemNotice',));
                }
                not_api_system_notices_get_item:

                // SystemNoticeAcknowledge
                if (preg_match('#^/api/system_notices/(?P<id>[^/]++)/acknowledge$#s', $pathinfo, $matches)) {
                    if ($this->context->getMethod() != 'PUT') {
                        $allow[] = 'PUT';
                        goto not_SystemNoticeAcknowledge;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'SystemNoticeAcknowledge')), array (  '_controller' => 'partkeepr.system_notice.acknowledge',  '_resource' => 'SystemNotice',));
                }
                not_SystemNoticeAcknowledge:

            }

        }

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}

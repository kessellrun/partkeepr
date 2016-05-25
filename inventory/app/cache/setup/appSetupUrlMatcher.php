<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * appSetupUrlMatcher.
 *
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appSetupUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
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

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}

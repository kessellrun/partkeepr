<?php
$container->setParameter('authentication_provider', 'PartKeepr.Auth.HTTPBasicAuthenticationProvider');
$container->setParameter('cache.doctrine', 'apc');
$container->setParameter('cache.dunglas', 'api.mapping.cache.apc');
$container->setParameter('database_driver', 'pdo_mysql');
$container->setParameter('database_host', 'localhost');
$container->setParameter('database_name', 'inventory');
$container->setParameter('database_password', 'spartan1');
$container->setParameter('database_port', 3306);
$container->setParameter('database_user', 'root');
$container->setParameter('fr3d_ldap.driver.accountCanonicalForm', NULL);
$container->setParameter('fr3d_ldap.driver.accountDomainName', NULL);
$container->setParameter('fr3d_ldap.driver.accountDomainNameShort', NULL);
$container->setParameter('fr3d_ldap.driver.accountFilterFormat', NULL);
$container->setParameter('fr3d_ldap.driver.baseDn', '');
$container->setParameter('fr3d_ldap.driver.bindRequiresDn', false);
$container->setParameter('fr3d_ldap.driver.host', '127.0.0.1');
$container->setParameter('fr3d_ldap.driver.optReferrals', NULL);
$container->setParameter('fr3d_ldap.driver.password', NULL);
$container->setParameter('fr3d_ldap.driver.port', 389);
$container->setParameter('fr3d_ldap.driver.useSsl', NULL);
$container->setParameter('fr3d_ldap.driver.useStartTls', NULL);
$container->setParameter('fr3d_ldap.driver.username', NULL);
$container->setParameter('fr3d_ldap.user.attribute.email', 'email');
$container->setParameter('fr3d_ldap.user.attribute.username', 'samaccountname');
$container->setParameter('fr3d_ldap.user.baseDn', 'dc=example,dc=com');
$container->setParameter('fr3d_ldap.user.enabled', false);
$container->setParameter('fr3d_ldap.user.filter', NULL);
$container->setParameter('locale', 'en');
$container->setParameter('mailer_auth_mode', NULL);
$container->setParameter('mailer_encryption', NULL);
$container->setParameter('mailer_host', NULL);
$container->setParameter('mailer_password', NULL);
$container->setParameter('mailer_port', NULL);
$container->setParameter('mailer_transport', NULL);
$container->setParameter('mailer_user', NULL);
$container->setParameter('partkeepr.auth.max_users', 'unlimited');
$container->setParameter('partkeepr.category.path_separator', ' ➤ ');
$container->setParameter('partkeepr.cronjob.check', true);
$container->setParameter('partkeepr.filesystem.data_directory', '%kernel.root_dir%/../data/');
$container->setParameter('partkeepr.filesystem.quota', false);
$container->setParameter('partkeepr.maintenance', false);
$container->setParameter('partkeepr.maintenance.message', '');
$container->setParameter('partkeepr.maintenance.title', '');
$container->setParameter('partkeepr.parts.limit', false);
$container->setParameter('partkeepr.users.limit', false);
$container->setParameter('secret', 'JKLCHPKOABKNQIOEBHAPNMLGOECCKLMC');

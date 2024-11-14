-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS user_login_data_external;
DROP TABLE IF EXISTS user_login_data;
DROP TABLE IF EXISTS granted_permissions;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS external_providers;
DROP TABLE IF EXISTS hashing_algorithms;
DROP TABLE IF EXISTS email_validation_status;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS user_roles;

-- Drop sequences
DROP SEQUENCE IF EXISTS user_roles_role_id_seq;
DROP SEQUENCE IF EXISTS permissions_permission_id_seq;
DROP SEQUENCE IF EXISTS user_account_user_id_seq;
DROP SEQUENCE IF EXISTS hashing_algorithms_hash_algorithm_id_seq;
DROP SEQUENCE IF EXISTS email_validation_status_email_validation_status_id_seq;
DROP SEQUENCE IF EXISTS external_providers_external_provider_id_seq;

-- Drop db role
DROP ROLE IF EXISTS "tilawah-manager";
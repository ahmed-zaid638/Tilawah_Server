DO $do$
BEGIN
   IF EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'tilawah-manager') THEN

      RAISE NOTICE 'Role "tilawah-manager" already exists. Skipping.';
   ELSE
      CREATE ROLE "tilawah-manager";
   END IF;
END
$do$;

CREATE SEQUENCE user_roles_role_id_seq;
CREATE SEQUENCE permissions_permission_id_seq;
CREATE SEQUENCE user_account_user_id_seq;
CREATE SEQUENCE hashing_algorithms_hash_algorithm_id_seq;
CREATE SEQUENCE email_validation_status_email_validation_status_id_seq;
CREATE SEQUENCE external_providers_external_provider_id_seq;



CREATE TABLE user_roles (
    role_id INTEGER PRIMARY KEY DEFAULT nextval('user_roles_role_id_seq'),
    role_uuid UUID UNIQUE NOT NULL,
    role_description VARCHAR(20) NOT NULL
);

CREATE TABLE permissions (
    permission_id INTEGER PRIMARY KEY DEFAULT nextval('permissions_permission_id_seq'),
    permission_uuid UUID UNIQUE NOT NULL,
    permission_description VARCHAR(50) NOT NULL
);

CREATE TABLE granted_permissions (
    role_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES user_roles(role_id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(permission_id) ON DELETE CASCADE
);

CREATE TABLE user_account (
    user_id INTEGER PRIMARY KEY DEFAULT nextval('user_account_user_id_seq'),
    user_uuid UUID UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender CHAR(1) NOT NULL,
    date_of_birth DATE NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES user_roles(role_id) ON DELETE SET NULL

);

-- for images either use another blob table to store image, or cloude storage
CREATE TABLE email_validation_status (
    email_validation_status_id INTEGER PRIMARY KEY DEFAULT nextval('email_validation_status_email_validation_status_id_seq'),
    status_description VARCHAR(20) NOT NULL
);

CREATE TABLE user_login_data (
    user_id INTEGER PRIMARY KEY,
    login_name VARCHAR(20) NOT NULL,
    password_hash VARCHAR(250) NOT NULL,
    email_address VARCHAR(100) NOT NULL,
    confirmation_token VARCHAR(100),
    token_generation_time TIMESTAMP,
    email_validation_status_id INTEGER NOT NULL,
    password_recovery_token VARCHAR(100),
    recovery_token_time TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE,
    FOREIGN KEY (email_validation_status_id) REFERENCES email_validation_status(email_validation_status_id) ON DELETE RESTRICT
);

CREATE TABLE external_providers (
    external_provider_id INTEGER PRIMARY KEY DEFAULT nextval('external_providers_external_provider_id_seq'),
    external_provider_uuid UUID UNIQUE NOT NULL,
    provider_name VARCHAR(50) NOT NULL,
    ws_end_point VARCHAR(200) NOT NULL
);

CREATE TABLE user_login_data_external (
    user_id INTEGER NOT NULL,
    external_provider_id INTEGER NOT NULL,
    external_provider_token VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id, external_provider_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE,
    FOREIGN KEY (external_provider_id) REFERENCES external_providers(external_provider_id) ON DELETE CASCADE
);
DO
$body$
BEGIN
   IF NOT EXISTS (
      SELECT *
      FROM   pg_catalog.pg_user
      WHERE  usename = 'tilawah') THEN

      CREATE USER "tilawah" WITH PASSWORD 'tilawah-pw';
   END IF;
END
$body$;

GRANT "tilawah-manager" TO "tilawah";

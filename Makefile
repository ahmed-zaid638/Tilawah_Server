
export PGUSER ?= postgres
export PGPASSWORD ?= postgres
export PGHOST ?= localhost
export DB_NAME ?= tilawah

dev-db-docker:
	docker run -d --name pg --env=POSTGRES_PASSWORD=postgres --health-cmd "pg_isready -U postgres" --health-interval 10s --health-timeout 5s --health-retries 5 \
		-p 5432:5432 -v ./migrations/setup/ci_setup.sql:/docker-entrypoint-initdb.d/init.sql -d postgres:17
	@printf "Waiting for Postgres container.";
	@while [ $$(docker inspect --format='{{.State.Health.Status}}' pg) != "healthy" ]; do \
		sleep 2; \
		printf '.'; \
	done
dev-db-docker-delete:
	docker container stop pg
	docker container rm pg
db-create:
	db-migrate db:create --config migrations/db-migrate.json
db-ci:
	make db-create
	cat ./migrations/setup/ci_setup.sql| docker exec -i pg psql -U dbowner -d postgres
	cat ./migrations/setup/db_setup.sql| docker exec -i pg psql -U dbowner -d postgres
	yarn migration:apply
	cat ./migrations/setup/dev_setup.sql| docker exec -i pg psql -U dbowner -d postgres
db-drop:
	db-migrate db:drop tilawah --config migrations/db-migrate.json

db-clean: db-drop db-ci
db+:
	yarn migration:apply

db-:
	yarn migration:undo

db-clean: db-drop db-ci

export PGUSER ?= postgres
export PGPASSWORD ?= postgres
export PGHOST ?= localhost
export DB_NAME ?= tilawah
export ENV ?= development
export FILE


.PHONY: install-migrate
install-migrate:
		@npm install db-migrate
		@npm audit fix
.PHONY: db-docker
db-docker-start:
	@docker run -d --name pg --env=POSTGRES_PASSWORD=$(PGPASSWORD) --health-cmd "pg_isready -U postgres" --health-interval 10s --health-timeout 5s --health-retries 5 \
		-p 5432:5432 -v ./migrations/setup/ci_setup.sql:/docker-entrypoint-initdb.d/init.sql -d groonga/pgroonga:latest-alpine-17
	@printf "Waiting for Postgres container.";
	@while [ $$(docker inspect --format='{{.State.Health.Status}}' pg) != "healthy" ]; do \
		sleep 2; \
		printf '.'; \
	done

.PHONY: db-docker-stop
db-docker-stop:
	@docker container stop pg
	@docker container rm pg

.PHONY: db-create
db-create: install-migrate
	@db-migrate db:create --config migrations/db-migrate.json --env $(ENV) $(DB_NAME)

.PHONY: ci-start
ci-start: db-docker-start db-create db+
	cat ./migrations/setup/dev_setup.sql| docker exec -i pg psql -U dbowner -d postgres

.PHONY: db-drop
db-drop:
	db-migrate db:drop tilawah --config migrations/db-migrate.json --env $(ENV)

.PHONY: ci-clean
ci-clean: db-drop db-docker-stop ci-start

.PHONY: db+
db+:
	db-migrate up --config migrations/db-migrate.json --env $(ENV) $(DB_NAME)
.PHONY: db-
db-:
	db-migrate rest --config migrations/db-migrate.json --env $(ENV) $(DB_NAME)

.PHONY: db-create-migrate-file
db-create-migrate-file: install-migrate
ifndef FILE
	$(error FILE is required. Usage: make db-create-migrate-file FILE=<filename>)
endif
	@echo "Creating migration file: $(FILE)"
	# Replace this with your actual migration command (e.g., using a tool like golang-migrate, Alembic, etc.)
	@db-migrate create --config migrations/db-migrate.json --env $(ENV) create --sql-file $(FILE)

# Helper target to show usage
help:
	@echo "Usage:"
	@echo "  make db-create-migrate-file FILE=<filename>"


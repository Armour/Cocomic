dropdb docker
createdb docker
psql docker < backend/sql/schema.sql
psql docker < backend/sql/data.sql


BEGIN;

DROP TABLE IF EXISTS "roles", "users", "logs_rgpd_suppressions", "formations", "categories", "reviews" CASCADE;

-------------------------- Table des rôles --------------------------------------
CREATE TABLE IF NOT EXISTS "roles" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) UNIQUE NOT NULL
);

---------------------- Table des utilisateurs ------------------------------
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL DEFAULT 1,
    "last_login" TIMESTAMP,
    "registration_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET DEFAULT,
    "reset_token" TEXT,
    "send_delete_alert" BOOLEAN DEFAULT FALSE
);

----------------------- Tables de log RGPD de suppression des comptes ---------
CREATE TABLE IF NOT EXISTS "logs_rgpd_suppressions" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER,
    "name" VARCHAR(150),
    "email"VARCHAR(150),
    "reason" TEXT,
    "deletion_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

----------------------- Table des catégories ----------------------------------
CREATE TABLE IF NOT EXISTS "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(150) NOT NULL
);

----------------------- Table des formations -----------------------------------
CREATE TABLE IF NOT EXISTS "formations" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(250) NOT NULL,
    "description" TEXT NOT NULL,
    "level" VARCHAR(100),
    "price" NUMERIC(10, 2),
    "categorie_id" INTEGER REFERENCES "categories"("id") ON DELETE SET NULL,
    "date_added" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

----------------------- Table des reservations ----------------------
CREATE TABLE IF NOT EXISTS "reservations" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
    "formation_id" INTEGER REFERENCES "formations"("id") ON DELETE CASCADE,
    "reservation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

------------------------- Table des avis -------------------------------------
CREATE TABLE IF NOT EXISTS "reviews" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
    "formation_id" INTEGER REFERENCES "formations"("id") ON DELETE CASCADE,
    "comment" TEXT NOT NULL,
    "note" INTEGER CHECK ("note" BETWEEN 1 AND 5),
    "date_review" TIMESTAMP DEFAULT NOW()
);

COMMIT;


BEGIN;

----- Insertion des rôles ---------
INSERT INTO "roles" ("name") VALUES 
  ('utilisateur'),
  ('admin')
ON CONFLICT ("name") DO NOTHING;

----- Insertion des utilisateurs -------
INSERT INTO "users" ("name", "email", "password", "role_id") VALUES
  ('Ibrahim', 'formateurskillup@skillup.fr', 'hashed_password_formateur', 1),
  ('Mahamat Ismail', 'mahamat-ismail.ibrahim@gmail.com', 'hashed_password_userr', 1);

----- Insertion logs RGPD suppression ---------
INSERT INTO "logs_rgpd_suppressions" ("user_id", "name", "email", "reason") VALUES
  (3, 'Mahamat Ismail', 'mahamat-ismail.ibrahim@gmail.com', 'Suppression automatique du compte inactif plus d''un an, conformément au RGPD');

----- Insertion des catégories -------
INSERT INTO "categories" ("name") VALUES 
  ('Développement Web'), ('Design Graphique'), ('Bureautique');

----- Insertion des formations -----------
INSERT INTO "formations" ("title", "description", "level", "price", "categorie_id") VALUES
  ('React pour les débutants', 'Introduction à React', 'Débutant', 199.99, 1),
  ('Photoshop Avancé', 'Maîtriser Photoshop comme un pro', 'Avancé', 149.50, 2),
  ('Excel pour les débutants', 'Apprendre Excel de A à Z', 'Débutant', 99.99, 3);

------ Insertion des réservations ------------
INSERT INTO "reservations" ("user_id", "formation_id") VALUES
  (1, 1),
  (1, 2),
  (1, 3);

------ Insertion des avis --------------------
INSERT INTO "reviews" ("user_id", "formation_id", "comment", "note") VALUES
  (1, 1, 'Formation très claire et bien structurée.', 5),
  (1, 2, 'Contenu intéressant mais manque des exemples.', 3),
  (1, 3, 'Excellent pour les débutants !', 4);

COMMIT;
# SkillUp-backend
**Dictionnaire de données**

### Table `roles`

| Champ | Type        | Description                   |
| ----- | ----------- | ----------------------------- |
| id    | SERIAL (PK) | Identifiant unique du rôle    |
| name   | VARCHAR(50) | Nom du rôle (ex: admin, user) |

### Table `users`

| Champ                       | Type         | Description                                    |
| --------------------------- | ------------ | ---------------------------------------------- |
| id                          | SERIAL (PK)  | Identifiant unique de l'utilisateur            |
| name                         | VARCHAR(150) | Nom complet                                    |
| email                       | VARCHAR(150) | Adresse e-mail (unique)                        |
| password             | TEXT         | Mot de passe haché                             |
| role\_id                    | INTEGER (FK) | Clé étrangère vers `roles`                     |
| last\_login                 | TIMESTAMP    | Date de dernière connexion                     |
| registration\_date           | TIMESTAMP    | Date d'inscription                             |
| reset\_token                | TEXT         | Jeton pour la réinitialisation du mot de passe |
| send\_delete\_alert | BOOLEAN      | Si une alerte de suppression a été envoyée     |

### Table `logs_rgpd_suppressions`

| Champ             | Type         | Description                            |
| ----------------- | ------------ | -------------------------------------- |
| id                | SERIAL (PK)  | Identifiant du log                     |
| user\_id   | INTEGER (FK) | Clé vers l'utilisateur supprimé        |
| name               | VARCHAR(150) | Copie du nom de l'utilisateur supprimé |
| email             | VARCHAR(150) | Copie de l'email                       |
| reason            | TEXT         | Motif fourni pour la suppression       |
| deletion\_date | TIMESTAMP    | Date de suppression                    |

### Table `categories`

| Champ | Type         | Description                 |
| ----- | ------------ | --------------------------- |
| id    | SERIAL (PK)  | Identifiant de la catégorie |
| name   | VARCHAR(150) | Nom de la catégorie         |

### Table `formations`

| Champ              | Type           | Description                                |
| ------------------ | -------------- | ------------------------------------------ |
| id                 | SERIAL (PK)    | Identifiant unique de la formation         |
| title              | VARCHAR(250)   | Titre de la formation                      |
| description        | TEXT           | Détail de la formation                     |
| level             | VARCHAR(100)   | Niveau requis (débutant, intermédiaire...) |
| price               | NUMERIC(10, 2) | Prix en euros                              |
| categorie\_id      | INTEGER (FK)   | Clé vers la catégorie                      |
| date\_added        | TIMESTAMP      | Date de création                           |
| date\_updated | TIMESTAMP      | Date de mise à jour                        |

### Table `reservations`

| Champ             | Type         | Description                   |
| ----------------- | ------------ | ----------------------------- |
| id                | SERIAL (PK)  | Identifiant de la réservation |
| user\_id   | INTEGER (FK) | Clé vers l'utilisateur        |
| formation\_id     | INTEGER (FK) | Clé vers la formation         |
| reservation\_date | TIMESTAMP    | Date de réservation           |

### Table `reviews`

| Champ           | Type         | Description                          |
| --------------- | ------------ | ------------------------------------ |
| id              | SERIAL (PK)  | Identifiant de l'avis                |
| user\_id | INTEGER (FK) | Clé vers l'utilisateur               |
| formation\_id   | INTEGER (FK) | Clé vers la formation                |
| comment     | TEXT         | Texte libre laissé par l'utilisateur |
| note            | INTEGER      | Note entre 1 et 5                    |
| date\_review      | TIMESTAMP    | Date de l'avis                       |
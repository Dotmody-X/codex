/* ============================================================
   CODEX — Extension SQL : cours progressif & référence
   Greffé sur la fiche « sql » via CODEX.extend.
   ============================================================ */
CODEX.extend('sql', {
  course: [
    {
      title: 'Chapitre 1 — Le modèle relationnel & SELECT',
      lessons: [
        {
          title: "Tables, lignes et colonnes",
          body: "Une base relationnelle organise les données en tables, qui ressemblent à des feuilles de calcul. Chaque table possède des colonnes (les attributs, avec un type) et des lignes (les enregistrements, aussi appelés tuples). Le modèle relationnel repose sur des relations explicites entre ces tables plutôt que sur des fichiers isolés. Une bonne conception donne à chaque table un rôle clair et un identifiant unique par ligne. Comprendre cette structure est le préalable à toute requête.",
          code: "CREATE TABLE clients (\n  id INTEGER PRIMARY KEY,\n  nom TEXT NOT NULL,\n  ville TEXT\n);",
          lang: 'sql'
        },
        {
          title: "Lire des données avec SELECT",
          body: "L'ordre SELECT est la commande la plus utilisée : il sert à interroger les données sans les modifier. On indique les colonnes voulues, puis la table source après FROM. L'étoile * récupère toutes les colonnes, pratique pour explorer mais à éviter en production. On peut renommer une colonne du résultat avec AS pour le rendre plus lisible. Le résultat d'un SELECT est toujours une nouvelle table virtuelle.",
          code: "SELECT id, nom AS client FROM clients;\nSELECT * FROM clients;",
          lang: 'sql'
        },
        {
          title: "DISTINCT et colonnes calculées",
          body: "Le mot-clé DISTINCT élimine les doublons dans le résultat, utile pour lister les valeurs uniques d'une colonne. On peut aussi créer des colonnes calculées en combinant des colonnes existantes avec des opérateurs ou des fonctions. Ces expressions sont évaluées ligne par ligne lors de la lecture. Donner un alias clair à une expression rend le résultat exploitable. Cela montre que SELECT ne se limite pas à recopier des colonnes brutes.",
          code: "SELECT DISTINCT ville FROM clients;\nSELECT nom, prix * quantite AS total FROM commandes;",
          lang: 'sql'
        }
      ]
    },
    {
      title: 'Chapitre 2 — Filtrage & tri',
      lessons: [
        {
          title: "Filtrer avec WHERE",
          body: "La clause WHERE restreint les lignes renvoyées selon une condition logique. On compare des colonnes à des valeurs avec des opérateurs comme =, <>, <, >, <= ou >=. Les conditions peuvent se combiner avec AND, OR et NOT pour exprimer des règles précises. Les parenthèses contrôlent la priorité des combinaisons. Seules les lignes pour lesquelles la condition est vraie apparaissent dans le résultat.",
          code: "SELECT nom FROM clients\nWHERE ville = 'Paris' AND id > 10;",
          lang: 'sql'
        },
        {
          title: "Opérateurs spéciaux : IN, BETWEEN, LIKE, NULL",
          body: "SQL offre des opérateurs dédiés pour des filtres courants. IN teste l'appartenance à une liste de valeurs, BETWEEN vérifie un intervalle bornes incluses. LIKE recherche un motif textuel, où % remplace une suite de caractères et _ un seul caractère. La valeur NULL signifie « inconnu » et se teste avec IS NULL ou IS NULL, jamais avec =. Ces opérateurs rendent les conditions plus expressives et lisibles.",
          code: "SELECT * FROM clients\nWHERE ville IN ('Paris', 'Lyon')\n  AND nom LIKE 'A%'\n  AND ville IS NOT NULL;",
          lang: 'sql'
        },
        {
          title: "Trier et limiter avec ORDER BY et LIMIT",
          body: "ORDER BY trie le résultat selon une ou plusieurs colonnes, en ordre ascendant (ASC, par défaut) ou descendant (DESC). On peut trier par plusieurs critères successifs séparés par des virgules. LIMIT restreint le nombre de lignes renvoyées, idéal pour un top N ou de la pagination. OFFSET permet de sauter un certain nombre de lignes avant de lire. Ces clauses s'appliquent après le filtrage WHERE.",
          code: "SELECT nom, ville FROM clients\nORDER BY ville ASC, nom DESC\nLIMIT 10 OFFSET 20;",
          lang: 'sql'
        }
      ]
    },
    {
      title: 'Chapitre 3 — Les jointures',
      lessons: [
        {
          title: "Clés étrangères et relations",
          body: "Les données réelles se répartissent sur plusieurs tables pour éviter la redondance. Une clé étrangère est une colonne qui référence la clé primaire d'une autre table, créant le lien entre elles. Par exemple, une commande référence le client qui l'a passée par son id. Les jointures servent à recombiner ces tables au moment de la lecture. Bien penser ses relations est la base d'un schéma sain et normalisé.",
          code: "SELECT * FROM commandes\nWHERE client_id = 7;",
          lang: 'sql'
        },
        {
          title: "INNER JOIN : l'intersection",
          body: "INNER JOIN combine deux tables en ne gardant que les lignes qui ont une correspondance des deux côtés. La condition de jointure, après ON, indique quelles colonnes doivent coïncider. C'est la jointure la plus fréquente, qui matérialise une relation un-à-plusieurs. Si une ligne n'a aucune correspondance, elle est exclue du résultat. On peut chaîner plusieurs INNER JOIN pour relier trois tables ou plus.",
          code: "SELECT c.nom, o.montant\nFROM clients c\nINNER JOIN commandes o ON o.client_id = c.id;",
          lang: 'sql'
        },
        {
          title: "LEFT JOIN et jointures externes",
          body: "LEFT JOIN conserve toutes les lignes de la table de gauche, même sans correspondance à droite : les colonnes manquantes valent alors NULL. C'est essentiel pour trouver les lignes sans relation, par exemple les clients sans commande. RIGHT JOIN fait l'inverse, et FULL OUTER JOIN garde les deux côtés. Combiné à WHERE ... IS NULL, le LEFT JOIN révèle les orphelins. Le choix de la jointure change donc profondément le résultat.",
          code: "SELECT c.nom, o.montant\nFROM clients c\nLEFT JOIN commandes o ON o.client_id = c.id\nWHERE o.id IS NULL;",
          lang: 'sql'
        }
      ]
    },
    {
      title: 'Chapitre 4 — Agrégation & GROUP BY',
      lessons: [
        {
          title: "Fonctions d'agrégat",
          body: "Les fonctions d'agrégat condensent plusieurs lignes en une seule valeur. COUNT compte les lignes, SUM additionne, AVG calcule la moyenne, MIN et MAX donnent les extrêmes. Sans regroupement, elles s'appliquent à l'ensemble du résultat filtré. La plupart ignorent les valeurs NULL, sauf COUNT(*) qui compte toutes les lignes. Ces fonctions transforment des données détaillées en synthèses chiffrées.",
          code: "SELECT COUNT(*) AS nb, AVG(montant) AS moyenne\nFROM commandes;",
          lang: 'sql'
        },
        {
          title: "Regrouper avec GROUP BY",
          body: "GROUP BY rassemble les lignes partageant la même valeur dans une ou plusieurs colonnes, formant des groupes. Les fonctions d'agrégat s'appliquent alors à chaque groupe séparément. Toute colonne du SELECT non agrégée doit figurer dans le GROUP BY. On obtient ainsi un résumé par catégorie, par ville ou par client. C'est l'outil central des rapports et des statistiques.",
          code: "SELECT ville, COUNT(*) AS nb_clients\nFROM clients\nGROUP BY ville;",
          lang: 'sql'
        },
        {
          title: "Filtrer les groupes avec HAVING",
          body: "HAVING filtre les groupes après leur formation, là où WHERE filtre les lignes avant le regroupement. On l'utilise pour ne garder que les groupes vérifiant une condition sur un agrégat. Par exemple, ne montrer que les villes comptant plus de cinq clients. L'ordre logique d'exécution est FROM, WHERE, GROUP BY, HAVING, puis SELECT et ORDER BY. Confondre WHERE et HAVING est une erreur classique du débutant.",
          code: "SELECT ville, COUNT(*) AS nb\nFROM clients\nGROUP BY ville\nHAVING COUNT(*) > 5;",
          lang: 'sql'
        }
      ]
    },
    {
      title: 'Chapitre 5 — Sous-requêtes & CTE',
      lessons: [
        {
          title: "Sous-requêtes dans WHERE",
          body: "Une sous-requête est une requête imbriquée dans une autre, entre parenthèses. Placée dans un WHERE, elle fournit une ou plusieurs valeurs de comparaison calculées dynamiquement. On l'emploie avec IN, =, ou des opérateurs pour filtrer selon un autre ensemble. Par exemple, sélectionner les clients ayant au moins une commande. Une sous-requête corrélée fait référence à la requête externe et s'évalue ligne par ligne.",
          code: "SELECT nom FROM clients\nWHERE id IN (SELECT client_id FROM commandes);",
          lang: 'sql'
        },
        {
          title: "Sous-requêtes scalaires et EXISTS",
          body: "Une sous-requête scalaire ne renvoie qu'une seule valeur et peut s'utiliser comme une colonne ou dans une comparaison. EXISTS teste l'existence d'au moins une ligne et renvoie vrai ou faux, souvent plus efficace que IN. NOT EXISTS détecte l'absence de correspondance, utile pour les anti-jointures. Ces formes évitent parfois des jointures lourdes. Le choix dépend de la lisibilité et du plan d'exécution.",
          code: "SELECT nom FROM clients c\nWHERE EXISTS (\n  SELECT 1 FROM commandes o WHERE o.client_id = c.id\n);",
          lang: 'sql'
        },
        {
          title: "Expressions de table communes (CTE)",
          body: "Une CTE, introduite par WITH, nomme une requête intermédiaire que l'on réutilise ensuite comme une table. Elle clarifie les requêtes complexes en les découpant en étapes lisibles, de haut en bas. Contrairement à une vue, elle n'existe que le temps de la requête. On peut chaîner plusieurs CTE séparées par des virgules. Les CTE récursives permettent même de parcourir des hiérarchies comme un organigramme.",
          code: "WITH gros_clients AS (\n  SELECT client_id, SUM(montant) AS total\n  FROM commandes GROUP BY client_id\n)\nSELECT * FROM gros_clients WHERE total > 1000;",
          lang: 'sql'
        }
      ]
    },
    {
      title: 'Chapitre 6 — Écriture & schéma',
      lessons: [
        {
          title: "Insérer, mettre à jour, supprimer",
          body: "INSERT ajoute de nouvelles lignes, en précisant les colonnes puis les valeurs correspondantes. UPDATE modifie des lignes existantes via SET, presque toujours accompagné d'un WHERE pour cibler. DELETE retire des lignes, lui aussi à border d'un WHERE sous peine de tout effacer. Oublier la clause WHERE dans un UPDATE ou un DELETE est une erreur dévastatrice. Ces trois ordres constituent le cœur du langage de manipulation des données.",
          code: "INSERT INTO clients (id, nom, ville) VALUES (1, 'Ada', 'Paris');\nUPDATE clients SET ville = 'Lyon' WHERE id = 1;\nDELETE FROM clients WHERE id = 1;",
          lang: 'sql'
        },
        {
          title: "Contraintes et intégrité",
          body: "Les contraintes garantissent la cohérence des données dès leur insertion. PRIMARY KEY impose un identifiant unique et non nul, FOREIGN KEY force une référence valide vers une autre table. NOT NULL interdit l'absence de valeur, UNIQUE empêche les doublons, CHECK valide une condition métier. DEFAULT fournit une valeur par défaut. Définies au niveau du schéma, elles déchargent l'application d'une partie des vérifications.",
          code: "CREATE TABLE commandes (\n  id INTEGER PRIMARY KEY,\n  client_id INTEGER NOT NULL REFERENCES clients(id),\n  montant NUMERIC CHECK (montant >= 0)\n);",
          lang: 'sql'
        },
        {
          title: "Index et performance",
          body: "Un index est une structure annexe qui accélère la recherche sur certaines colonnes, à la manière d'un index de livre. Il rend les WHERE, les jointures et les tris bien plus rapides sur de gros volumes. En contrepartie, il occupe de l'espace et ralentit légèrement les écritures. On indexe en priorité les colonnes filtrées ou jointes fréquemment. EXPLAIN permet d'inspecter le plan d'exécution pour vérifier qu'un index est utilisé.",
          code: "CREATE INDEX idx_commandes_client ON commandes (client_id);\nEXPLAIN SELECT * FROM commandes WHERE client_id = 7;",
          lang: 'sql'
        },
        {
          title: "Transactions et ACID",
          body: "Une transaction regroupe plusieurs ordres en une unité tout-ou-rien, ouverte par BEGIN. COMMIT valide définitivement l'ensemble, ROLLBACK annule tout en cas de problème. Les propriétés ACID garantissent atomicité, cohérence, isolation et durabilité. Ainsi un virement qui débite puis crédite reste correct même en cas de panne. Les transactions protègent l'intégrité face aux erreurs et aux accès concurrents.",
          code: "BEGIN;\nUPDATE comptes SET solde = solde - 100 WHERE id = 1;\nUPDATE comptes SET solde = solde + 100 WHERE id = 2;\nCOMMIT;",
          lang: 'sql'
        }
      ]
    }
  ],

  reference: [
    {
      group: 'Définition (DDL : CREATE, ALTER, DROP)',
      items: [
        { name: 'CREATE TABLE', syntax: 'CREATE TABLE t (col TYPE contrainte, ...)', desc: "Crée une nouvelle table en définissant ses colonnes, types et contraintes." },
        { name: 'CREATE TABLE AS', syntax: 'CREATE TABLE t AS SELECT ...', desc: "Crée une table à partir du résultat d'une requête SELECT." },
        { name: 'ALTER TABLE ADD', syntax: 'ALTER TABLE t ADD COLUMN col TYPE', desc: "Ajoute une nouvelle colonne à une table existante." },
        { name: 'ALTER TABLE DROP', syntax: 'ALTER TABLE t DROP COLUMN col', desc: "Supprime une colonne d'une table existante." },
        { name: 'ALTER TABLE RENAME', syntax: 'ALTER TABLE t RENAME TO t2', desc: "Renomme une table ou une de ses colonnes." },
        { name: 'DROP TABLE', syntax: 'DROP TABLE [IF EXISTS] t', desc: "Supprime définitivement une table et toutes ses données." },
        { name: 'TRUNCATE TABLE', syntax: 'TRUNCATE TABLE t', desc: "Vide rapidement toutes les lignes d'une table sans la supprimer." },
        { name: 'CREATE DATABASE', syntax: 'CREATE DATABASE nom', desc: "Crée une nouvelle base de données." },
        { name: 'CREATE SCHEMA', syntax: 'CREATE SCHEMA nom', desc: "Crée un schéma, espace de noms regroupant des objets liés." },
        { name: 'CREATE INDEX', syntax: 'CREATE INDEX idx ON t (col)', desc: "Crée un index pour accélérer les recherches sur une ou plusieurs colonnes." }
      ]
    },
    {
      group: 'Manipulation (DML : INSERT, UPDATE, DELETE)',
      items: [
        { name: 'INSERT INTO', syntax: 'INSERT INTO t (cols) VALUES (vals)', desc: "Ajoute une nouvelle ligne à une table avec les valeurs fournies." },
        { name: 'INSERT multiple', syntax: 'INSERT INTO t VALUES (...), (...)', desc: "Insère plusieurs lignes en une seule instruction." },
        { name: 'INSERT ... SELECT', syntax: 'INSERT INTO t SELECT ... FROM t2', desc: "Insère dans une table les lignes issues d'une requête." },
        { name: 'UPDATE', syntax: 'UPDATE t SET col = val WHERE cond', desc: "Modifie les valeurs de lignes existantes correspondant à la condition." },
        { name: 'DELETE', syntax: 'DELETE FROM t WHERE cond', desc: "Supprime les lignes d'une table vérifiant la condition." },
        { name: 'UPSERT', syntax: 'INSERT ... ON CONFLICT DO UPDATE', desc: "Insère une ligne ou la met à jour si elle existe déjà (insertion conditionnelle)." },
        { name: 'MERGE', syntax: 'MERGE INTO t USING src ON cond', desc: "Combine insertion, mise à jour et suppression selon une correspondance." },
        { name: 'RETURNING', syntax: 'INSERT ... RETURNING col', desc: "Renvoie les valeurs des lignes affectées par une écriture (selon le SGBD)." }
      ]
    },
    {
      group: 'Interrogation (SELECT & clauses)',
      items: [
        { name: 'SELECT', syntax: 'SELECT col1, col2 FROM t', desc: "Sélectionne les colonnes à lire dans une ou plusieurs tables." },
        { name: 'SELECT *', syntax: 'SELECT * FROM t', desc: "Renvoie toutes les colonnes de la table." },
        { name: 'AS (alias)', syntax: 'SELECT col AS nom FROM t', desc: "Renomme une colonne ou une table dans le résultat." },
        { name: 'DISTINCT', syntax: 'SELECT DISTINCT col FROM t', desc: "Élimine les lignes en double du résultat." },
        { name: 'FROM', syntax: 'FROM t', desc: "Indique la ou les tables sources de la requête." },
        { name: 'ORDER BY', syntax: 'ORDER BY col [ASC|DESC]', desc: "Trie le résultat selon une ou plusieurs colonnes." },
        { name: 'LIMIT', syntax: 'LIMIT n', desc: "Restreint le nombre de lignes renvoyées." },
        { name: 'OFFSET', syntax: 'OFFSET n', desc: "Saute les n premières lignes, utile pour la pagination." },
        { name: 'UNION', syntax: 'SELECT ... UNION SELECT ...', desc: "Combine les résultats de deux requêtes en éliminant les doublons." },
        { name: 'UNION ALL', syntax: 'SELECT ... UNION ALL SELECT ...', desc: "Combine deux résultats en conservant les doublons." },
        { name: 'INTERSECT', syntax: 'SELECT ... INTERSECT SELECT ...', desc: "Renvoie les lignes présentes dans les deux requêtes." },
        { name: 'EXCEPT', syntax: 'SELECT ... EXCEPT SELECT ...', desc: "Renvoie les lignes de la première requête absentes de la seconde." }
      ]
    },
    {
      group: 'Filtrage (WHERE, opérateurs)',
      items: [
        { name: 'WHERE', syntax: 'WHERE condition', desc: "Filtre les lignes selon une condition logique avant tout regroupement." },
        { name: 'AND / OR / NOT', syntax: 'WHERE a AND (b OR NOT c)', desc: "Combine plusieurs conditions logiques." },
        { name: '= <> < > <= >=', syntax: 'WHERE col >= 10', desc: "Opérateurs de comparaison entre une colonne et une valeur." },
        { name: 'IN', syntax: 'WHERE col IN (v1, v2, v3)', desc: "Teste l'appartenance d'une valeur à une liste." },
        { name: 'BETWEEN', syntax: 'WHERE col BETWEEN a AND b', desc: "Teste si une valeur est dans un intervalle, bornes incluses." },
        { name: 'LIKE', syntax: "WHERE nom LIKE 'A%'", desc: "Recherche un motif textuel ; % remplace plusieurs caractères, _ un seul." },
        { name: 'ILIKE', syntax: "WHERE nom ILIKE 'a%'", desc: "Comme LIKE mais insensible à la casse (PostgreSQL)." },
        { name: 'IS NULL', syntax: 'WHERE col IS NULL', desc: "Teste l'absence de valeur (NULL) ; IS NOT NULL pour l'inverse." },
        { name: 'EXISTS', syntax: 'WHERE EXISTS (SELECT 1 ...)', desc: "Vrai si la sous-requête renvoie au moins une ligne." },
        { name: 'ANY / ALL', syntax: 'WHERE col > ALL (SELECT ...)', desc: "Compare une valeur à toutes ou à au moins une des valeurs d'une sous-requête." }
      ]
    },
    {
      group: 'Jointures',
      items: [
        { name: 'INNER JOIN', syntax: 'A INNER JOIN B ON A.id = B.a_id', desc: "Ne garde que les lignes ayant une correspondance des deux côtés." },
        { name: 'LEFT JOIN', syntax: 'A LEFT JOIN B ON A.id = B.a_id', desc: "Garde toutes les lignes de gauche, complétées par NULL si pas de correspondance." },
        { name: 'RIGHT JOIN', syntax: 'A RIGHT JOIN B ON A.id = B.a_id', desc: "Garde toutes les lignes de droite, complétées par NULL si besoin." },
        { name: 'FULL OUTER JOIN', syntax: 'A FULL OUTER JOIN B ON ...', desc: "Garde les lignes des deux tables, qu'elles correspondent ou non." },
        { name: 'CROSS JOIN', syntax: 'A CROSS JOIN B', desc: "Produit cartésien : chaque ligne de A combinée à chaque ligne de B." },
        { name: 'SELF JOIN', syntax: 'A x JOIN A y ON x.parent = y.id', desc: "Jointure d'une table sur elle-même via des alias." },
        { name: 'USING', syntax: 'A JOIN B USING (id)', desc: "Joint sur une colonne de même nom dans les deux tables." },
        { name: 'NATURAL JOIN', syntax: 'A NATURAL JOIN B', desc: "Joint automatiquement sur toutes les colonnes de même nom." }
      ]
    },
    {
      group: 'Agrégats & GROUP BY / HAVING',
      items: [
        { name: 'COUNT', syntax: 'COUNT(*) / COUNT(col)', desc: "Compte les lignes ; COUNT(col) ignore les NULL." },
        { name: 'SUM', syntax: 'SUM(col)', desc: "Additionne les valeurs numériques d'une colonne." },
        { name: 'AVG', syntax: 'AVG(col)', desc: "Calcule la moyenne arithmétique des valeurs." },
        { name: 'MIN / MAX', syntax: 'MIN(col) / MAX(col)', desc: "Renvoie la plus petite ou la plus grande valeur." },
        { name: 'GROUP BY', syntax: 'GROUP BY col', desc: "Regroupe les lignes par valeurs communes pour appliquer des agrégats." },
        { name: 'HAVING', syntax: 'HAVING COUNT(*) > 5', desc: "Filtre les groupes après agrégation, contrairement à WHERE." },
        { name: 'STRING_AGG', syntax: "STRING_AGG(col, ', ')", desc: "Concatène les valeurs d'un groupe en une chaîne unique." },
        { name: 'GROUP BY ROLLUP', syntax: 'GROUP BY ROLLUP (a, b)', desc: "Ajoute des sous-totaux et un total général aux groupes." },
        { name: 'OVER (fenêtre)', syntax: 'SUM(col) OVER (PARTITION BY x)', desc: "Calcule un agrégat fenêtré sans réduire le nombre de lignes." },
        { name: 'ROW_NUMBER', syntax: 'ROW_NUMBER() OVER (ORDER BY col)', desc: "Numérote les lignes selon un tri, fonction de fenêtrage." }
      ]
    },
    {
      group: 'Fonctions (chaîne, numériques, date)',
      items: [
        { name: 'UPPER / LOWER', syntax: 'UPPER(col)', desc: "Met une chaîne en majuscules ou en minuscules." },
        { name: 'LENGTH', syntax: 'LENGTH(col)', desc: "Renvoie le nombre de caractères d'une chaîne." },
        { name: 'TRIM', syntax: 'TRIM(col)', desc: "Supprime les espaces en début et fin de chaîne." },
        { name: 'SUBSTRING', syntax: 'SUBSTRING(col FROM 1 FOR 3)', desc: "Extrait une portion de chaîne." },
        { name: 'CONCAT', syntax: "CONCAT(a, ' ', b)", desc: "Concatène plusieurs chaînes en une seule." },
        { name: 'REPLACE', syntax: "REPLACE(col, 'a', 'b')", desc: "Remplace toutes les occurrences d'un texte par un autre." },
        { name: 'ROUND', syntax: 'ROUND(col, 2)', desc: "Arrondit un nombre à un nombre de décimales donné." },
        { name: 'ABS / CEIL / FLOOR', syntax: 'ABS(col) / CEIL(col)', desc: "Valeur absolue, arrondi supérieur ou inférieur." },
        { name: 'NOW / CURRENT_DATE', syntax: 'NOW() / CURRENT_DATE', desc: "Renvoie la date et l'heure courantes, ou la date du jour." },
        { name: 'EXTRACT', syntax: 'EXTRACT(YEAR FROM date_col)', desc: "Extrait un champ (année, mois, jour) d'une date." },
        { name: 'DATE_TRUNC', syntax: "DATE_TRUNC('month', date_col)", desc: "Tronque une date à une granularité (mois, jour, heure)." },
        { name: 'COALESCE', syntax: 'COALESCE(col, valeur)', desc: "Renvoie la première valeur non NULL parmi ses arguments." }
      ]
    },
    {
      group: 'Contraintes (PRIMARY KEY, FOREIGN KEY...)',
      items: [
        { name: 'PRIMARY KEY', syntax: 'col TYPE PRIMARY KEY', desc: "Identifiant unique et non nul d'une ligne dans la table." },
        { name: 'FOREIGN KEY', syntax: 'FOREIGN KEY (col) REFERENCES t(id)', desc: "Force une colonne à référencer une clé valide d'une autre table." },
        { name: 'NOT NULL', syntax: 'col TYPE NOT NULL', desc: "Interdit l'absence de valeur dans la colonne." },
        { name: 'UNIQUE', syntax: 'col TYPE UNIQUE', desc: "Empêche les valeurs en double dans une colonne." },
        { name: 'CHECK', syntax: 'CHECK (col >= 0)', desc: "Valide chaque ligne selon une condition métier." },
        { name: 'DEFAULT', syntax: 'col TYPE DEFAULT 0', desc: "Fournit une valeur par défaut si aucune n'est précisée." },
        { name: 'AUTO_INCREMENT', syntax: 'id INTEGER AUTO_INCREMENT', desc: "Génère automatiquement des identifiants croissants (MySQL)." },
        { name: 'SERIAL', syntax: 'id SERIAL PRIMARY KEY', desc: "Type auto-incrémenté pour les clés primaires (PostgreSQL)." },
        { name: 'ON DELETE CASCADE', syntax: 'REFERENCES t(id) ON DELETE CASCADE', desc: "Supprime les lignes liées quand la ligne référencée est supprimée." }
      ]
    },
    {
      group: 'Index & performance',
      items: [
        { name: 'CREATE INDEX', syntax: 'CREATE INDEX idx ON t (col)', desc: "Crée un index pour accélérer les recherches et jointures sur une colonne." },
        { name: 'CREATE UNIQUE INDEX', syntax: 'CREATE UNIQUE INDEX idx ON t (col)', desc: "Index garantissant aussi l'unicité des valeurs." },
        { name: 'Index composite', syntax: 'CREATE INDEX idx ON t (a, b)', desc: "Index sur plusieurs colonnes, utile pour les filtres combinés." },
        { name: 'DROP INDEX', syntax: 'DROP INDEX idx', desc: "Supprime un index devenu inutile." },
        { name: 'EXPLAIN', syntax: 'EXPLAIN SELECT ...', desc: "Affiche le plan d'exécution estimé d'une requête." },
        { name: 'EXPLAIN ANALYZE', syntax: 'EXPLAIN ANALYZE SELECT ...', desc: "Exécute la requête et mesure les temps réels d'exécution." },
        { name: 'ANALYZE', syntax: 'ANALYZE t', desc: "Met à jour les statistiques pour aider le planificateur." },
        { name: 'VACUUM', syntax: 'VACUUM t', desc: "Récupère l'espace et optimise le stockage (PostgreSQL)." }
      ]
    },
    {
      group: 'Transactions (ACID)',
      items: [
        { name: 'BEGIN', syntax: 'BEGIN', desc: "Ouvre une transaction regroupant plusieurs ordres en une unité." },
        { name: 'COMMIT', syntax: 'COMMIT', desc: "Valide définitivement toutes les modifications de la transaction." },
        { name: 'ROLLBACK', syntax: 'ROLLBACK', desc: "Annule toutes les modifications depuis le début de la transaction." },
        { name: 'SAVEPOINT', syntax: 'SAVEPOINT s1', desc: "Pose un point de reprise intermédiaire dans une transaction." },
        { name: 'ROLLBACK TO', syntax: 'ROLLBACK TO s1', desc: "Annule jusqu'à un point de reprise sans abandonner toute la transaction." },
        { name: 'Atomicité', syntax: '— propriété ACID', desc: "Une transaction est tout-ou-rien : tout réussit ou tout est annulé." },
        { name: 'Isolation', syntax: 'SET TRANSACTION ISOLATION LEVEL ...', desc: "Définit la visibilité des modifications entre transactions concurrentes." },
        { name: 'Durabilité', syntax: '— propriété ACID', desc: "Une fois validées, les données survivent aux pannes." }
      ]
    },
    {
      group: 'Vues & sous-requêtes / CTE',
      items: [
        { name: 'CREATE VIEW', syntax: 'CREATE VIEW v AS SELECT ...', desc: "Crée une vue, requête nommée réutilisable comme une table virtuelle." },
        { name: 'DROP VIEW', syntax: 'DROP VIEW v', desc: "Supprime une vue existante." },
        { name: 'MATERIALIZED VIEW', syntax: 'CREATE MATERIALIZED VIEW v AS ...', desc: "Vue dont le résultat est stocké physiquement et rafraîchi." },
        { name: 'Sous-requête', syntax: 'WHERE id IN (SELECT ...)', desc: "Requête imbriquée fournissant des valeurs à la requête externe." },
        { name: 'Sous-requête scalaire', syntax: 'SELECT (SELECT MAX(x) FROM t2)', desc: "Sous-requête renvoyant une seule valeur, utilisée comme une colonne." },
        { name: 'Sous-requête corrélée', syntax: 'WHERE o.client_id = c.id', desc: "Sous-requête référençant la requête externe, évaluée ligne par ligne." },
        { name: 'WITH (CTE)', syntax: 'WITH cte AS (SELECT ...) SELECT ...', desc: "Définit une table temporaire nommée pour structurer une requête." },
        { name: 'CTE récursive', syntax: 'WITH RECURSIVE cte AS (...)', desc: "Parcourt des données hiérarchiques en se référençant elle-même." },
        { name: 'Sous-requête dans FROM', syntax: 'FROM (SELECT ...) AS sous', desc: "Utilise le résultat d'une requête comme source de données." }
      ]
    }
  ]
});

/* ============================================================
   CODEX — Extension Java : cours complet + référence exhaustive
   Greffé sur la fiche « java » déjà enregistrée via CODEX.register.
   ============================================================ */
CODEX.extend('java', {
  course: [
    {
      title: "Chapitre 1 — La JVM, les bases et les types",
      lessons: [
        {
          title: "Qu'est-ce que Java et la JVM",
          body: "Java est un langage compilé vers du bytecode, un format intermédiaire exécuté par la Machine Virtuelle Java (JVM). Cette indirection résume la devise historique : « écrire une fois, exécuter partout ». Le compilateur javac transforme un fichier .java en .class, puis la commande java lance la JVM qui interprète et optimise ce bytecode. Toute application part d'une méthode main, point d'entrée unique reconnu par la JVM. Le typage est statique : chaque variable possède un type connu dès la compilation.",
          code: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Bonjour Codex\");\n  }\n}",
          lang: "java"
        },
        {
          title: "Variables, types primitifs et littéraux",
          body: "Java distingue huit types primitifs stockés directement en mémoire : byte, short, int, long, float, double, char et boolean. On déclare une variable en plaçant son type avant son nom, puis on l'initialise avec un littéral. Les entiers utilisent int par défaut, les décimaux double. Le mot-clé final fige une variable en constante non réassignable. Depuis Java 10, var permet l'inférence de type local tout en conservant un typage statique réel.",
          code: "int age = 30;\nlong distance = 9_460_000_000L;\ndouble prix = 19.99;\nchar lettre = 'A';\nboolean actif = true;\nfinal int MAX = 100;\nvar message = \"inféré en String\";",
          lang: "java"
        },
        {
          title: "Opérateurs et conversions",
          body: "Java fournit les opérateurs arithmétiques, de comparaison et logiques classiques. La division entre deux entiers tronque le résultat, alors que mélanger un double force un calcul flottant. Le transtypage explicite, ou cast, convertit un type vers un autre au prix d'une possible perte de précision. Les opérateurs += et ++ raccourcissent les affectations courantes. L'opérateur ternaire condition ? a : b remplace un petit if-else.",
          code: "int a = 7, b = 2;\nint quotient = a / b;        // 3\ndouble exact = (double) a / b; // 3.5\nint max = a > b ? a : b;      // ternaire\nint compteur = 0;\ncompteur += 5;\ncompteur++;",
          lang: "java"
        }
      ]
    },
    {
      title: "Chapitre 2 — Programmation orientée objet",
      lessons: [
        {
          title: "Classes, champs et constructeurs",
          body: "Une classe est un plan décrivant l'état (champs) et le comportement (méthodes) des objets. Le constructeur, méthode portant le nom de la classe, initialise un nouvel objet créé via new. Le mot-clé this désigne l'instance courante et lève l'ambiguïté entre champ et paramètre. L'encapsulation consiste à rendre les champs privés et à exposer des accesseurs publics. Cela protège l'état interne et autorise une validation centralisée.",
          code: "public class Compte {\n  private double solde;\n  public Compte(double initial) {\n    this.solde = initial;\n  }\n  public void deposer(double m) { solde += m; }\n  public double getSolde() { return solde; }\n}",
          lang: "java"
        },
        {
          title: "Héritage et polymorphisme",
          body: "Le mot-clé extends crée une sous-classe qui hérite des champs et méthodes de sa classe parente. Une sous-classe peut redéfinir une méthode héritée grâce à l'annotation @Override, ce qui réalise le polymorphisme. L'appel super(...) invoque le constructeur parent, et super.methode() la version parente. Une référence de type parent peut pointer vers n'importe quelle instance enfant, permettant un traitement uniforme. Le mot-clé final sur une classe ou méthode interdit respectivement l'héritage ou la redéfinition.",
          code: "public class Animal {\n  public String crier() { return \"...\"; }\n}\npublic class Chien extends Animal {\n  @Override\n  public String crier() { return \"Wouf\"; }\n}\nAnimal a = new Chien();\nString son = a.crier(); // Wouf",
          lang: "java"
        },
        {
          title: "Interfaces et classes abstraites",
          body: "Une interface définit un contrat de méthodes qu'une classe s'engage à fournir via implements. Une classe peut implémenter plusieurs interfaces, contournant l'absence d'héritage multiple. Depuis Java 8, une interface peut offrir des méthodes default avec un corps. Une classe abstraite, marquée abstract, mélange méthodes concrètes et abstraites mais ne peut être instanciée. On choisit l'interface pour un contrat pur, la classe abstraite pour partager du code commun.",
          code: "public interface Forme {\n  double aire();\n  default String nom() { return \"forme\"; }\n}\npublic class Cercle implements Forme {\n  private double r;\n  public Cercle(double r) { this.r = r; }\n  public double aire() { return Math.PI * r * r; }\n}",
          lang: "java"
        }
      ]
    },
    {
      title: "Chapitre 3 — Collections et génériques",
      lessons: [
        {
          title: "Listes, ensembles et files",
          body: "Le framework Collections fournit des structures de données réutilisables dans java.util. Une List est une séquence ordonnée admettant les doublons, dont ArrayList est l'implémentation la plus courante. Un Set rejette les doublons, HashSet offrant un accès rapide non ordonné. Une Queue modélise une file d'attente, souvent via LinkedList ou ArrayDeque. On programme contre l'interface (List, Set) plutôt que l'implémentation pour rester flexible.",
          code: "List<String> noms = new ArrayList<>();\nnoms.add(\"Ada\");\nnoms.add(\"Alan\");\nSet<Integer> uniques = new HashSet<>();\nuniques.add(1);\nuniques.add(1); // ignoré\nQueue<String> file = new ArrayDeque<>();\nfile.offer(\"premier\");",
          lang: "java"
        },
        {
          title: "Maps et itération",
          body: "Une Map associe des clés uniques à des valeurs, HashMap étant l'implémentation de référence. On insère avec put, on lit avec get, et getOrDefault évite les valeurs nulles. La boucle for-each parcourt toute collection itérable sans gérer d'index. Pour une Map, on itère sur entrySet() afin d'accéder simultanément à la clé et à la valeur. Les méthodes comme computeIfAbsent simplifient les agrégations courantes.",
          code: "Map<String, Integer> ages = new HashMap<>();\nages.put(\"Ada\", 36);\nint a = ages.getOrDefault(\"Bob\", 0);\nfor (Map.Entry<String, Integer> e : ages.entrySet()) {\n  System.out.println(e.getKey() + \" : \" + e.getValue());\n}",
          lang: "java"
        },
        {
          title: "Les génériques",
          body: "Les génériques paramètrent une classe ou une méthode par un type, garantissant la sécurité de typage à la compilation. La notation <T> est une variable de type remplacée à l'usage par un type concret comme String. Ils évitent les transtypages manuels et les erreurs détectées seulement à l'exécution. Les bornes comme <T extends Number> restreignent les types acceptés. Le caractère joker ? exprime un type inconnu mais compatible.",
          code: "public class Boite<T> {\n  private T contenu;\n  public void ranger(T x) { contenu = x; }\n  public T sortir() { return contenu; }\n}\nBoite<String> b = new Boite<>();\nb.ranger(\"trésor\");\nString s = b.sortir(); // pas de cast",
          lang: "java"
        }
      ]
    },
    {
      title: "Chapitre 4 — Gestion des exceptions",
      lessons: [
        {
          title: "try, catch et finally",
          body: "Une exception est un objet signalant un événement anormal interrompant le flux normal. On entoure le code risqué d'un bloc try, et on traite l'erreur dans un ou plusieurs catch spécifiques. Le bloc finally s'exécute toujours, qu'une exception survienne ou non, idéal pour libérer des ressources. On peut capturer plusieurs types dans un même catch avec l'opérateur |. L'ordre des catch va du plus spécifique au plus général.",
          code: "try {\n  int x = Integer.parseInt(\"abc\");\n} catch (NumberFormatException e) {\n  System.out.println(\"Format invalide : \" + e.getMessage());\n} finally {\n  System.out.println(\"Toujours exécuté\");\n}",
          lang: "java"
        },
        {
          title: "Checked, unchecked et throw",
          body: "Java distingue les exceptions vérifiées (checked), descendant d'Exception, des non vérifiées (unchecked), descendant de RuntimeException. Une méthode susceptible de lever une exception vérifiée doit la déclarer avec throws ou la capturer. Le mot-clé throw lance manuellement une exception, souvent pour signaler une donnée invalide. On crée ses propres exceptions en étendant Exception ou RuntimeException. Le try-with-resources ferme automatiquement tout objet AutoCloseable.",
          code: "public void lire(String chemin) throws IOException {\n  if (chemin == null) {\n    throw new IllegalArgumentException(\"chemin nul\");\n  }\n  try (var r = new java.io.FileReader(chemin)) {\n    r.read();\n  }\n}",
          lang: "java"
        }
      ]
    },
    {
      title: "Chapitre 5 — Streams et lambdas",
      lessons: [
        {
          title: "Lambdas et interfaces fonctionnelles",
          body: "Une expression lambda est une fonction anonyme concise de la forme (params) -> corps. Elle implémente une interface fonctionnelle, c'est-à-dire une interface à méthode unique comme Runnable ou Comparator. Le package java.util.function fournit des standards : Function, Predicate, Consumer et Supplier. Les références de méthode, notées Classe::methode, raccourcissent encore une lambda triviale. Ces outils rendent le code plus déclaratif et composable.",
          code: "Comparator<String> parLongueur = (a, b) -> a.length() - b.length();\nPredicate<Integer> estPair = n -> n % 2 == 0;\nFunction<String, Integer> taille = String::length;\nint t = taille.apply(\"Codex\"); // 5",
          lang: "java"
        },
        {
          title: "L'API Stream",
          body: "Un Stream est une séquence d'éléments supportant des opérations en chaîne dans un style fonctionnel. Les opérations intermédiaires comme filter et map sont paresseuses et renvoient un nouveau stream. Une opération terminale comme collect, forEach ou count déclenche le calcul et produit un résultat. On obtient un stream via la méthode stream() d'une collection. Cette approche évite les boucles explicites et clarifie l'intention du traitement.",
          code: "List<String> mots = List.of(\"java\", \"go\", \"rust\", \"c\");\nList<String> longs = mots.stream()\n    .filter(m -> m.length() > 2)\n    .map(String::toUpperCase)\n    .collect(java.util.stream.Collectors.toList());\nlong n = mots.stream().count();",
          lang: "java"
        }
      ]
    },
    {
      title: "Chapitre 6 — Packages et bonnes pratiques",
      lessons: [
        {
          title: "Packages, imports et organisation",
          body: "Un package regroupe des classes liées sous un espace de noms unique déclaré en tête de fichier. La convention suit un nom de domaine inversé, par exemple com.codex.app, et reflète l'arborescence des dossiers. Le mot-clé import rend une classe d'un autre package accessible sans son nom complet. Le package java.lang, contenant String et System, est importé implicitement. Une bonne structuration sépare les responsabilités et facilite la maintenance.",
          code: "package com.codex.banque;\n\nimport java.util.List;\nimport java.util.ArrayList;\n\npublic class Service {\n  private List<String> clients = new ArrayList<>();\n}",
          lang: "java"
        },
        {
          title: "Conventions, immutabilité et records",
          body: "Java suit des conventions de nommage strictes : PascalCase pour les classes, camelCase pour les méthodes et variables, MAJUSCULES pour les constantes. Privilégier l'immutabilité, via final et des objets non modifiables, réduit les bugs liés à l'état partagé. Depuis Java 16, un record génère automatiquement constructeur, accesseurs, equals et toString pour un porteur de données. Documenter avec Javadoc et tester avec JUnit complètent une base professionnelle. On évite les variables globales et on limite la portée au strict nécessaire.",
          code: "public record Point(int x, int y) {\n  public double norme() {\n    return Math.sqrt(x * x + y * y);\n  }\n}\nPoint p = new Point(3, 4);\nint px = p.x();          // accesseur généré\ndouble d = p.norme();    // 5.0",
          lang: "java"
        }
      ]
    }
  ],

  reference: [
    {
      group: "Mots-clés",
      items: [
        { name: "class", syntax: "class Nom { }", desc: "Déclare une classe, plan décrivant l'état et le comportement des objets." },
        { name: "new", syntax: "Type o = new Type();", desc: "Instancie un objet en appelant le constructeur de sa classe." },
        { name: "this", syntax: "this.champ = champ;", desc: "Référence l'instance courante, utile pour lever une ambiguïté de nom." },
        { name: "super", syntax: "super(args); super.m();", desc: "Accède au constructeur ou aux membres de la classe parente." },
        { name: "return", syntax: "return valeur;", desc: "Termine une méthode et renvoie éventuellement une valeur." },
        { name: "void", syntax: "void faire() { }", desc: "Indique qu'une méthode ne retourne aucune valeur." },
        { name: "null", syntax: "String s = null;", desc: "Littéral représentant l'absence de référence vers un objet." },
        { name: "instanceof", syntax: "if (o instanceof String s)", desc: "Teste le type réel d'un objet, avec liaison de motif depuis Java 16." },
        { name: "var", syntax: "var x = 10;", desc: "Infère le type d'une variable locale tout en restant statiquement typé." }
      ]
    },
    {
      group: "Types primitifs & wrappers",
      items: [
        { name: "int / Integer", syntax: "int n = 42;", desc: "Entier 32 bits signé ; Integer est sa version objet (wrapper)." },
        { name: "long / Long", syntax: "long g = 9000000000L;", desc: "Entier 64 bits signé pour les grandes valeurs ; suffixe L requis." },
        { name: "double / Double", syntax: "double d = 3.14;", desc: "Nombre flottant 64 bits, type décimal par défaut en Java." },
        { name: "float / Float", syntax: "float f = 1.5f;", desc: "Nombre flottant 32 bits, moins précis ; suffixe f obligatoire." },
        { name: "boolean / Boolean", syntax: "boolean b = true;", desc: "Valeur logique valant true ou false." },
        { name: "char / Character", syntax: "char c = 'A';", desc: "Caractère Unicode 16 bits délimité par des apostrophes simples." },
        { name: "byte / short", syntax: "byte b = 8; short s = 300;", desc: "Entiers 8 et 16 bits, utiles pour économiser la mémoire." },
        { name: "String", syntax: "String t = \"texte\";", desc: "Objet immuable représentant une chaîne de caractères." }
      ]
    },
    {
      group: "Modificateurs",
      items: [
        { name: "public", syntax: "public int x;", desc: "Accessible depuis n'importe quel autre package ou classe." },
        { name: "private", syntax: "private int x;", desc: "Accessible uniquement à l'intérieur de la classe déclarante." },
        { name: "protected", syntax: "protected int x;", desc: "Accessible dans le package et par les sous-classes." },
        { name: "static", syntax: "static int total;", desc: "Membre attaché à la classe et non à une instance particulière." },
        { name: "final", syntax: "final int MAX = 9;", desc: "Empêche la réassignation, la redéfinition ou l'héritage selon le contexte." },
        { name: "abstract", syntax: "abstract class Forme { }", desc: "Classe ou méthode incomplète qui ne peut être instanciée directement." },
        { name: "synchronized", syntax: "synchronized void m() { }", desc: "Restreint l'accès concurrent à un bloc ou une méthode." },
        { name: "transient", syntax: "transient int cache;", desc: "Exclut un champ de la sérialisation de l'objet." }
      ]
    },
    {
      group: "Structures de contrôle",
      items: [
        { name: "if / else", syntax: "if (c) { } else { }", desc: "Exécute un bloc selon qu'une condition booléenne est vraie ou fausse." },
        { name: "switch", syntax: "switch (x) { case 1 -> ... }", desc: "Aiguille l'exécution selon la valeur d'une variable ; syntaxe fléchée moderne." },
        { name: "for", syntax: "for (int i = 0; i < n; i++)", desc: "Boucle classique avec initialisation, condition et incrément." },
        { name: "for-each", syntax: "for (T e : collection)", desc: "Parcourt chaque élément d'un tableau ou d'un itérable." },
        { name: "while", syntax: "while (c) { }", desc: "Répète un bloc tant que la condition reste vraie." },
        { name: "do-while", syntax: "do { } while (c);", desc: "Boucle exécutée au moins une fois avant de tester la condition." },
        { name: "break / continue", syntax: "break; continue;", desc: "Interrompt une boucle ou passe directement à l'itération suivante." },
        { name: "ternaire", syntax: "c ? a : b", desc: "Expression conditionnelle compacte remplaçant un if-else simple." }
      ]
    },
    {
      group: "POO",
      items: [
        { name: "extends", syntax: "class B extends A { }", desc: "Établit un héritage : B reçoit les membres de la classe A." },
        { name: "implements", syntax: "class C implements I { }", desc: "Engage une classe à fournir les méthodes d'une ou plusieurs interfaces." },
        { name: "interface", syntax: "interface I { void m(); }", desc: "Contrat de méthodes que les classes implémentantes doivent honorer." },
        { name: "@Override", syntax: "@Override public ...", desc: "Annote une méthode redéfinissant celle de la classe parente." },
        { name: "constructeur", syntax: "Nom(args) { ... }", desc: "Méthode spéciale initialisant un objet lors de sa création." },
        { name: "enum", syntax: "enum Jour { LUN, MAR }", desc: "Type énuméré listant un ensemble fini de constantes nommées." },
        { name: "record", syntax: "record P(int x, int y) { }", desc: "Porteur de données immuable générant accesseurs, equals et toString." },
        { name: "default", syntax: "default void m() { }", desc: "Fournit une implémentation par défaut dans une interface." }
      ]
    },
    {
      group: "Collections",
      items: [
        { name: "List / ArrayList", syntax: "List<T> l = new ArrayList<>()", desc: "Séquence ordonnée indexée admettant les doublons et un accès rapide par index." },
        { name: "LinkedList", syntax: "List<T> l = new LinkedList<>()", desc: "Liste chaînée efficace pour les insertions et suppressions aux extrémités." },
        { name: "Set / HashSet", syntax: "Set<T> s = new HashSet<>()", desc: "Collection sans doublon ni ordre garanti, à recherche rapide." },
        { name: "TreeSet", syntax: "Set<T> s = new TreeSet<>()", desc: "Ensemble trié maintenant ses éléments dans l'ordre naturel." },
        { name: "Map / HashMap", syntax: "Map<K,V> m = new HashMap<>()", desc: "Association clé-valeur à clés uniques et accès rapide." },
        { name: "TreeMap", syntax: "Map<K,V> m = new TreeMap<>()", desc: "Carte triée par clé selon l'ordre naturel ou un comparateur." },
        { name: "Queue / ArrayDeque", syntax: "Queue<T> q = new ArrayDeque<>()", desc: "File d'attente performante respectant l'ordre premier entré premier sorti." },
        { name: "Collections", syntax: "Collections.sort(liste)", desc: "Classe utilitaire de tri, recherche et opérations sur les collections." }
      ]
    },
    {
      group: "Génériques",
      items: [
        { name: "<T>", syntax: "class Boite<T> { }", desc: "Paramètre de type remplacé par un type concret à l'utilisation." },
        { name: "<K, V>", syntax: "Map<K, V>", desc: "Deux paramètres de type, conventionnellement clé et valeur." },
        { name: "<E>", syntax: "interface List<E>", desc: "Paramètre de type désignant par convention un élément de collection." },
        { name: "? (joker)", syntax: "List<?> l", desc: "Type inconnu mais compatible, utile en lecture générique." },
        { name: "extends (borne)", syntax: "<T extends Number>", desc: "Restreint le type à un sous-type de la borne supérieure indiquée." },
        { name: "super (borne)", syntax: "<? super Integer>", desc: "Accepte un supertype donné, pratique pour les opérations d'écriture." },
        { name: "méthode générique", syntax: "<T> T premier(List<T> l)", desc: "Méthode déclarant ses propres paramètres de type avant le retour." },
        { name: "diamant", syntax: "new ArrayList<>()", desc: "Opérateur <> qui infère les types depuis la déclaration de gauche." }
      ]
    },
    {
      group: "Exceptions",
      items: [
        { name: "try / catch", syntax: "try { } catch (E e) { }", desc: "Entoure un code risqué et traite l'exception capturée." },
        { name: "finally", syntax: "finally { }", desc: "Bloc toujours exécuté, idéal pour libérer des ressources." },
        { name: "throw", syntax: "throw new E(\"msg\");", desc: "Lance manuellement une exception pour signaler une erreur." },
        { name: "throws", syntax: "void m() throws IOException", desc: "Déclare les exceptions vérifiées qu'une méthode peut propager." },
        { name: "Exception", syntax: "class E extends Exception", desc: "Racine des exceptions vérifiées devant être déclarées ou capturées." },
        { name: "RuntimeException", syntax: "extends RuntimeException", desc: "Base des exceptions non vérifiées comme les erreurs de logique." },
        { name: "try-with-resources", syntax: "try (var r = ...) { }", desc: "Ferme automatiquement tout objet AutoCloseable en fin de bloc." },
        { name: "NullPointerException", syntax: "lève NullPointerException", desc: "Erreur courante survenant à l'accès d'une référence nulle." }
      ]
    },
    {
      group: "Packages essentiels",
      items: [
        { name: "java.lang", syntax: "import implicite", desc: "Cœur du langage : String, System, Math, Object, les wrappers et Thread." },
        { name: "java.util", syntax: "import java.util.*;", desc: "Collections, Map, List, Optional, Scanner, Random et dates." },
        { name: "java.io", syntax: "import java.io.*;", desc: "Entrées-sorties par flux : File, Reader, Writer, InputStream." },
        { name: "java.nio.file", syntax: "import java.nio.file.*;", desc: "API moderne de fichiers : Path, Files et lecture efficace." },
        { name: "java.time", syntax: "import java.time.*;", desc: "Dates et heures immuables : LocalDate, LocalDateTime, Duration." },
        { name: "java.util.stream", syntax: "import java.util.stream.*;", desc: "API Stream et Collectors pour le traitement fonctionnel des données." },
        { name: "java.util.function", syntax: "import java.util.function.*;", desc: "Interfaces fonctionnelles : Function, Predicate, Consumer, Supplier." },
        { name: "java.math", syntax: "import java.math.*;", desc: "Arithmétique de précision avec BigInteger et BigDecimal." }
      ]
    },
    {
      group: "Streams & lambdas",
      items: [
        { name: "lambda", syntax: "(a, b) -> a + b", desc: "Fonction anonyme implémentant une interface fonctionnelle." },
        { name: "référence de méthode", syntax: "String::length", desc: "Raccourci désignant une méthode existante en lieu et place d'une lambda." },
        { name: "stream()", syntax: "collection.stream()", desc: "Ouvre un flux d'éléments à partir d'une collection." },
        { name: "filter", syntax: ".filter(x -> x > 0)", desc: "Opération intermédiaire conservant les éléments satisfaisant un prédicat." },
        { name: "map", syntax: ".map(String::trim)", desc: "Transforme chaque élément en appliquant une fonction." },
        { name: "collect", syntax: ".collect(Collectors.toList())", desc: "Opération terminale rassemblant le flux dans une structure." },
        { name: "reduce", syntax: ".reduce(0, Integer::sum)", desc: "Réduit le flux à une valeur unique par combinaison successive." },
        { name: "Optional", syntax: "Optional<T> o = ...", desc: "Conteneur exprimant une valeur éventuellement absente sans null." },
        { name: "forEach", syntax: ".forEach(System.out::println)", desc: "Applique une action terminale à chaque élément du flux." }
      ]
    }
  ]
});

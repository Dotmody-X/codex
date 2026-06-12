CODEX.extend('c', {
  course: [
    {
      title: 'Chapitre 1 — Bases, types et compilation',
      lessons: [
        {
          title: 'Anatomie d un programme C',
          body: "Tout programme C commence son execution par la fonction main. Le corps du programme est constitue d instructions terminees par un point-virgule et regroupees entre accolades. La directive #include importe les declarations d une bibliotheque, ici stdio.h pour les entrees-sorties. La valeur renvoyee par main indique au systeme si le programme s est termine correctement : 0 signifie succes. Sans bibliotheque graphique, la sortie se fait dans le terminal.",
          code: '#include <stdio.h>\n\nint main(void) {\n    printf("Bonjour Codex\\n");\n    return 0;\n}',
          lang: 'c'
        },
        {
          title: 'Variables et types fondamentaux',
          body: "C est un langage type statiquement : chaque variable possede un type fixe declare avant utilisation. Les types entiers vont de char a long long, les flottants sont float et double. La taille exacte depend de l architecture mais sizeof la revele a l execution. On declare une variable en ecrivant son type suivi de son nom, eventuellement initialise. Choisir le bon type evite gaspillage memoire et debordements.",
          code: 'int age = 30;\ndouble prix = 9.99;\nchar lettre = \'A\';\nprintf("%d octets\\n", (int)sizeof(int));',
          lang: 'c'
        },
        {
          title: 'Compilation et chaine de production',
          body: "Le code source .c n est pas executable directement : il doit etre compile. Le preprocesseur traite d abord les directives commencant par #, puis le compilateur traduit en code objet, et l editeur de liens assemble le binaire final. La commande gcc programme.c -o programme effectue ces etapes d un coup. Les options -Wall et -Wextra activent les avertissements precieux pour debusquer les erreurs. Le resultat est un executable natif independant de tout interpreteur.",
          code: '// Compilation typique en ligne de commande :\n// gcc -Wall -Wextra programme.c -o programme\n// ./programme\n#include <stdio.h>\nint main(void) { return 0; }',
          lang: 'c'
        }
      ]
    },
    {
      title: 'Chapitre 2 — Structures de controle et fonctions',
      lessons: [
        {
          title: 'Conditions if, else et switch',
          body: "Les instructions conditionnelles dirigent le flot d execution selon des tests booleens. En C, toute valeur non nulle est consideree vraie et zero est faux. Le if execute un bloc si la condition est vraie, else fournit une alternative. Le switch compare une valeur entiere a plusieurs cas et exige un break pour eviter de tomber dans le cas suivant. Bien structurer les conditions clarifie la logique du programme.",
          code: 'int n = 7;\nif (n % 2 == 0) {\n    printf("pair\\n");\n} else {\n    printf("impair\\n");\n}',
          lang: 'c'
        },
        {
          title: 'Boucles for, while et do-while',
          body: "Les boucles repetent un bloc d instructions. La boucle for regroupe initialisation, condition et incrementation sur une ligne, ideale quand le nombre d iterations est connu. La boucle while teste la condition avant chaque tour. La boucle do-while garantit au moins une execution car le test vient apres. Les mots-cles break et continue permettent respectivement de sortir et de passer a l iteration suivante.",
          code: 'for (int i = 0; i < 5; i++) {\n    if (i == 3) continue;\n    printf("%d ", i);\n}\n// affiche : 0 1 2 4',
          lang: 'c'
        },
        {
          title: 'Definir et appeler des fonctions',
          body: "Une fonction encapsule une portion de code reutilisable avec un type de retour, un nom et une liste de parametres. C passe les arguments par valeur : la fonction recoit une copie qu elle ne peut modifier chez l appelant. Le mot-cle return renvoie un resultat et termine la fonction. Declarer un prototype avant main permet d appeler la fonction definie plus loin. Decouper en fonctions ameliore la lisibilite et la maintenance.",
          code: 'int carre(int x) {\n    return x * x;\n}\n\nint main(void) {\n    printf("%d\\n", carre(6)); // 36\n    return 0;\n}',
          lang: 'c'
        }
      ]
    },
    {
      title: 'Chapitre 3 — Les pointeurs',
      lessons: [
        {
          title: 'Adresses et dereferencement',
          body: "Un pointeur est une variable qui contient l adresse memoire d une autre variable. L operateur & retourne l adresse d une variable, et l operateur * dereference un pointeur pour acceder a la valeur pointee. On declare un pointeur en placant une etoile entre le type et le nom. Les pointeurs sont la notion la plus puissante et la plus delicate de C. Les maitriser ouvre la porte a la gestion fine de la memoire.",
          code: 'int x = 42;\nint *p = &x;\nprintf("%d\\n", *p); // 42\n*p = 100;\nprintf("%d\\n", x);  // 100',
          lang: 'c'
        },
        {
          title: 'Passer par adresse',
          body: "Comme C passe les arguments par valeur, une fonction ne peut modifier directement les variables de l appelant. La solution consiste a passer l adresse de la variable via un pointeur, ce qui permet a la fonction d ecrire a cet emplacement. C est le mecanisme utilise par scanf pour remplir vos variables. Passer par adresse evite aussi de copier de grandes structures, gagnant en performance.",
          code: 'void echange(int *a, int *b) {\n    int tmp = *a;\n    *a = *b;\n    *b = tmp;\n}\nint x = 1, y = 2;\nechange(&x, &y); // x vaut 2, y vaut 1',
          lang: 'c'
        },
        {
          title: 'Le pointeur nul et ses dangers',
          body: "Un pointeur peut valoir NULL pour signifier qu il ne pointe vers rien de valide. Dereferencer un pointeur nul provoque un comportement indefini, souvent un plantage immediat. Il faut toujours verifier qu un pointeur n est pas NULL avant de l utiliser, en particulier le retour de malloc. Un pointeur non initialise (pointeur sauvage) est encore plus dangereux car il pointe vers une adresse aleatoire.",
          code: 'int *p = NULL;\nif (p != NULL) {\n    printf("%d", *p);\n} else {\n    printf("pointeur vide\\n");\n}',
          lang: 'c'
        }
      ]
    },
    {
      title: 'Chapitre 4 — Memoire, tableaux et chaines',
      lessons: [
        {
          title: 'Tableaux et arithmetique de pointeurs',
          body: "Un tableau est un bloc contigu d elements de meme type stockes en memoire. Le nom du tableau s evalue comme l adresse de son premier element, ce qui relie etroitement tableaux et pointeurs. L expression t[i] est strictement equivalente a *(t + i). Le langage n effectue aucune verification de bornes : acceder hors limites est une faute silencieuse au comportement indefini. La taille d un tableau statique est fixee a la compilation.",
          code: 'int t[4] = {10, 20, 30, 40};\nfor (int i = 0; i < 4; i++) {\n    printf("%d ", *(t + i));\n}\n// affiche : 10 20 30 40',
          lang: 'c'
        },
        {
          title: 'Allocation dynamique avec malloc et free',
          body: "Le tas permet d allouer de la memoire dont la taille est determinee a l execution. La fonction malloc reserve un bloc d octets et renvoie un pointeur, ou NULL en cas d echec. calloc fait de meme en initialisant a zero, et realloc redimensionne un bloc existant. Chaque allocation doit etre liberee par free, sinon la memoire fuit. Utiliser un bloc apres l avoir libere ou le liberer deux fois est un comportement indefini.",
          code: 'int *tab = malloc(5 * sizeof(int));\nif (tab == NULL) return 1;\ntab[0] = 99;\nfree(tab);',
          lang: 'c'
        },
        {
          title: 'Les chaines de caracteres',
          body: "C ne possede pas de type chaine natif : une chaine est un tableau de char termine par le caractere nul \\0. Les fonctions de string.h manipulent ces chaines, comme strlen pour la longueur, strcpy pour copier et strcmp pour comparer. Oublier le caractere nul mene a des lectures hors limites. Il faut toujours prevoir un octet supplementaire pour le terminateur lors de l allocation.",
          code: 'char nom[6] = "Codex";\nprintf("longueur : %lu\\n", strlen(nom)); // 5\nif (strcmp(nom, "Codex") == 0) printf("egal\\n");',
          lang: 'c'
        }
      ]
    },
    {
      title: 'Chapitre 5 — Structures, unions et enumerations',
      lessons: [
        {
          title: 'Regrouper des donnees avec struct',
          body: "Une structure regroupe plusieurs champs de types potentiellement differents sous un seul nom, permettant de modeliser des entites complexes. On accede a un champ avec l operateur point sur une variable, ou avec la fleche -> a travers un pointeur. Combiner struct avec typedef cree un alias plus court et plus lisible. Les structures peuvent etre passees a des fonctions ou allouees sur le tas comme tout autre type.",
          code: 'typedef struct {\n    char nom[20];\n    int age;\n} Personne;\n\nPersonne p = {"Ada", 36};\nprintf("%s a %d ans\\n", p.nom, p.age);',
          lang: 'c'
        },
        {
          title: 'Unions et enumerations',
          body: "Une union ressemble a une struct mais tous ses champs partagent le meme espace memoire : un seul est valide a la fois, ce qui economise de la place. Une enumeration enum definit un ensemble de constantes entieres nommees, par defaut numerotees a partir de zero. Les enums rendent le code plus expressif en remplacant des nombres magiques par des noms parlants. On les utilise souvent pour representer des etats ou des categories.",
          code: 'enum Couleur { ROUGE, VERT, BLEU };\nenum Couleur c = VERT;\nprintf("%d\\n", c); // 1\n\nunion Valeur { int i; float f; };',
          lang: 'c'
        }
      ]
    },
    {
      title: 'Chapitre 6 — Preprocesseur et entrees-sorties',
      lessons: [
        {
          title: 'Macros et compilation conditionnelle',
          body: "Le preprocesseur transforme le code source avant la compilation proprement dite. La directive #define cree des constantes symboliques ou des macros remplacees textuellement. La directive #include insere le contenu d un fichier d en-tete. Les directives #ifdef, #ifndef et #endif activent la compilation conditionnelle, utilisee notamment pour les gardes d inclusion qui empechent d inclure deux fois le meme en-tete. Ces operations sont purement textuelles, sans verification de type.",
          code: '#define PI 3.14159\n#define CARRE(x) ((x) * (x))\n\nprintf("%f\\n", PI * CARRE(2)); // 12.566...',
          lang: 'c'
        },
        {
          title: 'Lire et ecrire dans le terminal',
          body: "La bibliotheque stdio.h fournit les fonctions d entree-sortie standard. printf affiche du texte formate grace a des specificateurs comme %d pour un entier ou %s pour une chaine. scanf lit une entree depuis le clavier et stocke le resultat a l adresse fournie, d ou la presence du & devant les variables. Il faut toujours verifier la valeur de retour de scanf pour detecter une saisie invalide. Le \\n provoque un retour a la ligne.",
          code: 'int n;\nprintf("Entrez un nombre : ");\nif (scanf("%d", &n) == 1) {\n    printf("Carre : %d\\n", n * n);\n}',
          lang: 'c'
        },
        {
          title: 'Manipuler des fichiers',
          body: "Les memes principes s appliquent aux fichiers via un FILE*. La fonction fopen ouvre un fichier dans un mode donne (r lecture, w ecriture, a ajout) et renvoie NULL en cas d echec. fprintf et fscanf fonctionnent comme leurs equivalents standard mais ciblent le fichier. Tout fichier ouvert doit etre ferme avec fclose pour vider les tampons et liberer les ressources. Verifier le retour de fopen est indispensable.",
          code: 'FILE *f = fopen("notes.txt", "w");\nif (f != NULL) {\n    fprintf(f, "Codex\\n");\n    fclose(f);\n}',
          lang: 'c'
        }
      ]
    }
  ],
  reference: [
    {
      group: 'Mots-cles',
      items: [
        { name: 'if / else', syntax: 'if (cond) { } else { }', desc: "Execute un bloc selon qu une condition est vraie ou fausse." },
        { name: 'for', syntax: 'for (init; cond; incr) { }', desc: "Boucle compacte regroupant initialisation, test et increment." },
        { name: 'while', syntax: 'while (cond) { }', desc: "Repete un bloc tant que la condition reste vraie, testee avant." },
        { name: 'do', syntax: 'do { } while (cond);', desc: "Boucle garantissant au moins une execution, test apres le bloc." },
        { name: 'switch', syntax: 'switch (x) { case 1: ... }', desc: "Aiguille l execution selon la valeur entiere d une expression." },
        { name: 'break', syntax: 'break;', desc: "Sort immediatement de la boucle ou du switch courant." },
        { name: 'continue', syntax: 'continue;', desc: "Passe directement a l iteration suivante de la boucle." },
        { name: 'return', syntax: 'return valeur;', desc: "Termine une fonction et renvoie eventuellement un resultat." },
        { name: 'goto', syntax: 'goto etiquette;', desc: "Saut inconditionnel vers une etiquette ; a eviter en general." },
        { name: 'sizeof', syntax: 'sizeof(type)', desc: "Renvoie la taille en octets d un type ou d une variable." }
      ]
    },
    {
      group: 'Types & qualificateurs',
      items: [
        { name: 'int', syntax: 'int n;', desc: "Entier signe, taille usuelle de 4 octets selon l architecture." },
        { name: 'char', syntax: 'char c;', desc: "Entier d un octet servant a stocker un caractere." },
        { name: 'float / double', syntax: 'double x;', desc: "Nombres a virgule flottante, double offrant plus de precision." },
        { name: 'long / short', syntax: 'long n;', desc: "Modificateurs de taille pour les types entiers." },
        { name: 'unsigned', syntax: 'unsigned int n;', desc: "Entier non signe ne representant que des valeurs positives." },
        { name: 'void', syntax: 'void f(void);', desc: "Absence de type ; retour vide ou pointeur generique void*." },
        { name: 'const', syntax: 'const int n = 5;', desc: "Rend une valeur non modifiable apres son initialisation." },
        { name: 'static', syntax: 'static int n;', desc: "Persiste entre appels ou limite la portee au fichier." },
        { name: 'volatile', syntax: 'volatile int reg;', desc: "Empeche l optimiseur de mettre en cache une variable changeante." },
        { name: 'typedef', syntax: 'typedef struct {} T;', desc: "Cree un alias de type pour simplifier les declarations." }
      ]
    },
    {
      group: 'Operateurs',
      items: [
        { name: 'Arithmetiques', syntax: '+  -  *  /  %', desc: "Addition, soustraction, multiplication, division et modulo." },
        { name: 'Comparaison', syntax: '==  !=  <  >  <=  >=', desc: "Comparent deux valeurs et renvoient 0 ou 1." },
        { name: 'Logiques', syntax: '&&  ||  !', desc: "ET, OU et NON booleens avec evaluation paresseuse." },
        { name: 'Bit a bit', syntax: '&  |  ^  ~  <<  >>', desc: "Operations sur les bits individuels d un entier." },
        { name: 'Affectation', syntax: '=  +=  -=  *=  /=', desc: "Assigne une valeur, eventuellement combinee a une operation." },
        { name: 'Increment', syntax: '++  --', desc: "Augmente ou diminue une variable de un, prefixe ou postfixe." },
        { name: 'Adresse / contenu', syntax: '&x   *p', desc: "& recupere une adresse, * dereference un pointeur." },
        { name: 'Acces membre', syntax: 's.champ   p->champ', desc: "Point pour une struct, fleche a travers un pointeur." },
        { name: 'Ternaire', syntax: 'cond ? a : b', desc: "Expression conditionnelle renvoyant a si vrai, sinon b." }
      ]
    },
    {
      group: 'Structures de controle',
      items: [
        { name: 'if simple', syntax: 'if (x > 0) { }', desc: "Execute le bloc uniquement si la condition est vraie." },
        { name: 'if / else if', syntax: 'if (a) {} else if (b) {}', desc: "Chaine plusieurs tests mutuellement exclusifs." },
        { name: 'switch / case', syntax: 'case 1: ...; break;', desc: "Branche selon une valeur entiere avec cas multiples." },
        { name: 'default', syntax: 'default: ...', desc: "Cas par defaut d un switch si aucun autre ne correspond." },
        { name: 'for', syntax: 'for (i=0; i<n; i++)', desc: "Boucle a compteur quand le nombre de tours est connu." },
        { name: 'while', syntax: 'while (lire())', desc: "Boucle conditionnelle au nombre d iterations inconnu." },
        { name: 'do / while', syntax: 'do {} while (x);', desc: "Boucle executee au moins une fois avant le test final." },
        { name: 'break / continue', syntax: 'break; continue;', desc: "Interrompt la boucle ou saute a l iteration suivante." }
      ]
    },
    {
      group: 'Pointeurs & memoire',
      items: [
        { name: 'malloc', syntax: 'void* malloc(size_t n)', desc: "Alloue n octets sur le tas, renvoie le pointeur ou NULL." },
        { name: 'calloc', syntax: 'void* calloc(size_t k, size_t s)', desc: "Alloue k elements de taille s, initialises a zero." },
        { name: 'realloc', syntax: 'void* realloc(void* p, size_t n)', desc: "Redimensionne un bloc existant en preservant son contenu." },
        { name: 'free', syntax: 'void free(void* p)', desc: "Libere un bloc alloue ; chaque allocation doit etre liberee." },
        { name: 'NULL', syntax: 'int *p = NULL;', desc: "Pointeur ne referencant rien de valide, a tester avant usage." },
        { name: 'pointeur sur pointeur', syntax: 'int **pp;', desc: "Pointeur contenant l adresse d un autre pointeur." },
        { name: 'arithmetique', syntax: 'p + 1, t[i] = *(t+i)', desc: "Deplace un pointeur d un element selon le type pointe." },
        { name: 'memcpy', syntax: 'void* memcpy(d, s, n)', desc: "Copie n octets bruts d une zone memoire vers une autre." },
        { name: 'memset', syntax: 'void* memset(p, v, n)', desc: "Remplit n octets avec la valeur v ; utile pour initialiser." }
      ]
    },
    {
      group: 'Preprocesseur',
      items: [
        { name: '#include', syntax: '#include <stdio.h>', desc: "Insere le contenu d un fichier d en-tete dans la source." },
        { name: '#define', syntax: '#define PI 3.14', desc: "Definit une constante symbolique ou une macro textuelle." },
        { name: 'macro a parametres', syntax: '#define MAX(a,b) ((a)>(b)?(a):(b))', desc: "Macro remplacee textuellement avec arguments, sans typage." },
        { name: '#undef', syntax: '#undef PI', desc: "Annule une definition de macro precedemment etablie." },
        { name: '#ifdef / #ifndef', syntax: '#ifndef H ... #endif', desc: "Compile un bloc selon qu une macro est definie ou non." },
        { name: '#if / #elif / #else', syntax: '#if VER > 2', desc: "Compilation conditionnelle selon une expression constante." },
        { name: '#endif', syntax: '#endif', desc: "Termine un bloc de compilation conditionnelle." },
        { name: '#pragma once', syntax: '#pragma once', desc: "Garantit qu un en-tete n est inclus qu une seule fois." }
      ]
    },
    {
      group: 'stdio.h',
      items: [
        { name: 'printf', syntax: 'int printf(const char* fmt, ...)', desc: "Affiche du texte formate sur la sortie standard." },
        { name: 'scanf', syntax: 'int scanf(const char* fmt, ...)', desc: "Lit une entree formatee depuis le clavier vers des adresses." },
        { name: 'fprintf', syntax: 'int fprintf(FILE* f, fmt, ...)', desc: "Ecrit du texte formate dans un fichier ou flux." },
        { name: 'fscanf', syntax: 'int fscanf(FILE* f, fmt, ...)', desc: "Lit des donnees formatees depuis un fichier." },
        { name: 'fopen', syntax: 'FILE* fopen(const char* p, const char* m)', desc: "Ouvre un fichier dans un mode donne, renvoie NULL si echec." },
        { name: 'fclose', syntax: 'int fclose(FILE* f)', desc: "Ferme un fichier et vide les tampons en attente." },
        { name: 'fgets', syntax: 'char* fgets(char* s, int n, FILE* f)', desc: "Lit une ligne sans depasser n octets, securise contre les debordements." },
        { name: 'fputs / puts', syntax: 'int puts(const char* s)', desc: "Ecrit une chaine suivie d un saut de ligne." },
        { name: 'getchar / putchar', syntax: 'int getchar(void)', desc: "Lit ou ecrit un seul caractere a la fois." },
        { name: 'sprintf', syntax: 'int sprintf(char* buf, fmt, ...)', desc: "Ecrit le resultat formate dans une chaine plutot qu a l ecran." }
      ]
    },
    {
      group: 'stdlib.h',
      items: [
        { name: 'malloc / free', syntax: 'void* malloc(size_t)', desc: "Allocation et liberation de memoire dynamique." },
        { name: 'atoi', syntax: 'int atoi(const char* s)', desc: "Convertit une chaine en entier int." },
        { name: 'atof', syntax: 'double atof(const char* s)', desc: "Convertit une chaine en nombre flottant double." },
        { name: 'strtol', syntax: 'long strtol(s, &end, base)', desc: "Convertit une chaine en long avec controle d erreur et base." },
        { name: 'rand / srand', syntax: 'int rand(void)', desc: "Genere un nombre pseudo-aleatoire ; srand fixe la graine." },
        { name: 'qsort', syntax: 'void qsort(base, n, taille, cmp)', desc: "Trie un tableau via une fonction de comparaison fournie." },
        { name: 'bsearch', syntax: 'void* bsearch(...)', desc: "Recherche dichotomique dans un tableau deja trie." },
        { name: 'exit', syntax: 'void exit(int code)', desc: "Termine immediatement le programme avec un code de retour." },
        { name: 'abs', syntax: 'int abs(int n)', desc: "Renvoie la valeur absolue d un entier." }
      ]
    },
    {
      group: 'string.h',
      items: [
        { name: 'strlen', syntax: 'size_t strlen(const char* s)', desc: "Renvoie le nombre de caracteres avant le terminateur nul." },
        { name: 'strcpy', syntax: 'char* strcpy(char* d, const char* s)', desc: "Copie une chaine source vers une destination, terminateur inclus." },
        { name: 'strncpy', syntax: 'char* strncpy(d, s, n)', desc: "Copie au plus n caracteres, version plus sure que strcpy." },
        { name: 'strcat', syntax: 'char* strcat(char* d, const char* s)', desc: "Concatene la source a la fin de la chaine destination." },
        { name: 'strcmp', syntax: 'int strcmp(const char* a, const char* b)', desc: "Compare deux chaines ; renvoie 0 si elles sont egales." },
        { name: 'strncmp', syntax: 'int strncmp(a, b, n)', desc: "Compare au plus n caracteres de deux chaines." },
        { name: 'strchr', syntax: 'char* strchr(const char* s, int c)', desc: "Localise la premiere occurrence d un caractere dans une chaine." },
        { name: 'strstr', syntax: 'char* strstr(const char* h, const char* n)', desc: "Recherche une sous-chaine dans une chaine." },
        { name: 'memcpy / memset', syntax: 'void* memcpy(d, s, n)', desc: "Copie ou remplit des octets bruts en memoire." }
      ]
    },
    {
      group: 'math.h',
      items: [
        { name: 'sqrt', syntax: 'double sqrt(double x)', desc: "Calcule la racine carree d un nombre positif." },
        { name: 'pow', syntax: 'double pow(double b, double e)', desc: "Eleve la base b a la puissance e." },
        { name: 'fabs', syntax: 'double fabs(double x)', desc: "Renvoie la valeur absolue d un flottant." },
        { name: 'ceil / floor', syntax: 'double ceil(double x)', desc: "Arrondit a l entier superieur ou inferieur." },
        { name: 'round', syntax: 'double round(double x)', desc: "Arrondit a l entier le plus proche." },
        { name: 'sin / cos / tan', syntax: 'double sin(double x)', desc: "Fonctions trigonometriques avec angle en radians." },
        { name: 'log / log10', syntax: 'double log(double x)', desc: "Logarithme naturel ou en base 10." },
        { name: 'exp', syntax: 'double exp(double x)', desc: "Calcule l exponentielle e puissance x." },
        { name: 'fmod', syntax: 'double fmod(double a, double b)', desc: "Reste de la division en virgule flottante." }
      ]
    },
    {
      group: 'Structs, unions & enums',
      items: [
        { name: 'struct', syntax: 'struct P { int x; int y; };', desc: "Regroupe plusieurs champs de types varies sous un nom." },
        { name: 'acces membre', syntax: 's.x', desc: "Accede a un champ d une structure via l operateur point." },
        { name: 'fleche', syntax: 'p->x', desc: "Accede a un champ a travers un pointeur de structure." },
        { name: 'typedef struct', syntax: 'typedef struct {} T;', desc: "Cree un alias pour ecrire T au lieu de struct complet." },
        { name: 'union', syntax: 'union U { int i; float f; };', desc: "Champs partageant la meme memoire ; un seul valide a la fois." },
        { name: 'enum', syntax: 'enum E { A, B, C };', desc: "Ensemble de constantes entieres nommees, numerotees des zero." },
        { name: 'initialisation', syntax: 'struct P p = {1, 2};', desc: "Initialise les champs dans l ordre de leur declaration." },
        { name: 'champ nomme', syntax: 'struct P p = {.x = 1};', desc: "Initialise un champ precis par son nom (designated initializer)." },
        { name: 'struct imbriquee', syntax: 'struct A { struct B b; };', desc: "Une structure peut contenir une autre structure comme champ." }
      ]
    }
  ]
});

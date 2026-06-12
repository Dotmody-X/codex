CODEX.extend('cpp', {
  course: [
    {
      title: 'Chapitre 1 — Bases et du C au C++',
      lessons: [
        {
          title: 'Compiler et afficher',
          body: "Un programme C++ commence par la fonction main, point d entree unique. On inclut les en-tetes necessaires avec la directive #include, ici <iostream> pour les flux d entree-sortie. L objet std::cout envoie du texte vers la sortie standard a l aide de l operateur d insertion <<. Le manipulateur std::endl insere un saut de ligne et vide le tampon. On compile typiquement avec g++ fichier.cpp -o programme puis on execute le binaire produit.",
          code: '#include <iostream>\n\nint main() {\n    std::cout << "Bonjour Codex" << std::endl;\n    return 0;\n}',
          lang: 'cpp'
        },
        {
          title: 'Variables, types et auto',
          body: "C++ est un langage a typage statique : chaque variable possede un type connu a la compilation. Les types fondamentaux incluent int, double, char et bool. Le mot-cle const rend une variable immuable apres initialisation, ce qui clarifie l intention et permet des optimisations. Depuis C++11, auto demande au compilateur de deduire le type a partir de l initialiseur, reduisant la verbosite sans perdre la securite de typage.",
          code: 'int age = 30;\nconst double PI = 3.14159;\nauto nom = std::string("Ada");\nbool actif = true;',
          lang: 'cpp'
        },
        {
          title: 'Conditions et boucles',
          body: "Le controle de flux repose sur if, else, switch ainsi que les boucles for, while et do-while. Depuis C++11, la boucle for basee sur un intervalle parcourt directement les elements d un conteneur sans gerer d index. Les operateurs logiques && et || sont a court-circuit : le second operande n est evalue que si necessaire. On privilegie des conditions claires et des corps de boucle courts pour la lisibilite.",
          code: 'std::vector<int> v = {1, 2, 3};\nint somme = 0;\nfor (int x : v) {\n    if (x % 2 == 1) somme += x;\n}',
          lang: 'cpp'
        },
        {
          title: 'Fonctions et references',
          body: "Une fonction declare un type de retour, un nom et une liste de parametres typés. Passer par valeur copie l argument, ce qui peut couter cher pour de gros objets. Passer par reference avec & evite la copie et permet de modifier l original ; ajouter const garantit qu on ne le modifie pas. La surcharge autorise plusieurs fonctions de meme nom distinguees par leurs parametres.",
          code: 'int carre(int n) { return n * n; }\n\nvoid incrementer(int &n) { n++; }\n\nvoid afficher(const std::string &s) {\n    std::cout << s << "\\n";\n}',
          lang: 'cpp'
        }
      ]
    },
    {
      title: 'Chapitre 2 — Classes et programmation orientee objet',
      lessons: [
        {
          title: 'Definir une classe',
          body: "Une classe regroupe des donnees (membres) et des comportements (methodes). Les niveaux d acces public, private et protected controlent la visibilite : par defaut tout est prive dans une class. L encapsulation cache l etat interne derriere une interface publique, protegeant les invariants de l objet. On declare souvent l interface dans un en-tete et l implementation dans un fichier .cpp.",
          code: 'class Compte {\n    double solde = 0;\npublic:\n    void deposer(double m) { solde += m; }\n    double lire() const { return solde; }\n};',
          lang: 'cpp'
        },
        {
          title: 'Constructeurs et destructeur',
          body: "Le constructeur initialise un objet au moment de sa creation ; on prefere la liste d initialisation pour affecter les membres directement. Le destructeur, prefixe d un tilde, est appele automatiquement quand l objet sort du scope et sert a liberer les ressources. Plusieurs constructeurs peuvent coexister par surcharge. Le mot-cle this designe un pointeur vers l objet courant.",
          code: 'class Point {\n    int x, y;\npublic:\n    Point(int a, int b) : x(a), y(b) {}\n    ~Point() { /* nettoyage */ }\n    int abscisse() const { return this->x; }\n};',
          lang: 'cpp'
        },
        {
          title: 'Heritage et polymorphisme',
          body: "L heritage permet a une classe derivee de reutiliser et specialiser une classe de base. Une methode declaree virtual peut etre redefinie dans la classe fille ; le mot-cle override rend cette intention explicite et detectable a la compilation. Grace au polymorphisme, un appel via une reference ou un pointeur de base invoque la version la plus derivee. Un destructeur virtuel est indispensable quand on detruit un objet derive via un pointeur de base.",
          code: 'struct Forme {\n    virtual double aire() const = 0;\n    virtual ~Forme() = default;\n};\nstruct Cercle : Forme {\n    double r;\n    double aire() const override { return 3.14159 * r * r; }\n};',
          lang: 'cpp'
        }
      ]
    },
    {
      title: 'Chapitre 3 — RAII, memoire et smart pointers',
      lessons: [
        {
          title: 'Pile, tas et pointeurs',
          body: "Les variables locales vivent sur la pile et sont detruites automatiquement a la fin de leur scope. L allocation dynamique avec new place un objet sur le tas et retourne un pointeur qu il faut liberer avec delete. Oublier delete provoque une fuite memoire ; liberer deux fois corrompt le programme. La gestion manuelle est fragile, c est pourquoi C++ moderne la decourage au profit du RAII.",
          code: 'int *p = new int(42);\nstd::cout << *p << "\\n";\ndelete p; // liberation obligatoire',
          lang: 'cpp'
        },
        {
          title: 'Le principe RAII',
          body: "RAII signifie Resource Acquisition Is Initialization : la duree de vie d une ressource est liee a celle d un objet. Le constructeur acquiert la ressource (memoire, fichier, verrou) et le destructeur la libere automatiquement a la sortie du scope. Ce mecanisme garantit la liberation meme en cas d exception. C est le pilier de la securite des ressources en C++.",
          code: 'void lire() {\n    std::ifstream f("data.txt");\n    // ... utilisation\n} // f.close() appele automatiquement',
          lang: 'cpp'
        },
        {
          title: 'unique_ptr et shared_ptr',
          body: "Les pointeurs intelligents de l en-tete <memory> automatisent la liberation. unique_ptr possede exclusivement sa ressource et ne peut etre copie, seulement deplace ; on le cree avec std::make_unique. shared_ptr partage la propriete via un compteur de references et libere quand le dernier proprietaire disparait. Ils suppriment les fuites et remplacent l usage manuel de new et delete.",
          code: 'auto u = std::make_unique<int>(10);\nauto s = std::make_shared<std::string>("hi");\nauto s2 = s; // compteur = 2',
          lang: 'cpp'
        }
      ]
    },
    {
      title: 'Chapitre 4 — Templates et genericite',
      lessons: [
        {
          title: 'Fonctions templates',
          body: "Un template parametre du code par un ou plusieurs types. Le compilateur genere une version specialisee pour chaque type utilise, sans surcout a l execution. La deduction d arguments evite souvent d indiquer le type explicitement. C est la base de la programmation generique et de toute la STL.",
          code: 'template <typename T>\nT maximum(T a, T b) {\n    return a > b ? a : b;\n}\n\nint m = maximum(3, 7);\ndouble d = maximum(1.5, 0.5);',
          lang: 'cpp'
        },
        {
          title: 'Classes templates',
          body: "Une classe peut aussi etre templatee pour fonctionner avec n importe quel type, comme un conteneur generique. Les parametres de type apparaissent entre chevrons apres le mot-cle template. On peut combiner plusieurs parametres et fournir des valeurs par defaut. C est ainsi que sont construits std::vector, std::map et les autres conteneurs.",
          code: 'template <typename T>\nclass Boite {\n    T contenu;\npublic:\n    Boite(T v) : contenu(v) {}\n    T lire() const { return contenu; }\n};\nBoite<int> b(5);',
          lang: 'cpp'
        }
      ]
    },
    {
      title: 'Chapitre 5 — La STL : conteneurs et algorithmes',
      lessons: [
        {
          title: 'Conteneurs essentiels',
          body: "La Standard Template Library fournit des structures de donnees eprouvees. std::vector est un tableau dynamique contigu, ideal par defaut. std::map associe des cles a des valeurs dans un ordre trie, std::set stocke des elements uniques. std::string gere des chaines de caracteres avec une riche interface. Ces conteneurs gerent leur memoire seuls grace au RAII.",
          code: 'std::vector<int> v = {3, 1, 2};\nstd::map<std::string, int> ages;\nages["Ada"] = 36;\nstd::set<int> uniques = {1, 2, 2, 3};',
          lang: 'cpp'
        },
        {
          title: 'Iterateurs',
          body: "Un iterateur est un objet qui pointe vers un element d un conteneur et sait avancer vers le suivant. Les methodes begin() et end() delimitent un intervalle semi-ouvert : end() designe la position juste apres le dernier element. Les algorithmes de la STL operent sur des paires d iterateurs, ce qui les rend independants du conteneur. La boucle for basee sur un intervalle masque cette mecanique pour les cas simples.",
          code: 'std::vector<int> v = {10, 20, 30};\nfor (auto it = v.begin(); it != v.end(); ++it) {\n    std::cout << *it << " ";\n}',
          lang: 'cpp'
        },
        {
          title: 'Algorithmes generiques',
          body: "L en-tete <algorithm> offre des fonctions generiques operant sur des intervalles. std::sort trie, std::find recherche, std::count compte, std::for_each applique une operation. On les combine souvent avec des fonctions lambda pour personnaliser le comportement. Ce vocabulaire commun rend le code concis, expressif et performant.",
          code: 'std::vector<int> v = {4, 2, 5, 1};\nstd::sort(v.begin(), v.end());\nauto it = std::find(v.begin(), v.end(), 5);\nstd::for_each(v.begin(), v.end(),\n    [](int x){ std::cout << x; });',
          lang: 'cpp'
        }
      ]
    },
    {
      title: 'Chapitre 6 — References, move et C++ moderne',
      lessons: [
        {
          title: 'Lvalue, rvalue et move',
          body: "Une lvalue designe un objet nomme et adressable, une rvalue est une valeur temporaire. Les references rvalue, notees &&, permettent de capturer ces temporaires pour en voler les ressources plutot que de les copier. std::move convertit une lvalue en rvalue afin d autoriser ce transfert. La semantique de deplacement rend les conteneurs et le code bien plus efficaces.",
          code: 'std::string a = "long texte";\nstd::string b = std::move(a);\n// a est maintenant vide, aucune copie',
          lang: 'cpp'
        },
        {
          title: 'Lambdas et fonctions',
          body: "Une lambda est une fonction anonyme definie sur place, tres utile avec les algorithmes. Les crochets [] forment la clause de capture qui importe les variables du contexte, par valeur ou par reference. Suivent la liste de parametres et le corps. Les lambdas rendent le code fonctionnel concis sans declarer de fonction nommee.",
          code: 'int seuil = 10;\nauto grand = [seuil](int x) {\n    return x > seuil;\n};\nbool r = grand(42); // true',
          lang: 'cpp'
        },
        {
          title: 'Exceptions et securite',
          body: "Le mecanisme d exceptions separe la detection d une erreur de son traitement. On signale un probleme avec throw, on protege une zone de code avec try et on capture l erreur avec catch. Les destructeurs s executent durant le deroulement de la pile, ce qui rend le RAII et les exceptions complementaires. On capture de preference par const reference pour eviter le decoupage d objet.",
          code: 'try {\n    if (diviseur == 0)\n        throw std::runtime_error("division par zero");\n} catch (const std::exception &e) {\n    std::cerr << e.what() << "\\n";\n}',
          lang: 'cpp'
        }
      ]
    }
  ],
  reference: [
    {
      group: 'Mots-cles',
      items: [
        { name: 'if / else', syntax: 'if (cond) { ... } else { ... }', desc: "Execute un bloc selon une condition booleenne, avec une branche alternative optionnelle." },
        { name: 'for', syntax: 'for (int i = 0; i < n; ++i)', desc: "Boucle a compteur ; une variante for (x : conteneur) parcourt directement les elements." },
        { name: 'while', syntax: 'while (cond) { ... }', desc: "Repete un bloc tant que la condition reste vraie, test effectue avant chaque iteration." },
        { name: 'switch', syntax: 'switch (x) { case 1: ...; break; }', desc: "Aiguille l execution selon la valeur d une expression entiere ou enumeree." },
        { name: 'return', syntax: 'return valeur;', desc: "Termine la fonction courante et renvoie eventuellement une valeur a l appelant." },
        { name: 'break / continue', syntax: 'break; continue;', desc: "break sort de la boucle ou du switch ; continue passe a l iteration suivante." },
        { name: 'new / delete', syntax: 'T *p = new T(); delete p;', desc: "Allouent et liberent un objet sur le tas ; a eviter au profit des smart pointers." },
        { name: 'sizeof', syntax: 'sizeof(T)', desc: "Renvoie la taille en octets d un type ou d une expression, evaluee a la compilation." }
      ]
    },
    {
      group: 'Types & qualificateurs',
      items: [
        { name: 'int / double / char', syntax: 'int n; double d; char c;', desc: "Types fondamentaux pour les entiers, les nombres a virgule flottante et les caracteres." },
        { name: 'bool', syntax: 'bool actif = true;', desc: "Type booleen pouvant valoir true ou false, base du controle de flux." },
        { name: 'const', syntax: 'const int N = 10;', desc: "Rend une valeur immuable apres initialisation ; clarifie l intention et permet des optimisations." },
        { name: 'auto', syntax: 'auto x = expression;', desc: "Deduit le type de la variable a partir de son initialiseur (depuis C++11)." },
        { name: 'constexpr', syntax: 'constexpr int f() { return 42; }', desc: "Garantit qu une valeur ou fonction est evaluable a la compilation." },
        { name: 'static', syntax: 'static int compteur;', desc: "Persiste entre les appels pour une variable locale, ou limite la portee au fichier." },
        { name: 'enum class', syntax: 'enum class Couleur { Rouge, Vert };', desc: "Enumeration fortement typee dont les valeurs sont nommees et non convertibles implicitement." },
        { name: 'using / typedef', syntax: 'using Entier = int;', desc: "Cree un alias de type pour ameliorer la lisibilite du code." }
      ]
    },
    {
      group: 'Classes & POO',
      items: [
        { name: 'class', syntax: 'class Nom { ... };', desc: "Definit un type combinant donnees et methodes, par defaut a acces prive." },
        { name: 'struct', syntax: 'struct Nom { ... };', desc: "Identique a class mais avec un acces public par defaut ; usuel pour les agregats de donnees." },
        { name: 'public / private / protected', syntax: 'public: ... private: ...', desc: "Specifient la visibilite des membres et controlent l encapsulation." },
        { name: 'this', syntax: 'this->membre', desc: "Pointeur implicite vers l objet courant a l interieur d une methode." },
        { name: 'virtual', syntax: 'virtual void f();', desc: "Permet la redefinition polymorphe d une methode dans une classe derivee." },
        { name: 'override', syntax: 'void f() override;', desc: "Indique qu une methode redefinit une methode virtuelle de base ; verifie a la compilation." },
        { name: 'constructeur', syntax: 'Nom(int a) : membre(a) {}', desc: "Initialise un objet lors de sa creation, idealement via une liste d initialisation." },
        { name: 'destructeur', syntax: '~Nom() { ... }', desc: "Libere les ressources de l objet a sa destruction ; rendre virtuel en cas d heritage." }
      ]
    },
    {
      group: 'Templates',
      items: [
        { name: 'template <typename T>', syntax: 'template <typename T> T f(T a);', desc: "Declare un parametre de type generique pour une fonction ou une classe." },
        { name: 'classe template', syntax: 'template <typename T> class C { T v; };', desc: "Definit une classe parametree par un type, base des conteneurs generiques." },
        { name: 'instanciation', syntax: 'C<int> obj;', desc: "Genere une version concrete du template pour le type fourni entre chevrons." },
        { name: 'parametres multiples', syntax: 'template <typename K, typename V>', desc: "Permet plusieurs parametres de type, comme la cle et la valeur d une map." },
        { name: 'parametre non type', syntax: 'template <int N> ...', desc: "Parametre le template par une valeur constante connue a la compilation." },
        { name: 'specialisation', syntax: 'template <> class C<bool> { ... };', desc: "Fournit une implementation dediee pour un type particulier." },
        { name: 'typename', syntax: 'typename T::type', desc: "Indique au compilateur qu un nom dependant designe un type et non une valeur." },
        { name: 'auto generique', syntax: 'auto f(auto x) { return x; }', desc: "Cree un parametre generique de fonction de maniere concise (depuis C++20)." }
      ]
    },
    {
      group: 'Conteneurs STL',
      items: [
        { name: 'std::vector', syntax: 'std::vector<int> v;', desc: "Tableau dynamique contigu redimensionnable, choix par defaut pour une sequence." },
        { name: 'std::string', syntax: 'std::string s = "texte";', desc: "Chaine de caracteres geree automatiquement avec une riche interface de manipulation." },
        { name: 'std::map', syntax: 'std::map<std::string, int> m;', desc: "Associe des cles a des valeurs dans un ordre trie ; recherche logarithmique." },
        { name: 'std::set', syntax: 'std::set<int> s;', desc: "Collection ordonnee d elements uniques sans doublons." },
        { name: 'std::array', syntax: 'std::array<int, 3> a;', desc: "Tableau de taille fixe connue a la compilation, alternative sure au tableau C." },
        { name: 'std::unordered_map', syntax: 'std::unordered_map<int, int> m;', desc: "Table de hachage offrant une recherche en temps constant moyen, sans ordre." },
        { name: 'std::pair', syntax: 'std::pair<int, std::string> p;', desc: "Regroupe deux valeurs heterogenes, accessibles via .first et .second." },
        { name: 'std::list', syntax: 'std::list<int> l;', desc: "Liste doublement chainee permettant des insertions efficaces partout." }
      ]
    },
    {
      group: 'Algorithmes STL',
      items: [
        { name: 'std::sort', syntax: 'std::sort(v.begin(), v.end());', desc: "Trie un intervalle en place, avec un comparateur optionnel." },
        { name: 'std::find', syntax: 'std::find(b, e, valeur)', desc: "Retourne un iterateur vers la premiere occurrence d une valeur, ou end() sinon." },
        { name: 'std::for_each', syntax: 'std::for_each(b, e, fn)', desc: "Applique une fonction ou lambda a chaque element de l intervalle." },
        { name: 'std::count', syntax: 'std::count(b, e, valeur)', desc: "Compte le nombre d elements egaux a une valeur donnee." },
        { name: 'std::accumulate', syntax: 'std::accumulate(b, e, 0)', desc: "Cumule les elements d un intervalle ; reside dans l en-tete <numeric>." },
        { name: 'std::transform', syntax: 'std::transform(b, e, out, fn)', desc: "Applique une transformation a chaque element et ecrit le resultat ailleurs." },
        { name: 'std::max_element', syntax: 'std::max_element(b, e)', desc: "Renvoie un iterateur vers le plus grand element de l intervalle." },
        { name: 'std::remove_if', syntax: 'std::remove_if(b, e, pred)', desc: "Reorganise l intervalle en deplacant les elements a supprimer vers la fin." }
      ]
    },
    {
      group: 'Smart pointers',
      items: [
        { name: 'std::unique_ptr', syntax: 'std::unique_ptr<T> p;', desc: "Possede exclusivement une ressource et la libere automatiquement ; non copiable." },
        { name: 'std::make_unique', syntax: 'auto p = std::make_unique<T>(args);', desc: "Construit un objet et son unique_ptr de maniere sure et concise." },
        { name: 'std::shared_ptr', syntax: 'std::shared_ptr<T> p;', desc: "Partage la propriete via un compteur de references ; libere au dernier proprietaire." },
        { name: 'std::make_shared', syntax: 'auto p = std::make_shared<T>(args);', desc: "Cree un objet et son shared_ptr en une seule allocation efficace." },
        { name: 'std::weak_ptr', syntax: 'std::weak_ptr<T> w = sp;', desc: "Observe une ressource shared_ptr sans en prolonger la duree de vie ; brise les cycles." },
        { name: '.get()', syntax: 'p.get()', desc: "Retourne le pointeur brut detenu sans transferer la propriete." },
        { name: '.reset()', syntax: 'p.reset();', desc: "Libere la ressource actuelle et en adopte eventuellement une nouvelle." },
        { name: 'std::move (pointeur)', syntax: 'auto q = std::move(p);', desc: "Transfere la propriete d un unique_ptr vers un autre." }
      ]
    },
    {
      group: 'References & semantique de mouvement',
      items: [
        { name: 'reference (&)', syntax: 'int &r = x;', desc: "Alias d une variable existante ; ne peut etre nulle ni reassignee." },
        { name: 'reference const', syntax: 'const T &r', desc: "Passe un objet sans le copier ni autoriser sa modification ; ideal pour les parametres." },
        { name: 'reference rvalue (&&)', syntax: 'T &&r = std::move(x);', desc: "Capture un temporaire pour en voler les ressources plutot que les copier." },
        { name: 'std::move', syntax: 'std::move(x)', desc: "Convertit une lvalue en rvalue afin de declencher la semantique de deplacement." },
        { name: 'constructeur de deplacement', syntax: 'T(T &&autre) noexcept;', desc: "Transfere les ressources d un temporaire vers le nouvel objet." },
        { name: 'std::forward', syntax: 'std::forward<T>(arg)', desc: "Preserve la categorie de valeur d un argument dans un template (forwarding parfait)." },
        { name: 'std::swap', syntax: 'std::swap(a, b)', desc: "Echange efficacement le contenu de deux objets, souvent via des deplacements." },
        { name: 'lambda', syntax: '[capture](params){ corps }', desc: "Fonction anonyme definie sur place, frequente avec les algorithmes." }
      ]
    },
    {
      group: 'Espaces de noms & std',
      items: [
        { name: 'namespace', syntax: 'namespace n { ... }', desc: "Regroupe des declarations sous un nom pour eviter les collisions d identifiants." },
        { name: 'std', syntax: 'std::cout', desc: "Espace de noms de la bibliotheque standard qui prefixe tous ses elements." },
        { name: 'using namespace', syntax: 'using namespace std;', desc: "Importe un espace de noms entier ; a eviter en portee globale dans les en-tetes." },
        { name: 'using (declaration)', syntax: 'using std::cout;', desc: "Importe un seul symbole d un espace de noms, plus sur qu un import global." },
        { name: 'resolution de portee (::)', syntax: 'Classe::methode', desc: "Accede a un membre d un espace de noms ou d une classe." },
        { name: 'std::cout / std::cin', syntax: 'std::cout << x; std::cin >> x;', desc: "Flux standard de sortie et d entree pour afficher et lire des donnees." },
        { name: '#include', syntax: '#include <iostream>', desc: "Directive de preprocesseur qui insere le contenu d un en-tete." },
        { name: 'namespace anonyme', syntax: 'namespace { ... }', desc: "Limite la visibilite de ses declarations a l unite de traduction courante." }
      ]
    },
    {
      group: 'Gestion d exceptions',
      items: [
        { name: 'try', syntax: 'try { ... }', desc: "Delimite un bloc surveille dont les exceptions seront capturees." },
        { name: 'catch', syntax: 'catch (const std::exception &e)', desc: "Intercepte une exception d un type donne et la traite." },
        { name: 'throw', syntax: 'throw std::runtime_error("msg");', desc: "Signale une erreur en lancant une exception qui interrompt le flux normal." },
        { name: 'std::exception', syntax: 'class E : std::exception', desc: "Classe de base de la hierarchie standard des exceptions." },
        { name: '.what()', syntax: 'e.what()', desc: "Retourne un message decrivant l exception capturee." },
        { name: 'std::runtime_error', syntax: 'throw std::runtime_error(msg)', desc: "Exception pour les erreurs detectees a l execution." },
        { name: 'std::logic_error', syntax: 'throw std::logic_error(msg)', desc: "Exception signalant une faute de logique detectable a priori." },
        { name: 'noexcept', syntax: 'void f() noexcept;', desc: "Promet qu une fonction ne lance pas d exception, permettant des optimisations." }
      ]
    }
  ]
});

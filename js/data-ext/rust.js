CODEX.extend('rust', {
  course: [
    {
      title: 'Chapitre 1 — Bases, types et Cargo',
      lessons: [
        {
          title: 'Premier programme et Cargo',
          body: "Tout projet Rust commence par Cargo, l outil officiel de build et de gestion de paquets. La commande cargo new cree un squelette avec un fichier Cargo.toml de configuration et un src/main.rs. Le point d entree est la fonction main, qui ne renvoie rien par defaut. La macro println! affiche du texte dans la console. On compile et execute avec cargo run, ou on compile seulement avec cargo build.",
          code: "// src/main.rs\nfn main() {\n    println!(\"Bonjour Codex\");\n}",
          lang: 'rust'
        },
        {
          title: 'Variables, mutabilite et inference',
          body: "On declare une variable avec let. Par defaut, toute variable est immuable : on ne peut pas la reaffecter. Pour la rendre modifiable, on ajoute le mot-cle mut. Le compilateur infere souvent le type tout seul, mais on peut l annoter avec deux-points. Le shadowing permet de redeclarer un nom avec let pour reutiliser l identifiant, eventuellement avec un autre type.",
          code: "let x = 5;          // immuable, type i32 infere\nlet mut y = 10;     // mutable\ny += 1;\nlet age: u8 = 30;   // annotation explicite\nlet age = age + 1;  // shadowing",
          lang: 'rust'
        },
        {
          title: 'Les types scalaires et composes',
          body: "Rust est fortement type. Les entiers existent en versions signees (i8 a i64, isize) et non signees (u8 a u64, usize). Les flottants sont f32 et f64. Le type bool vaut true ou false, et char represente un caractere Unicode sur quatre octets. Les tuples regroupent des valeurs heterogenes, les tableaux (array) des valeurs homogenes de taille fixe.",
          code: "let entier: i32 = -42;\nlet flottant: f64 = 3.14;\nlet actif: bool = true;\nlet lettre: char = 'R';\nlet point: (i32, i32) = (3, 7);\nlet notes: [u8; 3] = [12, 15, 18];",
          lang: 'rust'
        },
        {
          title: 'Fonctions et expressions',
          body: "Une fonction se declare avec fn, suivie de ses parametres types et d une fleche indiquant le type de retour. En Rust, la plupart des blocs sont des expressions : la derniere ligne sans point-virgule devient la valeur renvoyee. On peut aussi utiliser return explicitement. Cette nature expressive rend if et match utilisables directement comme valeurs.",
          code: "fn carre(n: i32) -> i32 {\n    n * n  // pas de point-virgule : valeur renvoyee\n}\n\nfn main() {\n    let r = carre(6);\n    println!(\"{}\", r);\n}",
          lang: 'rust'
        }
      ]
    },
    {
      title: 'Chapitre 2 — Ownership, emprunt et lifetimes',
      lessons: [
        {
          title: 'Ownership et move',
          body: "Le coeur de Rust est l ownership : chaque valeur possede un unique proprietaire. Quand le proprietaire sort de sa portee, la memoire est liberee automatiquement, sans ramasse-miettes. Affecter une valeur non copiable (comme une String) a une autre variable transfere la propriete : c est un move, et l ancienne variable devient inutilisable. Les types simples implementant Copy (entiers, bool) sont copies au lieu d etre deplaces.",
          code: "let s1 = String::from(\"salut\");\nlet s2 = s1;          // move : s1 invalidee\n// println!(\"{}\", s1); // erreur de compilation\nlet a = 5;\nlet b = a;            // Copy : a reste valide",
          lang: 'rust'
        },
        {
          title: 'Emprunt avec & et &mut',
          body: "Pour utiliser une valeur sans en prendre la propriete, on emprunte une reference avec l esperluette. Le borrow checker impose une regle stricte : on peut avoir plusieurs references immuables (&), ou une seule reference mutable (&mut), mais jamais les deux en meme temps. Cette discipline elimine a la compilation les acces concurrents dangereux et les modifications inattendues.",
          code: "fn longueur(s: &String) -> usize {\n    s.len()  // emprunt en lecture\n}\n\nfn ajouter(s: &mut String) {\n    s.push_str(\" !\");  // emprunt en ecriture\n}",
          lang: 'rust'
        },
        {
          title: 'Slices',
          body: "Une slice est une reference vers une portion contigue d une collection, sans en prendre la propriete. La slice de chaine &str pointe vers une partie d une String ou d un litteral. Les slices de tableaux fonctionnent de la meme maniere. Elles stockent un pointeur et une longueur, ce qui permet de manipuler des sous-ensembles efficacement et en toute securite.",
          code: "let phrase = String::from(\"Rust est sur\");\nlet mot: &str = &phrase[0..4];  // \"Rust\"\nlet nombres = [10, 20, 30, 40];\nlet milieu = &nombres[1..3];     // [20, 30]",
          lang: 'rust'
        },
        {
          title: 'Lifetimes',
          body: "Les lifetimes, ou durees de vie, garantissent qu une reference ne survit jamais a la donnee qu elle designe. Le compilateur les infere dans la majorite des cas. Quand une fonction renvoie une reference dependant de plusieurs entrees, on annote explicitement avec une syntaxe en apostrophe pour lever l ambiguite. Les lifetimes ne changent pas la duree reelle des donnees : elles decrivent simplement les relations entre references.",
          code: "fn plus_long<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}",
          lang: 'rust'
        }
      ]
    },
    {
      title: 'Chapitre 3 — Structs, enums et pattern matching',
      lessons: [
        {
          title: 'Definir des structs',
          body: "Une struct regroupe plusieurs champs nommes en un type unique. On instancie une struct en precisant chaque champ. Les methodes s ajoutent dans un bloc impl, ou self represente l instance courante (souvent empruntee via &self). Les fonctions associees sans self, comme un constructeur, s appellent avec la syntaxe double deux-points.",
          code: "struct Point { x: f64, y: f64 }\n\nimpl Point {\n    fn origine() -> Point { Point { x: 0.0, y: 0.0 } }\n    fn distance(&self) -> f64 {\n        (self.x * self.x + self.y * self.y).sqrt()\n    }\n}",
          lang: 'rust'
        },
        {
          title: 'Enums et donnees associees',
          body: "Un enum definit un type pouvant prendre l une de plusieurs variantes. En Rust, chaque variante peut porter ses propres donnees, ce qui rend les enums tres expressifs. Option et Result sont eux-memes des enums de la bibliotheque standard. On combine naturellement les enums avec le pattern matching pour traiter chaque variante.",
          code: "enum Forme {\n    Cercle(f64),\n    Rectangle(f64, f64),\n    Point,\n}\n\nlet f = Forme::Rectangle(3.0, 4.0);",
          lang: 'rust'
        },
        {
          title: 'Le pattern matching avec match',
          body: "L expression match compare une valeur a une serie de motifs et exige l exhaustivite : tous les cas possibles doivent etre couverts, sous peine d erreur de compilation. Chaque bras associe un motif a une expression. Le motif underscore sert de cas par defaut. On peut destructurer des structs, des tuples et des enums directement dans les motifs, et ajouter des gardes conditionnelles.",
          code: "let aire = match f {\n    Forme::Cercle(r) => 3.14 * r * r,\n    Forme::Rectangle(l, h) => l * h,\n    Forme::Point => 0.0,\n};",
          lang: 'rust'
        },
        {
          title: 'if let et while let',
          body: "Quand un seul motif nous interesse, match devient verbeux. La construction if let permet de tester un motif unique de maniere concise, avec un else optionnel. De facon analogue, while let boucle tant qu un motif correspond, ce qui est pratique pour consommer une pile ou un iterateur. Ces formes sont du sucre syntaxique autour de match.",
          code: "let valeur = Some(7);\nif let Some(n) = valeur {\n    println!(\"trouve {}\", n);\n}\n\nlet mut pile = vec![1, 2, 3];\nwhile let Some(sommet) = pile.pop() {\n    println!(\"{}\", sommet);\n}",
          lang: 'rust'
        }
      ]
    },
    {
      title: 'Chapitre 4 — Traits et generiques',
      lessons: [
        {
          title: 'Definir et implementer un trait',
          body: "Un trait decrit un ensemble de comportements partages, comparable a une interface. On le definit avec le mot-cle trait, puis on l implemente pour un type donne avec impl Trait for Type. Un trait peut fournir des methodes par defaut que les types peuvent reutiliser ou redefinir. Les traits sont la base du polymorphisme en Rust.",
          code: "trait Decrire {\n    fn decrire(&self) -> String;\n    fn resume(&self) -> String { String::from(\"objet\") }\n}\n\nimpl Decrire for Point {\n    fn decrire(&self) -> String {\n        format!(\"({}, {})\", self.x, self.y)\n    }\n}",
          lang: 'rust'
        },
        {
          title: 'Generiques et contraintes',
          body: "Les generiques permettent d ecrire du code valable pour plusieurs types sans duplication. On declare un parametre de type entre chevrons. Pour utiliser des methodes sur ce type, on impose des contraintes de trait, soit en ligne avec deux-points, soit via une clause where. Le compilateur genere une version specialisee pour chaque type concret : c est la monomorphisation, sans cout a l execution.",
          code: "fn maximum<T: PartialOrd>(liste: &[T]) -> &T {\n    let mut max = &liste[0];\n    for x in liste {\n        if x > max { max = x; }\n    }\n    max\n}",
          lang: 'rust'
        },
        {
          title: 'Trait objects et dispatch dynamique',
          body: "Les generiques resolvent le type a la compilation, mais on a parfois besoin de manipuler des types differents derriere une meme interface au moment de l execution. On utilise alors un trait object, ecrit dyn Trait, generalement derriere un Box. Le dispatch devient dynamique : l appel de methode est resolu via une table de pointeurs. C est legerement plus lent mais beaucoup plus souple.",
          code: "fn afficher(objets: Vec<Box<dyn Decrire>>) {\n    for o in &objets {\n        println!(\"{}\", o.decrire());\n    }\n}",
          lang: 'rust'
        }
      ]
    },
    {
      title: 'Chapitre 5 — Collections et gestion d erreurs',
      lessons: [
        {
          title: 'Vec, String et HashMap',
          body: "La bibliotheque standard fournit des collections allouees sur le tas. Vec est un tableau dynamique redimensionnable. String est une chaine UTF-8 croissante, distincte de la slice &str. HashMap associe des cles a des valeurs via une table de hachage. Toutes respectent les regles d ownership et liberent leur memoire quand elles sortent de portee.",
          code: "let mut v: Vec<i32> = Vec::new();\nv.push(10);\nv.push(20);\n\nuse std::collections::HashMap;\nlet mut scores = HashMap::new();\nscores.insert(\"Ana\", 95);",
          lang: 'rust'
        },
        {
          title: 'Option pour l absence de valeur',
          body: "Rust n a pas de null. L absence eventuelle d une valeur est modelisee par l enum Option, qui vaut Some(valeur) ou None. Le compilateur force a traiter explicitement le cas None, ce qui elimine les erreurs de pointeur nul. De nombreuses methodes comme get ou first renvoient une Option, et des combinateurs comme map, unwrap_or ou and_then facilitent leur manipulation.",
          code: "fn premier(v: &Vec<i32>) -> Option<&i32> {\n    v.first()\n}\n\nlet defaut = premier(&v).copied().unwrap_or(0);",
          lang: 'rust'
        },
        {
          title: 'Result et propagation avec ?',
          body: "Les erreurs recuperables sont representees par l enum Result, qui vaut Ok(valeur) ou Err(erreur). Plutot que de lancer des exceptions, une fonction renvoie un Result que l appelant doit traiter. L operateur point d interrogation propage automatiquement l erreur : si la valeur est Err, il la retourne immediatement, sinon il extrait la valeur Ok. Cela rend le code lineaire et lisible.",
          code: "use std::num::ParseIntError;\n\nfn doubler(txt: &str) -> Result<i32, ParseIntError> {\n    let n: i32 = txt.parse()?;  // propage l erreur\n    Ok(n * 2)\n}",
          lang: 'rust'
        },
        {
          title: 'Iterateurs et closures',
          body: "Les iterateurs permettent de parcourir une collection de maniere paresseuse et composable. Des methodes comme map, filter et collect s enchainent pour transformer des donnees sans boucle explicite. Elles acceptent des closures, ces fonctions anonymes capturant leur environnement, ecrites avec des barres verticales. Le tout est aussi performant qu une boucle manuelle grace aux optimisations du compilateur.",
          code: "let v = vec![1, 2, 3, 4, 5];\nlet pairs: Vec<i32> = v.iter()\n    .filter(|&&x| x % 2 == 0)\n    .map(|&x| x * 10)\n    .collect();",
          lang: 'rust'
        }
      ]
    },
    {
      title: 'Chapitre 6 — Concurrence sure, modules et crates',
      lessons: [
        {
          title: 'Threads et concurrence sans data race',
          body: "Rust permet de creer des threads avec thread::spawn, qui prend une closure executee en parallele. Le borrow checker s applique aussi aux threads : il interdit a la compilation le partage de donnees mutables non protegees, eliminant les data races. Le mot-cle move transfere la propriete des donnees capturees au nouveau thread. La methode join attend la fin du thread.",
          code: "use std::thread;\n\nlet handle = thread::spawn(move || {\n    for i in 1..4 { println!(\"thread {}\", i); }\n});\nhandle.join().unwrap();",
          lang: 'rust'
        },
        {
          title: 'Partage avec Arc et Mutex',
          body: "Pour partager un etat mutable entre plusieurs threads en toute securite, on combine Arc et Mutex. Arc est un compteur de references atomique qui permet a plusieurs threads de posseder la meme donnee. Mutex garantit qu un seul thread accede a la donnee a la fois via un verrou. La methode lock renvoie un Result et libere le verrou automatiquement en fin de portee.",
          code: "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nlet compteur = Arc::new(Mutex::new(0));\nlet c = Arc::clone(&compteur);\nthread::spawn(move || {\n    *c.lock().unwrap() += 1;\n});",
          lang: 'rust'
        },
        {
          title: 'Modules et visibilite',
          body: "Les modules organisent le code en espaces de noms hierarchiques, declares avec mod. Par defaut, tout est prive : on expose un element avec le mot-cle pub. Le chemin d acces utilise le double deux-points, et le mot-cle use importe un chemin pour eviter de le repeter. Cette structure clarifie les frontieres entre les composants d un programme.",
          code: "mod geometrie {\n    pub fn aire_cercle(r: f64) -> f64 {\n        3.14 * r * r\n    }\n}\n\nuse geometrie::aire_cercle;\nlet a = aire_cercle(2.0);",
          lang: 'rust'
        },
        {
          title: 'Crates et dependances avec Cargo',
          body: "Une crate est l unite de compilation et de distribution en Rust : un binaire ou une bibliotheque. Cargo gere les dependances externes declarees dans la section dependencies du fichier Cargo.toml, telechargees depuis le registre crates.io. La commande cargo build resout et compile l arbre des dependances, tandis que cargo test execute la suite de tests et cargo doc genere la documentation.",
          code: "# Cargo.toml\n[dependencies]\nserde = \"1.0\"\nrand = \"0.8\"",
          lang: 'rust'
        }
      ]
    }
  ],
  reference: [
    {
      group: 'Mots-cles',
      items: [
        { name: 'let', syntax: 'let x = 5;', desc: "Declare une variable, immuable par defaut." },
        { name: 'mut', syntax: 'let mut x = 5;', desc: "Rend une variable ou une reference modifiable." },
        { name: 'fn', syntax: 'fn nom() -> T {}', desc: "Definit une fonction." },
        { name: 'const', syntax: 'const MAX: u32 = 100;', desc: "Definit une constante de compilation, typee obligatoirement." },
        { name: 'if / else', syntax: 'if cond { } else { }', desc: "Branchement conditionnel, utilisable comme expression." },
        { name: 'match', syntax: 'match v { ... }', desc: "Compare une valeur a des motifs de facon exhaustive." },
        { name: 'loop / while / for', syntax: 'for x in iter {}', desc: "Boucles : infinie, conditionnelle et sur un iterateur." },
        { name: 'return', syntax: 'return valeur;', desc: "Sort d une fonction en renvoyant explicitement une valeur." },
        { name: 'use', syntax: 'use std::io;', desc: "Importe un chemin dans la portee courante." },
        { name: 'pub', syntax: 'pub fn f() {}', desc: "Rend un element visible hors de son module." },
        { name: 'move', syntax: 'move || { ... }', desc: "Transfere la propriete des valeurs capturees par une closure." },
        { name: 'unsafe', syntax: 'unsafe { ... }', desc: "Autorise des operations dont la securite n est pas verifiee par le compilateur." }
      ]
    },
    {
      group: 'Types',
      items: [
        { name: 'i32 / i64', syntax: 'let n: i32 = -7;', desc: "Entiers signes sur 32 ou 64 bits." },
        { name: 'u8 / usize', syntax: 'let i: usize = 0;', desc: "Entiers non signes ; usize sert pour l indexation." },
        { name: 'f32 / f64', syntax: 'let x: f64 = 3.14;', desc: "Nombres a virgule flottante simple et double precision." },
        { name: 'bool', syntax: 'let actif: bool = true;', desc: "Valeur booleenne true ou false." },
        { name: 'char', syntax: "let c: char = 'R';", desc: "Caractere Unicode unique sur quatre octets." },
        { name: 'str', syntax: 'let s: &str = \"hi\";', desc: "Slice de chaine immuable, souvent un litteral." },
        { name: 'String', syntax: 'String::from(\"hi\")', desc: "Chaine UTF-8 croissante, allouee sur le tas." },
        { name: 'tuple', syntax: 'let t = (1, \"a\");', desc: "Regroupe des valeurs de types differents." },
        { name: 'array', syntax: 'let a: [i32; 3] = [..];', desc: "Tableau de taille fixe et de type homogene." },
        { name: 'unit', syntax: 'fn f() -> () {}', desc: "Type vide () representant l absence de valeur utile." }
      ]
    },
    {
      group: 'Ownership & emprunt (&, &mut, move)',
      items: [
        { name: 'Ownership', syntax: 'let s = String::from(..);', desc: "Chaque valeur a un unique proprietaire qui la libere en fin de portee." },
        { name: 'Move', syntax: 'let b = a;', desc: "Transfere la propriete d une valeur non copiable et invalide l ancienne variable." },
        { name: '& (emprunt immuable)', syntax: 'fn f(s: &String)', desc: "Emprunte une reference en lecture seule sans prendre la propriete." },
        { name: '&mut (emprunt mutable)', syntax: 'fn f(s: &mut String)', desc: "Emprunte une reference en ecriture, exclusive a tout autre emprunt." },
        { name: 'Copy', syntax: 'let b = a; // a valide', desc: "Trait des types copies plutot que deplaces lors d une affectation." },
        { name: 'Clone', syntax: 'let b = a.clone();', desc: "Cree une copie profonde explicite d une valeur." },
        { name: 'Borrow checker', syntax: '— (compilation)', desc: "Verifie les regles d emprunt a la compilation pour eliminer les acces invalides." },
        { name: 'Drop', syntax: 'impl Drop for T', desc: "Definit le code execute quand une valeur est liberee." }
      ]
    },
    {
      group: 'Structures de controle & match',
      items: [
        { name: 'if let', syntax: 'if let Some(x) = v {}', desc: "Teste un motif unique de maniere concise." },
        { name: 'while let', syntax: 'while let Some(x) = it {}', desc: "Boucle tant qu un motif correspond." },
        { name: 'for', syntax: 'for x in 0..5 {}', desc: "Itere sur une plage ou un iterateur." },
        { name: 'loop', syntax: 'loop { break v; }', desc: "Boucle infinie pouvant renvoyer une valeur via break." },
        { name: 'match', syntax: 'match v { p => e, }', desc: "Filtrage de motifs exhaustif sur une valeur." },
        { name: '_ (joker)', syntax: '_ => default,', desc: "Motif attrape-tout utilise comme cas par defaut." },
        { name: 'garde de motif', syntax: 'n if n > 0 => ..', desc: "Condition supplementaire attachee a un bras de match." },
        { name: 'break / continue', syntax: 'break; continue;', desc: "Interrompt une boucle ou passe a l iteration suivante." }
      ]
    },
    {
      group: 'Fonctions & closures',
      items: [
        { name: 'fn', syntax: 'fn add(a: i32) -> i32', desc: "Declare une fonction nommee avec parametres types." },
        { name: 'closure', syntax: '|x| x + 1', desc: "Fonction anonyme capturant son environnement." },
        { name: 'move closure', syntax: 'move |x| x + base', desc: "Closure prenant la propriete des valeurs capturees." },
        { name: 'Fn', syntax: 'f: impl Fn(i32) -> i32', desc: "Trait des closures appelables par reference partagee." },
        { name: 'FnMut', syntax: 'impl FnMut()', desc: "Trait des closures modifiant leur etat capture." },
        { name: 'FnOnce', syntax: 'impl FnOnce()', desc: "Trait des closures consommant leurs captures, appelables une fois." },
        { name: 'expression de retour', syntax: 'x + 1 // sans ;', desc: "La derniere expression sans point-virgule est la valeur renvoyee." },
        { name: 'fonction de haut niveau', syntax: '.map(f)', desc: "Passe une fonction ou closure comme argument a une autre." }
      ]
    },
    {
      group: 'Structs & enums',
      items: [
        { name: 'struct', syntax: 'struct P { x: f64 }', desc: "Type regroupant des champs nommes." },
        { name: 'tuple struct', syntax: 'struct Couleur(u8, u8);', desc: "Struct dont les champs sont positionnels et anonymes." },
        { name: 'unit struct', syntax: 'struct Marqueur;', desc: "Struct sans champ, utile comme marqueur de type." },
        { name: 'impl', syntax: 'impl P { fn f(&self) }', desc: "Bloc definissant methodes et fonctions associees d un type." },
        { name: 'self / &self', syntax: 'fn aire(&self)', desc: "Reference l instance courante dans une methode." },
        { name: 'enum', syntax: 'enum E { A, B(i32) }', desc: "Type a plusieurs variantes pouvant porter des donnees." },
        { name: 'variante a donnees', syntax: 'Forme::Cercle(r)', desc: "Variante d enum transportant des valeurs associees." },
        { name: 'derive', syntax: '#[derive(Debug)]', desc: "Genere automatiquement l implementation de traits courants." }
      ]
    },
    {
      group: 'Traits',
      items: [
        { name: 'trait', syntax: 'trait T { fn f(&self); }', desc: "Definit un ensemble de comportements partages." },
        { name: 'impl Trait for Type', syntax: 'impl T for P {}', desc: "Implemente un trait pour un type concret." },
        { name: 'methode par defaut', syntax: 'fn f(&self) { .. }', desc: "Implementation fournie dans le trait, redefinissable." },
        { name: 'dyn Trait', syntax: 'Box<dyn T>', desc: "Trait object permettant le dispatch dynamique." },
        { name: 'impl Trait', syntax: 'fn f() -> impl T', desc: "Renvoie ou accepte un type implementant un trait, sans le nommer." },
        { name: 'supertrait', syntax: 'trait B: A {}', desc: "Trait exigeant l implementation d un autre trait." },
        { name: 'Debug', syntax: '#[derive(Debug)]', desc: "Permet l affichage de debogage avec le specificateur deux accolades-deux-points." },
        { name: 'Default', syntax: 'T::default()', desc: "Fournit une valeur par defaut pour un type." }
      ]
    },
    {
      group: 'Generiques & lifetimes',
      items: [
        { name: 'parametre de type', syntax: 'fn f<T>(x: T)', desc: "Rend une fonction ou un type valable pour plusieurs types." },
        { name: 'contrainte de trait', syntax: 'T: PartialOrd', desc: "Exige qu un type generique implemente un trait donne." },
        { name: 'clause where', syntax: 'where T: Clone', desc: "Exprime les contraintes de trait de facon lisible." },
        { name: 'struct generique', syntax: 'struct Boite<T> { v: T }', desc: "Type parametre par un ou plusieurs types." },
        { name: 'lifetime', syntax: "fn f<'a>(x: &'a str)", desc: "Annote la duree de vie d une reference." },
        { name: "lifetime 'static", syntax: "&'static str", desc: "Lifetime designant une donnee vivant toute la duree du programme." },
        { name: 'monomorphisation', syntax: '— (compilation)', desc: "Generation d une version specialisee par type concret, sans cout a l execution." },
        { name: 'borne multiple', syntax: 'T: Clone + Debug', desc: "Combine plusieurs contraintes de trait avec le plus." }
      ]
    },
    {
      group: 'Collections (Vec, HashMap, String)',
      items: [
        { name: 'Vec', syntax: 'Vec::new()', desc: "Tableau dynamique redimensionnable alloue sur le tas." },
        { name: 'push / pop', syntax: 'v.push(x); v.pop();', desc: "Ajoute ou retire un element en fin de vecteur." },
        { name: 'vec!', syntax: 'vec![1, 2, 3]', desc: "Macro construisant un Vec litteral." },
        { name: 'String', syntax: 'String::from(\"hi\")', desc: "Chaine UTF-8 modifiable et possedee." },
        { name: 'push_str', syntax: 's.push_str(\"...\")', desc: "Concatene une slice de chaine a une String." },
        { name: 'HashMap', syntax: 'HashMap::new()', desc: "Table de hachage associant des cles a des valeurs." },
        { name: 'insert / get', syntax: 'm.insert(k, v); m.get(&k);', desc: "Ajoute une entree ou recupere une valeur sous forme d Option." },
        { name: 'HashSet', syntax: 'HashSet::new()', desc: "Collection d elements uniques sans ordre garanti." },
        { name: 'iter', syntax: 'v.iter()', desc: "Cree un iterateur sur les references des elements." },
        { name: 'collect', syntax: '.collect::<Vec<_>>()', desc: "Rassemble un iterateur dans une collection." }
      ]
    },
    {
      group: 'Gestion d erreurs (Option, Result, ?)',
      items: [
        { name: 'Option', syntax: 'Option<T>', desc: "Modelise la presence (Some) ou l absence (None) d une valeur." },
        { name: 'Some / None', syntax: 'Some(5) / None', desc: "Les deux variantes de Option." },
        { name: 'Result', syntax: 'Result<T, E>', desc: "Represente un succes (Ok) ou une erreur (Err) recuperable." },
        { name: 'Ok / Err', syntax: 'Ok(v) / Err(e)', desc: "Les deux variantes de Result." },
        { name: '? (operateur)', syntax: 'let n = parse()?;', desc: "Propage automatiquement une erreur ou extrait la valeur de succes." },
        { name: 'unwrap', syntax: 'opt.unwrap()', desc: "Extrait la valeur ou provoque une panique si elle est absente." },
        { name: 'unwrap_or', syntax: 'opt.unwrap_or(0)', desc: "Extrait la valeur ou renvoie une valeur par defaut." },
        { name: 'map / and_then', syntax: 'opt.map(|x| x + 1)', desc: "Transforme la valeur contenue sans la sortir manuellement." },
        { name: 'expect', syntax: 'opt.expect(\"msg\")', desc: "Comme unwrap mais avec un message de panique personnalise." },
        { name: 'panic!', syntax: 'panic!(\"erreur\")', desc: "Interrompt le programme sur une erreur irrecuperable." }
      ]
    },
    {
      group: 'Macros courantes (println!, vec!...)',
      items: [
        { name: 'println!', syntax: 'println!(\"{}\", x)', desc: "Affiche du texte formate avec un saut de ligne." },
        { name: 'print!', syntax: 'print!(\"{}\", x)', desc: "Affiche du texte formate sans saut de ligne." },
        { name: 'format!', syntax: 'format!(\"{}\", x)', desc: "Construit une String formatee sans l afficher." },
        { name: 'eprintln!', syntax: 'eprintln!(\"err\")', desc: "Ecrit un message formate sur la sortie d erreur." },
        { name: 'vec!', syntax: 'vec![1, 2, 3]', desc: "Cree et initialise un Vec." },
        { name: 'assert!', syntax: 'assert!(cond)', desc: "Verifie une condition, panique sinon, utile en test." },
        { name: 'assert_eq!', syntax: 'assert_eq!(a, b)', desc: "Verifie l egalite de deux valeurs en test." },
        { name: 'panic!', syntax: 'panic!(\"msg\")', desc: "Provoque une panique avec un message." },
        { name: 'dbg!', syntax: 'dbg!(x)', desc: "Affiche et renvoie une valeur pour le debogage." },
        { name: 'todo!', syntax: 'todo!()', desc: "Marque du code non encore implemente, panique a l appel." }
      ]
    },
    {
      group: 'Modules & crates',
      items: [
        { name: 'mod', syntax: 'mod geometrie {}', desc: "Declare un module regroupant du code." },
        { name: 'pub', syntax: 'pub fn f() {}', desc: "Expose un element en dehors de son module." },
        { name: 'use', syntax: 'use std::io::Read;', desc: "Importe un chemin dans la portee courante." },
        { name: 'crate', syntax: 'crate::module::f()', desc: "Reference la racine de la crate courante." },
        { name: 'super', syntax: 'super::f()', desc: "Reference le module parent dans un chemin." },
        { name: ':: (chemin)', syntax: 'std::collections::HashMap', desc: "Separateur de chemin entre modules et elements." },
        { name: 'pub use (reexport)', syntax: 'pub use a::b;', desc: "Reexporte un element pour l exposer depuis un autre module." },
        { name: 'crate', syntax: 'Cargo.toml', desc: "Unite de compilation et de distribution, binaire ou bibliotheque." },
        { name: 'Cargo.toml', syntax: '[dependencies]', desc: "Fichier de configuration declarant metadonnees et dependances." },
        { name: 'crates.io', syntax: 'serde = \"1.0\"', desc: "Registre public de paquets ou Cargo recupere les dependances." },
        { name: 'cargo build', syntax: 'cargo build', desc: "Compile le projet et resout l arbre des dependances." },
        { name: 'cargo run', syntax: 'cargo run', desc: "Compile puis execute le binaire du projet." }
      ]
    }
  ]
});

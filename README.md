Jaskier
“You and YOU ALONE are in charge of what happens in this story”

Quoi ? 

Je souhaite mettre en place une histoire interactive dont le lecteur serait le héro. Ce type d’histoires, également appelées CYOA pour Choose Your Own Adventure, ne sont pas à lire du début à la fin, comme on pourrait avoir l’habitude de faire avec un livre normal ! En effet, il sera fréquemment demandé au lecteur de faire des choix, qui peuvent avoir des circonstances positives ou négatives, voir même les conduire à un “Game Over” !

Le vrai avantage de ces histoires passe par l’engagement auprès du lecteur. En effet, en lui permettent d’être son propre aventurier et donc d’être lui même le responsable de ses bienfaits (ou de ses déconvenues), on s’assure qu’il lira avec attention l’histoire, pèsera bien le pour et le contre de chacun de ses choix et se sentira directement concerné par ceux-ci. 

L’objectif initial est de pouvoir permettre à un utilisateur de “jouer” à une histoire (ou plutôt quelques chapitres) déjà rédigés. Il lui sera possible de créer une nouvelle partie en se connectant avec son compte, de sauvegarder et charger une partie, ainsi que de laisser une note ou un commentaire à la fin de l’histoire. Cette dernière sera basée sur l’univers de la série à succès : The Witcher et s'intitulera “Jaskier”


Comment ? 

Méthodes de conception :
Pour assurer une présence digitale, “Jaskier” se présentera sous la forme d’un site web sur lequel on pourra participer à son aventure en effectuant ses choix directement sur son ordinateur.
Technologie(s) employée(s) :
Le site sera développé en utilisant un framework JavaScript qui est basé sur la ré-usabilité de ses composants React. Dans un premier temps il semblait convenir de mettre en place un back-end en Node.js afin de communiquer avec une base de données (tel que MongoDB). Finalement j’ai opté pour une solution beaucoup plus simple qui me permet de ne pas développer de back-end ni de mettre en place de BDD. J'utiliserai donc le système de stockage de Google Firebase. 

Objectifs plus long terme : 
Je souhaiterai mettre en place une vraie plateforme de jeux CYOA ou les utilisateurs pourraient rédiger leurs propres histoires et faire jouer leurs amis. Elle serait composée de plusieurs fonctionnalités telles que la possibilité de créer, modifier ou supprimer une histoire, des chapitres ainsi que des pages.
Les pages seraient du même ordre qu’on pourrait les voire dans un livre, il faudrait donc qu’elles aient la possibilité d’être pré-définies en différents types. Par exemple, les pages d’un livre CYOA ne présentent pas toutes de choix au lecteur; certaines sont juste informatives, d’autres peuvent avoir des images, etc. 

Il faudra donc mettre en place un système de gestion de rôles. En effet, tous ne seront pas forcément autorisé à administrer la plateforme. Certains pourront créer, modifier ou éditer des histoires ou des chapitres tandis que d’autres ne seront que des joueurs. 

Les “joueurs”, quant à eux pourraient choisir leurs livres comme ils pourraient le faire dans une bibliothèque normale. L’effet recherché serait de les afficher dans un style similaire à Netflix, qui est engageant et parle à tout le monde. 

“Jaskier” serait alors comme une “bibliothèque” virtuelle de livres CYOA !

Je souhaite également pouvoir rendre les histoires plus dynamiques en y ajoutant de la 3D a la place d’images plus classiques qui s’affichent dans certains cas. Pour ce faire il faudrait que j’en apprenne plus sur le Web-GL ainsi que la librairie JS Three.js
Inspiration : 
Inspiré des nombreux romans CYOA que j’ai pu lire durant mon enfance, j’en ai reçu un autre pour les fêtes de fin d’année, ce qui m’a donné l’idée. Cela m’a également permis de faire face à un constat: on lit de moins en moins de livres au format papier. J’ai donc eu envie de redonner un peu de fraîcheur à ces derniers en les proposant en format digital. 

“Jaskier” est également le nom du conteur de “The Witcher”. Ce nom correspond parfaitement à l’idée voulue de l’histoire de base, mais également de la plate-forme. En effet, dans la série, celui-ci fabule et embellit les aventures de Geralt. Ces histoires varient également suivant l’audience à qui il s’adresse. Cela me permet donc d’avoir un nom cohérent avec l’objectif de base qui est de rédiger une simple histoire à afficher aux utilisateurs, mais également d’aborder le futur plus sereinement avec un nom qui colle à l’objectif plus évolué de la plateforme. 


Évolutions envisagées : 

V1 - Jaskier est une histoire sur l’univers de “The Witcher”  : 
Connexion / Enregistrement (Email, Username)

Lancement d’une partie (Possibilité de charger une histoire)

Jouer la partie 
Écrans de jeu
Faire des choix et redirection vers la suite de l’histoire
Gestion d’un inventaire
Sauvegarder une partie
Fin de partie (Win / Game Over)
Recommencer partie
Laisser une note / commentaire
V2 - Jaskier devient une plateforme de jeux CYOA :
Gestion de roles 
Admin : Peut tout faire
Créateur : Ajouter / Editer / Supprimer ses Histoires / Chapitres
Joueur : Afficher la liste de jeux et jouer

Ajouter / Éditer / Supprimer (Histoires et Chapitres)

Créateur de Pages (dans les chapitres) 
Plusieurs formats : 
Narration 
Narration w/ image
Oui / Non 
Oui / Non w/ image
Choix 
Choix w/ image

Affichage de la liste de tous les jeux 


V3 : 
Ajout d’une librairie d’éléments 3D sélectionnables dans le créateur

Réorganisation de l’affichage jeux 
Genre
Recherche par titre ou auteur
Slider Netflix-like

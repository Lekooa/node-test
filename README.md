# Projet type test technique de LEKOOA

## Problème : Synchronisation de données

Ici le problème est simple, nous avons une liste d'utilisateurs que nous devons mettre à jour à partir des données d'une API externe.

Pour cela vous devez récupérer la liste des utilisateurs de votre base de données, ainsi que la liste des utilisateurs de l'API externe.
Il faut ensuite mettre à jour votre liste avec les données de l'API Externe.

<center><b>⚠️ ATTENTION! ⚠️</b></center>

Il est important de ne pas seulement écraser les données.
En effet, vous pouvez avoir des utilisateurs créés depuis votre application, ne nécessitant donc pas de synchronisation par API.

Pour les différencier, un utilisateur synchronisé possède un champ `id_ext` soit Identifiant Externe en plus du champ `id`. Ce n'est donc pas le cas pour un utilisateur non synchronisé

Pour simplifier le développement, l'API externe est simulée sous la route `/simulatedApi`.
Vous retrouverez la liste des vos utilisateurs sous la route `/users`

Comment faire si je fais une erreur sur mes données ? 🤨 => Utilisez la route `/reset` pour remettre la base de données à son état initial! 😊

## Comment faire?

Vous utiliserez un serveur Node.JS déjà mis en place (`app.js`) ainsi que le service `UserService` dans `services/user-service.js`.
Libre à vous de créer de nouveaux fichiers ou fonctions dans les fichiers existants.

Par soucis de simplicité le code de la synchronisation peut s'éxécuter à chaque lancement du serveur (On ferait normalement un CRON job pour lancer la synchro par exemple tous les jours à 1h du matin).
Vous pouvez donc lancer la synchro dans la partie suivante du code de `app.js` :
```js
app.listen(8080, 'localhost', () => {
    /* JUSTE ICI */
})
```

Il est également possible de créer une route, par exemple :
```js
app.get('/synchro', (req, res) => {
    /* LANCER LA SYNCHRO */
    res.status(200).json({message: "Synchro terminée"})
})
```

Pour lancer le serveur il suffit de lancer la commande `npm start`.

Pour lancer les tests unitaires, `npm test`

⚠️ Il vous est demandé de remplir le test `#SYNCHRO` dans le fichier `test/test.js` une fois votre synchro terminée.
En effet il faut lancer la synchro afin de la tester (Et nous n'obligeons pas à créer un `SynchroService` comme fait dans les commentaires, vous êtes libres de faire comme vous le souhaitez)

## Format des données :

Les données sont au format JSON.

Pour notre BD, un `user` est comme suit :
```json
{
    "firstName": "Prenom",
    "lastName": "Nom",
    "email": "unmail@test.com",
    "id_ext": "IDENTIFIANT_EXTERNE"
}
```

Il fait parti d'un objet Firebase `users` qui est donc comme suit :
```json
"users" : {
    "IDENTIFIANT_FIREBASE1": {
        "firstName": "Prenom",
        "lastName": "Nom",
        "email": "unmail@test.com",
        "id_ext": "IDENTIFIANT_EXTERNE"
    },
    "IDENTIFIANT_FIREBASE2": {
        ...
    }
}
```

L'identifiant d'un utilisateur est en fait sa `key` dans l'objet supérieur stocké sur Firebase

Un identifiant Firebase peut par exemple être : `-L33K7bpaCoMT8mEwMFf`

C'est une chaîne de caractère générée automatiquement par Firebase lors d'un `push` => [En savoir plus](https://firebase.google.com/docs/database/admin/save-data)

Pour la BD distante, leur doc nous donne ce format pour un `user` :
```json
{
    "prenom": "Prenom",
    "nom": "Nom",
    "adresses": {
        "email": "unmail@test.com",
        "domicile": "Une adresse"
    },
    "id": "NOM-PRENOM",
}
```

# Happy coding!
# Création du frontend nextjs

Création du répertoire de l'application `app`

```shell
# executer dans app-nextjs-node-ts

cd packages && mkdir app && cd "$_"
```

Création du fichier `package.json` dans le repertoire `app-nextjs-node-ts/packages/app`

```json
{
  "name": "@socialgouv/app",
  "version": "1.0.0",
  "main": "index.js",
  "author": "Incubateur des Ministères Sociaux <dsi-incubateur@sg.social.gouv.fr> (https://incubateur.social.gouv.fr)",
  "license": "Apache-2.0",
  "private": true
}
```

Ajout de fichier `LICENSE` dans le repertoire `app-nextjs-node-ts/packages/app`

```shell
# executer dans app-nextjs-node-ts/packages/app

cp ../../LICENSE .
```

><https://nextjs.org/learn/basics/getting-started>

Ajout des dépendances de `react`, `react-dom` et `nextjs`

```shell
# executer dans app-nextjs-node-ts/packages/app

yarn add react react-dom next
```

Création du repertoire `pages` dans `app-nextjs-node-ts/packages/app`

```shell
# executer dans app-nextjs-node-ts/packages/app

mkdir pages && cd "$_"
```

Création du fichier `index.js` dans `app-nextjs-node-ts/packages/app/pages`

```javascript
function Home() {
  return <div>Social Gouv!</div>
}

export default Home
```

Modification de fichier `package.json` dans `app-nextjs-node-ts/packages/app` (ajout des scripts)

```json
{
  // ...
  "private": true,
  "scripts": { // <----- AJOUT DES SRIPTS
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    // ...
}
```

Vérification de l'accessibilité de l'application next

```shell
# executer dans app-nextjs-node-ts

yarn workspace @socialgouv/app dev

# http://localhost:3000 doit être accessible
```

Ajout du fichier `.gitignore` dans `app-nextjs-node-ts/packages/app`

```gitignore
.next
.node_modules
yarn-error.log
```

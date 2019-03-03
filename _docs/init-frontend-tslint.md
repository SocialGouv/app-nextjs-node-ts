# Configuration de tslint

```shell
yarn workspace @socialgouv/app add -D @socialgouv/tslint-config-recommended tslint prettier
```

Ajout du fichier `tslint.json` dans `app-nextjs-node-ts/packages/app/`

```json
{
  "extends": ["@socialgouv/tslint-config-recommended"]
}
```

Ajout du script `lint` dans le fichier `app-nextjs-node-ts/packages/app/package.json`

```json
{
  // ...
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "lint": "tslint -p tsconfig.json -t stylish" // <---- SCRIPT A AJOUTER
  },
  //...
}
```

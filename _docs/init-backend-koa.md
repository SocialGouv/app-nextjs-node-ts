# Création du backend Koa

Création du répertoire de l'application `api`

```shell
# executer dans app-nextjs-node-ts

cd packages && mkdir api && cd "$_"
```

Création du fichier `package.json` dans le repertoire `app-nextjs-node-ts/packages/app`

```json
{
  "name": "@socialgouv/api",
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

Ajout des dépendances de `koa`

```shell
# executer dans app-nextjs-node-ts/packages/api

yarn add @koa/cors koa koa-bodyparser koa-router
```


Configuration de typescript

```shell
# executer dans app-nextjs-node-ts

yarn workspace @socialgouv/api add -D typescript @types/node @types/koa @types/koa-bodyparser @types/koa-router @types/koa__cors nodemon ts-node
```

Configuration de typescript, ajout du fichier `tsconfig.json` dans `app-nextjs-node-ts/packages/api`

```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    // "jsx": "preserve",
    "lib": [
      "es2017"
    ],
    "module": "commonjs",
    "moduleResolution": "node",
    "noEmit": false,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "outDir": "dist",
    "preserveConstEnums": true,
    "removeComments": false,
    "skipLibCheck": true,
    "rootDir": "src",
    "sourceMap": true,
    "strict": true,
    "target": "esnext"
  }
}
```

Configuration de tslint

```shell
yarn workspace @socialgouv/api add -D @socialgouv/tslint-config-recommended tslint prettier
```

Ajout du fichier `tslint.json` dans `app-nextjs-node-ts/packages/api/`

```json
{
  "extends": ["@socialgouv/tslint-config-recommended"]
}
```

création du fichier `src/server.ts`

```typescript
import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';

const app = new Koa();

app.use(bodyParser());
app.use(cors());

const routeOptions: Router.IRouterOptions = {
    prefix: '/api'
}

const router = new Router(routeOptions);

router.get(`/hello-world`, (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.body = 'Hello World!!'
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(1337);

```

Modification de fichier `package.json` dans `app-nextjs-node-ts/packages/api` (ajout des scripts)

```json
{
  // ...
  "private": true,
  "scripts": { // <----- AJOUT DES SRIPTS
    "scripts": {
        "dev": "nodemon --watch 'src/**/*' -e ts --exec ts-node src/server.ts",
        "build": "tsc",
        "lint": "tslint -p tsconfig.json -t stylish"
    },
  },
  "dependencies": {
    // ...
}
```

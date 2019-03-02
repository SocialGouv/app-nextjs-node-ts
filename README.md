# Sommaire

1. [Initialisation du projet en monorepo](_docs/init-monorepo.md)
2. [Création du frontend NextJS](_docs/init-app-nextjs.md)

## Création du projet



### Configuration de typescript avec nextjs

```shell
# executer dans app-nextjs-node-ts

yarn workspace @socialgouv/app add -D @zeit/next-typescript typescript tslint @types/next @types/react
```

Ajout du fichier `tsconfig.json` dans `app-nextjs-node-ts/packages/app`

```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "preserve",
    "lib": ["dom", "es2017"],
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "preserveConstEnums": true,
    "removeComments": false,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "target": "esnext"
  }
}
```

Ajout du fichier `next.config.js` dans `app-nextjs-node-ts/packages/app`

```javascript
// next.config.js
const withTypescript = require('@zeit/next-typescript');
module.exports = withTypescript();
```

ajout du fichier `babel.config.js` dans `app-nextjs-node-ts/packages/app/`

```javascript
module.exports = {
  "presets": [
    "next/babel",
    "@babel/preset-typescript",
  ],
};

```

Modifier l'extension' du fichier `index.js` dans `app-nextjs-node-ts/packages/app/pages`

```shell
mv ./packages/app/pages/index.js ./packages/app/pages/index.tsx
```

Modifier le fichier `index.tsx`

```typescript
import * as React from 'react';

interface HomeProps {
}

interface HomeState {
  city: string;
}

class Home extends React.Component<HomeProps, HomeState> {

  constructor(props: HomeProps) {
    super(props);
    this.state = { city: '' }
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <label>Dans quelle ville se trouve le 8Fablab?</label>
        <select value={this.state.city} onChange={this.handleChange}>
          <option value=""></option>
          <option value="Crest">Crest</option>
          <option value="Die">Die</option>
          <option value="Saillans">Saillans</option>
        </select>
        <br/>
        <br/>
        <label>Le 8fabLab se situe à {this.state.city}</label>
      </div>
    );
  }

  handleChange(event: any) {
    this.setState({city: event.target.value});
  }

}

export default Home;

```

Relancer l'application

```shell
# executer dans app-nextjs-node-ts

yarn workspace @socialgouv/app dev

# http://localhost:3000 doit être accessible
```

### Configuration de tslint

```shell
# executer dans app-nextjs-node-ts/packages/app

yarn add -D @socialgouv/tslint-config-recommended tslint prettier
```

Ajout du fichier `tslint.js`dans `app-nextjs-node-ts/packages/app/`

```json
{
  "extends": ["@socialgouv/tslint-config-recommended"]
}

```

Ajout du script `lint` dans le fichier `app-nextjs-node-ts/packages/app/package.json`

```json
{
  "name": "@socialgouv/app",
  "version": "1.0.0",
  "main": "index.js",
  "author": "Incubateur des Ministères Sociaux <dsi-incubateur@sg.social.gouv.fr> (https://incubateur.social.gouv.fr)",
  "license": "Apache-2.0",
  "private": true,
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "lint": "tslint -p tsconfig.json -t stylish"
  },
  "dependencies": {
    "next": "^8.0.1",
    "react": "^16.8.2",
    "react-dom": "^16.8.2"
  },
  "devDependencies": {
    "@types/next": "^8.0.1",
    "@types/react": "^16.8.4",
    "@zeit/next-typescript": "^1.1.1",
    "tslint": "^5.12.1",
    "typescript": "^3.3.3"
  }
}

```

### Configuration de Jest

><https://jestjs.io/docs/en/getting-started#using-typescript>

Ajout de la dépendance `jest`

```shell
yarn workspace @socialgouv/app add --dev jest
```

Ajout des dépendances pour `babel`

```shell
yarn workspace @socialgouv/app add --dev babel-jest @babel/core @babel/preset-env @babel/preset-typescript
```

ajout du fichier `babel.config.js` dans `app-nextjs-node-ts/packages/app/`

```javascript
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],
};
```

Ajout de la dépendance `@types/jest`

```shell
yarn workspace @socialgouv/app add --dev @types/jest
```

Ajout de la configuration `jest`

><https://jestjs.io/docs/en/configuration>

```javascript
// jest.config.js

module.exports = {
  verbose: true
};
```

Ajout du script de test dans `app-nextjs-node-ts/packages/app/package.json`

```json
{
// ...
"scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "lint": "tslint -p tsconfig.json -t stylish",
    "test": "jest ./_tests_" // <=== SCRIPT A AJOUTER
  }
}
// ...
```

Ajout du script de test node dans `app-nextjs-node-ts/package.json`

```json
{
  // ...
  "scripts": {
    "build": "lerna run build",
    "dev": "lerna run dev --parallel",
    "lint": "lerna run lint --parallel",
    "start": "lerna run start --parallel",
    "test": "lerna run test --parallel" // <=== SCRIPT A AJOUTER
  },
  // ...
}
```

### Vérification du bon fonctionnement de `jest` avec `typescript`

Création d'un repertoire `src` et des fichiers `src/sum.js`, `src/sum.ts`  à la racine de `app`

```shell
mkdir src && cd "$_"
touch sum.js
touch sum.ts
```

```javascript
// sum.js
function sum(a, b) {
    return a + b;
  }
  
module.exports = sum;
```

```javascript
// sum.ts
function sum(a: number, b: number): number {
    return a + b;
  }
  
  export default sum;
```

Création d'un repertoire `test` et des fichiers `test/sum.test.js`, `test/sum.test.ts` à la racine de `app`

```shell
mkdir _tests_ && cd "$_"
touch sum.test.js
touch sum.test.ts
```

```javascript
// sum.test.js
it('adds 1 + 2 to equal 3 in Typescript', () => {
    const sum = require('../src/sum.ts').default;
    expect(sum(1, 2)).toBe(3);
  });
  
  it('adds 1 + 2 to equal 3 in JavaScript', () => {
    const sum = require('../src/sum.js');
    expect(sum(1, 2)).toBe(3);
  });
  ```

```javascript
// sum.test.jts

it('adds 1 + 2 to equal 3 in TScript', () => {
  const sum = require('../src/sum.ts').default;
  expect(sum(1, 2)).toBe(3);
});

it('adds 1 + 2 to equal 3 in JavaScript', () => {
  const sum = require('../src/sum.js');
  expect(sum(1, 2)).toBe(3);
});
```

Vérification des tests

```shell
# executer dans app-nextjs-node-ts
yarn test
```

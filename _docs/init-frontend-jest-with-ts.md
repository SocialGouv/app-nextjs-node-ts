# Configuration de Jest

><https://jestjs.io/docs/en/getting-started#using-typescript>

Ajout de la dépendance `jest`

```shell
yarn workspace @socialgouv/app add --dev jest
```

Ajout des dépendances pour `babel`

```shell
yarn workspace @socialgouv/app add --dev babel-jest
```

Ajout de la dépendance `@types/jest`

```shell
yarn workspace @socialgouv/app add --dev @types/jest
```

Configuration de `jest`, ajout du fichier `jest.config.js`

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

## Vérification du bon fonctionnement de `jest` avec `typescript`

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
// sum.test.ts

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

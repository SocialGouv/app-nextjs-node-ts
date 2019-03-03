# Configuration de Jest

><https://jestjs.io/docs/en/getting-started#using-typescript>

Ajout de la dépendance `jest`, `babel-jest` et `@types/jest`

```shell
yarn workspace @socialgouv/app add --dev jest babel-jest @types/jest
```

Configuration de `jest`, ajout du fichier `jest.config.js`

><https://jestjs.io/docs/en/configuration>

```javascript
const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
}
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
    "test": "jest" // <=== SCRIPT A AJOUTER
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

Création des fichiers `src/utils/sum.js`, `src/utils/sum.ts`  à la racine de `app`

```shell
mkdir -p src/utils && cd "$_"
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

Création des fichiers `src/utils/_tests_/sum.test.js`, `src/utils/_tests_/sum.test.ts` à la racine de `app`

```shell
mkdir -p src/utils/_tests_ && cd "$_"
touch sum.test.js
touch sum.test.ts
```

```javascript
// sum.test.js
it('adds 1 + 2 to equal 3 in Typescript', () => {
    const sum = require('../sum.ts').default;
    expect(sum(1, 2)).toBe(3);
  });
  
  it('adds 1 + 2 to equal 3 in JavaScript', () => {
    const sum = require('../sum.js');
    expect(sum(1, 2)).toBe(3);
  });
  ```

```javascript
// sum.test.ts
it('adds 1 + 2 to equal 3 in TScript', () => {
  const sum = require('../sum.ts').default;
  expect(sum(1, 2)).toBe(3);
});

it('adds 1 + 2 to equal 3 in JavaScript', () => {
  const sum = require('../sum.js');
  expect(sum(1, 2)).toBe(3);
});
```

Vérification des tests

```shell
# executer dans app-nextjs-node-ts
yarn test
```

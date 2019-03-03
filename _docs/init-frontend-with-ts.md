# Configuration de typescript avec NextJS

```shell
# executer dans app-nextjs-node-ts

yarn workspace @socialgouv/app add -D @zeit/next-typescript typescript @types/next @types/react @types/react-dom
```

Configuration de typescript, ajout du fichier `tsconfig.json` dans `app-nextjs-node-ts/packages/app`

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
    "@zeit/next-typescript/babel"
  ],
};
```

Nous allons maintenant, tester le bon fonctionnent de NextJS en typescript.

Ajout de fichier `ClairetteOrigin.tsx` au même niveau dans `app-nextjs-node-ts/packages/app/src/components`

```typescript
import * as React from 'react';

interface ClairetteOriginState {
  origin: string;
}

class ClairetteOrigin extends React.Component<void, ClairetteOriginState> {

  constructor(props: void) {
    super(props);
    this.state = { origin: '' }
    this.handleChange = this.handleChange.bind(this);
  }

  public render() {
    return (
      <div>
        <label>Dans quel département est produite la Clairette de Die</label>
        <select value={this.state.origin} onChange={this.handleChange}>
          <option value=""></option>
          <option value="drome">Drôme</option>
          <option value="cotedor">Cote d'or</option>
          <option value="gironde">Gironde</option>
        </select>
        <br/>
        <br/>
        {(this.state.origin && this.state.origin === 'drome') && <span>VRAI</span>}
        {(this.state.origin && this.state.origin !== 'drome') && <span>FAUX</span>}
        <br/>
        <br/>
        {this.state.origin && <a href="https://fr.wikipedia.org/wiki/Clairette-de-die" target="_BLANK">La clairette de Die est produite dans la Drôme</a>}
      </div>
    );
  }

  private handleChange(event: any) {
    this.setState({origin: event.target.value});
  }

}

export default ClairetteOrigin;
```

Modification du fichier `index.js`

```javascript
import ClairetteOrigin from '../src/components/ClairetteOrigin';

function Home() {
  return (
    <ClairetteOrigin></ClairetteOrigin>
  )
}

export default Home
```

Relancer l'application

```shell
# executer dans app-nextjs-node-ts

yarn workspace @socialgouv/app dev

# http://localhost:3000 doit être accessible
```

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

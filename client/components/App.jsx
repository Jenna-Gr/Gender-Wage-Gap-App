import React from 'react';
import axios from 'axios';
import DataDisplay from './dataDisplay.jsx';
// import AdobeLogo from '../dist/logos/adobe.png';
// import AmazonLogo from '../dist/logos/amazon.jpeg';
// import AppleLogo from '../dist/logos/apple.png';
// import FacebookLogo from '../dist/logos/facebook.png';
// import GoogleLogo from '../dist/logos/google.png';
// import IBMLogo from '../dist/logos/ibm.png';
// import MicrosoftLogo from '../dist/logos/microsoft.jpeg';
// import SpotifyLogo from '../dist/logos/spotify.png';
// import TeslaLogo from '../dist/logos/tesla.png';
// import VMwareLogo from '../dist/logos/vmware.jpeg';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      companies: ['Adobe', 'Amazon', 'Apple', 'Facebook', 'Google', 'IBM', 'Microsoft', 'Spotify', 'Tesla', 'VMware'],
      allAvgs: [],
      companyAvgs: [],
      selection: {
        company: null,
        gender: null,
        experienceLevel: null
      }
    };
    this.getAll = this.getAll.bind(this);
    this.handleCompanyClick = this.handleCompanyClick.bind(this);
  }

  getAll() {
    axios.get('http://localhost:3000/api/average')
      .then((response) => {
        this.setState({
          allAvgs: response.data
        })
      })
      .catch(function (error) {
        console.log('error fetching', error);
      });
  }

  handleCompanyClick(e) {
    console.log(e.target.innerText);
    for (var i = 0; i < this.state.allAvgs.length; i++) {
      if (this.state.allAvgs[i]._id.company === e.target.innerText) {
        console.log('match: ', this.state.allAvgs[i]);
        this.setState({
          companyAvgs: this.state.companyAvgs.concat(this.state.allAvgs[i]),
          selection: {
            company: this.state.allAvgs[i]._id.company
          }
        });
      }
    }
  }

  componentDidMount() {
    this.getAll();
  }

  render () {
    return (
      <div>
        <h1>GENDER WAGE GAP APP!</h1>
        <h3>Select a company to start.</h3>
        {this.state.companies.map((company) =>
          <button onClick={this.handleCompanyClick}>{company}</button>
        )}

        <DataDisplay avgObjects={this.state.companyAvgs} />

        <h3>Then, see how salaries compare by selecting an experience level.</h3>
      </div>
    )
  }
};

export default App;
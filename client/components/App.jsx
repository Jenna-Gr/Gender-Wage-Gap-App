import React from 'react';
import axios from 'axios';
import DataDisplay from './dataDisplay.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      companies: ['Adobe', 'Amazon', 'Apple', 'Facebook', 'Google', 'IBM', 'Microsoft', 'Spotify', 'Tesla', 'VMware'],
      allAvgs: [],
      selectedCompany: null,
      selectedExp: null,
      selectedCompFem: null,
      selectedCompanyMa: null,
      selectedCompanyOth: null
    };
    this.getAll = this.getAll.bind(this);
    this.getFemale = this.getFemale.bind(this);
    this.getMale = this.getMale.bind(this);
    this.getOther = this.getOther.bind(this);
    this.handleCompanyClick = this.handleCompanyClick.bind(this);
    this.handleNewClick = this.handleNewClick.bind(this);
    this.handleMidClick = this.handleMidClick.bind(this);
    this.handleExpClick = this.handleExpClick.bind(this);
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

  getFemale(company, experience) {
    axios.get(`http://localhost:3000/api/compensation?company=${company.trim()}&gender=female&experienceLevel=${experience}`)
    .then((response) => {
      console.log('fem res:', response.data.averageSalary);
      this.setState({
        selectedCompFem: response.data.averageSalary
      })
    })
    .catch((error) => {
      console.log('error fetching male:', error);
    })
  }

  getMale(company, experience) {
    axios.get(`http://localhost:3000/api/compensation?company=${company.trim()}&gender=male&experienceLevel=${experience}`)
    .then((response) => {
      console.log('male res:', response.data.averageSalary);
      this.setState({
        selectedCompanyMa: response.data.averageSalary
      })
    })
    .catch((error) => {
      console.log('error fetching male:', error);
    })
  }

  getOther(company, experience) {
    axios.get(`http://localhost:3000/api/compensation?company=${company.trim()}&gender=other&experienceLevel=${experience}`)
    .then((response) => {
      console.log('other res:', response.data.averageSalary);
      this.setState({
        selectedCompanyOth: response.data.averageSalary
      })
    })
    .catch((error) => {
      console.log('error fetching other:', error);
    })
  }

  handleCompanyClick(e) {
    console.log(e.target.innerText);
    this.setState({
      selectedCompany: e.target.innerText
    })
  }

  handleNewClick() {
    this.setState({
      selectedExp: 'newGrad'
    })
    this.getFemale(this.state.selectedCompany, 'newGrad');
    this.getMale(this.state.selectedCompany, 'newGrad');
    this.getOther(this.state.selectedCompany, 'newGrad');
  }

  handleMidClick() {
    this.setState({
      selectedExp: 'midLevel'
    })
    this.getFemale(this.state.selectedCompany, 'midLevel');
    this.getMale(this.state.selectedCompany, 'midLevel');
    this.getOther(this.state.selectedCompany, 'midLevel');
  }

  handleExpClick(e) {
    this.setState({
      selectedExp: 'expert'
    })
    this.getFemale(this.state.selectedCompany, 'expert');
    this.getMale(this.state.selectedCompany, 'expert');
    this.getOther(this.state.selectedCompany, 'expert');
  }

  componentDidMount() {
    this.getAll();
  }


  render () {
    return (
      <div>
        <h1>GENDER WAGE GAP APP</h1>
        <h3>Select a company to start.</h3>
        {this.state.companies.map((company) =>
          <button onClick={this.handleCompanyClick}>{company}</button>
        )}
        <h3>Then, see how salaries compare by selecting an experience level.</h3>
        <h4>New Grad = 0-1 years experience</h4>
        <h4>MidLevel = 2-4 years experience</h4>
        <h4>Senior = 5+ years experience</h4>
        <button onClick={this.handleNewClick}>New Grad</button>
        <button onClick={this.handleMidClick}>MidLevel</button>
        <button onClick={this.handleExpClick}>Senior</button>

        <DataDisplay company={this.state.selectedCompany} experience={this.state.selectedExp} female={this.state.selectedCompFem} male={this.state.selectedCompanyMa} other={this.state.selectedCompanyOth} />

      </div>
    )
  }
};

export default App;
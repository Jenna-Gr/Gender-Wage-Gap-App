import React from 'react';
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


var DataDisplay = (props) => {
  if (props.company === null || props.experience === null) {
    return(
      <div></div>
    )
  } else {
    return(
      <div>
        <div>
          <h4>Average Female {props.experience} Software Engineer Salary: </h4>
          <h4>${props.female}</h4>
        </div>
        <div>
          <h4>Average Male {props.experience} Software Engineer Salary: </h4>
          <h4>${props.male}</h4>
        </div>
        <div>
          <h4>Average Other {props.experience} Software Engineer Salary: </h4>
          <h4>${props.other}</h4>
        </div>
      </div>
    )
  }
}

export default DataDisplay;

import React from 'react';


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
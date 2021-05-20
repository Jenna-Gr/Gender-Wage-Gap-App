
import React from 'react';


var DataDisplay = ({avgObjects}) => {
  if (avgObjects.length === 0) {
    return(
      <div></div>
    )
  } else {
    console.log(avgObjects);
    return(
      <div>
        {avgObjects.map((obj) => {
          return(
            <div>
              <span>Company: {obj._id.company}</span>
              <span>Gender: {obj._id.gender}</span>
              <span>Average Salary: {parseInt(obj.avgSalary)}</span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default DataDisplay;
import React from 'react';
import loadingSpinner from './RollingSpinner-1s-200px.svg';

import './Styles.scss';

const Button = (props) => {

  return (
    <div className={"submitButton"} onClick={props.handleSubmit} >
      {props.label}
      { props.loadingSpinner && 
        <img className="submitButton--loading" src={loadingSpinner} alt="loading" />
      }
    </div>
  )
}

export default Button;
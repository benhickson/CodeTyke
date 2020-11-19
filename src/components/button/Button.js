import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

import './Styles.scss';

const Button = (props) => {
  // Note for class: We had to break from the && pattern because ("submitButton" + false) yields "submitButtonfalse"
  const classes = ['submitButton'];
  if (props.hasIcons) classes.push('hasIcons');
  if (props.enabled !== false) classes.push('enabled');

  return (
    <div className={classes.join(' ')} onClick={props.handleSubmit} >
      <div className="placeholder"></div>
      <div className="submitButton--label">{props.label}</div>
      <div className="icon">
        {props.showLoader && <FontAwesomeIcon icon={faSync} className="spinningLoader" />}
      </div>
       
    </div>
  )
}

export default Button;
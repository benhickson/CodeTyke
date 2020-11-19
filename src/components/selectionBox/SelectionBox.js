import React from 'react';

import './Styles.scss';

const SelectionBox = (props) => {
  // Note for class: We had to break from the && pattern because ("submitButton" + false) yields "submitButtonfalse"
  const classes = ['selectionBox'];
  if (props.checked)    classes.push('checked');
  if (props.incorrect)  classes.push('incorrect');
  if (props.locked)     classes.push('locked');

  return(
    <div
      className={classes.join(' ')}
      id={"selectionBox" + props.id}
      onClick={() => props.click(props.id)}
    >
      <img className="selectionBox--image" alt={props.answer.imageAlt} src={props.answer.image} />
      <input className="selectionBox--checkbox" type="checkbox" checked={props.checked} onChange={() => null} />
      <span className="selectionBox--text">{props.answer.text}</span>
    </div>
   )
}

export default SelectionBox;

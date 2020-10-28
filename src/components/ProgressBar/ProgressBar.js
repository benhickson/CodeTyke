import React from 'react';
import PropTypes from 'prop-types';
import './Styles.scss';

const ProgressBar = ({text, completedPercent}) => (
  <div className="progressBar">
    <div className="progressBar--unfilled-bar">
      <div className={ `progressBar--fill${
        completedPercent === 100 ? ' progressBar--fill--completed' : '' 
      }` } style={ {width: `${completedPercent}%`} }>
        <span>{ text }</span>
      </div>
    </div>
  </div>
);

ProgressBar.propTypes = {
  text: PropTypes.string,
  completedPercent: PropTypes.number,
};

ProgressBar.defaultProps = {
  text: '45% Complete',
  completedPercent: 45,
};

export default ProgressBar;

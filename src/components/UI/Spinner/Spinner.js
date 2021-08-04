import React from 'react';
import './Spinner.scss';

const Spinner = props => {
  return (
      <div className={props.wrapperClass}>
        <div className={props.classes}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>

  )
}

export default Spinner;
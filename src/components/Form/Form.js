import React from 'react';
import './Form.scss';

const Form = props => {
  const handleChangeOwner = event => {
    props.onChangeOwner(event.target.value);
  }

  const handleChangeName = event => {
    props.onChangeName(event.target.value);
  }

  return (
    <form className="form">
      <div className="form__wrapper">
        <label htmlFor="owner">Enter repository owner</label>
        <input id="owner" type="text" placeholder="Owner..." onChange={handleChangeOwner} />
      </div>
      <div className="form__wrapper">
        <label htmlFor="repo-name">Enter repository name</label>
        <input id="repo-name" type="text" placeholder="Name..." onChange={handleChangeName}/>
      </div>
      <button>Find</button>
    </form>
  )
}

export default Form;
import React from 'react';
import './Form.scss';

const Form = props => {
  const handleSubmit = e => {
    e.preventDefault();
    props.fetchRepositoryInfo();
  }

  const errorMessageClasses = ['error-message'];
  if (props.error) {
    errorMessageClasses.push('error-message--active');
  }
  return (
    <>
      <div className={errorMessageClasses.join(' ')}>{props.error}</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__wrapper">
          <label htmlFor="token">Enter Github token</label>
          <input 
          id="token" type="password" placeholder="Token..." 
          onChange={(event) => props.onChangeStepOneInfo(event.target.id, event.target.value)} />
        </div>
        <div className="form__wrapper">
          <label htmlFor="owner">Enter repository owner</label>
          <input id="owner" type="text" placeholder="Owner..." 
          onChange={(event) => props.onChangeStepOneInfo(event.target.id, event.target.value)} />
        </div>
        <div className="form__wrapper">
          <label htmlFor="repo-name">Enter repository name</label>
          <input id="repository" type="text" placeholder="Name..." 
          onChange={(event) => props.onChangeStepOneInfo(event.target.id, event.target.value)}/>
        </div>
        <button type="submit">Find</button>
      </form>
    </>
  )
}

export default Form;
import React from 'react';
import './IssuesCard.scss';

const IssuesCard = ({title, text, comments, url, id, setModalActive, setChoosenIssue}) => {
  
  return (
    <div className="issue-card" id={id}>
      <div className="issue-card__title"><h3>Title:</h3> {title}</div>
      <div className="issue-card__text"><h3>Text</h3>: {text}</div>
      <div className="issue-card__comments"><h3>Comments number</h3>: {comments}</div>
      <div className="issue-card__url"><h3>Issue URL:</h3> <a href={url}>{url}</a></div>
      <div className="issue-card__button-container">
      <button 
        className="issue-card__btn"
        onClick={() => {
          setModalActive(true);
          setChoosenIssue({
            title,
            id
          })
        }}
      >
      Leave comment</button>
      </div>
    </div>
  )
}

export default IssuesCard;


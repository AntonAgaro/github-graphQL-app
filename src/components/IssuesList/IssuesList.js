import React from 'react';
import IssuesCard from '../IssuesCard/IssuesCard';
import './IssuesList.scss';

const IssuesList = ({issues, startNewSearch, modalActive, setModalActive, setChoosenIssue, fetchRepositoryInfo, repositoryInfo}) => {

  const refreshRepositoryData = () => {
    const {token, owner, repository} = repositoryInfo;
    fetchRepositoryInfo(token, owner, repository);
  }

  return (
    <div className="issues-wrapper">
      <div className="issues-wrapper__button-container">
        <button 
          className="issues-wrapper__btn"
          onClick={startNewSearch}
        >New search</button>
        <button 
          className="issues-wrapper__btn"
          onClick={refreshRepositoryData}
        >Refresh</button>
      </div>
      {issues.map((item) => {
        const issue = item.node;
        return <IssuesCard 
                key={issue.id}
                id={issue.id}
                title={issue.title} 
                text={issue.bodyText}
                comments={issue.comments.edges.length}
                url={issue.url}  
                setModalActive={setModalActive}
                modalActive={modalActive}
                setChoosenIssue={setChoosenIssue}
                />
      })}
    </div>
  )
}

export default IssuesList;
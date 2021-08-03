import React, { useState } from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Spinner from './components/UI/Spinner';
import './App.scss';
import fetchData from './utils/fetchData';
import IssuesList from './components/IssuesList/IssuesList';

const App = () => {
  const [repositoryInfo, setRepositoryInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [issues, setIssues] = useState('');

  const onChangeStepOneInfo = (key, value) => {
    setRepositoryInfo((prev) => {
      return {...prev, [key]: value}
    })
  }

  const fetchRepositoryInfo = async () => {
    const {token, owner, repository} = repositoryInfo;
    setError('');
    setIsLoading(true);

    fetchData(token, owner, repository)
      .then(res => {
        if (!res.ok) {
          setIsLoading(false);
          setError(`Error while loading from url: ${res.url}. Correct the entered data!`);
          throw new Error(`Error! ${res.status}`);
        }
        return res.json();
      })
      .then(res => {
        setIssues(res.data);
        setIsLoading(false);
      })
      .catch(e => console.log(e));
  }

  const startNewSearch = () => {
    setIssues('');
  }

  const renderForm = () => {
    if (!issues.repository) {
      return (
        isLoading ? 
          <Spinner/> :
          <Form 
            error={error}
            fetchRepositoryInfo={fetchRepositoryInfo}
            onChangeStepOneInfo={onChangeStepOneInfo} 
        /> 
      )
    }
  }

  const renderIssuesList = () => {
    if (issues.repository) {
      return (
        <IssuesList 
          issues={issues.repository.issues.edges}
          startNewSearch={startNewSearch}
        />
      )
    }
  }

  console.log('Issues: ', issues);
  return (
      <div className="App">
        <Header/>
        {renderForm()}
        {renderIssuesList()}
      </div>
  );
}

export default App;

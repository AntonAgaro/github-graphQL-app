import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Spinner from './components/UI/Spinner/Spinner';
import Modal from './components/UI/Modal/Modal';
import './App.scss';
import fetchData from './utils/fetchData';
import IssuesList from './components/IssuesList/IssuesList';

const App = () => {
  const [repositoryInfo, setRepositoryInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [issues, setIssues] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [choosenIssue, setChoosenIssue] = useState({});

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
          <Spinner classes="lds-spinner" wrapperClass="spinner"/> :
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
          setModalActive={setModalActive}
          modalActive={modalActive}
          setChoosenIssue={setChoosenIssue}
        />
      )
    }
  }

  useEffect(() => {
    document.body.style.overflowY = modalActive ? 'hidden' : '';
  }, [modalActive])

  return (
      <div className="App">
        <Header/>
        {renderForm()}
        {renderIssuesList()}
        <Modal 
          active={modalActive} 
          setModalActive={setModalActive} 
          choosenIssue={choosenIssue}
          token={repositoryInfo.token}
        />
      </div>
  );
}

export default App;

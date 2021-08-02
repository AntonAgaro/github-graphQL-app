import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import './App.scss';
import fetchData from './utils/fetchData';

const App = () => {
  const [repositoryInfo, setRepositoryInfo] = useState({});

  const onChangeStepOneInfo = (key, value) => {
    setRepositoryInfo((prev) => {
      return {...prev, [key]: value}
    })
  }

  const fetchRepositoryInfo = () => {
    const {token, owner, repository} = repositoryInfo
    fetchData(token, owner, repository);
  }

  console.log('Info:', repositoryInfo);
  return (
    <div className="App">
      <Header/>
      <Form 
        fetchRepositoryInfo={fetchRepositoryInfo}
        onChangeStepOneInfo={onChangeStepOneInfo} 
      />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Spinner from './components/UI/Spinner';
import './App.scss';
import fetchData from './utils/fetchData';

const App = () => {
  const [repositoryInfo, setRepositoryInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onChangeStepOneInfo = (key, value) => {
    setRepositoryInfo((prev) => {
      return {...prev, [key]: value}
    })
  }

  console.log(error);

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
        console.log(res.data);
        setIsLoading(false);
      })
      .catch(e => console.log(e));
    
  }

  console.log('Info:', repositoryInfo);
  return (
    <div className="App">
      <Header/>
      {isLoading ? 
        <Spinner/> :
        <Form 
          error={error}
          fetchRepositoryInfo={fetchRepositoryInfo}
          onChangeStepOneInfo={onChangeStepOneInfo} 
      /> 
        }
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import './App.scss';
import fetchData from './utils/fetchData';

const App = () => {
  const [owner, setOwner] = useState('');
  const [name, setName] = useState('');

  const onChangeOwner = value => {
    setOwner(value);
  }

  const onChangeName = value => {
    setName(value);
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  console.log('Owner: ', owner);
  console.log('Name: ', name);

  return (
    <div className="App">
      <Header/>
      <Form onChangeOwner={onChangeOwner} onChangeName={onChangeName}/>
    </div>
  );
}

export default App;

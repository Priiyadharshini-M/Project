import './App.css';
import { useEffect } from 'react';
import Header from './components/Header';
import { loadUser } from './redux/actions/userAction'
import { loadAdmin } from './redux/actions/adminAction'
import { loadDonor } from './redux/actions/donorAction'
import { useDispatch } from 'react-redux';
import Router from './components/Router';
import axios from 'axios';

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')} ${sessionStorage.getItem('donorToken')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
    dispatch(loadAdmin())
    dispatch(loadDonor())
  }, [dispatch])

  return (
    <>
      <Header />
      <Router />
    </>
  );
}

export default App;

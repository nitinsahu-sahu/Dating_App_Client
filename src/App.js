import './App.css';
import Dashboard from './modules/Dashboard';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Signin from './modules/auth/Signin';
import Registration from './modules/auth/Registration';
import Protected from './modules/HOC';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './redux/action/userAuth.action';
import { useEffect, useState } from 'react';
import { getAllUsers } from './redux/action/allusers.action';
import { HashLoader } from 'react-spinners';


function App() {
  let [loading, setLoading] = useState(true);
  const nevigate = useNavigate()
  const auth = useSelector(state => state.userAuth.user);
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  },[])

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
      nevigate('/')
    }
  }, [])
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])



  return (
    <Routes>

      <Route element={<Protected />} >
        <Route path='/' element={loading ? <HashLoader color="#0e6c29" cssOverride={{
          display: "block",
          marginTop:'20%',
          marginLeft:'50%'
        }} /> : <Dashboard />} />
      </Route>
      <Route path='/users/sign_in' element={<Signin />} />
      <Route path='/users/sign_up' element={<Registration />} />
    </Routes>
  );
}

export default App;

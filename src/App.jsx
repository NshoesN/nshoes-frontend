import './assets/styles/App.scss';
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
//Screen
import Main from './pages/Main'


function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/SignIn' element='<SingIn />'></Route>
          <Route path='/SignUp' element='<SingUp />'></Route>
          <Route path='/Cart' element='<Cart />'></Route>
          <Route path='/Market' element='<Market />'></Route>
          <Route path='/*' element='<NotFound />'></Route>

        </Routes>
    </div>
  );
}

export default App;

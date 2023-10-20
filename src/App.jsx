import './assets/styles/App.scss';
import Layout from './components/Layout/Layout'
import { Routes, Route } from 'react-router-dom'
//Screen
import Main from './pages/Main.jsx'
import SignIn from './pages/SignIn.jsx'

function App() {
  return (
    <div className="App">
        <Layout>
          <Routes>
            <Route exact path='/' element={<Main />}></Route>
            <Route path='/SignIn' element={<SignIn />}></Route>
            <Route path='/SignUp' element='<SingUp />'></Route>
            <Route path='/Cart' element='<Cart />'></Route>
            <Route path='/Market' element='<Market />'></Route>
            <Route path='/*' element='<NotFound />'></Route>

          </Routes>
        </Layout>
    </div>
  );
}

export default App;

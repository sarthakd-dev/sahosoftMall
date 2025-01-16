import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
// import { Layout } from 'react-feather'
import Layout from './_components/layout'
import Login from './_components/auth/login'
import { PrivateRoute } from './_privateRoute/privateRoute'

import Dashboard from './_components/dashboard'
function App() {

  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/auth/login' element={<Login />} />

      <Route path='/' element={PrivateRoute} >
      <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route path='*' element={<Login />} />
    </Routes>
    </Router>
    
    </>
  )
}

export default App

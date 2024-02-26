import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
}
from "react-router-dom";
import Layout from './layout/Layout'

const App = ()=>{
  return(
    <Router>
      <Routes>
        <Route path = "/" element ={<Layout></Layout>}/>
        <Route path="/search" element={<>Search Page</>}/>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Router>
  )
}

export default App

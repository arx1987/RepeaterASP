import './App.css'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Info from './components/Info';
import Layout from './components/Layout';
import NoPage from './components/NoPage';
import Trainer from './components/Trainer';
import Add from './components/Add';
import Change from './components/Change';
import Test1 from './components/Test1';
import Test2 from './components/Test2';
import Test3 from './components/Test3';
import Test4 from './components/Test4';
import Test5 from './components/Test5';
import Test6 from './components/Test6';
import Test7 from './components/Test7';
import Test8 from './components/Test8';

function App() {

  return <Router>
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="trainer" element={<Trainer/>}/>
          <Route index element={<Info/>}/>
          <Route path="add" element={<Add/>}/>
          <Route path="change" element={<Change/>}/>
          <Route path="test1" element={<Test1/>}/>
          <Route path="test2" element={<Test2/>}/>
          <Route path="test3" element={<Test3/>}/>
          <Route path="test4" element={<Test4/>}/>
          <Route path="test5" element={<Test5/>}/>
          <Route path="test6" element={<Test6/>}/>
          <Route path="test7" element={<Test7/>}/>
          <Route path="test8" element={<Test8/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </div>

  </Router>;
 }

export default App

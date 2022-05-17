import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThreadsView } from './views/ThreadsView';
import { NavigationBar } from './components/NavBar';
function App() {
  return (
    <Router>
      <NavigationBar></NavigationBar>
      <Routes location="/">
        <Route path='/' element={<ThreadsView></ThreadsView>}></Route>
      </Routes>
    </Router>
  );
}

export default App;

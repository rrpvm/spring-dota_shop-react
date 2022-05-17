import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CatalogView } from './views/CatalogView';
import { NavigationBar } from './components/NavBar';
import { CreateItemView } from './views/CreateItemView';
function App() {
  return (
    <Router>
      <NavigationBar></NavigationBar>
      <Routes >
        <Route path='/admin' element={<CreateItemView></CreateItemView>}></Route>
        <Route path='/' element={<CatalogView></CatalogView>}></Route>
      </Routes>

    </Router>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CatalogView } from './views/CatalogView';
import { NavigationBar } from './components/singletons/NavBar';
import { CreateItemView } from './views/CreateItemView';
import { StrictMode } from 'react';
import ErrorView from './views/ErrorView';
import ItemView from './views/ItemView';
import AuthorizationView from './views/AuthorizationView';
function App() {
  return (
    <StrictMode>
      <Router>
        <NavigationBar></NavigationBar>
        <Routes >
          <Route path="/*" element={<ErrorView></ErrorView>}></Route>
          <Route path='/admin/create' element={<CreateItemView></CreateItemView>}></Route>
          <Route path='/authorization' element={<AuthorizationView></AuthorizationView>}></Route>
          <Route path='/item/:id' element={<ItemView></ItemView>}></Route>
          <Route path='/' element={<CatalogView></CatalogView>}></Route>
          <Route path="/error_page/:error" element={<ErrorView></ErrorView>}></Route>
        </Routes>
      </Router>
    </StrictMode>
  );
}

export default App;

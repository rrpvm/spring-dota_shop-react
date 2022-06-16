import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CatalogView } from './view/user/CatalogView';
import { NavigationBar } from './component/singletons/NavBar';
import { CreateItemView } from './view/admin/CreateItemView';
import { StrictMode } from 'react';
import ErrorView from './view/ErrorView';
import ItemView from './view/user/ItemView';
import AuthorizationView from './view/AuthorizationView';
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

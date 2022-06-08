import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CatalogView } from './views/CatalogView';
import { NavigationBar } from './components/singletons/NavBar';
import { CreateItemView } from './views/CreateItemView';
import NotFoundPage from './views/NotFoundPage';
import ItemPage from './views/ItemPage';
function App() {
  return (
    <Router>
      <NavigationBar></NavigationBar>
      <Routes >
        <Route path='/admin' element={<CreateItemView></CreateItemView>}></Route>
        <Route path='/item/:id' element={<ItemPage></ItemPage>}></Route>
        <Route path='/' element={<CatalogView></CatalogView>}></Route>
        <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>

    </Router>
  );
}

export default App;

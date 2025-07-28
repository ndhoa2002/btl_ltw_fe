import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './component/ArticleList';
import ArticleDetail from './component/ArticleCreateOrUpdate';
import ArticleForm from './component/ArticleForm';
import ArticleFormTinyMCE from './component/ArticleFormTinyMCE';
import ArticleCreateOrUpdate from './component/ArticleCreateOrUpdate';
import LoginPage from './component/LoginPage';

function App() {
  return (<Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleCreateOrUpdate />} />
        <Route path="/articles/create" element={<ArticleCreateOrUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;

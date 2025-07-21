import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './component/ArticleList';
import ArticleDetail from './component/ArticleDetail';
import ArticleForm from './component/ArticleForm';

function App() {
  return (<Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/articles/create" element={<ArticleForm />} />
      </Routes>
    </Router>
  );
}

export default App;

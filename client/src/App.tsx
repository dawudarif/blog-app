import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import IndexPage from './pages/IndexPage';

function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/register'} element={<RegisterPage />} />
    </Routes>
  );
}

export default App;

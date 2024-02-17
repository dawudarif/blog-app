import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './context/userContext';

function App() {
  return (
    <UserContextProvider>
      <MainLayout>
        <Routes>
          <Route index element={<IndexPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
        </Routes>
      </MainLayout>
    </UserContextProvider>
  );
}

export default App;
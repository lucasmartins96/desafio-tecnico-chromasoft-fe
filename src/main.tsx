import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { SnackbarProvider } from 'notistack';
import TasksPage from './pages/TasksPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SnackbarProvider
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
      >
        <Routes>
          <Route index element={<App />} />
          <Route path='tasks' element={<TasksPage />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  </StrictMode>
);

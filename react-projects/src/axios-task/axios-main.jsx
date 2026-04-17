import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import '../../../style/style.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <main>
      <App />
    </main>
    <Footer />
  </React.StrictMode>
);

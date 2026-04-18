import React from 'react';
import { createRoot } from 'react-dom/client';
import SpaApp from './SpaApp';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import '../../../style/style.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <main>
      <SpaApp />
    </main>
    <Footer />
  </React.StrictMode>
);

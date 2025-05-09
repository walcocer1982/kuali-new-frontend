import { Router } from 'preact-router';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { TemplateList } from './pages/templates/TemplateList';
import { CompaniesPage } from './pages/CompaniesPage';
import { ContactsPage } from './pages/ContactsPage';

// Páginas temporales
const Dashboard = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold text-whatsapp-textDark">Dashboard</h1>
  </div>
);
const History = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold text-whatsapp-textDark">Historial</h1>
  </div>
);

export function App() {
  return (
    <div className="min-h-screen bg-whatsapp-gray">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="pt-16 p-6">
          <Router>
            <Dashboard path="/" />
            <TemplateList path="/templates" />
            <ContactsPage path="/contacts" />
            <CompaniesPage path="/companies" />
            <History path="/history" />
          </Router>
        </main>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#DCF8C6',
              color: '#128C7E',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#FFE9E9',
              color: '#DC2626',
            },
          },
        }}
      />
    </div>
  );
}

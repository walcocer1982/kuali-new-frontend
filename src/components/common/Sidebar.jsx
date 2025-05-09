import { Link } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';

const menuItems = [
  { 
    name: 'Dashboard', 
    icon: 'dashboard', 
    path: '/',
    exact: true // Solo activo en la ruta exacta
  },
  { 
    name: 'Plantillas', 
    icon: 'description', 
    path: '/templates',
    badge: {
      count: 2,
      color: 'bg-green-500'
    }
  },
  { 
    name: 'Empresas', 
    icon: 'business', 
    path: '/companies' 
  },
  { 
    name: 'Contactos', 
    icon: 'people', 
    path: '/contacts' 
  },
  { 
    name: 'Historial', 
    icon: 'history', 
    path: '/history' 
  }
];

export const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Escuchar cambios de ruta
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const isActive = (item) => {
    if (item.exact) {
      return currentPath === item.path;
    }
    return currentPath.startsWith(item.path);
  };

  return (
    <div className="bg-white h-full w-64 fixed left-0 top-0 shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-4 bg-green-700">
        <h1 className="text-white text-xl font-bold flex items-center">
          <span className="material-icons-outlined mr-2">
            chat
          </span>
          Kuali CRM
        </h1>
      </div>
      
      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <Link 
            key={item.path}
            href={item.path}
            className={`
              flex items-center px-4 py-3 text-gray-700 
              transition-colors relative
              ${isActive(item) 
                ? 'bg-green-50 text-green-700 font-medium border-r-4 border-green-700' 
                : 'hover:bg-green-50'}
            `}
            onClick={() => setCurrentPath(item.path)}
          >
            <span className="material-icons-outlined mr-3">
              {item.icon}
            </span>
            <span>{item.name}</span>
            {item.badge && (
              <span className={`
                absolute right-4 px-2 py-0.5 rounded-full text-xs text-white
                ${item.badge.color}
              `}>
                {item.badge.count}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="material-icons-outlined text-gray-600">
              account_circle
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Usuario</p>
            <p className="text-xs text-gray-500">usuario@kuali.com</p>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <span className="material-icons-outlined text-gray-600">
              settings
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}; 
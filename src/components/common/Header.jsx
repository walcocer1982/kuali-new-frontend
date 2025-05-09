export const Header = () => {
  return (
    <header className="bg-white h-16 fixed top-0 right-0 left-64 shadow-sm z-10">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex-1">
          <div className="relative">
            <span className="material-icons-outlined absolute left-3 top-2.5 text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-whatsapp-primary"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-whatsapp-light rounded-full">
            <span className="material-icons-outlined text-gray-600">notifications</span>
          </button>
          <button className="p-2 hover:bg-whatsapp-light rounded-full">
            <span className="material-icons-outlined text-gray-600">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
}; 
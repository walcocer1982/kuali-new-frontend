import { useState, useEffect, useRef } from 'preact/hooks';

export const SearchBar = ({
  onSearch,
  placeholder = 'Buscar...',
  categories = [],
  suggestions = [],
  className = '',
  debounceTime = 300
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    // Cargar búsquedas recientes del localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Cerrar al hacer clic fuera
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (term, category) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch({ term, category });
      
      // Guardar en búsquedas recientes
      if (term.trim()) {
        const newSearches = [
          { term, category },
          ...recentSearches.filter(s => s.term !== term).slice(0, 4)
        ];
        setRecentSearches(newSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      }
    }, debounceTime);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value, selectedCategory);
    setIsOpen(true);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    handleSearch(searchTerm, category);
  };

  const clearSearch = () => {
    setSearchTerm('');
    handleSearch('', selectedCategory);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="flex items-center bg-gray-100 rounded-lg">
        <div className="flex-1 flex items-center">
          <span className="material-icons-outlined text-gray-400 ml-3">
            search
          </span>
          <input
            type="text"
            className="w-full px-3 py-2 bg-transparent focus:outline-none"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="material-icons-outlined text-gray-400 mr-2 hover:text-gray-600"
            >
              close
            </button>
          )}
        </div>
        
        {categories.length > 0 && (
          <select
            className="px-3 py-2 bg-transparent border-l border-gray-200 focus:outline-none text-gray-600"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {isOpen && (searchTerm || recentSearches.length > 0 || suggestions.length > 0) && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {searchTerm && suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs text-gray-500 px-2 py-1">Sugerencias</div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    handleSearch(suggestion, selectedCategory);
                    setIsOpen(false);
                  }}
                >
                  <span className="material-icons-outlined text-gray-400 mr-2 text-sm">
                    search
                  </span>
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {recentSearches.length > 0 && (
            <div className="p-2 border-t border-gray-100">
              <div className="text-xs text-gray-500 px-2 py-1">Búsquedas recientes</div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center justify-between"
                  onClick={() => {
                    setSearchTerm(search.term);
                    setSelectedCategory(search.category);
                    handleSearch(search.term, search.category);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <span className="material-icons-outlined text-gray-400 mr-2 text-sm">
                      history
                    </span>
                    <span>{search.term}</span>
                  </div>
                  {search.category && (
                    <span className="text-xs text-gray-500">
                      {categories.find(c => c.value === search.category)?.label}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 
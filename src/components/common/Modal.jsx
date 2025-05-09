import { useState } from 'preact/hooks';

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  showProgress = false,
  progress = 0,
  isLoading = false,
  size = 'default' // 'small', 'default', 'large'
}) => {
  if (!isOpen) return null;

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const getSizeClasses = () => {
    switch(size) {
      case 'small':
        return 'sm:max-w-md';
      case 'large':
        return 'sm:max-w-4xl';
      default:
        return 'sm:max-w-lg';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragLeave}
    >
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay de fondo */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Contenedor del modal */}
        <div className={`inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full ${getSizeClasses()} sm:align-middle ${isDragging ? 'ring-2 ring-whatsapp-primary' : ''}`}>
          {/* Encabezado */}
          <div className="bg-whatsapp-primary px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white flex items-center">
                {isLoading && (
                  <span className="material-icons-outlined animate-spin mr-2">
                    refresh
                  </span>
                )}
                {title}
              </h3>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-white hover:bg-whatsapp-dark"
              >
                <span className="material-icons-outlined">
                  close
                </span>
              </button>
            </div>
          </div>

          {/* Barra de progreso */}
          {showProgress && (
            <div className="relative h-1 bg-gray-200">
              <div 
                className="absolute h-1 bg-whatsapp-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* Contenido */}
          <div className={`bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${isDragging ? 'bg-whatsapp-light bg-opacity-10' : ''}`}>
            {children}
          </div>

          {/* Área de arrastrar y soltar */}
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-whatsapp-primary bg-opacity-10 pointer-events-none">
              <div className="text-center text-whatsapp-dark">
                <span className="material-icons-outlined text-4xl mb-2">
                  upload_file
                </span>
                <p>Suelta los archivos aquí</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 
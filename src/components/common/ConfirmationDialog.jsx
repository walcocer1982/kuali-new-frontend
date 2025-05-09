import { useState, useEffect } from 'preact/hooks';

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning', // warning, danger, info
  isLoading = false
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const typeStyles = {
    warning: {
      icon: 'warning',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
    },
    danger: {
      icon: 'error_outline',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    info: {
      icon: 'info_outline',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
  };

  const styles = typeStyles[type];

  if (!isOpen && !isVisible) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-200
        ${isOpen ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div 
        className={`
          relative bg-white rounded-lg shadow-xl w-full max-w-md
          transform transition-transform duration-200
          ${isOpen ? 'scale-100' : 'scale-95'}
        `}
      >
        <div className={`${styles.bgColor} rounded-t-lg px-4 py-3 flex items-center`}>
          <span className={`material-icons-outlined ${styles.textColor} mr-2`}>
            {styles.icon}
          </span>
          <h3 className={`text-lg font-medium ${styles.textColor}`}>
            {title}
          </h3>
        </div>

        <div className="px-4 py-3">
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="px-4 py-3 bg-gray-50 rounded-b-lg flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`
              px-4 py-2 text-white rounded focus:outline-none focus:ring-2
              ${styles.buttonColor}
              ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}
            `}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="material-icons-outlined animate-spin mr-2">
                  refresh
                </span>
                Procesando...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}; 
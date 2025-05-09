export const ConnectionError = ({ 
  message = 'Error de conexión', 
  onRetry,
  showRetry = true,
  status = 0
}) => {
  const getErrorTitle = (status) => {
    switch (status) {
      case 401:
        return 'Error de Autenticación';
      case 403:
        return 'Error de Autorización';
      case 404:
        return 'Recurso No Encontrado';
      case 500:
        return 'Error del Servidor';
      case 408:
        return 'Tiempo de Espera Agotado';
      default:
        return 'Error de Conexión';
    }
  };

  const getSuggestions = (status) => {
    switch (status) {
      case 401:
        return [
          'Inicie sesión nuevamente',
          'Verifique sus credenciales',
          'La sesión podría haber expirado'
        ];
      case 403:
        return [
          'Verifique sus permisos',
          'Contacte al administrador',
          'Podría necesitar acceso adicional'
        ];
      case 404:
        return [
          'Verifique la URL',
          'El recurso podría haber sido movido o eliminado',
          'Contacte al soporte técnico'
        ];
      case 500:
        return [
          'Intente nuevamente más tarde',
          'El servidor podría estar en mantenimiento',
          'Reporte el problema si persiste'
        ];
      case 408:
        return [
          'Verifique su conexión a internet',
          'El servidor está tardando en responder',
          'Intente nuevamente'
        ];
      default:
        return [
          'Verifica tu conexión a internet',
          'El servidor podría estar temporalmente inaccesible',
          'Podría haber un problema de configuración CORS'
        ];
    }
  };

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="material-icons-outlined text-red-400">
            error_outline
          </span>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {getErrorTitle(status)}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
            {showRetry && (
              <button
                onClick={onRetry}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span className="material-icons-outlined text-sm mr-1">
                  refresh
                </span>
                Reintentar conexión
              </button>
            )}
          </div>
          <div className="mt-4 text-sm text-red-700">
            <p>Sugerencias:</p>
            <ul className="list-disc list-inside mt-1">
              {getSuggestions(status).map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}; 
import axios from 'axios';

// Instancia para peticiones regulares de API
const api = axios.create({
  baseURL: '',  // Usamos URL relativa para que funcione con el proxy
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false,  // Cambiado a false ya que no necesitamos enviar cookies por ahora
  timeout: 30000 // 30 segundos
});

// Instancia específica para uploads
const uploadApi = axios.create({
  baseURL: '',  // Usamos URL relativa para que funcione con el proxy
  timeout: 60000, // 60 segundos
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
  },
  withCredentials: false  // Cambiado a false para consistencia
});

// Configuración de reintentos
const MAX_RETRIES = 2;
const retryDelay = (retryCount) => Math.min(1000 * (2 ** retryCount), 10000);

// Interceptor para reintentos en peticiones regulares
api.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error;
    
    // No reintentar si el error es de autenticación
    if (response && response.status === 401) {
      return Promise.reject(error);
    }

    config.retryCount = config.retryCount || 0;

    if (config.retryCount < MAX_RETRIES) {
      config.retryCount += 1;
      
      // Esperar antes de reintentar
      await new Promise(resolve => setTimeout(resolve, retryDelay(config.retryCount)));
      
      return api(config);
    }

    if (error.response) {
      // Error con respuesta del servidor
      console.error('Error de respuesta:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });

      // Manejar errores específicos
      switch (error.response.status) {
        case 401:
          return Promise.reject({
            message: 'No autorizado. Por favor, inicie sesión nuevamente.',
            status: 401
          });
        case 404:
          return Promise.reject({
            message: 'Recurso no encontrado.',
            status: 404
          });
        case 500:
          return Promise.reject({
            message: 'Error interno del servidor. Por favor, intente más tarde.',
            status: 500
          });
        default:
          return Promise.reject({
            message: error.response.data.message || 'Error en la solicitud',
            status: error.response.status
          });
      }
    }
    
    // Error sin respuesta del servidor
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        message: 'La solicitud ha excedido el tiempo de espera. Por favor, intente nuevamente.',
        status: 408
      });
    }
    
    return Promise.reject({
      message: 'Error de conexión. Por favor, verifica tu conexión a internet.',
      status: 0
    });
  }
);

// Interceptor para peticiones
api.interceptors.request.use(
  config => {
    console.log('Enviando petición:', {
      url: config.url,
      method: config.method,
      data: config.data
    });
    return config;
  },
  error => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

export { api as default, uploadApi }; 
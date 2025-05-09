import api from './api';

export const createService = (endpoint) => {
  // Asegurarse de que el endpoint tenga el formato correcto sin prefijo /api
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  return {
    getAll: async () => {
      try {
        const response = await api.get(`${cleanEndpoint}`);
        return response.data;
      } catch (error) {
        console.error(`Error en getAll ${cleanEndpoint}:`, error);
        throw {
          message: error.response?.data?.message || 'Error al obtener los datos',
          status: error.response?.status
        };
      }
    },

    getById: async (id) => {
      try {
        const response = await api.get(`${cleanEndpoint}/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error en getById ${cleanEndpoint}/${id}:`, error);
        throw {
          message: error.response?.data?.message || `Error al obtener ${cleanEndpoint}`,
          status: error.response?.status
        };
      }
    },

    create: async (data) => {
      try {
        // Validar que los campos requeridos estén presentes según el swagger
        if (!validateRequiredFields(cleanEndpoint, data)) {
          throw {
            message: 'Faltan campos requeridos',
            status: 400,
            details: getMissingFields(cleanEndpoint, data)
          };
        }
        const response = await api.post(`${cleanEndpoint}`, data);
        return response.data;
      } catch (error) {
        console.error(`Error en create ${cleanEndpoint}:`, error);
        throw {
          message: error.message || error.response?.data?.message || 'Error al crear',
          status: error.status || error.response?.status,
          details: error.details
        };
      }
    },

    update: async (id, data) => {
      try {
        const response = await api.put(`${cleanEndpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        console.error(`Error en update ${cleanEndpoint}/${id}:`, error);
        throw {
          message: error.response?.data?.message || 'Error al actualizar',
          status: error.response?.status
        };
      }
    },

    delete: async (id) => {
      try {
        await api.delete(`${cleanEndpoint}/${id}`);
        return true;
      } catch (error) {
        console.error(`Error en delete ${cleanEndpoint}/${id}:`, error);
        throw {
          message: error.response?.data?.message || 'Error al eliminar',
          status: error.response?.status
        };
      }
    }
  };
};

// Función para validar campos requeridos según el swagger
const validateRequiredFields = (endpoint, data) => {
  const requiredFields = {
    contacts: ['email'],
    companies: ['name'],
    templates: ['title', 'body'],
    leads: ['firstName', 'lastName', 'email', 'companyId']
  };

  // Eliminar el prefijo '/' si existe para la validación
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  const fields = requiredFields[cleanEndpoint] || [];
  return fields.every(field => data[field] !== undefined && data[field] !== '');
};

// Función para obtener los campos que faltan
const getMissingFields = (endpoint, data) => {
  const requiredFields = {
    contacts: ['email'],
    companies: ['name'],
    templates: ['title', 'body'],
    leads: ['firstName', 'lastName', 'email', 'companyId']
  };

  // Eliminar el prefijo '/' si existe para la validación
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  const fields = requiredFields[cleanEndpoint] || [];
  return fields.filter(field => !data[field]);
}; 
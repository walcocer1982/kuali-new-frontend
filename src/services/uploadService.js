import { uploadApi } from './api';

class UploadService {
  async upload(file, options = {}) {
    const {
      type = 'default',
      bucket = 'default',
      onProgress,
      translate = false
    } = options;

    try {
      // Crear FormData para el archivo
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('bucket', bucket);
      formData.append('translate', translate);

      // Configurar el request con soporte para progreso
      const response = await uploadApi.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error en la carga:', error);
      throw new Error(error.response?.data?.message || 'Error al cargar el archivo');
    }
  }

  async translate(text, options = {}) {
    const {
      fromLang = 'auto',
      toLang = 'es'
    } = options;

    try {
      const response = await uploadApi.post('/translate', {
        text,
        fromLang,
        toLang
      });

      return response.data;
    } catch (error) {
      console.error('Error en la traducción:', error);
      throw new Error(error.response?.data?.message || 'Error al traducir el texto');
    }
  }
}

export const uploadService = new UploadService(); 
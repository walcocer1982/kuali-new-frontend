import { useState, useEffect } from 'preact/hooks';

export const TemplateForm = ({ template, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (template) {
      setFormData({
        title: template.title,
        body: template.body
      });
    }
  }, [template]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }
    if (!formData.body.trim()) {
      newErrors.body = 'El contenido es requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-whatsapp-textDark mb-1">
          Título
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-whatsapp-primary`}
          placeholder="Ingrese el título de la plantilla"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-whatsapp-textDark mb-1">
          Contenido
        </label>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          rows="4"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.body ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-whatsapp-primary`}
          placeholder="Ingrese el contenido de la plantilla"
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-600">{errors.body}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {template ? 'Guardar Cambios' : 'Crear Plantilla'}
        </button>
      </div>
    </form>
  );
}; 
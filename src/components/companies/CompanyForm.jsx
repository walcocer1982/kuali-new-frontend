import { useState, useEffect } from 'preact/hooks';

export const CompanyForm = ({ company, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    address: '',
    type: '',
    status: 'active'
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        contactInfo: company.contactInfo || '',
        address: company.address || '',
        type: company.type || '',
        status: company.status || 'active'
      });
    }
  }, [company]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre de la empresa es requerido';
    }
    if (!formData.type.trim()) {
      newErrors.type = 'El tipo de empresa es requerido';
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
          Nombre de la Empresa *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input w-full ${errors.name ? 'border-red-500' : ''}`}
          placeholder="Nombre de la empresa"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-whatsapp-textDark mb-1">
          Información de Contacto
        </label>
        <input
          type="text"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          className="form-input w-full"
          placeholder="Teléfono, email principal, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-whatsapp-textDark mb-1">
          Dirección
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="form-input w-full"
          rows="2"
          placeholder="Dirección completa"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-whatsapp-textDark mb-1">
          Tipo de Empresa *
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`form-input w-full ${errors.type ? 'border-red-500' : ''}`}
        >
          <option value="">Seleccione un tipo</option>
          <option value="Cliente">Cliente</option>
          <option value="Proveedor">Proveedor</option>
          <option value="Socio">Socio</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-whatsapp-textDark mb-1">
          Estado
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-input w-full"
        >
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
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
          {company ? 'Guardar Cambios' : 'Crear Empresa'}
        </button>
      </div>
    </form>
  );
}; 
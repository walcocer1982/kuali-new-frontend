import { useState, useEffect } from 'preact/hooks';
import { companyService } from '../../services/companyService';

export const ContactForm = ({ contact, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyId: '',
    status: 'active'
  });
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);

  useEffect(() => {
    loadCompanies();
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        companyId: contact.companyId || '',
        status: contact.status || 'active'
      });
    }
  }, [contact]);

  const loadCompanies = async () => {
    try {
      setIsLoadingCompanies(true);
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (error) {
      console.error('Error al cargar empresas:', error);
    } finally {
      setIsLoadingCompanies(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.companyId) {
      newErrors.companyId = 'La empresa es requerida';
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
          Nombre
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input w-full"
          placeholder="Nombre del contacto"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-whatsapp-textDark mb-1">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input w-full ${errors.email ? 'border-red-500' : ''}`}
          placeholder="email@ejemplo.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-whatsapp-textDark mb-1">
          Teléfono
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input w-full"
          placeholder="+1234567890"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-whatsapp-textDark mb-1">
          Empresa *
        </label>
        <select
          name="companyId"
          value={formData.companyId}
          onChange={handleChange}
          className={`form-input w-full ${errors.companyId ? 'border-red-500' : ''}`}
          disabled={isLoadingCompanies}
        >
          <option value="">Seleccione una empresa</option>
          {companies.map(company => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        {errors.companyId && (
          <p className="mt-1 text-sm text-red-600">{errors.companyId}</p>
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
          <option value="pending">Pendiente</option>
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
          {contact ? 'Guardar Cambios' : 'Crear Contacto'}
        </button>
      </div>
    </form>
  );
}; 
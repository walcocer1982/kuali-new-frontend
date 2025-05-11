import { useState, useEffect } from 'preact/hooks';
import { toast } from 'react-hot-toast';
import leadService from '../../services/leadService';
import { companyService } from '../../services/companyService';

export const LeadForm = ({ initialData = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    linkedinUrl: '',
    role: '',
    seniority: '',
    status: 'NUEVO',
    companyId: ''
  });

  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCompanies();
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        phoneNumber: initialData.phoneNumber || '',
        linkedinUrl: initialData.linkedinUrl || '',
        role: initialData.role || '',
        seniority: initialData.seniority || '',
        status: initialData.status || 'NUEVO',
        companyId: initialData.companyId || ''
      });
    }
  }, [initialData]);

  const loadCompanies = async () => {
    try {
      const data = await companyService.getAll();
      setCompanies(data || []);
    } catch (error) {
      console.error('Error loading companies:', error);
      toast.error('Error al cargar las empresas');
      setCompanies([]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.companyId) newErrors.companyId = 'La empresa es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const seniorityOptions = [
    'Junior',
    'Semi-Senior',
    'Senior',
    'Lead',
    'Manager',
    'Director'
  ];

  const statusOptions = [
    'NUEVO',
    'CONTACTADO',
    'INTERESADO',
    'CALIFICADO',
    'OPORTUNIDAD',
    'CERRADO',
    'DESCARTADO'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (initialData && initialData.id) {
        await leadService.update(initialData.id, formData);
        toast.success('Lead actualizado');
      } else {
        await leadService.create(formData);
        toast.success('Lead creado');
      }
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al guardar el lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nombre del lead"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apellido *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Apellido del lead"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="email@ejemplo.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="+1234567890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rol
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Ej: Desarrollador Frontend"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seniority
          </label>
          <select
            value={formData.seniority}
            onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccione seniority</option>
            {seniorityOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Empresa *
          </label>
          <select
            value={formData.companyId}
            onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.companyId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Seleccione una empresa</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          {errors.companyId && (
            <p className="mt-1 text-sm text-red-500">{errors.companyId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Guardando...' : initialData?.id ? 'Actualizar' : 'Crear'} Lead
        </button>
      </div>
    </form>
  );
};
import { useState, useEffect } from 'preact/hooks';
import { companyService } from '../../services/companyService';
import { CompanyCard } from './CompanyCard';
import { CompanyForm } from './CompanyForm';
import toast from 'react-hot-toast';

export const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (err) {
      setError('Error al cargar las empresas');
      toast.error('Error al cargar las empresas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const newCompany = await companyService.create(formData);
      setCompanies([...companies, newCompany]);
      setShowForm(false);
      toast.success('Empresa creada exitosamente');
    } catch (err) {
      toast.error('Error al crear la empresa');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const updatedCompany = await companyService.update(editingCompany.id, formData);
      setCompanies(companies.map(company => 
        company.id === editingCompany.id ? updatedCompany : company
      ));
      setEditingCompany(null);
      setShowForm(false);
      toast.success('Empresa actualizada exitosamente');
    } catch (err) {
      toast.error('Error al actualizar la empresa');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta empresa?')) {
      try {
        await companyService.delete(id);
        setCompanies(companies.filter(company => company.id !== id));
        toast.success('Empresa eliminada exitosamente');
      } catch (err) {
        toast.error('Error al eliminar la empresa');
      }
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingCompany(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-whatsapp-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-whatsapp-textDark">Empresas</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Nueva Empresa
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingCompany ? 'Editar Empresa' : 'Nueva Empresa'}
          </h3>
          <CompanyForm
            company={editingCompany}
            onSubmit={editingCompany ? handleUpdate : handleCreate}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {companies.map(company => (
          <CompanyCard
            key={company.id}
            company={company}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {companies.length === 0 && !showForm && (
        <div className="text-center py-8">
          <p className="text-whatsapp-textGray">No hay empresas registradas</p>
        </div>
      )}
    </div>
  );
}; 
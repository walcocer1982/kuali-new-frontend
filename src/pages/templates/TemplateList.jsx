import { useState, useEffect } from 'preact/hooks';
import { toast } from 'react-hot-toast';
import { TemplateCard } from '../../components/templates/TemplateCard';
import { TemplateForm } from '../../components/templates/TemplateForm';
import { Modal } from '../../components/common/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorAlert } from '../../components/common/ErrorAlert';
import { templateService } from '../../services/templateService';

export const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      const data = await templateService.getAll();
      setTemplates(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Error al cargar las plantillas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('¿Está seguro de eliminar esta plantilla?')) {
      try {
        await templateService.delete(id);
        setTemplates(templates.filter(t => t.id !== id));
        toast.success('Plantilla eliminada correctamente');
      } catch (err) {
        setError(err.message);
        toast.error('Error al eliminar la plantilla');
      }
    }
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedTemplate(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedTemplate) {
        // Editar
        const updated = await templateService.update(selectedTemplate.id, formData);
        setTemplates(templates.map(t => 
          t.id === selectedTemplate.id ? updated : t
        ));
        toast.success('Plantilla actualizada correctamente');
      } else {
        // Crear
        const created = await templateService.create(formData);
        setTemplates([...templates, created]);
        toast.success('Plantilla creada correctamente');
      }
      setIsModalOpen(false);
      setSelectedTemplate(null);
    } catch (err) {
      setError(err.message);
      toast.error(selectedTemplate ? 'Error al actualizar la plantilla' : 'Error al crear la plantilla');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-whatsapp-textDark">Plantillas</h1>
        <button 
          onClick={handleCreate}
          className="btn-primary flex items-center"
        >
          <span className="material-icons-outlined mr-2">add</span>
          Nueva Plantilla
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTemplate ? 'Editar Plantilla' : 'Nueva Plantilla'}
      >
        <TemplateForm
          template={selectedTemplate}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}; 
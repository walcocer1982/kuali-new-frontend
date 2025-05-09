import { useState, useEffect } from 'preact/hooks';
import { toast } from 'react-hot-toast';
import { ContactCard } from '../components/contacts/ContactCard';
import { ContactForm } from '../components/contacts/ContactForm';
import { contactService } from '../services/contactService';
import { ConnectionError } from '../components/common/ConnectionError';

export const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      setError(err.message || 'Error al cargar los contactos');
      toast.error('Error al cargar los contactos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const newContact = await contactService.create(formData);
      setContacts([...contacts, newContact]);
      setShowForm(false);
      toast.success('Contacto creado exitosamente');
    } catch (err) {
      toast.error('Error al crear el contacto');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const updatedContact = await contactService.update(editingContact.id, formData);
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id ? updatedContact : contact
      ));
      setEditingContact(null);
      setShowForm(false);
      toast.success('Contacto actualizado exitosamente');
    } catch (err) {
      toast.error('Error al actualizar el contacto');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este contacto?')) {
      try {
        await contactService.delete(id);
        setContacts(contacts.filter(contact => contact.id !== id));
        toast.success('Contacto eliminado exitosamente');
      } catch (err) {
        toast.error('Error al eliminar el contacto');
      }
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingContact(null);
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
      <ConnectionError 
        message={error}
        onRetry={loadContacts}
        showRetry={true}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-whatsapp-textDark">Contactos</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center"
        >
          <span className="material-icons-outlined mr-2">person_add</span>
          Nuevo Contacto
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingContact ? 'Editar Contacto' : 'Nuevo Contacto'}
          </h3>
          <ContactForm
            contact={editingContact}
            onSubmit={editingContact ? handleUpdate : handleCreate}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {contacts.length === 0 && !showForm && (
        <div className="text-center py-8">
          <div className="flex flex-col items-center space-y-4">
            <span className="material-icons-outlined text-6xl text-gray-300">
              people
            </span>
            <p className="text-whatsapp-textGray">No hay contactos registrados</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-secondary flex items-center"
            >
              <span className="material-icons-outlined mr-2">person_add</span>
              Agregar primer contacto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 
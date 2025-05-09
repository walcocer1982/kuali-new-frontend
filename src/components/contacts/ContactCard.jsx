export const ContactCard = ({ contact, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'activo':
        return 'bg-whatsapp-primary text-white';
      case 'pending':
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'inactivo':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-whatsapp-light flex items-center justify-center">
            <span className="material-icons-outlined text-whatsapp-dark">
              person
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-whatsapp-textDark">
              {contact.name || 'Sin nombre'}
            </h3>
            <p className="text-sm text-whatsapp-textGray">{contact.email}</p>
            {contact.phone && (
              <p className="text-sm text-whatsapp-textGray">{contact.phone}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(contact)}
            className="p-1 hover:bg-whatsapp-light rounded-full"
          >
            <span className="material-icons-outlined text-whatsapp-dark">
              edit
            </span>
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="p-1 hover:bg-red-50 rounded-full"
          >
            <span className="material-icons-outlined text-red-600">
              delete
            </span>
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {contact.companyName && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-whatsapp-light text-whatsapp-dark">
            <span className="material-icons-outlined text-sm mr-1">business</span>
            {contact.companyName}
          </span>
        )}
        {contact.status && (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm ${getStatusColor(contact.status)}`}>
            {contact.status}
          </span>
        )}
      </div>
    </div>
  );
}; 
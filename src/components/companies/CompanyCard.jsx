export const CompanyCard = ({ company, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'activo':
        return 'bg-whatsapp-primary text-white';
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
              business
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-whatsapp-textDark">
              {company.name || 'Sin nombre'}
            </h3>
            {company.contactInfo && (
              <p className="text-sm text-whatsapp-textGray">{company.contactInfo}</p>
            )}
            {company.address && (
              <p className="text-sm text-whatsapp-textGray">
                <span className="material-icons-outlined text-sm mr-1 align-text-bottom">
                  location_on
                </span>
                {company.address}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(company)}
            className="p-1 hover:bg-whatsapp-light rounded-full"
          >
            <span className="material-icons-outlined text-whatsapp-dark">
              edit
            </span>
          </button>
          <button
            onClick={() => onDelete(company.id)}
            className="p-1 hover:bg-red-50 rounded-full"
          >
            <span className="material-icons-outlined text-red-600">
              delete
            </span>
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {company.type && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-whatsapp-light text-whatsapp-dark">
            <span className="material-icons-outlined text-sm mr-1">category</span>
            {company.type}
          </span>
        )}
        {company.status && (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm ${getStatusColor(company.status)}`}>
            {company.status}
          </span>
        )}
      </div>
    </div>
  );
}; 
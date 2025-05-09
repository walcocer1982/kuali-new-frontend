export const TemplateCard = ({ template, onEdit, onDelete }) => (
  <div className="card">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-semibold text-whatsapp-textDark">{template.title}</h3>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(template)}
          className="p-1 hover:bg-whatsapp-light rounded-full"
        >
          <span className="material-icons-outlined text-whatsapp-dark">edit</span>
        </button>
        <button
          onClick={() => onDelete(template.id)}
          className="p-1 hover:bg-red-50 rounded-full"
        >
          <span className="material-icons-outlined text-red-600">delete</span>
        </button>
      </div>
    </div>
    <p className="mt-2 text-whatsapp-textGray whitespace-pre-wrap">{template.body}</p>
  </div>
); 
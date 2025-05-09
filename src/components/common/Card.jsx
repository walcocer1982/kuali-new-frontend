import { Tooltip } from './Tooltip';

export const Card = ({
  title,
  subtitle,
  icon,
  iconBgColor = 'bg-green-500',
  content,
  actions = [],
  metadata = [],
  status,
  className = '',
  onClick,
  isSelected = false
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm border border-gray-100
        transition-all duration-200 ease-in-out
        ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
        ${isSelected ? 'border-green-500 shadow-md' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="p-4">
        {/* Encabezado */}
        <div className="flex items-center space-x-3">
          {icon && (
            <div className={`w-10 h-10 ${iconBgColor} rounded-full flex items-center justify-center`}>
              <span className="material-icons-outlined text-white">
                {icon}
              </span>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-500 truncate">
                {subtitle}
              </p>
            )}
          </div>

          {status && (
            <div className="flex-shrink-0">
              <span 
                className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${status.color || 'bg-gray-100 text-gray-800'}
                `}
              >
                {status.icon && (
                  <span className="material-icons-outlined text-xs mr-1">
                    {status.icon}
                  </span>
                )}
                {status.text}
              </span>
            </div>
          )}
        </div>

        {/* Contenido */}
        {content && (
          <div className="mt-3 text-sm text-gray-600">
            {content}
          </div>
        )}

        {/* Metadatos */}
        {metadata.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {metadata.map((item, index) => (
              <div 
                key={index}
                className="flex items-center text-xs text-gray-500"
              >
                {item.icon && (
                  <span className="material-icons-outlined text-xs mr-1">
                    {item.icon}
                  </span>
                )}
                {item.label && <span className="font-medium mr-1">{item.label}:</span>}
                {item.value}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Acciones */}
      {actions.length > 0 && (
        <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 rounded-b-lg flex justify-end space-x-2">
          {actions.map((action, index) => (
            <Tooltip 
              key={index}
              content={action.label}
              position="top"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                }}
                className={`
                  p-2 rounded-full transition-colors duration-200
                  ${action.variant === 'danger' 
                    ? 'text-red-600 hover:bg-red-50' 
                    : action.variant === 'primary'
                    ? 'text-green-600 hover:bg-green-50'
                    : 'text-gray-600 hover:bg-gray-100'}
                `}
                disabled={action.disabled}
              >
                <span className="material-icons-outlined">
                  {action.icon}
                </span>
              </button>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}; 
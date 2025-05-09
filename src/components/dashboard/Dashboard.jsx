import { useState, useEffect } from 'preact/hooks';
import { Card } from '../common/Card';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    templates: 0,
    companies: 0,
    contacts: 0,
    recentActivity: []
  });

  // Aquí irían las llamadas a la API para obtener las estadísticas reales
  useEffect(() => {
    // Simulación de datos
    setStats({
      templates: 2,
      companies: 1,
      contacts: 0,
      recentActivity: [
        {
          type: 'template_created',
          description: 'Nueva plantilla de saludo creada',
          timestamp: new Date().toISOString(),
          icon: 'description'
        },
        {
          type: 'company_added',
          description: 'Empresa Peruana S.A.C. agregada',
          timestamp: new Date().toISOString(),
          icon: 'business'
        }
      ]
    });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Plantillas"
          content={stats.templates.toString()}
          icon="description"
          iconBgColor="bg-blue-500"
          metadata={[
            { label: 'Activas', value: stats.templates }
          ]}
        />
        
        <Card
          title="Empresas"
          content={stats.companies.toString()}
          icon="business"
          iconBgColor="bg-green-500"
          metadata={[
            { label: 'Registradas', value: stats.companies }
          ]}
        />
        
        <Card
          title="Contactos"
          content={stats.contacts.toString()}
          icon="people"
          iconBgColor="bg-purple-500"
          metadata={[
            { label: 'Total', value: stats.contacts }
          ]}
        />
      </div>

      {/* Actividad Reciente */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Actividad Reciente
        </h2>
        
        <div className="space-y-4">
          {stats.recentActivity.map((activity, index) => (
            <div 
              key={index}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${activity.type.includes('template') ? 'bg-blue-100 text-blue-600' :
                  activity.type.includes('company') ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'}
              `}>
                <span className="material-icons-outlined text-sm">
                  {activity.icon}
                </span>
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {stats.recentActivity.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No hay actividad reciente
            </p>
          )}
        </div>
      </div>
    </div>
  );
}; 
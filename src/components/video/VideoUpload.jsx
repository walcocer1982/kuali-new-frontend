import { useState } from 'preact/hooks';
import { FileUploadModal } from '../common/FileUploadModal';
import { toast } from 'react-hot-toast';

export const VideoUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadComplete = (result) => {
    console.log('Video cargado:', result);
    // Aquí puedes manejar el resultado de la carga
    toast.success('Video cargado exitosamente');
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn-primary flex items-center"
      >
        <span className="material-icons-outlined mr-2">
          video_library
        </span>
        Cargar Video
      </button>

      <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadComplete={handleUploadComplete}
        title="Cargar Video"
        acceptedTypes="video/*"
        bucket="video"
        enableTranslation={true}
        maxFileSize={100 * 1024 * 1024} // 100MB para videos
      />
    </div>
  );
}; 
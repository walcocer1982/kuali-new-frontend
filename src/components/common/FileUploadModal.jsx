import { useState } from 'preact/hooks';
import { Modal } from './Modal';
import { uploadService } from '../../services/uploadService';
import { toast } from 'react-hot-toast';

export const FileUploadModal = ({
  isOpen,
  onClose,
  onUploadComplete,
  title = 'Cargar Archivo',
  acceptedTypes = '*/*',
  bucket = 'default',
  enableTranslation = false,
  maxFileSize = 50 * 1024 * 1024 // 50MB por defecto
}) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [translate, setTranslate] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > maxFileSize) {
        toast.error('El archivo es demasiado grande');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size > maxFileSize) {
        toast.error('El archivo es demasiado grande');
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Por favor seleccione un archivo');
      return;
    }

    try {
      setIsLoading(true);
      const result = await uploadService.upload(file, {
        bucket,
        translate,
        onProgress: setProgress
      });

      toast.success('Archivo cargado exitosamente');
      onUploadComplete?.(result);
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleClose = () => {
    setFile(null);
    setProgress(0);
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      showProgress={isLoading}
      progress={progress}
      isLoading={isLoading}
    >
      <div className="space-y-4">
        <div 
          className="border-2 border-dashed border-whatsapp-light rounded-lg p-6 text-center"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {file ? (
            <div className="space-y-2">
              <span className="material-icons-outlined text-4xl text-whatsapp-primary">
                description
              </span>
              <p className="text-whatsapp-textDark">{file.name}</p>
              <p className="text-sm text-whatsapp-textGray">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                onClick={() => setFile(null)}
                className="text-red-600 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="material-icons-outlined text-4xl text-whatsapp-textGray">
                upload_file
              </span>
              <p className="text-whatsapp-textDark">
                Arrastra y suelta un archivo aquí o
              </p>
              <input
                type="file"
                accept={acceptedTypes}
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="btn-primary cursor-pointer inline-block"
              >
                Seleccionar archivo
              </label>
            </div>
          )}
        </div>

        {enableTranslation && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="translate"
              checked={translate}
              onChange={(e) => setTranslate(e.target.checked)}
              className="rounded text-whatsapp-primary focus:ring-whatsapp-primary"
            />
            <label htmlFor="translate" className="text-whatsapp-textDark">
              Traducir contenido
            </label>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            onClick={handleUpload}
            className="btn-primary"
            disabled={!file || isLoading}
          >
            {isLoading ? 'Cargando...' : 'Subir archivo'}
          </button>
        </div>
      </div>
    </Modal>
  );
}; 
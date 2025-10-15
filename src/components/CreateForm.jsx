import { useEffect, useRef, useState } from "react";
import "./CreateForm.css";
import { createArticle } from "../services/ArticlesServices";
import { useAuthStore } from "../store/authStore";
import {
  confirmAction,
  showSuccess,
  showError,
  showWarning,
} from "./SweetAlerts";

const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const CLOUDINARY_FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

const CreateForm = () => {
  const { user } = useAuthStore(); // Accedemos al usuario logueado
  // console.log("Usuario desde Zustand:", user)

  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category_id, setCategoryId] = useState();
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const imageInputRef = useRef(null);

  // Manejo del archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  // Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    // Creamos un "evento simulado" con la misma estructura
    const fakeEvent = { target: { files: e.dataTransfer.files } };
    handleFileChange(fakeEvent);
  };

  const removeImage = (index) => setImageFile(null); //quitar?

  // Subida a Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", CLOUDINARY_FOLDER); // carpeta donde se guardarán las imágenes

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al subir la imagen");

    const data = await response.json();
    return data.secure_url; //la URL pública de Cloudinary
  };

  // --- Validación del formulario
  const isFormValid =
    title.trim() &&
    category_id &&
    category_id !== "#" &&
    content.trim() &&
    imageFile;

  // --- Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!isFormValid) {
      showWarning({
        title: "Formulario incompleto",
        text: "Por favor, completa todos los campos y sube una imagen antes de publicar.",
      });
      return; // Salimos si falta algo
    }

    const { isConfirmed } = await confirmAction({
      title: "¿Publicar artículo?",
      text: "Podrás editarlo luego.",
      confirmButtonText: "Sí, publicar",
      cancelButtonText: "Cancelar",
      icon: "question",
    });
    if (!isConfirmed) return;
    setUploading(true);

    try {
      let imageUrl = "";

      if (imageFile) imageUrl = await uploadImageToCloudinary(imageFile);

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
        console.log("✅ Imagen subida a Cloudinary:", imageUrl);
      }

      const articleData = {
        title,
        content,
        image: imageUrl,
        author_id: user?.id,
        category_id,
      };
      console.log("ARTICLE DATA TO SEND:", articleData);
      const created = await createArticle(articleData);
      console.log("Artículo creado en DB", created);
      showSuccess({
        title: "¡Publicado!",
        text: "Tu artículo se ha creado correctamente. 🎉",
      });

      // Reiniciar formulario
      setTitle("");
      setCategoryId("");
      setContent("");
      setImageFile(null);
    } catch (error) {
      console.error(error);
      showError({
        title: "Error al crear",
        text: error?.message || "No se pudo crear el artículo.",
      });
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      <section className="form-section">
        <div className="form-container">
          <div className="form-header">
            <h1>Crear Nuevo Artículo</h1>
            <p>Comparte tu conocimiento sobre botánica o astronomía</p>
          </div>

          <form action="article-form" id="articleForm" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label className="form-label">
                Título <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                id="title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">
                Categoría <span className="required">*</span>
              </label>
              <select
                name="category"
                id="category"
                value={category_id}
                required
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="#">Selecciona una opción</option>
                <option value={2}>Astronomía</option>
                <option value={1}>Botánica</option>
              </select>
            </div>

            {/* Content  */}
            <div className="form-group">
              <label className="form-label">
                Contenido <span className="required">*</span>
              </label>
              <textarea
                id="content"
                className="form-textarea"
                placeholder="Escribe aquí el contenido de tu artículo..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            {/* Images  */}
            <div className="form-group">
              <label className="form-label">
                Imágenes <span className="required"></span>
              </label>
              <div
                className={`image-upload-area ${isDragging ? "dragover" : ""}`}
                id="uploadArea"
                onClick={() => imageInputRef.current.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="upload-icon">📷</div>
                <div className="upload-text">
                  Haz clic o arrastra imágenes aquí
                </div>
                <div className="upload-hint">PNG, JPG</div>
              </div>

              <input
                type="file"
                className="file-input"
                id="imageInput"
                ref={imageInputRef}
                accept="image/*"
                onChange={handleFileChange}
              />

              {/* Preview  */}
              {imageFile && (
                <div className="image-preview-container" id="imagePreview">
                  <div className="image-preview">
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Previsualización"
                    />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={removeImage}
                    >
                      x
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions - Buttons Delete/Create  */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => window.history.back()}
                disabled={uploading}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className={`btn btn-primary ${
                  !isFormValid || uploading ? "btn-disabled" : ""
                }`}
                disabled={uploading || !isFormValid}
              >
                {uploading ? "Publicando" : "Publicar Artículo"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateForm;

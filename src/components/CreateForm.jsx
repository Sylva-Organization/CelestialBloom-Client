import { useRef, useState } from 'react'
import './CreateForm.css'
import { createArticle } from '../services/ArticlesServices'

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
const CLOUDINARY_FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER

const CreateForm = () => {
    const [imageFile, setImageFile] = useState(null)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [content, setContent] = useState('')
    const [uploading, setUploading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const imageInputRef = useRef(null)

    // Manejo del archivo
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) setImageFile(file)
    }

    // Drag & Drop
    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        
        // Creamos un "evento simulado" con la misma estructura
        const fakeEvent = { target: { files: e.dataTransfer.files } };
        handleFileChange(fakeEvent);
    }

    const removeImage = (index) => setImageFile(null) //quitar?

    // Subida a Cloudinary
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", UPLOAD_PRESET)
        formData.append("folder", CLOUDINARY_FOLDER) // carpeta donde se guardarán las imágenes

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        )

        if (!response.ok) throw new Error("Error al subir la imagen")

        const data = await response.json()
        return data.secure_url //la URL pública de Cloudinary
    }

    // --- Validación del formulario
    const isFormValid = title.trim() && category && category !== "#" && content.trim() && imageFile

    // --- Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validaciones 
        if (!isFormValid) {
            alert("⚠️ Por favor, completa todos los campos y sube una imagen antes de publicar.")
            return // Salimos si falta algo
        }
        
        setUploading(true)

        try {
            let imageUrl = ""

            if (imageFile) imageUrl = await uploadImageToCloudinary(imageFile)

            if (imageFile) {
                imageUrl = await uploadImageToCloudinary(imageFile)
                console.log("✅ Imagen subida a Cloudinary:", imageUrl)
            }

            const articleData = {
                title,
                content,
                image: imageUrl,
                user_id: 1, //cambiar próximamente dependiendo del usuario que se inicie sesión
                category_id: category === 'astronomia' ? 2 : 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                categories: {
                    id: category === 'astronomia' ? 2 : 1,
                    name: category === 'astronomy' ? 'astronomia' : 'botanica'
                }
            }

            const created = await createArticle(articleData)
            console.log('Artículo creado en DB', created)
            alert('¡Artículo publicado con éxito! 🎉')

            // Reiniciar formulario
            setTitle('')
            setCategory('')
            setContent('')
            setImageFile(null)

        } catch (error) {
            console.error(error)
            alert("Error al crear el artículo")
        } finally {
            setUploading(false)
        }

    }
    return (
        <>
            <section className="form-section">
                <div className="form-container">
                    <div className="form-header">
                        <h1>Crear Nuevo Artículo</h1>
                        <p>Comparte tu conocimiento sobre botánica o astronomía</p>
                    </div>

                    <form action="article-form" id='articleForm' onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="form-group">
                            <label className="form-label">Título <span className="required">*</span></label>
                            <input type="text" className='form-input' id='title' value={title} required onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        {/* Category */}
                        <div className="form-group">
                            <label className="form-label">Categoría <span className="required">*</span></label>
                            <select name="category" id="category" value={category} required onChange={(e) => setCategory(e.target.value)}>
                                <option value="#">Selecciona una opción</option>
                                <option value="astronomia">Astronomía</option>
                                <option value="botanica">Botánica</option>
                            </select>
                        </div>

                        {/* Content  */}
                        <div className="form-group">
                            <label className="form-label">Contenido <span className="required">*</span></label>
                            <textarea id="content" className="form-textarea" placeholder='Escribe aquí el contenido de tu artículo...' required value={content} onChange={(e) => setContent(e.target.value)}></textarea>

                        </div>

                        {/* Images  */}
                        <div className="form-group">
                            <label className="form-label">Imágenes <span className="required"></span></label>
                            <div className={`image-upload-area ${isDragging ? 'dragover' : ''}`} id='uploadArea' onClick={() => imageInputRef.current.click()} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                                <div className="upload-icon">📷</div>
                                <div className="upload-text">Haz clic o arrastra imágenes aquí</div>
                                <div className="upload-hint">PNG, JPG</div>
                            </div>

                            <input type="file" className="file-input" id='imageInput' ref={imageInputRef} accept='image/*' onChange={handleFileChange} />


                            {/* Preview  */}
                            {imageFile && (
                                <div className="image-preview-container" id='imagePreview'>
                                    <div className="image-preview">
                                        <img src={URL.createObjectURL(imageFile)} alt="Previsualización" />
                                        <button type='button' className="remove-image" onClick={removeImage}>x</button>
                                    </div>
                            </div>
                            )}
                        </div>

                        {/* Form Actions - Buttons Delete/Create  */}
                        <div className="form-actions">
                            <button type='button' className="btn btn-secondary" onClick={() => window.history.back()} disabled={uploading}>Cancelar</button>
                
                            <button type='submit' className={`btn btn-primary ${(!isFormValid || uploading) ? 'btn-disabled' : ''}`} disabled={uploading || !isFormValid}>{uploading ? "Publicando" : "Publicar Artículo"}</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CreateForm
import { useEffect, useRef, useState } from 'react'
import './EditForm.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneArticle, updateArticle } from '../services/ArticlesServices'

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
const CLOUDINARY_FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER

const EditForm = () => {
    const { id } = useParams() // obtenemos el id desde la URL
    const [imageFile, setImageFile] = useState(null)
    const [existingImage, setExistingImage] = useState(null)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [content, setContent] = useState('')
    const [uploading, setUploading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const navigate = useNavigate()

    const imageInputRef = useRef(null)

    // --- Cargar datos ya existentes ---
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const article = await getOneArticle(id)
                setTitle(article.title)
                setContent(article.content)
                setExistingImage(article.image || null)
                setCategory(article.categories?.name || '') //Mirar si está bien
            } catch (error) {
                console.error('Error al cargar artículo:', error)
            }
        }
        fetchArticle()
    }, [id])

    // --- Manejo del archivo ---
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setExistingImage(null)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => setIsDragging(false)

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) {
            setImageFile(file)
            setExistingImage(null)
        }
    }

    const removeImage = () => {
        setImageFile(null)
        setExistingImage(null)
    }

    // --- Subida a Cloudinary ---
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", UPLOAD_PRESET)
        formData.append("folder", CLOUDINARY_FOLDER)

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        )

        if (!response.ok) throw new Error("Error al subir la imagen")
        const data = await response.json()
        return data.secure_url
    }

    // --- Validación del formulario
    const isFormValid = title.trim() && category && category !== "#" && content.trim()

    // --- Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isFormValid) {
            alert("⚠️ Completa todos los campos.")
            return // Salimos si falta algo
        }

        setUploading(true)

        try {
            let imageUrl = existingImage
            if (imageFile) {
                imageUrl = await uploadImageToCloudinary(imageFile)
                console.log("✅ Imagen subida a Cloudinary:", imageUrl)
            }

            const updatedArticle = {
                title,
                content,
                image: imageUrl,
                category_id: category === 'astronomia' ? 2 : 1,
                updatedAt: new Date().toISOString(),
                categories: {
                    id: category === 'astronomia' ? 2 : 1,
                    name: category === 'astronomy' ? 'astronomia' : 'botanica'
                }
            }

            await updateArticle(id, updatedArticle) //?
            alert("✅ Artículo actualizado con éxito")

            // Esperar 1.5 segundos antes de redirigir
            setTimeout(() => {
                navigate('/') // Redirige a la página principal
            }, 1500)

        } catch (error) {
            console.error(error)
            alert("❌ Error al actualizar el artículo")
        } finally {
            setUploading(false)
        }
    }

    return (
        <>
            <section className="form-section">
                <div className="form-container">
                    <div className="form-header">
                        <h1>Editar Artículo</h1>
                        <p>Modifica los datos de tu artículo</p>
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
                            <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
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
                            <label className="form-label">Imágenes <span className="required">*</span></label>
                            <div className={`image-upload-area ${isDragging ? 'dragover' : ''}`} id='uploadArea' onClick={() => imageInputRef.current.click()} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                                <div className="upload-icon">📷</div>
                                <div className="upload-text">Haz clic o arrastra imágenes aquí</div>
                                <div className="upload-hint">PNG, JPG</div>
                            </div>
                            <input type="file" className="file-input" id='imageInput' ref={imageInputRef} accept='image/*' onChange={handleFileChange} />

                            {/* Preview  */}
                            {(existingImage || imageFile) && (
                                <div className="image-preview-container" id='imagePreview'>
                                    <div className="image-preview">
                                        <img src={imageFile ? URL.createObjectURL(imageFile) : existingImage} alt="Vista previa" />

                                        <button type='button' className="remove-image" onClick={removeImage}>x</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Form Actions - Buttons Delete/Create  */}
                        <div className="form-actions">
                            <button type='button' className="btn btn-secondary" onClick={() => window.history.back()} disabled={uploading}>Cancelar</button>
                            <button type='submit' className="btn btn-primary" disabled={!isFormValid || uploading}>{uploading ? "Guardando..." : "Editar Artículo"}</button>
                        </div>
                    </form>
                </div>

            </section>
        </>
    )
}

export default EditForm
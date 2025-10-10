import { useRef, useState } from 'react'
import './EditForm.css'

const EditForm = () => {
    const [uploadedImages, setUploadedImages] = useState([])
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [content, setContent] = useState('')
    const [isDragging, setIsDragging] = useState(false)

    // const uploadAreaRef = useRef(null);
    const imageInputRef = useRef(null)

    // Manejo de imágenes
    const handleFiles = (files) => {
        const fileArray = Array.from(files)
        const newImages = [...uploadedImages]

        /**Bucle con condicionales (?) para: ----> Mirar
         * si la cantidad de imágenes supera las permitidas 
         * si las imágenes son de tamaño mayor al solicitado
         * si la imagen es una no válida
         */

        fileArray.forEach((file) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                setUploadedImages((prev) => [
                    ...prev,
                    { name: fileArray.name, data: e.target.result },
                ])
            }
            reader.readAsDataURL(file)
        })
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        handleFiles(e.dataTranfer.files)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const removeImage = (index) => {
        setUploadImages(uploadedImages.filter((_, i) => i !== index))
    }

    // --- Envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title || !category || !content) {
            alert('Por favor, completa todos los campos obligatorios')
            return
        }

        const articleData = {
            title,
            category,
            subcategory: subcategory || null,
            content,
            images: uploadedImages,
            publishedAt: new Date.toISOString(),
        }

        console.log('Artículo publicado: ', articleData)
        alert('¡Artículo publicado con éxito! 🎉') // hacerlo con un modal
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
                            <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="#">Selecciona una opción</option>
                                <option value="astronomy">Astronomía</option>
                                <option value="botany">Botánica</option>
                            </select>
                        </div>

                        {/* Subcategory  */}
                        <div className="form-group">
                            <label className="form-label">Subcategoría <span className="optional">(opcional)</span></label>
                            <input type="text" className="form-input" id='subcategory' placeholder='Ej: Plantas carnívoras, Exoplanetas, Fotosíntesis, etc.' value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
                        </div>

                        {/* Content  */}
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Contenido <span className="required">*</span></label>
                            <textarea name="" id="content" className="form-textarea" placeholder='Escribe aquí el contenido de tu artículo...' required value={content} onChange={(e) => setContent(e.target.value)}></textarea>

                        </div>

                        {/* Images  */}
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Imágenes <span className="required"></span></label>
                            <div className={`image-upload-area ${isDragging ? 'dragover' : ''}`} id='uploadArea' onClick={() => imageInputRef.current.click()} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                                <div className="upload-icon">📷</div>
                                <div className="upload-text">Haz clic o arrastra imágenes aquí</div>
                                <div className="upload-hint">PNG, JPG</div>
                            </div>
                            <input type="file" className="file-input" id='imageInput' ref={imageInputRef} accept='image/png, image/jpeg, image/jpg' multiple onChange={(e) => handleFiles(e.target.files)} style={{ display: 'none' }} />

                            {/* Preview  */}
                            <div className="image-preview-container" id='imagePreview'>
                                {uploadedImages.map((img, index) => (
                                    <div key={index} className="image-preview">
                                        <img src={img.data} alt={img.name} />
                                        <button type='button' className="remove-image" onClick={() => removeImage(index)}>x</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Actions - Buttons Delete/Create  */}
                        <div className="form-actions">
                            <button type='button' className="btn btn-secondary" onClick={() => window.history.back()}>Cancelar</button>
                            <button type='submit' className="btn btn-primary">Publicar Artículo</button>
                        </div>
                    </form>
                </div>

            </section>
        </>
    )
}

export default EditForm
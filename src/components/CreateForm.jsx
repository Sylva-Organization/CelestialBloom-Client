import { useRef, useState } from 'react'
import './CreateForm.css'
import { createArticle } from '../services/ArticlesServices'

const CreateForm = () => {
    // const [formData, setFormData] = useState({
    //     title: '',
    //     categories: [
    //         'botanica',
    //         'astronomia'
    //     ]
    // })
    const [uploadedImage, setUploadedImage] = useState([])
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [content, setContent] = useState('')
    const [isDragging, setIsDragging] = useState(false)

    const imageInputRef = useRef(null)

    // Manejo de imágenes (solo una)
    const handleFiles = (files) => {
        const file = files[0]
        
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setUploadedImage([{ name: file.name, data: e.target.result }])
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        handleFiles(e.dataTransfer.files)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const removeImage = (index) => {
        // setUploadedImages(uploadedImages.filter((_, i) => i !== index))
        setUploadedImage(uploadedImage.filter((_, i) => i !== index))
    }

    // --- Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !category || !content) {
            alert('Por favor, completa todos los campos obligatorios')
            return
        }

        //Estructura que coincide con db.json
        const articleData = {
            title: title,
            content: content,
            image: uploadedImage.length > 0 ? uploadedImage[0].data : "",
            user_id: 1, // Ajusta según el usuario logueado si tienes autenticación
            category_id: category === 'astronomia' ? 2 : 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: {
                id: category === 'astronomia' ? 2 : 1,
                name: category === 'astronomy' ? 'astronomia' : 'botanica'
            } 
        }

        try {
            const created = await createArticle(articleData)
            console.log('Artículo creado en DB', created)
            alert('¡Artículo publicado con éxito! 🎉')   

            // Reiniciar formulario
            setTitle('')
            setCategory('')
            setContent('')
            setUploadedImage([])

        } catch (error) {
            console.error(error)
            alert('Error al crear el artículo')
        }

        // console.log('Artículo publicado: ', articleData)
        // alert('¡Artículo publicado con éxito! 🎉') // hacerlo con un modal
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

                        {/* Subcategory  */}
                        {/* <div className="form-group">
                            <label className="form-label">Subcategoría <span className="optional">(opcional)</span></label>
                            <input type="text" className="form-input" id='subcategory' placeholder='Ej: Plantas carnívoras, Exoplanetas, Fotosíntesis, etc.' value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
                        </div> */}

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

                            <input type="file" className="file-input" id='imageInput' ref={imageInputRef} accept='image/png, image/jpeg, image/jpg' multiple onChange={(e) => handleFiles(e.target.files)} style={{ display: 'none' }} />

                            {/* Preview  */}
                            <div className="image-preview-container" id='imagePreview'>
                                {uploadedImage.map((img, index) => (
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

export default CreateForm
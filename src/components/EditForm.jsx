import './EditForm.css'

const EditForm = () => {
    return (
        <>
            <section className="form-section">
                <div className="form-container">
                    <div className="form-header">
                        <h1>Crear Nuevo Artículo</h1>
                        <p>Comparte tu conocimiento sobre botánica o astronomía</p>
                    </div>

                    <form action="article-form" id='articleForm'>
                        {/* Title */}
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Título <span className="required">*</span></label>
                            <input type="text" className='form-input' id='title' required oninput="updateCharCounter('title', 'titleCounter', 100)" />
                        </div>

                        {/* Category */}
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Categoría <span className="required">*</span></label>
                            <select name="category" id="category">
                                <option value="#">Selecciona una opción</option>
                                <option value="astronomy">Astronomía</option>
                                <option value="botany">Botánica</option>
                            </select>
                        </div>

                        {/* Subcategory  */}
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Subcategoría <span className="optional">(opcional)</span></label>
                            <input type="text" className="form-input" id='subcategory' placeholder='Ej: Plantas carnívoras, Exoplanetas, Fotosíntesis, etc.' />
                        </div>

                        {/* Content  */}
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Contenido <span className="required">*</span></label>
                            <textarea name="" id="content" className="form-textarea" placeholder='Escribe aquí el contenido de tu artículo...' required oninput="updateCharCounter('content', 'contentCounter', 10000)"></textarea>

                        </div>

                        {/* Images  */}
                        <div className="form-group">
                            <label htmlFor="" className="form-label">Imágenes <span className="required"></span></label>
                            <div className="image-upload-area" id='uploadArea' onclick="document.getElementById('imageInput').click()">
                                <div className="upload-icon">📷</div>
                                <div className="upload-text">Haz clic o arrastra imágenes aquí</div>
                                <div className="upload-hint">PNG, JPG</div>
                            </div>
                            <input type="file" className="file-input" id='imageInput' accept='image/png, image/jpeg, image/jpg' multiple onChange="handleFiles(this.files)" />
                            <div className="image-preview-container" id='imagePreview'></div>
                        </div>

                        {/* Form Actions - Buttons Delete/Create  */}
                        <div className="form-actions">
                            <button type='button' className="btn btn-secondary" onclick="window.history.back()">Cancelar</button>
                            <button type='submit' className="btn btn-primary">Publicar Artículo</button>
                        </div>
                    </form>
                </div>

            </section>
        </>
    )
}

export default EditForm
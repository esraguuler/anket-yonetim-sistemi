import { useState } from "react"

import { useDispatch, useSelector } from "react-redux";
import { MultiStepForm, Step } from 'react-multi-form'

import { addFormElement } from "../redux/actions";
import { generateFormType } from "../utils";
import Card from "./Card"
import FormElement from "./FormElement"
import PreviewForm from "./PreviewForm";


const FormBuilder = () => {
    const formElements = useSelector(state => state.formElements)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('Form Başlığı')
    const [description, setDescription] = useState('Form Açıklaması')   
    const [showQuestionType, setShowQuestionType] = useState(false)
    const [createForm, setCreateForm] = useState(false)
    const [activeStep, setActiveStep] = useState(1)
    const [error, setError] = useState(false)

    const createQuestion = (type) => {
        setShowQuestionType(false)
        const newQuestion = generateFormType(type)
        dispatch(addFormElement(newQuestion))
    }

    const nextStep = () => {
        if (activeStep === 2 && formElements.length < 1) {
            setError(true)
        } else {
            setError(false)
            setActiveStep(activeStep + 1)
        }
    }
 
    return (
        <>
        <div className="container mt-5">
            <MultiStepForm activeStep={activeStep} accentColor="#123123">
                <Step label='Başlık ve açıklama'>
                    <Card className="mt-5 mb-3">
                        <div className="mb-4">
                            <label htmlFor="fromTitle" className="form-label">Form Başlığı</label>
                            <input type="text" className="form-control" id="fromTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="formDescription" className="form-label">Form Açıklaması</label>
                            <textarea className="form-control" id="formDescription" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                    </Card>
                </Step>

                <Step label='Soru Ekle'>
                    {formElements?.map((formElement, index) => (
                        <FormElement
                            key={formElement.id}
                            element={formElement}
                            index={index}
                            createQuestion={createQuestion}
                            createForm={createForm}
                        />
                    ))}

                    {showQuestionType && 
                        <Card className="mt-3 position-relative">
                            <button className="position-absolute top-0 end-0 btn" onClick={() => setShowQuestionType(false)}>
                                <i className="bi bi-x-lg"></i>
                            </button>
                            <h5>Soru türünü seçin</h5>
                            <div className="row">
                                <div className="col-12 col-md-6 my-1 d-grid">
                                    <button className="card p-2" onClick={() => createQuestion("text")}>
                                        <h6>Metin Sorusu</h6>
                                    </button>
                                </div>
                                <div className="col-12 col-md-6 my-1 d-grid">
                                    <button className="card p-2" onClick={() => createQuestion("dropdown")}>
                                        <h6>Dropdown</h6>
                                    </button>
                                </div>
                                <div className="col-12 col-md-6 my-1 d-grid">
                                    <button className="card p-2" onClick={() => createQuestion("rating")}>
                                        <h6>Derecelendirme</h6>
                                    </button>
                                </div>
                                <div className="col-12 col-md-6 my-1 d-grid">
                                    <button className="card p-2" onClick={() => createQuestion("boolean")}>
                                        <h6>Evet/Hayır</h6>
                                    </button>
                                </div>
                            </div>
                        </Card>
                    }

                    <div className="d-flex justify-content-center flex-row mt-3" style={{marginBottom: "5rem"}}>
                        <button className="btn btn-secondary" onClick={() => {setShowQuestionType(true); setCreateForm(false); setError(false);}}>+ Soru Ekle</button>
                    </div>

                    {error && <h5 className="text-danger text-center">*** En az bir soru ekleyin</h5>}
                </Step>

                <Step label='Onayla'>
                    <h1 className="my-5 text-center">Onayla</h1>
                    <h4 className="text-center">Formu düzenlemek için 'Önceki'yi tıklayın. Devam etmek için 'Form Oluştur'u tıklayın.</h4>
                    <div className="mb-3">
                        <PreviewForm title={title} description={description} setCreateForm={setCreateForm} />
                    </div>
                </Step>
            </MultiStepForm>

            <div style={{marginBottom: "5rem"}}>
                {activeStep !== 1 && (
                    <button className="btn btn-secondary" onClick={() => setActiveStep(activeStep - 1)}><i className="bi bi-arrow-left"></i> Önceki</button>
                )}
                {activeStep !== 3 && (
                    <button className="btn btn-secondary"
                    onClick={nextStep}
                    style={{ float: 'right' }}
                    >
                    Sonraki <i className="bi bi-arrow-right"></i>
                    </button>
                )}
            </div>
        </div>
        {formElements?.length > 0 && 
            <>
            <div className="bg-dark position-fixed bottom-0 create-section p-3">
                <div className="container d-flex justify-content-end">
                    <button className="btn btn-success me-1" onClick={() => setCreateForm(true)} data-bs-toggle="modal" data-bs-target="#previewFormModal">Ön izleme</button>
                    {activeStep === 3 && <button className="btn btn-success" onClick={() => setCreateForm(true)}>Form Oluştur</button> }
                </div>
            </div>

            <div className="modal fade" id="previewFormModal">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Form Önizlemesi</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <PreviewForm title={title} description={description} setCreateForm={setCreateForm} />
                        </div>
                    </div>
                </div>
            </div>
            </>
        }
        </>
    )
}

export default FormBuilder
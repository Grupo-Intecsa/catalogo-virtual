
import React from 'react'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const Step2 = (props) => {

    const step2Schema = yup.object().shape({
        title: yup.string().required(),
        coduniversal: yup.string().optional(),
        sku: yup.string().optional(),
        brand: yup.string().required(),
        label: yup.string().required(),
        desc: yup.string().required(),
        familia: yup.string().optional(),
        capacidad: yup.string().optional()
    })

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(step2Schema)
    })    

    const onSubmit = (data) => {
        
        const { title, coduniversal, sku, label, brand, desc } = data

        const datosOtros = {
            title,
            coduniversal,
            sku,
            desc,
            brand: [{ "brand_id": brand }],
            label: [{ "label_id": label }]
        }

        props.send('GO_STEP3', { data: datosOtros })
    }

    const { brands, labels } = props.labelsAndBrands

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Paso 2</h1>
            <section>
            <legend>Datos del Producto</legend>
            <div id="form--container">
            
                                
                <label htmlFor="title">Nombre del producto</label>
                        <input 
                            type="text"
                            id="title" 
                            name="title" 
                            ref={register} 
                            placeholder="Nombre corto del producto"
                        />
                        <small>*Dato Requerido</small>
                        {errors.title?.message &&
                        <div className="alert alert-danger" role="alert">
                            Campo Requerido
                        </div>
                        }

                <label htmlFor="coduniversal">Codigo EAN</label>
                <input 
                    type="text" 
                    id="coduniversal" 
                    name="coduniversal" 
                    ref={register}
                    placeholder="Codigo de Barras"
                />

                <label htmlFor="sku">SKU</label>
                <input 
                    type="sku" 
                    id="sku" 
                    name="sku" 
                    ref={register} 
                    placeholder="SKU del producto"

                />

                <label htmlFor="familia">Familia</label>
                <input 
                    type="familia" 
                    id="familia" 
                    name="familia" 
                    ref={register} 
                    placeholder="Nombre de la familia"

                />

                <label htmlFor="capacidad">Capacidad, tamaño o tipo</label>
                <input 
                    type="capacidad" 
                    id="capacidad" 
                    name="capacidad" 
                    ref={register} 
                    placeholder="Amperes, medida o material"

                />

                <label htmlFor="brand">Marca</label>
                <select id="brand" name="brand" ref={register}>
                <option></option>
                    {Object.values(brands.response).map(item => 
                            <option key={`${item._id}`} value={item._id}>{item.title}</option>
                        )}
                </select>
                <small className="mt-2">*Dato Requerido</small>
                {errors.brand?.message &&
                        <div className="alert alert-danger" role="alert">
                            Campo Requerido
                        </div>
                }
                
                
                <label htmlFor="label">Categoria</label>
                <select id="label" name="label" ref={register}>
                    <option></option>
                    {Object.values(labels.response).map(item => 
                            <option key={`${item._id}`} value={item._id}>{item.title}</option>
                        )}
                </select>
                <small className="mt-2">*Dato Requerido</small>
                {errors.label?.message &&
                        <div className="alert alert-danger" role="alert">
                            Campo Requerido
                        </div>
                        }

                <label htmlFor="desc">Descripción Larga</label>
                <textarea 
                    type="text" 
                    id="desc" 
                    name="desc" 
                    ref={register} 
                    rows="6"
                    cols="50"
                    placeholder="Este campo también se incluye en el indexado de la búsqueda, puedes incluir palabras que puedan ayudar al cliente"
                />
                <small className="mt-2">*Dato Requerido</small>
                {errors.desc?.message &&
                        <div className="alert alert-danger" role="alert">
                            Campo Requerido
                        </div>
                        }
                
            </div>
            </section>
            <section className="mt-2 mb-2 d-flex justify-content-end">
                <button className="btn mr-2 btn-outline-danger" type="submit">Siguiente</button>
            </section>
        </form>
    )
}

export default withRouter(Step2)
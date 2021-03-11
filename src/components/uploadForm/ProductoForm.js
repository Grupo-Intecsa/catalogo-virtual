import { CContainer } from '@coreui/react'
import React from 'react'

import { useMachine } from '@xstate/react'
import { MachineProductForm } from '../../context/UpdateFormXstate'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'

const Step1 = React.lazy(() => import('./steps/Step1'))
const Step2 = React.lazy(() => import('./steps/Step2'))
const Step3 = React.lazy(() => import('./steps/Step3'))
const Step4 = React.lazy(() => import('./steps/Step4'))
const Final = React.lazy(() => import('./steps/Final'))

const UploadForm =  (props) => {

    const [ state, send ] = useMachine(MachineProductForm)
    
    //  Para poder ver el el estado del servicio es necesario 
    // useEffect(() => {
    //     const sub = service.subscribe((state) => {
    //         console.log(state)
    //     })
    //     return () => sub.unsubscribe()
    // },[state])

    const { init, step1, step2, step3, step4, final, productData, labelsAndBrands } = state.context
    // No se podran abrir las secciones si no estan termiandas 
    
    return(
    <CContainer className="d-flex flex-column mt-5" id="UploadForm">

    { init && (
        <>
            <span className="p-2 bg-success text-center text-white mb-2">Último producto agregado: <strog>{productData?.step2?.model}</strog></span>
            <h4 className="bg-info p-3">Formulario de alta de productos</h4>
            <p>
                Es necesario antes de continuar, tengas los datos de código del producto de AdminPaq o Comercial,
                las fotograficas deben ser en formato webp ya que una vez iniciado el formulario y te falta un dato, 
                no se podrá guardar el avance.
            </p>
            <div className="mb-3 d-flex flex-center justify-content-around mt-3">
                <button className="nuevo--producto" onClick={() => send('GO_STEP1')} >Nuevo</button>
                {" "}
                <button className="update--producto">Actualizar</button>
            </div>
        </>
    )}
        
        { step1 &&
    
        <div>
            <div className="bg-info mb-2 text-left text-white p-2"><FontAwesomeIcon icon={faArchive} /></div>
            <Step1 send={send} state={state} />
        </div>
        }

    
        {step2 &&
        <div>
            <div className="bg-info mb-2 text-left text-white p-2"><FontAwesomeIcon icon={faArchive} /></div>
            <Step2 send={send} labelsAndBrands={labelsAndBrands} />
        </div>
        }

    
        {step3 &&
        <div>
            <div className="bg-info mb-2 text-left text-white p-2"><FontAwesomeIcon icon={faArchive} /></div>
            <Step3 send={send} />
        </div>
            
        }

    
        {step4 &&
        <div>
            <div className="bg-info mb-2 text-left text-white p-2"><FontAwesomeIcon icon={faArchive} /></div>
            <Step4 send={send} />
        </div>
        }        

        {final &&
        <div>
            <div className="bg-success mb-2 text-left text-white p-2"><FontAwesomeIcon icon={faArchive} /></div>
            <Final send={send} {...props} />
            
        </div>
        }        

    </CContainer>

    )
}



export default UploadForm
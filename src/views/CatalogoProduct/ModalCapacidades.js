import { useEffect, useMemo, useState } from 'react'

// maquia de estado
import { CatalogoXstate } from 'context/CatalogoXstate'
import { useMachine } from '@xstate/react'

import { useHistory } from 'react-router-dom'
import { Modal } from 'antd';

const ModalCapacidades = ({ isSelect, toogleModalCap, id }) => {

const history = useHistory()

const [ state, send ] = useMachine(CatalogoXstate)
const [ selectValue, setSelectValue ] = useState("")
const [ errorSelect, setErrorSelect ] = useState({})
const { productsOfParent } = state.context

useEffect(() => {
    send('GET_PRODUCTS_BY_PARENT_ID', { data: id })
},[id, send])

const productSelected = useMemo(() => {
    
    let select
    if(state.matches('success')){
        select = Object.values(productsOfParent).filter(item => item._id === selectValue ).map(value => {
            return { id: value._id, model: value.model, title: value.title }
        })
    }
    return select 

},[selectValue, productsOfParent, state])

const handledOkButtom = () => {
    

    if(productSelected === undefined){
        return setErrorSelect({ error: "Debe seleccionar un valor para continuar" })
    }

    const id = productSelected?.map(({ id, ...restOfData }) => id ).join("")
    // const title = productSelected?.map(({ title }) => title).join("")

    return history.replace({ 
            pathname: `/detalle/${id}/${'detalle'}`,
            state: '@send/hookcard'
        })
}

return (
    <Modal
        okText="Ir"
        wrapClassName="supermodal" 
        title="Selecciona la capacidad que necesitas" 
        visible={isSelect} 
        onCancel={toogleModalCap} width={500}
        onOk={handledOkButtom}
        
        >
        
        <div className="hookCardModal">

        {errorSelect?.error && <span className="bg-danger p-2 text-center mb-1">{errorSelect.error}</span>}

        {
        state.matches('success') && (
            <>
            
            {productSelected?.map(({ model, title, id }) => {
                return(
                    <div key={id} className="titulos__modal__hook">
                        <p>Nombre del Producto:</p><span>{title}</span>
                        <p>Modelo del Producto:</p><span>{model}</span>
                    </div>
                )
            })}

            <select className="form-select form-select-lg mb-3" value={selectValue} onChange={(e) => setSelectValue(e.target.value)} >
                <option 
                    value={0}
                    defaultValue={0}
                    selected
                    >Selecciona la capacidad</option>
                {Object.values(productsOfParent).map(item => <option value={item._id}>{item.capacidad}</option>)}
            </select> 
            </>)   
        }
        </div>
    </Modal>
)
}



export default ModalCapacidades
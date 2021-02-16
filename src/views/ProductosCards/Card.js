import React, { useMemo, useState } from 'react'
import { CCard, CCardHeader, CButton, CCollapse, CCardBody, CImg } from '@coreui/react'

const Card = ({ props }) =>{

    const { title, tags, amount, price, ml, amazon, img, content, marca, modelo, ficha, accesorios } = props

    const [ accordion, setAccordion ] = useState(0)    
    const fichasContent = [
        { slug: 'ficha', content: ficha },
        { slug: 'accesorios', content: accesorios }
    ]
    const [ navFichas, setNavFichas ] = useState('ficha')

        const handledProductos = (e) => {   
            let slug = e.target.value
            setNavFichas(slug)
        }

    const valueMemo =  useMemo(() => {
        const value = fichasContent.filter(item => item.slug === navFichas)[0]?.content
        
        return value
    }, [navFichas])
    
    return(
        <CCard>
        <CCardHeader id="headingTwo">
            <CButton 
            block 
            color="link" 
            className="text-left m-0 p-0 d-flex align-items-center justify-content-center" 
            onClick={() => setAccordion(accordion === 0 ? 1 : 0 )}
            >
            <div className="col-6 text-body d-flex flex-column">
                <span className="text--productos--title">
                    {title}
                </span>
                <span className="text-value-xl">
                    {`$${price}`}
                </span>
                <small className="text-danger">
                    {`Piezas disponibles: ${amount}`}
                </small>
            </div>
            <div className="col-4">
                <CImg src={img} alt={tags} className="img-fluid" style={{ 'max-width': '80%' }} />
            </div>
            </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 1}>
            <CCardBody>
            <hr />
            <span className="text-body" style={{ 'fontSize': 'large' }}>Compralo ahora en:</span>
            <div className="mt-4 d-flex justify-content-around">
                { amazon === null ? null :  <CImg target="google.com" className="col-4 div--button" src='img/logo/amazon-2.svg' onClick={() => window.location.href=amazon} />}
                { ml === null ? null : <CImg className="col-4 div--button" src='img/logo/mercado-libre-logo.svg' onClick={() => window.location.href=ml} />}
            </div>
            <hr />
            <span>{content}</span>
            <div className="d-flex align-content-center mt-3">
            <table className="tab-content table-responsive-lg table-outline">
                <tbody>
                    <tr className="table-selected">
                        <th scope="row">Marca</th>
                        <td>{marca}</td>
                    </tr>
                    <tr className="ml-3">
                        <th scope="row">Modelo</th>
                        <td>{modelo}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <hr />
            <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
            <CButton className={navFichas === 'ficha' ? 'nav-link active btn-ghost-info' : 'nav-link active' } value="ficha" onClick={handledProductos}>Ficha técnica</CButton>
            </li>
            <li className="nav-item">
            <CButton className={navFichas === 'accesorios' ? 'nav-link active btn-ghost-info' : 'nav-link active' } value="accesorios" onClick={handledProductos}>Accesorios</CButton>
            </li>
            </ul>
            <div>
            <p className="ml-1">{ valueMemo }</p>
            </div>
            </CCardBody>
        </CCollapse>
        </CCard>
    )
}

export default Card
import React, { useState } from 'react'
import { CCard, CCardHeader, CButton, CCollapse, CCardBody, CImg } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'


const Card = () =>{

    const [accordion, setAccordion] = useState(0)
    console.log(accordion)

    return(
        <CCard className="mb-1">
        <CCardHeader id="headingTwo">
            <CButton 
            block 
            color="link" 
            className="text-left m-0 p-0 d-flex align-items-center justify-content-center" 
            onClick={() => setAccordion(accordion === 0 ? 1 : 0 )}
            >
            <div className="col-6 text-body">
                <span className="text--productos--title">
                    Audífonos Gamer Onikuma K5 negro
                </span>
            </div>
            <div className="col-6">
                <CImg src="https://http2.mlstatic.com/D_Q_NP_731024-MLA43701246671_102020-AB.webp" alt="foto de audífonos" className="img-fluid" />
            </div>
            </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 1}>
            <CCardBody>
            <div>
            2. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
            cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
            on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
            nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
            beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven''t heard of them accusamus labore sustainable VHS.
            </div>
            <div className="mt-4   d-flex justify-content-around">
                <CImg className="col-4" src="img/logo/amazon-2.svg"/>
                <CImg className="col-4" src="img/logo/mercado-libre-logo.svg"/>
            </div>

            </CCardBody>
        </CCollapse>
        </CCard>
    )
}

export default Card
import React from 'react'
import { CContainer } from '@coreui/react'

import promo from "../../assets/unisec_promo.png"

const GtiBanner = () => {
    return(
        <div>
        <CContainer fluid className="d-flex justify-content-center">
        
        <div className="banner--git mb-2 d-flex justify-content-center">
            <div className="col-4 p-1 mt-5 column-banner d-none d-sm-block">
            <h1>UniSec</h1>
            <p>Celdas de media tensión aisladas en aire para la distribución secundaria de hasta 24 kV, 1250 A, 25 kA</p>
            </div>
            <div className="d-flex">
            <img loading="lazy" src={promo} alt="imagen promo" className="img-fluid" />
        </div>
        </div>
        
        
        </CContainer>
        <h5 className="d-block d-sm-none p-1 text-center">Visita la sección de Unisec</h5>
        </div>
    )
}


export default GtiBanner
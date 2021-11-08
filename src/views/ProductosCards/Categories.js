import React from 'react'

import { 
    CRow,
    CContainer,

} from '@coreui/react'

import { Link } from 'react-router-dom'

const Categories = () => {

    return(
        <CContainer className="categorias mt-3">

            <CRow className="d-flex justify-content-around">            
            {/* menu para celular */}
            {/* to={"/products/brand/60dcceaab22f37097c58161e"} */}
                <Link to={"/products/brand/60dcceaab22f37097c58161e/abb"}>
                    <div className="btn butom-rounded-cate ico--brand--abb">
                    </div>
                </Link>

                {/* TODO FALTA  */}
                <Link to={"/products/brand/6143b3c4fb10c4b5ed4faadb/csm"}>
                    <div className="btn butom-rounded-cate ico--brand--csm">
                    </div>
                </Link>

                {/* TODO FALTA  */}
                <Link to={"/products/brand/6049d29c3fbec93ddc4cb2e0/onka"}>
                    <div className="btn butom-rounded-cate ico--brand--onka">
                        {/* <span>Onka</span> */}
                    </div>
                </Link>

                <Link to={"/products/brand/60dcce9fb22f37097c58161c/ita"}>
                    <div className="btn butom-rounded-cate ico--brand--ita">
                    </div>
                </Link>

                
            </CRow>
        </CContainer>
    )
}


export default Categories
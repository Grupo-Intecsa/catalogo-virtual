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

                <Link to={"/product/marcas/6034cb26e2d7b850a03fd393"}>
                    <div className="btn butom-rounded-cate ico--brand--abb">
                    </div>
                </Link>

                <Link to={"/product/marcas/603eef9df2aaf100158dc3a6"}>
                    <div className="btn butom-rounded-cate ico--brand--csm">
                    </div>
                </Link>

                <Link to={"/product/marcas/6049d29c3fbec93ddc4cb2e0"}>
                    <div className="btn butom-rounded-cate ico--brand--onka">
                        {/* <span>Onka</span> */}
                    </div>
                </Link>

                <Link to={"/product/marcas/607f029a21558b264c6a1422"}>
                    <div className="btn butom-rounded-cate ico--brand--ita">
                    </div>
                </Link>

                
            </CRow>
        </CContainer>
    )
}


export default Categories
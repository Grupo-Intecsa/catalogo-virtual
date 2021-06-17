import React from 'react'

import { 
    CCol,
    CRow,
    CContainer,

} from '@coreui/react'

import { Link } from 'react-router-dom'


// componentes
// import Cmenu from '../Cmenu/Cmenu'

// Context
// import { useCatalogoState, useCatalogoDispatch } from '../../context/catalogoContext'


const Categories = (props) => {

    // const { location } = props.busqueda

    // const busquedaText = useMemo(() => {
    //     let nameSearch = location.pathname.split("/")
    //     return nameSearch.slice(nameSearch.length - 2, nameSearch.length)
    // },[location])

    // const dispatch = useCatalogoDispatch()
    // const state = useCatalogoState()

    // const { labels, brands } = state.context

    // useEffect(() => {
    //     dispatch("GET_MENU")
    // },[dispatch])

    return(
        <CContainer className="categorias">

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
        
            {/* <CRow className="d-flex flex-column d-sm-down-none"> */}
        
                <CCol>
                {/* menu de categorias */}
                {/* <Cmenu props={{...brands, cardname: "Marcas" }} /> */}

                {/* Labels */}
                {/* <Cmenu props={{...labels, cardname: "Categorias" }} /> */}

                </CCol>
            {/* </CRow> */}
            
        </CContainer>
    )
}


export default Categories
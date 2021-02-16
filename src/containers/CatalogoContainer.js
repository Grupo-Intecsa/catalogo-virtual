import React from 'react'
import { 
    CCol,
    CContainer, 
    CRow,
} from '@coreui/react'

import Card from '../views/ProductosCards/Card'
import Categories from '../views/ProductosCards/Categories'

// TODO hacer modal una vez que se hace link en la tienda virtual
// TODO crear el paginador de busqueda
// TODO implementar la API


const dataTest = [
    {
        id: '01',
        tags: 'clema rosa abb',
        title: 'Abb Ohys2aj1 Manija Selector 66mm Amarillo/rojo 6mmø',
        condition: 'Nuevo',
        amount: '3',
        price: '100',
        ml: 'https://articulo.mercadolibre.com.mx/MLM-669285900-abb-ohys2aj1-manija-selector-66mm-amarillorojo-6mm-_JM',
        amazon: null,
        img: 'https://http2.mlstatic.com/D_NQ_NP_776564-MLM29619166448_032019-O.webp',
        content: 'MANIJA TIPO SELECTOR IP65, NEMAI, 3R, 12 AMARILLO CON ROJO 66MM MARCA: ABB MODELO: OHYS2AJ1 TIPO SELECTOR DE 6MMØ',
        marca: 'ABB',
        modelo: 'CA3-10',
        ficha: 'www.google.com',
        accesorios: 'Proximamente'
    },
    {
        id: '02',
        tags: 'guarda motor 12 amperes abb',
        title: 'Abb 1sam350000r1012 Guardamotor, Ms132-12, 12amperes',
        condition: 'Nuevo',
        amount: '0',
        price: '100',
        ml: 'https://articulo.mercadolibre.com.mx/MLM-684149644-abb-1sam350000r1012-guardamotor-ms132-12-12amperes-_JM',
        amazon: null,
        img: 'https://http2.mlstatic.com/D_NQ_NP_605234-MLM31380925036_072019-O.webp',
        content: 'GUARDAMOTOR MARCA ABB MODELO MS132-12, 3 POLOS, 12 AMPERES, CORRIENTE NORMAL DE FUNCIONAMIENTO 8.00 A 12.0a, CAPACIDAD DE RUPTURA DE CORTOCIRCUITO ICS A 400 Vca 20 kA',
        marca: 'ABB',
        modelo: 'CA3-10',
        ficha: 'www.google.com',
        accesorios: 'Proximamente'
    },
    {
        id: '03',
        tags: 'interruptor mini termomagnetico 2cds253001r0804',
        title: 'Abb 2cds253001r0804 Mini Interruptor S203-c80 Amps',
        condition: 'Nuevo',
        amount: '4',
        price: '100',
        ml: 'https://articulo.mercadolibre.com.mx/MLM-664485376-abb-2cds253001r0804-mini-interruptor-s203-c80-amps-_JM',
        amazon: 'https://google.com',
        img: 'https://http2.mlstatic.com/D_NQ_NP_802565-MLM29395744951_022019-O.webp',
        content: 'SI REQUIERE FACTURA FAVOR DE ENVIAR SUS DATOS FISCALES POR MENSAJE DIRECTO DESPUÉS DE REALIZAR LA COMPRA MINI INTERRUPTOR TERMOMAGNETICO MARCA ABB MODELO S203-C80, 3 POLOS, 80 AMPERES, HASTA 480Vac 6kA, CURVA DE DISPARO C',
        marca: 'ABB',
        modelo: 'CA3-10',
        ficha: 'www.google.com',
        accesorios: 'Proximamente'
    },
    {
        id: '04',
        tags: 'Abb 2csf202006r1400 Mini Interruptor',
        title: 'Abb 2csf202006r1400 Mini Interruptor Resid Fh202 Ac-40/0,03',
        condition: 'Nuevo',
        amount: '5',
        price: '100',
        ml: 'https://articulo.mercadolibre.com.mx/MLM-570440505-abb-2csf202006r1400-mini-interruptor-resid-fh202-ac-40003-_JM',
        amazon: null,
        img: 'https://http2.mlstatic.com/D_NQ_NP_802565-MLM29395744951_022019-O.webp',
        content: 'SI REQUIERE FACTURA FAVOR DE ENVIAR SUS DATOS FISCALES POR MENSAJE DIRECTO DESPUÉS DE REALIZAR LA COMPRA MINI INTERRUPTOR DIFERENCIAL MARCA ABB MODELO FH202 AC-40/0,03, 2 POLOS, 40/0.03 AMPERES 440 Vca 40A, 30mA, 2 polos',
        marca: 'ABB',
        modelo: 'CA3-10',
        ficha: 'www.google.com',
        accesorios: 'Proximamente'
    },
    {
        id: '05',
        tags: 'Abb 1sbn011010t1010 contactor',
        title: 'Abb 1sbn011010t1010 Bloque Aux P/contactor Relev Ca3-10 Pza',
        condition: 'Nuevo',
        amount: '1',
        price: '100',
        ml: 'https://articulo.mercadolibre.com.mx/MLM-686199712-abb-1sbn011010t1010-bloque-aux-pcontactor-relev-ca3-10-pza-_JM',
        amazon: null,
        img: 'https://http2.mlstatic.com/D_NQ_NP_850896-MLM30889368677_052019-O.webp',
        content: 'SI REQUIERE FACTURA FAVOR DE ENVIAR SUS DATOS FISCALES POR MENSAJE DIRECTO DESPUÉS DE REALIZAR LA COMPRA MINI INTERRUPTOR DIFERENCIAL MARCA ABB MODELO FH202 AC-40/0,03, 2 POLOS, 40/0.03 AMPERES 440 Vca 40A, 30mA, 2 polos',
        marca: 'ABB',
        modelo: 'CA3-10',
        ficha: 'www.google.com',
        accesorios: 'Proximamente'
    }
]


const CatalogoContainer  = () => {
    
    return(
    <CContainer fluid>
        <CRow className="d-flex mt-5 justify-content-arround justify-content-center mb-4">
            <CCol className="col-sm-3">
                <Categories />
            </CCol>
            <CCol className="col-12 col-md-8 col-lg-6">
                {dataTest.map(item => <Card key={item.id} props={item} />)}
            </CCol>
        </CRow>
    </CContainer>
        
    )
}

export default CatalogoContainer
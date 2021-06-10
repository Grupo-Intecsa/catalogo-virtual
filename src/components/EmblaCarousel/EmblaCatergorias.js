import React, { Fragment, useEffect, useCallback, useState } from 'react'
// import { useMachine } from '@xstate/react'
// import { CatalogoMachine } from '../../context/catalogoContext'
import { useEmblaCarousel } from 'embla-carousel/react'
import { PrevButton, NextButton } from './EmblaCarouselButtons'


export default function EmblaCategorias(){

    const categorias = [
        {
            "_id": "604481f6e7efc75880f4c8ab",
            "title": "Accesorios Buses",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6034c58f514d194a40cd9dc6",
            "title": "Accesorios Gabineteria",
            "count": 1,
            "is_active": true
        },
        {
            "_id": "604481c8e7efc75880f4c8a6",
            "title": "Accesorios Xt",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604730d09c44aa299ce4d225",
            "title": "Acometida Lamina Galvanizada",
            "count": 6,
            "is_active": true
        },
        {
            "_id": "6044819fe7efc75880f4c8a2",
            "title": "Arrancador A Tension Plena",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604481dde7efc75880f4c8a8",
            "title": "Artu K",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60445081dfe8ca5bece23437",
            "title": "Artu L",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6049db703fbec93ddc4cb2e4",
            "title": "Base Niveladora Pos",
            "count": 3,
            "is_active": true
        },
        {
            "_id": "60444fc4dfe8ca5bece2342d",
            "title": "Botoneria",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6049dae83fbec93ddc4cb2e1",
            "title": "Caja Pos De Aluminio",
            "count": 10,
            "is_active": true
        },
        {
            "_id": "6049db1d3fbec93ddc4cb2e2",
            "title": "Caja Pos De Lamina",
            "count": 12,
            "is_active": true
        },
        {
            "_id": "60444f23dfe8ca5bece23426",
            "title": "Clavija",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60444f0ddfe8ca5bece23425",
            "title": "Clemas Y Separadores",
            "count": 4,
            "is_active": true
        },
        {
            "_id": "604481d2e7efc75880f4c8a7",
            "title": "Conductores Y Aisladores",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60448357e7efc75880f4c8ce",
            "title": "Conector Weidmuller",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6044827de7efc75880f4c8b8",
            "title": "Contacto Aux",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604450aadfe8ca5bece2343a",
            "title": "Contacto Estado Solido",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604482f7e7efc75880f4c8c4",
            "title": "Contactor",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60444fa5dfe8ca5bece2342c",
            "title": "Contactor Alta Capacidad",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60448222e7efc75880f4c8af",
            "title": "Contactor Estado Solido",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60444f59dfe8ca5bece23428",
            "title": "Contactor Industrial",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60444f64dfe8ca5bece23429",
            "title": "Contactor Relay",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604481e6e7efc75880f4c8a9",
            "title": "Contactores Residenciales",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604731a49c44aa299ce4d229",
            "title": "Cople Union Ducto Lamina",
            "count": 6,
            "is_active": true
        },
        {
            "_id": "6044502adfe8ca5bece23431",
            "title": "Driver",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604730f79c44aa299ce4d226",
            "title": "Ducto Lamina Galvanizada",
            "count": 12,
            "is_active": true
        },
        {
            "_id": "6044504bdfe8ca5bece23433",
            "title": "Filtro Armonicas Y Silletas",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60448301e7efc75880f4c8c5",
            "title": "Fuente De Alimentación",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6044825ce7efc75880f4c8b5",
            "title": "Fusible",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60448252e7efc75880f4c8b4",
            "title": "Fusible Bussman",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60448369e7efc75880f4c8d0",
            "title": "Fusibles",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6044834de7efc75880f4c8cd",
            "title": "Gabinete Am2",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6034c5c2514d194a40cd9dc9",
            "title": "Gabinete Epower",
            "count": 1,
            "is_active": true
        },
        {
            "_id": "6034c565514d194a40cd9dc4",
            "title": "Gabinete Europa",
            "count": 17,
            "is_active": true
        },
        {
            "_id": "60448324e7efc75880f4c8c9",
            "title": "Gabinete Metalico",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6034c575514d194a40cd9dc5",
            "title": "Gabinete Mistral Gemini",
            "count": 8,
            "is_active": true
        },
        {
            "_id": "60445010dfe8ca5bece23430",
            "title": "Gabineteria Is2",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6044832de7efc75880f4c8ca",
            "title": "Ganineteria Is2",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6034c550514d194a40cd9dc3",
            "title": "Guardamotores",
            "count": 1,
            "is_active": true
        },
        {
            "_id": "60444f93dfe8ca5bece2342b",
            "title": "Int Diferencial",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6034c3e949c0b8191c0bc2e2",
            "title": "Interruptores Y Accesorios",
            "count": 30,
            "is_active": true
        },
        {
            "_id": "60448201e7efc75880f4c8ac",
            "title": "Maneta",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60445000dfe8ca5bece2342f",
            "title": "Medicion",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6034c60a514d194a40cd9dcc",
            "title": "Medidores - Tomacorrientes",
            "count": 1,
            "is_active": true
        },
        {
            "_id": "6044822ae7efc75880f4c8b0",
            "title": "Mini Contactor",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60448234e7efc75880f4c8b1",
            "title": "Mini Contactor Relay",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6044831ce7efc75880f4c8c8",
            "title": "Mini Interruptor High Performance",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6034c5d4514d194a40cd9dca",
            "title": "Mini Interruptores",
            "count": 104,
            "is_active": true
        },
        {
            "_id": "60444f82dfe8ca5bece2342a",
            "title": "Overload Relay",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60444fd9dfe8ca5bece2342e",
            "title": "Panelboard",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6049db4b3fbec93ddc4cb2e3",
            "title": "Placa Pos",
            "count": 9,
            "is_active": true
        },
        {
            "_id": "604482dce7efc75880f4c8c1",
            "title": "Platinas Termoplastico",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604482e4e7efc75880f4c8c2",
            "title": "Plc",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604481eee7efc75880f4c8aa",
            "title": "Portafusible Din",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60448247e7efc75880f4c8b3",
            "title": "Portafusibles",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6034c5a3514d194a40cd9dc7",
            "title": "Protecta",
            "count": 1,
            "is_active": true
        },
        {
            "_id": "603ef2c3f2aaf100158dc3a7",
            "title": "Registro Eléctrico",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6034c5f8514d194a40cd9dcb",
            "title": "Relay Encapsulado - Fuente Alimentacion - Timer",
            "count": 1,
            "is_active": true
        },
        {
            "_id": "60448313e7efc75880f4c8c7",
            "title": "Relevador Estado Solido",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60448219e7efc75880f4c8ae",
            "title": "Relevadores Monitoreo",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604481a8e7efc75880f4c8a3",
            "title": "Seccionador",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604482cae7efc75880f4c8bf",
            "title": "Seccionador En Gab Inox",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604482bae7efc75880f4c8be",
            "title": "Seccionador En Gabinete",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60445055dfe8ca5bece23434",
            "title": "Supresor De Picos",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604731169c44aa299ce4d227",
            "title": "Tapa Lamina Galvanizada",
            "count": 6,
            "is_active": true
        },
        {
            "_id": "604482ede7efc75880f4c8c3",
            "title": "Termostato O Sensor",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604481b0e7efc75880f4c8a4",
            "title": "Transferencia",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60445067dfe8ca5bece23435",
            "title": "Transferencia Motorizada",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60448336e7efc75880f4c8cb",
            "title": "Transformador",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6044829ee7efc75880f4c8bb",
            "title": "Transformador De Control",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60448293e7efc75880f4c8ba",
            "title": "Transformador De Control Encapsulado",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604482d2e7efc75880f4c8c0",
            "title": "Transformador Tipo Dona",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60445088dfe8ca5bece23438",
            "title": "Unifix H",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60444f4fdfe8ca5bece23427",
            "title": "Unifix L",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "6044830ae7efc75880f4c8c6",
            "title": "Varistor",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "60448267e7efc75880f4c8b6",
            "title": "Zapata",
            "count": 0,
            "is_active": true
        },
        {
            "_id": "604482b0e7efc75880f4c8bd",
            "title": " Limit Switch",
            "count": 0,
            "is_active": true
        }
        ]

    const catData = categorias.filter(item => item.count > 0)

    const [ emblaRef, embla ] = useEmblaCarousel({ loop: true })
    
    useEffect(() => {
        if(embla && embla.slideNodes().length !== catData.length){
            embla.reInit()
        }
    },[catData, embla])

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [ setSelectedIndex] = useState(0);
    const [ setScrollSnaps ] = useState([]);
    // const [_selectedIndex, setSelectedIndex] = useState(0);
    // const [_scrollSnaps, setScrollSnaps] = useState([]);


    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
    // const _scrollTo = useCallback(() => embla && embla.scrollTo(), [embla])

    const onSelect = useCallback(() => {
        if (!embla) return;
            setSelectedIndex(embla.selectedScrollSnap());
            setPrevBtnEnabled(embla.canScrollPrev());
            setNextBtnEnabled(embla.canScrollNext());
        }, [embla, setSelectedIndex]);

    useEffect(() => {
        if (!embla) return;
        onSelect();
        setScrollSnaps(embla.scrollSnapList());
        embla.on("select", onSelect);
    }, [embla, setScrollSnaps, onSelect]);

return(
<Fragment>
<h1 className="text-center text-black-50 mt-2">Categorías</h1>
<div className="embla__familias" ref={emblaRef}>
    <div className="embla__container"> 
    {catData.map((cat, index) => {
        return(
            <>
            <div className="embla__slide__categorias" key={index}>
                <div className="labels-items">
                    <div>
                    <h1>{cat.title} la factura</h1>
                    </div>
                </div>
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </div>

            </>
        )
        }
    )}
    </div>
</div>
</Fragment>
)
}

// https://css-tricks.com/practical-css-scroll-snapping/
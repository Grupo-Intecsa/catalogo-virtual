import { useState } from 'react'
import { Link  } from 'react-router-dom'

export default function CardBrandComponent({ val }){

    const [ open, setOpen ] = useState(false)
    const handleClose = () => setOpen(!open)

    return (
        <div className="product--card--menu">
        <section className="navMenu" onClick={handleClose}>
            <span className={open ? "drop__down__btn__active" : "drop__down__btn__inactive"} >{ val.indice }</span>
        </section>
        <section hidden={open}>
            {
                val.payload.map(({ familia, img, label }, index) => {
                    return(
                    <Link key={index} to={`/products/brand/label/${label}/familia/${familia}`} >
                        <div className="brand--menu--card">
                            <img src={img} alt={familia}/>
                            <p>{familia}</p>
                        </div>
                    </Link>
                    )
                })
            }
        </section>
    </div>
    )

}
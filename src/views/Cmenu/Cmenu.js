import React, { Fragment } from 'react'
import { CLink } from '@coreui/react'

const Cmenu = ({ props }) => {

    return(
        <Fragment>

            <div><p className="bg--random--products mt-3">{props.cardname}</p></div>
            {Object.values(props).slice(0, Object.values(props).length - 1 ).map(item => {
                return(    
                    
                    <CLink 
                        onClick={() => document.body.scrollTop = 0 }
                        to={`/product/${(props.cardname).toLowerCase()}/${item._id}`} 
                        className="nolink d-flex justify-content-between menu--categorias--container">
                            {item.title}<p>{item.count}</p>
                    </CLink>
                )}
            )}

        </Fragment>
    )
}

// window.scrollTo(0,0) ya no se quiere ir para arriba

export default Cmenu
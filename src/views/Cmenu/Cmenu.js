import React from 'react'
import { CLink } from '@coreui/react'

const Cmenu = ({ props }) => {

    return(
        <div>

            <div><p className="bg--random--products mt-3">{props.cardname}</p></div>
            {Object.values(props).slice(0, Object.values(props).length - 1 ).map(item => {
                return(    
                    <div className="menu--categorias--container" onClick={() => window.scrollTo(0,0) }>
                        <CLink to={`/product/${(props.cardname).toLowerCase()}/${item._id}`} className="nolink d-flex justify-content-between">{item.title}<p>{item.count}</p></CLink>
                    </div>            
                )}
            )}

        </div>
    )
}

export default Cmenu
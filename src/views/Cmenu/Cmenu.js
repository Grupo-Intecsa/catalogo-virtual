import React from 'react'
import { CLink } from '@coreui/react'

const Cmenu = ({ props }) => {

    return(
        <div id="#Labels">

            <div><p className="bg--random--products mt-3">{props.cardname}</p></div>
            {Object.values(props).slice(0, Object.values(props).length - 1 ).map(item => {
                return(
                    <div>
                        <div className="menu--categorias--container">
                            <CLink to={`/product/${item._id}`} className="nolink d-flex justify-content-between">{item.title}<p>{item.count}</p></CLink>
                        </div>            
                    </div>
                )}
            )}

        </div>
    )
}

export default Cmenu
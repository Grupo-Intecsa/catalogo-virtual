import React, { Fragment } from 'react'
import { CLink } from '@coreui/react'

const Cmenu = ({ props }) => {

    return(
        <Fragment>
            <div className="menuTop">
            {Object.values(props).slice(0, Object.values(props).length - 1 ).map((item, index) => {
                return(    
                <div key={`${index} ${item._id}`}>    
                    <CLink 
                        onClick={() => document.body.scrollTop = 0 }
                        to={`/product/${(props.cardname).toLowerCase()}/${item._id}`} 
                        className="nolink d-flex justify-content-between menu--categorias--container">
                        <p>
                            {item.title}
                            <br />
                            {item.count}
                        </p>
                    </CLink>
                </div>
                )}
            )}
            </div>

        </Fragment>
    )
}

// window.scrollTo(0,0) ya no se quiere ir para arriba

export default Cmenu
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
// import utils from 'utils/utils'

const FamiliasCard = ({ payload, slug }) =>{

  const familias = useMemo(() => {    
    let allFamilias = payload.map(item => item.familia)
    return allFamilias.filter((item, index) => allFamilias.indexOf(item) === index )
  },[payload])

  
  return(
    <div className="d-flex justify-content-center">
      <section className="familias--card">   
        {
          familias.map((item, index) => {
            // let imgProduct = utils.getFoto(item, payload)
            return(
            <Link key={index} className="btn--link--familia" to={`/familia/categories/${slug}/familia/${item}`}>
              <span>
                {/* <img src={imgProduct}></img> */}
                <p>{ item }</p>
              </span>
            </Link>
            )
          })
        }
      </section>
    </div>
  )
}


export default FamiliasCard
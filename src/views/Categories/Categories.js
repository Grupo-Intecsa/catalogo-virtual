
import React, { useEffect, useMemo, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
// import { Helmet } from 'react-helmet'

import { CatalogoXstate } from 'context/CatalogoXstate'
import { useMachine } from '@xstate/react'

import utils from 'utils/utils'
import MenuBreadCrumb from 'components/MenuBreadCrumb'
import FamiliasCard from 'components/Categorias/FamiliasCard'
import SkeletonCardProduct from 'components/skeletons/SkeletonCardProduct'

const Categories = () => {

  const [ state, send ] = useMachine(CatalogoXstate)
  const params = useParams()

  const history = useHistory()
  const categoTitle = history.location.state?.title
  const titleStorage = useMemo(() => {
      return utils.lastTitleCategories({ title: categoTitle })
  })

  const { categoriaSelection } = state.context
    
  useEffect(() => {
    send("GET_PRODUCTS_BY_LABEL_ID", { id: params?.slug })
  },[])

  const topRef = useRef()
  useEffect(() => {
    utils.scrollTotop(topRef)
  })

  // const metadescription = state.matches("success") && categoriaSelection.map(item => item.title)

  return(
    <div className="categorias--container" ref={topRef}>
      {/* <Helmet
          meta={[
            {
              name: "description",
              content: metadescription.toString()
            }
          ]}
        >
        <title>{ categoTitle || titleStorage }</title>
        <link rel="canonical" href="http://itamx.com/categories" />
      </Helmet> */}

      <h1>{ categoTitle || titleStorage }</h1>
      <span style={{ width: "100%", display:"flex", justifyContent: "center" }}><MenuBreadCrumb /></span>

      <section>
        {
          state.matches("getProductsByLabelId") && <SkeletonCardProduct />
        }
        {
          state.matches("success") && categoriaSelection.length === 0 ? <div>Aún no hay elementos en esta cátegoria</div> : null 
        }
        {
          // state.matches("success") && <div><FamiliasCard payload={categoriaSelection} slug={params?.slug} /></div>
        }
      </section>
    </div>
  )
}

export default Categories
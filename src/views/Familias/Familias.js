import { useEffect, useRef, useContext, useMemo  } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { CatalogoXstate } from 'context/CatalogoXstate'
import { useMachine } from '@xstate/react'
import utils from 'utils/utils'
import { AppContext } from 'context/AppContext'

import MenuBreadCrumb from 'components/MenuBreadCrumb'
import SlimCard from 'components/Product/SlimCard'
import FamiliasBar from 'components/Categorias/FamiliasBar'
import SkeletonCardProduct from 'components/skeletons/SkeletonCardProduct'

const Familias = ({ match }) => {
  const topRef = useRef()

  useEffect(() => {
    if(match.isExact) utils.scrollTotop(topRef)
  })

  const [ state, send ] = useMachine(CatalogoXstate)
  const params = useParams()
  
  const { categoriaSelection } = state.context
  
  useEffect(() => {
    send("GET_PRODUCTS_BY_LABEL_ID", { id: params?.slug })
  },[])
  
  const { famBarItemSelected, setFamBarItemSelected } = useContext(AppContext)
  useEffect(() => {
    return () => setFamBarItemSelected([])
  },[])


  const cardRef = useRef()  
  const familiaSelected = useMemo(() => {   

    cardRef.current?.animate([
      // keyframes
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-4px)' }
    ], {
      // timing options
      duration: 100,
      iterations: 1
    });

    return utils.getSelection({
        familiaName: params.item, 
        payload: categoriaSelection, 
        selection: famBarItemSelected 
      })

  },[famBarItemSelected, utils, categoriaSelection, params])


  const description = useMemo(() => {
    const dataDesc = state.matches("success") && categoriaSelection.map(item => item.title)
    return dataDesc
  },[state])

  return(
    <div ref={topRef}>


      <Helmet 
          meta={[
            {
              name: 'description',
              content: description.toString()
            }
          ]}
        >
        <title>{ params?.item }</title>
      </Helmet>
      
      <h1 className="title">{params?.item}</h1>
      {/* TODO MIGAS DE PAN */}
      <span style={{ width: "100%", display:"flex", justifyContent: "center" }}><MenuBreadCrumb /></span>

      <div className="familias--container">
        <section className="familias--bar">
          <p>Capacidad</p>
          { state.matches('success') && <FamiliasBar payload={categoriaSelection} slug={params?.item} />}
        </section>
        <section className="familias--body" ref={cardRef}>
          {
            state.matches("getProductsByLabelId") && <SkeletonCardProduct />
          }
          {
            state.matches("success") && (familiaSelected.map((item, index) => {
              return(
                <SlimCard key={index} data={item} familiaID={params?.item}/>
              )
            }))
          }
        </section>
        </div>
    </div>
  )

}

export default Familias
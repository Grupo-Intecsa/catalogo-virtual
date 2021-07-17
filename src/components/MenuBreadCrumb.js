import React, { Fragment, useContext, useEffect, useRef } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { allproductos } from 'utils/utils'
import { AppContext } from 'context/AppContext'

// TODO ARREGLAR EL BUG DE LA TARJETA FINAL DE PRODUCTO QUE NO SABE EL ITEM ANTERIOR
// TODO Meterle el State del componenten anterior el segundo boton debe llevar el stete del link 

const MenuBreadCrumb = () => {

  const linkRef = useRef()

  const { migas, setMigas } = useContext(AppContext)

  const params = useParams()
  const history = useHistory()
  const location = history.location.pathname.split("/")

  const nameSeccion = ( id ) => {
    let name =  allproductos.filter(item => item.id === id ) 
    return name.length > 0 ? name.map(item => item.title) : id
  }

  const handleBack = ( index )  => {

    if(location.includes("product") && location.includes("name")){
      // selecciono familia
      let familia = migas[1]
      let categoria = migas[0]
      if( index === migas.length - 1){
        return null 

      }else if( index === 1 ){
        return history.push({ pathname: `/familia/categories/${categoria}/familia/${familia}`})

      }else if( index === 0 ){
        return history.push({ pathname: `/categories/${categoria}`})
      }


    }else if(location.includes("categories")){
      // selecciono categoria desde del pantalla de familias 
      let categoria = migas[0]
      if(index === 0){
        return history.push({ pathname: `/categories/${categoria}`})
      }
      
    }else if( migas.length - 1 === index ){
      return null 
    }
    
  
  }

  useEffect(() => {
    if(location.includes("categories") && location.includes("familia")){

        let categoria = params.slug
        let familia = params.item
      setMigas([ categoria, familia])

    }else if(location.includes("categories")){
      let categoria = params.slug
      setMigas([ categoria ])

    }else if(location.includes("product") && history.location.state !== undefined ){

      let productName = params.title
      let categoria = history.location.state?.categoria
      let familia = history.location.state?.familia

      setMigas([ categoria, familia, productName ])


    }else if(location.includes("product") && migas.length < 3 ){
      let productName = params.title
      setMigas([ productName ])

    }
  },[params])

  return (
    <Fragment>
    <nav className="migasdepan">
    <Link to="/"><div className="home--btn--migas"></div></Link>
      { 
      Array.isArray(migas) && migas.map((tab, index) => {
        return(
          <div className="d-flex" key={index}>
          <a
            ref={linkRef}
            onClick={() => handleBack(index)}
          >
            <div 
              className={ index === migas.length - 1 ? "btn--migas btn--migas--selected" : "btn--migas" }>
              <p className="truncate">{ nameSeccion(tab) }{" "}</p>
            </div> 
          </a>
          </div>
        )
      })}
      
    </nav>
    </Fragment>
  )
}


export default MenuBreadCrumb
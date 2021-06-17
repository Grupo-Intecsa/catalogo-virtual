import React, { useEffect } from 'react'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'

import logoABB from 'assets/icons/abb_ico.png'

const VerticalCard = ({ data }) => {

  const logoMap = [
    {
      id: "6034cb26e2d7b850a03fd393",
      logo: logoABB
    }
  ]

  const logoSelector = (id) => {

    const logo = logoMap.find(item => item.id === id )

    return(
      logo ? <img src={logo.logo} alt="logo de empresa" style={{ height: "auto", width: "80px"}} /> : "No brand"
    ) 

  }

  return(
    <div className="vertical--container">
      { 
        data.map(item => {
          return(
            <div key={item._id} className="vertical--card">

              <div className="vertica--card--img">
                <img src={item.urlfoto[0]} alt={item.title} />
              </div>

              <div className="vertical--card--text">
                <span className="mb-2">{item.brand.map(item => logoSelector(item.brand_id))}</span>
                <p>{item.title}</p>
                <span className="font-weight-bold">Modelo: {item.model}</span>
              </div>

              <span>{item.ml ? item.ml : 'No hay precio'}</span>

            </div>
          )
        })
      }
    </div>
  )
}

const Teste = () => {

  const [ state, send ] = useMachine(CatalogoXstate)

  useEffect(() => {
      send('SAMPLE')
  },[])

  const { sample } = state.context

  return(
    <div className="teste">
      <h2 className="text-center">Ultimos Productos</h2>
      <div>{state.matches("success") && <VerticalCard data={sample?.prod} />}</div>
      <div className="button--control">
        <button className="control--carousel"><FontAwesomeIcon icon={faArrowLeft}/></button>
        <button className="control--carousel"><FontAwesomeIcon icon={faArrowRight}/></button>
      </div>
    </div>
  )
}


export default Teste


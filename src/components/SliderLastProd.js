
import React, { useEffect, useContext, useState } from 'react'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'
import { AppContext } from 'context/AppContext'
import SkeletonVerticalCard from 'components/skeletons/SkelentonVerticalCard'
import _masProductos from 'assets/bg/masproductos.png'


const VerticalCard = ({ data }) => {

  const [ isDown, setIsDown ] = useState(false)
  const [ startX, setStartX ] = useState(undefined)
  const [ scrollLeft, setScrollLeft ] = useState(undefined)

  const grabSlider = () => {
    let slider = document.getElementById("sliderPromo")

    slider.onmousedown = function(e){
      setIsDown(true)
      slider.classList.add("active--grab")
      setStartX(e.pageX - slider.offsetLeft)
      setScrollLeft(slider.scrollLeft)
    }

    slider.onmouseleave = function(){
      setIsDown(false)
      slider.classList.remove("active--grab")
    }

    slider.onmouseup = function(){
      setIsDown(false)
      slider.classList.remove("active--grab")
    }

    slider.onmousemove = function(e){
      if(!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 3 //scroll fast
      slider.scrollLeft = scrollLeft - walk
    }

  }

  useEffect(() => {
    grabSlider()
  })

  const { mlVerify, MlPrice, logoSelector, linkName } = useContext(AppContext)

  return(
    <div className="vertical--container" id="sliderPromo">
      { 
        data.map(item => {
          
          return(
          <Link to={`/product/${item._id}/name/${linkName(item.title)}`} className={ item.isKit ? "vertical--card vertical--card--familia" : "vertical--card"}>
          <div key={item._id}>

              <div className="vertica--card--img">
                <img src={item.urlfoto[0]} alt={item.title} />
              </div>

              <div className="vertical--card--text">
                <span className="mb-2">{item.brand.map(item => logoSelector(item.brand_id))}</span>
                <span className="font-weight-bold">Modelo: {item.model}</span>

              <div className="precioCard">
                  <span className="precioCard">{ mlVerify(item.ml) ? <MlPrice ml={item.ml} /> : null }</span>
              </div>
          </div>              
              
              <p>{item.title}</p>              
              <div className="text-center">
                { item.isKit ? <span className="precioCard">Varias Medidas</span> : null }
              </div>

            </div>
            </Link>
          )
        })
      }
      <div className="final--vertical--card">

          <span>¡Entra y descubre más productos!</span>
          <img src={_masProductos} alt="promoABB" loading="lazy" />

      </div>
    </div>
  )
}

const SliderLastProd = () => {

  const [ state, send ] = useMachine(CatalogoXstate)

  const buttonRight = function(){
    let ref = document.getElementById("sliderPromo")
    return ref.scrollLeft +=200
  }

  const buttonLeft = function(){
    let ref = document.getElementById("sliderPromo")   
    return ref.scrollLeft -=200
  }

  useEffect(() => {
      send('SAMPLE')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const { sample } = state.context


  return(
    <div className="VerticalSlider">
      <h2 className="text-center">Ultimos Productos</h2>
      <div>
        <div className={state.matches("sample") ? "card--skeleton--container" : null}>
          {state.matches("sample") && [1,2,3,4,5].map(item => <SkeletonVerticalCard key={item} />) }
        </div>
        <div>
          {state.matches("success") && <VerticalCard data={sample?.prod}/>}
        </div>
      </div>
      <div className="button--control" hidden={ !state.matches("success") }>
        <button id="leftArrow" className="control--carousel button-trans" onClick={buttonLeft}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <button id="rightArrow" className="control--carousel button-trans" onClick={buttonRight}><FontAwesomeIcon icon={faArrowRight} /></button>
      </div>
    </div>
  )
}


export default SliderLastProd


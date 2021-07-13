import React, { useState } from 'react'
import utils from 'utils/utils'

const ProductoMiddle = ({ data }) => {

  const { familia, model, urldata, capacidad } = data

  const [ feature, setFeature ] = useState(true)
  const [ download, setDownload ] = useState(false)
  
  const handleFeactures = () => {
    const enableElement = document.querySelector(".border--selected")
    const dsiableElement = document.querySelector(".border--disable")

    enableElement.classList.replace("border--selected", "border--disable")
    dsiableElement.classList.replace("border--disable", "border--selected")

    setFeature(true)
    setDownload(false)
  }

  const handleDescargas = () => {
    const enableElement = document.querySelector(".border--selected")
    const dsiableElement = document.querySelector(".border--disable")

    enableElement.classList.replace("border--selected", "border--disable")
    dsiableElement.classList.replace("border--disable", "border--selected")
    setFeature(false)
    setDownload(true)

  }

  const disableStyle = {
    display: "none"
  }

  return(
    <div>
      <section className="features--product">
        <button className="border--selected" onClick={handleFeactures}>CARACTERÍSTICAS</button>
        <button className="border--disable" onClick={handleDescargas}>DESCARGAS</button>
      </section>

      <section className="middle--containar" style={ feature ? null : disableStyle } >
        <h1>Características</h1>
        <div>
          <table className="table--container">
          <tbody>
            <tr>
              <th>Familia</th>
              <td>{familia}</td>
            </tr>
            <tr>
              <th>Modelo</th>
              <td>{model}</td>
            </tr>
            <tr>
              <th>Capacidad</th>
              <td>
                { utils.capacidadSet(capacidad) }
              </td>
            </tr>
          </tbody>
          </table>
        </div>
        <div>
          <h3>Ensamblado en México</h3>
        <ul>
          <p>Estamos siempre en mejora continua, innovando y apostando por las últimas tendencias del mercado</p>
        </ul>
        <ul>
          <p>Tenemos como objetivo satisfacer las necesidades de nuestros clientes. Para ello nos aseguramos de asesorar de manera personalizada durante el proceso de personalización, aconsejándote y ayudándote para que encuentres el producto más adecuado para ti, <span style={{ fontWeight: "bold" }}>¡no dudes en contactarnos!</span></p>
        </ul>

        </div>
      </section>

      <section className="middle--containar" style={ download ? null : disableStyle }>
        <h1>Descargas</h1>
        <table className="table--container">
          <tbody>
            <tr>
              <th style={{ width: "200px" }}>Ficha Técnica</th>
              <td>{
                  Array.isArray(urldata) && Object.values(urldata).length > 0 ? (
                    <a href={urldata[0]} rel="external"><span className="ico--adobe"></span></a>
                  )
                  : (<span>No hay datos disponibles</span>)
                }</td>
            </tr>
          </tbody>
          </table>
      </section>

    </div>
  )
}

export default ProductoMiddle
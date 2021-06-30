import React, { useState } from 'react'

const ProductoMiddle = ({ data }) => {

  //  TODO traer el diccionario para las marcas 

  const { familia, model } = data

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
            
            <tr>
              <th>Familia</th>
              <td>{familia}</td>
            </tr>
            <tr>
              <th>Modelo</th>
              <td>{model}</td>
            </tr>
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
            
            <tr>
              <th style={{ width: "200px" }}>Ficha Técnica</th>
              <td><a target="_blank"  href="google.com"><span className="ico--adobe"></span></a></td>
            </tr>
          </table>
      </section>

    </div>
  )
}

export default ProductoMiddle
import React from 'react'
import errorIMG from 'assets/bg/404error.svg'

const Page404 = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center bg-white mt-3">
      <div className="d-flex justify-content-center flex-column mt-3">
        <h1 className="text-center font-weight-bold">¡Ups! link no encontrado</h1>
        <img src={errorIMG} alt="Imgen de error de url" className="img-fluid" style={{ width: "900px" }} /> 
        
      </div>
    </div>
  )
}

export default Page404

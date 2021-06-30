import React, { useState } from 'react'


const EmblaModal = ({ urlfoto }) => {

  const [ foto, setFoto ] = useState(urlfoto[0])

  const handledFoto = ({ currentImg = null } = {}) => {
      setFoto(currentImg)
  }


  return (
    <div className="modal--img--slide">

      <div className="modal--big--img">
        <img src={foto} alt="imagen zoom del producto"/>
      </div>

      <div className="modal--slide">
        {urlfoto.map((img, index) => {
          return(
            <div key={index} onClick={() => handledFoto({ currentImg: img })} className="modal-btn-img">
            <img src={img} alt="imagen de producto" className="slide--menu--foto" />
            </div>
          )
        })}
      </div>

    </div>
    
  );
};

export default EmblaModal;
import React, { useState, useEffect} from 'react'


const EmblaModal = ({ urlfoto }) => {

  const [ foto, setFoto ] = useState([])
  
  useEffect(() => {
    setFoto(urlfoto[0])
  },[urlfoto])

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
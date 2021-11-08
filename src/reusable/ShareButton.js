import React, { useRef } from 'react'

const ShareButton = ({ title }) => {

  const elementButton = useRef()

  const shareData = {
    title: "Visto en ITAMX.com",
    text: title,
    url: ""
  }

  const handleShare = async() => {
    try{
      await navigator.share(shareData)
      elementButton.current.textContent = "¡Gracias por compartir!"

    }catch(error){
      console.log(error)
    }
  }
  
  return <button ref={elementButton} id="itShareButton" className="btn-noStyle" onClick={handleShare}><span className="ico--share"></span></button>
}

export default ShareButton
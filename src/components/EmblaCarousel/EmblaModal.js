import React, { useMemo } from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'


const EmblaModal = ({ urlfoto }) => {

  const [ emblaRef ] = useEmblaCarousel({ loop: true })

  const slide = useMemo(() => { return urlfoto },[urlfoto])
    
  return (
    <div>
      <div className="embla__modal" ref={emblaRef}>
      <div className="embla__container__modal"> 
      
      {
        
        slide.map((item, index) => {
          return(
            <div className="embla__slide__modal">
                <img src={item} alt="foto detalle de producto" key={ index + item } loading="lazy" />
            </div>
          )
        })
      }
      </div>
      
    </div>    
    </div>
    
  );
};

export default EmblaModal;
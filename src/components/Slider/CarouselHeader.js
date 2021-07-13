import React from 'react'
import { Carousel } from 'antd'

import { mediaCarousel } from '../EmblaCarousel/media'

const CarouselHeader = () => {
  return(
    <div id="carrouseNB">
      <Carousel autoplay>
        {
          Object.values(mediaCarousel).map((item) => {
            return item
          })
        }
      </Carousel>
    </div>
    
  )
}

export default CarouselHeader
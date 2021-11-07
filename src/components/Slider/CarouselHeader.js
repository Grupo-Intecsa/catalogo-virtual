import React from 'react'
import { Carousel } from 'antd'
import { mediaCarousel } from '../EmblaCarousel/media'

const CarouselHeader = () => {
  return(
      <Carousel autoplay>
        {
          Object.values(mediaCarousel).map((item, index) => {
            return <div key={index}>{ item }</div>
          })
        }
      </Carousel>
  )
}

export default CarouselHeader
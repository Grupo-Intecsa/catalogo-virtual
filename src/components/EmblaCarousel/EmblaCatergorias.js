import React from 'react'
import { useMachine } from '@xstate/react'
import { CatalogoMachine } from '../../context/catalogoContext'
import { useEmblaCarousel } from 'embla-carousel/react'
import { useEffect } from 'react'

export default function EmblaCategorias(){

  const [ emblaRef, emblaApi ] = useEmblaCarousel({ loop: true })
  const [ state, send, service ] = useMachine(CatalogoMachine)

  useEffect(() => {
    if (emblaApi) {
      // Embla API is ready
    }
  }, [emblaApi])

  useEffect(() => {
    const sub = service.subscribe(state => console.log(state))
    return() => sub.unsubscribe()
  })


  useEffect(() => {
    send('GET_LABELS')
  },[])

  const { labels } = state.context

  return(
  state.matches('success') && (
  <div className="embla" ref={emblaRef}>
    <div className="embla__container">
      { labels.map((label, index) => <div key={index} className="embla__slide bg-box">{label.title}</div>) }
    </div>
  </div>
)
  )
}

// https://css-tricks.com/practical-css-scroll-snapping/
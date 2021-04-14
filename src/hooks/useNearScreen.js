import { useEffect, useState, useRef } from 'react'

const useNearScreen = ({ distance = "100px", externalRef } = {} ) => {

  const [ isNearScreen, setNearScreen ] = useState(false)
  const formRef = useRef()
  
  const element = externalRef ? externalRef.current : formRef.current
    
  useEffect(() =>{
    let observer

    const onChange = (entries, observer) => {
      const el = entries[0]
      
      if(el.isIntersecting){
        setNearScreen(true)
      }
    }

    Promise.resolve(
      typeof IntersectionObserver !== undefined
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
        observer = new IntersectionObserver(onChange, {
        rootMargin: distance
      })
      
      if(element) observer.observe(element)
    })

    return () => observer && observer.disconnect()

  })
    return { isNearScreen }
}

export default useNearScreen
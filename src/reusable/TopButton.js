import { useRef, useEffect } from 'react'
import utils from 'utils/utils'

const TopButton = ({ divRef } = {} ) => {

    const elButtonTopRef = useRef()
    
    const handleScrollPosition = () =>{
        // position del scroll
        const scrollRef = window.scrollY
        // position de la alto
        if( scrollRef > 500 ){
            elButtonTopRef.current?.classList.replace("onTopButton__hidden", "onTopButton__show")

        }else if( scrollRef < 500 ){
            elButtonTopRef.current?.classList.replace("onTopButton__show", "onTopButton__hidden")
        }        
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScrollPosition, true)
        return function cleanUp(){
            window.removeEventListener('scroll', handleScrollPosition, true)
        }
    },[])
    
    return <button 
            ref={elButtonTopRef}
            id="El__top__button" 
            className="onTopButton__hidden" 
            onClick={() => utils.scrollTotop(divRef)}>
            </button>
}

export default TopButton
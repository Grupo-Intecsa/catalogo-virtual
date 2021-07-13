import csmBig from 'assets/bg/csm_big.jpg'
import csmSamll from 'assets/bg/csm_small.jpg'

import registroBIG from 'assets/bg/gabineterojo_big.jpg'
import registroSAMALL from 'assets/bg/gabineterojo_small.jpg'


const mpago = (

  <a href="#" className="banner--header">
    <picture>
      <source srcSet={csmBig} media="(min-width: 60rem)"/>
      <img className="imgfluid" loading="lazy" src={csmSamll} alt="fabricamos registros electricos y cajas pos para obra electrica material electrico canalizacion y soporteria"/>      
    </picture>
  </a>
  
)

const registro = (

  <a href="#" className="banner--header">
    <picture>
      <source srcSet={registroBIG} media="(min-width: 60rem)"/>
      <img className="imgfluid" loading="lazy" src={registroSAMALL} alt="fabricamos registros electricos y cajas pos para obra electrica material electrico canalizacion y soporteria"/>      
    </picture>
  </a>
  
)


export const mediaCarousel = {
  1: mpago,
  2: registro
  
}

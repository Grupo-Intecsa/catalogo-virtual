// import media1 from "./gato.jpg"
import { Link } from 'react-router-dom'
import promo from "../../../assets/unisec_new.png"


const arrancador = (
  
  <Link className="text-black-50" to={"/detalle/607f05ea3b31f00015fa41d8/arrancador-a-tensin-plena-marca-ita"}>
    <div className="banner--git mb-2 d-flex justify-content-center">
      <div className="text-wrap col-2 col-sm-6 d-flex flex-column justify-content-center">
        <h2 className="texto-title-neibor">ARRANCADOR A TENSIÓN PLENA</h2>
        <p className="d-none d-sm-block">MARCA ITA</p>
        </div>
        <div className="d-flex">
        <img loading="lazy" src="https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/MS-ATP_03.webp?alt=media&token=96527eaf-ce4b-416d-95a6-5cf2a97a5d49" alt="imagen promo" className="img--banner" />
      </div>
    </div>
  </Link>
)

const mini = (
  
  <Link className="text-black-50" to={"/product/familias/60657e5722386e00157627d7"}>
    <div className="banner--git mb-2 d-flex justify-content-center">
      <div className="text-wrap col-2 col-sm-6 d-flex flex-column justify-content-center">
        <h2 className="texto-title-neibor">MINI 204</h2>
        <p className="d-none d-sm-block">Interruptores automáticos</p>
        </div>
        <div className="d-flex">
        <img loading="lazy" src="https://cdn.productimages.abb.com/9PAA00000041009_720x540.png" alt="imagen promo" className="img--banner"  />
      </div>
    </div>
  </Link>
)

const t1 = (
<Link to="/product/familias/606582d522386e00157627e0" className="text-black-50">
  <div className="banner--git--2 mb-2 d-flex al justify-content-center">
    <div className="text-wrap col-2 col-sm-6 d-flex flex-column justify-content-center">
      <h2 className="texto-title-neibor">XT1C 4p</h2>
      <p className="d-none d-sm-block" >Interruptor TMax XT1C 160</p>
      </div>
      <div className="d-flex">
      <img loading="lazy" src="https://cdn.productimages.abb.com/9IBA248846_720x540.png" alt="imagen promo" className="img--banner img-fluid" />
    </div>
  </div>
</Link>
)

const unisec = (


  <div className="banner--git--3 mb-2 d-flex al justify-content-center">
    <div className="text-wrap col-2 col-sm-6 d-flex flex-column justify-content-center">
        <h2 className="texto-title-neibor">UniSec</h2>
        <p className="d-none d-sm-block">Celdas de media tensión aisladas en aire para la distribución secundaria de hasta 24 kV, 1250 A, 25 kA</p>
      </div>
      <div className="d-flex">
      <img loading="lazy" src={promo} alt="imagen promo" className="img--banner img-fluid" />
    </div>
  </div>

)

export const media = [ arrancador, t1, mini, unisec ]
export const mediaByIndex = index => media[index % media.length]
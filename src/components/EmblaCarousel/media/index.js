// import media1 from "./gato.jpg"
import promo from "../../../assets/unisec_promo.webp"


const mini = (
  <div className="banner--git mb-2 d-flex justify-content-center">
    <div className="col-4 p-1 mt-5 column-banner d-none d-sm-block d-flex justify-content-center">
      <h1>MINI 204</h1>
      <p>Interruptores automáticos</p>
      </div>
      <div className="d-flex">
      <img loading="lazy" src="https://cdn.productimages.abb.com/9PAA00000041009_720x540.png" alt="imagen promo" className="img--banner"  />
    </div>
</div>
)

const t1 = (
  <div className="banner--git--2 mb-2 d-flex al justify-content-center">
    <div className="col-4 p-1 mt-5 column-banner d-none d-sm-block">
      <h1>XT1C 4p</h1>
      <p>
      Interruptor TMax XT1C 160
      </p>
      </div>
      <div className="d-flex">
      <img loading="lazy" src="https://cdn.productimages.abb.com/9IBA248846_720x540.png" alt="imagen promo" className="img--banner" />
    </div>
</div>
)

const unisec = (
  <div className="banner--git--3 mb-2 d-flex al justify-content-center">
    <div className="col-4 p-1 mt-5 column-banner d-none d-sm-block">
        <h1>UniSec</h1>
        <p>Celdas de media tensión aisladas en aire para la distribución secundaria de hasta 24 kV, 1250 A, 25 kA</p>
      </div>
      <div className="d-flex">
      <img loading="lazy" src={promo} alt="imagen promo" className="img--banner" />
    </div>
</div>
)

export const media = [ t1, mini, unisec ]
export const mediaByIndex = index => media[index % media.length]
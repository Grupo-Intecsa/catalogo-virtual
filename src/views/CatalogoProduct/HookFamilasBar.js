
import React from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'
import { useMemo } from 'react/cjs/react.development'
import { Link } from 'react-router-dom'

const familias = {
  ABB: {
    slug: 'ABB',
    id: '6034cb26e2d7b850a03fd393',
    familias: [
      {
        slug: 'mini201',
        title: 'MINI 201',
        img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/familias2012cds.webp?alt=media&token=2701e989-94e8-4c9c-a208-1f9021a1e635',
        id: "605c40dbdb74f65918cf2ddd"
      },
      {
        slug: 'mini202',
        title: 'MINI 202',
        img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/mini202.webp?alt=media&token=96895432-a860-4780-8d96-6c7332394b35',
        id: "605c40dbdb74f65918cf2ddd"
      },
      {
        slug: 'mini203',
        title: 'MINI 203',
        img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/mini203.webp?alt=media&token=75a003bc-868b-4d4b-a986-99094080e27f',
        id: "605c40dbdb74f65918cf2ddd"
      },
      {
        slug: 'mini204',
        title: 'MINI 204',
        img: 'https://cdn.productimages.abb.com/9PAA00000041009_720x540.png',
        id: "605c40dbdb74f65918cf2ddd"
      },
      {
        slug: 'mini201na',
        title: 'MINI 201 + NA',
        img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/familias2012cds.webp?alt=media&token=2701e989-94e8-4c9c-a208-1f9021a1e635',
        id: "605c40dbdb74f65918cf2ddd"
      },
      {
        slug: 'mini203na',
        title: 'MINI 203 + NA',
        img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/mini203.webp?alt=media&token=75a003bc-868b-4d4b-a986-99094080e27f',
        id: "605c40dbdb74f65918cf2ddd"
      },
      {
        slug: 'xt1c3p',
        title: 'XT1C 3p',
        img: 'https://cdn.productimages.abb.com/9IBA248846_720x540.png',
        id: "605c40dbdb74f65918cf2ddd"
      },
      {
        slug: 'xt1c4p',
        title: 'XT1C 4p',
        img: 'https://cdn.productimages.abb.com/9IBA248846_720x540.png',
        id: "605c40dbdb74f65918cf2ddd"
      },
      
    ]
  },
  CSM: {
    slug: 'canalizacion',
    id: '603eef9df2aaf100158dc3a6',
    familias: [
      {
        slug: 'baseniveliadorpos',
        title: 'Base Niveladora POS',
        img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AU143607I0039_03.webp?alt=media&token=aafb754f-ced4-4d58-a734-c520a26700e4'
      },
      {
        slug: 'registrosydcutos',
        title: 'Registros y Ductos',
        img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/03AG0528007S0043_01.webp?alt=media&token=92e4a078-ed40-4eef-9e82-351718c83da5'
      },
      {
        slug: 'kitcakapos',
        title: 'Kit Caja POS',
        img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AU141407I0036_01.webp?alt=media&token=a10e0c2c-31f1-4de1-91f3-f484412f489a'
      },
      {
        slug: 'kitcakapos',
        title: 'Kit Caja POS',
        img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AU141407I0036_01.webp?alt=media&token=a10e0c2c-31f1-4de1-91f3-f484412f489a'
      },
      {
        slug: 'placapos',
        title: 'Placa POS',
        img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AU141407I0036_01.webp?alt=media&token=a10e0c2c-31f1-4de1-91f3-f484412f489a'
      },
      {
        slug: 'placapos',
        title: 'Placa POS',
        img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AG141407I0045_01.webp?alt=media&token=142ae52a-02b6-4b4d-bfb2-d137f7264801'
      },
    ]
  }

}

const HookFamilasBar = ({ id }) => {

  const [ emblaRef ] = useEmblaCarousel({ loop: true })
  
  const familia = useMemo(() => {
    return Object.values(familias).filter(fam => fam.id === id)
  },[id])
  
  return(
    <div>
      { familia.length > 0 && <h1 className="text-center text-black-50 mt-2">Familias</h1>  }
    
    <div className="embla__familias" ref={emblaRef}>
      <div className="embla__container familias-grid-container"> 

      {
        
        familia.map(fam => fam.familias.map(item => {
          return(
            <div className="btn familia-item embla__slide__familias">
              <Link to={`/product/familias/${item.id}`}>
                <div>
                  <img src={item.img} alt={item.title} key={item.slug} />
                  <div className="texto-title-neibor text-black-50"><p>{item.title}</p></div>
                </div>
              </Link>
            </div>
          )
        }))
      }
      </div>
      
    </div>    
    </div>
  )
}


export default HookFamilasBar
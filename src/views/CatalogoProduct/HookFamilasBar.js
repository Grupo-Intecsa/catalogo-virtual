
import React, { useEffect, useMemo, useState } from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'
import { Link, useHistory } from 'react-router-dom'


const HookFamilasBar = ({ id }) => {
  

  const history = useHistory()
  
  const { location } = history

  const [ emblaRef, embla ] = useEmblaCarousel({ loop: true })
  
  const [ brandFilter ] = useState(location.state?.brand || id)

  const familia = useMemo(() => {
    
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
            id: "6064eeb67758a80015f2b508"
          },
          {
            slug: 'mini203',
            title: 'MINI 203',
            img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/mini203.webp?alt=media&token=75a003bc-868b-4d4b-a986-99094080e27f',
            id: "60656beacb8bf40015ebc36f"
          },
          {
            slug: 'mini204',
            title: 'MINI 204',
            img: 'https://cdn.productimages.abb.com/9PAA00000041009_720x540.png',
            id: "60657e5722386e00157627d7"
          },
          {
            slug: 'mini201na',
            title: 'MINI 201 + NA',
            img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/familias2012cds.webp?alt=media&token=2701e989-94e8-4c9c-a208-1f9021a1e635',
            id: "606575af3d6ee90015278b9c"
          },
          {
            slug: 'mini203na',
            title: 'MINI 203 + NA',
            img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/mini203.webp?alt=media&token=75a003bc-868b-4d4b-a986-99094080e27f',
            id: "60657fcb22386e00157627da"
          },
          {
            slug: 'xt1c3p',
            title: 'XT1C 3p',
            img: 'https://cdn.productimages.abb.com/9IBA248846_720x540.png',
            id: "6065818a22386e00157627dd"
          },
          {
            slug: 'xt1c4p',
            title: 'XT1C 4p',
            img: 'https://cdn.productimages.abb.com/9IBA248846_720x540.png',
            id: "606582d522386e00157627e0"
          },
          
        ]
      },
      CSM: {
        slug: 'canalizacion',
        id: '603eef9df2aaf100158dc3a6',
        familias: [
          {
            slug: 'cajaregistro',
            title: 'Caja Registro',
            img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AU143607I0039_03.webp?alt=media&token=aafb754f-ced4-4d58-a734-c520a26700e4',
            id: "6065e1c0d36fed00157fc69b"
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
    const currentFamilia = Object.values(familias).filter(fam => fam.id === brandFilter)

    return currentFamilia
  },[id])

  useEffect(() => {
      if(embla && embla.slideNodes().length !== familia.length){
        return embla.reInit()
      }
  },[embla, familia ])
  
  
  return(
    <div>
      { familia.length > 0 && <h1 className="text-center text-black-50 mt-2">Familias</h1>  }
    
    <div className="embla__familias" ref={emblaRef}>
      <div className="embla__container familias-grid-container"> 

      {
        
        familia.map(fam => fam.familias.map(item => {

        return(
          <div className="btn familia-item embla__slide__familias">
            <Link to={{ pathname: `/product/familias/${item.id}`, state: { brand: brandFilter }}}>
              
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
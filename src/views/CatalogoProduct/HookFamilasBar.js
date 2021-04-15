
import React, { useEffect, useMemo, useState } from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'
import { Link, useHistory } from 'react-router-dom'


const HookFamilasBar = ({ id }) => {
  

  const history = useHistory()
  
  const { location } = history

  const [ emblaRef, embla ] = useEmblaCarousel({ loop: true })
  
  const [ brandFilter ] = useState(location.state?.brand || id)

  const familia = useMemo(() => {
    // el id es el parent de la familia en catalogo
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
            id: "606c2d537904ff0015f12cb4"
          },
          {
            slug: 'xt1c4p',
            title: 'XT1C 4p',
            img: 'https://cdn.productimages.abb.com/9IBA248846_720x540.png',
            id: "606582d522386e00157627e0"
          },
          {
            slug: 'XT4N 3P',
            title: 'XT4N 3P',
            img: 'https://cdn.productimages.abb.com/9IBA255041_720x540.png',
            id: "606c272e7904ff0015f12ca8"
          },
          {
            slug: 'XT4N 4P',
            title: 'XT4N 4P',
            img: 'https://cdn.productimages.abb.com/9IBA255295_720x540.png',
            id: "606c2bb27904ff0015f12cae"
          },
          
        ]
      },
      CSM: {
        slug: 'canalizacion',
        id: '603eef9df2aaf100158dc3a6',
        familias: [
          {
            slug: 'cajaregistro',
            title: 'Registros y Ductos',
            img: "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/03PG050507S0037_01.webp?alt=media&token=f4afa4d2-4fc8-4dcc-b341-284137a38743",
            id: "604730d09c44aa299ce4d225"
          },
          {
            slug: 'kitcajapos',
            title: 'Kit Caja POS',
            img: "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AU141407I0036_01.webp?alt=media&token=a10e0c2c-31f1-4de1-91f3-f484412f489a",
            id: "606e875913c23600158071b2"
          },
          {
            slug: 'cajapos',
            title: 'Caja POS',
            img: "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AU141407I0036_02.webp?alt=media&token=0310f1bb-1e86-4538-992d-6342318c9ed2",
            id: "606e98a1bc957300159a4e52",
          },
          {
            slug: 'PlacaPOS',
            title: 'Placa POS',
            img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AU141407I0044_01.webp?alt=media&token=4df8775b-de7f-4945-b3dd-bab70837ed42',
            id: "606ea2afa86b080015648dc7"
          },
          {
            slug: 'BASENIVELADORAPOS',
            title: 'Base Niveladora POS',
            img: "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AU143607I0039_04.webp?alt=media&token=70ee680b-e2a6-45ea-ae06-ce3216b4b6cd",
            id: '6049db703fbec93ddc4cb2e4'
          },
          {
            slug: 'KITREGISTRO',
            title: 'Kit Registro',
            img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AG505020S0005_01.webp?alt=media&token=2f3f1feb-f0e0-4387-aeae-3446aa61ff6a',
            id: "606ea638a86b080015648dd0"
          },
          {
            slug: 'CAJAREGISTRO',
            title: 'Caja Registro',
            img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AG202012S0001_02.webp?alt=media&token=4fb405ac-ef8a-4d2b-9798-fbbc57c2f9d8',
            id: "606ea912a86b080015648dd3"
          },
          {
            slug: 'TAPADEREGISTRO',
            title: 'Tapa De Registro',
            img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/02AG505020S0005_3.webp?alt=media&token=33548c86-8176-4c1e-a68b-0283d823e2e8',
            id: "606eab3ba86b080015648dd6"
          },
          {
            slug: 'Charoladeescalerilla',
            title: 'Charola Escalerilla',
            img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/03AG1030010Z0001_01.webp?alt=media&token=f8395e5a-b009-4f0f-9835-fdf548f970aa',
            id: "606ead8aa86b080015648dd9"
          },
          {
            slug: 'charoladefondosolido',
            title: 'Charola De Fondo Solido',
            img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/03AG2230010Z0067_04.webp?alt=media&token=3d5a9c79-c8cf-4945-a6eb-4c2c85591af9',
            id: "606eafb7a86b080015648ddc"
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
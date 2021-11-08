
import _ from 'lodash'

export const allproductos = [
  {
    "id": "60dcd26ab22f37097c581620",
    "img": "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fotm.png?alt=media&token=2c15cced-7e42-4274-98a2-08ea25704027",
    "title": "Desconectadores"
  },
  {
    "id": "60dcd276b22f37097c581622",
    "img": "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fseccionador.png?alt=media&token=8938c725-c6e9-4881-b0e6-47a2c273f0d5",
    "title": "Seccionador"
  },
  {
    "id": "60dcd283b22f37097c581624",
    "img": "https://cdn.productimages.abb.com/9IBA191974_720x540.jpg",
    "title": "Interruptor Seccionador"
  },
  {
    "id": "60dcd2a5b22f37097c581626",
    "img": "https://cdn.productimages.abb.com/9IBA192193_720x540.jpg",
    "title": "Accesorio de Interruptores"
  },
  {
    "id": "60dcd2c2b22f37097c581628",
    "img": "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fcktpro-btn.png?alt=media&token=26557e53-8704-4f88-bd42-f4e4f2add802",
    "title": "Interruptores Caja Moldeada"
  },
  {
    "id": "60dcd2dfb22f37097c58162c",
    "img": "https://cdn.productimages.abb.com/9IBA191980_720x540.jpg",
    "title": "Interruptores y Accesorios"
  },
  {
    "id": "60dcd302b22f37097c58162e",
    "img": "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fdiferenciales.png?alt=media&token=0f13f3cd-9207-4c04-b783-e0d83d81f08d",
    "title": "Diferenciales"
  },
  {
    "id": "60dcd375aacd1954ac8308a0",
    "img": "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Ffusibles.png?alt=media&token=e21dae5f-899c-4298-9a11-8371a52d4af8",
    "title": "Fusibles"
  },
  {
    "id": "60dcd37faacd1954ac8308a2",
    "img": "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Frieldin.png?alt=media&token=9ff315f0-a9d5-434a-b5ce-f44eda0b4956",
    "title": "Interruptores riel din"
  },
  {
    "id": "60dcd390aacd1954ac8308a4",
    "img": "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fint_gab.png?alt=media&token=7d64d7ac-6d41-4fa7-b5cf-adc9bb3b30a0",
    "title": "Seccionador en Gabinete"
  },
  {
    "id": "60dcd3a1aacd1954ac8308a6",
    "img": "",
    "title": "Contactores"
  },
  {
    "id": "60dcd3afaacd1954ac8308a8",
    "img": "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fint_gab.png?alt=media&token=7d64d7ac-6d41-4fa7-b5cf-adc9bb3b30a0",
    "title": "Interruptor en Gabinete"
  },
  {
    "id": "60dcd3beaacd1954ac8308aa",
    "img": "",
    "title": "Desconectador en Gabinete"
  },
  {
    "id": "60dd4a9e3982fa4464dbac27",
    "img": "",
    "title": "Arrancador en Gabinete"
  },
  {
    "id": "611220d08b59a91964fbeb87",
    "img": "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fgabineteria.png?alt=media&token=720694e5-2d68-44a5-8c68-44cb970afb95",
    "title": "Gabineteria"
  },
  {
    "id": "6143a3affb10c4b5ed4faac5",
    "img": "https://cdn.productimages.abb.com/9IBA171939_720x540.jpg",
    "title": "Contactores"
  },
  {
    "title":"Canalizacion y Soporteria",
    "img":"https://cdn.productimages.abb.com/2CDC221009V0017_720x540.jpg",
    "id": "6143b4fffb10c4b5ed4faade"
  }
  
  
]

export default {

  onenInNewWindow: (url) => {
    const link = window.open(url, '_blank', 'noopener,noreferrer')
    if(link) link.opener = null
  },
  lastTitleCategories: ({ title } = {}) => {

      if(typeof title === 'undefined'){
        let tokenTitle = localStorage.getItem("token-title")
        return tokenTitle

      }else if(typeof localStorage.getItem("token-title") === 'undefined' ){
        if(typeof title === 'undefined'){
          return "Categorías"
        }

      }else if(typeof localStorage.getItem("token-title") == 'undefined'){
        return localStorage.getItem("token-title")

      }else if(typeof title !== 'undefined'){
        return localStorage.setItem("token-title", title )
      }

  },
  getFoto: ( slug, payload ) => {
    let imgProduct = payload.filter(item => item.familia === slug )[0]?.urlfoto[0].toString()
    return imgProduct
  },
  getSelection: ({ familiaName, payload, selection }) => {

    const arraySelection = _.values(selection)[0]
    if(Object.values(selection).length > 0 && isNaN(arraySelection) === false ){    
      const nextSelection = payload
        .filter(item => item.familia === familiaName)
        .filter(({ capacidad }) => Object.values(capacidad)[0] === +arraySelection)
        return nextSelection

    }else if(Object.values(selection).length > 0 && isNaN(arraySelection) === true ) {
      const nextSelection = payload
        .filter(item => item.familia === familiaName)
        .filter(({ capacidad }) => Object.values(capacidad)[0] === arraySelection)
        return nextSelection

    }else if(selection.length === 0 ){
      const selected = payload
      .filter(item => item.familia === familiaName )
      return selected
    }

  },
  scrollTotop: (target) => {
    
    if(!target){
      return undefined
    }else {
      window.scrollTo({
        top: target?.current?.offsetTop,
        behavior: "smooth"
      })
    }
  },
  orderArray: (a, b) => {
    if(a < b){
      return -1 
    }
    if(a > b){
      return 1
    }
    return 0
  },
  capacidadSet: ( capacidad ) => {
    
    let valor = Object.keys(capacidad).map((key, index) => {
        let val = Object.values(capacidad)[index]
        return `${val} ${key}`
    })

    return valor
  }
  
}
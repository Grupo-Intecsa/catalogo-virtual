
import _ from 'lodash'

export const allproductos = [
  {
    order: 1,
    title: "Desconectadores",
    id: "60dcd26ab22f37097c581620",
    img: "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fcktpro-btn.png?alt=media&token=26557e53-8704-4f88-bd42-f4e4f2add802",
  },
  {
    order: 2,
    title: "Seccionador",
    id: "60dcd276b22f37097c581622",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fturnkey-btn.png?alt=media&token=588a645a-c5a3-49e8-9739-b352a971dadc',
  },
  {
    order: 3,
    title: "Interruptor Seccionador",
    id: "60dcd283b22f37097c581624",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fem-btn.png?alt=media&token=751b7ed5-b4e9-45c1-ae8a-2137923fcc6b',
  },
  {
    order: 4,
    title: "Accesorio de Interruptores",
    id: "60dcd2a5b22f37097c581626",
    img: "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fea-btn.png?alt=media&token=588b3238-84e6-4758-be80-de8b237eb48a",
  },
  {
    order: 5,
    title: "Interruptores Caja Moldeada",
    id: "60dcd2c2b22f37097c581628",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fhvac-btn.png?alt=media&token=e29b186c-4682-4508-95b6-6d88f4334e57',
  },
  {
    order: 6,
    title: "Gabineteria",
    id: "60dcd2d2b22f37097c58162a",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fea-btn.png?alt=media&token=588b3238-84e6-4758-be80-de8b237eb48a',
  },
  {
    order: 7,
    title: "Interruptores y Accesorios",
    id: "60dcd2dfb22f37097c58162c",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Felmechic-btn.png?alt=media&token=85ebbadb-ef86-429a-9a3b-49ba6cd125b3',
  },
  {
    order: 8,
    title: "Diferenciales",
    id: "60dcd302b22f37097c58162e",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fintwc-btn.png?alt=media&token=214d4e2b-02e0-4230-9dae-923aa611c0a0',
  },
  {
    order: 8,
    title: "Fusibles",
    id: "60dcd375aacd1954ac8308a0",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Foptoelec-btn.png?alt=media&token=91c36fbc-f4aa-4244-abcd-05cd8a67e055',
  },
  {
    order: 9,
    title: "Interruptores riel din",
    id:"60dcd37faacd1954ac8308a2",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Flighting-btn.png?alt=media&token=540cca63-b2f0-42e1-b8ac-9bc4d28b5334',
  },
  {
    order: 10,
    title: "Seccionador en Gabinete",
    id:"60dcd390aacd1954ac8308a4",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fmotrdriv-btn.png?alt=media&token=719ba7a4-6084-4d3e-8634-2a627bd00532',
  },
  {
    order: 11,
    title: "Contactores",
    id:"60dcd3a1aacd1954ac8308a6",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fnetcom-btn.png?alt=media&token=7daa8df7-2222-438c-b0a7-abdb84530536',
  },
  {
    order: 12,
    title: "Interruptor en Gabinete",
    id:"60dcd3afaacd1954ac8308a8",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fpassive-btn.png?alt=media&token=9ded337b-a91c-412d-8af5-a33042f01d67',
  },
  {
    order: 13,
    title: "Desconectador en Gabinete",
    id:"60dcd3beaacd1954ac8308aa",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fpe-btn.png?alt=media&token=e5bb7983-332c-4f1b-91a5-376760698f85',
  },
  // {
  //   order: 14,
  //   title: "Process Instrumentation",
  //   img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Finst-btn.png?alt=media&token=6b795f3c-38d7-4407-a149-0eddc7385ef0',
  // },
  // {
  //   order: 15,
  //   title: "Safety & Signaling",
  //   img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fsafesig-btn.png?alt=media&token=e21b3494-7ea2-4eaf-a663-fdeee46abcda',
  // },
  // {
  //   order: 16,
  //   title: "Semiconductors",
  //   img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fsemicond-btn.png?alt=media&token=8c38ff7f-f7c4-4492-bcb7-546404936bb3',
  // },
  // {
  //   order: 17,
  //   title: "Test & Measurement",
  //   img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Ftm-btn.png?alt=media&token=492b35ff-6a09-4208-bbf7-5c53001072c5',
  // },
  // {
  //   order: 18,
  //   title: "Tools Hardware & Supplies",
  //   img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fthse-btn.png?alt=media&token=2645ba62-418f-416b-beae-449ebff47bff',
  // },
  
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

    if(Object.values(selection).length > 0 ){    
      const nextSelection = payload
        .filter(item => item.familia === familiaName)
        .filter(({ capacidad }) => Object.values(capacidad)[0] === +arraySelection)
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
        top: target?.current.offsetTop,
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
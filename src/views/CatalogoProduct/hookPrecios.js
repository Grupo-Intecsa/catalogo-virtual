
import CatalogoController from 'context/controllers/CatalogoController'

export default async function hookPrecios ({ ml }){

  const precio = await CatalogoController.getPrice({ ml })
  .then(res => res )  
    
  if(typeof precio !== 'undefined') return +precio
  
}
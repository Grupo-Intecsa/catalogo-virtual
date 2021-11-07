const OCpage = ({ data }) => {

  const { address, carrito, cpostal, date, email, name, total, _id, cotizar } = data

  return(
    <div id="datos-invoice">
      <h5>{`Cotización: ${_id} `}</h5>
      <span>{`Fecha: ${date}`}</span>
      <hr />
      <div className="datos-cliente">
          <span>{`Nombre: ${name}`}</span>
          <span>{`Email: ${email}`}</span>
          <span>{`Dirección: ${address}, C.P.: ${cpostal} `}</span>
          { cotizar && <span className="font-weight-bold">*Requiere cotización de envio</span>}
      </div>
      <hr />
      <div className="datos-productos">
          <div>
            <tr>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Precio</th>
            </tr>
              {
                carrito.map((item) => {
                  return(
                  <tr key={item._id}>
                    <td>{item.cantidad}</td>
                    <td>{item.title}</td>
                    <td>{ item.precio === 0 ? "<p>*Por cotizar</p>" : item.precio }</td>
                  </tr>  
                  
                  )
                })
              }
          </div>
      </div>
      <hr />
      <div className="datos-precio">      
          <span className="font-weight-bold font-2xl">Total:</span>
          <br/>
          <span>{total}</span>
      </div>
      <div className="mt-5">
        <small>El total de está cotización puede tener partidas pendientes de cotizar o los precios pueden cambiar sin previo aviso</small>
      </div>
    </div>
    
    
  )
}


export default OCpage
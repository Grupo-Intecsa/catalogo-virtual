import { useContext, useEffect, useState, useRef } from 'react'
import { Pagination } from 'antd'

import { baseURL } from "context/controllers/CatalogoController"
import { AuthContext  } from "context/AuthContext"
import { AppContext } from "context/AppContext"

import utils from 'utils/utils'
import { saveAs } from 'file-saver'

import HamburgerButton from 'reusable/HamburgerButton'

const Pedidos = () => {

  // Estados interno
  const [ pedidosData, setPedidosData ] = useState([])
  const [ loading, setLoading ] = useState(false)
  
  // contexto
  const { currentUser } = useContext(AuthContext)
  const { monyIntlRef, dateIntlRef } = useContext(AppContext)

  const getPedidosByEmail = async () => {
     await fetch(baseURL + '/pedidos?email=' + currentUser?.email)
      .then(res => res.json())
      .then(res => setPedidosData(res.message))
      .finally(() => setLoading(true) )
  }

  useEffect(() => {
     getPedidosByEmail()
  }, [currentUser])

  const refTop = useRef()
  useEffect(() => {
    utils.scrollTotop(refTop)
  }, [])

  const [ pagInicio, setPagInicio ] = useState(0)
  const [ pagFinal, setPagFinal ] = useState(12)

  const handlePaginator = (page, size) => {
      setPagInicio( size * ( page - 1 ) )
      setPagFinal( size * page )
      utils.scrollTotop(refTop)
  }

  const pdfCreator = ({ data } = {}) => {

    fetch(`${baseURL}/pdf?folio=${data.folio}`, {
      headers: {  "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => {
      return res
        .arrayBuffer()
        .then(res => {
          const blob = new Blob([res], { type: "applicacion/pdf"})
          saveAs(blob, `ITAMX_${data.folio}.pdf`)          
        })
        .catch(error => console.log(error))
    })
  }

  return (
    <>
    <div className="pedidos__container">
      <div className="pedidos__title" ref={refTop}>
        <h1 className="title">Mis pedidos</h1>
      </div>
      <div className="pedidos__body">
          {
            loading && 
            Object.values(pedidosData)
              .reverse()
              .slice(pagInicio, pagFinal)
              .map(item => {
              return (
                <div key={item._id} className="pedido__card">
                  <table>
                    <tbody>
                      <tr>
                        <th>Folio</th>
                        <th>Fecha</th>
                        <th>Total</th>
                      </tr>
                      <tr>
                        <td>{ item.folio }</td>
                        <td>{ dateIntlRef(item.date) }</td>
                        <td>{ monyIntlRef(item.total) }</td>
                      </tr>
                    </tbody>
                  </table>
                    <table>
                      <tbody>
                        {
                          item.carrito.map((prod, index) => {
                            return (
                              <span key={index}>
                                <p>{prod.title}</p>
                                <img src={prod.foto} />
                              </span>
                            )
                          })
                        }
                        <span>
                          {/* <button>Comprar de nuevo</button> */}
                          <HamburgerButton>
                            <span onClick={() => pdfCreator({ data: item })}>Descargar</span>
                          </HamburgerButton>
                            <button onClick={() => pdfCreator({ data: item })}>Descargar Orden de Compra</button>
                          {/* <button>Requerir Factura</button> */}
                        </span>
                      </tbody>
                    </table>
                  </div>
              )
            })
          }
      </div>
      <div className="pedidos__footer">
        <Pagination
          defaultCurrent={1}
          total={pedidosData.length}
          pageSize={12}
          onChange={(page, size) => handlePaginator(page, size)}
        />
      </div>
    </div>
    </>
  )
}

export default Pedidos
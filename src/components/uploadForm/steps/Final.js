import React, { Fragment } from 'react'
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom'

const Final = (props) => {

  const history = useHistory()

  const handledReset = () => {
      props.send('RESET')
  }

  

  return(
    <Fragment>
        <Result
          status="success"
          title="Producto guardado con éxito"
          subTitle="El producto id fue añadido a la base de datos"
          extra={[
            <div>
      
            <Button type="primary" key="console" onClick={() => history.push("/")}>
              Dashboard
            </Button>
            
            <Button key="buy" onClick={handledReset}>
              Agregar Otro
            </Button>
            </div>
          ]}
        />,
    </Fragment>
  )
}

export default Final
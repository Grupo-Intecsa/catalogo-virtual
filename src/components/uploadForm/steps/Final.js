import React, { Fragment } from 'react'
import { Result, Button } from 'antd';

const Final = (props) => {

  const handledReset = () => {
      props.send('RESET')
  }

  console.log(props)

  return(
    <Fragment>
        <Result
          status="success"
          title="Producto guardado con éxito"
          subTitle="El producto id fue añadido a la base de datos"
          extra={[
            <div>
      
            <Button type="primary" key="console" onClick={() => props.history.push("/")}>
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
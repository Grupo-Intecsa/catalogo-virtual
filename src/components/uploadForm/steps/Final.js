import React, { Fragment } from 'react'
import { Result, Button } from 'antd';

const Final = (props) => {

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
            <Button type="primary" key="console">
              Dashboard
            </Button>,
            <Button key="buy" onClick={handledReset}>
              Agregar Otro
            </Button>,
          ]}
        />,
    </Fragment>
  )
}

export default Final
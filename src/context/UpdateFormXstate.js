import { createMachine, assign } from 'xstate'

    // necesitamos buscar los valores de las catergorias, de las marcas y del inventario de Erick 

export const MachineProductForm = createMachine(
    {   
        id: 'productForm',
        initial: 'idle',
        context: {
            init: true,
            step1: false,
            step2: false,
            step3: false,
            step4: false,
            final: false,
            productData: {}
        },
        states: {

            idle: {
                entry: assign({
                    init: true,
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: false,
                    final: false,
                    productData: {}
                }),
                on: {
                    GO_STEP1: 'step1'
                }
            },
            step1: {
                entry: assign({
                    step1: true,
                    init: false
                    
                }),
                on: { GO_STEP2: 'step2' }
            },
            step2:{

                entry: assign({
                    step1: false,
                    step2: true,
                    productData: (ctx, event) => {
                        const { productData } = ctx
                        return { ...productData, step2: event.data }
                    }
                }),
                on: { GO_STEP3: 'step3' }
            },
            step3:{

                entry: assign({
                    step2: false,
                    step3: true,
                    productData: (ctx, event) => {
                        const { productData } = ctx
                        return { ...productData, step3: event.data }
                    }
                }),
                on: { GO_STEP3: 'step4' }
            },
            step4:{

                entry: assign({
                    step3: false,
                    step4: true,
                    productData: (ctx, event) => {
                        const { productData } = ctx
                        return { ...productData, step4: event.data }
                    }
                }),
                on: { GO_FINAL: 'final' }
            },
            final: {
                invoke: {
                    src: () => alert('Estoy bien')
                },
                entry: assign({
                    step4: false,
                    final: true 
                }),
                on: { RESET: 'idle' }
            }
                
        },
    }
)   




import { useState, useEffect } from 'react'
import { storage, db } from '../assets/config/index'

const useStorage = ( file ) => {

    const [ progress, setProgress ] = useState(0)
    const [ error, setError ] = useState(0)
    const [ url, setUrl ] = useState(0)

    useEffect(() => {
    
    // creamos la referencia 
        let storageRef = storage.ref(file.name)

        let dbRef = db.collection('catalogo')

        storageRef.put(file).on('state_changed', (snap) =>{
            let porcent = (snap.bytesTransferred / snap.totalBytes ) * 100 
            setProgress(porcent)
        }, (error) => {
            setError(error)
        }, async() => {
            const url = await storageRef.getDownloadURL()
            const createAT = Date.now()
            
            dbRef.add({ url, createAT })
            setUrl(url)
        }
        )

    },[file])

    return { progress, error , url }

}

export default useStorage


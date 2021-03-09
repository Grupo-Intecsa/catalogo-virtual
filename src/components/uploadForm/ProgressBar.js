import React, { useEffect } from 'react'
import { CProgress } from '@coreui/react'

import useStorage from '../../FirebaseHook/useStorage'


const ProgressBar = ({ file, setIsDone, setUrlDone }) => {

    const { progress, url } = useStorage(file)

    useEffect(() => {        
    if(progress === 100){
        setIsDone(true)
    }
    },[progress])

    return(
        <div>
            { url ? <img onLoad={() => setUrlDone(url)} src={url} alt="img preview data" className="img-previw" /> : null }
            { progress === 0 ? <div className="double-spinner" /> : <CProgress animated color="info" value={progress} className="mb-3" />}
        </div>
    )

}

export default ProgressBar

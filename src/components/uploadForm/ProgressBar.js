import React from 'react'

import useStorage from '../../FirebaseHook/useStorage'

const ProgressBar = ({ file }) => {

    const { progress, url, error  } = useStorage(file)

    return(
        <div>
            <div className="progress-bar  bg-success" role="progressbar" style={{ width: progress + '%'}} />
            <div><h3>{url}</h3></div>
                {progress}
        </div>
    )

}

export default ProgressBar



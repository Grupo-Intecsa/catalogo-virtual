import React from 'react'

const SkeletonVerticalCard = () => {
  return (
    
      <div className="card--skeleton">
        <div style={{ marginTop: "10%", width: "100%", height: "50%"}}></div>
        <div style={{ marginTop: "25%", width: "40%", height: "5%" }}></div>
        <div style={{ marginTop: "5%", width: "50%", height: "5%" }}></div>
        <div style={{ marginTop: "5%", width: "100%", height: "5%" }}></div>
      </div>
    
  )
}

export default SkeletonVerticalCard
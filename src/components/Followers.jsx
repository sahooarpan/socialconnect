import React,{ useEffect } from 'react'

const Followers = (props) => {
    useEffect(()=>{
        console.log(props)
    },[])
   

    return (
        <div className="container">
            Followers
        </div>
    )
}

export default Followers

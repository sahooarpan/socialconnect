import React,{ useEffect } from 'react'

const Following = (props) => {
    useEffect(()=>{
        console.log(props)
    },[])
    
    
    return (
        <div>
            Following
        </div>
    )
}

export default Following

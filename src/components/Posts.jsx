import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from './layout/Spinner'
import { useParams } from 'react-router-dom'
const Posts = ({match}) => {
    console.log(match,"mtch")
    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    const params = useParams()
    console.log(params,'props')
    useEffect(async ()=>{
    const { data: postData } = await axios.get(`/api/posts/${match.params.id}`)
    setPosts(postData)
    console.log(postData);
    setLoading(false)
    
    },[])
     
    return loading? <Spinner/>: (
        <div className="d-flex justify-content-between">
        {posts.map(post=>(
        <>    
        <div>
        <img className="avatar-tiny" src={post.image} />{" "} 
        <strong>{post.content}</strong>{" "}
        </div>
        <span className="text-muted small">{post.user.name} </span>
        </>    
            
        ))}
        </div>    
    )
}

export default Posts
 
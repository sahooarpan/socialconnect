import React,{useEffect, useState} from 'react'

import { connect } from 'react-redux'
import Spinner from './layout/Spinner'
import axios from 'axios'
import { NavLink,Switch, Route } from 'react-router-dom'
import Followers from './Followers'
import Following from './Following'
import Posts from './Posts'
import PrivateRoute from './routing/PrivateRoute'

const Profile = ({match,auth:{loading,user}}) => {

    const [profile,setProfile] = useState({});
    const [posts,setPosts] = useState([]);
   
    useEffect(()=>{
    const fetchData = async ()=>{
    
    //  const[data,data2]=   await Promise.all([
    //         axios.get(`/api/users/${match.params.id}`),
    //         axios.get(`/api/posts/${match.params.id}`)
    //     ])
        const { data: userData } = await axios.get(`/api/users/${match.params.id}`)
        const { data: postData } = await axios.get(`/api/posts/${match.params.id}`)
        
        
        //console.log(userData,postData)
        setProfile(userData)
        setPosts(postData)  
    }
    fetchData() 
      
      
          },[match.params.id])
    
    return(
    <div className="container">   
    <div className= "row profile-content">
        <img className=" col-xs-2 profile-image mr-4" src={profile.image} />
        <div className="col-xs-4 mt-4">
        <h4>{profile.name}</h4>
        <div className="d-flex">
        <h4 className="mr-2">Followers:{profile && profile.followers && profile.followers.length}</h4>
        <h4>Following:{profile && profile.following && profile.following.length}</h4>
        </div>
        </div>
    
    </div>
    <ul class="nav nav-tabs pl-4 pt-4 mb-4">
    <NavLink exact  to={`/profile/${match.params.id}`} className="nav-item nav-link">
          Posts: {posts.length}
        </NavLink>  
        <NavLink to={`/profile/${match.params.id}/followers`} className="nav-item nav-link">
          Followers: 0
        </NavLink>
        <NavLink to={`/profile/${match.params.id}/following`} className="nav-item nav-link">
          Following: 0
          </NavLink>
          

</ul>
        
    <Switch>
    <PrivateRoute exact path={`/profile/:id`} component={Posts}/>
    
    

    <PrivateRoute  path={`/profile/:id/followers`} component={Followers} />
    
    
    <PrivateRoute  path={`/profile/:id/following`} component={Following} />
    
    </Switch>
    </div>
    )

    
}

const mapStateToProps = state=>({
    auth:state.auth
})


export default connect(mapStateToProps,{})(Profile)

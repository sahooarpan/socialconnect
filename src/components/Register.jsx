import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setAlert } from '../actions/alert'
import { connect } from 'react-redux'
import { register } from '../actions/auth'
import Alert from './layout/Alert'
import { Redirect } from 'react-router-dom'
const Register = ({setAlert,register,isAuthenticated}) => {

    //const dispatch = useDispatch();

    const [formData,setformData]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        image:''

    })

    const { name,email,password,confirmPassword,image } = formData

    const handleChange=e=>{
        console.log([e.target.name],e.target.value)
        setformData({
        ...formData,
        [e.target.name]:e.target.value
        
    })
    }
   
    useEffect(()=>{
        if(name){
          const delay = setTimeout(()=>{
            if(name.length<=3){
                console.log("Name must be atleast 4 charecters")
                setAlert("Name must be atleast 4 charecters","alert-danger")
            }else{
                console.log(name)
            }
          },2000) 
          return()=>{
              clearTimeout(delay)
          } 
        }

    },[name])
    useEffect(()=>{
        if(confirmPassword){
          const delay = setTimeout(()=>{
            if(confirmPassword.length<=3){
                console.log("confirmPassword must be atleast 4 charecters")
                setAlert("confirmPassword must be atleast 4 charecters","alert-danger")
            }else{
                console.log(confirmPassword)
            }
          },2000) 
          return()=>{
              clearTimeout(delay)
          } 
        }

    },[confirmPassword])

    const onSubmit =e=>{
        e.preventDefault();
        if(password!==confirmPassword){
            setAlert("Passowords do not match",'danger')
        }
        register({name,email,password,confirmPassword,image})
    }
    if(isAuthenticated){
        return <Redirect to='/dashboard' />
     }

    return (

            <div className="d-flex justify-content-center ">
        
        <form className="form-container bg-light p-4" onSubmit={onSubmit}>
        
        <h3 className="display-4 text-primary">Register</h3>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="name" class="form-control" id="name" placeholder="Enter name" required name="name"   onChange={e=>handleChange(e)} />
        </div>

            <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" required value={email} onChange={e=>handleChange(e)} />
            </div>
            <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" name="password" placeholder="Password" required value={password} onChange={e=>handleChange(e)} />
            </div>
            <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required value={confirmPassword} onChange={e=>handleChange(e)} />
            </div>
            <div class="form-group">
            <label for="image">Image</label>
            <input type="text" class="form-control" id="image" name="image" placeholder="Image" required value={image} onChange={e=>handleChange(e)} />
            </div>
            <button type="submit" class="btn btn-primary px-3">Submit</button>
            <p className="form-text">Have an account ? <Link className="form-link" to="/login">Please login </Link>here.</p>
        </form>
        </div>    
    
    )
}

const mapStateToProps =state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert,register})(Register)

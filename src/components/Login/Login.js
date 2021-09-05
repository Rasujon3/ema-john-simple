
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';


function Login() {

  const [newUser, setNewUser] = useState(false);

  const [user,setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error:'',
    success:false

  });

  initializeLoginFramework();

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res=>{
      handleResponse(res,true);
      
    })
  }

  const fbSignIn=()=>{
    handleFbSignIn()
    .then(res=>{
      handleResponse(res,true);
    })
  }

  const signOut = () =>{
    handleSignOut()
    .then(res =>{
      handleResponse(res,false);
    })
  }


  const handleBlur=(e)=>{
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;
    }
    if(isFieldValid){
      // [...cart,newItem]
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  
  const handleSubmit=(e)=>{
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res => {
      handleResponse(res,true);
        
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email,user.password)
      .then(res => {
        handleResponse(res,true);
      })
    }

    e.preventDefault();
  }

  const handleResponse=(res,redirect)=>{
    setUser(res);
        setLoggedInUser(res);
        if (redirect) {
        history.replace(from);
        }
  }


  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? 
        <button onClick={signOut}>Sign out</button>
        :
        <button onClick={googleSignIn}>Sign in</button>
      }
      <br />
      <br />
      <button onClick={fbSignIn}>Sign in with Facebook</button>
      {
        user.isSignedIn && 
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email : {user.email}</p>
          <img style={{width:'50%'}} src={user.photo} alt={user.name} />
        </div>
      }

      <h1>Our own Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id="" />
        <label htmlFor="newUser">New User Sign up</label>
        <br />

          { newUser && 
            <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" />
          }
          <br />
          <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required />
          <br />
          <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Your Password" required />
          <br />
          <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {
        user.success && <p style={{color:'green'}}>User {newUser ? 'created' : 'Logged in'} successfully</p>
      }
    </div>
  );
}

export default Login;

import  firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebase.config';

// firebase.initializeApp(firebaseConfig);

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app(); // if already initialized, use that one
      }
}

export const handleGoogleSignIn=()=>{
  const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res=>{
      const {displayName,photoURL,email} = res.user;
      const signedInUser = {
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
        success: true
      }
      return signedInUser;
    //   console.log(displayName,photoURL,email);
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
  }

  export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
     return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
        //   var credential = result.credential;
  
          // The signed-in user info.
        //   var token = result.credential.accessToken;
          var user = result.user;
          user.success = true;
          return user;
        //   console.log('fb user after sign in ',user);
  
        //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //   var accessToken = credential.accessToken;
        //   console.log(accessToken);
  
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
  
          console.log(errorCode,errorMessage,email,credential);
  
          // ...
        });
    }

     export const handleSignOut=()=>{
        return firebase.auth().signOut()
        .then(res => {
          const signedOutUser = {
            isSignedIn:false,
            name:'',
            email:'',
            photo:'',
           
          }
          return signedOutUser;
        }).catch(err => {
          console.log(err);
        });
      }

      export const createUserWithEmailAndPassword = (name,email,password) =>{
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          // Signed in 
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
        //   console.log(res);
          udpateUserName(name);
        //   history.replace(from);
          return newUserInfo;
      
          // var user = res.user;
          // ...
        })
        .catch(error => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;   
          return newUserInfo;   
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   console.log(errorCode,errorMessage);
        });
      }

      export const signInWithEmailAndPassword = (email,password) =>{
       return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          // Signed in
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          return newUserInfo;
          // var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
      
          return newUserInfo;
        });
      }

      const udpateUserName = name =>{
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name,
        }).then(() => {
          // Update successful
          // ...
          console.log('User name updated successfully');
        }).catch((error) => {
          // An error occurred
          // ...
          console.log(error);
        });  
      }

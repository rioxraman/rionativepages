import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import { useContext, useState } from 'react';
import LoadingOverlay from './../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const[isAuthenticating,setIsAuthenticating]=useState(false);
  const authCtx =useContext(AuthContext)
  async function signupHandler({email,password}) {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email,password)
      authCtx.authenticate(token);
      
    } catch (error) {
      Alert.alert(
        'Authentication Failed', 'Not able to create, try later'
      )
    }
  setIsAuthenticating(false)
  }
  if(isAuthenticating){
    return <LoadingOverlay message="Registering you .." />
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;

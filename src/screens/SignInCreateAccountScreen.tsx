import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '../components/Container';
import classnames from 'classnames';
import Form from '../components/Form';
import { UserContext } from '../components/UserContext';

function SignInCreateAccountScreen() {
  //user
  const userContext = useContext(UserContext);

  //tabs
  const [showSignInForm, setShowSignInForm] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/sign-in') {
      setShowSignInForm(true);
    }
    if (location.pathname === '/create-account') {
      setShowSignInForm(false);
    }    
  }, [location]);

  //forms
  const navigate = useNavigate();
  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await axios.post(
        "https://brivity-react-exercise.herokuapp.com/users/sign_in", 
        {
          "user": {email, password}
        });
        userContext.setUser({
        displayName: loginResponse.data.display_name,
        id: loginResponse.data.id,
        email,
        token: loginResponse.headers.authorization,
      });
      navigate('/display-posts');
    }
    catch(err) {
      console.error('Login err:', err);
    }
  } 
 
  //sign-in form
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInReset, setSignInReset] = useState(false);  
  const handleSubmitSignInForm = async (e: React.SyntheticEvent, values: {[key: string]: string}, setValues: React.Dispatch<React.SetStateAction<{[key: string]: string;}>>) => {
    e.preventDefault();
    const { email, password } = values;    
    await login(email, password);
    setValues(signInInputValues);
    setSignInReset(true);
    setSignInLoading(false);  
  };  
  const signInInputValues = {
    email: "",
    password: "",
  };
  const signInInputAttrs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email should be specified.",
      label: "Email",
      required: true,
      lastItem: false,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be specified.",
      label: "Password",
      required: true,
      lastItem: true,
    },
  ];

  //create-account form
  type EmailError = {
    response: {
      data: {
        errors: {
          email: string[]
        }
      }
    }
  };
  function isEmailError(obj: unknown): obj is EmailError {
    return (
      typeof obj === 'object' && obj !== null && 'response' in obj
    );
  }
  const createAccountInputValues = {
    displayName: "",
    email: "",
    password: "",
  };
  const createAccountInputAttrs = [
    {
      id: 1,
      name: "displayName",
      type: "text",
      placeholder: "Display name",
      errorMessage: "Display name should be 5-10 alphanumeric characters.",
      label: "Display name",
      required: true,
      pattern: '^[a-zA-Z0-9]{5,10}$',
      lastItem: false,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email should be a valid email address.",
      label: "Email",
      required: true,
      lastItem: false,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 10-25 characters and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
      label: "Password",
      pattern: `^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\\D*\\d)(?=[^\\\\!#$%&()*+,\\-./:;<=>?@\\[\\]^_\`{|}~"']*[\\\\!#$%&()*+,\\-./:;<=>?@\\[\\]^_\`{|}~"'])[a-zA-Z0-9\\\\!#$%&()*+,\\-./:;<=>?@\\[\\]^_\`{|}~"']{10,25}$`,
      required: true,
      lastItem: true,
    },
  ];
  const [createAccountFormMessage, setCreateAccountFormMessage] = useState('');
  const [createAccountLoading, setCreateAccountLoading] = useState(false);
  const [createAccountReset, setCreateAccountReset] = useState(false);
  const handleSubmitCreateAccountForm = async (e: React.SyntheticEvent, values: {[key: string]: string}, setValues: React.Dispatch<React.SetStateAction<{[key: string]: string;}>>) => {
    e.preventDefault();
    const { displayName, email, password } = values;
    try {
      const createResponse = await axios.post("https://brivity-react-exercise.herokuapp.com/users", {"user": {"email": email, "password": password, "display_name":
      displayName}});
      userContext.setUser({
        displayName: createResponse.data.display_name,
        id: createResponse.data.id,
        email,
        token: createResponse.headers.authorization,
      });
      navigate('/display-posts');
    } catch (err) {
      if (isEmailError(err)) {
        if(err.response.data.errors.email[0] === 'has already been taken') {
          const errorMessage = 'That email address has already been taken, please create an acccount with a different email address.';
          setCreateAccountFormMessage(errorMessage);
        }
      } else {
        console.error('Create Account err:', err);
      }
      setValues(createAccountInputValues);
      setCreateAccountReset(true);
      setCreateAccountLoading(false);      
    }
  };

  return (
    <Container title="Sign in or Create an Account">
      <div className="w-4/5 mx-auto max-w-sm mt-8">
        <div className="flex space-x-5">
          <Link to="/sign-in" className={classnames('ml-5 bg-gray-200 p-4 pb-2 rounded-tl-md rounded-tr-md', {'tab-shadow text-gray-500 bg-gray-300' : !showSignInForm})}>Sign In</Link>        
          <Link to="/create-account" className={classnames('bg-gray-200 p-4 pb-2 rounded-tl-md rounded-tr-md', {'tab-shadow text-gray-500 bg-gray-300' : showSignInForm})}>Create an Account</Link>
        </div>
        <div className={classnames('bg-gray-200 p-5 rounded-md', { 'hidden' : !showSignInForm})}>
          <Form inputValues={signInInputValues} inputAttrs={signInInputAttrs} onSubmit={handleSubmitSignInForm} loading={signInLoading} setLoading={setSignInLoading} buttonText="Sign In" reset={signInReset} />
        </div>
        <div className={classnames('bg-gray-200 p-5 rounded-md', { 'hidden' : showSignInForm})}>
          <Form inputValues={createAccountInputValues} inputAttrs={createAccountInputAttrs} onSubmit={handleSubmitCreateAccountForm} loading={createAccountLoading} setLoading={setCreateAccountLoading} buttonText="Create Account" formMessage={createAccountFormMessage} reset={createAccountReset} />
        </div>
      </div>
    </Container>
  )
}

export default SignInCreateAccountScreen;

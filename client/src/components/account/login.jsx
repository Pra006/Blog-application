import React from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
`;
const Image = styled("img")({
  width: 150,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0 ",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;
const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Text = styled(Typography)`
  font-size: 12px;
  color: #878787;
  font-weight: 600;
  text-align: center;
`;
const Error = styled(Typography)`
  font-size: 10px;
  margin-top: 10px;
  color: #ff6161;
  line-height: 0;
  font-weight: 600;
`;
const login = ({ isUserAuthenticated }) => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  const [account, setAccount] = useState("login");
  const [error, setError] = useState("");
  const { setAccount: setUserAccount }= useContext(DataContext);
  const navigate = useNavigate();

  const signupInitialValues = {
    name: "",
    username: "",
    password: "",
  };
  
  const loginInitialValues = {
    username: "",
    password: "",
  }
  
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);

   const toggleAccount = () => {
    account === "signup" ? setAccount("login") : setAccount("signup");
  };

  const oninput = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const signupuser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      setError("Something went wrong! Please try again later");
    }
  };

  const onvaluechange = (e) => {
    setLogin({...login, [e.target.name]: e.target.value})
  };

  const loginuser = async () => {
    let response = await API.userLogin(login);
    if(response.isSuccess){
      setError("");
      sessionStorage.setItem('accessToken', response.data.accessToken);
      sessionStorage.setItem('refreshToken', response.data.refreshToken);
      setUserAccount({username: response.data.username, name: response.data.name})
      isUserAuthenticated(true);
      navigate('/');  

    } else {
      setError("Something went wrong! Please try again later");
    }
  }

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onvaluechange(e)}
              name="username"
              label="Enter username"
            />
            <TextField
              variant="standard"
              onChange={(e) => onvaluechange(e)}
              name="password"
              label="Enter Password"
            />

            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={()=>loginuser()}>Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton variant="contained" onClick={() => toggleAccount()}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => oninput(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={(e) => oninput(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              onChange={(e) => oninput(e)}
              name="password"
              label="Enter Password"
            />

            {error && <Error>{error}</Error>}
            <SignupButton variant="contained" onClick={() => signupuser()}>
              Signup
            </SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleAccount()}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default login;

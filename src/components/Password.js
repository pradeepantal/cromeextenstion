/*global chrome*/

import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import CryptoJS from "crypto-js";

import {
  Button,
  Container,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router-dom";

const Password = ({ route, navigation }) => {
  const navigate = useNavigate();
  const secretPass = "XkhZG4fW2t2W";

  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);
  let npassword;
  const { state } = useLocation();
  const { secret } = state;


  const checkPassword = (password) => {
   var secret;
    chrome.storage.local.get(['userInfo'], function (result) {
      
      if (password) {
        let data = {
          password: btoa(password),
          key: result.userInfo.key,
          status:1
        };      
        chrome.storage.local.set({userInfo: data}, function() {
          console.log('Value is set to ' + data);
        });     
        navigate("/Login");
      }

    });
    
  };



  const encryptData = (text) => {
    const data = CryptoJS.AES.encrypt(JSON.stringify(text), secretPass).toString();
    return data;
  };


  const checkValidation = (e) => {
    const confPass = e.target.value;
    if (password !== confPass) {
      setIsError("Password do not match");
    } else {
      setPassword(confPass);
      setIsError("");
    }
  };

  return (
    <div>
      <Container
        component="main"
        sx={{
          width: 350,
          height: 250,
          marginTop: 0,
        }}
      >
        <h4>Create Your Password</h4>
        <Grid align="center">
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            style={{ background: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

         
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            style={{ background: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                    onMouseDown={handleMouseDownPassword1}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Confirm Password"
            type={showPassword1 ? "text" : "password"}
            value={npassword}
            onChange={(e) => checkValidation(e)}
          />
          <div className="MessageError">{isError}</div>
          <Button
            variant="contained"
            sx={{ width:320, marginTop:2, borderRadius: 3 }}
            onClick={() => checkPassword(password)}
          >
            Next
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default Password;

/*global chrome*/


import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const CheckSecretKey = ({ navigation }) => {
  const [secretKey, setSecretKey] = useState("");

  const secretPass = "XkhZG4fW2t2W";
  const navigate = useNavigate();
  const sendToNextPage = (value) => {
    if (value) navigate("/verifyPassword", { state: { secret: value } });
  };

  useEffect(() => {
      chrome.storage.local.get(['userInfo'], function (result) {
        if(typeof(result.userInfo) !== "undefined" && result.userInfo !== null){
          setSecretKey(atob(result.userInfo.key));
          if(result.userInfo.status!==0){
            navigate("/Login");
          }
       }else{
       
          setSecretKey(result.userInfo.key);
       }
    });    
     


    
  }, [setSecretKey]);

  const decryptData = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
  };

  const encryptData = (text) => {
    const data = CryptoJS.AES.encrypt(JSON.stringify(text), secretPass).toString();
    return data;
  };

 

  return (
    <Container
      component="main"
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid align="center">
        <h4>Your New Secret Key</h4>
        <h4>{secretKey}</h4>
        <Button
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          variant="contained"
          color="primary"
          onClick={() => sendToNextPage(btoa(secretKey))}
        >
          Next
        </Button>
        <br />
      </Grid>
    </Container>
  );
};

export default CheckSecretKey;

/*global chrome*/

import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CryptoJS from "crypto-js";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();
  const secretPass = "XkhZG4fW2t2W";

  const LogOut = (value) => {
    chrome.storage.local.get(['userInfo'], function (response) {
      let data = {
        password: response.userInfo.password,
        key: response.userInfo.key,
        status:  0,
      };
      chrome.storage.local.set({userInfo: data}, function() {
        console.log('Value is set to ' + data);
      });

    })
    navigate("/Login");
  };

  useEffect(() => {
    chrome.storage.local.get(['userInfo'], function (result) {
      setSecretKey(atob(result.userInfo.key));
    })
   
    
    
  }, [navigate]);

  const decryptData = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
  };


  const encryptData = (text) => {
    const data = CryptoJS.AES.encrypt(JSON.stringify(text), secretPass).toString();
    return data;
  };

  const regenerateKey = () => {
    chrome.runtime.sendMessage({key: "reset"}, function (result) {
      setSecretKey(atob(result.key));
      chrome.storage.local.get(['userInfo'], function (response) {
        let data = {
          password: response.userInfo.password,
          key: result.key,
          status:  0,
        };
        chrome.storage.local.set({userInfo: data}, function() {
          console.log('Value is set to ' + data);
        });

      })
      
    })
  
  };

  return (
    <div>
      <Container
        component="main"
        sx={{
          width: 350,
          height: 250,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid align="center">
         
              <h4>Secret Key</h4>
              <h2>{secretKey}</h2>
              <Button
              fullWidth
                variant="contained"
                color="primary"
                onClick={() => regenerateKey(secretKey)}
              >
                Regenerate
              </Button>
             
           
        </Grid>
        <Grid align="center">
         
        
         <Button
         fullWidth
          sx={{ mt: 2, mb: 2 }}
           variant="contained"
           color="primary"
           onClick={() => LogOut(secretKey)}
         >
           LogOut
         </Button>
      
   </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;

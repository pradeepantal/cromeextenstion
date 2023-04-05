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
    //localStorage.removeItem("userInfo");
    navigate("/Login");
  };

  useEffect(() => {
    let keyFromStorage = localStorage.getItem("userInfo");
    let data = JSON.parse(keyFromStorage);
    let key = decryptData(data.key);
    setSecretKey(key);
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
    let keyFromStorage = localStorage.getItem("userInfo");
    let local = JSON.parse(keyFromStorage);
    let key = (Math.random().toString(36).substring(2, 20))
    let data = {
      password: local.password,
      key: encryptData(key)
    };
    localStorage.setItem("userInfo", JSON.stringify(data));
    setSecretKey(key);
    return data;
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

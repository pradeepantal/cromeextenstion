import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const secretPass = "XkhZG4fW2t2W";
  const navigate = useNavigate();
  let userLogin = localStorage?.getItem("userInfo");

  useEffect(() => {

  }, [userLogin]);

  const handleLogin = (e) => {
    let keyFromStorage = localStorage.getItem("userInfo");
    let data = JSON.parse(keyFromStorage);
    if (decryptData(data.password) == password) {
      navigate("/DashBoard");
    } else {
      alert("Enter correct password")
    }

  }

  const handleReset = (e) => {
     localStorage.removeItem("userInfo");
     navigate("/");
  }

  const decryptData = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Grid align="center">
          <h4 className="Login">Login</h4>
        </Grid>
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
          name="password"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Grid >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>

        </Grid>
        <Grid container>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 0, mb: 2 }}
            onClick={handleReset}
          >
            <Link href="/" variant="body2" underline="hover">
              <div style={{ color: "white" }}> Reset </div>
            </Link>
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;

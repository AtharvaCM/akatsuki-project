import React from "react";

//Custom UI
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button  from "@mui/material/Button";
import TextField from "@mui/material/TextField";


const LoginPage = () => {
  return (
    <div>
      <Card sx={styles.mainBox}>
        <Typography variant="h4" sx={styles.heading} textAlign="center">
          Sign in
        </Typography>
        <hr></hr>
        <div style={styles.innerBox}>
          <TextField id="outlined-basic" label="Username" size="small" variant="outlined" fullWidth style={styles.inputtext} required/>
          <TextField id="outlined-basic" label="Password" size="small" variant="outlined" fullWidth style={styles.inputtext} required/>
          <Button variant="contained" style={styles.loginButton}>Login</Button>
        </div>
      </Card>
    </div>
  );
};

const styles = {
  mainBox: {
   
    margin: "7% 35%",
    padding: "32px",
  },
  heading: {
    fontWeight: 500,
  },
  innerBox: {
    margin: "10%", 
  },
  inputtext: {
    marginBottom:"25px",
  },
  loginButton: {
    margin:"0% 34%"
  }
};
export default LoginPage;

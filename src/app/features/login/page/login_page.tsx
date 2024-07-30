import { LoginRequestModel } from '../model/login_request_model';
import LoginService from '../services/login_service';
import './login_page.css';
import { useUserContext } from "../../../context/user_context";
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../model/user_model';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://hepiyi.com.tr/">
        Hepiyi Sigorta
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
    const { setToken, setUser } = useUserContext();
    const navigate = useNavigate();
    const service = new LoginService();
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) =>  {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('email') as string;
    const password = data.get('password') as string;
    const req: LoginRequestModel = {
      username: username,
      password: password,
    };
    var response=await service.Login(req);
    if(response === null){
      return;
    }
    const token = response?.token; 
    if (token) {
        setToken(token);
        var userResponse = await service.GetUserInfo(response!);
        const user : UserModel = {
            name: userResponse?.name ?? "",
            surname:userResponse?.surname ?? "",
            token: userResponse?.token ?? "",
            username:userResponse?.username ?? ""
        };
        setUser(user.username);
        navigate('/chatbot');
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("https://hepiyi.com.tr/assets/images/illustrations/yardim-konulari.svg")',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
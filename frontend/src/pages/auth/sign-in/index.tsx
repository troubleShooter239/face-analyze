import {CssVarsProvider, extendTheme} from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import React, {useState} from "react";
import {SignInFormElement, SignInRequest, Token} from "../../../common/types/auth";
import IconButton from "@mui/joy/IconButton";
import Logo from "../../../assets/Logo";
import ColorSchemeToggle from "../../../components/theme";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {SIGN_IN} from "../../../utils/constants";
import useAuth from "../../../hooks/useAuth";

const customTheme = extendTheme();

const SignInPage = (): React.JSX.Element => {
  useAuth({validUrl: '/', nonValidUrl: ''})

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<Token | null>(null);

  return (
    <CssVarsProvider theme={customTheme} disableTransitionOnChange>
      <CssBaseline/>
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: {xs: '100%', md: '50vw'},
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{py: 3, display: 'flex', justifyContent: 'space-between'}}
          >
            <Box sx={{gap: 2, display: 'flex', alignItems: 'center'}}>
              <IconButton variant="soft" color="primary" size="sm" onClick={() => navigate('/')}>
                <Logo/>
              </IconButton>
              <Typography level="title-lg">Face Analyze</Typography>
            </Box>
            <ColorSchemeToggle/>
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack sx={{gap: 4, mb: 2}}>
              <Stack sx={{gap: 1}}>
                <Typography component="h1" level="h3">
                  Sign in
                </Typography>
                <Typography level="body-sm">
                  New to company?{' '}
                  <Link level="title-sm" onClick={() => navigate('/sign-up')}>
                    Sign up!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Stack sx={{gap: 4, mt: 2}}>
              <form
                onSubmit={async (event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;

                  const email = formElements.email.value
                  const password = formElements.password.value
                  const signInRequest: SignInRequest = {email, password};
                  try {
                    const response = await axios.post<Token>(SIGN_IN, signInRequest);
                    localStorage.setItem('token', response.data.token);
                    setToken(response.data);
                    navigate('/');
                  } catch (err) {
                    setError('Incorrect email or password');
                  }
                }}
              >
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email"/>
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password"/>
                </FormControl>
                <Stack sx={{gap: 4, mt: 2}}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox size="sm" label="Remember me" name="persistent"/>
                  </Box>
                  <Button type="submit" fullWidth>
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{py: 3}}>
            <Typography level="body-xs" sx={{textAlign: 'center'}}>
              © troubleShooter239 {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: {xs: 0, md: '50vw'},
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.entrepreneur.com%2Fcontent%2F3x2%2F2000%2F20160425153327-emotions-mosaic-different-expressions-faces-angry-mad-sad-smile-feelings.jpeg&f=1&nofb=1&ipt=1cee3709b4d1cbb1f151ff377e8a7dedeca5d6efaf4bd2cbf6bc80f15b3fd99b&ipo=images)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.theexpansionzone.com%2Fwp-content%2Fuploads%2F2020%2F02%2Ffacial-recognition.jpeg&f=1&nofb=1&ipt=9e3d84b4508daae181dd890045344785ade31986432dbd61494f24cc5a8d8235&ipo=images)',
          },
        })}
      />
    </CssVarsProvider>
  )
}
export default SignInPage

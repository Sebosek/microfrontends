import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    a: {
      textDecoration: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
  },
  email: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header({ user, onSignOut }) {
  const classes = useStyles();
  const signedIn = user && user.email;
  
  const onClick = () => {
    if (signedIn && onSignOut) {
      onSignOut();
    }
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            component={RouterLink}
            to="/"
          >
            App
          </Typography>
          <div className={classes.user}>
            {user && 
              <Box mr={2}>
                <Typography
                  color="inherit"
                  noWrap
                >
                  {user.email}
                </Typography>
              </Box>
            }
            <Button
              color="primary"
              variant="outlined"
              className={classes.link}
              component={RouterLink}
              to={signedIn ? '/' : '/auth/signin'}
              onClick={onClick}
            >
              {signedIn ? 'Logout' : 'Login'}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

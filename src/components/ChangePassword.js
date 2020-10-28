import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../redux/actionCreators';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      // width: '25ch'
    },
  },
  paper: {
    width: '250px',
    minHeight: '300px',
    padding: '10px',
  },
  button: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  grid: {
    width: '100%'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function ChangePassword({open, setOpen}) {
  const classes = useStyles();
  const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  const [isError, setIsError] = useState(false);
  const [isOldError, setIsOldError] = useState(false);
  const [isNewError, setIsNewError] = useState(false);
  const [matchError, setMatchError] = useState('');
  const [oldError, setOldError] = useState('');
  const [newError, setNewError] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('');

  const dispatch = useDispatch();

  const clearError = () => {
    setIsError(false);
    setIsOldError(false);
    setIsNewError(false);
    setMatchError('');
    setOldError('');
    setNewError('');
  }

  const handleChangePassword = (e) => {
    e.preventDefault();
    if(oldPassword.length === 0){
      setIsOldError(true);
      setOldError('Required');
    }
    if(newPassword.length === 0){
      setIsNewError(true);
      setNewError('Required');
    }
    if(retypeNewPassword.length === 0){
      setIsError(true);
      setMatchError('Required');
    }
    if(!oldPassword.length || !newPassword.length || !retypeNewPassword.length){
      return;
    }
    if(newPassword.length < 6) {
      setIsNewError(true);
      setNewError('Password must me at least 6 characters');
      return;
    }
    if (!passwordsMatch(newPassword, retypeNewPassword)) {
      setIsError(true);
      setMatchError('Password does not match');
      return;
    }
    dispatch(changePassword({
      oldPassword: oldPassword,
      newPassword: newPassword
    }))
  }

  const handleClose = () => {
    setOpen(false);
  }

  const profileErrorMess = useSelector(state => state.user.errMess);

  useEffect(() => {
    if(profileErrorMess && profileErrorMess.includes('Password')){
      setIsOldError(true);
      setOldError('Your password in incorrect!');
    }
    if(!profileErrorMess){
      setOpen(false);
    }
  }, [])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-label="change password"
      aria-describedby="You can change your password"
      className={classes.modal}
      closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
    >
      <Paper className={classes.paper} elevation={3}>
        <Grid className={classes.grid} container justify='center' alignItems='center'>
          <form className={classes.root} noValidate={true} onSubmit={handleChangePassword} autoComplete="off">
            <Grid item>
              <TextField type="password"
                required
                value={oldPassword}
                onChange={e => { clearError(); setOldPassword(e.target.value) }}
                label='Old Password'
                error={isOldError}
                helperText={oldError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                type="password"
                required
                value={newPassword}
                onChange={e => { clearError(); setNewPassword(e.target.value) }}
                label="New Password"
                error={isNewError}
                helperText={newError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField type="password"
                required
                value={retypeNewPassword}
                onChange={e => { clearError(); setRetypeNewPassword(e.target.value) }}
                label="Retype New Password"
                error={isError}
                helperText={matchError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item align="center">
              <Button size="small" type="submit" className={classes.button} variant="contained" color="primary">
                Change Password
          </Button>
            </Grid>
          </form>

        </Grid>
      </Paper>
    </Modal>
  )
}

export default ChangePassword;

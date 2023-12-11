import Header from './layouts/Header/Header';
import routes from './RootRouter';
import { useRoutes } from 'react-router-dom';
import { memo } from 'react';
import LocalStorage from "src/common/LocalStorage";
import './MainAppStyles.scss';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material'; // Import components from '@mui/material' instead of '@mui/core'

function MainApp() {
  const content = useRoutes(routes);

  if (!LocalStorage.getLoginUser()) {
    return <>
      {content}
    </>;
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        {content}
      </Grid>
    </Grid>
  )
}

export default memo(MainApp);


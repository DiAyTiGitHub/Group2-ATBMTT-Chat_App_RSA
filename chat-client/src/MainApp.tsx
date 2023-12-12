import Header from './layouts/Header/Header';
import routes from './RootRouter';
import { useRoutes } from 'react-router-dom';
import { memo } from 'react';
import LocalStorage from "src/common/LocalStorage";
import './MainAppStyles.scss';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material'; // Import components from '@mui/material' instead of '@mui/core'

function MainApp() {
  const content = useRoutes(routes);

  return (
    <Grid container spacing={0} className='w-100 h-100 flex-column h-100vh'>
      <Grid item xs={12} className='w-100 flex-column'>
        <Header />
        {content}
      </Grid>
    </Grid>
  )
}

export default memo(MainApp);


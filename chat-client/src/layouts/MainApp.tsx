import Header from './Header/Header';
import routes from '../RootRouter';
import { useRoutes } from 'react-router-dom';
import { memo } from 'react';
import './MainAppStyles.scss';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react';

function MainApp() {
  const content = useRoutes(routes);
  const currentPage = window.location.pathname;

  return (
    <Grid container spacing={0} className='w-100 h-100 flex-column h-100vh'>
      <Grid item xs={12} className='w-100 flex-column'>
        {
          currentPage !== "/" && (
            <Header />
          )
        }
        {content}
      </Grid>
    </Grid>
  )
}

export default memo(observer(MainApp));


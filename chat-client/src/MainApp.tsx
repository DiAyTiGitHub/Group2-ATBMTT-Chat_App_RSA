import Header from './layouts/Header/Header';
import routes from './RootRouter';
import { useRoutes } from 'react-router-dom';
import { memo } from 'react';

function MainApp() {
  const content = useRoutes(routes);

  return (
    <>
      <Header />
      {content}
    </>
  )
}

export default memo(MainApp);


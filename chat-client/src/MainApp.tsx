import Header from './layouts/Header/Header';
import routes from './RootRouter';
import { useRoutes } from 'react-router-dom';
import { memo } from 'react';
import LocalStorage from "src/common/LocalStorage";

function MainApp() {
  const content = useRoutes(routes);
  
  if (!LocalStorage.getLoginUser()) {
    return <>
      {content}

    </>;
  }

  return (
    <>
      <Header />
      {content}
    </>
  )
}

export default memo(MainApp);


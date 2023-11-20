import { Suspense } from 'react';

import SuspenseLoader from 'src/components/SuspenseLoader/SuspenseLoaderIndex';

export const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback= {< SuspenseLoader />}>
      <Component { ...props } />
      </Suspense>
);
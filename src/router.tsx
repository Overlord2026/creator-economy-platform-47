import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { CreatorShell } from '@creator/components/layout/CreatorShell';
import { Brief } from '@creator/pages/Brief';
import { OfferLock } from '@creator/pages/OfferLock';
import { Deal } from '@creator/pages/Deal';
import { Payout } from '@creator/pages/Payout';
import { Compliance } from '@creator/pages/Compliance';
import { Portfolio } from '@creator/pages/Portfolio';
import { VerifyView } from '@creator/pages/VerifyView';

export const router = createBrowserRouter([
  {
    path: "/creator",
    element: <CreatorShell />,
    children: [
      { index: true, element: <Brief /> },
      { path: "offer-lock", element: <OfferLock /> },
      { path: "deal/:id", element: <Deal /> },
      { path: "deal/:id/verify", element: <VerifyView /> },
      { path: "payout/:id", element: <Payout /> },
      { path: "compliance", element: <Compliance /> },
      { path: "portfolio", element: <Portfolio /> }
    ]
  },
  {
    path: '/*',
    element: <App />,
  },
]);
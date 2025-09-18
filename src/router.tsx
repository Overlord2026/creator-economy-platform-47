import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { CreatorShell } from '../packages/creator/src/components/layout/CreatorShell';
import { Brief } from '../packages/creator/src/pages/Brief';
import { OfferLock } from '../packages/creator/src/pages/OfferLock';
import { Deal } from '../packages/creator/src/pages/Deal';
import { Payout } from '../packages/creator/src/pages/Payout';
import { Compliance } from '../packages/creator/src/pages/Compliance';
import { Portfolio } from '../packages/creator/src/pages/Portfolio';
import { VerifyView } from '../packages/creator/src/pages/VerifyView';

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
import 'shared/styleConfiguration/index.css';
import 'reset-css/reset.css';
import { FunctionComponent } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';

export const MemoApplication: FunctionComponent = () => <RouterProvider router={router} />;

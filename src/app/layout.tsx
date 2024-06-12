import { FunctionComponent } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LogOut } from 'features/LogOut';
import { Typography } from 'shared/designSystem';
import './layout.css';

export const Layout: FunctionComponent = () => (
  <div className="layout">
    <header className="layout__header">
      <div className="layout__menu">
        <Typography level={3} className="layout__title" weight="bold">
          ИнтерПамять
        </Typography>
        <Link to="/">
          <Typography level={4} className="layout__menu-item" weight="bold">
            На Главную
          </Typography>
        </Link>
      </div>
      <LogOut />
    </header>
    <main className="layout__main">
      <Outlet />
    </main>
  </div>
);

import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <main className="layout-content">
        <Outlet />
      </main>
      <nav className="bottom-nav">
        <NavLink to="/" end>每日</NavLink>
        <NavLink to="/summary">总结</NavLink>
      </nav>
    </div>
  );
}

export default Layout;

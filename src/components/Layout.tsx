import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { formatDate } from "../hooks/useHabitData";
import "./Layout.css";

function Layout() {
  const location = useLocation();

  let currentDate = new Date();
  const match = location.pathname.match(/^\/day\/(\d{4}-\d{2}-\d{2})$/);
  if (match) {
    const [year, month, day] = match[1].split("-");
    currentDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  const prevDay = new Date(currentDate);
  prevDay.setDate(prevDay.getDate() - 1);
  const nextDay = new Date(currentDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const prevPath = `/day/${formatDate(prevDay)}`;
  const nextPath = `/day/${formatDate(nextDay)}`;

  return (
    <div className="layout">
      <main className="layout-content">
        <Outlet />
      </main>
      <nav className="bottom-nav">
        <Link to={prevPath}>前一天</Link>
        <NavLink to="/calendar">日历</NavLink>
        <Link to={nextPath}>后一天</Link>
      </nav>
    </div>
  );
}

export default Layout;

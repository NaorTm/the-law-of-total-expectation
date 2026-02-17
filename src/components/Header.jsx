import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/tutorial', label: 'Tutorial' },
  { to: '/examples', label: 'Example Library' },
  { to: '/practice', label: 'Practice' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/references', label: 'References' },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">Law of Total Expectation</div>
        <nav aria-label="Main navigation">
          <ul className="top-nav">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
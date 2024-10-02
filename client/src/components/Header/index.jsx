import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Xxx = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header >
      <div>
        <div>
          <Link to="/">
            <h1>Xxx</h1>
          </Link>
          <p>Xxx.</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>
              <Link to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
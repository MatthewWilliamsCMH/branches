import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { XXX } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(XXX, {
    fetchPolicy: "no-cache"
  });

  const xxxList = data?.xxx || [];

  return (
    <div>
      <div>
        <h1>xxxx</h1>
      </div>
      <div>
        <h2>xxx</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {xxxList.map((xxx) => {
              return (
                <li key={xxx._id}>
                  <Link to={{ pathname: `xxx/${xx._id}` }}>
                    {xxx.xxx} vs. {xxx.xxx}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div>
        <h2>xxx</h2>
        <Link to="/xxx">
          <button>xxx</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
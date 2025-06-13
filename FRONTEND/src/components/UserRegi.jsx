import '../styles/UsRegi.css';
import { useNavigate } from 'react-router-dom';
import usersServices from '../services/usersServices';
  import { useState, useEffect } from 'react'


function UserRegi() {
  const navigate = useNavigate();

  function exitDashboard() {
    navigate("/PrincipalPage");
  }


  const [Users, setUsers] = useState([]);
  const [ErrorUsers, setErrorUsers] = useState(null);

  useEffect(() => {
      let isMounted = true;
      const fetch = async () => {
          try {
              const DatosUsers = await usersServices.GetUser();

              if (isMounted) {
                  setUsers(DatosUsers);
              }
          } catch (error) {
              if (isMounted) {
                  setErrorUsers(error.message);
              }
          }
      };
  
      fetch();
  
      return () => {
          isMounted = false;
      };

      
  }, []);

  return (
    <div id='ContUltimasPublicaciones'>
      <div className='headerUltimasPublicaciones'>
        <h3>Usuarios registrados</h3>
        <svg onClick={exitDashboard} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
          <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
        </svg>
      </div>


      <div className='Cont2'>
        {Users.map((user, index) => (
          <div className='User' key={index}>
            <div className='user-card-header'>
              <div className='user-icon'>👤</div>
              <div className='registration-label'>Fecha de registro</div>
            </div>
            <div className='user-card-body'>
              <div className='user-name'>{user.username}</div>
              <div className='registration-date'> {new Date(user.date_joined).toLocaleString()}</div>
            </div>
          </div>
        ))}
</div>


    </div>
  );
}

export default UserRegi;

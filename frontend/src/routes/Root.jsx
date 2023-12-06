import { Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';
import { logout } from '../services/auth.service';


function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <>
    <div>
    {user ? (
          <Text>Estás logueado como: {user.email}</Text>
        ) : (
          <Text>Usuario no autenticado</Text>
        )}
        <Button onClick={handleLogout}>Cerrar sesion</Button>
        </div>
      <Outlet />
    </>
  );
}

export default Root;

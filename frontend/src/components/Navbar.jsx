import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Flex,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react';
import { logout } from '../services/auth.service';

function Navbar() {
  const { user } = useAuth();
  const [navigation, setNavigation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.roles && user.roles.length > 0) {
      switch (user?.roles[0].name) {
        case 'admin':
          setNavigation(navAdmin);
          break;
        case 'evaluador':
          setNavigation(navEvaluador);
          break;
        case 'user':
          setNavigation(navUser);
          break;
        default:
          setNavigation(null);
      }
    } else {
      setNavigation(null);
    }
  }, [user, user?.roles]);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navUser = [
    { name: 'Postular', href: 'postulacion', current: false },
    { name: 'Mis postulaciones', href: '#', current: false },
  ];

  const navAdmin = [
    { name: ' Crear Fondos', href: '/fondos/create', current: false },
    { name: 'Crear Concursos', href: '/concursos/create', current: false },
    { name: 'Categorias', href: '/categorias/create', current: false},
    { name: 'Postulaciones', href: '#', current: false },
    { name: 'Rubricas', href: '/rubrica', current: false },
  ];

  const navEvaluador = [
    { name: 'Evaluar Rubricas', href: '/evaluacion', current: false },
  ];

  return (
    <>
      <Flex justify="space-between" align="center" px={8} py={4} bg='blue.700'>
        <Box as="a" href="/" cursor="pointer">
          <Box
            as="svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            w={6}
            h={6}
            color="white"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clipRule="evenodd"
            />
          </Box>
        </Box>

        {navigation && (
          <Flex as="nav" align="center" justify="space-between" flex={1} ml={8}>
            {navigation.map((item) => (
              <ChakraLink
                key={item.name}
                href={item.href}
                fontSize="sm"
                fontWeight="medium"
                color="white"
                _hover={{ color: 'gray.700' }}
                px={4}
              >
                {item.name}
              </ChakraLink>
            ))}
          </Flex>
        )}

        <Flex align="center">
          <Menu>
            <MenuButton as={Avatar} size="sm" cursor="pointer">
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

    </>
  );
}
export default Navbar;
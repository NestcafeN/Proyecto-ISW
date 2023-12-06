// import { Fragment } from 'react'
// import { logout } from '../services/auth.service';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate} from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Stack } from '@chakra-ui/react'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'


function Navbar() {

  // const { user } = useAuth();
  // const [navigation, setNavigation] = useState(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if(user&&user.roles && user.roles.length > 0){
  //     switch(user?.roles[0].name){
  //       case 'admin': 
  //       setNavigation(navAdmin);
  //       break;

  //       case'user': 
  //       setNavigation(navUser);
  //       break;
  //       default:
  //         setNavigation(null);
  //     }
  //   }else{
  //     setNavigation(null);
  //   }
  // }, [user, user?.roles]);
  
  // function classNameNames(...classNamees) {
  //   return classNamees.filter(Boolean).join(' ')
  // }
  

  // const handleLogout = () => {
  //   logout();
  //   navigate('/auth');
  // };

  // const navUser = [
  //   { name: 'Fondos', href: 'fondos', current: false },
  // ]
  
  // const navAdmin = [
  //   { name: 'Fondos', href: 'fondos', current: false },
  //   { name: 'Concursos', href: 'concursos', current: false },
  //   { name: 'Rubricas', href: 'rubricas', current: false },
  // ]
  
  
  return (
    <>
    <Stack>
      <ChakraLink as={ReactRouterLink} to='/home'>
        Home
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/fondos'>
        Fondos
      </ChakraLink>
    </Stack>
    
      </>
  )
}

export default Navbar;
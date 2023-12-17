import { Flex, Heading, Input, Select, Button, Container, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';


function Header() {

return (
      <Container>
            <Flex>
                  <Heading size='lg'>
                  <Flex>Pagina de Fondos</Flex>
                  </Heading>
            </Flex>
            <Flex>
                  <InputGroup>
                  <InputRightElement>
                  <IconButton
                        aria-label='Search database'
                        icon={<SearchIcon />}
                        variant='ghost' />
                  </InputRightElement>
                        <Input type='text' placeholder='Buscar' />
                  </InputGroup>
                        <Select placeholder='Estado' />
                        <Select placeholder="Categorias" />
                  <Button colorScheme='teal' variant='solid'>Buscar</Button>
            </Flex>
      </Container>     
);
}


export default Header;
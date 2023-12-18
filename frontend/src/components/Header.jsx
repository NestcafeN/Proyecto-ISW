import { Flex, Heading, Input, Select, Button, Container, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { getCategorias } from '../services/categoria.service';


function Header() {
      const [selectedCategoria, setSelectedCategoria] = useState('');
      const [selectedEstado, setSelectedEstado] = useState('');
      const [searchText, setSearchText] = useState('');

      const [categorias, setCategorias] = useState([]);

useEffect(() => {
  const fetchCategorias = async () => {
      try {
          const listaCategorias = await getCategorias();
          setCategorias(listaCategorias);
      } catch (error) {
          console.error('Error al obtener criterios:', error.message);
      }
  };
  fetchCategorias();
}, []);

function handleSearch() {
      const filteredFondos = fondos.filter((fondo) => {
        const matchesCategoria = selectedCategoria ? fondo.categoria === selectedCategoria : true;
        const matchesEstado = selectedEstado ? fondo.estado === selectedEstado : true;
        const matchesSearchText = searchText ? fondo.nombre.toLowerCase().includes(searchText.toLowerCase()) : true;
  
        return matchesCategoria && matchesEstado && matchesSearchText;
      });
  
      setFondos(filteredFondos);
    }

return (
      <Container>
  <Flex direction='column' alignItems='center' marginBottom='4'>
    <Heading size='lg' marginBottom='2'>
      Página de Fondos Concursables
    </Heading>
  </Flex>
  <Flex direction='column' marginBottom='4'>
    <InputGroup marginBottom='2'>
      <InputRightElement>
      <IconButton
              aria-label='Search database'
              icon={<SearchIcon />}
              variant='ghost'
              onClick={handleSearch}
            />
      </InputRightElement>
      <Input type='text' placeholder='Buscar' />
    </InputGroup>
    <Flex justifyContent='space-between' marginBottom='2'>
      <Select name='estado' placeholder='Estado' marginRight='2'>
        <option value='Abierto'>Abierto</option>
        <option value='Cerrado'>Cerrado</option>
        <option value='En revisión'>En Revisión</option>
        <option value='Finalizado'>Finalizado</option>
      </Select>
      <Select
        placeholder='Seleccione una Categoria'
        value={selectedCategoria}
        onChange={(e) => setSelectedCategoria(e.target.value)}
        marginRight='2'
      >
        {categorias.map((categoria) => (
          <option key={categoria._id} value={categoria._id}>
            {categoria.nombre}
          </option>
        ))}
      </Select>
      <Button colorScheme='teal' variant='solid'>
        Buscar
      </Button>
    </Flex>
  </Flex>
</Container>
);
}


export default Header;
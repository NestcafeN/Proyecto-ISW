import { Container, FormControl, FormLabel, Input, Select, InputGroup,InputLeftElement, Button } from '@chakra-ui/react'




function FondosCreate() {
  return (
    <Container>
      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
          <Input placeholder='Ingrese el Nombre' />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Descripcion</FormLabel>
          <Input placeholder='Ingrese la Descripcion' />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Fecha de Apertura</FormLabel>
          <Input type='date'/>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Fecha de Cierre</FormLabel>
          <Input type='date'/>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Monto</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          color='gray.300'
          fontSize='1.2em'
          children='$'
          />
        <Input placeholder='Ingrese el monto' />
      </InputGroup>
          </FormControl>

      <FormControl>
      <FormLabel>Categoria</FormLabel>
        <Select placeholder='Seleccione una Categoria'>
          <option>Ciencia y Tecnologia</option>
          <option>Agricultura y Desarrollo social</option>
          <option>Medio Ambiente</option>
        </Select>
      </FormControl>
    <Button colorScheme='teal' variant='solid' > Crear </Button>
    </Container>
      
    )
}
export default FondosCreate;
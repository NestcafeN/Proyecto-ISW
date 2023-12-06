import { Container, FormControl, FormLabel, Input, Select, InputGroup,InputLeftElement, Button } from '@chakra-ui/react'




function ConcursosCreate() {
  return (
    <>
    <Container>
    <FormControl isRequired>
      <FormLabel>Nombre</FormLabel>
        <Input placeholder='Ingrese el Nombre' />
    </FormControl>

    <FormControl isRequired>
      <FormLabel>Estado</FormLabel>
        <Select placeholder='Seleccione un Estado'>
          <option>Abierto</option>
          <option>Cerrado</option>
          <option>En Revisión</option>
          <option>Finalizado</option>
        </Select>
      </FormControl>

    <FormControl isRequired>
      <FormLabel>Fecha de Apertura del Concurso</FormLabel>
        <Input type='date'/>
    </FormControl>

    <FormControl isRequired>
      <FormLabel>Fecha de Cierre del Concurso</FormLabel>
        <Input type='date'/>
    </FormControl>

    <FormControl isRequired>
      <FormLabel>Fecha de Anuncio Ganadores del Concurso</FormLabel>
        <Input type='date'/>
    </FormControl>

  <Button colorScheme='teal' variant='solid' > Crear </Button>
  </Container>
  </>
    )
}
export default ConcursosCreate;
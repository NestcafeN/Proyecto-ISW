
import { Card, CardBody, CardFooter, Stack, Text, Heading, Divider, Button, ButtonGroup } from '@chakra-ui/react'


function Fondosmain() {
  return (
      <>
      <Card maxW='sm'>
  <CardBody>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>titulo de fondo</Heading>
      <Text>
        descripcion del fondo
      </Text>
      <Text >
        Monto del Fondo
      </Text>
      <Text>
            Fechas de apertura y cierre
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='cyan'>
        Ver detalles
      </Button>  
    </ButtonGroup>
  </CardFooter>
</Card>
      </>
  )
}

export default Fondosmain
import { Container, Navbar } from 'react-bootstrap'

function Header () {
  return (
    <Navbar bg='danger' variant='dark' className='mb-3'>
      <Container fluid>
        <Navbar.Brand>React Test App</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header

import { Container } from 'react-bootstrap'
import FilesFilter from './FilesFilter'
import FilesTable from './FilesTable'

function Content () {
  return (
    <Container>
      <FilesFilter />
      <FilesTable />
    </Container>
  )
}

export default Content

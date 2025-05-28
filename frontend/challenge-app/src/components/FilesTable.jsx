import { Table, Spinner, Alert } from 'react-bootstrap'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/store'
import { fetchFiles } from '../store/filesSlice'

function FilesTable () {
  const dispatch = useAppDispatch()
  const { filesList, filesLoading, filesError } = useAppSelector((state) => state.files)

  useEffect(() => {
    dispatch(fetchFiles())
  }, [dispatch])

  if (filesError) {
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Alert variant='danger'><strong>Ocurrió un error al cargar los archivos:</strong> {filesError}</Alert>
      </div>
    )
  }

  if (filesLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center mt-5'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Cargando...</span>
        </Spinner>
      </div>
    )
  }
  return (

    <Table striped bordered hover responsive>
      <thead>
        <tr style={{ borderBottom: '2px solid black' }}>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {filesList.map((row, index) => (
          <tr key={index}>
            <td>{row.file}</td>
            <td>{row.text}</td>
            <td>{row.number}</td>
            <td>{row.hex}</td>
          </tr>
        ))}
      </tbody>
    </Table>

  )
}

export default FilesTable

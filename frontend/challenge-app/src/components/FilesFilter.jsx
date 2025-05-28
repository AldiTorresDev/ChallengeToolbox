import { Spinner, Form, Alert } from 'react-bootstrap'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/store'
import { fetchFileNames } from '../store/fileNamesSlice'
import { fetchFiles } from '../store/filesSlice'


function Content () {
  const dispatch = useAppDispatch()
  const { fileNamesList, fileNamesLoading, fileNamesError } = useAppSelector((state) => state.fileNames)

  useEffect(() => {
    dispatch(fetchFileNames())
  }, [dispatch])

  const handleFileChange = (e) => {
    const selectedFile = e.target.value
    if (selectedFile === '') {
      dispatch(fetchFiles())
    } else {
      dispatch(fetchFiles(selectedFile))  
    }
  }

  return (
    <div className="d-flex justify-content-end align-items-center w-auto my-2" style={{ width: '100%' }}>
      {fileNamesError ? (
        <Alert variant="danger" className="p-2" style={{ fontSize: '0.875rem' }}>
          {fileNamesError}
        </Alert>
      ) : (
        <>
          <Form.Label className="me-2 mb-0">Filtrar por archivo: </Form.Label>
          {fileNamesLoading ? (
            <Spinner animation="border" role="status" variant="secondary">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          ) : (
            <Form.Select style={{ maxWidth: 250 }} onChange={handleFileChange}>
              <option value="">Todos</option>
              {fileNamesList.map((fileName, index) => (
                <option key={index} value={fileName}>{fileName}</option>
              ))}
            </Form.Select>
          )}
        </>
      )}
    </div>
  )
}

export default Content

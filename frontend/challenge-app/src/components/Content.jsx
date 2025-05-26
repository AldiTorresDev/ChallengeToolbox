import { Table, Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Content () {
  const [files, setFiles] = useState([])

  const transformData = (data) => {
    let transformedData = []
    data.forEach(item => {
      item.lines.forEach(line => {
        transformedData.push({
          file: item.file,
          text: line.text,
          number: line.number,
          hex: line.hex
        })
      })
    })
    return transformedData
  }
  
  useEffect(() => {
    fetch(`${apiUrl}/files/data`)
      .then(response => response.json())
      .then(data => setFiles(transformData(data)))
      .catch(error => console.error('Error fetching data:', error))
  }, []) 

  return (
    <Container>
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
          {files.map((row, index) => (
            <tr key={index}>
              <td>{row.file}</td>
              <td>{row.text}</td>
              <td>{row.number}</td>
              <td>{row.hex}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Content

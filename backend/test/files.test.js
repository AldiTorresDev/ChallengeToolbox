/**
 * @fileoverview Suite de pruebas para el endpoint /files/data
 * @description Pruebas de integración para verificar el comportamiento del endpoint
 * que maneja la obtención y filtrado de datos de archivos CSV
 */

import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app.js'

const { expect } = chai
chai.use(chaiHttp)

/**
 * @describe Suite de pruebas para el endpoint GET /files/data
 * @group files
 */
describe('GET /files/data', () => {
  /**
   * @test Verifica que el endpoint responda con status 200
   * @description Prueba básica de disponibilidad del endpoint
   */
  it('debería retornar un status 200', async () => {
    const res = await chai.request(app).get('/files/data')
    expect(res).to.have.status(200)
  })

  /**
   * @test Verifica la estructura de la respuesta
   * @description Comprueba que la respuesta contenga un array de objetos
   * con la estructura correcta: file, lines (array de objetos con text, number y hex)
   */
  it('debería retornar un array de objetos con las propiedades requeridas', async () => {
    const res = await chai.request(app).get('/files/data')
    expect(res.body).to.be.an('array')

    // Verifica la estructura de cada elemento en el array
    res.body.forEach(item => {
      expect(item).to.be.an('object')
      expect(item).to.have.property('file')
      expect(item).to.have.property('lines')
      expect(item.lines).to.be.an('array')

      // Verifica la estructura de cada línea dentro del archivo
      item.lines.forEach(line => {
        expect(line).to.have.property('text')
        expect(line).to.have.property('number')
        expect(line).to.have.property('hex')
      })
    })
  })

  /**
   * @test Verifica el filtrado por nombre de archivo
   * @description Comprueba que el endpoint filtre correctamente cuando se proporciona
   * un query parameter fileName
   */
  it('debería filtrar correctamente cuando se proporciona un query parameter', async () => {
    const fileName = 'test2.csv'
    const res = await chai.request(app).get(`/files/data?fileName=${fileName}`)
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array')
    // Verifica que todos los elementos retornados correspondan al archivo solicitado
    expect(res.body.every(item => item.file === fileName)).to.be.true
  })

  /**
   * @test Verifica el manejo de archivos inexistentes
   * @description Comprueba que el endpoint retorne un status 404 cuando
   * se solicita un archivo que no existe
   */
  it('debería manejar correctamente un archivo inexistente', async () => {
    const res = await chai.request(app).get('/files/data?fileName=archivo_inexistente.csv')
    expect(res).to.have.status(404)
  })
})

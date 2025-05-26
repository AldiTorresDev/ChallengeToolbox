/**
 * @fileoverview Servicio para interactuar con la API externa de archivos
 * @description Este módulo proporciona funciones para obtener la lista de archivos
 * y el contenido de archivos específicos desde un servicio externo.
 * Utiliza autenticación mediante API Key y maneja las peticiones HTTP.
 */

import axios from 'axios'
import dotenv from 'dotenv'

// Configuración de variables de entorno
dotenv.config()

// Constantes de configuración de la API
const apiKey = process.env.EXTERNAL_API_KEY
const apiVersion = 'v1'
const baseUrl = 'https://echo-serv.tbxnet.com'

/**
 * Obtiene la lista de archivos disponibles desde la API externa
 * @async
 * @function getFilesList
 * @returns {Promise<string[]>} Array con los nombres de los archivos disponibles
 * @throws {Error} Si hay un error en la petición HTTP o la API no responde correctamente
 *
 * @example
 * const files = await getFilesList();
 * // Retorna: ['file1.csv', 'file2.csv', ...]
 */
const getFilesList = async () => {
  const response = await axios.get(`${baseUrl}/${apiVersion}/secret/files`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })
  return response.data?.files
}

/**
 * Obtiene el contenido de un archivo específico desde la API externa
 * @async
 * @function getFileData
 * @param {string} fileName - Nombre del archivo a obtener
 * @returns {Promise<string>} Contenido del archivo en formato texto
 * @throws {Error} Si hay un error en la petición HTTP, el archivo no existe o la API no responde correctamente
 *
 * @example
 * const content = await getFileData('test1.csv');
 * // Retorna el contenido del archivo como string
 */
const getFileData = async (fileName) => {
  const response = await axios.get(`${baseUrl}/${apiVersion}/secret/file/${fileName}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })
  return response.data
}

export { getFilesList, getFileData }

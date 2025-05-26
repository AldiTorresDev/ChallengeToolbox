/**
 * @fileoverview Controlador para manejar las operaciones relacionadas con archivos
 * @description Este módulo contiene la lógica para obtener y procesar datos de archivos CSV
 * desde un servicio externo, incluyendo filtrado por nombre de archivo y transformación
 * de contenido.
 */

import { getFilesList, getFileData } from '../services/externalApiService.js'
import { transformFileContent } from '../utils/fileTransformer.js'

/**
 * Obtiene y transforma los datos de todos los archivos disponibles
 * @async
 * @function getAllFilesData
 * @param {import('express').Request} req - Objeto de solicitud de Express
 * @param {import('express').Response} res - Objeto de respuesta de Express
 * @returns {Promise<void>} No retorna valor explícito, pero envía una respuesta HTTP
 *
 * @description
 * Este controlador maneja las siguientes operaciones:
 * 1. Obtiene la lista de archivos disponibles
 * 2. Filtra por nombre de archivo si se proporciona en query params
 * 3. Procesa cada archivo para obtener su contenido
 * 4. Transforma el contenido de cada archivo
 * 5. Retorna los datos procesados o maneja errores apropiadamente
 *
 * @throws {Error} Puede lanzar errores en caso de fallos en la API externa o procesamiento
 */
const getAllFilesData = async (req, res) => {
  try {
    // Obtener lista inicial de archivos disponibles
    let filesNamesList = await getFilesList()

    // Verificar si hay archivos disponibles
    if (!filesNamesList || (Array.isArray(filesNamesList) && filesNamesList.length === 0)) {
      return res.status(404).json({
        error: 'No se encontraron archivos disponibles'
      })
    }

    // Filtrar por nombre de archivo si se proporciona en query params
    if (req.query.fileName) {
      filesNamesList = filesNamesList.filter(fileName => fileName === req.query.fileName)
      if (filesNamesList.length === 0) {
        return res.status(404).json({
          error: 'No se encontró el archivo solicitado'
        })
      }
    }

    // Procesar cada archivo en paralelo usando Promise.all
    const filesDataPromises = filesNamesList.map(async (fileName) => {
      try {
        // Obtener y transformar el contenido de cada archivo
        const fileContent = await getFileData(fileName)
        return {
          file: fileName,
          lines: transformFileContent(fileContent)
        }
      } catch (error) {
        // Si hay error al procesar un archivo, retornar objeto vacío para ese archivo
        return {
          file: fileName,
          lines: []
        }
      }
    })

    // Esperar a que todos los archivos sean procesados
    const allFilesData = await Promise.all(filesDataPromises)

    // Verificar si se obtuvieron datos válidos
    if (allFilesData.length === 0) {
      return res.status(404).json({
        error: 'No se encontraron archivos con datos válidos'
      })
    }

    // Enviar respuesta exitosa con los datos procesados
    res.json(allFilesData)
  } catch (error) {
    // Manejar errores generales del controlador
    console.error('⚠️ Error al obtener la lista de archivos:', error)
    res.status(500).json({
      error: 'Error interno del servidor al obtener los archivos'
    })
  }
}

export default getAllFilesData

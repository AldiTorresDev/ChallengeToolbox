/**
 * @fileoverview Utilidad para transformar contenido de archivos CSV en formato estructurado
 * @description Este módulo proporciona funciones para procesar y validar el contenido
 * de archivos CSV, transformándolo en un formato JSON estructurado con validaciones
 * de tipos y formatos específicos.
 */

/**
 * @typedef {Object} TransformedLine
 * @property {string} text - Texto de largo variable que representa el contenido de la línea
 * @property {number} number - Un número
 * @property {string} hex - Identificador hexadecimal de 32 dígitos
 * @description Representa una línea transformada del archivo CSV con sus propiedades validadas
 */

/**
 * @typedef {Object} TransformedFile
 * @property {string} file - Nombre del archivo
 * @property {TransformedLine[]} lines - Array de líneas transformadas y validadas
 * @description Representa el resultado de la transformación de un archivo completo
 */

/**
 * Transforma el contenido de un archivo CSV en un formato estructurado
 * @function transformFileContent
 * @param {string} fileContent - Contenido del archivo en formato CSV
 * @returns {TransformedLine[]} Array de líneas transformadas y validadas
 *
 * @description
 * Esta función realiza las siguientes operaciones:
 * 1. Divide el contenido en líneas
 * 2. Valida el formato de las columnas
 * 3. Procesa cada línea validando:
 *    - Formato correcto (4 columnas)
 *    - Campos no vacíos
 *    - Tipos de datos correctos
 *    - Formato hexadecimal válido
 *    - Número válido
 * 4. Retorna un array con las líneas válidas transformadas
 *
 * @example
 * const csvContent = "file,text,number,hex\nfile1.csv,texto,123,0123456789abcdef0123456789abcdef";
 * const result = transformFileContent(csvContent);
 * // Retorna: [{ text: "texto", number: 123, hex: "0123456789abcdef0123456789abcdef" }]
 */
export const transformFileContent = (fileContent) => {
  // Validar contenido inicial
  if (!fileContent) {
    return []
  }

  try {
    // Dividir contenido en líneas y obtener cabecera
    const splitContent = fileContent.split('\n')
    const columns = splitContent[0].split(',')
    const lines = splitContent.slice(1) // Ignoramos la cabecera

    // Validar estructura de columnas
    if (columns.length !== 4 || columns[0] !== 'file' || columns[1] !== 'text' ||
        columns[2] !== 'number' || columns[3] !== 'hex') {
      throw new Error('⚠️ El archivo no tiene las columnas correctas')
    }

    // Procesar y transformar cada línea
    const transformedLines = lines
      .filter(line => line.trim()) // Ignoramos líneas vacías
      .map((line) => {
        // Dividir línea en partes y limpiar espacios
        const parts = line.split(',').map(item => item.trim())

        // Validar número de columnas
        if (parts.length !== 4) {
          return null
        }

        const [file, text, numberStr, hex] = parts

        // Validar campos no vacíos
        if (!file || !text || !numberStr || !hex) {
          return null
        }

        // Validar tipos de datos
        if (typeof file !== 'string' || typeof text !== 'string' || typeof hex !== 'string') {
          return null
        }

        // Validar formato hexadecimal (32 dígitos)
        if (!/^[0-9A-Fa-f]{32}$/.test(hex)) {
          return null
        }

        // Validar y convertir número
        const number = Number(numberStr)
        if (isNaN(number)) {
          return null
        }

        // Retornar objeto transformado
        return {
          text,
          number,
          hex
        }
      })
      .filter(line => line !== null) // Eliminar líneas inválidas

    return transformedLines
  } catch (error) {
    console.error('⚠️ Error al transformar el archivo', error.message)
    return []
  }
}

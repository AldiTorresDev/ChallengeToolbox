/**
 * @typedef {Object} TransformedLine
 * @property {string} text - Un texto de largo variable
 * @property {number} number - Un número
 * @property {string} hex - Un hexadecimal de 32 dígitos
 */

/**
 * @typedef {Object} TransformedFile
 * @property {string} file - Nombre del archivo
 * @property {TransformedLine[]} lines - Array de líneas transformadas
 */

/**
 * Transforma el contenido de un archivo CSV en un formato estructurado
 * @param {string} fileContent - Contenido del archivo en formato CSV
 * @returns {TransformedFile} Objeto con el nombre del archivo y sus líneas transformadas
 */
export const transformFileContent = (fileContent) => {
  if (!fileContent) {
    return [];
  }

  try {
    const splitContent = fileContent.split("\n");
    const columns = splitContent[0].split(",");
    const lines = splitContent.slice(1); // Ignoramos la cabecera

    if(columns.length !== 4 || columns[0] !== "file" || columns[1] !== "text" || columns[2] !== "number" || columns[3] !== "hex") {
      throw new Error("⚠️ El archivo no tiene las columnas correctas");
    }

    const transformedLines = lines
      .filter(line => line.trim()) // Ignoramos líneas vacías
      .map((line, index) => {
        const parts = line.split(",").map(item => item.trim());
        
        // Verificamos que la línea tenga exactamente 4 partes (file, text, number, hex)
        if (parts.length !== 4) {
          console.warn(`⚠️Línea ${index+1} ignorada formato inválido - ${line}`);
          return null;
        }

        const [file, text, number, hex] = parts;
        
        // Verificamos que todos los campos tengan valor
        if (!file || !text || !number || !hex) {
          console.warn(`⚠️Línea ${index+1} ignorada campos vacíos - ${line}`);
          return null;
        }

        return {
          text,
          number,
          hex
        };
      })
      .filter(line => line !== null); // Filtramos las líneas inválidas

    return transformedLines;
  } catch (error) {
    console.error(`⚠️ Error al transformar el archivo`, error.message);
    return []
  }
}; 
import { getFilesList, getFileData } from "../services/externalApiService.js";
import { transformFileContent } from "../utils/fileTransformer.js";

/**
 * Obtiene y transforma los datos de todos los archivos disponibles
 * @param {import('express').Request} req - Objeto de solicitud de Express
 * @param {import('express').Response} res - Objeto de respuesta de Express
 */
const getAllFilesData = async (req, res) => {
  try {
    let filesNamesList = await getFilesList();

    if (!filesNamesList || (Array.isArray(filesNamesList) && filesNamesList.length === 0)) {
      return res.status(404).json({ 
        error: "No se encontraron archivos disponibles"
      });
    }

    console.log("filesNamesList", filesNamesList);

    const filesDataPromises = filesNamesList.map(async (fileName) => {
      try {
        const fileContent = await getFileData(fileName);
        return {
          file: fileName,
          lines: transformFileContent(fileContent)
        };
      } catch (error) {
        console.error(`⚠️Error procesando archivo ${fileName}:`, error.message);
        return {
          file: fileName,
          lines: []
        };
      }
    });

    const allFilesData = await Promise.all(filesDataPromises);

    if (allFilesData.length === 0) {
      return res.status(404).json({ 
        error: "No se encontraron archivos con datos válidos" 
      });
    }

    res.json(allFilesData);
  } catch (error) {
    console.error("⚠️Error al obtener la lista de archivos:", error);
    res.status(500).json({ 
      error: "Error interno del servidor al obtener los archivos" 
    });
  }
};

export default getAllFilesData;



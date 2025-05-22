import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.EXTERNAL_API_KEY;
const apiVersion = "v1";
const baseUrl = "https://echo-serv.tbxnet.com";

const getFilesList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/${apiVersion}/secret/files`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        }
    });
    return response.data?.files;
  } catch (error) {
    console.error("⚠️Error fetching files list:", error.response.data);
    throw error;
  }
}

const getFileData = async (fileName) => {
  // console.log("obteniendo archivo", fileName);
  try {
    const response = await axios.get(`${baseUrl}/${apiVersion}/secret/file/${fileName}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      }
    });
    // console.log(`contenido del archivo:`, response.data);
    return response.data;
  } catch (error) {
    console.error("⚠️Error fetching file data:", error.response.data);
    throw error;
  }
}

export { getFilesList, getFileData };

import router from 'express'
import { getAllFilesData, getAllFilesList } from '../controllers/fileController.js'

const filesRouter = router()

filesRouter.get('/data', getAllFilesData)

filesRouter.get('/list', getAllFilesList)

export default filesRouter

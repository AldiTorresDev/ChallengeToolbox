import router from 'express'
import getAllFilesData from '../controllers/fileController.js'

const filesRouter = router()

filesRouter.get('/data', getAllFilesData)

filesRouter.get('/list', (req, res) => {
  res.send('list')
})

export default filesRouter

import  express  from "express";
import * as taskcontrollers from './controllers/taskcontroller'

const router=express.Router()

router.post('/addtask',taskcontrollers.addtask)
router.get('/readtask',taskcontrollers.readtask)
router.put('/updatetask/:id',taskcontrollers.updatetask)
router.delete('/deletetask/:id',taskcontrollers.deletetask)

export default router;
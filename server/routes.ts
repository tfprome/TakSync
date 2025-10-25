import  express  from "express";
import * as taskcontrollers from './controllers/taskcontroller'
import * as usercontrollers from './controllers/usercontrollers'
import verifytoken from './middleware/authmiddleware';

const router=express.Router()

router.post('/addtask',verifytoken,taskcontrollers.addtask)
router.get('/readtask',verifytoken,taskcontrollers.readtask)
router.put('/updatetask/:id',verifytoken ,taskcontrollers.updatetask)
router.delete('/deletetask/:id',verifytoken, taskcontrollers.deletetask)

router.post('/auth/signup',usercontrollers.signupuser)
router.post('/auth/login',usercontrollers.loginuser)

export default router;
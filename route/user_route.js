//craeteing instance
const userRoute = require('express').Router()
const {index, create, edit, pnf, addUser, allUser, singleUser, updateUser, deleteUser} = require('../controller/user_controller')

//pages routes
userRoute.get('/', index)
userRoute.get('/user/add', create)
userRoute.get('/user/edit', edit)

//api routes
userRoute.post('/api/user/new', addUser)
userRoute.get('/api/user/all', allUser)
userRoute.get('/api/user/:id', singleUser)
userRoute.patch('/api/users/edit/:id', updateUser)
userRoute.delete('/api/user/:id', deleteUser)

//default route
userRoute.all('/*', pnf)

//export thease all routes
module.exports = userRoute
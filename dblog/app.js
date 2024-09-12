import cookieParser from 'cookie-parser'
import express from 'express'
import rout from './routers/router.js'

//creating express app
const app = express()

//recieved body data and parse into json
app.use(express.json())
//if request is post then reading the body data
app.use(express.urlencoded({ extended: true }))
//if want to use cookies then it is must to import
app.use(cookieParser())

//defining route
app.use('/user', rout)

// app.use((req, res, next) => {
//     const requestPath = req.url;
//     // Block access to specific files like 'profile.html'
//     if (requestPath === '/profile.html' || requestPath.startsWith('/static/')) {
//         res.status(403).send('Access denied');
//     } else {
//         next();
//     }
// });
// to start index file as localhost:portnumber hit in the url while server is running
app.use(express.static('./static'))

app.listen(3000, () => {
    console.log("working...")
})


const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const app = express()
const mongoose = require("mongoose")
// mongoose.connect("mongodb+srv://masanov:masanov3167@cluster0.ss2bslz.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true}).then(()=>{console.log("success ")}).catch((err)=>{console.log(err)})
mongoose.connect("mongodb://127.0.0.1:27017/tkti", {useNewUrlParser: true}).then(()=>{console.log("success ")}).catch((err)=>{console.log("error")})
const PORT = process.env.PORT  || 5000;
app.use(cors())
app.use(express.json())

const {BolimRouter, BolimHodimRouter} = require('./controller/bolim/route');
const {ElonRouter,NewsRouter} = require('./controller/elonandnews/route');
const {FakultetRouter, FakultetHodimRouter} = require('./controller/fakultet/route')
const {FaoliyatRouter, FaoliyatDataRouter} = require('./controller/faoliyat/route')
const {KafedraRouter,KafedraHodimRouter,KafedraYonalishRouter} = require('./controller/kafedra/route')
const {MarkazRouter, MarkazHodimRouter} = require('./controller/markaz/route')
app.use('/elon', ElonRouter)
app.use('/news', NewsRouter)
app.use('/rektorat', require('./controller/rektorat/route'))
app.use('/daraja', require('./router/darajaRoutes'))
app.use('/matbuot', require('./controller/matbuot/route'))
app.use('/sertifikat', require('./router/SertificatRoutes'))
app.use('/qabul', require('./router/qabul'))
app.use('/bm_data', BolimRouter)
app.use('/bm_hodim', BolimHodimRouter)
app.use('/markaz_data', MarkazRouter)
app.use('/markaz_hodim', MarkazHodimRouter)
app.use('/Fak_data', FakultetRouter)
app.use('/Fak_hodim', FakultetHodimRouter)
app.use('/kafedra_data', KafedraRouter)
app.use('/kafedra_hodim', KafedraHodimRouter)
app.use('/kafedra_yonalish', KafedraYonalishRouter)
app.use('/faoliyat', FaoliyatRouter)
app.use('/faoliyat_data', FaoliyatDataRouter)
app.use('/auth', require('./controller/users/route'))
app.use('/filter', require('./router/FilterRoutes'))
app.use('/media', require('./router/media'))
app.use('/student', require('./router/student'))
app.use('/student_bolim', require('./router/studentbolim'))
app.use('/statistic', require('./router/statistic'))
app.use('/banner', require('./controller/banner/route'))
app.use('/xalqaro_aloqa', require('./controller/xalqaro_aloqa/route'))
app.use('/about_us', require('./controller/about_us/route'))
app.use('/mission', require('./controller/mission/route'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(PORT, console.log(`run server ${PORT} port`))
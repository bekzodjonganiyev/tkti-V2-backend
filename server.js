const express = require('express')
const cors = require('cors')
const path = require('path')
const EmailSender = require("./controller/sendEmil")
// const bodyParser = require("body-parser")

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }  


const app = express()
const mongoose = require("mongoose")
// mongoose.connect("mongodb+srv://masanov:masanov3167@cluster0.ss2bslz.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true}).then(()=>{console.log("success ")}).catch((err)=>{console.log(err)})
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}).then(()=>{console.log("success", process.env.MONGODB_URI)}).catch((err)=>{console.log("error")})

app.use(cors())
app.use(express.json())

const {BolimRouter, BolimHodimRouter} = require('./controller/bolim/route');
const { NewsRouter } = require('./controller/news/route');
const { FakultetRouter, FakultetHodimRouter} = require('./controller/fakultet/route')
const {FaoliyatRouter, FaoliyatDataRouter} = require('./controller/faoliyat/route')
const {KafedraRouter,KafedraHodimRouter,KafedraYonalishRouter} = require('./controller/kafedra/route')
const {MarkazRouter, MarkazHodimRouter} = require('./controller/markaz/route');
const { XalqaroAloqaNameRouter, XalqaroAloqaDataRouter } = require('./controller/xalqaro_aloqa/route');
const { TalabalarNameRouter, TalabalarDataRouter } = require('./controller/talabalar/route');
const { TalimNameRouter, TalimDataRouter } = require('./controller/talim/route');
const { QabulNameRouter, QabulDataRouter } = require('./controller/qabulNew/route');
const { MyTktiNameRouter, MyTktiDataRouter } = require('./controller/my_tkti/route');
const { IlmiyTadNameRouter, IlmiyTadDataRouter } = require('./controller/ilmiy_tad/route');
app.use('/news', NewsRouter)
app.use('/rektorat', require('./controller/rektorat/route'))
app.use('/daraja', require('./router/darajaRoutes'))
app.use('/matbuot', require('./controller/matbuot/route'))
app.use('/sertifikat', require('./router/SertificatRoutes'))
// app.use('/qabul', require('./router/qabul'))
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

app.use('/xalqaro_aloqa', XalqaroAloqaNameRouter)
app.use('/xalqaro_aloqa_child', XalqaroAloqaDataRouter)
app.use('/talabalar', TalabalarNameRouter)
app.use('/talabalar_data_child', TalabalarDataRouter)
app.use('/talim', TalimNameRouter)
app.use('/talim_data_child', TalimDataRouter)
app.use('/qabul', QabulNameRouter)
app.use('/qabul_data_child', QabulDataRouter)
app.use('/my_tkti', MyTktiNameRouter)
app.use('/my_tkti_child', MyTktiDataRouter)
app.use('/ilmiy_tad', IlmiyTadNameRouter)
app.use('/ilmiy_tad_child', IlmiyTadDataRouter)

app.use('/auth', require('./controller/users/route'))
app.use('/filter', require('./router/FilterRoutes'))
app.use('/media', require('./router/media'))
app.use('/student', require('./router/student'))
app.use('/student_bolim', require('./router/studentbolim'))
app.use('/statistic', require('./router/statistic'))

app.use('/banner', require('./controller/banner/route'))
app.use('/about_us', require('./controller/about_us/route'))
app.use('/mission', require('./controller/mission/route'))

app.use('/photo', require('./controller/photos/route'))
app.post("/send", async (req, res) => {
  try {
    const { fullName,email,phone,message} = req.body
    EmailSender({fullName,email,phone,message})
    res.json({ msg: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Error ❌" });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
const PORT = process.env.PORT  || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
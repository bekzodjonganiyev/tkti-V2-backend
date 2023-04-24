const Media_data = require('../models/media')
const validate = require("../config/validate");
const removeMedia = require('../config/fs');
const fs =require('fs');
const path = require('path')
const {Fakultet_hodim}= require('./fakultet/model');
const Banner = require('./banner/model')
const {Elon_data, News_data} = require('./elonandnews/model')
const {Bolim_hodim} = require('./bolim/model');
const {Kafedra_hodim} = require('./kafedra/model');
const {Markaz_hodim} = require('./markaz/model');
const Rektorat_data = require('./rektorat/model')

const filterFunc = (first, second, key) =>{
    const result = [];
    for(let i of second){
        if(!first.find(item => item[key]?.split('/')[1] ===i)){
            result.push(i)
        }
    }
   return result
}

class MediaController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postMediaValidation.validate({...req.body});
            if(error){
                removeMedia(req.file.filename);
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }
            
            value.link = `uploads/${req.file.filename}`

            const Media = new Media_data(value);
            await Media.save();

            res.status(200).json({status:200,success:true, message:`Media qo'shildi`, data: Media})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
    async Edit(req, res) {
        try{
            const { error, value } = validate.postMediaValidation.validate({...req.body});
            if(error){
                if(req.file){
                    removeMedia(req.file.filename);
                }
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const updated = await Media_data.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            if(!updated){
                res.status(404).json({status:404, message:'berilgan id bo`yicha data topilmadi', success:false});
                return
            }

            res.status(200).json({status:200,success:true, message:`media yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
    async Get(_, res) {
        try{
            const Media = await Media_data.find().sort({_id:-1});

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Media})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
    async GetAll(_, res) {
        try{
            const Media = fs.readdirSync(path.join(__dirname, '..','uploads'))

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Media})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
    async GetById(req, res) {
        try{
            const Media = await Media_data.findOne({_id:req.params.id});

            if(!Media){
                res.status(404).json({status:404, message:'Media topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Media})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
    async Delete(req, res) {
        try{            
            const Media = await Media_data.findByIdAndDelete(req.params.id);
            if(!Media){
                res.status(404).json({status:404, message:'Media topilmadi :('});
                return
            }
 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Media})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
    async Download(req, res) {
        try{            
            const {file} = req.params;

            const foundedFile = fs.existsSync(path.join(__dirname, '..','uploads', file));

            if(!foundedFile){
                res.status(404).json({status:404, message:'Yuklab olinishi kerak bo`lgan fayl bazada topilmadi', success:false});
                return
            }

            res.download(path.join(__dirname,'..', 'uploads', file))
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async RemoveCasheFiles(_,res){
        try{
            const allFiles = fs.readdirSync(path.join(__dirname, '..', 'uploads'));

            // fakultetni hodimlarini rasmlari tekshirilyabti
            const FakultetHodimPhotos = await Fakultet_hodim.find();
            const etap1 = filterFunc(FakultetHodimPhotos, allFiles, 'photo');

            // // Bolimni hodimlarini rasmlari tekshirilyabti
            const BolimHodimPhotos = await Bolim_hodim.find();
            const etap2 = filterFunc(BolimHodimPhotos, etap1, 'photo');

            // // Elon rasmlari tekshirilyabti
            const ElonPhotos = await Elon_data.find();
            const etap3 = filterFunc(ElonPhotos, etap2,'photo');
                
            // // bannerdegi rasmlar tekshirilyabti
            const BannerPhotos = await Banner.find();
            const etap4 = filterFunc(BannerPhotos, etap3, 'banner_img')

            // Kafedrani hodimlarini rasmlari tekshirilyabti
            const KafedraHodimPhotos = await Kafedra_hodim.find();
            const etap5 = filterFunc(KafedraHodimPhotos, etap4, 'photo');

            // Markazni hodimlarini rasmlari tekshirilyabti
            const MarkazHodimPhotos = await Markaz_hodim.find();
            const etap6 = filterFunc(MarkazHodimPhotos, etap5, 'photo');

            // Media rasmlari tekshirilyabdi
            const MediaPhotos = await Media_data.find();
            const etap7 = filterFunc(MediaPhotos, etap6, 'link');

            // Newsni rasmlari tekshirilmoqda
            const NewsPhotos = await News_data.find();
            const etap8 = filterFunc(NewsPhotos, etap7, 'photo');

            // rektoratni rasmlari tekshirilmoqda
            const RektoratPhotos = await Rektorat_data.find();
            const result = filterFunc(RektoratPhotos, etap8, 'photo');

            if(result.length === 0){
                res.status(404).json({status:404, message:`kesh fayl yo'q`});
                return
            }

            // for(let i of result){
            //     removeMedia(i)
            // }

            res.status(200).json({status:200, success:true, message:`Yaxshi ${result.length}ta musor fayl bor `, data: result })
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new MediaController;
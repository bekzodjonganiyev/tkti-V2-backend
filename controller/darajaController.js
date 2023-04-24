const Daraja = require('../models/daraja');

exports.addDaraja = async (req, res) => {
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`uploads/${photo.filename}`))
    try {
        const result = new Daraja({
            ...req.body,
            photo: photos
        })       
        await result.save()
        res.status(201).json(
            {
                success: true,
                status: 201,
                data: result
            }
        )
    } catch (e) {
        res.status(500).json(
            {
                success: false,
                err: "error"
            }
        )
    }
}

exports.getById = async (req, res) => {
    try {
        const daraja = await Daraja.findById({ _id: req.params.id })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: daraja
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "daraja not found"
            }
        )
    }
}

exports.getAll = async (req, res) => {
    try {
        const daraja = await Daraja.find({})
        res.status(200).json(
            {
                success: true,
                status: 200,
                total: daraja.length,
                data: daraja
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "daraja not found"
            }
        )
    }
}

exports.getQuery = async (req, res) =>{
    try {
        let condition = {};
        const {
            talim_turi,
            yili,
            Fakultet,
            Kafedra,
            talim_yonalishi,
            talim_darajasi
        } = req.query  
        if (talim_turi) condition = { ...condition, talim_turi }
        if (yili) condition = { ...condition, yili }
        if (Fakultet) condition = { ...condition, Fakultet }
        if (Kafedra) condition = { ...condition, Kafedra }
        if (talim_yonalishi) condition = { ...condition, talim_yonalishi }
        if (talim_darajasi) condition = { ...condition, talim_darajasi }
        const data = await Daraja.find(condition)
        return res.status(200).json({
            data
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}


exports.updatedaraja = async (req, res) => {
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`uploads/${photo.path.slice(7)}`))
    try {
        const result = await Daraja.findByIdAndUpdate(req.params.id, {
            ...req.body,
            photo: photos
        })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: result
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "daraja not found"
            }
        )
    }
}

exports.deletedaraja = async (req, res) => {
    try {
        await Daraja.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: []
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "daraja not found"
            }
        )
    }
}

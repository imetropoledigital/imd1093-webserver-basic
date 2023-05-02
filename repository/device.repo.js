const mongoose = require('mongoose')
const { Schema } = mongoose

const deviceSchema = new Schema({
  name: {type: String, unique: true},
  description: String,
  engUnit: String,
  createdAt: { type: Date, default: Date.now }
});

const modelName = 'Device'

const Device = mongoose.model(modelName, deviceSchema);

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/iot'
mongoose.connect(DB_URL)

class DeviceRepo {

    async save(device){
        const deviceRepo = new Device({ name: device.name, description: device.description, engUnit: device.engUnit});
        return await deviceRepo.save()
    }

    async findAll(){
        return await mongoose.model(modelName).find({})
    }

    async findById(id){
        return await mongoose.model(modelName).findById(id)
    }

    async deleteById(id){
        return await mongoose.model(modelName).deleteOne({_id: id})
    }

    async updateById(id, device){
        const updatedData = device
        updatedData._id = id
        console.log('vai imp')
        console.log(updatedData)
        return await mongoose.model(modelName).findOneAndUpdate({_id: id}, updatedData, {new: false})
    }

}

module.exports = DeviceRepo



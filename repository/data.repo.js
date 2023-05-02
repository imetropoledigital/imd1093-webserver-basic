const mongoose = require('mongoose')
const { Schema } = mongoose

const dataSchema = new Schema({
  deviceId: {type: mongoose.Schema.Types.ObjectId},
  ts: {type: Date},
  value: {type: String}
});

const modelName = 'Data'
const Data = mongoose.model(modelName, dataSchema)
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/iot'
mongoose.connect(DB_URL)

class DataRepo {
    async save(value){
      console.log(value)
        const data = new Data({ deviceId: value.deviceId, ts: value.ts , value: value.value });
        return await data.save()
    }
}

module.exports = DataRepo



import mongoose from "mongoose";

const ProdukSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  jenis: { type: String },
  Harga: { type: Number, required: true },
  image_url: { type: String },
  macam: [
    {
      ukuran: String,
      Harga: Number,
      image_url: String
    }
  ]
}, { _id: true });

const collectionName = "PRODUK";

export default mongoose.models[collectionName] ||
  mongoose.model(collectionName, ProdukSchema, collectionName);

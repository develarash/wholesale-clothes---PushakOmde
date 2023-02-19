import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min,
    },
    admincreator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: [String],
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: Array,
      default: [],
    },
    price: {
      type: Number,
      default: 0,
    },
    colors: {
      type: Array,
      default: [],
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    registeredtime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default model("Product", productSchema);

import mongoose, { Schema } from "mongoose";

const quoteItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const quoteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [quoteItemSchema],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    requested: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

quoteSchema.pre(/^find/, function (next) {
  const cutoffDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  this.where({ createdAt: { $gte: cutoffDate } });
  next();
});

export const Quote = mongoose.model("Quote", quoteSchema);

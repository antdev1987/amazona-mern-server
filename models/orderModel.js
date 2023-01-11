import mongoose from 'mongoose'

const { Schema } = mongoose

const orderSchema = new Schema(
  {

    orderItems: [
      {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        }
      }
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    tax: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalOrder: { type: Number, required: true },

    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },

    isPaid:{type:Boolean, default:false},
    paidAt:{type:Date},
    isDelivered:{type:Boolean, default:false},
    deliveredAt:{type:Date},

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
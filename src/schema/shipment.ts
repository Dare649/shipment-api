import mongoose, { Schema, Document, Model } from "mongoose";

interface IShipmentItem {
  origin: string;
  destination: string;
  status?: "pending" | "in-transit" | "delivered" | "cancelled";
  expectedDeliveryDate?: Date;
  deliveredAt?: Date;
  weight?: number;
  cost?: number;
  notes?: string;
}

interface ISenderReceiver {
  name: string;
  phone?: string;
  address?: string;
}

export interface IShipment extends Document {
  trackingNumber: string;
  shipments: IShipmentItem[];
  sender: ISenderReceiver;
  receiver: ISenderReceiver;
  createdAt: Date;
  updatedAt: Date;
}

const shipmentSchema = new Schema<IShipment>(
  {
    trackingNumber: { type: String, required: true, unique: true },
    shipments: [
      {
        origin: { type: String, required: true },
        destination: { type: String, required: true },
        status: {
          type: String,
          enum: ["pending", "in-transit", "delivered", "cancelled"],
          default: "pending",
        },
        expectedDeliveryDate: Date,
        deliveredAt: Date,
        weight: Number,
        cost: Number,
        notes: String,
      },
    ],
    sender: {
      name: { type: String, required: true },
      phone: String,
      address: String,
    },
    receiver: {
      name: { type: String, required: true },
      phone: String,
      address: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id; 
        delete ret._id;    
      },
    },
  }
);

const Shipment: Model<IShipment> = mongoose.model<IShipment>("Shipment", shipmentSchema);

export default Shipment;

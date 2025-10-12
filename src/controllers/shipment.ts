import { Request, Response } from 'express';
import Shipment from '../schema/shipment';

// Generate tracting number
const generateTrakingNumber = (): string => {
    return 'TRK-' + Math.random().toString(36).substring(2,10).toUpperCase();
};


// Create a new shipment
const createShipment = async(
    req: Request, 
    res: Response
) => {
    try {
        const trackingNumber = generateTrakingNumber();
        const shipmentData = {
            ...req.body,
            trackingNumber
        };
        const shipment = new Shipment(shipmentData);
        const savedShipment = await shipment.save();

        res.status(201).json({
            success: true,
            message: "Shipment created successfully.",
            data: savedShipment
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error creating shipment",
            error: error.message
        })
    }
};


// Update existing shipment
const updateShipment = async(
    req: Request, 
    res: Response
) => {
    try {
        const { id } = req.params;
        const updateShipment = await Shipment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        // Check if the shipmnt is exisitng
        if (!updateShipment) {
            res.status(404).json({
                success: false,
                message: "Shipment not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Shipment updated successfully."
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error updating shipment",
            error: error.message
        })
    }
};


// Get shipment
const getAllShipment = async(
    req: Request,
    res: Response
) => {
    try {
        const shipment = await Shipment.find();

        res.status(200).json({
            success: true,
            count: shipment.length,
            data: shipment
        });
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: "Error retrieving shipment",
            error: error.message
        })
    }
};


// Get a shipment by ID
const getShipment = async(
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const shipment = await Shipment.findById(id);

        // Check if the shipment exisit
        if (!shipment) {
            res.status(400).json({
                success: false,
                message: "Shipment not found",
            });
            return;
        }

        res.status(200).json({
            sucess: true,
            message: "SHipment retrieved successfully.",
            data: shipment
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error reteieving shipment",
            error: error.message
        })
    }
};


// Delete a shipment
const deleteShipment = async(
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const deleteShipment = await Shipment.findByIdAndDelete(id);

        // Check is the shipment is existing
        if (!deleteShipment) {
            res.status(404).json({
                success: false,
                message: "Shipment not found",
            });
            return;
        }  

        res.status(200).json({
            success: true,
            message: "Shipment created successfully."
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error deleting shipment."
        })
    }
};


// Update shipment status
const updateShipmentStatus = async(
    req: Request, 
    res: Response
) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const shipment = await Shipment.findById(id);

        // Check if the shipment exist
        if (!shipment) {
            res.status(404).json({
                succes: false,
                message: "Shipment not found"
            });
            return;
        }

        // Update shipment status
        shipment.shipments.forEach((item: any) => {
            item.status = status || item.status;
        });

        // Save new shipment
        await shipment.save();

        res.status(200).json({
            sucess: true,
            messsage: "Shipment status updated successfully.",
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error updaing shipment status",
            error: error.message
        })
    }
};


// Track a shipment
const trackShipment = async (
    req: Request,
    res: Response
) => {
    try {
        const { trackingNumber } = req.params;

        const shipment = await Shipment.findOne({ trackingNumber });

        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: "Shipment not found with this tracking number"
            });
        }

        res.status(200).json({
            success: true,
            message: "Shipment details retrieed successfully.",
            data: shipment
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "An error occured while tracking shipment.",
            error: error.message
        })
    }
}

export default {
    createShipment,
    updateShipment,
    getAllShipment,
    getShipment,
    deleteShipment,
    updateShipmentStatus,
    trackShipment
};

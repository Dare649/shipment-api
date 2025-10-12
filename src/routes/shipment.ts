import express from 'express';
import shipment from '../controllers/shipment';

const router = express.Router();

router.post('/', shipment.createShipment);
router.get('/', shipment.getAllShipment);
router.get('/:id', shipment.getAllShipment);
router.get('/track/:trackingNumber', shipment.trackShipment);
router.put('/:id', shipment.updateShipment);
router.put('/:id/status', shipment.updateShipmentStatus);
router.delete('/:id', shipment.deleteShipment);


export default router;
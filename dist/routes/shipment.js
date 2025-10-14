"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shipment_1 = __importDefault(require("../controllers/shipment"));
const router = express_1.default.Router();
router.post('/', shipment_1.default.createShipment);
router.get('/', shipment_1.default.getAllShipment);
router.get('/:id', shipment_1.default.getAllShipment);
router.get('/track/:trackingNumber', shipment_1.default.trackShipment);
router.put('/:id', shipment_1.default.updateShipment);
router.put('/:id/status', shipment_1.default.updateShipmentStatus);
router.delete('/:id', shipment_1.default.deleteShipment);
exports.default = router;

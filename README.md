
## 🚚 Shipment API

A simple and scalable **RESTful API** built with **Node.js**, **Express**, and **TypeScript**, using **MongoDB** as the database.
This service handles shipment-related operations and can serve as a foundation for logistics or e-commerce systems.

---

## 📦 Tech Stack

* **Node.js** — runtime environment
* **Express.js** — web framework
* **TypeScript** — static typing for better development
* **MongoDB & Mongoose** — database and ODM
* **dotenv** — environment variable management
* **morgan** — HTTP request logger
* **CORS** — middleware for cross-origin requests

---

## ⚙️ Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/en/download/) (v18+ recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) running locally or a cloud connection (e.g., MongoDB Atlas)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Dare649/shippment-api.git
cd shippment-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your environment variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shippmentdb
```

*(If using MongoDB Atlas, replace the URI accordingly.)*

---

## 🧑‍💻 Development

Run the API in development mode with hot reloading:

```bash
npm run dev
```

This uses `ts-node-dev` to automatically restart the server when files change.

---

## 🏗️ Build for Production

Compile TypeScript to JavaScript:

```bash
npm run build
```

Then start the compiled server:

```bash
npm start
```

The compiled code will be located in the `/dist` directory.

---


## 🧩 Common Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start server in development mode |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start`     | Start production server          |
| `npm install`   | Install dependencies             |

---

## 🧾 Example API Endpoints

| Method   | Endpoint             | Description           |
| -------- | -------------------- | --------------------- |
| `GET`    | `/api/shipments`     | Get all shipments     |
| `POST`   | `/api/shipments`     | Create a new shipment |
| `GET`    | `/api/shipments/:id` | Get shipment by ID    |
| `PUT`    | `/api/shipments/:id` | Update shipment       |
| `DELETE` | `/api/shipments/:id` | Delete shipment       |

*(Endpoints depend on your actual implementation.)*

---

## 🧰 Troubleshooting

* **MongoDB connection error:**
  Make sure MongoDB is running or that your `MONGO_URI` is correct.
* **TypeScript errors:**
  Run `npm run build` to check for type issues before deployment.

---

## 📜 License

This project is licensed under the **ISC License**.


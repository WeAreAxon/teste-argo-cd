import express from "express";
import cors from "cors";
import SignalController from "./controllers/SignalController";
const app = express();

app.use(cors({}));
app.use(express.json());

const PORT = process.env["PORT"];

app.use("/signals", SignalController.insertOne);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
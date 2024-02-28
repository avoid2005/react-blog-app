import express from "express";
import cors from "cors";
import { router } from "./routes/router.js";

const port = 5000;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

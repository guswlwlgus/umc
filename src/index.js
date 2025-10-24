import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { handleUserSignUp } from "./controllers/user.controller.js";
import { addStore } from "./controllers/store.controller.js";
import { addReview } from "./controllers/review.controller.js";
import { addMission } from "./controllers/mission.controller.js";
import { handleChallengeMission } from "./controllers/user.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/stores", addStore);
app.post("/api/v1/reviews", addReview);
app.post("/api/v1/missions", addMission);
app.post("/api/v1/users/member-mission", handleChallengeMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

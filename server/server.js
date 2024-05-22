import { connectToMongo } from "../db/db.js";
import { app } from "../index.js";

const port = 3000;

connectToMongo();

app.listen(port, () => {
  console.log(`Server is working at http://localhost:${port}`);
});

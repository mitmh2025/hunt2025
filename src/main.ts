import app from "./app";

const port = 3000;

app({ apiUrl: "http://localhost:3000" }).listen(port, () => {
  console.log(`Listening on port ${port}`);
});

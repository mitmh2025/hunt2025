import app from "./app";

const port = 3000;

const environment = process.env.DB_ENV || "development";
const JWT_SECRET = "secret"; // FIXME

app({
  environment,
  jwt_secret: JWT_SECRET,
  apiUrl: "http://localhost:3000",
}).then((app) =>
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  }),
);

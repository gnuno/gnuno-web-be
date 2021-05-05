const app = require("./src/app");
const db = require("./src/db/connection");
const { PORT } = require("./src/config");

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(`Conectado a la base de datos exitosamente.`);
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`);
});

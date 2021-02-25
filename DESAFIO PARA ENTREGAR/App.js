const app = require("express")();
const http = require('http').createServer(app);
const path = require("path");
const morgan = require("morgan");




app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




let Productos = [];


app.get("/", (req, res) => {
  res.status(200).render("index", { Productos: Productos });
});
app.get("/:id", (req, res) => {
  const { id } = req.params;

  const ProductoBuscado = Productos.find((producto) => producto.id == id);

  ProductoBuscado
    ? res.status(200).json(ProductoBuscado)
    : res.status(500).json({ Mensaje: "Producto no encontrado" });
});


app.post("/", (req, res) => {
  let id = Productos.length + 1;

  const NuevoProducto = {
    ...req.body,
    id: id,
  };

  Productos.push(NuevoProducto);

  res.status(201).redirect("/");
});








app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;

  if (id >= Productos.length) {
    res.status(500).json({ Mensaje: "Producto no encontrado" });
  }

  let newArray = Productos.filter((producto) => producto.id != id);
  let newProduct = {
    id,
    title,
    price,
    thumbnail,
  };

  res.status(201).json([...newArray, newProduct]);
});
app.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (id >= Productos.length) {
    res.status(500).json({ Mensaje: "Producto no encontrado" });
  }

  const newArray = Productos.filter((producto) => producto.id != id);

  res.status(200).json(newArray);
});





http.listen( 3000, () => {
  console.log('running on port 3000')
});

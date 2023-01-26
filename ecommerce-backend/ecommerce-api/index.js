const app = require("./app");
const config = require("./config/ecommerce.config")
const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Ecommerce Backend Server running on http://localhost:${PORT}`);
})
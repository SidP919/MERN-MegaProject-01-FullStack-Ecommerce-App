const app = require("./app");
const config = require("./config/auth.config")
const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
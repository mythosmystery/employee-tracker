const sequelize = require("./lib/connection");
const App = require("./lib/app");

sequelize.sync({ force: false }).then(() => {
    console.log('Connected to DB');
    App.init();
});
const App = require("./lib/app");
const sequelize = require("./lib/connection");

sequelize.sync({ force: false }).then(() => {
    console.log('Connected to DB');
    App.init();
});

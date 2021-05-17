const App = require("./app");
const sequelize = require("./lib/connection");

sequelize.sync({ force: false }).then(() => {
    console.log('Connected to DB');
    console.log('Starting app...');
    App.menu();
});



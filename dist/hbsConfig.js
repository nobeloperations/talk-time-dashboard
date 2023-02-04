"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hbsConfig = void 0;
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const allow_prototype_access_1 = require("@handlebars/allow-prototype-access");
const helplers_1 = require("./hbsHelpers/helplers");
const path_1 = require("path");
function hbsConfig(app) {
    let hbs = exphbs.create({
        extname: 'hbs',
        handlebars: (0, allow_prototype_access_1.allowInsecurePrototypeAccess)(Handlebars),
        defaultLayout: 'mainLayout',
        layoutsDir: (0, path_1.resolve)('./views/layouts'),
        helpers: helplers_1.helpers,
        partialsDir: (0, path_1.resolve)('./views/partials')
    });
    app.set('views', (0, path_1.resolve)('./views'));
    app.useStaticAssets((0, path_1.resolve)('./public'));
    app.useStaticAssets((0, path_1.resolve)('./uploads'));
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
}
exports.hbsConfig = hbsConfig;
//# sourceMappingURL=hbsConfig.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const hbs_config_1 = require("../hbs-config");
const events_1 = require("events");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    (0, hbs_config_1.hbsConfig)(app);
    const eventEmitter = new events_1.EventEmitter();
    app.set('eventEmitter', eventEmitter);
    await app.listen(process.env.PORT || 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const hbs_config_1 = require("../hbs-config");
const startup_1 = require("./sockets/startup");
function formatMemoryUsage(memoryUsage) {
    const formattedMemoryUsage = {};
    const bytesInMegabytes = 1024 * 1024;
    for (const key in memoryUsage) {
        if (memoryUsage.hasOwnProperty(key)) {
            formattedMemoryUsage[key] = (memoryUsage[key] / bytesInMegabytes).toFixed(2);
        }
    }
    return formattedMemoryUsage;
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, startup_1.default)();
    app.enableCors();
    (0, hbs_config_1.hbsConfig)(app);
    console.log(formatMemoryUsage(process.memoryUsage()));
    await app.listen(process.env.PORT || 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map
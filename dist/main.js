"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const data_collector_service_1 = require("./module/data.collector/data.collector.service");
const logger = new common_1.Logger('bootstrap');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 8000;
    const dataSaver = app.get(data_collector_service_1.DataCollectorService);
    await dataSaver.findAll();
    await app.listen(port);
    logger.log(`* listening on port ${port} *`);
}
bootstrap();
//# sourceMappingURL=main.js.map
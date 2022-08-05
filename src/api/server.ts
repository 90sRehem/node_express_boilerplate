import { APP_PORT } from "@/config";

import { App } from "./app";
import { routes } from "./routes";

const app = new App();

app.listen(Number(APP_PORT));
app.initializeRoutes(routes);

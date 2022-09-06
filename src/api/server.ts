import { APP_PORT } from "@/config";

import { App } from "./app";

const app = new App();

app.listen(Number(APP_PORT) || 3333);

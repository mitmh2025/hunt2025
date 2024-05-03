import { WebSocketExpress } from 'websocket-express';
import express from 'express';
import path from 'path';

import { getRouter } from './api/server';
import { getUiRouter } from './routes';

export default function({ apiUrl }) {
    const app = new WebSocketExpress();

    // Mount the API router at /api
    const apiRouter = getRouter();
    app.use("/api", apiRouter);

    // Serve assets from the bundle without auth
    app.use("/assets", express.static(path.join(__dirname, 'assets')))

    // Forward all other requests to the UI router, which we expect to
    // handle most user requests.
    const uiRouter = getUiRouter({ apiUrl });
    app.use("/", uiRouter);

    return app;
}

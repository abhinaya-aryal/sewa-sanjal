import { Controller, Get, Res } from "@nestjs/common";
import type { Response } from "express";

@Controller()
export class AppController {
  @Get()
  getHome(@Res() response: Response) {
    const apiUrl = process.env.API_URL;

    response.setHeader("Content-Type", "text/html");
    response.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Sewa Sansar API</title>
        <style>
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont;
            background: #0f172a;
            color: #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .card {
            background: #020617;
            padding: 2.5rem 3rem;
            border-radius: 12px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.4);
            text-align: center;
            max-width: 420px;
          }
          h1 {
            font-size: 1.6rem;
            margin-bottom: 1rem;
          }
          p {
            color: #94a3b8;
            margin-bottom: 1.5rem;
          }
          a {
            display: inline-block;
            padding: 0.6rem 1.2rem;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
          }
          a:hover {
            background: #1d4ed8;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>✅ Sewa Sanjal API</h1>
          <p>The service backbone is running peacefully.</p>
          <a href="${apiUrl}/docs">Open API Documentation</a>
        </div>
      </body>
      </html>
    `);
  }
}

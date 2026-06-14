import express from "express";
import path from "path";
import https from "https";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Video Proxy API route to stream Google Drive background video seamlessly bypassing iframe/CORS issues
  app.get("/api/video", (req, res) => {
    const videoId = "1u_pOQlhZCW-LPL35ZCW0VJPXXNV_9F73";
    const url = `https://drive.google.com/uc?export=download&id=${videoId}`;

    // Handle nested chaser function to request and follow Google Drive download redirects
    const requestDrive = (targetUrl: string) => {
      const parsedUrl = new URL(targetUrl);
      https.get({
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "*/*"
        }
      }, (driveRes) => {
        // Handle redirect (Google Drive uc redirects to doc-xx-xx-docs.googleusercontent.com)
        if (driveRes.statusCode && driveRes.statusCode >= 300 && driveRes.statusCode < 400 && driveRes.headers.location) {
          requestDrive(driveRes.headers.location);
          return;
        }

        res.writeHead(driveRes.statusCode || 200, {
          "Content-Type": "video/mp4",
          "Cache-Control": "public, max-age=86400",
          "Content-Length": driveRes.headers["content-length"] || ""
        });

        driveRes.pipe(res);
      }).on("error", (err) => {
        console.error("Video proxy error:", err);
        res.status(500).send("Video streaming from Google Drive failed");
      });
    };

    requestDrive(url);
  });

  // 2. Vite middleware setup for Development / Static serving for Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Oceanic Tours & Travel Server running on http://localhost:${PORT}`);
  });
}

startServer();

const https = require("https");
const zlib = require("zlib");

async function fetchVintedHomepage(): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "www.vinted.co.uk",
      port: 443,
      path: "/catalog/79-sweats-et-pulls",
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Cache-Control": "no-cache",
      },
    };

    const req = https.request(options, (res: any) => {
      console.log(`📡 Response status: ${res.statusCode}`);
      console.log(`📋 Content encoding: ${res.headers["content-encoding"]}`);

      let data = "";
      let stream = res;

      // Handle gzip compression
      if (res.headers["content-encoding"] === "gzip") {
        stream = zlib.createGunzip();
        res.pipe(stream);
      }

      stream.on("data", (chunk: any) => {
        data += chunk;
      });

      stream.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (error: any) => {
      console.error("❌ Request error:", error);
      reject(error);
    });

    req.end();
  });
}

async function fetchVintedCatalogue(): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "www.vinted.co.uk",
      port: 443,
      path: "/catalog/79-sweats-et-pulls",
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Cache-Control": "no-cache",
      },
    };

    const req = https.request(options, (res: any) => {
      console.log(`📡 Response status: ${res.statusCode}`);
      console.log(`📋 Content encoding: ${res.headers["content-encoding"]}`);

      let data = "";
      let stream = res;

      // Handle gzip compression
      if (res.headers["content-encoding"] === "gzip") {
        stream = zlib.createGunzip();
        res.pipe(stream);
      }

      stream.on("data", (chunk: any) => {
        data += chunk;
      });

      stream.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (error: any) => {
      console.error("❌ Request error:", error);
      reject(error);
    });

    req.end();
  });
}

module.exports = { fetchVintedCatalogue };

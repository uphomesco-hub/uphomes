// export default async (request) => {
//   const ua = (request.headers.get("user-agent") || "").toLowerCase();
//   const url = new URL(request.url);

//   const PLAY  = "https://play.google.com/store/apps/details?id=com.flutterflow.homeU742786";
//   const APPLE = "https://apps.apple.com/in/app/uphomes/id6737268880";
//   const WEB   = url.origin; // homepage on desktop/other

//   const isAndroid = ua.includes("android");
//   const isIOS = /\b(iphone|ipad|ipod)\b/.test(ua);
//   const force = (url.searchParams.get("force") || "").toLowerCase(); // tester: android|ios|web

//   let dest = WEB;
//   if (force === "android" || (isAndroid && force !== "web")) dest = PLAY;
//   else if (force === "ios" || (isIOS && force !== "web"))   dest = APPLE;

//   return Response.redirect(dest, 302);
// };

export default async (request) => {
  const ua = request.headers.get("user-agent") || "";
  const uaLower = ua.toLowerCase();
  const url = new URL(request.url);

  // Your store/web targets (unchanged)
  const PLAY  = "https://play.google.com/store/apps/details?id=com.flutterflow.homeU742786";
  const APPLE = "https://apps.apple.com/in/app/uphomes/id6737268880";
  const WEB   = url.origin;

  // For previews
  const META_API_BASE = Deno.env.get("META_API_BASE") || "";
  const DEFAULT_OG = `${url.origin}/og/default.jpg`;

  // Helpers
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c])
    );

  const isBot = /facebookexternalhit|twitterbot|slackbot|telegrambot|whatsapp|discordbot|linkedinbot|embedly|quora|pinterest|vkshare|applebot|googlebot|bingbot|duckduckgo|ia_archiver/i.test(ua);

  // Detect listing path + docId
  const lowerPath = url.pathname.toLowerCase();
  const isListing = lowerPath.startsWith("/propertylisting/") || lowerPath.startsWith("/listing/");
  let docId = "";
  if (isListing) {
    const parts = url.pathname.split("/").filter(Boolean); // ["PropertyListing", "<docId>"]
    if (parts.length >= 2) docId = parts[1];
  }

  // ===== Bot flow for listing URLs: return OG meta HTML =====
  if (isBot && isListing && docId) {
    let title = "Explore This Property on UpHomes : this property";
    let description = "Explore on UpHomes";
    let image = DEFAULT_OG;

    try {
      if (META_API_BASE) {
        const api = new URL(META_API_BASE);
        api.searchParams.set("docId", docId);
        api.searchParams.set("defaultImage", DEFAULT_OG);

        const r = await fetch(api.toString(), { headers: { accept: "application/json" } });
        if (r.ok) {
          const j = await r.json();
          if (j.title)       title = j.title;
          if (j.description) description = j.description;
          if (j.image && /^https?:\/\//i.test(j.image)) image = j.image;
        }
      }
    } catch (_) {
      // keep defaults
    }

    const html = `<!doctype html><html><head>
<meta charset="utf-8">
<title>${esc(title)}</title>

<meta property="og:type" content="website">
<meta property="og:site_name" content="UpHomes">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:url" content="${esc(url.href)}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">

<link rel="canonical" href="${esc(url.href)}">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head><body></body></html>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=600"
      }
    });
  }

  // ===== Human flow (unchanged redirect logic, incl. ?force=) =====
  const isAndroid = uaLower.includes("android");
  const isIOS = /\b(iphone|ipad|ipod)\b/i.test(ua);
  const force = (url.searchParams.get("force") || "").toLowerCase(); // android|ios|web

  let dest = WEB;
  if (force === "android" || (isAndroid && force !== "web")) dest = PLAY;
  else if (force === "ios" || (isIOS && force !== "web"))   dest = APPLE;

  return Response.redirect(dest, 302);
};
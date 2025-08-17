export default async (request) => {
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  const url = new URL(request.url);

  const PLAY  = "https://play.google.com/store/apps/details?id=com.flutterflow.homeU742786";
  const APPLE = "https://apps.apple.com/in/app/uphomes/id6737268880";
  const WEB   = url.origin; // ← desktop/web goes to https://uphomes.in (no auto-scroll)

  const isAndroid = ua.includes("android");
  const isIOS = /\b(iphone|ipad|ipod)\b/.test(ua);
  const force = (url.searchParams.get("force") || "").toLowerCase(); // optional tester

  let dest = WEB;
  if (force === "android" || (isAndroid && force !== "web")) dest = PLAY;
  else if (force === "ios" || (isIOS && force !== "web"))   dest = APPLE;

  return Response.redirect(dest, 302);
};
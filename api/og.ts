import { ImageResponse } from "@vercel/og";

/**
 * Preview card for link unfurls (Open Graph / Twitter). One endpoint, parameterised per page:
 *   /api/og?title=Smart%20Gebere&subtitle=Flutter%20%C2%B7%20TensorFlow%20Lite
 *
 * Runs on the Edge runtime. Output is cached at the CDN for a day, so it costs nothing after
 * the first render of each page.
 */
export const config = { runtime: "edge" };

const GOLD = "#F5B800";
const INK = "#0A0A0A";
const PORTRAIT = "https://res.cloudinary.com/dkiuz3gfn/image/upload/w_320,h_320,c_fill,g_face,q_auto,f_png/v1759949739/liben_fupt3c.jpg";

const clamp = (value: string | null, max: number, fallback: string): string => {
  const text = (value ?? "").trim() || fallback;
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
};

// satori accepts plain element objects; no JSX needed, so this file stays .ts.
const h = (type: string, props: Record<string, unknown>, ...children: unknown[]) => ({
  type,
  props: { ...props, children: children.length === 1 ? children[0] : children },
});

export default function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = clamp(searchParams.get("title"), 70, "Software Engineer");
  const subtitle = clamp(searchParams.get("subtitle"), 120, "ML systems and AI benchmark design");
  const isHome = title === "Software Engineer";

  const card = h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        background: `linear-gradient(135deg, #161616 0%, ${INK} 60%, #0d0b05 100%)`,
        color: "#fff",
        fontFamily: "sans-serif",
        position: "relative",
      },
    },
    h("div", { style: { position: "absolute", top: 0, left: 0, width: "100%", height: 10, background: GOLD, display: "flex" } }),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 860 } },
      h(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        h("div", { style: { fontSize: 26, color: GOLD, letterSpacing: 4, textTransform: "uppercase", display: "flex" } }, "Liben Adugna"),
        h(
          "div",
          { style: { fontSize: isHome ? 64 : title.length > 40 ? 44 : 56, fontWeight: 700, lineHeight: 1.1, marginTop: 20, display: "flex" } },
          title,
        ),
        h("div", { style: { fontSize: 28, color: "#c9ccd3", lineHeight: 1.35, marginTop: 24, display: "flex" } }, subtitle),
      ),
      h(
        "div",
        { style: { display: "flex", alignItems: "center", fontSize: 24, color: "#9ca3af" } },
        h("div", { style: { width: 14, height: 14, borderRadius: 7, background: "#22c55e", marginRight: 12, display: "flex" } }),
        "liben.dev · remote · open to new roles",
      ),
    ),
    h(
      "div",
      { style: { position: "absolute", right: 72, top: 135, display: "flex" } },
      h("img", {
        src: PORTRAIT,
        width: 300,
        height: 300,
        style: { borderRadius: 150, border: `8px solid ${GOLD}`, objectFit: "cover" },
      }),
    ),
  );

  return new ImageResponse(card as never, {
    width: 1200,
    height: 630,
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

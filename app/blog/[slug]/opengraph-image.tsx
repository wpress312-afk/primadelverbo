import { ImageResponse } from "next/og";
import { getPostMeta } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostMeta(slug);
  const title = post?.title ?? "Prima del Verbo";
  const excerpt = post?.excerpt ?? "";
  const trimmedExcerpt = excerpt.length > 130 ? excerpt.slice(0, 130) + "…" : excerpt;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c0c0a",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#94885c",
            }}
          >
            Prima del Verbo
          </span>
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ width: 48, height: 1, backgroundColor: "#94885c" }} />
          <p
            style={{
              fontSize: title.length > 60 ? 40 : 50,
              fontWeight: 300,
              color: "#c7ba8c",
              lineHeight: 1.25,
              margin: 0,
              maxWidth: 900,
            }}
          >
            {title}
          </p>
          {trimmedExcerpt && (
            <p
              style={{
                fontSize: 22,
                color: "#a09881",
                lineHeight: 1.65,
                margin: 0,
                maxWidth: 860,
              }}
            >
              {trimmedExcerpt}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #28261f",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: 13, letterSpacing: "0.15em", color: "#605a48" }}>
            primadelverbo.it
          </span>
          <span style={{ fontSize: 13, letterSpacing: "0.12em", color: "#605a48" }}>
            Dalla separazione all'Uno
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

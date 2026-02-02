/**
 * Widget Renderer Component
 * Displays reviews in configured layout with theme
 */

interface Review {
  authorName?: string;
  authorPhoto?: string;
  rating?: number;
  text?: string;
  relativeTime?: string;
}

interface Widget {
  layout?: string;
  theme?: "light" | "dark";
  primaryColor?: string;
  showDate?: boolean;
  showRating?: boolean;
  showAttribution?: boolean;
  placeName?: string;
  placeMapsUrl?: string;
  placeAddress?: string;
}

interface WidgetRendererProps {
  widget: any;
  reviews: Review[];
  widgetId: string;
}

export function WidgetRenderer({
  widget,
  reviews,
  widgetId,
}: WidgetRendererProps) {
  const primaryColor = widget.primaryColor || "#1976d2";
  const isDark = widget.theme === "dark";
  const bg = isDark ? "#1e1e1e" : "#ffffff";
  const text = isDark ? "#ffffff" : "#333333";
  const textSecondary = isDark ? "#b0b0b0" : "#666666";
  const border = isDark ? "#333333" : "#e0e0e0";
  const layout = widget.layout || "grid";

  const Stars = ({ rating }: { rating: number }) => (
    <div style={{ display: "inline-flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: primaryColor, fontSize: "20px" }}>
          {i <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );

  return (
    <div
      data-orbix-widget-id={widgetId}
      style={{
        background: bg,
        color: text,
        padding: "0",
        borderRadius: "0",
        border: "none",
      }}
    >
      {/* Header with place name and rating */}
      <div style={{ marginBottom: "24px" }}>
        <h3
          style={{
            fontSize: "24px",
            fontWeight: 600,
            margin: 0,
            color: text,
          }}
        >
          {widget.placeName || "Customer Reviews"}
        </h3>
      </div>

      {/* Reviews container */}
      <div
        style={{
          display: layout === "carousel" ? "flex" : "grid",
          gridTemplateColumns:
            layout !== "carousel"
              ? "repeat(auto-fill, minmax(300px, 1fr))"
              : undefined,
          overflowX: layout === "carousel" ? "auto" : undefined,
          gap: "16px",
        }}
      >
        {reviews.map((review, idx) => (
          <div
            key={idx}
            style={{
              background: isDark ? "#252525" : "#f9f9f9",
              border: `1px solid ${border}`,
              borderRadius: "8px",
              padding: "16px",
              flex: layout === "carousel" ? "0 0 300px" : undefined,
            }}
          >
            {/* Author info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              {review.authorPhoto && (
                <img
                  src={review.authorPhoto}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt={review.authorName || ""}
                />
              )}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: text,
                  }}
                >
                  {review.authorName || "Anonymous"}
                </div>
                {widget.showDate && review.relativeTime && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: textSecondary,
                      marginTop: "2px",
                    }}
                  >
                    {review.relativeTime}
                  </div>
                )}
              </div>
            </div>

            {/* Rating stars */}
            {widget.showRating && (
              <div style={{ marginBottom: "12px" }}>
                <Stars rating={review.rating || 0} />
              </div>
            )}

            {/* Review text */}
            {review.text && (
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: text,
                  margin: 0,
                }}
              >
                {review.text}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Attribution footer */}
      {widget.showAttribution && (
        <div
          style={{
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: `1px solid ${border}`,
            textAlign: "center",
          }}
        >
          <a
            href={widget.placeMapsUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: textSecondary,
              textDecoration: "none",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

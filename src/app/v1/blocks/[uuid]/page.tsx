import { Suspense } from "react";
import { db } from "@/db";
import { WidgetRenderer } from "@/components/widget-renderer";

/**
 * GET /v1/widgets/[uuid]
 *
 * WIDGET PAGE - Rendered inside iframe
 *
 * Server Component that:
 * 1. Validates widget UUID exists
 * 2. Fetches widget config and data
 * 3. Validates widget is active
 * 4. Renders React widget UI
 * 5. Includes PostMessage handler for parent resize
 *
 * Runs on Node runtime (can access database directly)
 */

interface WidgetPageProps {
  params: Promise<{ uuid: string }>;
}

export async function generateMetadata({ params }: WidgetPageProps) {
  const { uuid } = await params;

  return {
    title: "Widget",
    robots: "noindex, nofollow", // Don't index widget pages
  };
}

/**
 * Fetch widget data server-side
 * This happens during SSR/SSG
 */
async function getWidgetData(uuid: string) {
  try {
    const widget = await db.query.widgets.findFirst({
      where: (widgets, { eq }) => eq(widgets.publicId, uuid),
      with: {
        user: true,
      },
    });

    if (!widget || !widget.active) {
      return null;
    }

    // Parse cached data (JSONB field contains reviews)
    const cachedData = widget.cachedData as any || {};
    const reviews = cachedData.reviews || [];
    const lastRefresh = cachedData.lastRefresh || 0;

    return {
      widget,
      reviews,
      lastRefresh,
    };
  } catch (error) {
    console.error("Failed to fetch widget data:", error);
    return null;
  }
}

export default async function WidgetPage({ params }: WidgetPageProps) {
  const { uuid } = await params;

  const data = await getWidgetData(uuid);

  if (!data) {
    return (
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#666",
        }}
      >
        <p>Widget not found or inactive</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <Suspense fallback={<div>Loading widget...</div>}>
        <WidgetRenderer
          widget={data.widget}
          reviews={data.reviews}
          widgetId={uuid}
        />
      </Suspense>

      {/* Iframe communication script using modern ResizeObserver */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const widgetId = "${uuid}";
              const container = document.querySelector('[data-orbix-widget-id]') || document.body;
              let lastHeight = 0;
              let resizeTimeout;

              // Send initial ready message
              function sendReady() {
                const height = container.scrollHeight;
                lastHeight = height;
                window.parent.postMessage({
                  type: 'widget:ready',
                  widgetId: widgetId,
                  initialHeight: height
                }, '*');
              }

              // Send resize message (debounced)
              function sendResize() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                  const height = container.scrollHeight;
                  if (height !== lastHeight) {
                    lastHeight = height;
                    window.parent.postMessage({
                      type: 'widget:resize',
                      widgetId: widgetId,
                      height: height
                    }, '*');
                  }
                }, 300);
              }

              // Use ResizeObserver if available
              if (typeof ResizeObserver !== 'undefined') {
                const observer = new ResizeObserver(sendResize);
                observer.observe(container);
              } else {
                // Fallback: MutationObserver
                const observer = new MutationObserver(sendResize);
                observer.observe(container, {
                  childList: true,
                  subtree: true,
                  characterData: true,
                  attributes: true
                });
              }

              // Send ready on DOMContentLoaded
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', sendReady);
              } else {
                sendReady();
              }
            })();
          `,
        }}
      />
    </div>
  );
}

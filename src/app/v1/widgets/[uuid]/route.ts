import { NextRequest, NextResponse } from "next/server";

/**
 * GET /v1/embed/[uuid]
 *
 * LOADER ROUTE - Simple embed script
 *
 * Returns JavaScript that:
 * 1. Creates iframe pointing to widget page
 * 2. Sets up PostMessage for iframe resizing
 *
 * Cached for 7 days
 */

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const { uuid } = await params;

    if (!uuid) {
      return new NextResponse(
        `console.error("Widget ID missing")`,
        {
          status: 400,
          headers: {
            "Content-Type": "application/javascript; charset=utf-8",
          },
        }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_WIDGET_URL || "https://orbix.software";

    const loaderScript = `
(function() {
  "use strict";

  var widgetId = "${uuid.replace('.js', '')}";
  var baseUrl = "${baseUrl}";

  try {
    var container = document.createElement("div");
    container.id = "orbix-widget-" + widgetId;
    container.setAttribute("data-orbix-widget-id", widgetId);
    container.style.cssText = "all: initial; display: block; width: 100%; max-width: 100%; min-height: 600px; border: none; border-radius: 8px;";

    var iframe = document.createElement("iframe");
    iframe.src = baseUrl + "/v1/widgets/" + widgetId;
    iframe.title = "Reviews Widget";
    iframe.setAttribute("sandbox", "allow-same-origin allow-scripts");
    iframe.style.cssText = "all: initial; display: block; border: none; width: 100%; height: 100%; min-height: 600px; border-radius: 8px;";

    if (document.currentScript && document.currentScript.parentNode) {
      document.currentScript.parentNode.insertBefore(container, document.currentScript.nextSibling);
    } else {
      document.addEventListener("DOMContentLoaded", function() {
        document.body.appendChild(container);
      });
    }

    container.appendChild(iframe);

    window.addEventListener("message", function(event) {
      if (event.origin !== baseUrl) return;
      
      var data = event.data;
      if (data.type === "widget:resize" && data.widgetId === widgetId) {
        var height = parseInt(data.height, 10);
        if (height > 0 && height < 10000) {
          iframe.style.height = height + "px";
        }
      }
    });

  } catch (e) {
    console.error("Widget Error:", e);
  }
})();
`;

    return new NextResponse(loaderScript, {
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
      },
    });
  } catch (error) {
    console.error("Loader error:", error);

    return new NextResponse(
      `console.error("Widget failed: ${error instanceof Error ? error.message : "Error"}")`,
      {
        status: 500,
        headers: {
          "Content-Type": "application/javascript; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      }
    );
  }
}

/**
 * Google Reviews Widget - Vanilla JS with Shadow DOM
 * Usage: <script src="https://cdn.product.com/widget.js?id=XYZ"></script>
 */

(function () {
  "use strict";

  // Extract widget ID from script tag
  const currentScript = document.currentScript;
  const widgetId =
    currentScript?.getAttribute("data-widget-id") ||
    new URLSearchParams(currentScript?.src.split("?")[1] || "").get("id");

  if (!widgetId) {
    console.error("Google Reviews Widget: No widget ID provided");
    return;
  }

  const API_BASE = currentScript?.getAttribute("data-api-base") || "";

  class GoogleReviewsWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.widgetData = null;
    }

    async connectedCallback() {
      try {
        await this.fetchWidgetData();
        this.render();
      } catch (error) {
        console.error("Failed to load widget:", error);
        this.renderError();
      }
    }

    async fetchWidgetData() {
      const response = await fetch(`${API_BASE}/api/widget/${widgetId}/data`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.widgetData = await response.json();
    }

    render() {
      if (!this.widgetData) return;

      const { widget, place, reviews } = this.widgetData;

      // Inject styles
      const style = document.createElement("style");
      style.textContent = this.getStyles(widget);

      // Create widget container
      const container = document.createElement("div");
      container.className = `grw-container grw-${widget.layout}`;

      // Header
      const header = this.createHeader(place);
      container.appendChild(header);

      // Reviews
      const reviewsContainer = document.createElement("div");
      reviewsContainer.className = "grw-reviews";

      reviews.forEach((review) => {
        const reviewEl = this.createReviewElement(review, widget);
        reviewsContainer.appendChild(reviewEl);
      });

      container.appendChild(reviewsContainer);

      // Attribution
      if (widget.showAttribution) {
        const attribution = this.createAttribution(place);
        container.appendChild(attribution);
      }

      // Append to shadow DOM
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(container);

      // Apply custom CSS if provided
      if (widget.customCss) {
        const customStyle = document.createElement("style");
        customStyle.textContent = widget.customCss;
        this.shadowRoot.appendChild(customStyle);
      }
    }

    createHeader(place) {
      const header = document.createElement("div");
      header.className = "grw-header";

      const title = document.createElement("h3");
      title.className = "grw-title";
      title.textContent = place.name || "Customer Reviews";

      const ratingContainer = document.createElement("div");
      ratingContainer.className = "grw-rating-summary";

      if (place.rating) {
        const stars = this.createStars(place.rating);
        const ratingText = document.createElement("span");
        ratingText.className = "grw-rating-text";
        ratingText.textContent = `${place.rating.toFixed(1)} (${
          place.userRatingsTotal || 0
        } reviews)`;

        ratingContainer.appendChild(stars);
        ratingContainer.appendChild(ratingText);
      }

      header.appendChild(title);
      header.appendChild(ratingContainer);

      return header;
    }

    createReviewElement(review, widget) {
      const reviewEl = document.createElement("div");
      reviewEl.className = "grw-review";

      // Author info
      const authorDiv = document.createElement("div");
      authorDiv.className = "grw-author";

      if (review.authorPhoto) {
        const img = document.createElement("img");
        img.src = review.authorPhoto;
        img.alt = review.authorName;
        img.className = "grw-author-photo";
        authorDiv.appendChild(img);
      }

      const authorInfo = document.createElement("div");
      authorInfo.className = "grw-author-info";

      const authorName = document.createElement("div");
      authorName.className = "grw-author-name";
      authorName.textContent = review.authorName || "Anonymous";

      authorInfo.appendChild(authorName);

      if (widget.showDate && review.relativeTime) {
        const date = document.createElement("div");
        date.className = "grw-review-date";
        date.textContent = review.relativeTime;
        authorInfo.appendChild(date);
      }

      authorDiv.appendChild(authorInfo);
      reviewEl.appendChild(authorDiv);

      // Rating
      if (widget.showRating) {
        const stars = this.createStars(review.rating);
        stars.className += " grw-review-rating";
        reviewEl.appendChild(stars);
      }

      // Review text
      if (review.text) {
        const text = document.createElement("p");
        text.className = "grw-review-text";
        text.textContent = review.text;
        reviewEl.appendChild(text);
      }

      return reviewEl;
    }

    createStars(rating) {
      const stars = document.createElement("div");
      stars.className = "grw-stars";

      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.className = "grw-star";
        star.textContent = i <= rating ? "★" : "☆";
        stars.appendChild(star);
      }

      return stars;
    }

    createAttribution(place) {
      const attribution = document.createElement("div");
      attribution.className = "grw-attribution";

      const link = document.createElement("a");
      link.href = place.googleMapsUrl || "#";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Powered by Google";

      attribution.appendChild(link);
      return attribution;
    }

    getStyles(widget) {
      const primaryColor = widget.primaryColor || "#1976d2";
      const isDark = widget.theme === "dark";
      const bg = isDark ? "#1e1e1e" : "#ffffff";
      const text = isDark ? "#ffffff" : "#333333";
      const textSecondary = isDark ? "#b0b0b0" : "#666666";
      const border = isDark ? "#333333" : "#e0e0e0";

      return `
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .grw-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background: ${bg};
          color: ${text};
          padding: 24px;
          border-radius: 8px;
          border: 1px solid ${border};
        }

        .grw-header {
          margin-bottom: 24px;
        }

        .grw-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
          color: ${text};
        }

        .grw-rating-summary {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .grw-rating-text {
          font-size: 16px;
          color: ${textSecondary};
        }

        .grw-stars {
          display: inline-flex;
          gap: 2px;
        }

        .grw-star {
          color: ${primaryColor};
          font-size: 20px;
        }

        /* Grid Layout */
        .grw-grid .grw-reviews {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        /* Carousel Layout */
        .grw-carousel .grw-reviews {
          display: flex;
          overflow-x: auto;
          gap: 16px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .grw-carousel .grw-review {
          flex: 0 0 auto;
          width: 300px;
          scroll-snap-align: start;
        }

        /* Badge Layout (compact) */
        .grw-badge .grw-reviews {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .grw-badge .grw-review {
          padding: 12px;
        }

        /* Review Card */
        .grw-review {
          background: ${isDark ? "#252525" : "#f9f9f9"};
          border: 1px solid ${border};
          border-radius: 8px;
          padding: 16px;
          transition: box-shadow 0.2s;
        }

        .grw-review:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .grw-author {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .grw-author-photo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .grw-author-info {
          flex: 1;
        }

        .grw-author-name {
          font-weight: 600;
          font-size: 14px;
          color: ${text};
        }

        .grw-review-date {
          font-size: 12px;
          color: ${textSecondary};
          margin-top: 2px;
        }

        .grw-review-rating {
          margin-bottom: 12px;
        }

        .grw-review-rating .grw-star {
          font-size: 16px;
        }

        .grw-review-text {
          font-size: 14px;
          line-height: 1.6;
          color: ${text};
        }

        .grw-attribution {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid ${border};
          text-align: center;
        }

        .grw-attribution a {
          color: ${textSecondary};
          text-decoration: none;
          font-size: 12px;
        }

        .grw-attribution a:hover {
          color: ${primaryColor};
        }

        @media (max-width: 768px) {
          .grw-container {
            padding: 16px;
          }

          .grw-grid .grw-reviews {
            grid-template-columns: 1fr;
          }

          .grw-carousel .grw-review {
            width: 280px;
          }
        }
      `;
    }

    renderError() {
      const style = document.createElement("style");
      style.textContent = `
        .grw-error {
          padding: 20px;
          background: #fff3cd;
          border: 1px solid #ffc107;
          border-radius: 4px;
          color: #856404;
          font-family: Arial, sans-serif;
        }
      `;

      const errorDiv = document.createElement("div");
      errorDiv.className = "grw-error";
      errorDiv.textContent = "Failed to load reviews widget.";

      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(errorDiv);
    }
  }

  // Register custom element
  if (!customElements.get("google-reviews-widget")) {
    customElements.define("google-reviews-widget", GoogleReviewsWidget);
  }

  // Auto-initialize on script load
  const widgetElement = document.createElement("google-reviews-widget");
  widgetElement.setAttribute("data-widget-id", widgetId);

  // Insert widget where script is placed
  if (currentScript && currentScript.parentNode) {
    currentScript.parentNode.insertBefore(widgetElement, currentScript);
  } else {
    // Fallback: insert at end of body
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        document.body.appendChild(widgetElement);
      });
    } else {
      document.body.appendChild(widgetElement);
    }
  }
})();

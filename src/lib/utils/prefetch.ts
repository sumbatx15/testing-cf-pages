type PrefetchOptions = {
  delay?: number; // Hover duration in ms before triggering prefetch
  selector?: string; // CSS selector for links to watch
};

const hasBeenPrefetched: string[] = [];

/**
 * Checks if a URL is an external link
 */
const isExternalLink = (href: string): boolean => {
  if (!href) return true;
  // Relative paths starting with /
  if (href.match(/^\//)) return false;
  // Same origin
  if (href.includes(window.location.host)) return false;
  // Protocol-relative URLs
  if (href.startsWith("//")) return true;
  // External links
  return true;
};

/**
 * Creates a prefetch hint link element and adds it to the document head
 */
const makePrefetchHint = (href: string): string => {
  const link = document.createElement("link");
  link.setAttribute("rel", "prefetch");
  link.setAttribute("href", href);
  document.head.appendChild(link);
  return href;
};

/**
 * Prefetches a URL if it hasn't been prefetched already and is an internal link
 */
const prefetchUrl = (href: string): void => {
  if (isExternalLink(href)) return;
  if (hasBeenPrefetched.includes(href)) return;

  hasBeenPrefetched.push(makePrefetchHint(href));
};

/**
 * Sets up prefetching for links based on hover behavior
 * Follows best practices: only prefetches internal links on probable click
 */
export const setupPrefetch = (options: PrefetchOptions = {}): void => {
  const { delay = 0, selector = "a" } = options;
  const links = document.querySelectorAll<HTMLAnchorElement>(selector);

  links.forEach((link) => {
    let hoverTimeout: number | null = null;
    let totalHoverTime = 0;
    let hoverStartTime = 0;

    const handleMouseEnter = () => {
      hoverStartTime = Date.now();
      
      hoverTimeout = window.setTimeout(() => {
        const href = link.getAttribute("href");
        if (href) {
          prefetchUrl(href);
        }
      }, delay);
    };

    const handleMouseLeave = () => {
      if (hoverTimeout !== null) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
      
      // Track cumulative hover time for future enhancements
      if (hoverStartTime > 0) {
        totalHoverTime += Date.now() - hoverStartTime;
        hoverStartTime = 0;
      }
    };

    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);
  });
};

/**
 * Manually prefetch a specific URL
 */
export const prefetch = (url: string): void => {
  prefetchUrl(url);
};

/**
 * Check if a URL has already been prefetched
 */
export const hasPrefetched = (url: string): boolean => {
  return hasBeenPrefetched.includes(url);
};


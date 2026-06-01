/**
 * Route-specific configuration for different ad campaign landing pages.
 * Detects the active variant (fb7 / ga7) from the URL path.
 */

const CONFIGS = {
  fb7: {
    source: 'fb7',
    razorpayUrl: 'https://pages.razorpay.com/bcr-fb7',
    webhookUrl: 'https://offbeatn8n.coachswastik.com/webhook/bcr-fp7-leads',
    thankYouPath: '/ty-fb7',
    thankYouButtonUrl: 'http://join.valarmathisrinivasan.in/fb-wap',
    trackingName: 'Breath Chakra Reset - FB7',
    sheetTab: 'Fb7 Leads',
  },
  ga7: {
    source: 'ga7',
    razorpayUrl: 'https://pages.razorpay.com/bcr-ga7',
    webhookUrl: 'https://offbeatn8n.coachswastik.com/webhook/bcr-ga7-leads',
    thankYouPath: '/ty-ga7',
    thankYouButtonUrl: 'http://join.valarmathisrinivasan.in/fb-wap',
    trackingName: 'Breath Chakra Reset - GA7',
    sheetTab: 'Ga7 Leads',
  },
};

const DEFAULT_ROUTE = 'fb7';

export function detectRoute() {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  if (/\/ga7$/.test(path) || /\/ty-ga7$/.test(path)) return 'ga7';
  if (/\/fb7$/.test(path) || /\/ty-fb7$/.test(path)) return 'fb7';
  return DEFAULT_ROUTE;
}

export function getRouteConfig(route) {
  return CONFIGS[route] || CONFIGS[DEFAULT_ROUTE];
}

export function isThankYouPage() {
  const path = window.location.pathname.replace(/\/+$/, '');
  return (
    /\/ty-(fb7|ga7)$/i.test(path) ||
    /\/thank-you$/i.test(path) ||
    /thank-you\.html$/i.test(window.location.pathname)
  );
}

export const ADSENSE_CONFIG = {
  // Replace with your actual AdSense publisher ID
  PUBLISHER_ID: 'ca-pub-XXXXXXXXXXXXXXXX',
  
  // Ad slot IDs - replace with your actual ad slot IDs from AdSense
  AD_SLOTS: {
    HEADER_BANNER: '1234567890',
    SIDEBAR_SQUARE: '1234567891',
    CONTENT_RECTANGLE: '1234567892',
    FOOTER_BANNER: '1234567893',
    HERO_BANNER: '1234567894',
    CALCULATOR_TOP: '1234567895',
    CALCULATOR_BOTTOM: '1234567896'
  },
  
  // Ad formats and their default styles
  AD_FORMATS: {
    BANNER: {
      format: 'banner' as const,
      className: 'h-24 w-full max-w-4xl',
      style: { minHeight: '90px' }
    },
    SQUARE: {
      format: 'square' as const,
      className: 'h-64 w-64',
      style: { minHeight: '250px', minWidth: '250px' }
    },
    RECTANGLE: {
      format: 'rectangle' as const,
      className: 'h-48 w-full max-w-md',
      style: { minHeight: '250px' }
    },
    AUTO: {
      format: 'auto' as const,
      className: 'w-full',
      style: { minHeight: '100px' }
    }
  },
  
  // AdSense loading options
  LOADING_OPTIONS: {
    ENABLE_LAZY_LOADING: true,
    ENABLE_RESPONSIVE_ADS: true,
    ENABLE_AUTO_ADS: false
  }
};

// Helper function to get ad slot by position
export const getAdSlot = (position: string): string => {
  const slotMap: Record<string, string> = {
    'header': ADSENSE_CONFIG.AD_SLOTS.HEADER_BANNER,
    'sidebar': ADSENSE_CONFIG.AD_SLOTS.SIDEBAR_SQUARE,
    'content': ADSENSE_CONFIG.AD_SLOTS.CONTENT_RECTANGLE,
    'footer': ADSENSE_CONFIG.AD_SLOTS.FOOTER_BANNER,
    'hero': ADSENSE_CONFIG.AD_SLOTS.HERO_BANNER,
    'calculator-top': ADSENSE_CONFIG.AD_SLOTS.CALCULATOR_TOP,
    'calculator-bottom': ADSENSE_CONFIG.AD_SLOTS.CALCULATOR_BOTTOM
  };
  
  return slotMap[position] || ADSENSE_CONFIG.AD_SLOTS.CONTENT_RECTANGLE;
};

import React from 'react';
import AdSense from './AdSense';
import { getAdSlot, ADSENSE_CONFIG } from '../config/adsense';

interface AdPlaceholderProps {
  size?: 'banner' | 'square' | 'rectangle';
  position?: string;
  showPlaceholder?: boolean; // For development/testing
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ 
  size = 'banner', 
  position = 'content',
  showPlaceholder = false
}) => {
  // For development, you can set showPlaceholder to true to see the placeholder
  if (showPlaceholder) {
    const sizeClasses = {
      banner: 'h-24 w-full max-w-4xl',
      square: 'h-64 w-64',
      rectangle: 'h-48 w-full max-w-md'
    };

    return (
      <div className={`${sizeClasses[size]} mx-auto my-6`}>
        <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-sm font-medium">AdSense Ad</div>
            <div className="text-xs opacity-75">{size} - {position}</div>
          </div>
        </div>
      </div>
    );
  }

  // Get the appropriate ad slot and format
  const adSlot = getAdSlot(position);
  const adFormat = size === 'banner' ? 'banner' : size === 'square' ? 'square' : 'rectangle';
  
  // Get the default styles and classes for the ad format
  const formatConfig = ADSENSE_CONFIG.AD_FORMATS[size.toUpperCase() as keyof typeof ADSENSE_CONFIG.AD_FORMATS] || ADSENSE_CONFIG.AD_FORMATS.BANNER;
  
  return (
    <div className={`${formatConfig.className} mx-auto my-6`}>
      <AdSense
        adSlot={adSlot}
        adFormat={adFormat}
        style={formatConfig.style}
        responsive={ADSENSE_CONFIG.LOADING_OPTIONS.ENABLE_RESPONSIVE_ADS}
      />
    </div>
  );
};

export default AdPlaceholder;
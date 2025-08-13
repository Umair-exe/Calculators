import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat: 'auto' | 'fluid' | 'banner' | 'square' | 'rectangle';
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

const AdSense: React.FC<AdSenseProps> = ({ 
  adSlot, 
  adFormat, 
  style, 
  className = '',
  responsive = true 
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if AdSense is loaded
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [adSlot]);

  const getAdFormatAttributes = () => {
    switch (adFormat) {
      case 'auto':
        return {
          'data-ad-format': 'auto',
          'data-full-width-responsive': responsive ? 'true' : 'false'
        };
      case 'fluid':
        return {
          'data-ad-format': 'fluid',
          'data-ad-layout-key': '-fb+5w+4e-db+86'
        };
      case 'banner':
        return {
          'data-ad-format': 'banner',
          'data-ad-slot': adSlot
        };
      case 'square':
        return {
          'data-ad-format': 'square',
          'data-ad-slot': adSlot
        };
      case 'rectangle':
        return {
          'data-ad-format': 'rectangle',
          'data-ad-slot': adSlot
        };
      default:
        return {
          'data-ad-slot': adSlot
        };
    }
  };

  const getDefaultStyles = () => {
    switch (adFormat) {
      case 'banner':
        return { display: 'block', textAlign: 'center' as const, overflow: 'hidden' };
      case 'square':
        return { display: 'block', textAlign: 'center' as const };
      case 'rectangle':
        return { display: 'block', textAlign: 'center' as const };
      default:
        return { display: 'block', textAlign: 'center' as const };
    }
  };

  return (
    <div 
      ref={adRef}
      className={`adsense-container ${className}`}
      style={{ ...getDefaultStyles(), ...style }}
    >
      <ins
        className="adsbygoogle"
        {...getAdFormatAttributes()}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense publisher ID
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default AdSense;

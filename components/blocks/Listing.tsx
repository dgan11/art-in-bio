import { useEffect } from 'react';

// a simple listing component
export default function Listing({networkId, listingId}) {

  // Only added to remove extraneous elements from marketplace-widget
  useEffect(() => {
    const interval = setInterval(() => {
      const selectors = [
        '.m-links',
        '.m-attributes',
        '.m-description',
        '.m-tooltip',
        '.m-wallet-identity',
        '.m-interactions.m-interactions--bids',
        '.m-layout-listing__button.m-layout-listing__button--secondary'
      ];
      let elementsFound = 0;

      selectors.forEach(selector => {
        const elementToRemove = document.querySelector(selector);
        if (elementToRemove) {
          elementToRemove.parentNode?.removeChild(elementToRemove);
          elementsFound++;
        }
      });

      if (elementsFound === selectors.length) {
        clearInterval(interval);
      }
    }, 100);
  }, []);


  return (
    <div className="w-full max-w-2xl mx-auto h-auto">
       <div
        data-widget="m-layout-complete-listing"
        data-id={listingId}
        data-network={networkId}
      ></div>
    </div>
  )
}
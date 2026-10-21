/**
 * Sri Nandi Krishi Organic Enterprise WhatsApp Helper
 */

export const BUSINESS_WHATSAPP_NUMBER = '917975305677';
export const BUSINESS_PHONE_NUMBER = '+91 79753 05677';

export const cleanPhoneNumber = (rawNumber) => {
  if (!rawNumber) return BUSINESS_WHATSAPP_NUMBER;
  let digits = rawNumber.replace(/[^0-9]/g, '');
  if (digits.length === 10) {
    digits = `91${digits}`;
  }
  return digits.length >= 10 ? digits : BUSINESS_WHATSAPP_NUMBER;
};

export const buildWhatsAppUrl = (cropName = '', customMessage = '', targetNumber = '') => {
  const number = cleanPhoneNumber(targetNumber || BUSINESS_WHATSAPP_NUMBER);
  
  let text = '';
  if (customMessage) {
    text = customMessage;
  } else if (cropName) {
    text = `Hello Sri Nandi Krishi Organic Enterprise, I would like to book a consultation for ${cropName} farming. Please share the details.`;
  } else {
    text = 'Hello Sri Nandi Krishi Organic Enterprise, I would like to book an agricultural consultation for my farm. Please guide me.';
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

/**
 * Directly redirects the user to WhatsApp in a new tab
 */
export const openWhatsApp = (cropName = '', customMessage = '', targetNumber = '') => {
  const url = buildWhatsAppUrl(cropName, customMessage, targetNumber);
  window.open(url, '_blank', 'noopener,noreferrer');
  return true;
};

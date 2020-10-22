import sanitizeHTMLWithoutDOM from 'sanitize-html';
import {capitalize, camelCase, isString, startCase} from 'lodash';
import AutoLinker from 'autolinker';
import {plural} from 'pluralize';

import 'intl';
import 'intl/locale-data/jsonp/en';

export const ALLOWED_RICH_TEXT_TAGS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'ul',
  'ol',
  'li',
  'strong',
  'b',
  'br',
  'em',
  'u',
  's',
  'blockquote',
  'a',
  'img',
  'span',
  'div',
];

export function getInitials(name) {
  let initials = '';
  const words = name.trim().split(' ');
  if (words) {
    initials = words[0].charAt();
  }
  if (words.length > 1) {
    initials += words[words.length - 1].charAt();
  }
  initials = initials.toUpperCase();
  return initials;
}

export function getMaxValueWithPlus(number, maxValue) {
  return number > maxValue ? `+${maxValue}` : number;
}

export function getFirstName(name) {
  return name.trim().split(' ')[0];
}

export function getLastName(name) {
  return name.trim().split(' ').slice(1).join(' ');
}

export function isHebrewOrArabic(text) {
  return /[\u0590-\u06FF]/.test(text);
}

export function trimEndString(value, trimStringValue) {
  if (isString(value) && value.endsWith(trimStringValue)) {
    return value.slice(0, -trimStringValue.length);
  }

  return value;
}

// forcing rtl text to behave like ltr
// https://stackoverflow.com/questions/32710566/how-to-fix-this-right-to-left-script-issue-in-js-string
export function possesify(fullname) {
  let result = '';
  const parts = fullname.trim().split(' ');
  if (parts) {
    if (isHebrewOrArabic(parts[0])) {
      result = `\u202A${parts[0]}'s`;
    } else {
      result = `${parts[0]}'s`;
    }
  }

  return result;
}

export const noHTMLtags = (s) =>
  (s || '').replace(/<\/?[^>]+(>|$)/g, '').trim();

export function isRTL(s) {
  if (!s || !isString(s)) {
    return false;
  }
  const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
  const rtlDirCheck = new RegExp(`^[${rtlChars}]+`);

  const noEmojis = s.replace(/[^\u1F600-\u1F6FF\s]/g, '');
  const textWithoutHtml = noHTMLtags(noEmojis).replace(/\d+/g, '').trim();
  return rtlDirCheck.test(textWithoutHtml);
}

export function snakeToCamel(s) {
  return s.replace(/(_\w)/g, (k) => k[1].toUpperCase());
}

export const LINK_PREVIEW_ELIPSIS_LENGTH = 3;
export const MAX_CHARS_FOR_LINK_PREVIEW = 40;
export function enrichTextWithLinks(text, options = {}) {
  return AutoLinker.link(text, {
    truncate: {length: MAX_CHARS_FOR_LINK_PREVIEW, location: 'end'},
    ...options,
  });
}

export function toCurrency(number, currency, maxfractionDigitsCount) {
  let numberToCurrency = number;

  if (typeof number === 'string') {
    numberToCurrency = Number(number.replace(/,/g, ''));
  } else if (typeof number !== 'number') {
    return 0;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: maxfractionDigitsCount || 0,
    minimumFractionDigits: 0,
  }).format(numberToCurrency);
}

/**
 * Usage: encode '<' char when it used not as HTML opening tag but as 'greater than' sign, thus the HTML parser won't recognise it as opening tag
 */
export function findAndEncodeUnclosedHtmlTags(text) {
  const regex = /(<[^/][\w\s?="/.':;#-/?]?[^>])|(<[^/]?[^>]?)$/g;
  let partialText;
  let encodedPartialText;
  let result = text;
  let m = regex.exec(text);
  while (m !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex += 1;
    }
    partialText = text.substr(m.index, m[0].length);
    encodedPartialText = partialText.replace(/</, '&#60;');
    result = result.replace(partialText, encodedPartialText);
    m = regex.exec(text);
  }
  return result;
}

export function addSpaceOnCapitalsAndCapitalize(text = '') {
  return (text.charAt(0).toUpperCase() + text.slice(1))
    .replace(/(\w)([A-Z])/g, '$1 $2')
    .trim();
}

export function toLowerStartCase(text = '') {
  return startCase(text.toLowerCase());
}

export function shortenLongWords(sentence) {
  const CHUNK_MAX_SIZE = 8;
  const splitted = sentence.split(' ');
  return splitted
    .map((chunk) =>
      chunk.length > CHUNK_MAX_SIZE
        ? `${chunk.substr(0, CHUNK_MAX_SIZE)}..`
        : chunk,
    )
    .join(' ');
}

export function joinArrayToString(text) {
  if (Array.isArray(text)) {
    return text.join(',');
  }

  return text;
}

export function prefixWebsite(url) {
  if (!url || !url.length) return '';
  if (url.startsWith('http')) {
    return url;
  } else {
    return `http://${url}`;
  }
}

export function isObjectID(str) {
  return typeof str === 'string' && !!str.match(/^[0-9a-f]{24}$/);
}

export function transparentize(hex, opacity) {
  return `${hex}${opacity}`;
}

export function isOnlyEmoji(str) {
  if (!str || !str.trim()) {
    return false;
  }
  const noEmojis = str.replace(/[^\u1F600-\u1F6FF\s]/g, '');
  return !noEmojis;
}

export const getQueriesFromUrl = (url) => {
  const query = url.split(/[?|#]/)[1];
  return getQueryStringParams(query);
};

export const getQueryStringParams = (query) =>
  query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
          const [key, value] = param.split('=');
          const decodedValue = value
            ? decodeURIComponent(value.replace(/\+/g, ' '))
            : '';
          return {...params, [key]: decodedValue};
        }, {})
    : {};

export const numberWithCommas = (x) =>
  (x || '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function sanitizeText({
  text,
  allowedTags = [],
  allowedAttributes = {},
}: {
  text: string,
  allowedTags: any[],
  allowedAttributes: any,
}) {
  return sanitizeHTMLWithoutDOM(text, {allowedTags, allowedAttributes});
}

export const quillMentionsConvertor = (
  text: string,
  isFullMention: boolean,
): string => {
  const regex = new RegExp(
    /<span class="[^"]*" data-index="[^"]*" data-denotation-char="[^"]*" data-id="([^"]*)" data-value="([^"]*)" data-entity-type="([^"]*)">\ufeff?<span[^>]*><span[^>]*>@<\/span>[^<]*<\/span>\ufeff?<\/span>/im, // eslint-disable-line max-len
  );
  let convertedText = text;
  let isTextNotModified = false;
  while (!isTextNotModified) {
    const replacementText = `@$3:$1${isFullMention ? ':$2' : ''}`;
    const singleConvertedText = convertedText.replace(regex, replacementText);
    if (singleConvertedText === convertedText) {
      isTextNotModified = true;
    } else {
      convertedText = singleConvertedText;
    }
  }
  return convertedText;
};

export const getTrimmedTextWithMentionEntities = (
  text: string,
  isFullMention: boolean,
): string => quillMentionsConvertor(text, isFullMention).trim();

export const sanitizeRichText = ({
  text,
  shouldStripRichtext = true,
}: {
  text: string,
  shouldStripRichtext?: boolean,
}): string => {
  const allowedTags = shouldStripRichtext ? [] : ALLOWED_RICH_TEXT_TAGS;
  const textWithMentions = getTrimmedTextWithMentionEntities(text);

  const sanitizedText = sanitizeText({
    text: shouldStripRichtext
      ? textWithMentions.replace(/(<\/p>|<\/?br\/?>)/g, '\r\n')
      : textWithMentions,
    allowedTags,
    allowedAttributes: {
      a: ['href', 'target', 'class'],
      img: ['src'],
      span: ['data-id', 'data-entity-type', 'data-value'],
      div: ['class'],
    },
  });
  return sanitizedText.trim();
};

export {capitalize, camelCase};

export const capitalizeFirstLetter = (text) =>
  `${text[0].toUpperCase()}${text.substr(1)}`;

export const substringWithEmoji = (string, start, end) =>
  Array.from(string).slice(start, end).join('');

export {plural};

export const stringToColor = (str = '') => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash =
      str.charCodeAt(i) +
      ((hash << 5) - hash); /* eslint-disable-line no-bitwise */
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff; /* eslint-disable-line no-bitwise */
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
};

export const increaseQuality = ({thumbnail = '', width, height}) =>
  thumbnail.replace(/w_\d+/, `w_${width}`).replace(/h_\d+/, `h_${height}`);

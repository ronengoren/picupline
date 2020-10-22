import moment from 'moment';
import 'moment-timezone';
import I18n from 'i18n-js';

export const TWENTY_FOUR_HOUR_FORMAT = 'HH:mm';
export const TWELVE_HOUR_FORMAT = 'h:mmA';

moment.updateLocale('en', {relativeTime: I18n.t('moment.relativeTime')});

export const updateMomentLocale = () => {
  moment.updateLocale('en', {relativeTime: I18n.t('moment.relativeTime')});
};

export const getFormattedDateAndTime = (dateAndTime, formatter) =>
  dateAndTime ? moment(dateAndTime).format(formatter) : '';

export const convert12FormatTo24Format = (time = '') =>
  moment(time, TWELVE_HOUR_FORMAT).format(TWENTY_FOUR_HOUR_FORMAT);

export const getHoursFromNow = (time) =>
  time ? moment(time).startOf('minute').fromNow(true) : '';

export const getTimeFromNow = (time) =>
  time ? moment(time).fromNow(true) : '';

export const getYearsAgo = (time, locale) => {
  if (time) {
    locale &&
      moment.updateLocale(locale, {
        relativeTime: I18n.t('moment.relativeTime', {locale}),
      });
    return moment(time).startOf('month').fromNow(true);
  }
  return '';
};

export const getAge = (time) =>
  time ? `${moment().diff(time, 'year')} ${I18n.t('moment.years_old')}` : '';

export const getDaysDifference = (startDate, endDate) =>
  moment(endDate).diff(moment(startDate), 'days');

export const fromLocaleTimeString = (timeString) => {
  const date = new Date();
  const timeReg = /(\d+):(\d+)(\w+)/;
  const parts = timeString.match(timeReg);
  const hours = /AM/i.test(parts[3])
    ? ((am) => (am < 12 ? am : 0))(parseInt(parts[1], 10))
    : ((pm) => (pm < 12 ? pm + 12 : 12))(parseInt(parts[1], 10));

  const minutes = parseInt(parts[2], 10);

  date.setHours(hours);
  date.setMinutes(minutes);

  return date;
};

export const ageValidation = (age, currentDate, minimalAge) => {
  const agePlusMinimalAge = moment(age).add(minimalAge, 'years');
  return moment(agePlusMinimalAge).isSameOrBefore(currentDate);
};

export const getLocaleTimeForFeed = (time) => moment(time).fromNow();

export const translateDate = (date) =>
  date ? moment(date).format('MMMM DD, YYYY') : '';

export const translateDateTimeAMPM = (datetime) =>
  datetime ? moment(datetime).format('MMMM DD, YYYY h:mmA') : '';

export const translateTimeAMPM = (time) =>
  time ? moment(time).format('h:mmA') : '';

export const getDayAndMonth = (date) =>
  date ? moment(date).format('MMM Do') : '';

export const getISOStringDateOnly = (date) =>
  date ? moment.utc(date).format('YYYY-MM-DD') : ''; // ISO 8601

export const formatVideoTime = (time) => {
  let minutes = Math.floor(time / 60);
  minutes = minutes >= 0 ? minutes : 0;
  let seconds = time % 60;
  seconds = seconds >= 0 ? Math.abs(seconds).toFixed(0) : 0;
  return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
};

export const getTimeOrDateIfNotToday = (time) => {
  if (time) {
    const now = moment();
    if (moment(time).isBefore(now, 'day')) {
      return moment(time).format('MMM DD, h:mm A');
    } else {
      return moment(time).format('h:mm A');
    }
  } else {
    return '';
  }
};

export const getBirthdateMinMax = () => {
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 120);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 4);

  return {minDate, maxDate};
};

export const isDateToday = (time) =>
  time && moment(time).isSame(moment(), 'day');

export const getGreetingTime = () => {
  const now = moment();
  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening
  const splitMorning = 5; // 24hr time to split the morning
  const currentHour = parseFloat(now.format('HH'));

  if (currentHour >= splitAfternoon && currentHour < splitEvening) {
    // Between 12 PM and 5PM
    return 'afternoon';
  } else if (currentHour >= splitEvening || currentHour < splitMorning) {
    // Between 5PM and 5AM
    return 'evening';
  }
  // Between dawn and noon
  return 'morning';
};

export const getTimezoneSignature = () =>
  moment.tz.zone(moment.tz.guess()).abbr(Date.now());

export const getUTCOffset = () => {
  const offset = moment().utcOffset();
  const minutesOffset = offset % 60;
  const hoursOffset = Math.ceil(offset - minutesOffset) / 60;
  const sign = Math.sign(offset);
  let offsetFormatted = `${hoursOffset}`;
  if (minutesOffset > 0) {
    offsetFormatted += `:${minutesOffset}`;
  }

  if (sign >= 0) {
    return `+${offsetFormatted}`;
  }

  return offsetFormatted;
};

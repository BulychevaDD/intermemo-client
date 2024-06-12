import moment from 'moment/moment';

export const convertDateTimeToDate = (rawDateTime: string): string =>
  moment(rawDateTime, 'YYYY-MM-DD hh:mm:ss').format('DD.MM.YYYY');

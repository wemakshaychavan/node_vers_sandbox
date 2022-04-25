const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_WEEK = 7;
const MONTHS_PER_YEAR = 12;

const SECOND = MILLISECONDS_PER_SECOND;
const MINUTE = SECOND * SECONDS_PER_MINUTE;
const HOUR = MINUTE * MINUTES_PER_HOUR;
const DAY = HOUR * HOURS_PER_DAY;
const WEEK = DAY * DAYS_PER_WEEK;
const YEAR = DAY * 365.24;
const NORMAL_YEAR = DAY * 365;
const LEAP_YEAR = DAY * 366;
const DECADE = 10 * YEAR;
const HALF_YEAR = YEAR / 2;
const AVERAGE_MONTH = YEAR / 12;

module.exports = {
	// Date range
	RANGE_TODAY: 'TODAY',
	RANGE_THIS_WEEK: 'THIS_WEEK',
	RANGE_THIS_MONTH: 'THIS_MONTH',
	RANGE_THIS_QUARTER: 'THIS_QUARTER',
	RANGE_THIS_YEAR: 'THIS_YEAR',
	RANGE_YESTERDAY: 'YESTERDAY',
	RANGE_LAST_WEEK: 'LAST_WEEK',
	RANGE_LAST_MONTH: 'LAST_MONTH',
	RANGE_LAST_QUARTER: 'LAST_QUARTER',
	RANGE_LAST_YEAR: 'LAST_YEAR',
	RANGE_TOTAL: 'TOTAL',
	RANGE_PAGE_SIZE: 20,

	DATE_FORMATS: {
		SERVER_DATE_FORMAT: 'YYYY-MM-DD',
		SERVER_DATE_TIME_FORMAT: 'YYYY-MM-DD hh:mm A',
	},

	TIME_INTERVALS_IN_MILLISECONDS: {
		SECOND: SECOND,
		MINUTE: MINUTE,
		HOUR: HOUR,
		DAY: DAY,
		WEEK: WEEK,
		YEAR: YEAR,
		NORMAL_YEAR: NORMAL_YEAR,
		LEAP_YEAR: LEAP_YEAR,
		DECADE: DECADE,
		HALF_YEAR: HALF_YEAR,
		AVERAGE_MONTH: AVERAGE_MONTH,
		MILLISECONDS_PER_SECOND: MILLISECONDS_PER_SECOND,
		SECONDS_PER_MINUTE: SECONDS_PER_MINUTE,
		MINUTES_PER_HOUR: MINUTES_PER_HOUR,
		HOURS_PER_DAY: HOURS_PER_DAY,
		DAYS_PER_WEEK: DAYS_PER_WEEK,
		MONTHS_PER_YEAR: MONTHS_PER_YEAR,
	},
};
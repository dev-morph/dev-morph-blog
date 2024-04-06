import dayjs from 'dayjs';

export function getFormatedDate({
	date,
	format,
}: {
	date: dayjs.ConfigType | dayjs.Dayjs;
	format: string;
}) {
	return dayjs(date).format(format);
}

export function getCommentFormatedDate(date: dayjs.ConfigType) {
	const thisYear = dayjs().year();
	const targetDate = dayjs(date);

	const thisYearFormat = 'MM.DD HH:mm:ss';
	const previousYearFormat = 'YYYY.MM.DD HH:mm:ss';

	if (targetDate.year() === thisYear) {
		return getFormatedDate({ date: date, format: thisYearFormat });
	} else {
		return getFormatedDate({ date: date, format: previousYearFormat });
	}
}

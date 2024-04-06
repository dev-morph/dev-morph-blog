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

	const thisYearFormat = 'MM월 DD일 HH:mm:ss';
	const previousYearFormat = 'YYYY년 MM월 DD일 HH:mm';

	if (targetDate.year() === thisYear) {
		return getFormatedDate({ date: date, format: thisYearFormat });
	} else {
		return getFormatedDate({ date: date, format: previousYearFormat });
	}
}

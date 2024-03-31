import dayjs from 'dayjs';

export function getFormatedDate({
	date,
	format,
}: {
	date: dayjs.ConfigType;
	format: string;
}) {
	return dayjs(date).format(format);
}

import { toast, ToastOptions, TypeOptions } from 'react-toastify';

type ShowToastType = {
	message: string;
	type: TypeOptions;
	duration?: number;
};

export default function showToast({ message, type, duration }: ShowToastType) {
	const toastDefaultOptions: ToastOptions<unknown> = {
		position: 'bottom-right',
		autoClose: duration ? duration : 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false,
		progress: undefined,
		theme: 'dark',
	};
	if (type === 'success') {
		toast.success(message, {
			...toastDefaultOptions,
		});
	} else if (type === 'error') {
		toast.error(message, {
			...toastDefaultOptions,
		});
	} else if (type === 'default') {
		toast(message, {
			...toastDefaultOptions,
		});
	} else if (type === 'info') {
		toast.info(message, {
			...toastDefaultOptions,
		});
	} else {
		toast.warn(message, {
			...toastDefaultOptions,
		});
	}
}

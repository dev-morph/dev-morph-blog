'use client';

import { useRef, FormEvent, useState, useEffect } from 'react';
import classes from './contact-form.module.css';
import { z } from 'zod';
import useFrom from '@/custom-hooks/useForm';
import Notification from '../ui/notification';

export default function ContactForm() {
	// const [state, formAction] = useFormState(sendMessage, initialState);
	const [reqStatus, setReqStatus] = useState(''); //'pending', 'erorr', 'success'
	const [reqErrorMsg, setReqErrorMsg] = useState('');
	const schema = z.object({
		email: z.string().email({ message: 'email 형식에 맞지 않습니다.' }),
		name: z.string().min(1, { message: '필수 입력 항목입니다.' }),
		message: z.string().min(1, { message: '필수 입력 항목입니다.' }),
	});
	const formRef = useRef<HTMLFormElement>(null);
	const { valid, formData } = useFrom(formRef, schema);

	useEffect(() => {
		if (reqStatus === 'error' || reqStatus === 'success') {
			const timer = setTimeout(() => {
				setReqStatus('');
				setReqErrorMsg('');
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [reqStatus]);

	async function submitHandler(e: FormEvent) {
		e.preventDefault();

		if (!valid) return;
		// const target = e.currentTarget as HTMLFormElement;
		// const formData = new FormData(target);
		setReqStatus('pending');

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || 'Something went wrong.');
			}
			formRef.current?.reset();
			console.log('response  is ', data);
			setReqStatus('success');
		} catch (error) {
			setReqErrorMsg(error.message);
			setReqStatus('error');
		}
	}

	let notification;
	if (reqStatus === 'pending') {
		notification = {
			status: reqStatus,
			title: 'Sending message...',
			message: 'your message is on the way',
		};
	} else if (reqStatus === 'error') {
		notification = {
			status: reqStatus,
			title: 'Failed To Send Message',
			message: 'Failed To Send Message. Please Try again later.',
		};
	} else if (reqStatus === 'success') {
		notification = {
			status: reqStatus,
			title: 'Success To Send Message',
			message: reqErrorMsg,
		};
	}

	return (
		<>
			<section className={classes.contact}>
				<h1>Contact Me!</h1>
				<form
					className={classes.form}
					onSubmit={submitHandler}
					ref={formRef}
					noValidate
				>
					<div className={classes.controls}>
						<div className={classes.control}>
							<label htmlFor="email" className="required">
								Your Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								autoComplete="off"
								required
							/>
						</div>
						<div className={classes.control}>
							<label htmlFor="name" className="required">
								Your Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								autoComplete="off"
							/>
						</div>
					</div>

					<div className={classes.control}>
						<label htmlFor="message"></label>
						<textarea
							id="message"
							name="message"
							rows={5}
							autoComplete="off"
						></textarea>
					</div>

					<div className={classes.actions}>
						<button type="submit">Send Message</button>
					</div>
				</form>
				{notification && (
					<Notification
						status={notification.status}
						title={notification.title}
						message={notification.message}
					/>
				)}
			</section>
		</>
	);
}

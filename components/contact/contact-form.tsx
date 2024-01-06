'use client';

import { useRef, useEffect, FormEvent } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { sendMessage } from './actions';
import classes from './contact-form.module.css';
import { FormValidationType } from '@/types/form_types';
import { CommonCode } from '@/constants/common_code';
import { z } from 'zod';
import useFrom from '@/custom-hooks/useForm';

const initialState: FormValidationType = {
	message: null,
	element: null,
};

function SubmitButton({ children }: { children: React.ReactNode }) {
	const { pending } = useFormStatus();

	return (
		<button type="submit" aria-disabled={pending}>
			{children}
		</button>
	);
}

export default function ContactForm() {
	// const [state, formAction] = useFormState(sendMessage, initialState);
	const schema = z.object({
		email: z.string().email({ message: 'email 형식에 맞지 않습니다.' }),
		name: z.string().min(1, { message: '필수 입력 값 입니다.' }),
		message: z.string().min(1),
	});
	const formRef = useRef<HTMLFormElement>(null);
	const formValid = useFrom(formRef, schema);

	function submitHandler(e: FormEvent) {
		e.preventDefault();
		const target = e.target as HTMLFormElement;
		const inputElements = target.querySelectorAll('input');
		const formData = new FormData(target);
		if (!formValid) return;
		console.log('submitted!', formValid);
	}

	return (
		<section className={classes.contact}>
			<h1>HOW CAN I HELP YOU?</h1>
			<form
				className={classes.form}
				onSubmit={submitHandler}
				// action={formAction}
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
					<SubmitButton>Send Message</SubmitButton>
				</div>
			</form>
		</section>
	);
}

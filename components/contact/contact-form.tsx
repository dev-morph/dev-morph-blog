'use client';

import { revalidatePath } from 'next/cache';
import { useFormState, useFormStatus } from 'react-dom';
import { sendMessage } from './actions';
import classes from './contact-form.module.css';

const initialState = {
	message: '',
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
	const [state, formAction] = useFormState(sendMessage, initialState);

	return (
		<section className={classes.contact}>
			{state.message}
			<h1>HOW CAN I HELP YOU?</h1>
			<form className={classes.form} action={formAction}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor="email">Your Email</label>
						<input type="email" id="email" name="email" />
					</div>
					<div className={classes.control}>
						<label htmlFor="name">Your Name</label>
						<input type="text" id="name" name="name" />
					</div>
				</div>

				<div className={classes.control}>
					<label htmlFor="message"></label>
					<textarea id="message" rows={5} name="message"></textarea>
				</div>

				<div className={classes.actions}>
					<SubmitButton>Send Message</SubmitButton>
				</div>
			</form>
		</section>
	);
}

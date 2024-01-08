import ContactForm from '@/components/contact/contact-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact Page',
	description:
		'Open to Frontend Devloper Job opportunities. Please Contact Me.',
};

export default function ContactPage() {
	return <ContactForm />;
}

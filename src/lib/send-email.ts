import { Resend } from 'resend';

export const sendEmail = async (to: string, subject: string, html: string) => {
	console.log('sendEmail called with:', { to, subject });
	console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
	console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length);

	if (!process.env.RESEND_API_KEY) {
		console.error('RESEND_API_KEY is not defined');
		throw new Error('Ошибка конфигурации email сервиса');
	}

	if (!to || !subject || !html) {
		console.error('Missing required email parameters:', { to, subject, html });
		throw new Error('Неверные параметры для отправки email');
	}

	const resend = new Resend(process.env.RESEND_API_KEY);

	try {
		console.log('Sending email to:', to);
		const data = await resend.emails.send({
			from: 'onboarding@resend.dev',
			to,
			subject,
			html,
		});

		console.log('Email sent successfully:', data);
		return data;
	} catch (error) {
		console.error('Error sending email:', error);
		if (error instanceof Error) {
			console.error('Error details:', error.message);
			console.error('Error stack:', error.stack);
		}
		throw new Error('Ошибка при отправке email');
	}
};

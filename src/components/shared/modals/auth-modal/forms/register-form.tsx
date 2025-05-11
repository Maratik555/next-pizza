'use client';

import { Button } from '@/components/ui/button';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFormRegisterData, formRegisterSchema } from './schemas';
import toast from 'react-hot-toast';
import { FormInput } from '@/components/shared/form';
import { registerUser } from '@/app/actions';

interface Props {
	onClose?: VoidFunction;
	onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
	const form = useForm<TFormRegisterData>({
		// Убери resolver для тестирования
		// resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: TFormRegisterData) => {
		// try {
			console.log('registerUser called with:', data);

			// Проверка на наличие данных
			if (!data || typeof data !== 'object') {
				console.error('Invalid data:', data);
				return toast.error('Ошибка с данными регистрации', {
					icon: '❌',
				});
			}

			onClose?.();
		const user = await registerUser({
			email: data.email,
			fullName: data.fullName,
			password: data.password,
		});

		console.log('User found:', user);
		toast.success('Регистрация успешна 📝. Подтвердите свою почту.', {
			icon: '✅',
		});
		}
			// catch (error) {
		// 	console.error('Error [REGISTER_FORM]:', error instanceof Error ? error.message : error);
		// 	return toast.error('Неверный E-Mail или пароль', {
		// 		icon: '❌',
		// 	});
		//  }
	// };

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-5'
				onSubmit={form.handleSubmit(onSubmit)}>
				<FormInput
					name='email'
					label='E-Mail'
					required
				/>
				<FormInput
					name='fullName'
					label='Полное имя'
					required
				/>
				<FormInput
					name='password'
					label='Пароль'
					type='password'
					required
				/>
				<FormInput
					name='confirmPassword'
					label='Подтвердите пароль'
					type='password'
					required
				/>

				<Button
					disabled={form.formState.isSubmitting}
					className='h-12 text-base'
					type='submit'>
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	);
};

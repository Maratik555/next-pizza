import axios from 'axios';
import toast from 'react-hot-toast';

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Добавляем интерсептор для обработки ошибок
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Логируем ошибку
        console.error('API request error:', error);
        
        // Получаем сообщение ошибки
        const errorMessage = error.response?.data?.message || 
                            error.message || 
                            'Произошла ошибка при запросе к серверу';
        
        // Показываем ошибку пользователю через toast
        toast.error(errorMessage);
        
        // Отклоняем промис с ошибкой для дальнейшей обработки в catch блоках
        return Promise.reject(error);
    }
);
<div align="center">

# 🍕 Next Pizza

**Современный интернет-магазин пиццерии на Next.js 15 + React 19**

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2d3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📸 Превью

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/home.png" alt="Главная" /></td>
    <td width="50%"><img src="docs/screenshots/categories.png" alt="Категории" /></td>
  </tr>
  <tr>
    <td colspan="2"><img src="docs/screenshots/product.png" alt="Карточка продукта" /></td>
  </tr>
</table>

---

## ✨ Возможности

- 🍕 **Каталог товаров** — пиццы, комбо, закуски, коктейли, напитки, кофе
- 🛒 **Корзина** на Zustand с синхронизацией на сервере
- 🎨 **Конструктор пиццы** — выбор размера, типа теста, ингредиентов
- 🔍 **Поиск** товаров с автоподсказками
- 📦 **Stories** для акций (`react-insta-stories`)
- 🔐 **Авторизация** через NextAuth (email/password + OAuth)
- 💳 **Оплата через ЮKassa** (YooKassa)
- 📧 **Email‑уведомления** через Resend
- 🗺️ **Подсказки адресов** через DaData
- 📤 **Загрузка файлов** через UploadThing
- 📱 **Адаптивная вёрстка** (Tailwind + Radix UI)
- ✅ **Валидация форм** на React Hook Form + Zod

---

## 🛠️ Стек

| Слой         | Технологии                                        |
|--------------|---------------------------------------------------|
| Фронтенд     | Next.js 15 (App Router), React 19, TypeScript     |
| Стили        | Tailwind CSS, Radix UI, lucide-react              |
| Состояние    | Zustand                                           |
| Формы        | React Hook Form, Zod                              |
| Бэкенд       | Next.js Route Handlers, Prisma 6                  |
| База данных  | PostgreSQL                                        |
| Auth         | NextAuth.js + Prisma Adapter                      |
| Платежи      | ЮKassa (YooKassa)                                 |
| Email        | Resend                                            |
| Загрузки     | UploadThing                                       |

---

## 🚀 Быстрый старт

```bash
git clone https://github.com/Maratik555/next-pizza.git
cd next-pizza
npm install
cp .env.example .env
npm run prisma:push
npm run prisma:seed
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

---

## 🔑 Переменные окружения (`.env`)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/next_pizza"
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# OAuth
GITHUB_ID=""
GITHUB_SECRET=""
GOOGLE_ID=""
GOOGLE_SECRET=""

# ЮKassa
YOOKASSA_STORE_ID=""
YOOKASSA_API_KEY=""

# Resend
RESEND_API_KEY=""

# UploadThing
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
```

---

## 📜 Скрипты

| Команда                  | Описание                              |
|--------------------------|---------------------------------------|
| `npm run dev`            | Запуск dev‑сервера                    |
| `npm run build`          | Production‑сборка                     |
| `npm run start`          | Запуск production‑сборки              |
| `npm run lint`           | ESLint                                |
| `npm run prisma:push`    | Применить схему к БД                  |
| `npm run prisma:studio`  | Открыть Prisma Studio                 |
| `npm run prisma:seed`    | Заполнить БД тестовыми данными        |

---

<div align="center">
Made with 🍕 by <a href="https://github.com/Maratik555">Marat</a>
</div>

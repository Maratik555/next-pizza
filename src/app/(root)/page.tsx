import { Container } from '@/components/shared/container';
import { Filters } from '@/components/shared/filters';

import { Pagination } from '@/components/shared/pagination';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { Stories } from '@/components/shared/stories';
import { Title } from '@/components/shared/title';
import { TopBar } from '@/components/shared/top-bar';
import { GetSearchParams, findPizzas } from '@/lib/find-pizzas';
import { CategoryProducts, ProductWithRelations } from '../../../@types/prisma';

// Вспомогательная функция для безопасного получения значения
async function safelyResolveParams(params: GetSearchParams): Promise<Record<string, string>> {
	const resolved: Record<string, string> = {};

	// Список ключей, которые мы ожидаем в searchParams
	const keys = ['ingredients', 'pizzaTypes', 'sizes', 'priceFrom', 'priceTo', 'limit', 'page'];

	// Резолвим каждый параметр
	for (const key of keys) {
		try {
			const paramKey = key as keyof GetSearchParams;
			const value = params[paramKey];

			if (value !== undefined) {
				const resolvedValue = value instanceof Promise ? await value : value;
				if (resolvedValue !== undefined) {
					resolved[key] = resolvedValue;
				}
			}
		} catch (error) {
			console.error(`Ошибка при обработке параметра ${key}:`, error);
		}
	}

	return resolved;
}

export default async function HomePage({
	searchParams,
}: {
	searchParams: Promise<GetSearchParams>;
}) {
	// Предварительно обрабатываем searchParams для клиентских компонентов
	const resolvedParams = await safelyResolveParams(await searchParams);

	// Передаем оригинальный searchParams в findPizzas
	const { data: categoryProducts, meta } = await findPizzas(await searchParams);

	return (
		<>
			<Container className='mt-5'>
				<Title
					text='Все пиццы'
					size='lg'
					className='font-extrabold'
				/>
			</Container>

			<TopBar
				categories={categoryProducts.filter((c: CategoryProducts) => c.products.length > 0)}
			/>

			<Stories />

			<Container className='pb-14 mt-10'>
				<div className='flex gap-[70px]'>
					<div className='w-[250px]'>
						<Filters initialParams={resolvedParams} />
					</div>
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categoryProducts.map(
								(category: CategoryProducts) =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											items={category.products as ProductWithRelations[]}
											categoryId={category.id}
										/>
									),
							)}
						</div>

						<div className='flex items-center gap-6 mt-12'>
							<Pagination
								pageCount={meta.pageCount}
								currentPage={meta.page}
							/>
							<span className='text-sm text-gray-400'>5 из 65</span>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}

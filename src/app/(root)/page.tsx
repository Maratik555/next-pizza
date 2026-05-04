import { Container } from '@/components/shared/container';
import { Filters } from '@/components/shared/filters';
import { FiltersDrawer } from '@/components/shared/filters-drawer';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { Stories } from '@/components/shared/stories';
import { TopBar } from '@/components/shared/top-bar';
import { GetSearchParams, findPizzas } from '@/lib/find-pizzas';
import { CategoryProducts, ProductWithRelations } from '../../../@types/prisma';

// Вспомогательная функция для безопасного получения значения
async function safelyResolveParams(params: GetSearchParams): Promise<Record<string, string>> {
	const resolved: Record<string, string> = {};

	// Список ключей, которые мы ожидаем в searchParams
	const keys = ['ingredients', 'pizzaTypes', 'sizes', 'priceFrom', 'priceTo', 'limit', 'page', 'sortBy'];

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
	const { data: categoryProducts } = await findPizzas(await searchParams);

	return (
		<>
			<TopBar
				categories={categoryProducts.filter((c: CategoryProducts) => c.products.length > 0)}
			/>

			<Stories />

			<Container className='pb-14 mt-5'>
				<div className='mb-5 lg:hidden flex justify-center'>
					<FiltersDrawer initialParams={resolvedParams} />
				</div>
				<div className='flex gap-5 lg:gap-10'>
					<div className='hidden lg:block w-[250px] shrink-0'>
						<Filters initialParams={resolvedParams} />
					</div>
					<div className='flex-1 lg:pl-4'>
						<div className='flex flex-col gap-10'>
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

						<div className='flex items-center justify-center w-full mt-10 pb-4'>
							<div className='flex items-center gap-1'>
								<button disabled className='w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-300 cursor-not-allowed'>
									‹
								</button>
								<button className='w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm'>
									1
								</button>
								<button disabled className='w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-300 cursor-not-allowed'>
									›
								</button>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}

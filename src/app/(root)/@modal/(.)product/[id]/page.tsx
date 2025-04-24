import { ChooseProductModal } from '@/components/shared/modals/choose-product-modal';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function PhotoModal({ params }: { params: { id: string } }) {
	const awaitedParams = await params;
	const id = awaitedParams.id;

	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			items: {
				// orderBy: {
				//     id: 'desc',
				// },
				include: {
					product: {
						include: {
							items: true,
						},
					},
				},
			},
		},
	});

	if (!product) {
		return notFound();
	}

	return <ChooseProductModal product={product} />;
}

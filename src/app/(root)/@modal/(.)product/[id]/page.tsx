import { ChooseProductModal } from '@/components/shared/modals/choose-product-modal';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params; // Ждем разрешения промиса

	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			items: {
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

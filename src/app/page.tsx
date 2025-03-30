import {Container} from "@/components/shared/container";
import {Title} from "@/components/shared/title";
import {TopBar} from "@/components/shared/top-bar";
import {Filters} from "@/components/shared/filters";
// import {ProductCard} from "@/components/shared/product-card";
import {ProductsGroupList} from "@/components/shared/products-group-list";
import {prisma} from "../../prisma/prisma-client";


export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    ingredients: true,
                    items: true
                }
            }
        }
    });


    return (
        <>
            <Container className='mt-10'>
                <Title text={"Все пиццы"} size='lg' className='font-extrabold'/>
            </Container>

            <TopBar categories={categories.filter(category => category.products.length > 0)} />

            <Container className='mt-10 pb-14'>
                <div className='flex gap-[80px]'>

                    {/*filtered*/}
                    <div className='w-[250px]'>
                        <Filters/>
                    </div>

                    {/*items list*/}
                    <div className='flex-1'>
                        <div className='flex flex-col gap-16'>
                            {categories.map(category => category.products.length > 0 && (
                                    <ProductsGroupList
                                        key={category.id}
                                        title={category.name}
                                        categoryId={category.id}
                                        // items={category.products}
                                        products={category.products}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

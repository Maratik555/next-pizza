import {Container} from "@/components/shared/container";
import {Title} from "@/components/shared/title";
import {TopBar} from "@/components/shared/top-bar";
import {Filters} from "@/components/shared/filters";
import {ProductCard} from "@/components/shared/product-card";
import {ProductsGroupList} from "@/components/shared/products-group-list";


export default function Home() {
    return (
        <>
            <Container className='mt-10'>
                <Title text={"Все пиццы"} size='lg' className='font-extrabold'/>
            </Container>

            <TopBar/>

            <Container className='mt-10 pb-14'>
                <div className='flex gap-[80px]'>

                    {/*filtered*/}
                    <div className='w-[250px]'>
                        <Filters/>
                    </div>

                    {/*items list*/}
                    <div className='flex-1'>
                        <div className='flex flex-col gap-16'>
                            <ProductsGroupList title='Пиццы' categoryId={1} items={[{
                                id: 2,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D611ADF5AAD898B8B651186E023.webp',
                                price: 150,
                                items: [{price: 150}]
                            },{
                                id: 1,
                                name: 'Маргарита2',
                                imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D611ADF5AAD898B8B651186E023.webp',
                                price: 150,
                                items: [{price: 550}]
                            },
                                {
                                    id: 3,
                                    name: 'Маргарита2',
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D611ADF5AAD898B8B651186E023.webp',
                                    price: 150,
                                    items: [{price: 550}]
                                },
                                {
                                    id: 4,
                                    name: 'Маргарита2',
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D611ADF5AAD898B8B651186E023.webp',
                                    price: 150,
                                    items: [{price: 550}]
                                }
                            ]}/>
                            <ProductsGroupList title='Комбо' categoryId={2} items={[{
                                id: 2,
                                name: 'Маргарита',
                                imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D611ADF5AAD898B8B651186E023.webp',
                                price: 150,
                                items: [{price: 150}]
                            },{
                                id: 1,
                                name: 'Маргарита2',
                                imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D611ADF5AAD898B8B651186E023.webp',
                                price: 150,
                                items: [{price: 550}]
                            },
                                {
                                    id: 3,
                                    name: 'Маргарита2',
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D611ADF5AAD898B8B651186E023.webp',
                                    price: 150,
                                    items: [{price: 550}]
                                },
                                {
                                    id: 4,
                                    name: 'Маргарита2',
                                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D611ADF5AAD898B8B651186E023.webp',
                                    price: 150,
                                    items: [{price: 550}]
                                }
                            ]}/>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

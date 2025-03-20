import {Container} from "@/components/shared/container";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ArrowRight, ShoppingCart, User} from "lucide-react";
import Link from "next/link";
import {SearchInput} from "@/components/shared/search-input";


interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}


export const Header = ({className, hasSearch = true, hasCart = true}: Props) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className='flex items-center justify-between py-8'>
        {/*left*/}
                <Link href='/'>
                    <div className='flex items-center gap-4'>
                        <Image src='/logo.png' alt="Logo" width={35} height={35}/>
                        <div>
                            <h1 className='text-2xl uppercase font-black'>Next-15 React-19 | Pizza Dodo</h1>
                            <p className='text-sm text-gray-400 leading-3'>вкусно и точка.</p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

            {/*right*/}
                <div className='flex items-center gap-3'>
                    <Button variant='outline' className='flex items-center gap-1'>
                        <User size={16}/>
                        Войти
                    </Button>
                    <div>
                        <Button className='group relative'>
                            <b>520 Р</b>
                            <span className="h-full w-[1px] bg-white/30 mx-3" />
                            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                                <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
                                <b>5</b>
                            </div>
                            <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                        </Button>
                    </div>
                </div>
            </Container>
        </header>

    )
};
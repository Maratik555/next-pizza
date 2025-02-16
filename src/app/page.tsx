import {Container} from "@/components/shared/container";
import {Title} from "@/components/shared/title";


export default function Home() {
  return (
      <>
        <Container className='mt-10'>
            <Title text={"Все пиццы"} size='lg' className='font-extrabold'/>
        </Container>
      </>
  );
}

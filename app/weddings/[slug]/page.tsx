import Container from '@/components/Container';

export default function Wedding({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return <Container>wedding with slug {slug}</Container>;
}

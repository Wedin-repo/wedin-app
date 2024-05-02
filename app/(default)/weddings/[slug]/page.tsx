export default function Wedding({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return <>wedding with slug {slug}</>;
}

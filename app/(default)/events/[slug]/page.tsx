export default function Event({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return <>event with slug {slug}</>;
}

export default async function userPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <>
      <h1>Welcome: {username}</h1>
    </>
  );
}

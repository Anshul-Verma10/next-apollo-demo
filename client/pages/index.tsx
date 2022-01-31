import Link from 'next/link'

const Page = () => (
  <div>
    <p>Welcome To Users Dashboard</p>
    <p>Please click on below mentioned link to navigate to dashboard.</p>
    <p>
      <Link href="/app">User dashboard</Link>
</p>
  </div>
)

export default Page;

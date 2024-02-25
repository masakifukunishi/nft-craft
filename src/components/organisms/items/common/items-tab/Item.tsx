import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  name: string;
  href: string;
};

const TabItem = ({ name, href }: Props) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  const className = isActive
    ? "inline-block p-4 border-b-2 rounded-t-lg text-blue-500 border-blue-500"
    : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-600";

  return (
    <Link href={href} className={className} aria-current={isActive ? "page" : undefined}>
      {name}
    </Link>
  );
};

export default TabItem;

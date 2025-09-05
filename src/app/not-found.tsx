import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Link style={{ color: 'black' }} href={`/`}>
      На главную
    </Link>
  );
}

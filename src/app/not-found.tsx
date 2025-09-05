import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Link
      style={{
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '56px',
        height: '400px',
        alignItems: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
      }}
      href={`/fitness/main`}
    >
      <p>К сожалению данная страница не существует. &#128517;</p>
      <p style={{ textDecoration: 'underline' }}>На главную</p>
    </Link>
  );
}

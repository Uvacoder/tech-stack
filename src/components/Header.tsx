import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-center text-xl px-10 w-full h-[60px] bg-stone-100 bg-opacity-70 backdrop-blur-sm sticky top-0">
      <div className="flex justify-center gap-10">
        <Link to="/">Home</Link>
        <Link to="/stack">My Stack</Link>
      </div>
    </header>
  );
}

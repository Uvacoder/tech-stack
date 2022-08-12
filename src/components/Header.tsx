import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-evenly px-10 w-full h-[60px] bg-stone-100 bg-opacity-70 backdrop-blur-sm sticky top-0">
      <div className="text-2xl font-mono text-stone-800">TechStack</div>
      <Link to="/stack" className="text-xl">
        My Stack
      </Link>
    </header>
  );
}

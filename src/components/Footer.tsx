
import Link from 'next/link';

export default function Footer() {
  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Réalisations', href: '#realisations' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-border/40 mt-24 bg-[#3E2F1C] text-[#F5F5F5]">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="text-left">
            <h3 className="text-xl font-medium mb-4">Arnaud Labarre</h3>
            <p className="text-[#F5F5F5] max-w-sm">
              Menuisier passionné, spécialisé dans le mobilier sur mesure en bois noble.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-base font-medium mb-4">Pages</h3>
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-[#F5F5F5] hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="text-left">
            <h3 className="text-base font-medium mb-4">Contact</h3>
            <p className="text-sm text-[#F5F5F5] mb-2">Tel : 0496 89 25 31</p>
            <p className="text-sm text-[#F5F5F5] mb-2">Fax : 02 366 91 34</p>
            <p className="text-sm text-[#F5F5F5] mb-2">Visite de l'atelier sur rendez-vous</p>
            <p className="text-sm text-[#F5F5F5]">Address: Hoogstraat 66, 1650 Beersel, Belgium</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-12 pt-6 border-t border-border/40">
          <p className="text-sm text-[#F5F5F5]">
            © {new Date().getFullYear()} Arnaud Labarre. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-[#F5F5F5] hover:text-white transition-colors duration-200">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

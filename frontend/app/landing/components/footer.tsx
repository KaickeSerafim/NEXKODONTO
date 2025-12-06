import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">NEXKODONTO</h3>
            <p className="text-sm">Sistema completo de gestão odontológica</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="hover:text-white transition">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="#demo" className="hover:text-white transition">
                  Demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#about" className="hover:text-white transition">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#privacy" className="hover:text-white transition">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-white transition">
                  Termos
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 NEXKODONTO. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

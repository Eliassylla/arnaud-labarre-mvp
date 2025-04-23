import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isTabletPortrait, setIsTabletPortrait] = useState(false);

  useEffect(() => {
    const checkTabletPortrait = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
      setIsTabletPortrait(isPortrait && isTablet);
    };

    checkTabletPortrait();
    window.addEventListener('resize', checkTabletPortrait);
    window.addEventListener('orientationchange', checkTabletPortrait);

    return () => {
      window.removeEventListener('resize', checkTabletPortrait);
      window.removeEventListener('orientationchange', checkTabletPortrait);
    };
  }, []);

  return (
  <div className={cn("w-full max-w-md mx-auto", isTabletPortrait ? "!mx-auto !max-w-[85%]" : "", className)} {...props}>
      <Card className="w-full bg-[#f3e5d0] border border-[#A55B53] shadow-lg p-2 sm:p-3 md:p-4 rounded-2xl">
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="font-semibold text-[#3E2F1C] text-center">Demander votre devis gratuit</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-4">
          <form className="flex flex-col gap-3 md:gap-4" noValidate autoComplete="off">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-[#3E2F1C] text-left">Nom</Label>
              <Input id="name" type="text" placeholder="Votre nom" required className="w-full p-2 text-base rounded-xl focus:outline-none text-center" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[#3E2F1C] text-left">Email</Label>
              <Input id="email" type="email" placeholder="m@exemple.com" required className="w-full p-2 text-base rounded-xl focus:outline-none text-center" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="service" className="text-[#3E2F1C] text-left">Service souhaité</Label>
              <Input id="service" type="text" placeholder="Ex: Agencement sur mesure" required className="w-full p-2 text-base rounded-xl focus:outline-none text-center" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="details" className="text-[#3E2F1C] text-left">Détails du projet</Label>
              <textarea
                id="details"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3E2F1C] dark:bg-background dark:text-foreground text-center"
                placeholder="Décrivez votre projet"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#3E2F1C] text-white hover:bg-[#2d2316] focus:ring-2 focus:ring-offset-2 focus:ring-[#3E2F1C] rounded-xl text-sm"
            >
              Envoyer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

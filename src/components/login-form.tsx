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
import { motion } from "framer-motion" // Assurez-vous que framer-motion est importé

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
  <div className={cn("w-full max-w-lg mx-auto p-2 sm:p-4 md:p-6", className)} {...props}>
      <Card className="w-full bg-[#f3e5d0] border border-[#A55B53] shadow-lg p-2 sm:p-4 md:p-6 rounded-2xl">
        <CardHeader className="p-4">
          <CardTitle className="font-semibold text-[#3E2F1C] text-center p-6">Demander votre devis gratuit</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" noValidate autoComplete="off">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-[#3E2F1C]">Nom</Label>
              <Input id="name" type="text" placeholder="Votre nom" required className="w-full p-3 text-base h-11 sm:h-12 rounded-2xl focus:outline-none" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[#3E2F1C]">Email</Label>
              <Input id="email" type="email" placeholder="m@exemple.com" required className="w-full p-3 text-base h-11 sm:h-12 rounded-2xl focus:outline-none" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="service" className="text-[#3E2F1C]">Service souhaité</Label>
              <Input id="service" type="text" placeholder="Ex: Agencement sur mesure" required className="w-full p-3 text-base h-11 sm:h-12 rounded-2xl focus:outline-none" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="details" className="text-[#3E2F1C]">Détails du projet</Label>
              <textarea
                id="details"
                rows={4}
                className="w-full p-3 h-20 sm:h-24 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3E2F1C] dark:bg-background dark:text-foreground"
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

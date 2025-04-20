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

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full bg-[#DEB887] dark:bg-[#5B270B] border border-[#A55B53] dark:border-[#3F1F14] shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Demander votre devis gratuit</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" type="text" placeholder="Votre nom" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@exemple.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="service">Service souhaité</Label>
              <Input id="service" type="text" placeholder="Ex: Agencement sur mesure" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="details">Détails du projet</Label>
              <textarea
                id="details"
                rows={4}
                className="border p-2 rounded bg-white"
                placeholder="Décrivez votre projet"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-[#3E2F1C] cursor-pointer"
            >
              Envoyer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

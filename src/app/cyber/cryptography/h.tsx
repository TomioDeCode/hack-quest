import { Card } from "@/components/ui/card";

export default function TextOnImage() {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <div className="relative aspect-video bg-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xl font-bold text-black text-center px-4">
            CTF{"{"}Hidden_In_Plain_Sight{"}"}
          </p>
        </div>
      </div>
    </Card>
  );
}

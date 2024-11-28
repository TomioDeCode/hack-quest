import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DefaultSubmitFlag = ({
  isOpen,
  onOpenChange,
  onSubmit,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  soalId: string;
  onSubmit: (flag: string) => Promise<boolean>;
}) => {
  const [flag, setFlag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!flag.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Flag tidak boleh kosong!",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await onSubmit(flag);

      if (result) {
        toast({
          title: "Berhasil!",
          description: "Flag benar! Challenge terselesaikan.",
          variant: "default",
        });
        onOpenChange(false);
        setFlag("");
      } else {
        toast({
          variant: "destructive",
          title: "Salah",
          description: "Flag salah. Coba lagi!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat submit flag",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Flag</DialogTitle>
          <DialogDescription>
            Masukkan flag untuk challenge ini
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Masukkan flag Anda"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            <X className="mr-2 h-4 w-4" /> Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Mengirim..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DefaultSubmitFlag;

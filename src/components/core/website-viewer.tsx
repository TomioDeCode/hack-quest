"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Globe } from "lucide-react";
import Link from "next/link";

interface WebsiteViewerProps {
  url: string | undefined;
  title?: string;
}

export default function WebsiteViewer({
  url,
  title = "Website Preview",
}: WebsiteViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        className="gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Globe className="h-4 w-4" />
        Website
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh]" showCloseButton={false}>
          <DialogHeader className="">
            <div className="flex justify-between items-center min-w-full">
              <DialogTitle className="uppercase">{title}</DialogTitle>
              {url && (
                <Button
                  variant="outline"
                  asChild
                  className="text-blue-500 hover:underline"
                >
                  <Link href={url} target="_blank" rel="noopener noreferrer" className="uppercase">
                    Open Full Site
                  </Link>
                </Button>
              )}
            </div>
          </DialogHeader>
          <div className="flex-1 min-h-0">
            {url ? (
              <iframe
                src={url}
                loading="eager"
                className="w-full min-h-[65vh] border-none"
                title={title}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                No URL provided
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

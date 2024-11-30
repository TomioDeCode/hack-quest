import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Lightbulb, Send, Trophy } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Challenge } from "@/types/Challenge";
import { useCTFChallenges } from "@/hooks/useCTFChallenges";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import WebsiteViewer from "../core/website-viewer";

interface CTFChallengeProps {
  challenges: Challenge[];
  SubmitFlagComponent?: React.ComponentType<{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    soalId: string;
    onSubmit: (flag: string) => Promise<boolean>;
  }>;
  title?: string;
  onSubmit?: (flag: string) => Promise<boolean>;
}

export const CTFChallenge = ({
  challenges,
  title = "CTF Challenge",
  onSubmit,
}: CTFChallengeProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [flagInput, setFlagInput] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    challenge,
    currentChallenge,
    solvedChallenges,
    showHint,
    isLastChallenge,
    currentChallengeSolved,
    progressPercentage,
    canMoveNext,
    canMovePrevious,
    handleSubmitFlag,
    handleNext,
    handlePrevious,
    toggleHint,
  } = useCTFChallenges(challenges);

  const solvedChallengesCount = solvedChallenges.filter((solvedId) =>
    challenges.some((challenge) => challenge.id === solvedId)
  ).length;

  const submitFlagHandler = async (flag: string) => {
    const result = onSubmit
      ? await onSubmit(flag)
      : await handleSubmitFlag(challenge.id, flag);

    if (result) {
      setIsDialogOpen(false);
      setFlagInput("");
    }
    return result;
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-primary bg-clip-text text-transparent mb-4 uppercase">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <div className="text-lg">
                Solved: {solvedChallengesCount} / {challenges.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-6">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-xl">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  {challenge.title}
                </CardTitle>
                <div className="flex justify-end gap-5">
                  {challenge.file === "" ? (
                    <div className=""></div>
                  ) : (
                    <Link
                      href={challenge?.file || ""}
                      download
                      target="_blank"
                      className="px-5 py-1 text-sm bg-primary text-primary-foreground rounded-md"
                    >
                      Download
                    </Link>
                  )}
                  {challenge.url === "" ? (
                    <div className=""></div>
                  ) : (
                    <WebsiteViewer url={challenge.url} title={challenge.title} />
                  )}
                  <span className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md">
                    Challenge {currentChallenge + 1}
                  </span>
                </div>
              </div>
              <CardDescription className="text-lg">
                {challenge.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div
                className={`transition-all duration-300 ease-in-out ${
                  showHint ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
                }`}
              >
                <div className="bg-primary/50 p-4 rounded-lg border border-primary">
                  <p className="text-sm text-primary">{challenge.hint}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="answer" className="text-lg font-medium">
                    Answer
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleHint}
                    className="flex items-center gap-2"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="w-full bg-primary flex items-center gap-2 justify-center"
                  >
                    <Send className="w-4 h-4" />
                    Submit Flag
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  disabled={!canMovePrevious}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  variant="outline"
                  disabled={!canMoveNext}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>

            <CardFooter>
              {currentChallengeSolved && (
                <div className="w-full text-center py-2 px-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                  🎉 Challenge completed!{" "}
                  {!isLastChallenge && "Ready for the next one!"}
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Custom Dialog for Flag Submission */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Flag</DialogTitle>
            <DialogDescription>
              Enter the flag for Challenge {currentChallenge + 1}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter your flag"
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
            />
            <Button
              onClick={() => submitFlagHandler(flagInput)}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CTFChallenge;

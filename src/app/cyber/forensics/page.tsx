"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SubmitFlag from "@/components/fragments/SubmitFlag";
import { ArrowLeft, ArrowRight, Lightbulb, Send } from "lucide-react";
import { challenges } from "@/helpers/forensicDta";

export default function ForensicsCTF() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const challenge = challenges[currentChallenge];
  const isFirstChallenge = currentChallenge === 0;
  const isLastChallenge = currentChallenge === challenges.length - 1;
  const currentChallengeSolved = solvedChallenges.includes(challenge.id);
  const canMoveNext =
    currentChallengeSolved || solvedChallenges.includes(challenge.id);
  const canMovePrevious =
    currentChallenge > 0 &&
    solvedChallenges.includes(challenges[currentChallenge - 1].id);

  const handleSubmitFlag = async (
    id: string,
    flag: string
  ): Promise<boolean> => {
    const challenge = challenges.find((c) => c.id === id);
    if (!challenge) return false;

    const isCorrect = flag.toUpperCase() === challenge.flag.toUpperCase();
    if (isCorrect && !solvedChallenges.includes(id)) {
      setSolvedChallenges((prev) => [...prev, id]);
    }
    return isCorrect;
  };

  const handleNext = () => {
    if (!isLastChallenge && canMoveNext) {
      setCurrentChallenge((prev) => prev + 1);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (!isFirstChallenge && canMovePrevious) {
      setCurrentChallenge((prev) => prev - 1);
      setShowHint(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-primary uppercase">
                Forensics CTF Challenges
              </h1>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-6">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${
                    ((currentChallenge + 1) / challenges.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-xl border-t-4 border-t-primary">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  {challenge.title}
                </CardTitle>
                <span className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md">
                  Challenge {currentChallenge + 1}/{challenges.length}
                </span>
              </div>
              <CardDescription className="text-lg">
                {challenge.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
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
                    onClick={() => setShowHint(!showHint)}
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

              <div className="flex justify-between items-center pt-4">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  disabled={isFirstChallenge || !canMovePrevious}
                  className={`flex items-center gap-2 ${
                    isFirstChallenge || !canMovePrevious
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  variant="outline"
                  disabled={isLastChallenge || !canMoveNext}
                  className={`flex items-center gap-2 ${
                    isLastChallenge || !canMoveNext
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>

            <CardFooter>
              {currentChallengeSolved && (
                <div className="w-full text-center py-3 px-4 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  🎉 Challenge completed!{" "}
                  {!isLastChallenge &&
                    "You can now proceed to the next challenge."}
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>

      <SubmitFlag
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        soalId={challenge.id}
        onSubmit={handleSubmitFlag}
      />
    </div>
  );
}

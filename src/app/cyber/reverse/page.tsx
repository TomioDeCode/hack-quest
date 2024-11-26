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
import { ArrowLeft, ArrowRight, Lightbulb, Send, Trophy } from "lucide-react";
import SubmitFlag from "@/components/fragments/SubmitFlag";
import { Label } from "@radix-ui/react-label";

const challenges = [
  {
    id: "1",
    title: "Base64 Decode",
    description: "Decode pesan berikut: Q1RGe0I0UzM2NF9EMyQwRDNyfQ==",
    flag: "CTF{B4S364_D3$0D3r}",
    hint: "Gunakan metode dekode Base64",
  },
  {
    id: "2",
    title: "Caesar Cipher",
    description: "Dekripsi pesan berikut: FWI{FDHVDU_FLSKHU_FUDFNHG}",
    flag: "CTF{CAESAR_CIPHER_CRACKED}",
    hint: "Pesan dienkripsi dengan pergeseran 3 huruf",
  },
  {
    id: "3",
    title: "Hex to ASCII",
    description:
      "Ubah hex berikut menjadi ASCII: 4354467B4845585F325F41534349495F434F4E563352543352fD",
    flag: "CTF{HEX_2_ASCII_CONV3RT3R}",
    hint: "Setiap dua karakter hex mewakili satu karakter ASCII",
  },
  {
    id: "4",
    title: "Binary to Text",
    description:
      "Ubah binary berikut menjadi teks: 01000011 01010100 01000110 01111011 01000010 01001001 01001110 01000001 01010010 01011001 01011111 01000100 01000101 01000011 01001111 01000100 01000101 01010010 01111101",
    flag: "CTF{BINARY_DECODER}",
    hint: "Setiap 8 bit mewakili satu karakter ASCII",
  },
  {
    id: "5",
    title: "Reverse String",
    description: "Balikkan string berikut: }GHVUHYHU_JQLUWV{FTC",
    flag: "CTF{STRING_REVERSED}",
    hint: "Baca string dari kanan ke kiri",
  },
];

export default function ReverseEngineeringCTF() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const challenge = challenges[currentChallenge];
  const isFirstChallenge = currentChallenge === 0;
  const isLastChallenge = currentChallenge === challenges.length - 1;
  const currentChallengeSolved = solvedChallenges.includes(challenge.id);
  const canMoveNext =
    currentChallengeSolved || solvedChallenges.includes(challenge.id);
  const canMovePrevious =
    currentChallenge > 0 &&
    solvedChallenges.includes(challenges[currentChallenge - 1].id);

  const progressPercentage =
    (solvedChallenges.length / challenges.length) * 100;

  const handleSubmitFlag = async (
    id: string,
    flag: string
  ): Promise<boolean> => {
    const challenge = challenges.find((c) => c.id === id);
    if (!challenge) return false;

    const isCorrect = flag.trim() === challenge.flag;
    if (isCorrect && !solvedChallenges.includes(id)) {
      setSolvedChallenges((prev) => [...prev, id]);
    }
    return isCorrect;
  };

  const handleNext = () => {
    if (!isLastChallenge && canMoveNext) {
      setCurrentChallenge((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstChallenge && canMovePrevious) {
      setCurrentChallenge((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-primary bg-clip-text text-transparent mb-4 uppercase">
              Reverse Engineering CTF
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <div className="text-lg">
                Solved: {solvedChallenges.length} / {challenges.length}
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
                <span className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md">
                  Challenge {currentChallenge + 1}
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
                  <p className="text-sm text-primary">
                    {challenge.hint}
                  </p>
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

              <div className="flex items-center justify-between gap-4">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  disabled={isFirstChallenge || !canMovePrevious}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  variant="outline"
                  disabled={isLastChallenge || !canMoveNext}
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

      <SubmitFlag
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        soalId={challenge.id}
        onSubmit={handleSubmitFlag}
      />
    </div>
  );
}

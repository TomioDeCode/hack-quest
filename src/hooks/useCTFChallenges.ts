import { useState, useEffect, useCallback, useMemo } from "react";
import { Challenge } from "@/types/Challenge";

export const useCTFChallenges = (challenges: Challenge[]) => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(
    () => {
      return 0;
    }
  );

  const [solvedChallenges, setSolvedChallenges] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = localStorage.getItem("solvedChallenges");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "solvedChallenges",
        JSON.stringify(solvedChallenges)
      );
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }, [solvedChallenges]);

  const [showHint, setShowHint] = useState(false);

  const challenge = useMemo(
    () => challenges[currentChallengeIndex],
    [challenges, currentChallengeIndex]
  );

  const isFirstChallenge = currentChallengeIndex === 0;
  const isLastChallenge = currentChallengeIndex === challenges.length - 1;

  const currentChallengeSolved = solvedChallenges.includes(challenge.id);

  const progressPercentage = useMemo(() => {
    const solvedChallengesInCurrentSet = solvedChallenges.filter((solvedId) =>
      challenges.some((challenge) => challenge.id === solvedId)
    ).length;
    return (solvedChallengesInCurrentSet / challenges.length) * 100;
  }, [solvedChallenges, challenges]);

  const canMoveNext = useMemo(() => {
    return (
      !isLastChallenge &&
      (currentChallengeSolved ||
        challenges
          .slice(currentChallengeIndex + 1)
          .some((challenge) => solvedChallenges.includes(challenge.id)))
    );
  }, [
    isLastChallenge,
    currentChallengeSolved,
    solvedChallenges,
    currentChallengeIndex,
    challenges,
  ]);

  const canMovePrevious =
    currentChallengeIndex > 0 &&
    challenges
      .slice(0, currentChallengeIndex)
      .some((_, index) => solvedChallenges.includes(challenges[index].id));

  const handleSubmitFlag = useCallback(
    async (id: string, flag: string): Promise<boolean> => {
      const challengeToCheck = challenges.find((c) => c.id === id);
      if (!challengeToCheck) return false;

      const normalizedSubmittedFlag = flag.trim().toUpperCase();
      const normalizedChallengeFlag = challengeToCheck.flag
        .trim()
        .toUpperCase();

      const isCorrect = normalizedSubmittedFlag === normalizedChallengeFlag;

      if (isCorrect && !solvedChallenges.includes(id)) {
        setSolvedChallenges((prev) => [...prev, id]);
      }

      return isCorrect;
    },
    [challenges, solvedChallenges]
  );

  const handleNext = useCallback(() => {
    if (!isLastChallenge) {
      if (currentChallengeSolved) {
        setCurrentChallengeIndex((prevIndex) => prevIndex + 1);
      } else {
        for (let i = currentChallengeIndex + 1; i < challenges.length; i++) {
          if (solvedChallenges.includes(challenges[i].id)) {
            setCurrentChallengeIndex(i);
            break;
          }
        }
      }
    }
  }, [
    isLastChallenge,
    currentChallengeIndex,
    currentChallengeSolved,
    challenges,
    solvedChallenges,
  ]);

  const handlePrevious = useCallback(() => {
    if (!isFirstChallenge && canMovePrevious) {
      for (let i = currentChallengeIndex - 1; i >= 0; i--) {
        if (solvedChallenges.includes(challenges[i].id)) {
          setCurrentChallengeIndex(i);
          break;
        }
      }
    }
  }, [
    isFirstChallenge,
    canMovePrevious,
    currentChallengeIndex,
    challenges,
    solvedChallenges,
  ]);

  const toggleHint = useCallback(() => {
    setShowHint((prev) => !prev);
  }, []);

  return {
    challenge,
    currentChallenge: currentChallengeIndex,
    solvedChallenges,
    showHint,
    isFirstChallenge,
    isLastChallenge,
    currentChallengeSolved,
    progressPercentage,
    canMoveNext,
    canMovePrevious,
    handleSubmitFlag,
    handleNext,
    handlePrevious,
    toggleHint,
  };
};

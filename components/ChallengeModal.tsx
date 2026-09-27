"use client";

import { useEffect, useRef, useState } from "react";
import Fireworks from "@/components/Fireworks";
import GlomerulusQuiz from "@/components/GlomerulusQuiz";
import MatchPairs from "@/components/MatchPairs";
import { QUESTIONS_PER_ROUND } from "@/data/quiz-questions";
import { PAIRS_PER_ROUND } from "@/data/match-pairs";

type Phase = "quiz" | "match" | "result";

const MAX_SCORE = QUESTIONS_PER_ROUND + PAIRS_PER_ROUND;

const phaseHeader: Record<Phase, { eyebrow: string; title: string }> = {
  quiz: { eyebrow: "Actividad 1 de 2", title: "Quiz" },
  match: { eyebrow: "Actividad 2 de 2", title: "Une las parejas" },
  result: { eyebrow: "Poner a prueba lo aprendido", title: "Resultado final" },
};

function resultMessage(total: number): string {
  if (total === MAX_SCORE) return "¡Excelente! Dominas la histología del glomérulo.";
  if (total >= MAX_SCORE - 2) return "¡Muy bien! Solo te faltaron algunos detalles.";
  return "Vale la pena repasar el recorrido y volver a intentarlo.";
}

type Props = {
  onClose: () => void;
  onBackToTour: () => void;
};

export default function ChallengeModal({ onClose, onBackToTour }: Props) {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [quizScore, setQuizScore] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  const header = phaseHeader[phase];
  const total = quizScore + matchScore;

  useEffect(() => {
    dialogRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function finishQuiz(score: number) {
    setQuizScore(score);
    setPhase("match");
  }

  function finishMatch(score: number) {
    setMatchScore(score);
    setPhase("result");
  }

  function restart() {
    setQuizScore(0);
    setMatchScore(0);
    setPhase("quiz");
    setAttempt((a) => a + 1);
  }

  return (
    <div className="quiz__backdrop" onClick={onClose}>
      {phase === "result" && total === MAX_SCORE ? <Fireworks key={attempt} /> : null}
      <div
        ref={dialogRef}
        className="quiz"
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="quiz__header">
          <div>
            <p className="quiz__eyebrow">{header.eyebrow}</p>
            <h2 id="challenge-title" className="quiz__heading">
              {header.title}
            </h2>
          </div>
          <button
            type="button"
            className="quiz__close"
            onClick={onClose}
            aria-label="Cerrar actividades"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="currentColor"
                d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </header>

        {phase === "quiz" ? (
          <GlomerulusQuiz key={`quiz-${attempt}`} onComplete={finishQuiz} />
        ) : null}

        {phase === "match" ? (
          <MatchPairs key={`match-${attempt}`} onComplete={finishMatch} />
        ) : null}

        {phase === "result" ? (
          <div className="quiz__body">
            <p className="quiz__score">
              {total} <span className="quiz__score-total">/ {MAX_SCORE}</span>
            </p>
            <p className="quiz__message">{resultMessage(total)}</p>
            <ul className="result__breakdown">
              <li>
                <span>Quiz</span>
                <strong>
                  {quizScore} / {QUESTIONS_PER_ROUND}
                </strong>
              </li>
              <li>
                <span>Une las parejas</span>
                <strong>
                  {matchScore} / {PAIRS_PER_ROUND}
                </strong>
              </li>
            </ul>
            <div className="quiz__actions">
              <button type="button" className="quiz__button" onClick={restart}>
                Intentar de nuevo
              </button>
              <button
                type="button"
                className="quiz__button quiz__button--ghost"
                onClick={onBackToTour}
              >
                Volver al recorrido
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

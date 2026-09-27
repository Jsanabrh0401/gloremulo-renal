"use client";

import { useEffect, useRef, useState } from "react";
import { QUESTIONS_PER_ROUND, quizQuestions } from "@/data/quiz-questions";
import { pickRandom, shuffle } from "@/lib/random";

type RoundQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const LEAVE_DURATION_MS = 220;

let previousRoundIds: string[] = [];

function buildRound(excludeIds: string[]): RoundQuestion[] {
  return pickRandom(quizQuestions, QUESTIONS_PER_ROUND, excludeIds).map((q) => {
    const order = shuffle(q.options.map((_, i) => i));
    return {
      id: q.id,
      question: q.question,
      options: order.map((i) => q.options[i]),
      correctIndex: order.indexOf(0),
      explanation: q.explanation,
    };
  });
}

type Props = {
  onComplete: (score: number) => void;
};

export default function GlomerulusQuiz({ onComplete }: Props) {
  const [round] = useState<RoundQuestion[]>(() => buildRound(previousRoundIds));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const question = round[current];
  const answered = selected !== null;
  const isLastQuestion = current === round.length - 1;

  useEffect(() => {
    previousRoundIds = round.map((q) => q.id);
  }, [round]);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  function choose(optionIndex: number) {
    if (answered) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) setScore((s) => s + 1);
  }

  function next() {
    if (leaving) return;
    setLeaving(true);
    leaveTimer.current = setTimeout(() => {
      if (isLastQuestion) {
        onComplete(score);
        return;
      }
      setSelected(null);
      setCurrent((c) => c + 1);
      setLeaving(false);
    }, LEAVE_DURATION_MS);
  }

  function optionClass(i: number): string {
    if (!answered) return "quiz__option";
    if (i === question.correctIndex) return "quiz__option quiz__option--correct";
    if (i === selected) return "quiz__option quiz__option--wrong";
    return "quiz__option quiz__option--dim";
  }

  return (
    <div
      key={question.id}
      className={`quiz__body${leaving ? " quiz__body--leaving" : ""}`}
    >
      <p className="quiz__progress">
        Pregunta {current + 1} de {round.length}
      </p>
      <p className="quiz__question">{question.question}</p>
      <div className="quiz__options">
        {question.options.map((option, i) => (
          <button
            key={option}
            type="button"
            className={optionClass(i)}
            onClick={() => choose(i)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>

      {answered ? (
        <div className="quiz__feedback" aria-live="polite">
          <p
            className={`quiz__verdict ${
              selected === question.correctIndex
                ? "quiz__verdict--correct"
                : "quiz__verdict--wrong"
            }`}
          >
            {selected === question.correctIndex ? "¡Correcto!" : "Incorrecto"}
          </p>
          <p className="quiz__explanation">{question.explanation}</p>
          <div className="quiz__actions">
            <button type="button" className="quiz__button" onClick={next}>
              {isLastQuestion ? "Siguiente actividad" : "Siguiente"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

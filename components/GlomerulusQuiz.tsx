"use client";

import { useEffect, useRef, useState } from "react";
import { quizQuestions } from "@/data/quiz-questions";

const QUESTIONS_PER_ROUND = 3;

type RoundQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

let previousRoundIds: string[] = [];

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildRound(excludeIds: string[]): RoundQuestion[] {
  const available = quizQuestions.filter((q) => !excludeIds.includes(q.id));
  const pool = available.length >= QUESTIONS_PER_ROUND ? available : quizQuestions;

  return shuffle(pool)
    .slice(0, QUESTIONS_PER_ROUND)
    .map((q) => {
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

function resultMessage(score: number, total: number): string {
  if (score === total) return "¡Excelente! Dominas la histología del glomérulo.";
  if (score >= total - 1) return "¡Muy bien! Solo te faltó un detalle.";
  return "Vale la pena repasar el recorrido y volver a intentarlo.";
}

type Props = {
  onClose: () => void;
};

export default function GlomerulusQuiz({ onClose }: Props) {
  const [round, setRound] = useState<RoundQuestion[]>(() =>
    buildRound(previousRoundIds),
  );
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isFinished = current >= round.length;
  const question = round[current];
  const answered = selected !== null;

  useEffect(() => {
    previousRoundIds = round.map((q) => q.id);
  }, [round]);

  useEffect(() => {
    dialogRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function choose(optionIndex: number) {
    if (answered) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) setScore((s) => s + 1);
  }

  function next() {
    setSelected(null);
    setCurrent((c) => c + 1);
  }

  function newRound() {
    setRound(buildRound(round.map((q) => q.id)));
    setCurrent(0);
    setSelected(null);
    setScore(0);
  }

  function optionClass(i: number): string {
    if (!answered) return "quiz__option";
    if (i === question.correctIndex) return "quiz__option quiz__option--correct";
    if (i === selected) return "quiz__option quiz__option--wrong";
    return "quiz__option quiz__option--dim";
  }

  return (
    <div className="quiz__backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="quiz"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="quiz__header">
          <div>
            <p className="quiz__eyebrow">Quiz de histología</p>
            <h2 id="quiz-title" className="quiz__heading">
              {isFinished
                ? "Resultado"
                : `Pregunta ${current + 1} de ${round.length}`}
            </h2>
          </div>
          <button
            type="button"
            className="quiz__close"
            onClick={onClose}
            aria-label="Cerrar quiz"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="currentColor"
                d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </header>

        {isFinished ? (
          <div key="result" className="quiz__body">
            <p className="quiz__score">
              {score} <span className="quiz__score-total">/ {round.length}</span>
            </p>
            <p className="quiz__message">{resultMessage(score, round.length)}</p>
            <div className="quiz__actions">
              <button type="button" className="quiz__button" onClick={newRound}>
                Otra ronda
              </button>
              <button
                type="button"
                className="quiz__button quiz__button--ghost"
                onClick={onClose}
              >
                Volver al recorrido
              </button>
            </div>
          </div>
        ) : (
          <div key={question.id} className="quiz__body">
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
                    {current === round.length - 1 ? "Ver resultado" : "Siguiente"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

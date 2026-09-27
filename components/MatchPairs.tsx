"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { PAIRS_PER_ROUND, matchPairs, type MatchPair } from "@/data/match-pairs";
import { pickRandom, shuffle } from "@/lib/random";

type Round = {
  terms: MatchPair[];
  descriptions: MatchPair[];
};

const LEAVE_DURATION_MS = 220;

let previousRoundIds: string[] = [];

function buildRound(excludeIds: string[]): Round {
  const terms = pickRandom(matchPairs, PAIRS_PER_ROUND, excludeIds);
  let descriptions = shuffle(terms);
  while (descriptions.every((d, i) => d.id === terms[i].id)) {
    descriptions = shuffle(terms);
  }
  return { terms, descriptions };
}

type Props = {
  onComplete: (score: number) => void;
};

export default function MatchPairs({ onComplete }: Props) {
  const [round] = useState<Round>(() => buildRound(previousRoundIds));
  /** id de la estructura -> id de la descripción elegida */
  const [pairs, setPairs] = useState<Record<string, string>>({});
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allPaired = Object.keys(pairs).length === round.terms.length;
  const score = round.terms.filter((t) => pairs[t.id] === t.id).length;
  const mistakes = round.terms.filter((t) => pairs[t.id] !== t.id);

  useEffect(() => {
    previousRoundIds = round.terms.map((t) => t.id);
  }, [round]);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  function finish() {
    if (leaving) return;
    setLeaving(true);
    leaveTimer.current = setTimeout(() => onComplete(score), LEAVE_DURATION_MS);
  }

  function termFor(descriptionId: string): string | null {
    return Object.keys(pairs).find((termId) => pairs[termId] === descriptionId) ?? null;
  }

  function termNumber(termId: string): number {
    return round.terms.findIndex((t) => t.id === termId) + 1;
  }

  function connect(termId: string, descriptionId: string) {
    setPairs((prev) => ({ ...prev, [termId]: descriptionId }));
    setSelectedTerm(null);
    setSelectedDescription(null);
  }

  function unpair(termId: string) {
    setPairs((prev) => {
      const next = { ...prev };
      delete next[termId];
      return next;
    });
  }

  function clickTerm(termId: string) {
    if (checked) return;
    if (pairs[termId]) {
      unpair(termId);
      return;
    }
    if (selectedDescription) {
      connect(termId, selectedDescription);
      return;
    }
    setSelectedTerm((cur) => (cur === termId ? null : termId));
  }

  function clickDescription(descriptionId: string) {
    if (checked) return;
    const owner = termFor(descriptionId);
    if (owner) {
      unpair(owner);
      return;
    }
    if (selectedTerm) {
      connect(selectedTerm, descriptionId);
      return;
    }
    setSelectedDescription((cur) => (cur === descriptionId ? null : descriptionId));
  }

  function termClass(termId: string): string {
    const classes = ["match__item", "match__item--term"];
    if (checked) {
      classes.push(pairs[termId] === termId ? "match__item--correct" : "match__item--wrong");
    } else if (pairs[termId]) {
      classes.push("match__item--paired");
    } else if (selectedTerm === termId) {
      classes.push("match__item--selected");
    }
    return classes.join(" ");
  }

  function descriptionClass(descriptionId: string): string {
    const owner = termFor(descriptionId);
    const classes = ["match__item", "match__item--description"];
    if (checked) {
      classes.push(owner === descriptionId ? "match__item--correct" : "match__item--wrong");
    } else if (owner) {
      classes.push("match__item--paired");
    } else if (selectedDescription === descriptionId) {
      classes.push("match__item--selected");
    }
    return classes.join(" ");
  }

  return (
    <div className={`quiz__body${leaving ? " quiz__body--leaving" : ""}`}>
      <p className="quiz__progress">Une cada estructura con su descripción</p>
      <p className="match__hint">
        Toca una estructura y luego su descripción. Para deshacer una pareja, vuelve a tocarla.
      </p>

      <div className="match__grid">
        <p className="match__label match__label--terms">Estructura</p>
        <p className="match__label match__label--descriptions">Descripción</p>

        {round.terms.map((term, i) => {
          const item = round.descriptions[i];
          const owner = termFor(item.id);
          return (
            <Fragment key={term.id}>
              <button
                type="button"
                className={termClass(term.id)}
                onClick={() => clickTerm(term.id)}
                disabled={checked}
                aria-pressed={selectedTerm === term.id}
              >
                <span className="match__badge">{i + 1}</span>
                <span>{term.term}</span>
              </button>
              <button
                type="button"
                className={descriptionClass(item.id)}
                onClick={() => clickDescription(item.id)}
                disabled={checked}
                aria-pressed={selectedDescription === item.id}
              >
                <span className="match__badge match__badge--empty">
                  {owner ? termNumber(owner) : ""}
                </span>
                <span>{item.description}</span>
              </button>
            </Fragment>
          );
        })}
      </div>

      {checked ? (
        <div className="quiz__feedback" aria-live="polite">
          <p
            className={`quiz__verdict ${
              mistakes.length === 0 ? "quiz__verdict--correct" : "quiz__verdict--wrong"
            }`}
          >
            {score} de {round.terms.length} parejas correctas
          </p>
          {mistakes.length > 0 ? (
            <ul className="match__corrections">
              {mistakes.map((t) => (
                <li key={t.id}>
                  <strong>{t.term}:</strong> {t.description}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="quiz__actions">
        {checked ? (
          <button type="button" className="quiz__button" onClick={finish}>
            Ver resultado final
          </button>
        ) : (
          <button
            type="button"
            className="quiz__button"
            onClick={() => setChecked(true)}
            disabled={!allPaired}
          >
            Comprobar
          </button>
        )}
      </div>
    </div>
  );
}

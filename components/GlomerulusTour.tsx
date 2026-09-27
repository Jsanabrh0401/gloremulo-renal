"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { tourSteps } from "@/data/tour-steps";
import ChallengeModal from "@/components/ChallengeModal";

export default function GlomerulusTour() {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const step = tourSteps[index];
  const isFirst = index === 0;
  const isLast = index === tourSteps.length - 1;

  function goTo(next: number) {
    if (next < 0 || next >= tourSteps.length) return;
    setIndex(next);
    setAnimKey((k) => k + 1);
  }

  useEffect(() => {
    if (quizOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        setIndex((i) => {
          if (i >= tourSteps.length - 1) return i;
          setAnimKey((k) => k + 1);
          return i + 1;
        });
      }
      if (e.key === "ArrowLeft") {
        setIndex((i) => {
          if (i <= 0) return i;
          setAnimKey((k) => k + 1);
          return i - 1;
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [quizOpen]);

  return (
    <div className="tour">
      <header className="tour__brand">
        <p className="tour__eyebrow">Anatomía renal</p>
        <h1 className="tour__brand-title">Glomérulo renal</h1>
      </header>

      <div className="tour__stage">
        <figure className="tour__figure">
          <div className="tour__image-wrap">
            <Image
              src="/glomerulo.png"
              alt="Corte anatómico del glomérulo renal"
              width={900}
              height={900}
              priority
              className="tour__image"
            />
            {step.marker ? (
              <span
                key={`marker-${animKey}`}
                className="tour__marker"
                style={{ left: `${step.marker.x}%`, top: `${step.marker.y}%` }}
                aria-hidden="true"
              >
                {step.marker.label}
              </span>
            ) : null}
          </div>
        </figure>

        <aside className="tour__panel" aria-live="polite">
          <div key={animKey} className="tour__content">
            <h2 className="tour__title">{step.title}</h2>
            <p className="tour__description">{step.description}</p>
            <div className="tour__function">
              <h3 className="tour__function-label">¿Para qué sirve?</h3>
              <p className="tour__function-text">{step.function}</p>
            </div>

            {index > 0 ? (
              <div className="tour__detail">
                <h3 className="tour__detail-label">Vista detallada</h3>
                {step.image ? (
                  <div className="tour__detail-frame">
                    <Image
                      src={step.image}
                      alt={`Detalle de ${step.title}`}
                      width={480}
                      height={320}
                      className="tour__detail-image"
                    />
                  </div>
                ) : (
                  <div
                    className="tour__detail-placeholder"
                    role="img"
                    aria-label="Imagen detallada próximamente"
                  >
                    <span className="tour__detail-placeholder-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="28" height="28">
                        <path
                          fill="currentColor"
                          d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                        />
                      </svg>
                    </span>
                    <p className="tour__detail-placeholder-text">
                      Imagen detallada próximamente
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </aside>
      </div>

      <nav className="tour__nav" aria-label="Navegación del recorrido">
        <button
          type="button"
          className="tour__arrow"
          onClick={() => goTo(index - 1)}
          disabled={isFirst}
          aria-label="Paso anterior"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            />
          </svg>
        </button>

        <div className="tour__dots" role="tablist" aria-label="Pasos del recorrido">
          {tourSteps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir a: ${s.title}`}
              className={`tour__dot${i === index ? " tour__dot--active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {isLast ? (
          <button
            type="button"
            className="quiz__button"
            onClick={() => setQuizOpen(true)}
          >
            Poner a prueba lo aprendido
          </button>
        ) : (
          <button
            type="button"
            className="tour__arrow"
            onClick={() => goTo(index + 1)}
            aria-label="Paso siguiente"
          >
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path
                fill="currentColor"
                d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              />
            </svg>
          </button>
        )}
      </nav>

      {quizOpen ? (
        <ChallengeModal
          onClose={() => setQuizOpen(false)}
          onBackToTour={() => {
            setQuizOpen(false);
            goTo(0);
          }}
        />
      ) : null}
    </div>
  );
}

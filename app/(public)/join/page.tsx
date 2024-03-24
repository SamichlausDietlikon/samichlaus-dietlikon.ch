"use client";

import { DotFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Join() {
  return (
    <section className="max-w-4xl m-auto my-12 space-y-4 px-8">
      <h1 className="text-3xl text-center">Mitwirkung</h1>
      <p className="font-semibold">Wir suchen neue Mitglieder & Helfer!</p>
      <p>
        Damit bei allen Kindern der Samichlaus & Schmutzli zu Besuch kommen können,
        benötigt unsere St. Nikolaus-Gesellschaft immer wieder neue Helferinnen und
        Helfer.
      </p>
      <h2 className="text-2xl text-center !mt-12">
        Organisation aller Aktivitäten beinhaltet
      </h2>
      <ul className="space-y-2 [&>li]:flex [&>li]:items-center [&>li]:gap-2">
        <li>
          <DotFilledIcon /> Samichlaus (männlich)
        </li>
        <li>
          <DotFilledIcon /> Schmutzli (männlich)
        </li>
        <li>
          <DotFilledIcon /> Eseli (FahrerIn)
        </li>
        <li>
          <DotFilledIcon /> SchminkerIn
        </li>
        <li>
          <DotFilledIcon /> Betreuung / Vorbereitung von Samichlaus & Schmutzli
        </li>
        <li>
          <DotFilledIcon /> Küchenfee
        </li>
        <li>
          <DotFilledIcon /> Tourenplanung
        </li>
      </ul>
      <p>
        Nach den Besuchen lassen Samichlaus, Schmutzli, Eseli und die vielen HelferInnen
        im Hintergrund den Abend mit einem Nachtessen im "Samichlaushüttli" ausklingen.
        Wir tauschen Erlebtes aus und pflegen Freundschaften.
      </p>
      <h3 className="text-xl text-center">
        Möchtest Du uns helfen? Glänzende Kinderaugen leuchten sehen? Neue Leute
        kennenlernen?
      </h3>
      <p>
        Dann bist Du bei uns richtig. Melde Dich unter per Email unter{" "}
        <Link href="mailto:samichlaus@samichlaus-dietlikon.ch" className="base-link">
          samichlaus@samichlaus-dietlikon.ch
        </Link>
        . Bei einem Schnuppertag im Dezember kannst Du selber entscheiden, ob Du mitmachen
        willst.
      </p>
    </section>
  );
}

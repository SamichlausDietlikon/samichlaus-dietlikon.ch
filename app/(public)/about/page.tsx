"use client";

import { DotFilledIcon } from "@radix-ui/react-icons";

export default function About() {
  return (
    <section className="max-w-4xl m-auto my-12 space-y-4 px-8">
      <h1 className="text-3xl text-center">Über uns</h1>
      <p>
        Die St. Nikolaus-Gesellschaft Dietlikon, Wangen-Brüttisellen ist 1992 aus einer
        Interessengemeinschaft gleichen Namens hervorgegangen. Der Verein bezweckt die
        Förderung der ursprünglichen St. Niklaus-Idee und leistet dadurch einen Beitrag an
        die Erhaltung eines schweizerischen Volksbrauches.
      </p>
      <h2 className="text-2xl text-center !mt-12">Unsere Tätigkeiten</h2>
      <ul className="space-y-2 [&>li]:flex [&>li]:items-center [&>li]:gap-2">
        <li>
          <DotFilledIcon /> Chlausfeiern in Familien, Gesellschaften, Vereinen, Heimen
        </li>
        <li>
          <DotFilledIcon /> Besuche von Kindergärten, Kinderkrippen und Schulen
        </li>
        <li>
          <DotFilledIcon /> vorwiegend gemeinnützige Aktionen
        </li>
        <li>
          <DotFilledIcon /> Kontakt mit verwandten Institutionen
        </li>
      </ul>
    </section>
  );
}

"use client";

import { DotFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="max-w-4xl m-auto my-12 space-y-4 px-8">
      <h1 className="text-3xl text-center">Wir sind für Sie da</h1>
      <p>
        Wenn Sie uns kontaktieren möchten, können Sie dies über die Anschrift oder das
        Kontaktformular tun.
      </p>
      <p>
        Bei Fragen betreffend Ihrer Buchung erreichen Sie uns zeitlich limitiert per
        Telefon unter{" "}
        <Link href="phone:+41794668505" className="base-link">
          079 466 85 05
        </Link>
        . Bitte benutzen Sie die Combox.
      </p>
      <h2 className="text-2xl text-center !mt-12">Kontaktformular</h2>
      <p>
        <Link href="mailto:samichlaus@samichlaus-dietlikon.ch?subject=Kontakt aufnehmen&body=Guten Tag Samichlaus%0D%0A%0D%0AVorname: %0D%0ANachname: %0D%0AAdresse: %0D%0APLZ/Ort: %0D%0ATelefon: %0D%0A">
          Per Email
        </Link>
      </p>
      <div className="flex justify-between gap-4">
        <p>
          <span className="font-semibold">
            St. Nikolaus-Gesellschaft Dietlikon / Wangen-Brüttisellen
          </span>
          <br />
          Postfach 301
          <br />
          8305 Dietlikon
        </p>
        <p>
          <span className="font-semibold">Bankverbindung</span>
          <br />
          PC Konto 80-440481-3
          <br />
          IBAN CH29 0900 0000 8044 0481 3
        </p>
      </div>
    </section>
  );
}

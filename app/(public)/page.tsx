"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

// Wrap answer in <>...</> to allow valid JSX
const faq = [
  {
    question: "Wie bekomme ich einen Chlausbesuch?",
    answer: (
      <>
        Direkt auf unserer Homepage unter{" "}
        <Link href="/apply/family" className="base-link">
          Anmeldung Familienbesuche
        </Link>{" "}
        und{" "}
        <Link href="/apply/business" className="base-link">
          Anmeldung Schulen / Firmen
        </Link>
        .
        <br /> Bei Fragen und Schwierigkeiten wenden Sie sich bitte direkt an uns, über
        unser{" "}
        <Link href="/contact" className="base-link">
          Kontaktformular
        </Link>
        .
      </>
    ),
  },
  {
    question: "Was kostet ein Besuch beim Chlaus?",
    answer: (
      <>
        <p>
          Liebe Familie, dies ist Ihr freies Ermessen. Der Samichlaus und der Schmutzli
          machen alle Privatbesuche auf freiwilliger Basis und verlangen deshalb keinen
          festen Preis. Selbstverständlich muss auch der Samichlaus seine Unkosten decken
          und ist deshalb auf freiwillige Spenden angewiesen. Der Esel braucht Futter, das
          Gewand muss geflickt und die Stiefel besohlt werden.
        </p>

        <p>
          Am einfachsten erfolgt die Spende direkt am Ende des Besuches. Geben Sie beim
          Verabschieden des Samichlaus oder des Schmutzli ein Nötli oder ein Couvert mit
          Inhalt nach eigenem Gutdünken. Sie können es ihnen diskret direkt in die Finger
          drücken.
        </p>
      </>
    ),
  },
  {
    question: "Wie pünktlich ist der Chlaus?",
    answer:
      "Der Chlaus trägt keine Uhr, trotzdem schafft er es meistens die Besuchszeit ziemlich genau einzuhalten. Bitte haben Sie Verständnis, dass der Chlaus während dem Besuch 100%ig für die besuchten Kinder da ist und ein Besuch auch einmal länger als geplant werden kann. Das kann auch bei Ihrem Kind / Ihren Kindern der Fall sein. Auch schlechte Strassen- und Wetterverhältnissen können den Chlaus daran hindern, den Zeitplan einzuhalten. Sollten wir uns viel verspäten, informieren wir Sie nach Möglichkeit telefonisch.",
  },
  {
    question: "Wie ist der Ablauf beim Chlausbesuch in der Waldhütte",
    answer: (
      <>
        <p>
          Der Samichlaus und der Schmutzli warten in der{" "}
          <Link href="https://maps.app.goo.gl/BGBcUnY3sxrFvwWy7" className="base-link">
            Waldhütte 4
          </Link>{" "}
          im Hardwald auf Sie und Ihre Familie.
        </p>

        <p>
          Falls Sie mit dem Auto kommen, fahren Sie vis à vis des Loorenhofs in den Wald
          und parken Ihr Auto beim Seewadel. Von dort aus gehen Sie bitte zu Fuss bis zur
          Waldhütte. Der Weg ist gekennzeichnet. Folgen Sie dem Chlietürliweg, welcher
          parallel zur Hauptstrasse verläuft, bis zur nächsten Weggabelung. Dort finden
          Sie den beleuchteten Herrenbänkliweg, welchem Sie bis zur Waldhütte folgen, wo
          der Samichlaus mit dem Schmutzli auf Sie wartet.
        </p>

        <p>
          Vor der Waldhütte werden Sie von Helfern in Empfang genommen, die um einen
          reibungslosen Ablauf bemüht sind.
        </p>
        <p>
          Die Säckchen für die Kinder bringen Sie am besten in einem unauffälligen Sack
          mit. Diesen können Sie den Helfern vor Ort übergeben. Sie werden sich um alles
          weitere kümmern. Auch die Bezahlung können sie vor Ort mit den Helfern
          abwickeln.
        </p>
        <p>
          Bitte erscheinen Sie möglichst genau auf ihre Buchungszeit, damit es weder Stau
          noch Verzögerungen gibt.
        </p>
        <p>
          Falls Sie Fragen haben, melden Sie sich bitte telefonisch unter{" "}
          <Link href="tel:+41794668505" className="base-link">
            079 466 85 05
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    question: "Wie werde ich Passivmitglied?",
    answer: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export default function Home() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <section className="space-y-8 [&>*]:border-b [&>*]:border-gray-200">
      <div>
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
          }}
          className="w-[960px] m-auto my-12 rounded-lg max-w-7xl px-8"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {[...Array(6).keys()].map((i) => (
              <CarouselItem>
                <Image
                  src={`/images/${i + 1}.jpg`}
                  alt={`Samichlaus Dietlikon Bild ${i + 1}`}
                  width={960}
                  height={400}
                  className="rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div>
        <div className="max-w-7xl m-auto my-12 px-8 space-y-4 [&>p]:max-w-4xl [&>p]:m-auto">
          <h1 className="text-3xl text-center">
            St. Nikolaus-Gesellschaft Dietlikon, Wangen-Brüttisellen
          </h1>
          <p>
            Der Samichlaus und Schmutzli geniessen die freie Zeit, sind aber auch schon
            voller Vorfreude für die kommende Adventszeit.
          </p>
          <p>Bis bald ...</p>
        </div>
      </div>
      <div>
        <div className="max-w-4xl m-auto my-12 px-8 space-y-4 [&>p]:max-w-4xl [&>p]:m-auto">
          <h2 className="text-2xl text-center !mt-12">Informationen</h2>
          <Accordion type="single" collapsible className="w-full">
            {faq.map(({ question, answer }, index) => (
              <AccordionItem value={`question-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent className="space-y-4">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div>
        <div className="max-w-7xl m-auto my-12 px-8 space-y-4 [&>p]:max-w-4xl [&>p]:m-auto">
          <h2 className="text-2xl text-center !mt-12">Legende</h2>
          <p>
            <em>
              Niklaus wurde im 3. Jahrhundert in Petras Lykien geboren. Epiphanius und
              Johanna waren seine frommen und sehr reichen Eltern. Sie starben früh und
              liessen ihrem einzigen Sohn Niklaus grossen Reichtum zurück. Niklaus
              verschenkte grosszügig von seinem Reichtum an die Armen.
            </em>
          </p>

          <p>
            <em>
              Ein mittelloser Nachbar hatte drei Töchter. Alle drei wollten heiraten aber
              das Geld fehlte. Niklaus hörte von den Mittellosen und wollte ihnen helfen,
              er warf den drei Töchtern einer nach der andern je ein Säcklein Geld in die
              Kammer, so dass jede heiraten konnte. Der Vater aber wollte dem Spender auf
              die Spur kommen. Er lief dem nächtlichen Besuch nach und sah, dass es
              Niklaus war. Niklaus wollte aber unbedingt, dass seine Grosszügigkeit geheim
              bliebe.
            </em>
          </p>

          <p>
            <em>
              Später erzählt die Legende, dass der Bischof von Myra gestorben sei. Es war
              aber kein Nachfolger zu finden. Die Gläubigen überliessen die Wahl dem
              Zufall. Wer morgen als erster zum Frühgottesdienst kommt, soll der neue
              Bischof sein. Niklaus lief als erster durch das Kirchenportal. Nach langem
              Zureden, sagte er endlich ja zu diesem hohen Amt. Er wurde Bischof und Vater
              von Myra. Er teilte von einer grossen Liebe freimütig aus.
            </em>
          </p>

          <p>
            <em>
              Jahre später brach über das ganze Land eine Hungersnot aus. Die
              Wasserstellen waren ausgetrocknet und die Kornfelder verdorrt. In der Stadt
              Myra waren die Vorratskammern leer. Die Kinder weinten und schrien nach
              Brot. Eines Tages näherten sich Schiffe aus der Stadt Alexandria. Sie
              wollten Korn in die Stadt Konstantinopel bringen. Niklaus dachte: "Schiffe
              mit Korn beladen, das könnte die Rettung für die Menschen von Myra sein."
              Die Matrosen auf dem Kornschiff trugen aber Lanzen. Niklaus sagte zum
              Kapitän: "Verkaufe einen Teil der Ladung den Leuten von Myra." - "Das kann
              ich nicht, das Korn ist gewogen." "Hilf uns", flehte Niklaus. "Ich werde
              dafür sorgen, dass bei der Ladung kein Körnchen fehlt." - "Wir werden
              sehen", sagte der Kapitän. "Nehmt vom Korn aber trägt es nicht weg, sondern
              schüttet es aufs Pflaster. Wenn mein Schiff aus dem Wasser abhebt, also
              leichter wird, müsst ihr alles wieder einladen. Wenn der Bischof aber Recht
              hat, dann könnt ihr das Korn behalten." Der Körnerhaufen auf dem Pflaster
              wuchs zu einem kleinen Hügel. Doch es gab kein Zweifel, das Schiff wurde
              nicht leichter. Die Hungersnot von Myra ging zu Ende.
            </em>
          </p>

          <p>
            <em>Die Menschen waren glücklich und jubelten dem Bischof Niklaus zu.</em>
          </p>
        </div>
      </div>
    </section>
  );
}

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

export default function Home() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

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

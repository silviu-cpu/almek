import { Tabs } from "@/components/ui/Tabs";
import type { InfoTab } from "@/lib/info";

/**
 * `**text**` devine <strong>. Atat si nimic mai mult: textul vine din
 * `info.ts`, nu de la utilizatori, deci nu e nevoie de un parser de markdown.
 */
function Rich({ text }: { text: string }) {
  // Cu grup de captura, `split` pune fragmentele ingrosate pe pozitiile impare.
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-on-surface font-bold">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/**
 * Taburile verticale de text din „De ce casă din lemn". Mecanica (stare, ARIA,
 * tastatura) sta in `Tabs`; aici se construiesc doar panourile, pe server.
 */
export function InfoTabs({ tabs, label }: { tabs: InfoTab[]; label: string }) {
  return (
    <Tabs
      label={label}
      orientation="vertical"
      items={tabs.map((tab) => ({
        id: tab.title,
        tab: tab.title,
        panel: (
          <div className="flex flex-col gap-5">
            {/* Pe desktop titlul se vede deja in tabul activ; pe mobil lista
                e derulata lateral si titlul poate fi in afara ecranului. */}
            <h3 className="font-headline-md text-headline-md text-on-surface md:sr-only">
              {tab.title}
            </h3>

            {tab.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="font-body-lg text-body-lg text-on-surface-variant"
              >
                <Rich text={paragraph} />
              </p>
            ))}

            {tab.points ? (
              <ul className="flex flex-col gap-3">
                {tab.points.map((point) => (
                  <li
                    key={point.slice(0, 32)}
                    className="font-body-md text-body-md text-on-surface-variant flex gap-3"
                  >
                    <span aria-hidden className="bg-primary mt-3 size-[2px] shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}

            {tab.link ? (
              <a
                href={tab.link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-technical-data text-technical-data text-primary w-fit tracking-widest uppercase underline-offset-4 hover:underline"
              >
                {tab.link.label}
              </a>
            ) : null}
          </div>
        ),
      }))}
    />
  );
}

"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { formatPrice, type Product } from "@/lib/shop";

/* Aceleasi clase ca la formularul de Contact, ca sa nu existe doua stiluri de
   camp in proiect. */
const fieldClass =
  "bg-transparent appearance-none border-0 border-b-2 border-outline/60 focus:border-primary focus-visible:border-primary focus:outline-none text-on-surface font-body-md text-body-md py-2 px-0 placeholder:text-on-surface-variant/30 transition-colors";

const labelClass =
  "font-technical-data text-xs uppercase tracking-widest text-on-surface-variant";

/**
 * Modal de comanda pentru produsele fara stoc.
 *
 * Construit pe `<dialog>` nativ, deschis cu `showModal()`: asa capcana de focus,
 * `Escape` si inertizarea restului paginii vin din browser. Un modal facut de
 * mana ar trebui sa le reimplementeze pe toate trei si de obicei rateaza cel
 * putin una.
 */
export function OrderModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    /* `showModal()` nu poate fi apelat de doua ori pe acelasi element. */
    if (!dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      /* `Escape` inchide nativ, dar componentul trebuie sa afle, ca sa se
         demonteze — altfel ar ramane in DOM, inchis, si nu s-ar mai redeschide. */
      onClose={onClose}
      /* Clickul pe fundal are ca tinta chiar elementul <dialog>: continutul e
         intr-un wrapper, deci orice click pe el are alta tinta. */
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      aria-labelledby="order-modal-title"
      className="border-outline-variant bg-surface text-on-surface m-auto w-full max-w-xl border p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-6 p-6 sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="font-technical-data text-technical-data text-primary tracking-widest uppercase">
              {"La comandă"}
            </span>
            <h2
              id="order-modal-title"
              className="font-headline-lg text-headline-lg text-on-surface mt-2"
            >
              {product.name}
            </h2>
            <p className="font-technical-data text-technical-data text-on-surface-variant mt-2">
              {`Preț estimativ: ${formatPrice(product.priceMinor)}`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Închide"
            className="border-outline-variant text-on-surface hover:border-primary hover:text-primary flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border transition-colors"
          >
            <X size={18} strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        {sent ? (
          <p
            role="status"
            className="font-body-lg text-body-lg text-on-surface border-outline-variant border p-6"
          >
            {"Am notat cererea. Vă contactăm în cel mai scurt timp cu un termen de execuție și prețul final."}
          </p>
        ) : (
          <>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {
                "Produsul nu este pe stoc, dar îl executăm la comandă. Completați datele și revenim cu termenul de execuție."
              }
            </p>

            {/* TODO(backend): formularul este deocamdata doar UI, ca cel din
                Contact. Butonul este `type="button"` intentionat — un submit
                real pe un <form> fara action ar face GET si ar reincarca
                pagina. La cablare: Server Action + useActionState. */}
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="order-name" className={labelClass}>
                    {"Nume complet"}
                  </label>
                  <input id="order-name" name="name" type="text" autoComplete="name" required placeholder="Ion Popescu" className={fieldClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="order-phone" className={labelClass}>
                    {"Telefon"}
                  </label>
                  <input id="order-phone" name="phone" type="tel" autoComplete="tel" required placeholder="+40 000 000 000" className={fieldClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="order-email" className={labelClass}>
                    {"Email"}
                  </label>
                  <input id="order-email" name="email" type="email" autoComplete="email" required placeholder="email@provider.com" className={fieldClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="order-quantity" className={labelClass}>
                    {"Cantitate"}
                  </label>
                  <input id="order-quantity" name="quantity" type="number" min={1} max={99} defaultValue={1} className={fieldClass} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="order-details" className={labelClass}>
                  {"Detalii (dimensiuni, finisaj, termen)"}
                </label>
                <textarea id="order-details" name="details" rows={3} placeholder="Descrieți ce aveți nevoie..." className={`${fieldClass} resize-none`} />
              </div>

              <button
                type="button"
                onClick={() => setSent(true)}
                className="shine shine-edge bg-primary text-on-primary font-technical-data text-technical-data w-full py-4 tracking-widest uppercase"
              >
                {"Trimite cererea"}
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

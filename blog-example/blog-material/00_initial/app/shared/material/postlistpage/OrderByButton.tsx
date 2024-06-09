import { useSearchParams } from "next/navigation";
import { OrderBy } from "@/app/shared/types.ts";
import AppLink from "@/app/shared/components/AppLink.tsx";

type OrderByButtonProps = {
  orderBy: OrderBy;
};
export default function OrderByButton({ orderBy }: OrderByButtonProps) {
  // todo:
  //  - OrderByButton muss eine Client-Komponente werden!
  //  - lies mit 'useSearchParams' die aktuellen Search Parameter aus ('currentParams')
  //     https://nextjs.org/docs/app/api-reference/functions/use-search-params
  //  - Setze 'currentOrderBy' auf den aktuellen Search Parameter 'order_by'
  //     wenn dieser nicht in der URL gesetzt ist, setze 'currentOrderBy' auf den Wert 'desc'
  //  - erzeuge ein neues URLSearchParams Objekt. (https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
  //  - Wenn das 'orderBy'-Property gesetzt ist, setze das entsprechende Search Property
  //  - erzeuge das Link-Ziel ('href'). Der Pfad ist "/posts?" gefolgt von den Search Parametern

  const currentOrderBy = "";
  const href = ``;

  const label = `Order by date ${orderBy === "desc" ? "Desc" : "Asc"}`;
  const checked = orderBy === (currentOrderBy || undefined);

  if (checked) {
    return <div className={"Button Button-active"}>{label}</div>;
  }

  return (
    <div className={"Button"}>
      {checked ? label : <AppLink href={href}>{label}</AppLink>}
    </div>
  );
}

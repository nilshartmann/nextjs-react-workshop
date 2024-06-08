"use client";
import { useSearchParams } from "next/navigation";
import { OrderBy } from "@/app/types";
import AppLink from "@/app/components/AppLink.tsx";

type OrderByButtonProps = {
  orderBy: OrderBy;
};
export default function OrderByButton({ orderBy }: OrderByButtonProps) {
  const currentParams = useSearchParams();
  const currentOrderBy = currentParams.get("order_by") || "desc";

  const searchParams = new URLSearchParams(currentParams);
  if (orderBy) {
    searchParams.set("order_by", orderBy);
  } else {
    searchParams.delete("order_by");
  }

  const label = `Order by date ${orderBy === "desc" ? "Desc" : "Asc"}`;

  const href = `/posts?${searchParams.toString()}`;

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

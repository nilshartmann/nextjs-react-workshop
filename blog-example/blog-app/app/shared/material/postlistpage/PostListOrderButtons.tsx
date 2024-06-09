import ButtonBar from "@/app/shared/components/ButtonBar.tsx";
import OrderByButton from "@/app/shared/material/postlistpage/OrderByButton.tsx";

export default function PostListOrderButtons() {
  return (
    <ButtonBar>
      <OrderByButton orderBy={"desc"} />
      <OrderByButton orderBy={"asc"} />
    </ButtonBar>
  );
}

import ButtonBar from "@/app/components/ButtonBar.tsx";
import OrderByButton from "@/app/material/postlistpage/OrderByButton.tsx";

export default function PostListOrderButtons() {
  return (
    <ButtonBar>
      <OrderByButton orderBy={"desc"} />
      <OrderByButton orderBy={"asc"} />
    </ButtonBar>
  );
}

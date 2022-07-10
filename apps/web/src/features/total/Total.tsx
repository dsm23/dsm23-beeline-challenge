import { useAppSelector } from "../../app/hooks";
import { totalSelector } from "./slice";

export function Total() {
  const total = useAppSelector(totalSelector);

  return (
    <dl>
      <dt>Total:</dt>
      <dd>£{total}.00</dd>
    </dl>
  );
}

import Checkout from "../components/Checkout/Checkout";
import { getAuthToken } from "../utils";

export default function CheckoutPage () {
  const token = getAuthToken()

  return (
    <>
      {token && <Checkout />}
    </>
  )
}
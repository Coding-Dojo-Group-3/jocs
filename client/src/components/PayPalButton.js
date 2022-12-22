import {PayPalScriptProvider,PayPalButtons,usePayPalScriptReducer} from "@paypal/react-paypal-js";

const paypalScriptOptions = {
    "client-id": "AaG5pHQShvCOwLeRGuMkA9o1iZ6YIvojHx36GnS-jJZPslJYq8KD2Vwu-uhdb0AfdJuJbYAa-1PyvGnn",
    currency: "USD"
};

function Button({clearCart}) {
    /**
     * usePayPalScriptReducer use within PayPalScriptProvider
     * isPending: not finished loading(default state)
     * isResolved: successfully loaded
     * isRejected: failed to load
     */
    const [{ isPending }] = usePayPalScriptReducer();
    const paypalbuttonTransactionProps = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
            {
                amount: {
                    value: "0.01"
                }
            }
        ]
    });
    },
    onApprove(data, actions) {
        /**
       * data: {
       *   orderID: string;
       *   payerID: string;
       *   paymentID: string | null;
       *   billingToken: string | null;
       *   facilitatorAccesstoken: string;
       * }
       */
        
        return actions.order.capture({}).then((details) => {
        alert(
            "Transaction completed by " +
            (details?.payer.name.given_name ?? "No details")
        );

        alert("Data details: " + JSON.stringify(data, null, 2));
        clearCart()
        });
        }
    };
    return (
    <>
        {
            isPending ? 
            <h2>Load Smart Payment Button...</h2> 
            : null
        }
        <PayPalButtons {...paypalbuttonTransactionProps} clearCart={clearCart}/>
    </>
    );
}
export default function App({clearCart}) {
    return (
        <div className="App">
            <PayPalScriptProvider options={paypalScriptOptions}>
                <Button clearCart={clearCart} />
            </PayPalScriptProvider>
        </div>
    );
}

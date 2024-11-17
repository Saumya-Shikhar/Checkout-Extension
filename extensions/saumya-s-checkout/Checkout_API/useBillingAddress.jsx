import { useBillingAddress } from "@shopify/ui-extensions-react/checkout";

export default function BillingAddress(){
    const [billingAddress, setbillingAddress] = useBillingAddress();

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setbillingAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }))
    }
}
import React, {useState } from "react";
import {
    reactExtension,
    TextField,
    useExtensionCapability,
    useBuyerJourneyIntercept,
} from "@shopify/ui-extensions-react/checkout";

export const data = reactExtension("purchase.checkout.contact.render-after",() => <Validate />)

function Validate(){
    const ageTarget = 18;
    const [age, setAge] = useState("");
    const [validationError, setvalidationError] = useState("");

    // Check shopify.extension.toml for block_progress
    const canBlockProgress = useExtensionCapability("block_progress");
    console.log('canBlockProgress',canBlockProgress);
    const label = canBlockProgress ? "Enter Your Age" : "Your Age (optional)";

     // Use the `buyerJourney` intercept to conditionally block checkout progress
    useBuyerJourneyIntercept(canBlockProgress => {
        if(canBlockProgress && !isAgeSet()){
            return({
                behavior: "block",
                reason: "Age is required",
                perform: (result) => {
                    if(result.behavior === "block"){
                        setvalidationError("Enter your Age")
                    }
                }
            })
        }
        if(canBlockProgress && !isAgeValid()){
            return({
                behavior: "block",
                reason: `Age is less than ${ageTarget}`,
                errors: [{
                    message: "You are not legally old enough to buy some of this items in your cart"
                }]
            })
        }

        return{
            behavior: "allow",
            perform: () => {
                clearValidationError();
            }
        }
    })

    function isAgeSet(){
        return age !== '';
    }

    function isAgeValid(){
        return Number(age) > ageTarget;
    }

    function clearValidationError(){
        return setvalidationError("");
    }

    return(
        <TextField 
            label={label}
            placeholder="Enter your Age"
            type="number"
            value={age}
            onChange={setAge}
            onInput={clearValidationError}
            errors={validationError}
        />  
    )
}
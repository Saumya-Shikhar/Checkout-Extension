import {
  reactExtension,
  extension,
  Checkbox,
  useApplyAttributeChange,
  useInstructions,
  Banner,  
  Button,
  BlockStack,
  InlineStack,
  Text,
  Image,
  useApi,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.actions.render-before", () => (
  <Extension />
));


function Extension(){
  const applyAttributeChange = useApplyAttributeChange();
  const instructions = useInstructions();

 // 2. Render a UI
  return(
    <Checkbox onChange={onCheckboxChange}>
      I would like to recieve a free gift with this order.
    </Checkbox>
  );

  async function onCheckboxChange(isChecked) {
    	// 3. Check if the API is available
    if(!instructions.attributes?.canUpdateAttributes) {
      console.log("Attribute cannot be updated at checkout");
      return;
    }
      // 4. Call the API to modify checkout
    const result = await applyAttributeChange({
      key: "requestedFreeGift",
      type: "updateAttribute",
      value: isChecked ? "yes" : "no",
    })
    console.log("applyAttributeChange",result)
  }
}


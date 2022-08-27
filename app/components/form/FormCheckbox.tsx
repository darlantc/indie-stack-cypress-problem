import classNames from "classnames";
import React from "react";

const FormCheckbox = React.forwardRef<
  HTMLInputElement,
  Omit<JSX.IntrinsicElements["input"], "type">
>(({ className, ...props }, ref) => (
  <input
    className={classNames("checkbox", className)}
    data-testid="FormCheckbox"
    ref={ref}
    type="checkbox"
    {...props}
  />
));

FormCheckbox.displayName = "FormCheckbox";

export default FormCheckbox;

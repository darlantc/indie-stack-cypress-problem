import classNames from "classnames";

const FormField = ({ className, ...props }: JSX.IntrinsicElements["div"]) => {
  return (
    <div
      className={classNames("form-control w-full", className)}
      data-testid="FormField"
      {...props}
    />
  );
};

export default FormField;

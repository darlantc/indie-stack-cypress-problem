import classNames from "classnames";

const FormInputError = ({
  className,
  ...props
}: JSX.IntrinsicElements["div"]) => {
  return (
    <div
      className={classNames("label label-text-alt text-red-700", className)}
      data-testid="FormInputError"
      {...props}
    />
  );
};

export default FormInputError;

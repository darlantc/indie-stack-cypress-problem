import classNames from "classnames";

const FormErrors = ({ className, ...props }: JSX.IntrinsicElements["div"]) => {
  return (
    <div
      className={classNames("flex flex-col space-y-2 text-center", className)}
      data-testid="FormErrors"
      {...props}
    />
  );
};

export default FormErrors;

import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import FormInputError from "./FormInputError";

const { getByTestId, getByText } = screen;

describe("<FormInputError />", () => {
  it("should have default test id", () => {
    getRenderer();
    expect(getByTestId("FormInputError")).toBeInTheDocument();
  });

  it.each(["a-class", "another-class"])(
    "should render with className %s",
    (expected) => {
      getRenderer({ className: expected });
      expect(getByTestId("FormInputError")).toHaveClass(
        `label label-text-alt text-red-700 ${expected}`
      );
    }
  );

  it.each(["Children", "Another children"])(
    "should render with children '%s'",
    (expected) => {
      getRenderer({ children: <p>{expected}</p> });
      expect(getByText(expected)).toBeInTheDocument();
    }
  );
});

// Helpers
function getRenderer({
  children = "The children",
  ...rest
}: Partial<ComponentProps<typeof FormInputError>> = {}) {
  return render(<FormInputError {...rest}>{children}</FormInputError>);
}

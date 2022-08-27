import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import FormField from "./FormField";

const { getByTestId, getByText } = screen;

describe("<FormField />", () => {
  it("should have default test id", () => {
    getRenderer();
    expect(getByTestId("FormField")).toBeInTheDocument();
  });

  it.each(["a-class", "another-class"])(
    "should render with className %s",
    (expected) => {
      getRenderer({ className: expected });
      expect(getByTestId("FormField")).toHaveClass(
        `form-control w-full ${expected}`
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
}: Partial<ComponentProps<typeof FormField>> = {}) {
  return render(<FormField {...rest}>{children}</FormField>);
}

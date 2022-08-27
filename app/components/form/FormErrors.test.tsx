import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import FormErrors from "./FormErrors";

const { getByTestId, getByText } = screen;

describe("<FormErrors />", () => {
  it("should have default test id", () => {
    getRenderer();
    expect(getByTestId("FormErrors")).toBeInTheDocument();
  });

  it.each(["a-class", "another-class"])(
    "should render with className %s",
    (expected) => {
      getRenderer({ className: expected });
      expect(getByTestId("FormErrors")).toHaveClass(
        `flex flex-col space-y-2 text-center ${expected}`
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
}: Partial<ComponentProps<typeof FormErrors>> = {}) {
  return render(<FormErrors {...rest}>{children}</FormErrors>);
}

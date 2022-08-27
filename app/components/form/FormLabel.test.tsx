import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import FormLabel from "./FormLabel";

const { getByTestId, getByText } = screen;

describe("<FormLabel />", () => {
  it("should have default test id", () => {
    getRenderer();
    expect(getByTestId("FormLabel")).toBeInTheDocument();
  });

  it.each(["a-class", "another-class"])(
    "should render with className %s",
    (expected) => {
      getRenderer({ className: expected });
      expect(getByTestId("FormLabel")).toHaveClass(
        `label label-text ${expected}`
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
}: Partial<ComponentProps<typeof FormLabel>> = {}) {
  return render(<FormLabel {...rest}>{children}</FormLabel>);
}

import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import FormCheckbox from "./FormCheckbox";

const { getByRole, getByTestId } = screen;

describe("<FormCheckbox />", () => {
  it("should have role", () => {
    getRenderer();
    expect(getByRole("checkbox")).toBeInTheDocument();
  });

  it("should have default test id", () => {
    getRenderer();
    expect(getByTestId("FormCheckbox")).toBeInTheDocument();
  });

  it.each(["a-class", "another-class"])(
    "should render with className %s",
    (expected) => {
      getRenderer({ className: expected });
      expect(getByTestId("FormCheckbox")).toHaveClass(`checkbox ${expected}`);
    }
  );

  it("should render checked", () => {
    getRenderer({ defaultChecked: true });
    expect(getByRole("checkbox")).toBeChecked();
  });

  it("should render unchecked", () => {
    getRenderer({ defaultChecked: false });
    expect(getByRole("checkbox")).not.toBeChecked();
  });
});

// Helpers
function getRenderer(props: Partial<ComponentProps<typeof FormCheckbox>> = {}) {
  return render(<FormCheckbox {...props} />);
}

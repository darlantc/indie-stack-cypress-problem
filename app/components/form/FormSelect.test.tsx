import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import FormSelect from "./FormSelect";

const { getByRole, getByTestId } = screen;

describe("<FormSelect />", () => {
  it("should have role", () => {
    getRenderer();
    expect(getByRole("combobox")).toBeInTheDocument();
  });

  it("should have default test id", () => {
    getRenderer();
    expect(getByTestId("FormSelect")).toBeInTheDocument();
  });

  it.each(["a-class", "another-class"])(
    "should render with className %s",
    (expected) => {
      getRenderer({ className: expected });
      expect(getByTestId("FormSelect")).toHaveClass(
        `select select-bordered ${expected}`
      );
    }
  );

  it("should render options", () => {
    const options = [
      { label: "Option 1", value: "option-1" },
      { label: "Option 2", value: "option-2" },
    ];

    getRenderer({
      children: options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      )),
    });
    userEvent.click(getByTestId("FormSelect"));
    options.forEach(({ label }) => {
      expect(getByRole("option", { name: label })).toBeInTheDocument();
    });
  });

  it.each(["option-b", "option-c"])(
    "should have selected value %p",
    (expected) => {
      const options = [
        { label: "Option A", value: "option-a" },
        { label: "Option B", value: "option-b" },
        { label: "Option C", value: "option-c" },
      ];

      getRenderer({
        defaultValue: expected,
        children: options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        )),
      });
      expect(getByTestId("FormSelect")).toHaveValue(expected);
    }
  );
});

// Helpers
function getRenderer(props: Partial<ComponentProps<typeof FormSelect>> = {}) {
  return render(<FormSelect {...props} />);
}

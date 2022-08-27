import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import Select from "./Select";

type SelectProps = ComponentProps<typeof Select>;

const { getByRole } = screen;

describe("<Select />", () => {
  it.each(["select-id", "another-id"])(
    "should render an input with an id %s",
    (expected) => {
      getRenderer({ id: expected });
      expect(getByRole("combobox")).toHaveAttribute("id", expected);
    }
  );

  it.each(["A label", "Another label"])(
    "should render an input with a label %s",
    (expected) => {
      getRenderer({ label: expected });
      expect(getByRole("combobox", { name: expected })).toBeInTheDocument();
    }
  );

  it.each([
    ["a data", "a value"],
    ["another data", "another value"],
  ])(
    "should render an input select with an %s option with value %s",
    (label, value) => {
      getRenderer({ options: [{ label, value }] });
      const select = getByRole("option");
      expect(select).toContainHTML(label);
      expect(select).toHaveValue(value);
    }
  );

  it.each(["error", "another error"])(
    "should render error message %s",
    (expected) => {
      getRenderer({ errorMessage: expected });

      const combobox = getByRole("combobox");
      expect(combobox).toHaveAttribute("aria-invalid", "true");
      expect(combobox).toHaveErrorMessage(expected);
      expect(combobox).toHaveClass("input-error");
    }
  );

  it.each(["a helper message", "another helper message"])(
    "should render helper message %s",
    (expected) => {
      getRenderer({ helperMessage: expected });

      const combobox = getByRole("combobox");
      expect(combobox).toHaveAttribute(
        "aria-describedby",
        "select-helper-message"
      );
      expect(combobox).toHaveAccessibleDescription(expected);
    }
  );

  it("should render an input with a required attribute", () => {
    getRenderer({ isRequired: true });
    expect(getByRole("combobox")).toBeRequired();
  });

  it("should render an input with a disabled attribute", () => {
    getRenderer({ isDisabled: true });
    expect(getByRole("combobox")).toBeDisabled();
  });

  it("should render a focused input", () => {
    getRenderer({ autoFocus: true });
    expect(getByRole("combobox")).toHaveFocus();
  });

  it("should render an input with some classes", () => {
    getRenderer();
    expect(getByRole("combobox")).toHaveClass(
      "input input-bordered input-md w-full"
    );
  });
});

// Helpers
function getRenderer({
  id = "select",
  label = "The Select",
  options = [],
  ...rest
}: Partial<SelectProps> = {}) {
  return render(
    <MemoryRouter>
      <Select id={id} label={label} options={options} {...rest} />
    </MemoryRouter>
  );
}

import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import FormInput from "./FormInput";

const { getByRole, getByTestId } = screen;

describe("<FormInput />", () => {
  it("should have role", () => {
    getRenderer();
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("should have default test id", () => {
    getRenderer();
    expect(getByTestId("FormInput")).toBeInTheDocument();
  });

  it.each(["a-class", "another-class"])(
    "should render with className %s",
    (expected) => {
      getRenderer({ className: expected });
      expect(getByTestId("FormInput")).toHaveClass(
        `input input-bordered input-md w-full ${expected}`
      );
    }
  );

  it.each([
    "text",
    "color",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "date",
    "time",
  ])("should render with type %s", (expected) => {
    getRenderer({ type: expected });
    expect(getByTestId("FormInput")).toHaveAttribute("type", expected);
  });

  it.each(["a placeholder", "another placeholder"])(
    "should render an input with a placeholder %s",
    (expected) => {
      getRenderer({ placeholder: expected });
      expect(getByRole("textbox")).toHaveAttribute("placeholder", expected);
    }
  );

  it.each(["a value", "another value"])(
    "should render an input with a default value %s",
    (expected) => {
      getRenderer({ defaultValue: expected });
      expect(getByRole("textbox")).toHaveValue(expected);
    }
  );

  it("should render an input with a required attribute", () => {
    getRenderer({ required: true });
    expect(getByRole("textbox")).toBeRequired();
  });

  it("should render an input with a disabled attribute", () => {
    getRenderer({ disabled: true });
    expect(getByRole("textbox")).toBeDisabled();
  });

  it("should render a focused input", () => {
    getRenderer({ autoFocus: true });
    expect(getByRole("textbox")).toHaveFocus();
  });

  it("should render an input with some classes", () => {
    getRenderer();
    expect(getByRole("textbox")).toHaveClass(
      "input input-bordered input-md w-full"
    );
  });
});

// Helpers
function getRenderer(props: Partial<ComponentProps<typeof FormInput>> = {}) {
  return render(<FormInput {...props} />);
}

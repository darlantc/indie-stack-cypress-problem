import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import FormModal from "./FormModal";

const { getByLabelText, getByRole, getByText, queryByRole } = screen;

describe("<FormModal />", () => {
  it("should render dialog", () => {
    getRenderer();
    expect(getByRole("dialog")).toBeInTheDocument();
  });

  it.each(["A title", "Another title"])(
    "should render dialog with title '%s'",
    (expected) => {
      getRenderer({ title: expected });
      expect(getByRole("heading", { name: expected })).toBeInTheDocument();
    }
  );

  it("should render dialog aria-labelled with the title", () => {
    getRenderer({ title: "Some title" });
    expect(getByLabelText("Some title")).toEqual(queryByRole("dialog"));
  });

  it.each(["/close", "/close/with/some/path"])(
    "should have link %s to close on cancel button",
    (expected) => {
      getRenderer({ onCloseLinkTo: expected });
      expect(getByRole("link", { name: "Cancelar" })).toHaveAttribute(
        "href",
        expected
      );
    }
  );

  it.each(["Child text", "Another child text"])(
    "should render dialog with children %s",
    (expected) => {
      getRenderer({ children: <div>{expected}</div> });
      expect(getByRole("dialog")).toContainElement(getByText(expected));
    }
  );

  it.each(["a-form-id", "another-form-id"])(
    "should add form id %s to submit button",
    (expected) => {
      getRenderer({ formId: expected });
      expect(getByRole("button", { name: "Submit" })).toHaveAttribute(
        "form",
        expected
      );
    }
  );
});

// Helpers
function getRenderer({
  children = "FormModal children",
  formId = "form-id",
  onCloseLinkTo = "/",
  submitButtonLabel = "Submit",
  ...rest
}: Partial<ComponentProps<typeof FormModal>> = {}) {
  return render(
    <MemoryRouter>
      <FormModal
        formId={formId}
        onCloseLinkTo={onCloseLinkTo}
        submitButtonLabel={submitButtonLabel}
        {...rest}
      >
        {children}
      </FormModal>
    </MemoryRouter>
  );
}

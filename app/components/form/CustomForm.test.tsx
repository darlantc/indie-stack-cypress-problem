import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { MemoryRouter } from "react-router";
import { z } from "zod";
import CustomForm from "./CustomForm";

const { getByRole } = screen;

// TODO: Find out why the following test suit fails:
// eslint-disable-next-line jest/no-disabled-tests
describe.skip("<CustomForm />", () => {
  it("should have role", () => {
    getRenderer();
    expect(getByRole("form")).toBeInTheDocument();
  });
});

// Helpers
function getRenderer({
  schema = defaultSchema(),
  ...props
}: Partial<ComponentProps<typeof CustomForm>> = {}) {
  return render(
    <MemoryRouter>
      <CustomForm schema={schema} {...props} />
    </MemoryRouter>
  );
}

function defaultSchema() {
  return z.object({
    name: z.string(),
    description: z.string().nullable(),
  });
}

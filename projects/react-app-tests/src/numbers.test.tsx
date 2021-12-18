import React, { Props } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Numbers from "./numbers";

describe("Test <Numbers />", () => {

  test("Should display 42", async () => {
    render(<Numbers initValue={42} />);
    const text = screen.getByText("Number is 42");
    expect(text).toBeInTheDocument();
  });

  test("Should increment number", async () => {
    const { container }  = render(<Numbers initValue={42} />)

    const incButton =  screen.getByText('+')

    fireEvent(
      incButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    const text = screen.getByText("Number is 43");
    expect(text).toBeInTheDocument();
  });

  test("Should decrement number", async () => {
    const { container }  = render(<Numbers initValue={42} />)

    const decButton =  screen.getByText('-')

    fireEvent.click(decButton)

    const text = screen.getByText("Number is 41");
    expect(text).toBeInTheDocument();
  });

});
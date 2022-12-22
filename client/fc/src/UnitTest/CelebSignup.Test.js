import { render, screen, fireEvent } from "@testing-library/react";
import CelebSignup from "../Pages/CelebSignup";
import Signup from './../Pages/CelebSignup';

//  const FormTestDetails = () => {
//    // const inputs = document.querySelectorAll('input');
//    // const loginInput = inputs[0];
// }

test("Signup when Full Name , Email and Password are entered correctly", () => {
   render(<CelebSignup Signup={Signup}/>);

   const inputs = document.querySelectorAll('input');
   const slug = inputs[0];
   const email = inputs[1];
   const password = inputs[2];
   const button = inputs[3];
   
   // const slug = screen.input("username");
   // const email = screen.input("Email");
   // const password = screen.input("password");
   // const button = screen.getByRole("button");


   fireEvent.change(slug, { target: { value: "Huzaifa Rehman" } })
   fireEvent.change(email, { target: { value: "huzaifa@gmail.com" } })
   fireEvent.change(password, { target: { value: "Huzaifa123." } })

   expect(button).tobeEnabled();

})

// BUTTON ONCLICK NOT PRESSED
test("Cannot Submit form when button is NOT clicked", () => {
   const onSubmit = jest.fn();
   render(<CelebSignup Signup={Signup} onClick={onSubmit} />);

   const button = screen.getByRole("button");

   fireEvent.click(button);
   expect(onSubmit).toHaveBeenCalledTimes(0);

})

test("Submit form when button is clicked", () => {
   const onSubmit = jest.fn();
   render(<CelebSignup Signup={Signup} onClick={onSubmit} />);

   const inputs = document.querySelectorAll('input');
   const slug = inputs[0];
   const email = inputs[1];
   const password = inputs[2];
   const button = inputs[3];

   // const slug = screen.input("username");
   // const email = screen.input("Email");
   // const password = screen.input("password");
   // const button = screen.getByRole("button");
   fireEvent.change(slug, { target: { value: "Huzaifa Rehman" } })
   fireEvent.change(email, { target: { value: "huzaifa@gmail.com" } })
   fireEvent.change(password, { target: { value: "Huzaifa123." } })
   fireEvent.click(button);
   expect(onSubmit).toHaveBeenCalledTimes(1);

})
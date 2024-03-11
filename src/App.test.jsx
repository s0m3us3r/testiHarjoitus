import App from "./App";
import { test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoTable from './TodoTable';
//The screen method returns an object that provides queries (i.e. getByText, getByLabelText etc.) 
//that are bound to the whole rendered document.body. These queries can be used to find elements from the HTML document.
import '@testing-library/jest-dom/vitest';

//renders App component
test("renders header", () => {
    render(<App />);
    const header = screen.getByText(/My Todolist/i);//regular expression pattern/ i-flag at the end stands for case-insensitive
    expect(header).toBeInTheDocument();
  });

//The following code show test case for the stateless TodoTable component. It adds one todo item to the table 
//and check that it is displayed.
//We use getByRole() to find the table element and toHaveTextContent() for assertion.

  test('renders todotable', () => {
    const row = [
      {desc: 'Go to coffee', date: '24.01.2023'}
    ];
    render(<TodoTable todos={row} />);
    const table = screen.getByRole('table');
    expect(table).toHaveTextContent((/go to coffee/i));
  });


  test("add todo", () => {
    render(<App />);
    //add value to the input elements
    const desc = screen.getByPlaceholderText("Description");
    fireEvent.change(desc, { target: { value: "Go to coffee" } });
    const date = screen.getByPlaceholderText("Date");
    fireEvent.change(date, { target: { value: "29.01.2023" } });
    //use fireEvent to click the Add button
    const button = screen.getByText("Add");
    fireEvent.click(button);
    //new todo item should be added to the table and we can use the following statements to assert 
    const table = screen.getByRole("table");
    expect(table).toHaveTextContent(/go to coffee/i);
  });

  // Lisää ensin todo, sen jälkeen poista se painamalla 'Clear' painiketta ja testaa että tehtävän tekstiä ei enää löydy.
  test("clear todos", () => {
    render(<App />);
    //add value to the input elements
    const desc = screen.getByPlaceholderText("Description");
    fireEvent.change(desc, { target: { value: "Go to coffee" } });
    const date = screen.getByPlaceholderText("Date");
    fireEvent.change(date, { target: { value: "29.01.2023" } });
    //use fireEvent to click the Add button
    const button1 = screen.getByText("Add");
    fireEvent.click(button1);
    //use fireEvent to click the Clear button
    const button = screen.getByText("Clear");
    fireEvent.click(button);
    //
    const table = screen.getByRole("table");
    expect(table).not.toHaveTextContent(/go to coffee/i);
  });

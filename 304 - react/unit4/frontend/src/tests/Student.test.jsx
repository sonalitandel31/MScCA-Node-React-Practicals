import { render, screen } from "@testing-library/react";
import Student from "../components/Student";

describe("Student Component", () => {
    test("renders student component correctly", () => {
        render(<Student />);

        expect(
            screen.getByText("Student Information")
        ).toBeInTheDocument();
    });

    test("displays student name", () => {
        render(<Student />);

        expect(
            screen.getByText(/Rahul Patel/i)
        ).toBeInTheDocument();
    });

    test("displays student course", () => {
        render(<Student />);

        expect(
            screen.getByText(
                /MSc Computer Application/i
            )
        ).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { container } = render(
            <Student />
        );

        expect(container).toMatchSnapshot();
    });
});
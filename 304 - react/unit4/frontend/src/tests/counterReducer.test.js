import counterReducer, {
    DECREMENT,
    INCREMENT,
    RESET,
    initialState,
} from "../redux/counterReducer";

describe("Counter Reducer", () => {
    test("should return initial state", () => {
        const result = counterReducer(
            undefined,
            {}
        );

        expect(result).toEqual(initialState);
    });

    test("should increment counter", () => {
        const result = counterReducer(
            { count: 0 },
            { type: INCREMENT }
        );

        expect(result).toEqual({
            count: 1,
        });
    });

    test("should decrement counter", () => {
        const result = counterReducer(
            { count: 5 },
            { type: DECREMENT }
        );

        expect(result).toEqual({
            count: 4,
        });
    });

    test("should reset counter", () => {
        const result = counterReducer(
            { count: 10 },
            { type: RESET }
        );

        expect(result).toEqual({
            count: 0,
        });
    });
});
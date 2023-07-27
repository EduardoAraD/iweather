import { getNextDays } from "./getNextDays";

describe("getNextDays", () => {
  // test = it
  it("should be return the next five days", () => {
    // Executar o nosso test
    const days = getNextDays();
    
    expect(days.length).toBe(5);
  })
})

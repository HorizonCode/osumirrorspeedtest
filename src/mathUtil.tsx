export function calculateAverageWithMinMax(numbers: number[]): { average: number; highest: number; lowest: number } {
    if (numbers.length === 0) {
      throw new Error("Array is empty");
    }
  
    const { sum, highest, lowest } = numbers.reduce(
      (accumulator, number) => {
        return {
          sum: accumulator.sum + number,
          highest: Math.max(accumulator.highest, number),
          lowest: Math.min(accumulator.lowest, number),
        };
      },
      { sum: 0, highest: numbers[0], lowest: numbers[0] }
    );
  
    const average = sum / numbers.length;
  
    return { average, highest, lowest };
  }
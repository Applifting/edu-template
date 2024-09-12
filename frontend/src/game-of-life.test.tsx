import 'vitest';

// 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function willSurvive(isAlive: boolean, aliveNeighboursCount: number) {
  if (!isAlive) {
    return aliveNeighboursCount === 3;
  }

  return aliveNeighboursCount >= 2 && aliveNeighboursCount < 4;
}

function getCellSurroundings() {
  return [
    [-1, 0],
    [-1, 1],
  ];
}

describe('getCellSurroundings', () => {
  it('x = 0, y = 0', () => {
    expect(getCellSurroundings([0, 0])).toContainEqual([-1, 0]);
    expect(getCellSurroundings([0, 0])).toContainEqual([-1, 1]);
  });
});
describe('1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.', () => {
  it('alive with 1 -> dead', () => {
    expect(willSurvive(true, 1)).toBe(false);
  });
});
describe('2. Any live cell with two or three live neighbours lives on to the next generation.', () => {
  it('alive with 2 -> alive', () => {
    expect(willSurvive(true, 2)).toBe(true);
  });
});
describe('3. Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
  it('alive with 4 -> dead', () => {
    expect(willSurvive(true, 4)).toBe(false);
  });
});
describe('4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', () => {
  it('dead with 2 -> dead', () => {
    expect(willSurvive(false, 2)).toBe(false);
  });
  it('dead with 3 -> alive', () => {
    expect(willSurvive(false, 3)).toBe(true);
  });
  it('dead with 5 -> dead', () => {
    expect(willSurvive(false, 5)).toBe(false);
  });
});

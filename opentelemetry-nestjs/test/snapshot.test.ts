describe('Snapshot Example Test', () => {
  it('test simple shanpshot', () => {
    expect({ a: 1, b: 2 }).toMatchSnapshot();
  });
});

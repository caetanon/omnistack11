const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate Unque ID', () => {
  it('should generate an unique id', () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  })
})
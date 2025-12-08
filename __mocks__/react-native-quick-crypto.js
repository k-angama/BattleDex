const createHmac = jest.fn(() => {
  const update = jest.fn().mockReturnThis();
  const digest = jest.fn().mockReturnValue('mocked-signature');

  return {
    update,
    digest,
  };
});

const mock = {
  createHmac,
};

module.exports = mock;
module.exports.default = mock;

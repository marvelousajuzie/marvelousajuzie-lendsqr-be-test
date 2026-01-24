
const createMockQueryBuilder = () => ({
  where: jest.fn().mockReturnThis(),
  first: jest.fn().mockResolvedValue(null),
  insert: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  returning: jest.fn().mockResolvedValue([]),
  increment: jest.fn().mockResolvedValue(1),
  decrement: jest.fn().mockResolvedValue(1),
  orderBy: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  offset: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  del: jest.fn().mockResolvedValue(1),
});

const mockDb: any = jest.fn(() => createMockQueryBuilder());
mockDb.transaction = jest.fn().mockResolvedValue({
  commit: jest.fn().mockResolvedValue(undefined),
  rollback: jest.fn().mockResolvedValue(undefined),
});
mockDb.fn = {
  now: jest.fn(() => new Date()),
};

jest.mock('../config/database', () => ({
  __esModule: true,
  default: mockDb,
}));

global.console.error = jest.fn();
global.console.log = jest.fn();
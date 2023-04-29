import { CorrelationIdMiddleware } from './correlation-id.middleware';

export const CORRELATION_ID_HEADER = 'X-Correlation-Id';
describe('CorrelationIdMiddleware', () => {
  let middleware: CorrelationIdMiddleware;
  let req: any;
  let res: any;
  let next: () => void;

  beforeEach(() => {
    middleware = new CorrelationIdMiddleware();
    req = {
      headers: {},
    };
    res = {
      set: jest.fn(),
    };
    next = jest.fn();
  });

  it('should generate a correlation ID for the request and set it on the request headers', () => {
    middleware.use(req, res, next);

    expect(req[CORRELATION_ID_HEADER]).toBeDefined();
  });

  it('should generate a correlation ID for the request and set it on the response headers', () => {
    middleware.use(req, res, next);

    expect(res.set).toHaveBeenCalledWith(
      CORRELATION_ID_HEADER,
      req[CORRELATION_ID_HEADER],
    );
  });

  it('should call the next function', () => {
    middleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

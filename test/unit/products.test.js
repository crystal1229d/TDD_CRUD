const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');

productModel.create = jest.fn(); // Product model 파일에 의존하지 않기 위해 사용. productModel.create 함수가 잘 작동할거라는 가정하에 mock function으로 생성

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn(); // null => jest.fn()
})

describe('Product Controller Create', () => { // 테스트 그룹

    beforeEach(() => {
        req.body = newProduct;
    })
    
    // it() or test() : 테스트 케이스 
    it ('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function');
    })
    it ('should call ProductModel.create', async () => {
        await productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })
    it ('should return 201 response code', async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy(); // _isEndCalled : 결과값이 잘 전송됐는지 확인
    })
    it ('should return json body in response', async () => {
        productModel.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    })
    it ('should handle errors', async () => {
        const errorMessage = { message: 'description propery missing' };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })

})
const productController = require('../../controller/products');
const productModel = require('../../models/Product');

productModel.create = jest.fn(); // Product model 파일에 의존하지 않기 위해 사용

describe('Product Controller Create', () => { // 테스트 그룹
    // it() or test() : 테스트 케이스 
    
    it('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function');
    })

    it('should call ProductModel.create', () => {
        productController.createProduct();
        expect(productModel.create).toBeCalled();
    })
})
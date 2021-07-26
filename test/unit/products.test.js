describe('Product Controller Create', () => { // 테스트 그룹
    // it() or test() : 테스트 케이스 
    it('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function');
    })
})
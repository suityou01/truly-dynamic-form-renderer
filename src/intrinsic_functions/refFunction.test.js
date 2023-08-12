const RefFunction = require("./refFunction");
describe('./src/intrinsic_functions/refFunction.js', () => {
    test('should return odd items from an array', () => {
        const refExpression = '!Ref $item{even}';
        const state = [
            1,
            'iPhone 9',
            2,
            'iPhone X',
            3,
            'Samsung Universe 9',
            4,
            'OPPOF19',
            5,
            'Huawei P30',
            6,
            'MacBook Pro',
            7,
            'Samsung Galaxy Book',
            8,
            'Microsoft Surface Laptop 4',
            9,
            'Infinix INBOOK',
            10,
            'HP Pavilion 15-DK1056WM',
            11,
            'perfume Oil',
            12,
            'Brown Perfume',
            13,
            'Fog Scent Xpressio Perfume',
            14,
            'Non-Alcoholic Concentrated Perfume Oil',
            15,
            'Eau De Perfume Spray',
            16,
            'Hyaluronic Acid Serum',
            17,
            'Tree Oil 30ml',
            18,
            'Oil Free Moisturizer 100ml',
            19,
            'Skin Beauty Serum.',
            20,
            'Freckle Treatment Cream- 15gm',
            21,
            '- Daal Masoor 500 grams',
            22,
            'Elbow Macaroni - 400 gm',
            23,
            'Orange Essence Food Flavou',
            24,
            'cereals muesli fruit nuts',
            25,
            'Gulab Powder 50 Gram',
            26,
            'Plant Hanger For Home',
            27,
            'Flying Wooden Bird',
            28,
            '3D Embellishment Art Lamp',
            29,
            'Handcraft Chinese style',
            30,
            'Key Holder'
        ];
        const refFunction = new RefFunction({ refExpression: refExpression, state: state });
        const result = refFunction.execute();
        expect(result).toEqual([
            1,  2,  3,  4,  5,  6,  7,  8,  9,
           10, 11, 12, 13, 14, 15, 16, 17, 18,
           19, 20, 21, 22, 23, 24, 25, 26, 27,
           28, 29, 30
        ]);
    });
    test('should return items from an array as a function of a comparator', () => {
        const refExpression = '!Ref $item{even} eq 1';
        const state = [
            1,
            'iPhone 9',
            2,
            'iPhone X',
            3,
            'Samsung Universe 9',
            4,
            'OPPOF19',
            5,
            'Huawei P30',
            6,
            'MacBook Pro',
            7,
            'Samsung Galaxy Book',
            8,
            'Microsoft Surface Laptop 4',
            9,
            'Infinix INBOOK',
            10,
            'HP Pavilion 15-DK1056WM',
            11,
            'perfume Oil',
            12,
            'Brown Perfume',
            13,
            'Fog Scent Xpressio Perfume',
            14,
            'Non-Alcoholic Concentrated Perfume Oil',
            15,
            'Eau De Perfume Spray',
            16,
            'Hyaluronic Acid Serum',
            17,
            'Tree Oil 30ml',
            18,
            'Oil Free Moisturizer 100ml',
            19,
            'Skin Beauty Serum.',
            20,
            'Freckle Treatment Cream- 15gm',
            21,
            '- Daal Masoor 500 grams',
            22,
            'Elbow Macaroni - 400 gm',
            23,
            'Orange Essence Food Flavou',
            24,
            'cereals muesli fruit nuts',
            25,
            'Gulab Powder 50 Gram',
            26,
            'Plant Hanger For Home',
            27,
            'Flying Wooden Bird',
            28,
            '3D Embellishment Art Lamp',
            29,
            'Handcraft Chinese style',
            30,
            'Key Holder'
        ];
        const refFunction = new RefFunction({ refExpression: refExpression, state: state });
        const result = refFunction.execute();
        expect(result).toEqual([
            true,  false,  false,  false,  false,  false,  false,  false,  false,
           false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false,
           false, false, false
        ]);
    });
});
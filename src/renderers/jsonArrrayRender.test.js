const JSONArrayRenderer = require("./jsonArrayRenderer");
const IntrinsicFunctions = require("../intrinsic_functions/refFunction");

const json = [
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
describe('./src/renderers/jsonArrayRender.js', () => {
    it('should render a simple array', () => {
        const renderSpec = {
            value: "!Ref $item{even}",
            text: "!Ref $item{odd}",
            selected: "!Ref $item{even} eq 1"
        }
        const intrinsicFunctions = new IntrinsicFunctions();
        let jsonArrayRender = new JSONArrayRenderer(json, renderSpec, intrinsicFunctions);
        const renderedJson = jsonArrayRender.render();
        console.log(renderedJson);
    });
});
describe('Test the Items information', function() {
  var allItems;
  var inputs;

  beforeEach(function() {
    allItems = loadAllItems();
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });
  var expectResult= [
  {Item: {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },count:5},
  {Item:{
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },count:2},
  {Item:{
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    },count:3}
  ];

  it('show the Items and its count', function() {
    var result = getItems(inputs,allItems);
    expect(result).toEqual(expectResult);
  });

});
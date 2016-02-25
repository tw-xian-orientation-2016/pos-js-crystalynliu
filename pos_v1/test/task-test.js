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

describe('Test the  getCartItems', function() {
  var promotions;
  var inputs;

  beforeEach(function() {
    promotions = loadPromotions();
    inputs = [
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
  });
  var expectResult= [
  {product: {Item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },count:5},total:12.00,save:3.00},
  {product: {Item:{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },count:2},total:30.00,save:0.00},
  {product: {Item:{
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },count:3},total:9.00,save:4.50}
  ];

  it('show the total and save', function() {
    var result = getCartItems(inputs,promotions);
    expect(result).toEqual(expectResult);
  });

});

describe('Test the  getReceipt', function() {
  var promotions;
  var inputs;

  beforeEach(function() {
    inputs = [
        {product: {Item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },count:5},total:12.00,save:3.00},
  {product: {Item:{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },count:2},total:30.00,save:0.00},
  {product: {Item:{
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },count:3},total:9.00,save:4.50}
      ];
  });
  var expectResult= {
      'CartItems':{
        {product: {Item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },count:5},total:12.00,save:3.00},
        {product: {Item:{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },count:2},total:30.00,save:0.00},
        {product: {Item:{
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },count:3},total:9.00,save:4.50}
        },'totalPrice':51.00,'totalSave':7.50}
  };

  it('show the total and save', function() {
    var result = getReceipt(inputs);
    expect(result).toEqual(expectResult);
  });

});



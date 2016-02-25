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
  {Item:allItems[1],count:5},
  {Item:allItems[3],count:2},
  {Item:allItems[5],count:3}];

  it('show the Items and its count', function() {
    var result = getItems(inputs,allItems);
    expect(result).toEqual(expectResult);
  });

});
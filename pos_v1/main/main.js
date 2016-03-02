function printReceipt(inputs){
	var allItems = loadAllItems();
	var promotions = loadPromotions() ;

	var products = getItems(inputs,allItems);
	var cartItems = getCartItems(products,promotions);
	var Receipt = getReceipt(cartItems);
	var printText = print(Receipt);

	console.log(printText);
}


function getItems(Tags,allItems){
  var barcodeCounts = getBarcodeCounts(Tags);
  var product;
  return products = barcodeCounts.map(function(barcodeCount){
    allItems.forEach(function(item){
      if(barcodeCount.barcode===item.barcode){
        product =  {Item:item,count:barcodeCount.count}; 
      }
    })
    return product;
  })
}

function getBarcodeCounts(Tags) {
  var barcodeCounts=[];
  var index;
  Tags.forEach(function(tag){

    var tagArr = tag.split('-');
    var barcode = tagArr[0];
    var count = parseFloat(tagArr[1] || 1);

    index = findBarcodeIndex(barcodeCounts,barcode);
    if(barcodeCounts.length === 0 || index === undefined){
      barcodeCounts.push({barcode:barcode,count:count});
    }else{
      barcodeCounts[index].count += count;
    }

  })

  return barcodeCounts;
}


function findBarcodeIndex(barcodeCounts,barcode){
    for (var i = 0; i < barcodeCounts.length; i++) {
      if(barcodeCounts[i].barcode===barcode){
        return i;
      }
    }
}

function getCartItems(products,promotions){
	var cartItems =[];
  var type;
	
	return cartItems = products.map(function(product){
		var count = product.count;
		var price = product.Item.price;
    
    var total = price*count;
    var save = 0; 

    type = findCartItemType(product.Item.barcode,promotions);
    if(type){
      save = calculateSave(count,price);
      total =total-save;
    }
		return {'product':product,'total':total,'save':save};
	})
}

function findCartItemType(barcode,promotions){
  for(var i = 0; i < promotions.length;i++){
     barcodes = promotions[i].barcodes;
     for(var k = 0;k < barcodes.length;k++){
      if(barcode===barcodes[k]){
        return promotions[i].type;
      }
     }
  }
}

function calculateSave(count,price){
  var times = parseInt(count/3);
  return times*price;
}

function getReceipt(cartItems){
	var totalPrice = 0;
	var totalSave = 0;
	cartItems.forEach(function(cartItem){
		totalPrice += cartItem.total;
		totalSave += cartItem.save;
	})
	return {'cartItems':cartItems,'totalPrice':totalPrice,'totalSave':totalSave};
}

function print(Receipt){

	var receiptText='***<没钱赚商店>收据***\n' ;
  Receipt.cartItems.forEach(function(cartItem){
    receiptText+=
    "名称："+cartItem.product.Item.name+
    "，数量："+cartItem.product.count+cartItem.product.Item.unit+
    "，单价："+priceFormat(cartItem.product.Item.price)+
    "(元)，小计："+priceFormat(cartItem.total)+
    '(元)\n';
  })

	receiptText+='----------------------\n' +
	'总计：'+priceFormat(Receipt.totalPrice)+'(元)\n' +
	'节省：'+priceFormat(Receipt.totalSave)+'(元)\n' +
  '**********************' ;
	return receiptText;
}

function priceFormat(price){
  if(!/\./.test(price)) //为整数字符串在末尾添加.00
      price += '.00';
  price += '00';        //在字符串末尾补零
  price = price.match(/\d+\.\d{2}/)[0];
  return price;
};
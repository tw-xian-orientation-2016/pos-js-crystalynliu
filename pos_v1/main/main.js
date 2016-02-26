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
  var products = barcodeCounts.map(function(barcodeCount){
    allItems.forEach(function(item){
      if(barcodeCount.barcode===item.barcode){
        product =  {Item:item,count:barcodeCount.count}; 
      }
    })
    return product;
  })
  return products;
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
	var Receipt = {'cartItems':cartItems,'totalPrice':totalPrice,'totalSave':totalSave};
	return Receipt;
}

function print(Receipt){
	var receiptText ;
	receiptText='***<没钱赚商店>收据***\n' ;
	for (var i = 0; i < Receipt.cartItems.length; i++) {
		receiptText+="名称："+Receipt.cartItems[i].product.Item.name+"，数量："+Receipt.cartItems[i].product.count+
		Receipt.cartItems[i].product.Item.unit+"，单价："+getFloatStr(Receipt.cartItems[i].product.Item.price)+"(元)，小计："+getFloatStr(Receipt.cartItems[i].total)+
		'(元)\n';
	}
	receiptText+='----------------------\n' +
	'总计：'+getFloatStr(Receipt.totalPrice)+'(元)\n' +
	'节省：'+getFloatStr(Receipt.totalSave)+'(元)\n' +'**********************' ;
	return receiptText;
}

var getFloatStr = function(num){
        num += '';
        num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符
        
        if(/^0+/) //清除字符串开头的0
            num = num.replace(/^0+/, '');
        if(!/\./.test(num)) //为整数字符串在末尾添加.00
            num += '.00';
        if(/^\./.test(num)) //字符以.开头时,在开头添加0
            num = '0' + num;
        num += '00';        //在字符串末尾补零
        num = num.match(/\d+\.\d{2}/)[0];
        return num;
    };
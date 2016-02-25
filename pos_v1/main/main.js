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
	var products = [];
	var barcodes = getCount(Tags);
	for(var i = 0;i<barcodes.length;i++){
		for(var j=0;j<allItems.length;j++){
			if(barcodes[i].barcode===allItems[j].barcode){
				products.push({Item:allItems[j],count:parseInt(barcodes[i].count)});
			}
		}
	}
	return products;
}

function getCount(Tags) {
	var barcodes=[];
	for(var i = 0;i<Tags.length;i++){
		var stringArr = Tags[i].split('-');
		var tag = {'barcode':stringArr[0],
		'count':stringArr.length>1?stringArr[1]:1};
		if(barcodes.length===0){
			barcodes.push(tag);
			continue;
		}
		if(barcodes[barcodes.length-1].barcode===tag.barcode){
			barcodes[barcodes.length-1].count++;
		}else{
			barcodes.push(tag);
		}
	}
	return barcodes;
}

function getCartItems(products,promotions){
	var cartItems =[];
	var total;var save;
	for(var i=0;i<products.length;i++){
		var count = products[i].count;
		var price = products[i].Item.price;
		for(var j=0;j<promotions[0].barcodes.length;j++){
			if(products[i].Item.barcode==promotions[0].barcodes[j]){
				var times=parseInt(count/3);
				total = times>0?(count-times)*price:count*price;
				save = times*price;
				break;
			}else{
				total=count*price;
				save=0;
			}
		}
		cartItems.push({'product':products[i],'total':total,'save':save});
	}
	return cartItems;
}

function getReceipt(cartItems){
	var totalPrice = 0;
	var totalSave = 0;
	for (var i = 0; i < cartItems.length; i++) {
		totalPrice += cartItems[i].total;
		totalSave += cartItems[i].save;
	}
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
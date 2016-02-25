function getItems(Tags,allItems){
	var products = [];
	var barcodes = getCount(Tags);
	for(var i = 0;i<barcodes.length;i++){
		for(j=0;j<allItems.length;j++){
			if(barcodes[i].barcode===allItems[j].barcode){
				var object = {Item:allItems[j],count:parseInt(barcodes[i].count)};
				products.push(object);
			}
		}
	}
	return products;
}

function getCount(Tags) {
	var barcodes=[];
	for(var i = 0;i<Tags.length;i++){
		var stringArr = Tags[i].split('-');
		var tag = {'barcode':stringArr[0],'count':1};
		if(stringArr.length>1){
			tag.count = stringArr[1];
		}
		if(barcodes.length!=0){
			if(barcodes[barcodes.length-1].barcode==tag.barcode){
				barcodes[barcodes.length-1].count++;
			}
			else{
				barcodes.push(tag);
			}
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
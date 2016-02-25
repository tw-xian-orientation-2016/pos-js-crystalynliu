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
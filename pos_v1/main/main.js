function getItems(Tags,allItems){
	var products = [];
	var barcodes = getCount(Tags);
	return products;
}

function getCount(Tags) {
	var barcodes=[];
	for(var i = 0;i<Tags.length;i++){
		var stringArr = Tags[i].split('-');
		var tag = {'barcode':stringArr[0],'count':0};
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
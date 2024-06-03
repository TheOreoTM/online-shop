export type Item = {
	id: string;
	itemName: string;
	itemDsc: string;
	category: string;
	itemCode: string;
	barcode: string;
	itemQty: string;
	itemPrice: string;
	expirydate: string | null;
	minqty: string;
	status: string;
	discount?: number;
};

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

export type CartItem = {
	id: string;
	name: string;
	price: number;
	quantity: number;
	discount?: number;
	code: string;
};

export const enum Roles {
	Admin = 'ADMIN',
	User = 'USER',
	Guest = 'GUEST'
}

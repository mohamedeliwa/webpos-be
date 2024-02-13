enum Privileges {
  placeOrder = 'placeOrder',
  items = 'items',
  orders = 'orders',
}

export class TokenResponseDto {
  token: string;
  fullName: string;
  organization: string;
  expireDate: string;
  privileges: Privileges[];
  configurations: {
    placeOrder: {
      referenceNo: string;
    };
  };
}

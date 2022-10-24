export interface AccountEntry {
  id: string;
  merchantId: string;
  paymentNode: number;
  cnpjRoot: number;
  date: string;
  paymentType: PaymentType,
  cardBrand: CardBrand,
  authorizationCode: string;
  truncatedCardNumber: string;
  grossAmount: number;
  netAmount: number;
  terminal: number;
  administrationFee: number;
  channelCode: number;
  channel: EntryChannel;
  withdrawAmount: number;
  minimumMDRAmmount: number;
  mdrTaxAmount: number;
  mdrFeeAmount: number;
  status: EntryStatus;
}

export enum EntryStatus {
  approved = 'Aprovada',
  rejected = 'Rejeitada',
}

export enum EntryChannel {
  link = 'Super Link / Digitada',
  machine = 'Máquina',
}

export enum CardBrand {
  master = 'Mastercard',
  visa = 'Visa',
}

export enum PaymentType {
 credit = 'Crédito à vista',
 creditWithInstalments = 'Crédito parcelado',
 debit = 'Débito'
}

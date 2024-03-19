import { Hex } from '@metamask/utils';
import { TokenStandard } from '../../../../shared/constants/transaction';
import { Numeric } from '../../../../shared/modules/Numeric';

export const FIAT_UNAVAILABLE = 'Fiat Unavailable';

/**
 * Describes an amount of fiat.
 */
export type FiatAmount = Numeric | typeof FIAT_UNAVAILABLE;

/**
 * Identifies the native asset of a chain.
 */
export type NativeAssetIdentifier = Readonly<{
  standard: TokenStandard.none;
  address?: undefined;
  tokenId?: undefined;
}>;

/**
 * Uniquely identifies an ERC20 token on a chain.
 */
export type Erc20AssetIdentifier = {
  standard: TokenStandard.ERC20;
  address: Hex;
  tokenId?: undefined;
};

/**
 * Uniquely identifies an ERC721 token on a chain.
 */
export type Erc721AssetIdentifier = {
  standard: TokenStandard.ERC721;
  address: Hex;
  tokenId: Hex;
};

/**
 * Uniquely identifies an ERC1155 token on a chain.
 */
export type Erc1155AssetIdentifier = {
  standard: TokenStandard.ERC1155;
  address: Hex;
  tokenId: Hex;
};

/**
 * Uniquely identifies an asset on a chain.
 */
export type AssetIdentifier = Readonly<
  | NativeAssetIdentifier
  | Erc20AssetIdentifier
  | Erc721AssetIdentifier
  | Erc1155AssetIdentifier
>;

/**
 * Represents an amount of an asset, including its magnitude and sign.
 */
export type Amount = Readonly<{
  /**
   * Indicates whether the amount is negative (e.g., a decrease in balance).
   */
  isNegative: boolean;

  /**
   * The quantity of the smallest denomination of the asset (base units),
   * represented as a hexadecimal string.
   * For example: In the case of ETH, this would be the number of wei.
   */
  quantity: Hex;

  /**
   * The number of decimal places the associated asset supports.
   *
   * This value is the negation of the exponent used when converting
   * the quantity to the decimal amount of a token.
   *
   * To calculate the token amount in decimal form, use the formula:
   * `tokenAmount = hexToDecimal(quantity) / (10 ^ decimals)`
   *
   * Example: If the asset is ETH, the quantity is expressed in wei
   * (the smallest unit of ETH) and decimals would be 18. The amount
   * of ETH tokens would be: `ethAmount = quantity / (10 ^ 18)`
   */
  decimals: number;

  /**
   * The numeric representation of the amount, taking into account the
   * sign, quantity and decimals.
   */
  numeric: Numeric;
}>;

/**
 * Describes a change in an asset's balance to a user's wallet.
 */
export type BalanceChange = {
  /**
   * The asset identifier for the balance change.
   */
  asset: AssetIdentifier;
  /**
   * The amount of the asset that changed.
   */
  amount: Amount;
  /**
   * The amount of fiat currency that corresponds to the asset amount.
   */
  fiatAmount: FiatAmount;
};

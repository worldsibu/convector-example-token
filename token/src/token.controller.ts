/** @module @worldsibu/convector-examples-token */

import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { Token } from './token.model';
import { ChaincodeTx } from '@worldsibu/convector-core-chaincode';

@Controller('token')
export class TokenController extends ConvectorController<ChaincodeTx> {
  private initialized = false;

  @Invokable()
  public async init(
    @Param(Token)
    token: Token
  ) {
    if (this.initialized) {
      throw new Error('Token has already been initialized');
    }

    const totalSupply = Object.keys(token.balances)
      .reduce((total, fingerprint) => total + token.balances[fingerprint], 0);

    if (totalSupply === 0) {
      token.balances[this.sender] = token.totalSupply;
    } else if (totalSupply !== token.totalSupply) {
      throw new Error('The total supply does not match with the initial balances');
    }

    await token.save();
  }

  @Invokable()
  public async transfer(
    @Param(yup.string())
    tokenId: string,
    @Param(yup.string())
    to: string,
    @Param(yup.number().moreThan(0))
    amount: number
  ) {
    const token = await Token.getOne(tokenId);

    if (token.balances[this.sender] < amount) {
      throw new Error('The sender does not have enough founds');
    }

    token.balances[to] = token.balances[to] || 0;

    token.balances[to] += amount;
    token.balances[this.sender] -= amount;

    await token.save();
  }
}

import * as transferRepository from '../../dataAccess/transaction/transferRepository.js';
import * as bankAccountRepository from '../../dataAccess/banks/bankAccountRepository.js';

import { checkResourceExists } from '../../utils/checkResourceExists.js';
import constants from '../../utils/constants.js';
import BadRequestError from '../../utils/badRequestError.js';

const isBankAccountExist = async (bankAccountId) => {
  const bankAccount = await bankAccountRepository.findById(bankAccountId);
  return checkResourceExists(bankAccount, constants.BANK_NOT_FOUND);
};

const isTransferExist = async (transferId) => {
  const transfer = await transferRepository.findById(transferId);
  return checkResourceExists(transfer, constants.TRANSACTIONS_NOT_FOUND);
};

const bankAccountBalance = (balance, amountTotal) => {
  if (balance < amountTotal) {
    throw new BadRequestError(constants.BANK_ACCOUNT_BALANCE_NOT_ENOUGH, 400);
  }
};

const updateBankAccountBalance = async (
  sender,
  recipient,
  senderBalance,
  recipientBalance
) => {
  await sender.update({
    balance: senderBalance,
  });
  await recipient.update({
    balance: recipientBalance,
  });
};

export const addTransfer = async (userId, data) => {
  const { amountTotal, senderId, recipientId, note } = data;

  const sender = await isBankAccountExist(senderId);
  const recipient = await isBankAccountExist(recipientId);

  const balanceSenderBefore = sender.balance;
  const balanceSenderAfter = sender.balance - +amountTotal;

  const balanceRecipientBefore = recipient.balance;
  const balanceRecipientAfter = recipient.balance + +amountTotal;

  bankAccountBalance(sender.balance, +amountTotal);

  await transferRepository.createOne({
    amountTotal,
    balanceSenderBefore,
    balanceSenderAfter,
    balanceRecipientBefore,
    balanceRecipientAfter,
    senderId,
    recipientId,
    createdBy: userId,
    note,
  });

  await updateBankAccountBalance(
    sender,
    recipient,
    balanceSenderAfter,
    balanceRecipientAfter
  );

  return { message: constants.CREATE_TRANSFER_SUCCESS };
};

export const updateTransfer = async (transactionId, data) => {
  const { amountTotal, note } = data;

  const transfer = await isTransferExist(transactionId);

  const deffrence = amountTotal - transfer.amountTotal;

  const sender = await isBankAccountExist(transfer.senderId);
  const recipient = await isBankAccountExist(transfer.recipientId);

  const balanceSenderAfter = sender.balance - deffrence;
  const balanceRecipientAfter = recipient.balance + deffrence;

  await updateBankAccountBalance(
    sender,
    recipient,
    balanceSenderAfter,
    balanceRecipientAfter
  );

  await transfer.update({
    amountTotal,
    balanceSenderAfter,
    balanceRecipientAfter,
    note,
  });

  return { message: constants.UPDATE_TRANSACTION_SUCCESS };
};

export const deleteTransfer = async (transactionId) => {
  const transfer = await isTransferExist(transactionId);

  const sender = await isBankAccountExist(transfer.senderId);
  const recipient = await isBankAccountExist(transfer.recipientId);

  const balanceSenderBefore = transfer.balanceSenderBefore;
  const balanceRecipientBefore = transfer.balanceRecipientBefore;

  await updateBankAccountBalance(
    sender,
    recipient,
    balanceSenderBefore,
    balanceRecipientBefore
  );

  await transferRepository.deleteOne(transactionId);

  return { message: constants.DELETE_TRANSACTION_SUCCESS };
};

export const findAllTransfers = async () => {
  const { transfers, pagination } = await transferRepository.findAll();
  return { transfers, pagination };
};

export const findTransfer = async (transactionId) => {
  await isTransferExist(transactionId);
  const transfer = await transferRepository.findById(transactionId);
  return { transfer };
};

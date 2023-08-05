const transferRepository = require('../../dataAccess/transaction/transferRepository.js');
const bankAccountRepository = require('../../dataAccess/banks/bankAccountRepository.js');

const { checkResourceExists } = require('../../utils/checkResourceExists.js');
const constants = require('../../utils/constants.js');
const BadRequestError = require('../../utils/badRequestError.js');

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

exports.addTransfer = async (userId, data) => {
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

exports.updateTransfer = async (transactionId, data) => {
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

exports.deleteTransfer = async (transactionId) => {
  const transfer = await isTransferExist(transactionId);

  const sender = await isBankAccountExist(transfer.senderId);
  const recipient = await isBankAccountExist(transfer.recipientId);

  const balanceSenderAfter = sender.balance + +transfer.amountTotal;
  const balanceRecipientAfter = recipient.balance - +transfer.amountTotal;

  await updateBankAccountBalance(
    sender,
    recipient,
    balanceSenderAfter,
    balanceRecipientAfter
  );

  await transferRepository.deleteOne(transactionId);

  return { message: constants.DELETE_TRANSACTION_SUCCESS };
};

exports.findAllTransfers = async (query) => {
  const { page, limit, order, sort } = query;

  const { transfers, pagination } = await transferRepository.findAll(
    undefined,
    page,
    limit,
    order,
    sort
  );
  return { transfers, pagination };
};

exports.findTransfer = async (transactionId) => {
  await isTransferExist(transactionId);
  const transfer = await transferRepository.findById(transactionId);
  return { transfer };
};

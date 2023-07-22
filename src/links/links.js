const links = {
  auth: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    RESET_PASSWORD: '/reset-password',
  },
  user: {
    GET_USERS: '/getAll',
    GET_USER: '/get/:userId',
    CREATE_USER: '/create',
    UPDATE_USER: '/update/:userId',
    UPDATE_PASSWORD: '/update-password/:userId',
    UPDATE_STATUS: '/update-status/:userId',
    DELETE_USER: '/delete/:userId',
  },
  role: {
    GET_ROLES: '/getAll',
    GET_ROLE: '/get/:roleId',
    CREATE_ROLE: '/create',
    UPDATE_ROLE: '/update/:roleId',
    DELETE_ROLE: '/delete/:roleId',
  },
  link: {
    GET_LINKS: '/getAll',
    GET_LINK: '/get/:linkId',
    CREATE_LINK: '/create',
    UPDATE_LINK: '/update/:linkId',
    DELETE_LINK: '/delete/:linkId',
  },
  page: {
    GET_PAGES: '/getAll',
    GET_PAGE: '/get/:pageId',
    CREATE_PAGE: '/create',
    UPDATE_PAGE: '/update/:pageId',
    DELETE_PAGE: '/delete/:pageId',
  },
  permission: {
    GET_PERMMISSIONS: '/getAll',
    GET_PERMMISSION: '/get/:permissionId',
    CREATE_PERMMISSION: '/create',
    UPDATE_PERMMISSION: '/update/:permissionId',
    DELETE_PERMMISSION: '/delete/:permissionId',
  },
  pageCalim: {
    GET_PAGE_CLAIMS: '/getAll',
    GET_PAGE_CLAIM: '/get/:pageClaimId',
    CREATE_PAGE_CLAIM: '/create',
    UPDATE_PAGE_CLAIM: '/update/:pageClaimId',
    DELETE_PAGE_CLAIM: '/delete/:pageClaimId',
  },
  roleClaim: {
    GET_PAGE_CLAIMS: '/getAll',
    GET_PAGE_CLAIM: '/get/:roleClaimId',
    CREATE_PAGE_CLAIM: '/create',
    UPDATE_PAGE_CLAIM: '/update/:roleClaimId',
    DELETE_PAGE_CLAIM: '/delete/:roleClaimId',
  },
  rolePage: {
    GET_ROLE_PAGES: '/getAll',
    GET_ROLE_PAGE: '/get/:permissionId',
    CREATE_ROLE_PAGE: '/create',
    UPDATE_ROLE_PAGE: '/update/:permissionId',
    DELETE_ROLE_PAGE: '/delete/:permissionId',
  },
  bank: {
    GET_BANKS: '/getAll',
    GET_BANK: '/get/:bankId',
    CREATE_BANK: '/create',
    UPDATE_BANK: '/update/:bankId',
    DELETE_BANK: '/delete/:bankId',
  },
  bankAccount: {
    GET_BANK_ACCOUNTS: '/getAll',
    GET_BANK_ACCOUNT: '/get/:bankAccountId',
    CREATE_BANK_ACCOUNT: '/create',
    UPDATE_BANK_ACCOUNT: '/update/:bankAccountId',
    DELETE_BANK_ACCOUNT: '/delete/:bankAccountId',
  },
  transaction: {
    GET_TRANSACTIONS: '/getAll',
    GET_TRANSACTION: '/get/:transactionId',
    CREATE_TRANSACTION: '/create',
    UPDATE_TRANSACTION: '/update/:transactionId',
    DELETE_TRANSACTION: '/delete/:transactionId',
    UPDATE_TRANSFER: '/update/:transactionId',
  },
  category: {
    GET_CATEGORYS: '/getAll',
    GET_CATEGORY: '/get/:categoryId',
    CREATE_CATEGORY: '/create',
    UPDATE_CATEGORY: '/update/:categoryId',
    DELETE_CATEGORY: '/delete/:categoryId',
  },
  segment: {
    GET_SEGMENTS: '/getAll',
    GET_SEGMENT: '/get/:segmentId',
    CREATE_SEGMENT: '/create',
    UPDATE_SEGMENT: '/update/:segmentId',
    DELETE_SEGMENT: '/delete/:segmentId',
  },
  commission: {
    GET_COMMISSIONS: '/getAll',
    GET_COMMISSION: '/get/:commissionId',
    CREATE_COMMISSION: '/create',
    UPDATE_COMMISSION: '/update/:commissionId',
    DELETE_COMMISSION: '/delete/:commissionId',
  },
  treasury: {
    GET_TREASURY: '/get',
  },
  inventory: {
    GET_PROFITES: '/profits',
  },
  reports: {
    USER_TRANSACTION: '/transactions/user',
    EMPLOY_TRANSACTION: '/transactions/employ',
    DAILY_TRANSACTION: '/transactions/daily',
    EXPORT_TRANSACTION: '/transactions/export/excel',
  },
};

module.exports = links;

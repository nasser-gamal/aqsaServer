const constants = {
  EMAIL_EXIST: 'البريد الالكتروني مسجل بالفعل',
  PHONE_EXIST: ' رقم الموبايل مسجل بالفعل',
  ROLE_EXIST: 'هذه الصلاحية موجودة بالفعل',
  NATIONALID_EXIST: 'الرقم القومي موجود بالفعل',
  ACCOUNT_NUMBER_EXIST: 'رقم الحساب موجود بالفعل',
  LINK_EXIST: 'هذا الرابط موجود بالفعل',
  USER_EXIST: 'هذا الحساب موجود بالفعل',
  PAGE_EXIST: 'هذه الصفحة موجودة بالفعل',
  BANK_EXIST: 'هذا البنك موجود',
  BANK_ACCOUNT_EXIST: 'هذا الحساب البنكي موجود',
  CATEGORY_EIXST: 'هذه الخدمة موجودة',
  SEGMENT_EXIST: 'هذه الشريحة موجودة',
  USER_COMMISSION_EXIST: 'تم اضافة عمولة للعميل من قبل',

  IMG_REQUIRED: 'اختر الصورة',

  ROLE_NOT_FOUND: 'الصلاحية غير موجودة ربما تم حذفها',
  USER_NOT_FOUND: 'المستخدم غير موجود ربما تم حذفه',
  AGENT_NOT_FOUND: 'هذا العميل غير موجود ربما تم حذفه',
  LINK_NOT_FOUND: 'الرابط غير موجود',
  PAGE_NOT_FOUND: 'الصفحة غير موجودة',
  BANK_NOT_FOUND: 'هذا البنك غير موجود',
  BANK_ACCOUNT_NOT_FOUND: 'هذا الحساب البنكي غير موجود',
  TREASURY_NOT_FOUND: 'مشكلة ف الخزنة',
  TRANSACTIONS_NOT_FOUND: 'العملية غير موجودة',
  CATEGORY_NOT_FOUND: 'الخدمة غير موجودة',
  SEGEMNT_NOT_FOUND: 'الشريحة غير موجودة',
  COMMISSION_NOT_FOUND: 'العمولة غير موجودة',
  PROFIT_NOT_EXIST: 'لا يوجد ارباح في هذه الفترة',
  FEES_NOT_FOUND: 'لا يوجد مصاريف',
  PROVIDER_NOT_FOUND: 'المزود غير موجود',
  PROVIDER_COMMISSION_NOT_FOUND: 'عمولة المزود غير موجوده',
  AGENT_TRSEARY_NOT_FOUND: 'خزنة التجار غير موجودة',
  PROVIDER_TRSEARY_NOT_FOUND: 'خزنة المزود غير موجودة',
  TRSEARY_NOT_FOUND: 'رصيد غير موجود',
  APP_NOT_FOUND: 'التطبيق غير موجود',
  DUES_NOT_FOUND: 'المستحقات غير موجودة',

  BANK_ACCOUNT_BALANCE_NOT_ENOUGH: 'رصيد الحساب ليس كافي لاجراء العملية',

  CREATE_SUCCESS: 'تم الاضافة بنجاح',
  UPDATE_SUCCESS: 'تم التعديل بنجاح',
  DELETE_SUCCESS: 'تم الحذف بنجاح',
  CREATE_USER_SUCCESS: 'تم إنشاء الحساب بنجاح',
  UPDATE_USER_SUCCESS: 'تم تحديث بيانات المستخدم بنجاح',
  UPDATE_PASSWORD_SUCCESS: 'تم تغير كلمة المرور بنجاح',
  DELETE_USER_SUCCESS: 'تم حذف الحساب بنجاح',
  CREATE_ROLE_SUCCESS: 'تم انشاء الصلاحية بنجاح',
  UPDATE_ROLE_SUCCESS: 'تم تحديث الصلاحية بنجاح',
  DELETE_ROLE_SUCCESS: 'تم حذف الصلاحية بنجاح',
  DELETE_ROLE_FAIL: 'لا يمكن حذف هذه الصلاحية لانها مرتبطة بالمستخدمين',
  CREATE_LINK_SUCCESS: 'تم اضافة الرابط بنجاح',
  UPDATE_LINK_SUCCESS: 'تم تحديث بيانات الرابط بنجاح',
  DELETE_LINK_SUCCESS: 'تم حذف بيانات الرابط بنجاح',
  CREATE_PAGE_SUCCESS: 'تم اضافة الصفحة بنجاح',
  UPDATE_PAGE_SUCCESS: 'تم تحديث بيانات الصفحة بنجاح',
  DELETE_PAGE_SUCCESS: 'تم حذف بيانات الصفحة بنجاح',
  CREATE_BANK_SUCCESS: 'تم اضافة البنك بنجاح ',
  UPDATE_BANK_SUCCESS: 'تم تحديث بيانات البنك بنجاح',
  DELETE_BANK_SUCCESS: 'تم حذف بيانات البنك بنجاح',
  CREATE_BANK_ACCOUNT_SUCCESS: 'تم اضافة الحساب البنكي بنجاح',
  UPDATE_BANK_ACCOUNT_SUCCESS: 'تم تحديث بيانات الحساب البنكي بنجاح',
  DELETE_BANK_ACCOUNT_SUCCESS: 'تم حذف بيانات الحساب البنكي بنجاح',
  CREATE_TRANSACTION_SUCCESS: 'تم اضافة العملية بنجاح',
  UPDATE_TRANSACTION_SUCCESS: 'تم تعديل العملية بنجاح',
  DELETE_TRANSACTION_SUCCESS: 'تم حذف العملية بنجاح',
  CREATE_TRANSFER_SUCCESS: 'تم تحويل المبلغ بنجاح',
  CREATE_CATEGORY_SUCCESS: 'تم اضافة الخدمة بنجاح',
  UPDATE_CATEGORY_SUCCESS: 'تم تعديل الخدمة بنجاح',
  DELETE_CATEGORY_SUCCESS: 'تم حذف الخدمة بنجاح',
  CREATE_SEGMENT_SUCCESS: 'تم اضافة الشريحة بنجاح',
  UPDATE_SEGMENT_SUCCESS: 'تم تعديل الشريحة بنجاح',
  DELETE_SEGMENT_SUCCESS: 'تم حذف الشريحة بنجاح',
  CREATE_COMMISSION_SUCCESS: 'تم اضافة العمولة بنجاح',
  UPDATE_COMMISSION_SUCCESS: 'تم تعديل العمولة بنجاح',
  DELETE_COMMISSION_SUCCESS: 'تم حذف العمولة بنجاح',
  CREATE_PERMISSION_SUCCESS: 'تم اضافة الصلاحية بنجاح',
  UPDATE_PERMISSION_SUCCESS: 'تم تعديل الصلاحية بنجاح',
  DELETE_PERMISSION_SUCCESS: 'تم حذف الصلاحية بنجاح',
  CREATE_FEES_SUCCESS: 'تم الاضافة بنجاح',
  UPDATE_FEES_SUCCESS: 'تم التعديل بنجاح',
  DELETE_FEES_SUCCESS: 'تم الحذف بنجاح',
  CREATE_APP_SUCCESS: 'تم اضافة التطبيق بنجاح',
  UPDATE_APP_SUCCESS: 'تم تعديل التطبيق بنجاح',
  DELETE_APP_SUCCESS: 'تم حذف التطبيق بنجاح',
  CREATE_PROVIDER_SUCCESS: 'تم اضافة المزود بنجاح',
  UPDATE_PROVIDER_SUCCESS: 'تم تعديل المزود بنجاح',
  DELETE_PROVIDER_SUCCESS: 'تم حذف المزود بنجاح',
  CREATE_PROVIDER_COMMISSION_SUCCESS: 'تم اضافة العمولة بنجاح',
  UPDATE_PROVIDER_COMMISSION_SUCCESS: 'تم تعديل العمولة بنجاح',
  DELETE_PROVIDER_COMMISSION_SUCCESS: 'تم حذف العمولة بنجاح',
  CREATE_TREASURY_SUCCESS: 'تم اضافة بنجاح',
  UPDATE_TREASURY_SUCCESS: 'تم تعديل بنجاح',
  DELETE_TREASURY_SUCCESS: 'تم حذف بنجاح',

  ACCOUNT_ACTIVE: 'تم تنشيط الحساب',
  ACCOUNT_IN_ACTIVE: 'تم ايقاف تنشيط الحساب',
  ACCOUNT_NOT_ACTIVE: 'هذا الحساب تم ايقافه',
  LOGIN_WRONG: 'خطأ في البيانات',
  LOGOUT: 'تم تسجيل الخروج بنجاح',
  UNAUTHORIZED: 'ليس لديك صلاحية',
  SMS_ERROR: 'هناك مشكلة في خدمة الرسائل',
  PASSWORD_WRONG: 'الرقم السري خطأ',

  DELETE_PROVIDER_FAILD: 'لا يمكنك حذف المزود لانه مرتبط بعمولات تخصه',
};

module.exports = constants;

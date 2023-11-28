const { Op } = require('sequelize');

class ApiFeature {
  constructor(queryObj) {
    this.queryObj = queryObj;
    this.conditions = [];
    this.sortArr = [];
    this.included = [];
    this.excluded = [];
    this.pagination = {};
    this.keyword = '';
  }

  // 1) filter
  filter() {
    let queryObject = { ...this.queryObj };
    let excludedFields = ['page', 'limit', 'fields', 'sort', 'keyword'];
    excludedFields.forEach((field) => delete queryObject[field]);
    Object.entries(queryObject).forEach((Value) => {
      let [key, value] = Value;
      this.operatorFunc(key, value);
    });
    return this;
  }

  switchFunc(valKey, value, obj) {
    switch (valKey) {
      case 'gte':
        obj[Op.gte] = value[valKey];
        break;
      case 'gt':
        obj[Op.gt] = value[valKey];
        break;
      case 'lt':
        obj[Op.lt] = value[valKey];
        break;
      case 'lte':
        obj[Op.lte] = value[valKey];
        break;
      case 'ne':
        obj[Op.ne] = value[valKey];
        break;
      case 'eq':
        obj[Op.eq] = value[valKey];
        break;
      default:
        obj[Op.eq] = valKey;
    }
  }

  operatorFunc(key, value) {
    if (typeof value == 'object') {
      let obj = {};
      Object.keys(value).forEach((valKey) => {
        this.switchFunc(valKey, value, obj);
      });
      this.conditions[key] = obj;
    } else {
      this.conditions[key] = value;
    }
  }

  // 2) Sort
  sort() {
    if (this.queryObj.sort) {
      let sortArr = this.queryObj.sort.split(',');
      sortArr.forEach((ele) => {
        if (ele.startsWith('-')) {
          this.sortArr.push([ele.slice(1), 'ASC']);
        } else {
          this.sortArr.push([ele, 'DESC']);
        }
      });
    } else {
      this.sortArr.push(['createdAt', 'DESC']);
    }
    return this;
  }

  // 3) limitFields
  limitFields() {
    if (this.queryObj.fields) {
      let fields = this.queryObj.fields.split(',');
      fields.forEach((ele) => {
        if (ele.startsWith('-')) {
          this.excluded.push(ele.slice(1));
        } else {
          this.included.push(ele);
        }
      });
    }
    return this;
  }

  // 4)
  paginate(totalCount) {
    const pageNumber = +this.queryObj.page || 1;
    const limit = +this.queryObj.limit || 10;

    this.pagination = {
      page: pageNumber,
      offset: (pageNumber - 1) * limit,
      limit,
      totalItems: totalCount,
      nextPage: pageNumber + 1,
      previousPage: pageNumber - 1,
      currentPage: pageNumber,
      hasPagination: totalCount > limit,
    };
    return this;
  }

  // 5)
  search() {
    if (this.queryObj.keyword) {
      this.keyword = this.queryObj.keyword;
    }
    return this;
  }
}

module.exports = ApiFeature;

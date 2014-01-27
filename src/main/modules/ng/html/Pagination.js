define([], function () {
  'use strict';

  function Pagination(itemsPerPage, numberOfLinks) {
    this.itemsPerPage = itemsPerPage;
    this.numberOfLinks = numberOfLinks;
    this.current = 0;
    this.total = 0;
  }

  Pagination.prototype.offset = function () {
    return this.current * this.itemsPerPage;
  };

  Pagination.prototype.totalItems = function (items) {
    this.total = Math.ceil(items / this.itemsPerPage);
  };

  Pagination.prototype.at = function (page) {
    return this.current == page;
  };

  Pagination.prototype.atLast = function () {
    return this.current == (this.total - 1);
  };

  Pagination.prototype.first = function () {
    this.current = 0;
  };

  Pagination.prototype.last = function () {
    this.current = (this.total - 1);
  };

  Pagination.prototype.page = function (page) {
    this.current = parseInt(page, 10);
  };

  Pagination.prototype.previous = function () {
    this.current = Math.max(0, this.current - 1);
  };

  Pagination.prototype.next = function () {
    this.current = Math.min(this.total - 1, this.current + 1);
  };

  return function() {
    return {
      create: function(itemsPerPage, numberOfLinks) {
        return new Pagination(itemsPerPage || 10, numberOfLinks || 5);
      }
    };
  };
});
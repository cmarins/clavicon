define([], function () {
  'use strict';
  return function () {
    var view, data;

    function factory() {
      return {
        bootstrap: function (appApi) {
          appApi.setWebApi(webApi());
        }
      };
    }

    function webApi() {
      return {
        show: function (_data) {
          data = _data;
        },
        transitionAndShow: function (_view, _data) {
          view = _view;
          data = _data;
        }
      };
    }

    return {
      reset: function () {
        view = null;
        data = null;
      },
      factory: factory,
      status: function () {
        return {
          view: view,
          data: data
        };
      }
    };
  }
});
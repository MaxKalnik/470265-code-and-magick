'use strict';

(function () {
  var URL = {
    get: 'https://js.dump.academy/code-and-magick/data',
    post: 'https://js.dump.academy/code-and-magick'
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 1000;
      xhr.open('GET', URL.get);
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Ошибка' + xhr.status);
        }
      });

      xhr.open('POST', URL.post);
      xhr.send(data);
    },
    errorHandler: function (errorMessage) {
      var div = document.createElement('div');
      div.style = 'z-index: 999; position: absolute; margin: 0; left: 0; top: 0; text-align: center; color: red; background-color: #fff; font-size: 30px;';
      div.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', div);
    }
  };
})();

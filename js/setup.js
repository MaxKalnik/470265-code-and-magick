'use strict';

(function () {
  var WIZARD_COLORS = {
    coat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyes: ['black', 'red', 'blue', 'yellow', 'green'],
    fireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var createWizard = function () {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
    return similarWizardTemplate.cloneNode(true);
  };

  var fillSimilarWizard = function (wizardObj, wizardTemplate) {
    wizardTemplate.querySelector('.setup-similar-label').textContent = wizardObj.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = wizardObj.colorCoat;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = wizardObj.colorEyes;
    return wizardTemplate;
  };

  var appendWizards = function (wizardsArr) {
    var wizardSimilarList = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsArr.length; i++) {
      fragment.appendChild(wizardsArr[i]);
    }
    wizardSimilarList.appendChild(fragment);
  };

  var renderSimilarWizards = function (arr) {
    var similarWizards = [];
    for (var i = 0; i < 4; i++) {
      var wizardEl = createWizard();
      var filledWizard = fillSimilarWizard(arr[i], wizardEl);
      similarWizards.push(filledWizard);
    }
    appendWizards(similarWizards);
  };

  var wizards = [];
  var wizardCurrentColors = {
    coat: '',
    eyes: ''
  };

  var update = function () {

    var getRank = function (it) {
      var rank = 0;
      if (it.colorCoat === wizardCurrentColors.coat) {
        rank += 2;

      } else if (it.colorEyes === wizardCurrentColors.eyes) {
        rank += 1;
      }
      return rank;
    };

    var similarWizards = wizards.sort(function (left, right) {
      return getRank(right) - getRank(left);
    });

    var existedSimilar = document.querySelectorAll('.setup-similar-item');
    if (existedSimilar) {
      [].forEach.call(existedSimilar, function (elem) {
        elem.remove();
      });
    }
    renderSimilarWizards(similarWizards);
  };

  var addWizardOnClick = function (arg) {
    window.dialog.popup.querySelector('.wizard-' + arg).addEventListener('click', function (evt) {
      var newColor = window.utils.getRandomColor(WIZARD_COLORS[arg]);
      evt.currentTarget.style.fill = newColor;
      wizardCurrentColors[arg] = newColor;
      window.utils.debounce(update);
    });
  };

  addWizardOnClick('coat');
  addWizardOnClick('eyes');

  window.utils.colorize(document.querySelector('.setup-fireball-wrap'), WIZARD_COLORS.fireball);

  var successLoadHandler = function (data) {
    wizards = data.slice();
    renderSimilarWizards(wizards);
    window.dialog.popup.querySelector('.setup-similar').classList.remove('hidden');
  };
  window.backend.load(successLoadHandler, window.backend.errorHandler);

  var shopElement = window.dialog.popup.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      artifactsElement.style.outline = '2px dashed red';
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  shopElement.addEventListener('dragend', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      artifactsElement.style.outline = 'none';
    }
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      artifactsElement.style.outline = '2px dashed red';
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    artifactsElement.style.outline = 'none';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragend', function (evt) {
    evt.preventDefault();
  });
})();

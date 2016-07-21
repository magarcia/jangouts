/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

jhScreenShareButtonDirective.$inject = ['ScreenShareService', 'RoomService', 'jhConfig'];

function jhScreenShareButtonDirective(ScreenShareService, RoomService, jhConfig) {
  return {
    restrict: 'EA',
    template: require('./jh-screen-share-button.html'),
    scope: true,
    controllerAs: 'vm',
    bindToController: true,
    controller: JhScreenShareButtonCtrl
  };

  function JhScreenShareButtonCtrl() {
    /* jshint: validthis */
    var vm = this;
    vm.click = click;
    vm.enabled = enabled;
    vm.title = title;

    function click() {
      if (vm.enabled()) {
        RoomService.publishScreen();
      }
    }

    function enabled() {
      return (jhConfig.usingSSL && !ScreenShareService.getInProgress());
    }

    function title() {
      if (vm.enabled()) {
        return "Share a window/desktop";
      } else {
        if (ScreenShareService.getInProgress()) {
          return "Wait while the screen is shared";
        } else {
          return "Screen sharing disabled (no SSL?)";
        }
      }
    }
  }
}

export default jhScreenShareButtonDirective;

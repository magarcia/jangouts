import {
  beforeEachProviders,
  beforeEach,
  describe,
  expect,
  it
} from "@angular/core/testing";

import { FeedConnection } from "./feed-connection.model";

declare const jasmine: any;
declare const spyOn: any;

describe("Service: FeedConnection", () => {

  beforeEachProviders(() => {
    return [
      {provide: FeedConnection, useClass: FeedConnection}
    ];
  });

  beforeEach(() => {
    this.pluginHandle = {
      getPlugin: jasmine.createSpy("getPlugin"),
      getId: jasmine.createSpy("getId"),
      detach: jasmine.createSpy("detach"),
      send: jasmine.createSpy("send"),
      handleRemoteJsep: jasmine.createSpy("handleRemoteJsep"),
      data: jasmine.createSpy("data"),
      createOffer: jasmine.createSpy("createOffer"),
      createAnswer: jasmine.createSpy("createAnswer")
    };
  });

  it("should call console.log on create", () => {
    spyOn(window.console, "log");

    let fConnection: FeedConnection = new FeedConnection();
    fConnection.setAttrs(
      this.pluginHandle,
      1
    );

    expect(window.console.log).toHaveBeenCalled();
  });

  it("should call pluginHandle.detach on call destroy", () => {
    let fConnection: FeedConnection = new FeedConnection();
    fConnection.setAttrs(
      this.pluginHandle,
      1
    );

  describe("#sendData", () => {
    it("should call pluginHandle.data", () => {
      let data: any = { id: 1 };
      this.connection.sendData(data);

    expect(this.pluginHandle.detach).toHaveBeenCalled();
  });

  describe("#publish", () => {
    beforeEach(() => {
      this.options = jasmine.createSpyObj("options", ["success", "error"]);
    });

    it("should create a webRTC offer as subscriber", () => {
      this.connection.publish();

      expect(this.pluginHandle.createOffer).toHaveBeenCalledWith(
        jasmine.objectContaining({
          media: {
            videoRecv: false,
            audioRecv: false,
            video: "screen",
            audioSend: false,
            data: false
          },
          success: jasmine.any(Function),
          error: jasmine.any(Function)
        })
      );
    });

    it("should create a webRTC offer as main", () => {
      this.connection.role = "main";
      this.connection.publish();

      expect(this.pluginHandle.createOffer).toHaveBeenCalledWith(
        jasmine.objectContaining({
          media: {
            videoRecv: false,
            audioRecv: false,
            audioSend: true,
            videoSend: true,
            data: true
          },
          success: jasmine.any(Function),
          error: jasmine.any(Function)
        })
      );
    });

    it("should call success callback when webRTC offer succeeds", () => {
      this.pluginHandle.createOffer.and.callFake((options) => {
        options.success();
      });
      this.connection.publish(this.options);

      expect(this.options.success).toHaveBeenCalled();
    });

    it("should call success callback when webRTC offer succeeds", () => {
      this.pluginHandle.createOffer.and.callFake((options) => {
        options.error();
      });
      this.connection.publish(this.options);

      expect(this.options.error).toHaveBeenCalled();
    });

    fConnection.register("display");

    expect(this.pluginHandle.send).toHaveBeenCalledWith(
      jasmine.objectContaining({
        message: {
          request: "join",
          room: 1,
          ptype: "publisher",
          display: "display"
        }
      })
    );
  });

  it("should call pluginHandle.send on call listen", () => {
    let fConnection: FeedConnection = new FeedConnection();
    fConnection.setAttrs(
      this.pluginHandle,
      1
    );

    fConnection.listen(5);

    expect(this.pluginHandle.send).toHaveBeenCalledWith(
      jasmine.objectContaining({
        message: {
          request: "join",
          room: 1,
          ptype: "listener",
          feed: 5
        }
      })
    );
  });

  it("should call pluginHandle.handleRemoteJsep when call handleRemoteJsep", () => {
    let fConnection: FeedConnection = new FeedConnection();
    fConnection.setAttrs(
      this.pluginHandle,
      1
    );

    let jsep: any = { id: 13 };
    fConnection.handleRemoteJsep(jsep);

    expect(this.pluginHandle.handleRemoteJsep).toHaveBeenCalledWith(
      jasmine.objectContaining({
        jsep: jsep
      })
    );
  });

  describe("#confirmConfig", () => {
    it("should return undefined if config not exist", () => {
      let result: any = this.connection.confirmConfig();
      expect(result).not.toBeDefined();
    });

    it("should confirm the existing config", () => {
      this.connection.config = jasmine.createSpyObj("config", ["confirm"]);
      this.connection.confirmConfig();

      expect(this.connection.config.confirm).toHaveBeenCalled();
    });

    let data = { id: 1 };
    fConnection.sendData(data);

  describe("#onDataOpen", () => {
    it("should set dataOpen flat to true", () => {
      expect(this.connection.isDataOpen).toBe(false);
      this.connection.onDataOpen();
      expect(this.connection.isDataOpen).toBe(true);
    });
  });

});

import {
  beforeEachProviders,
  inject,
  it
} from "@angular/core/testing";

import { ChatMessageComponent } from "./chat-message.component";

describe("ChatMessage", () => {

  beforeEachProviders(() => [
    ChatMessageComponent,
  ]);

  it("should have embedOptions defined", inject([ ChatMessageComponent ], (chatMessage) => {
    expect(chatMessage.embedOptions).toEqual(jasmine.objectContaining({
      link: true,
      linkTarget: "_blank",
      image: {
        embed: true
      },
      pdf: {
        embed: false
      },
      audio: {
        embed: true
      },
      code: {
        highlight: false,
      },
      basicVideo: true,
      tweetEmbed: false

    }));
  }));

});
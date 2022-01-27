import request from "request";
import chatBotService from "./chatBotService";
import {ChatBotLabel} from "../lang/chatbotLabel";
import { urlChatBot, payloadName } from "../constant/config";
import message from "../template/message";
require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const lang = process.env.LANGUAGE || 'en';

let setUpMessengerPlatform = (PAGE_ACCESS_TOKEN) => {
    return new Promise((resolve, reject) => {
        try {
            let data = {
                "get_started": {
                    "payload": payloadName.GET_STARTED
                },
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "type": "web_url",
                                "title": ChatBotLabel(lang).persistent_menu.action1,
                                "url": urlChatBot.persistentMenu.action1,
                                "webview_height_ratio": "full"
                            },
                            {
                                "type": "web_url",
                                "title": ChatBotLabel(lang).persistent_menu.action2,
                                "url": urlChatBot.persistentMenu.action2,
                                "webview_height_ratio": "full"
                            },
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).persistent_menu.action3,
                                "payload": payloadName.RESTART_CONVERSATION
                            }
                        ]
                    }
                ],
                "whitelisted_domains": [
                    process.env.SERVER_URL
                ]
            };

            request({
                "uri": "https://graph.facebook.com/v6.0/me/messenger_profile",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": data
            }, (err, res, body) => {
                if (!err) {
                    resolve("setup done!");
                } else {
                    reject(err);
                }
            });

        } catch (e) {
            reject(e);
        }
    });
};

let sendResponseGreetings = (sender_psid, locale) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = ChatBotLabel(locale).greetings.url;
            let text = ChatBotLabel(locale).greetings.text;
            await message.sendTemplateMessage(url, text, sender_psid);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendResponseThanks = (sender_psid, locale) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = ChatBotLabel(locale).thanks.url;
            let text = ChatBotLabel(locale).thanks.text;
            await message.sendTemplateMessage(url, text, sender_psid);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendResponseBye = (sender_psid, locale) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = ChatBotLabel(locale).byes.url;
            let text = ChatBotLabel(locale).byes.text;
            await message.sendTemplateMessage(url, text, sender_psid);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendGuideToUseBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {text: ChatBotLabel(lang).guide_to_use.text1};
            let response2 = {text: ChatBotLabel(lang).guide_to_use.text2};
            let response3 = {text: ChatBotLabel(lang).guide_to_use.text3};
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": ChatBotLabel(lang).guide_to_use.text4,
                        "buttons": [
                            {
                                "type": "postback",
                                "title":  ChatBotLabel(lang).payload_title.MAIN_MENU,
                                "payload": payloadName.MAIN_MENU
                            },
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.RESERVE_TABLE,
                                "payload": payloadName.RESERVE_TABLE,
                            }
                        ]
                    }
                }
            };

            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            await sendMessage(sender_psid, response3);
            await sendMessage(sender_psid, response4);

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendMessage = (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            await markMessageSeen(sender_psid);
            await sendTypingOn(sender_psid);

            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response,
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": {"access_token": PAGE_ACCESS_TOKEN},
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    console.log("message sent!");
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let sendTypingOn = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "typing_on"
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": {"access_token": PAGE_ACCESS_TOKEN},
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let markMessageSeen = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "mark_seen"
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": {"access_token": PAGE_ACCESS_TOKEN},
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    setUpMessengerPlatform: setUpMessengerPlatform,
    sendResponseGreetings: sendResponseGreetings,
    sendResponseThanks: sendResponseThanks,
    sendResponseBye: sendResponseBye,
    sendGuideToUseBot: sendGuideToUseBot
};

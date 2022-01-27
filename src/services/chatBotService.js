import request from "request";

require("dotenv").config();
import message from "../template/message";
import {ChatBotLabel} from "../lang/chatbotLabel";
import {payloadName} from "../constant/config";

const lang = process.env.LANGUAGE || 'en';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
        request({
            "uri": uri,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                //convert string to json object
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`;
                resolve(username);
            } else {
                reject("Unable to send message:" + err);
            }
        });
    });
};

let sendResponseWelcomeNewCustomer = (username, sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response_first = {"text": `Welcome ${username} to HaryPhamDev's Restaurant`};
            let response_second = message.sendResponseWelcomeNewCustomerTemplate();

            //send a welcome message
            await sendMessage(sender_psid, response_first);

            //send a image with button view main menu
            await sendMessage(sender_psid, response_second);

            resolve("done!")
        } catch (e) {
            reject(e);
        }

    });
};

let sendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = message.sendMainMenuTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });

};

let sendLunchMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = message.sendLunchMenuTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendDinnerMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text":  ChatBotLabel(lang).dinner_menu.text1
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": ChatBotLabel(lang).dinner_menu.imageUrl1
                    }
                }
            };

            let response3 = {
                "text": ChatBotLabel(lang).dinner_menu.text2
            };
            let response4 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": ChatBotLabel(lang).dinner_menu.imageUrl2
                    }
                }
            };

            let response5 = {
                "text":  ChatBotLabel(lang).dinner_menu.text3
            };
            let response6 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": ChatBotLabel(lang).dinner_menu.imageUrl3
                    }
                }
            };

            let response7 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": ChatBotLabel(lang).dinner_menu.text4,
                        "buttons": [
                            {
                                "type": "postback",
                                "title":  ChatBotLabel(lang).payload_title.MAIN_MENU,
                                "payload": payloadName.MAIN_MENU
                            },
                            {
                                "type": "postback",
                                "title":  ChatBotLabel(lang).payload_title.RESERVE_TABLE,
                                "payload": payloadName.RESERVE_TABLE
                            }
                        ]
                    }
                }
            };

            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            await sendMessage(sender_psid, response3);
            await sendMessage(sender_psid, response4);
            await sendMessage(sender_psid, response5);
            await sendMessage(sender_psid, response6);
            await sendMessage(sender_psid, response7);

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendPubMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": ChatBotLabel(lang).pub_menu.text1
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url":  ChatBotLabel(lang).pub_menu.imageUrl1
                    }
                }
            };

            let response3 = {
                "text": ChatBotLabel(lang).pub_menu.text2
            };
            let response4 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url":  ChatBotLabel(lang).pub_menu.imageUrl2
                    }
                }
            };

            let response5 = {
                "text": ChatBotLabel(lang).pub_menu.text3
            };
            let response6 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url":  ChatBotLabel(lang).pub_menu.imageUrl3
                    }
                }
            };

            let response7 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text":  ChatBotLabel(lang).pub_menu.text4,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.MAIN_MENU,
                                "payload": payloadName.MAIN_MENU
                            },
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.RESERVE_TABLE,
                                "payload": payloadName.RESERVE_TABLE
                            }
                        ]
                    }
                }
            };

            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            await sendMessage(sender_psid, response3);
            await sendMessage(sender_psid, response4);
            await sendMessage(sender_psid, response5);
            await sendMessage(sender_psid, response6);
            await sendMessage(sender_psid, response7);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendAppetizer = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = message.sendAppetizerTemplate();
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let goBackToMainMenu = (sender_psid) => {
    sendMainMenu(sender_psid);
};

let goBackToLunchMenu = (sender_psid) => {
    sendLunchMenu(sender_psid);
};

let handleReserveTable = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getFacebookUsername(sender_psid);
            let response = {text: `Hi ${username}, What time and date you would like to reserve a table ?`};
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let handleShowRooms = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = message.handleShowRoomsTemplate();
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let sendMessageAskingQuality = (sender_id) => {
    let request_body = {
        "recipient": {
            "id": sender_id
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text":  ChatBotLabel(lang).ask_quantity.text,
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": ChatBotLabel(lang).ask_quantity.quick_replies.small,
                    "payload":  payloadName.SMALL,
                }, {
                    "content_type": "text",
                    "title": ChatBotLabel(lang).ask_quantity.quick_replies.medium,
                    "payload": payloadName.MEDIUM,
                },
                {
                    "content_type": "text",
                    "title": ChatBotLabel(lang).ask_quantity.quick_replies.large,
                    "payload": payloadName.LARGE
                }
            ]
        }
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": {"access_token": PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

let sendMessageAskingPhoneNumber = (sender_id) => {
    let request_body = {
        "recipient": {
            "id": sender_id
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text":  ChatBotLabel(lang).ask_phone_number.text,
            "quick_replies": [
                {
                    "content_type": "user_phone_number",
                }
            ]
        }
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": {"access_token": PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

let sendMessageDoneReserveTable = async (sender_id) => {
    try {
        let response = {
            "attachment": {
                "type": "image",
                "payload": {
                    "url":  ChatBotLabel(lang).done_reserve_table.imageUrl1
                }
            }
        };
        await sendMessage(sender_id, response);

        //get facebook username
        let username = await getFacebookUsername(sender_id);

        //send another message
        let response2 = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": `Done! \nOur reservation team will contact you as soon as possible ${username}.\n \nWould you like to check our Main Menu?`,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": ChatBotLabel(lang).payload_title.MAIN_MENU,
                            "payload": payloadName.MAIN_MENU
                        },
                        {
                            "type": "phone_number",
                            "title": ChatBotLabel(lang).payload_title.HOT_LINE,
                            "payload": payloadName.HOT_LINE
                        },
                        {
                            "type": "postback",
                            "title": ChatBotLabel(lang).payload_title.RESTART_CONVERSATION,
                            "payload": payloadName.RESTART_CONVERSATION
                        }
                    ]
                }
            }
        };
        await sendMessage(sender_id, response2);
    } catch (e) {
        console.log(e);
    }
};

let sendNotificationToTelegram = (user) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                chat_id: process.env.TELEGRAM_GROUP_ID,
                parse_mode: "HTML",
                text: `
| --- <b>A new reservation</b> --- |
| ------------------------------------------------|
| 1. Username: <b>${user.name}</b>   |
| 2. Phone number: <b>${user.phoneNumber}</b> |
| 3. Time: <b>${user.time}</b> |
| 4. Quantity: <b>${user.quantity}</b> |
| 5. Created at: ${user.createdAt} |
| ------------------------------------------------ |                           
      `
            };

            // Send the HTTP request to the Telegram
            request({
                "uri": `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
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

let sendMessageDefaultForTheBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": ChatBotLabel(lang).default_bot.text1
            };

            //send a media template
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "media",
                        "elements": [
                            {
                                "media_type": "video",
                                "url": ChatBotLabel(lang).default_bot.videoUrl,
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": ChatBotLabel(lang).default_bot.buttonUrl1,
                                        "title": ChatBotLabel(lang).default_bot.title1
                                    },
                                    {
                                        "type": "postback",
                                        "title": ChatBotLabel(lang).default_bot.title2,
                                        "payload": payloadName.RESTART_CONVERSATION
                                    }
                                ]
                            }
                        ]
                    }
                }
            };
            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let showRoomDetail = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": ChatBotLabel(lang).room_detail.imageUrl1
                    }
                }
            };
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": ChatBotLabel(lang).room_detail.text1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.MAIN_MENU,
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

            resolve("done!");
        } catch (e) {
            reject(e);
        }
    })
};

let sendSalad = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": ChatBotLabel(lang).send_salad.imageUrl1
                    }
                }
            };
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": ChatBotLabel(lang).send_salad.text1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.MAIN_MENU,
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

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendFish = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": ChatBotLabel(lang).send_fish.imageUrl1
                    }
                }
            };
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": ChatBotLabel(lang).send_fish.text1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.MAIN_MENU,
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

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendClassic = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": ChatBotLabel(lang).send_classic.imageUrl1
                    }
                }
            };
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": ChatBotLabel(lang).send_classic.text1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.MAIN_MENU,
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

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

export const sendMessage = (sender_psid, response) => {
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
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
    sendMainMenu: sendMainMenu,
    sendLunchMenu: sendLunchMenu,
    sendDinnerMenu: sendDinnerMenu,
    sendPubMenu: sendPubMenu,
    sendAppetizer: sendAppetizer,
    goBackToMainMenu: goBackToMainMenu,
    goBackToLunchMenu: goBackToLunchMenu,
    handleReserveTable: handleReserveTable,
    handleShowRooms: handleShowRooms,
    sendMessageAskingQuality: sendMessageAskingQuality,
    sendMessageAskingPhoneNumber: sendMessageAskingPhoneNumber,
    sendMessageDoneReserveTable: sendMessageDoneReserveTable,
    sendNotificationToTelegram: sendNotificationToTelegram,
    sendMessageDefaultForTheBot: sendMessageDefaultForTheBot,
    showRoomDetail: showRoomDetail,
    sendSalad: sendSalad,
    sendFish: sendFish,
    sendClassic: sendClassic,
    markMessageSeen: markMessageSeen,
    sendTypingOn: sendTypingOn,
    sendMessage: sendMessage
};
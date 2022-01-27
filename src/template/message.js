import {payloadName} from "../constant/config";
import {sendMessage} from "../services/chatBotService";
import {ChatBotLabel} from "../lang/chatbotLabel";

require("dotenv").config();

const lang = process.env.LANGUAGE || 'en';

let sendTemplateMessage = async (url, text, sender_psid) => {
    let response1 = {
        "attachment": {
            "type": "image",
            "payload": {
                "url": url
            }
        }
    };

    let response2 = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": text,
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
};

let sendResponseWelcomeNewCustomerTemplate = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": ChatBotLabel(lang).welcome_new_customer.title,
                        "subtitle": ChatBotLabel(lang).welcome_new_customer.subtitle,
                        "image_url": ChatBotLabel(lang).welcome_new_customer.imageUrl,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.MAIN_MENU,
                                "payload": payloadName.MAIN_MENU,
                            },
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.RESERVE_TABLE,
                                "payload": payloadName.RESERVE_TABLE,
                            },
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.GUIDE_BOT,
                                "payload": payloadName.GUIDE_BOT,
                            }
                        ],
                    }]
            }
        }
    };
}

let sendMainMenuTemplate = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": ChatBotLabel(lang).main_menu.title1,
                        "subtitle": ChatBotLabel(lang).main_menu.subtitle1,
                        "image_url": ChatBotLabel(lang).main_menu.imageUrl1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.LUNCH_MENU,
                                "payload": payloadName.LUNCH_MENU,
                            },
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.DINNER_MENU,
                                "payload": payloadName.DINNER_MENU,
                            },
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.PUB_MENU,
                                "payload": payloadName.PUB_MENU,
                            }
                        ],
                    },

                    {
                        "title": ChatBotLabel(lang).main_menu.title2,
                        "subtitle": ChatBotLabel(lang).main_menu.subtitle2,
                        "image_url": ChatBotLabel(lang).main_menu.imageUrl2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.RESERVE_TABLE,
                                "payload": payloadName.RESERVE_TABLE,
                            }
                        ],
                    },

                    {
                        "title": ChatBotLabel(lang).main_menu.title3,
                        "subtitle": ChatBotLabel(lang).main_menu.subtitle3,
                        "image_url": ChatBotLabel(lang).main_menu.imageUrl3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.SHOW_ROOMS,
                                "payload": payloadName.SHOW_ROOMS,
                            }
                        ],
                    }


                ]
            }
        }
    };
}

let sendLunchMenuTemplate = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": ChatBotLabel(lang).lunch_menu.title1,
                        "image_url": ChatBotLabel(lang).lunch_menu.imageUrl1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.SHOW_APPETIZERS,
                                "payload": payloadName.SHOW_APPETIZERS,
                            }
                        ],
                    },

                    {
                        "title": ChatBotLabel(lang).lunch_menu.title2,
                        "image_url": ChatBotLabel(lang).lunch_menu.imageUrl2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.SHOW_ENTREE_SALAD,
                                "payload": payloadName.SHOW_ENTREE_SALAD,
                            }
                        ],
                    },

                    {
                        "title": ChatBotLabel(lang).lunch_menu.title3,
                        "image_url":  ChatBotLabel(lang).lunch_menu.imageUrl3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.SHOW_FISH,
                                "payload": payloadName.SHOW_FISH,
                            }
                        ],
                    },

                    {
                        "title": ChatBotLabel(lang).lunch_menu.title4,
                        "subtitle": ChatBotLabel(lang).lunch_menu.subtitle4,
                        "image_url": ChatBotLabel(lang).lunch_menu.imageUrl4,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.SHOW_CLASSICS,
                                "payload": payloadName.SHOW_CLASSICS,
                            }
                        ],
                    },

                    {
                        "title": ChatBotLabel(lang).lunch_menu.title5,
                        "image_url": ChatBotLabel(lang).lunch_menu.imageUrl5,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.BACK_TO_MAIN_MENU,
                                "payload": payloadName.BACK_TO_MAIN_MENU,
                            },
                            {
                                "type": "postback",
                                "title": ChatBotLabel(lang).payload_title.RESERVE_TABLE,
                                "payload": payloadName.RESERVE_TABLE,
                            }
                        ],
                    }
                ]
            }
        }
    };
}
















let sendAppetizerTemplate = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Little Neck Clams on the Half Shell",
                        "subtitle": "Dozen - $20.00",
                        "image_url": "https://bit.ly/appetizers1",
                    },

                    {
                        "title": "Fresh Oysters",
                        "subtitle": "1/2 Dozen - $21.00 | Dozen - $40.00",
                        "image_url": "https://bit.ly/appetizers2",
                    },

                    {
                        "title": "Lobster Salad",
                        "subtitle": "Half Lobster with Avocado and Grapefruit",
                        "image_url": "https://bit.ly/appetizers3",
                    },

                    {
                        "title": "Go back",
                        "image_url": " https://bit.ly/imageToSend",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW LUNCH MENU",
                                "payload": "BACK_TO_LUNCH_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "BACK TO MAIN MENU",
                                "payload": "BACK_TO_MAIN_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "RESERVE A TABLE",
                                "payload": "RESERVE_TABLE",
                            }
                        ],
                    }
                ]
            }
        }
    };
}

let handleShowRoomsTemplate = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Bull Moose Room",
                        "subtitle": "The room is suited for parties of up to 25 people",
                        "image_url": "https://bit.ly/showRoom1",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW DESCRIPTION",
                                "payload": "SHOW_ROOM_DETAIL",
                            }
                        ],
                    },

                    {
                        "title": "Lillie Langstry Room",
                        "subtitle": "The room is suited for parties of up to 35 people",
                        "image_url": "https://bit.ly/showRoom2",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW DESCRIPTION",
                                "payload": "SHOW_ROOM_DETAIL",
                            }
                        ],
                    },

                    {
                        "title": "Lincoln Room",
                        "subtitle": "The room is suited for parties of up to 45 people",
                        "image_url": "https://bit.ly/showRoom3",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW DESCRIPTION",
                                "payload": "SHOW_ROOM_DETAIL",
                            }
                        ],
                    },

                    {
                        "title": "Go back",
                        "image_url": " https://bit.ly/imageToSend",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BACK TO MAIN MENU",
                                "payload": "BACK_TO_MAIN_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "RESERVE A TABLE",
                                "payload": "RESERVE_TABLE",
                            }
                        ],
                    }
                ]
            }
        }
    };
}
module.exports = {
    sendTemplateMessage: sendTemplateMessage,
    sendResponseWelcomeNewCustomerTemplate: sendResponseWelcomeNewCustomerTemplate,
    sendMainMenuTemplate: sendMainMenuTemplate,
    sendLunchMenuTemplate: sendLunchMenuTemplate,
    sendAppetizerTemplate: sendAppetizerTemplate,
    handleShowRoomsTemplate: handleShowRoomsTemplate,

};


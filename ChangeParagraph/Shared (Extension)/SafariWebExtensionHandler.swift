//
//  SafariWebExtensionHandler.swift
//  Shared (Extension)
//
//  Created by Saheem Hussain on 01/09/23.
//

import SafariServices
import os.log

let SFExtensionMessageKey = "message"

enum SafariExtensionRequestEnum: String {
    case requestEnabledStatus = "request:enabled_status"
}

enum SafariExtensionDeliveryEnum: String {
    case deliveryEnabledStatus = "delivery:enabled_status"
}

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {
    
    // this should be the same name as the one created in the native app
    private let defaults = UserDefaults(suiteName: "group.thisisatest")
    
    func beginRequest(with context: NSExtensionContext) {
        guard let item = context.inputItems[0] as? NSExtensionItem else {
            return
        }
        let message = item.userInfo?[SFExtensionMessageKey]
        let messageDictionary = message as? [String: String]
        let innerMessage = messageDictionary?[SFExtensionMessageKey] as? String
        
        if let msg =  message as? CVarArg {
            os_log(.default, "SafariWebExtensionHandler XXXX Received message from browser.runtime.sendNativeMessage: %@", msg)
        }
        
        let response = NSExtensionItem()
        if
            let msg = innerMessage,
            let request = SafariExtensionRequestEnum(rawValue: msg)
        {
            switch request {
            case .requestEnabledStatus:
                // this keyName should be the same as in the native app
                let keyName = "user_defaults_suite_enabled"
                let enabledFromDefaults = defaults?.bool(forKey: keyName)
                response.userInfo = [
                    SFExtensionMessageKey : [
                        SafariExtensionDeliveryEnum.deliveryEnabledStatus.rawValue: enabledFromDefaults
                    ]
                ]
            }
        }
        context.completeRequest(returningItems: [response], completionHandler: nil)
    }
}

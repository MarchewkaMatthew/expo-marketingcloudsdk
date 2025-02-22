# @allboatsrise/expo-marketingcloudsdk

This is an Expo module that provides a wrapper around the Salesforce Marketing Cloud SDK for iOS and Android.

It allows Expo-based apps to integrate with the Marketing Cloud SDK.

## Installation

To install the package use your prefered package manager:

```bash
npm install @allboatsrise/expo-marketingcloudsdk expo-notifications
```
or
```bash
yarn add @allboatsrise/expo-marketingcloudsdk expo-notifications
```

## Plugin setup
#### [View parameters](#plugin-parameters)

Add package to `plugins` in `app.js`/`app.config.js`.

```json
"expo": {
  "plugins": [
    [
      "@allboatsrise/expo-marketingcloudsdk", {
        "appId": "<< MARKETING_CLOUD_APP_ID >>",
        "accessToken": "<< MARKETING_CLOUD_ACCESS_TOKEN >>",
        "serverUrl": "<< MARKETING_CLOUD_SERVER_URL >>",
      }
    ],
    "expo-notifications",
  ]
}
```

## Plugin parameters

| Parameter                                     | Type    | Required | Description                                                                                                                                         |
| --------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appId`                                       | string  | Yes      | Marketing Cloud app id                                                                                                                              |
| `accessToken`                                 | string  | Yes      | Marketing Cloud access token                                                                                                                        |
| `serverUrl`                                   | string  | Yes      | Marketing Cloud server url                                                                                                                          |
| `senderId` (Android only)                     | string  | No       | Marketing Cloud FCM sender id. Defaults to `project_info.project_number` defined in `android.googleServicesFile` (google-services.json) if defined. |
| `mid`                                         | string  | No       | Sets the configuration value to use for the Salesforce MarketingCloud Tenant Specific mid.                                                          |
| `inboxEnabled`                                | boolean | No       | Sets the configuration flag that enables or disables inbox services                                                                                 |
| `locationEnabled`                             | boolean | No       | Sets the configuration flag that enables or disables location services                                                                              |
| `analyticsEnabled`                            | boolean | No       | Sets the configuration flag that enables or disables Salesforce MarketingCloud Analytics services                                                   |
| `applicationControlsBadging`                  | boolean | No       | Sets the configuration value which enables or disables application control over badging                                                             |
| `delayRegistrationUntilContactKeyIsSet`       | boolean | No       | Sets the configuration value which enables or disables application control over delaying SDK registration until a contact key is set                |
| `markNotificationReadOnInboxNotificationOpen` | boolean | No       | Sets the configuration value which enables or disables marking inbox notifications as read on open (Android only)                                   |

# Usage

Various functions, their parameters, return values, and their specific purposes in `ExpoMarketingCloudSdk`

## Functions

| Function Name | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| `isPushEnabled` | None | `Promise<boolean>` | Returns a promise that resolves to a boolean indicating whether push notifications are enabled for the user. |
| `enablePush` | None | `Promise<void>` | Returns a promise that resolves when push notifications have been successfully enabled. |
| `disablePush` | None | `Promise<void>` | Returns a promise that resolves when push notifications have been successfully disabled. |
| `getSystemToken` | None | `Promise<string>` | Returns a promise that resolves to a string representing the device's push notification token. |
| `setSystemToken` | `token: string` | `Promise<void>` | Returns a promise that resolves when the device's push notification token has been successfully set. |
| `getAttributes` | None | `Promise<Record<string, string>>` | Returns a promise that resolves to an object representing the user's attributes. |
| `setAttribute` | `key: string`, `value: string` | `Promise<void>` | Returns a promise that resolves when an attribute has been successfully set for the user. |
| `clearAttribute` | `key: string` | `Promise<void>` | Returns a promise that resolves when an attribute has been successfully cleared for the user. |
| `addTag` | `tag: string` | `Promise<void>` | Returns a promise that resolves when a tag has been successfully added for the user. |
| `removeTag` | `tag: string` | `Promise<void>` | Returns a promise that resolves when a tag has been successfully removed for the user. |
| `getTags` | None | `Promise<string[]>` | Returns a promise that resolves to an array of strings representing the user's tags. |
| `setContactKey` | `contactKey: string` | `Promise<void>` | Returns a promise that resolves when the user's contact key has been successfully set. |
| `getContactKey` | None | `Promise<string>` | Returns a promise that resolves to a string representing the user's contact key. |
| `getSdkState` | None | `Promise<Record<string, unknown>>` | Returns a promise that resolves to an object representing the current state of the SDK. |
| `track` | `name: string`, `attributes: Record<string, string>` | `Promise<void>` | Returns a promise that resolves when a custom event has been successfully tracked. |
| `deleteMessage` | `messageId: string` | `Promise<void>` | Returns a promise that resolves when a specific inbox message has been successfully deleted. |
| `getDeletedMessageCount` | None | `Promise<number>` | Returns a promise that resolves to a number representing the total number of deleted inbox messages. |
| `getDeletedMessages` | None | `Promise<InboxMessage[]>` | Returns a promise that resolves to an array of `InboxMessage` objects representing the deleted inbox messages. |
| `getMessageCount` | None | `Promise<number>` | Returns a promise that resolves to a number representing the total number of inbox messages. |
| `getMessages` | None | `Promise<InboxMessage[]>` | Returns a promise that resolves to an array of `InboxMessage` objects representing the inbox messages. |
| `getReadMessageCount` | None | `Promise<number>` | Returns a promise that resolves to a number representing the total number of read inbox messages. |
| `getReadMessages` | None | `Promise<InboxMessage[]>` | Returns a promise that resolves to an array of `InboxMessage` objects representing the read inbox messages. |


## Add event listener
Available event listeners:

| Function | Parameters | Description |
| --- | --- | --- |
| `addLogListener` | `listener: (event: LogEventPayload) => void` | Adds a listener function to the `onLog` event, which is triggered when a new log event is generated. The function should take an argument of type `LogEventPayload`, which contains information about the log event. Returns a `Subscription` object that can be used to unsubscribe the listener. |
| `addInboxResponseListener` | `listener: (event: InboxResponsePayload) => void` | Adds a listener function to the `onInboxResponse` event, which is triggered when a new inbox response is received. The function should take an argument of type `InboxResponsePayload`, which contains information about the inbox response. Returns a `Subscription` object that can be used to unsubscribe the listener. |

```typescript
// listeners being used in a useEffect hook.

useEffect(() => {
    const logSubscription = addLogListener((logEvent: LogEventPayload) => {
        // Do something with logEvent
      })
    const inboxSubscription = addInboxResponseListener((inboxEvent: InboxMessage[]) => {
        // Do something with inboxEvent
      })

    return () => {
      logSubscription.remove()
      inboxSubscription.remove()
    }
}, [])
```



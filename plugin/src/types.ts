import { z } from 'zod';

export type MarketingCloudSdkPluginProps = z.infer<typeof MarketingCloudSDKPluginPropsSchema>

export const MarketingCloudSDKPluginPropsSchema = z.object({
  /** Marketing Cloud app id */
  appId: z.string({required_error: 'Must provide app id.'}).min(1),

  /** Marketing Cloud access token */
  accessToken: z.string({required_error: 'Must provide access token.'}).min(1),

  /** Marketing Cloud server url */
  serverUrl: z.string({required_error: 'Must provide server url.'}).min(1),

  /**
   * (Android only) Marketing Cloud FCM sender id. Defaults to `project_info.project_number`
   * defined in `android.googleServicesFile` (google-services.json) if defined.
   */
  senderId: z.string().min(1).optional(),

  /**
   * Sets the configuration value to use for the Salesforce MarketingCloud Tenant Specific mid.
   */
  mid: z.string().min(1).optional(),

  /**
   * Sets the configuration flag that enables or disables inbox services
   */
  inboxEnabled: z.boolean().optional(),

  /**
   * Sets the configuration flag that enables or disables location services
   */
  locationEnabled: z.boolean().optional(),

  /**
   * Sets the configuration flag that enables or disables Salesforce MarketingCloud Analytics services
   */
  analyticsEnabled: z.boolean().optional(),

  /**
   * Sets the configuration value which enables or disables application control over badging
   */
  applicationControlsBadging: z.boolean().optional(),

  /**
   * Sets the configuration value which enables or disables application control over delaying SDK registration until a contact key is set
   */
  delayRegistrationUntilContactKeyIsSet: z.boolean().optional(),

  markNotificationReadOnInboxNotificationOpen: z.boolean().optional(),
}, {required_error: 'Must configure plugin options.'})

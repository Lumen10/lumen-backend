export default () => ({
  // Disable content-releases plugin to prevent undefined filter errors
  'content-releases': {
    enabled: false,
  },
  // Ensure other plugins are properly configured
  'users-permissions': {
    enabled: true,
  },
});

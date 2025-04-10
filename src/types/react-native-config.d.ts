declare module 'react-native-config' {
  interface Env {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
  }

  const Config: Env;
  export default Config;
}

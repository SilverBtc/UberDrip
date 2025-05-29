import { Redirect } from 'expo-router';

// Redirect from root to your main screens
export default function Index() {
  return <Redirect href="/screens" />;
}

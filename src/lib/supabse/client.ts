import 'react-native-url-polyfill/auto'; // 무조건 첫줄

import Config from 'react-native-config';
import {createClient} from '@supabase/supabase-js';
import {Database} from '../../types/types_db';

export const supabase = createClient<Database>(
  Config.SUPABASE_URL,
  Config.SUPABASE_ANON_KEY,
);

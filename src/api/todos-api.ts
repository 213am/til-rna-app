import {supabase} from '../lib/supabse/client';
import {Database} from '../types/types_db';
import {v4 as uuidv4} from 'uuid';
export type TodosRow = Database['public']['Tables']['todos']['Row'];
export type TodosRowInsert = Database['public']['Tables']['todos']['Insert'];
export type TodosRowUpdate = Database['public']['Tables']['todos']['Update'];

// Create
export const createTodo = async (title: string) => {
  const {data, error, status} = await supabase
    .from('todos')
    .insert([
      {
        title: title,
        contents: JSON.stringify([]),
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        user_id: uuidv4(),
        user_email: '',
      },
    ])
    .select()
    .single();

  if (error) {
    console.log(error.message);
    return;
  }

  return {data, error, status};
};
// Read
export const getTodos = async () => {
  let {data, error, status} = await supabase
    .from('todos')
    .select('*')
    .order('id', {ascending: false});

  if (error) {
    console.log(error.message);
    return;
  }
  return {data, error, status} as {
    data: TodosRow[] | null;
    error: Error | null;
    status: number;
  };
};
// Update
export const updateTodo = async (id: number, title: string) => {
  const {data, error, status} = await supabase
    .from('todos')
    .update({
      title: title,
    })
    .eq('id', id)
    .select()
    .single();

  return {data, error, status} as {
    data: TodosRow | null;
    error: Error | null;
    status: number;
  };
};
// Delete
export const deleteTodo = async (id: number) => {
  const {data, error} = await supabase.from('todos').delete().eq('id', id);
  if (error) {
    console.log(error.message);
    return {error};
  }
  return {data};
};

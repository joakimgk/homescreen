import { Database } from "./supabase";

export type Activity = Database["public"]["Views"]["v_event_last_activity"]["Row"];
export type Client = Database["public"]["Tables"]["client"]["Row"];
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      client: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          location: string | null
          name: string | null
          project_id: number
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          location?: string | null
          name?: string | null
          project_id: number
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          location?: string | null
          name?: string | null
          project_id?: number
          type?: string | null
        }
        Relationships: []
      }
      event: {
        Row: {
          button_id: string
          button_state: string
          client_id: number
          created_at: string | null
          id: number
          last_active: string | null
          project_id: number
        }
        Insert: {
          button_id: string
          button_state: string
          client_id: number
          created_at?: string | null
          id?: number
          last_active?: string | null
          project_id: number
        }
        Update: {
          button_id?: string
          button_state?: string
          client_id?: number
          created_at?: string | null
          id?: number
          last_active?: string | null
          project_id?: number
        }
        Relationships: []
      }
      log: {
        Row: {
          client_id: number | null
          created_at: string | null
          event: string | null
          id: number
          project_id: number | null
        }
        Insert: {
          client_id?: number | null
          created_at?: string | null
          event?: string | null
          id?: number
          project_id?: number | null
        }
        Update: {
          client_id?: number | null
          created_at?: string | null
          event?: string | null
          id?: number
          project_id?: number | null
        }
        Relationships: []
      }
      pass: {
        Row: {
          created_at: string | null
          id: number
          passhash: string
          project_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          passhash: string
          project_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          passhash?: string
          project_id?: number
        }
        Relationships: []
      }
      project: {
        Row: {
          created_at: string | null
          id: number
          passhash: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          passhash?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          passhash?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tick: {
        Row: {
          client_id: number
          id: number
          last_active: string | null
          project_id: number
          status: string | null
        }
        Insert: {
          client_id: number
          id?: number
          last_active?: string | null
          project_id: number
          status?: string | null
        }
        Update: {
          client_id?: number
          id?: number
          last_active?: string | null
          project_id?: number
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      v_event_last_activity: {
        Row: {
          button_id: string | null
          button_state: string | null
          client_id: number | null
          created_at: string | null
          id: number | null
          last_active: string | null
          project_id: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      getdevid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      getpasshash: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      getpasshash2: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      getprojectid: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      getprojectid2: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

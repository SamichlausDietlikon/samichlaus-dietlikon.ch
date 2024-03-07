export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      audits: {
        Row: {
          created_at: string
          id: number
          message: string
          morphed_id: number
          morphed_type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          morphed_id: number
          morphed_type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          morphed_id?: number
          morphed_type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_audits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      responsibilities: {
        Row: {
          created_at: string
          id: number
          name: string
          time_overlapping: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          time_overlapping?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          time_overlapping?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      season_calendar_entries: {
        Row: {
          created_at: string
          description: string | null
          from: string | null
          id: number
          season_id: number
          title: string
          until: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          from?: string | null
          id?: number
          season_id: number
          title: string
          until?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          from?: string | null
          id?: number
          season_id?: number
          title?: string
          until?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_season_calendar_entries_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      season_members: {
        Row: {
          created_at: string
          id: number
          season_id: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          season_id?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          season_id?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_season_members_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_season_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      season_templates: {
        Row: {
          created_at: string
          id: number
          season_id: number
          tout_template_version_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          season_id: number
          tout_template_version_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          season_id?: number
          tout_template_version_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_season_templates_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      season_tour_events: {
        Row: {
          created_at: string
          from: string
          id: number
          name: string
          season_tour_id: number
          until: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          from: string
          id?: number
          name: string
          season_tour_id: number
          until: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          from?: string
          id?: number
          name?: string
          season_tour_id?: number
          until?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_season_tour_events_season_tour_id_fkey"
            columns: ["season_tour_id"]
            isOneToOne: false
            referencedRelation: "season_tours"
            referencedColumns: ["id"]
          },
        ]
      }
      season_tour_roles: {
        Row: {
          created_at: string
          id: number
          responsibility_id: number
          season_tour_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          responsibility_id: number
          season_tour_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          responsibility_id?: number
          season_tour_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_season_tour_roles_responsibility_id_fkey"
            columns: ["responsibility_id"]
            isOneToOne: false
            referencedRelation: "responsibilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_season_tour_roles_season_tour_id_fkey"
            columns: ["season_tour_id"]
            isOneToOne: false
            referencedRelation: "season_tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_season_tour_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      season_tour_villages: {
        Row: {
          created_at: string
          id: number
          season_tour_id: number
          updated_at: string
          village_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          season_tour_id: number
          updated_at?: string
          village_id: number
        }
        Update: {
          created_at?: string
          id?: number
          season_tour_id?: number
          updated_at?: string
          village_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_season_tour_villages_season_tour_id_fkey"
            columns: ["season_tour_id"]
            isOneToOne: false
            referencedRelation: "season_tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_season_tour_villages_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      season_tours: {
        Row: {
          active: boolean
          comment: string | null
          created_at: string
          from: string
          id: number
          name: string
          season_id: number
          tour_template_version_id: number
          until: string
          updated_at: string
        }
        Insert: {
          active: boolean
          comment?: string | null
          created_at?: string
          from: string
          id?: number
          name: string
          season_id: number
          tour_template_version_id: number
          until: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          comment?: string | null
          created_at?: string
          from?: string
          id?: number
          name?: string
          season_id?: number
          tour_template_version_id?: number
          until?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_season_tours_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_season_tours_tour_template_version_id_fkey"
            columns: ["tour_template_version_id"]
            isOneToOne: false
            referencedRelation: "tour_template_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      season_visit_sins: {
        Row: {
          age: number
          class: string | null
          comment: string | null
          created_at: string
          disliked_food: Json | null
          father_name: string | null
          first_name: string
          grandfather_name: string | null
          grandmother_name: string | null
          hobbies: Json | null
          id: number
          last_name: string
          liked_food: Json | null
          mother_name: string | null
          negatives: Json | null
          pet: string | null
          positives: Json | null
          season_visit_id: number
          teacher: string | null
          updated_at: string
        }
        Insert: {
          age: number
          class?: string | null
          comment?: string | null
          created_at?: string
          disliked_food?: Json | null
          father_name?: string | null
          first_name: string
          grandfather_name?: string | null
          grandmother_name?: string | null
          hobbies?: Json | null
          id?: number
          last_name: string
          liked_food?: Json | null
          mother_name?: string | null
          negatives?: Json | null
          pet?: string | null
          positives?: Json | null
          season_visit_id: number
          teacher?: string | null
          updated_at?: string
        }
        Update: {
          age?: number
          class?: string | null
          comment?: string | null
          created_at?: string
          disliked_food?: Json | null
          father_name?: string | null
          first_name?: string
          grandfather_name?: string | null
          grandmother_name?: string | null
          hobbies?: Json | null
          id?: number
          last_name?: string
          liked_food?: Json | null
          mother_name?: string | null
          negatives?: Json | null
          pet?: string | null
          positives?: Json | null
          season_visit_id?: number
          teacher?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_season_visit_sins_season_visit_id_fkey"
            columns: ["season_visit_id"]
            isOneToOne: false
            referencedRelation: "season_visits"
            referencedColumns: ["id"]
          },
        ]
      }
      season_visits: {
        Row: {
          child_informations: boolean
          child_informations_notifier_sent: boolean
          city: string | null
          comment: string | null
          created_at: string
          donation: number | null
          from: string | null
          id: number
          organization: string | null
          registration_complete: boolean
          season_tour_id: number | null
          street: string | null
          template_data: Json
          until: string | null
          updated_at: string
          user_id: string | null
          visit_confirmation_email_sent: boolean
          visit_confirmed: boolean
          zip: number | null
        }
        Insert: {
          child_informations?: boolean
          child_informations_notifier_sent?: boolean
          city?: string | null
          comment?: string | null
          created_at?: string
          donation?: number | null
          from?: string | null
          id?: number
          organization?: string | null
          registration_complete?: boolean
          season_tour_id?: number | null
          street?: string | null
          template_data: Json
          until?: string | null
          updated_at?: string
          user_id?: string | null
          visit_confirmation_email_sent?: boolean
          visit_confirmed?: boolean
          zip?: number | null
        }
        Update: {
          child_informations?: boolean
          child_informations_notifier_sent?: boolean
          city?: string | null
          comment?: string | null
          created_at?: string
          donation?: number | null
          from?: string | null
          id?: number
          organization?: string | null
          registration_complete?: boolean
          season_tour_id?: number | null
          street?: string | null
          template_data?: Json
          until?: string | null
          updated_at?: string
          user_id?: string | null
          visit_confirmation_email_sent?: boolean
          visit_confirmed?: boolean
          zip?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_season_visits_season_tour_id_fkey"
            columns: ["season_tour_id"]
            isOneToOne: false
            referencedRelation: "season_tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_season_visits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      seasons: {
        Row: {
          created_at: string
          from: string | null
          id: number
          name: string | null
          udpated_at: string
          until: string | null
        }
        Insert: {
          created_at?: string
          from?: string | null
          id?: number
          name?: string | null
          udpated_at?: string
          until?: string | null
        }
        Update: {
          created_at?: string
          from?: string | null
          id?: number
          name?: string | null
          udpated_at?: string
          until?: string | null
        }
        Relationships: []
      }
      tour_template_versions: {
        Row: {
          created_at: string
          description: string | null
          id: number
          tag: Database["public"]["Enums"]["tour_template_tags"]
          template: Json
          tour_template_id: number | null
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          tag: Database["public"]["Enums"]["tour_template_tags"]
          template: Json
          tour_template_id?: number | null
          updated_at?: string
          version: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          tag?: Database["public"]["Enums"]["tour_template_tags"]
          template?: Json
          tour_template_id?: number | null
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_tour_template_versions_tour_template_id_fkey"
            columns: ["tour_template_id"]
            isOneToOne: false
            referencedRelation: "tour_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_templates: {
        Row: {
          created_at: string
          description: string
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_staff_roles: {
        Row: {
          created_at: string
          staff_role: Database["public"]["Enums"]["staff_roles"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          staff_role: Database["public"]["Enums"]["staff_roles"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          staff_role?: Database["public"]["Enums"]["staff_roles"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_staff_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          store_email: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id: string
          last_name: string
          store_email?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          store_email?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      villages: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      staff_roles: "admin" | "tour_manager" | "staff"
      tour_template_tags: "development" | "released" | "deprecated"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
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
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
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
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
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
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never


export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      accionespropiedades: {
        Row: {
          created_at: string
          id_accion_propiedad: number
          nombre_accion_propiedad: string
        }
        Insert: {
          created_at?: string
          id_accion_propiedad?: number
          nombre_accion_propiedad: string
        }
        Update: {
          created_at?: string
          id_accion_propiedad?: number
          nombre_accion_propiedad?: string
        }
        Relationships: []
      }
      amenidades: {
        Row: {
          created_at: string
          id_amenidad: number
          nombre_amenidad: string
        }
        Insert: {
          created_at?: string
          id_amenidad?: number
          nombre_amenidad: string
        }
        Update: {
          created_at?: string
          id_amenidad?: number
          nombre_amenidad?: string
        }
        Relationships: []
      }
      amenidadespropiedades: {
        Row: {
          created_at: string
          id_amenidad: number
          id_amenidad_propiedad: number
          id_propiedad: number
        }
        Insert: {
          created_at?: string
          id_amenidad: number
          id_amenidad_propiedad?: number
          id_propiedad: number
        }
        Update: {
          created_at?: string
          id_amenidad?: number
          id_amenidad_propiedad?: number
          id_propiedad?: number
        }
        Relationships: [
          {
            foreignKeyName: "amenidadespropiedades_id_amenidad_fkey"
            columns: ["id_amenidad"]
            isOneToOne: false
            referencedRelation: "amenidades"
            referencedColumns: ["id_amenidad"]
          },
          {
            foreignKeyName: "amenidadespropiedades_id_propiedad_fkey"
            columns: ["id_propiedad"]
            isOneToOne: false
            referencedRelation: "propiedades"
            referencedColumns: ["id_propiedad"]
          },
        ]
      }
      ciudades: {
        Row: {
          created_at: string
          id_ciudad: number
          id_estado: number
          nombre_ciudad: string
        }
        Insert: {
          created_at?: string
          id_ciudad?: number
          id_estado: number
          nombre_ciudad: string
        }
        Update: {
          created_at?: string
          id_ciudad?: number
          id_estado?: number
          nombre_ciudad?: string
        }
        Relationships: [
          {
            foreignKeyName: "ciudades_id_estado_fkey"
            columns: ["id_estado"]
            isOneToOne: false
            referencedRelation: "estados"
            referencedColumns: ["id_estado"]
          },
        ]
      }
      clientes: {
        Row: {
          accion: string | null
          cantidad_banios: number | null
          cantidad_estacionamientos: number | null
          cantidad_habitaciones: number | null
          created_at: string
          dni_cif_cliente: string | null
          email_cliente: string
          id_cliente: number
          id_usuario: string
          intereses_cliente: string | null
          nombre_cliente: string
          nota_cliente: string | null
          presupuesto_desde_cliente: number | null
          presupuesto_hasta_cliente: number | null
          telefono_cliente: string
          tipo_propiedad: string | null
          updated_at: string
        }
        Insert: {
          accion?: string | null
          cantidad_banios?: number | null
          cantidad_estacionamientos?: number | null
          cantidad_habitaciones?: number | null
          created_at?: string
          dni_cif_cliente?: string | null
          email_cliente: string
          id_cliente?: number
          id_usuario?: string
          intereses_cliente?: string | null
          nombre_cliente: string
          nota_cliente?: string | null
          presupuesto_desde_cliente?: number | null
          presupuesto_hasta_cliente?: number | null
          telefono_cliente: string
          tipo_propiedad?: string | null
          updated_at?: string
        }
        Update: {
          accion?: string | null
          cantidad_banios?: number | null
          cantidad_estacionamientos?: number | null
          cantidad_habitaciones?: number | null
          created_at?: string
          dni_cif_cliente?: string | null
          email_cliente?: string
          id_cliente?: number
          id_usuario?: string
          intereses_cliente?: string | null
          nombre_cliente?: string
          nota_cliente?: string | null
          presupuesto_desde_cliente?: number | null
          presupuesto_hasta_cliente?: number | null
          telefono_cliente?: string
          tipo_propiedad?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clientes_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      colonias: {
        Row: {
          created_at: string
          id_colonia: number
          id_zona: number | null
          nombre_colonia: string
        }
        Insert: {
          created_at?: string
          id_colonia?: number
          id_zona?: number | null
          nombre_colonia: string
        }
        Update: {
          created_at?: string
          id_colonia?: number
          id_zona?: number | null
          nombre_colonia?: string
        }
        Relationships: []
      }
      communities: {
        Row: {
          banner_url: string | null
          created_at: string
          description: string
          id: string
          id_usuario: string
          is_private: boolean
          name: string
          updated_at: string
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          description: string
          id?: string
          id_usuario?: string
          is_private?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          description?: string
          id?: string
          id_usuario?: string
          is_private?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "communities_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      course_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          duration: string | null
          id: string
          image_url: string | null
          instructor_avatar: string | null
          instructor_name: string
          is_published: boolean
          keywords: string | null
          level: string
          price: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          image_url?: string | null
          instructor_avatar?: string | null
          instructor_name: string
          is_published?: boolean
          keywords?: string | null
          level: string
          price?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          image_url?: string | null
          instructor_avatar?: string | null
          instructor_name?: string
          is_published?: boolean
          keywords?: string | null
          level?: string
          price?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      estados: {
        Row: {
          created_at: string
          id_estado: number
          id_pais: number
          nombre_estado: string
        }
        Insert: {
          created_at?: string
          id_estado?: number
          id_pais: number
          nombre_estado: string
        }
        Update: {
          created_at?: string
          id_estado?: number
          id_pais?: number
          nombre_estado?: string
        }
        Relationships: [
          {
            foreignKeyName: "estados_id_pais_fkey"
            columns: ["id_pais"]
            isOneToOne: false
            referencedRelation: "paises"
            referencedColumns: ["id_pais"]
          },
        ]
      }
      inquilinos: {
        Row: {
          created_at: string
          dni_cif: string | null
          email: string | null
          estado: boolean
          id: number
          id_usuario: string
          nombre: string
          ocupacion: string | null
          phone_number: string | null
          tipo: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          dni_cif?: string | null
          email?: string | null
          estado?: boolean
          id?: number
          id_usuario: string
          nombre: string
          ocupacion?: string | null
          phone_number?: string | null
          tipo?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          dni_cif?: string | null
          email?: string | null
          estado?: boolean
          id?: number
          id_usuario?: string
          nombre?: string
          ocupacion?: string | null
          phone_number?: string | null
          tipo?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquilinos_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      ofertas: {
        Row: {
          action: string
          contacto: string | null
          created_at: string
          id: number
          max_price: number | null
          min_price: number | null
          nivel_urgencia: string
          notas_adicionales: string | null
          status: Database["public"]["Enums"]["offer_status"]
          tipos_propiedades: string[]
          ubicaciones: string[]
          user_id: string | null
        }
        Insert: {
          action: string
          contacto?: string | null
          created_at?: string
          id?: number
          max_price?: number | null
          min_price?: number | null
          nivel_urgencia: string
          notas_adicionales?: string | null
          status?: Database["public"]["Enums"]["offer_status"]
          tipos_propiedades: string[]
          ubicaciones: string[]
          user_id?: string | null
        }
        Update: {
          action?: string
          contacto?: string | null
          created_at?: string
          id?: number
          max_price?: number | null
          min_price?: number | null
          nivel_urgencia?: string
          notas_adicionales?: string | null
          status?: Database["public"]["Enums"]["offer_status"]
          tipos_propiedades?: string[]
          ubicaciones?: string[]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ofertas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      paises: {
        Row: {
          created_at: string
          id_pais: number
          nombre_pais: string
        }
        Insert: {
          created_at?: string
          id_pais?: number
          nombre_pais: string
        }
        Update: {
          created_at?: string
          id_pais?: number
          nombre_pais?: string
        }
        Relationships: []
      }
      propiedades: {
        Row: {
          amenidades: number[] | null
          area_construida_propiedad: number | null
          area_propiedad: number | null
          banios_propiedad: number | null
          caracteristicas_adicionales_propiedad: string | null
          categoria_propiedad: string | null
          codigo_postal_propiedad: string | null
          colonia_propiedad: string | null
          created_at: string
          descripcion_estado_propiedad: string
          descripcion_inversion_propiedad: string | null
          descripcion_propiedad: string | null
          direccion_propiedad: string
          estacionamientos_propiedad: number | null
          fecha_cambio_status: string
          habitaciones_propiedad: number | null
          id_accion_propiedad: number
          id_ciudad_propiedad: number
          id_estado_propiedad: number
          id_propiedad: number
          id_status_propiedad: number | null
          id_uso_propiedad: number
          id_usuario: string
          id_zona_propiedad: number | null
          is_unit: boolean
          numero_plantas_propiedad: number | null
          precio_propiedad: number | null
          referencias_propiedad: string | null
          tipo_propiedad: string | null
          titulo_propiedad: string
          verificacion_documentos_propiedad: string | null
        }
        Insert: {
          amenidades?: number[] | null
          area_construida_propiedad?: number | null
          area_propiedad?: number | null
          banios_propiedad?: number | null
          caracteristicas_adicionales_propiedad?: string | null
          categoria_propiedad?: string | null
          codigo_postal_propiedad?: string | null
          colonia_propiedad?: string | null
          created_at?: string
          descripcion_estado_propiedad: string
          descripcion_inversion_propiedad?: string | null
          descripcion_propiedad?: string | null
          direccion_propiedad: string
          estacionamientos_propiedad?: number | null
          fecha_cambio_status?: string
          habitaciones_propiedad?: number | null
          id_accion_propiedad: number
          id_ciudad_propiedad: number
          id_estado_propiedad: number
          id_propiedad?: number
          id_status_propiedad?: number | null
          id_uso_propiedad: number
          id_usuario: string
          id_zona_propiedad?: number | null
          is_unit?: boolean
          numero_plantas_propiedad?: number | null
          precio_propiedad?: number | null
          referencias_propiedad?: string | null
          tipo_propiedad?: string | null
          titulo_propiedad: string
          verificacion_documentos_propiedad?: string | null
        }
        Update: {
          amenidades?: number[] | null
          area_construida_propiedad?: number | null
          area_propiedad?: number | null
          banios_propiedad?: number | null
          caracteristicas_adicionales_propiedad?: string | null
          categoria_propiedad?: string | null
          codigo_postal_propiedad?: string | null
          colonia_propiedad?: string | null
          created_at?: string
          descripcion_estado_propiedad?: string
          descripcion_inversion_propiedad?: string | null
          descripcion_propiedad?: string | null
          direccion_propiedad?: string
          estacionamientos_propiedad?: number | null
          fecha_cambio_status?: string
          habitaciones_propiedad?: number | null
          id_accion_propiedad?: number
          id_ciudad_propiedad?: number
          id_estado_propiedad?: number
          id_propiedad?: number
          id_status_propiedad?: number | null
          id_uso_propiedad?: number
          id_usuario?: string
          id_zona_propiedad?: number | null
          is_unit?: boolean
          numero_plantas_propiedad?: number | null
          precio_propiedad?: number | null
          referencias_propiedad?: string | null
          tipo_propiedad?: string | null
          titulo_propiedad?: string
          verificacion_documentos_propiedad?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "propiedades_id_accion_propiedad_fkey"
            columns: ["id_accion_propiedad"]
            isOneToOne: false
            referencedRelation: "accionespropiedades"
            referencedColumns: ["id_accion_propiedad"]
          },
          {
            foreignKeyName: "propiedades_id_ciudad_propiedad_fkey"
            columns: ["id_ciudad_propiedad"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id_ciudad"]
          },
          {
            foreignKeyName: "propiedades_id_estado_propiedad_fkey"
            columns: ["id_estado_propiedad"]
            isOneToOne: false
            referencedRelation: "estados"
            referencedColumns: ["id_estado"]
          },
          {
            foreignKeyName: "propiedades_id_status_propiedad_fkey"
            columns: ["id_status_propiedad"]
            isOneToOne: false
            referencedRelation: "statuspropiedad"
            referencedColumns: ["id_status_propiedad"]
          },
          {
            foreignKeyName: "propiedades_id_uso_propiedad_fkey"
            columns: ["id_uso_propiedad"]
            isOneToOne: false
            referencedRelation: "usospropiedades"
            referencedColumns: ["id_uso_propiedad"]
          },
          {
            foreignKeyName: "propiedades_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "propiedades_id_zona_propiedad_fkey"
            columns: ["id_zona_propiedad"]
            isOneToOne: false
            referencedRelation: "zonas"
            referencedColumns: ["id_zona"]
          },
        ]
      }
      propiedades_guardadas: {
        Row: {
          created_at: string
          id: number
          id_propiedad: number
          id_usuario: string
        }
        Insert: {
          created_at?: string
          id?: number
          id_propiedad: number
          id_usuario: string
        }
        Update: {
          created_at?: string
          id?: number
          id_propiedad?: number
          id_usuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "propiedades_guardadas_id_propiedad_fkey"
            columns: ["id_propiedad"]
            isOneToOne: false
            referencedRelation: "propiedades"
            referencedColumns: ["id_propiedad"]
          },
          {
            foreignKeyName: "propiedades_guardadas_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      propiedades_imagenes: {
        Row: {
          created_at: string
          id: number
          id_propiedad: number
          image_url: string
        }
        Insert: {
          created_at?: string
          id?: number
          id_propiedad: number
          image_url: string
        }
        Update: {
          created_at?: string
          id?: number
          id_propiedad?: number
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "propiedades_imagenes_id_propiedad_fkey"
            columns: ["id_propiedad"]
            isOneToOne: false
            referencedRelation: "propiedades"
            referencedColumns: ["id_propiedad"]
          },
        ]
      }
      solicitudes_inmuebles: {
        Row: {
          banos: number | null
          comentarios: string | null
          correo_contacto: string
          created_at: string
          detalles_adicionales: string | null
          estacionamientos: number | null
          estado_solicitud: Database["public"]["Enums"]["estado_solicitud"]
          habitaciones: number | null
          id: number
          id_ciudad: number | null
          metros_cuadrados: number | null
          nombre_contacto: string | null
          presupuesto_max: number | null
          presupuesto_min: number | null
          telefono_contacto: string | null
          tipo_operacion: string | null
          tipo_propiedad: number
          updated_at: string
          usuario_id: string
          zona: string | null
        }
        Insert: {
          banos?: number | null
          comentarios?: string | null
          correo_contacto: string
          created_at?: string
          detalles_adicionales?: string | null
          estacionamientos?: number | null
          estado_solicitud?: Database["public"]["Enums"]["estado_solicitud"]
          habitaciones?: number | null
          id?: number
          id_ciudad?: number | null
          metros_cuadrados?: number | null
          nombre_contacto?: string | null
          presupuesto_max?: number | null
          presupuesto_min?: number | null
          telefono_contacto?: string | null
          tipo_operacion?: string | null
          tipo_propiedad: number
          updated_at?: string
          usuario_id: string
          zona?: string | null
        }
        Update: {
          banos?: number | null
          comentarios?: string | null
          correo_contacto?: string
          created_at?: string
          detalles_adicionales?: string | null
          estacionamientos?: number | null
          estado_solicitud?: Database["public"]["Enums"]["estado_solicitud"]
          habitaciones?: number | null
          id?: number
          id_ciudad?: number | null
          metros_cuadrados?: number | null
          nombre_contacto?: string | null
          presupuesto_max?: number | null
          presupuesto_min?: number | null
          telefono_contacto?: string | null
          tipo_operacion?: string | null
          tipo_propiedad?: number
          updated_at?: string
          usuario_id?: string
          zona?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "solicitudes_inmuebles_id_ciudad_fkey"
            columns: ["id_ciudad"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id_ciudad"]
          },
          {
            foreignKeyName: "solicitudes_inmuebles_tipo_propiedad_fkey"
            columns: ["tipo_propiedad"]
            isOneToOne: false
            referencedRelation: "tipospropiedades"
            referencedColumns: ["id_tipo_propiedad"]
          },
          {
            foreignKeyName: "solicitudes_inmuebles_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      statuspropiedad: {
        Row: {
          created_at: string
          id_status_propiedad: number
          nombre_status_propiedad: string
        }
        Insert: {
          created_at?: string
          id_status_propiedad?: number
          nombre_status_propiedad: string
        }
        Update: {
          created_at?: string
          id_status_propiedad?: number
          nombre_status_propiedad?: string
        }
        Relationships: []
      }
      tipospropiedades: {
        Row: {
          created_at: string
          id_tipo_propiedad: number
          nombre_tipo_propiedad: string
        }
        Insert: {
          created_at?: string
          id_tipo_propiedad?: number
          nombre_tipo_propiedad: string
        }
        Update: {
          created_at?: string
          id_tipo_propiedad?: number
          nombre_tipo_propiedad?: string
        }
        Relationships: []
      }
      unidades_propiedades: {
        Row: {
          amenidades: number[] | null
          area_unidad: number
          banios_unidad: number
          caracteristicas_adicionales_unidad: string | null
          codigo_postal_unidad: string | null
          colonia_unidad: string | null
          created_at: string
          descripcion_estado_unidad: string | null
          descripcion_inversion_unidad: string | null
          descripcion_unidad: string
          direccion_unidad: string | null
          estacionamientos_unidad: number
          habitaciones_unidad: number
          id: number
          id_accion_unidad: number
          id_ciudad: number | null
          id_estado: number | null
          id_propiedad: number
          id_usuario: string
          nombre_unidad: string
          precio_unidad: number
          tipo_unidad: Database["public"]["Enums"]["tipo_unidad"]
        }
        Insert: {
          amenidades?: number[] | null
          area_unidad: number
          banios_unidad: number
          caracteristicas_adicionales_unidad?: string | null
          codigo_postal_unidad?: string | null
          colonia_unidad?: string | null
          created_at?: string
          descripcion_estado_unidad?: string | null
          descripcion_inversion_unidad?: string | null
          descripcion_unidad: string
          direccion_unidad?: string | null
          estacionamientos_unidad: number
          habitaciones_unidad: number
          id?: number
          id_accion_unidad?: number
          id_ciudad?: number | null
          id_estado?: number | null
          id_propiedad: number
          id_usuario: string
          nombre_unidad: string
          precio_unidad: number
          tipo_unidad: Database["public"]["Enums"]["tipo_unidad"]
        }
        Update: {
          amenidades?: number[] | null
          area_unidad?: number
          banios_unidad?: number
          caracteristicas_adicionales_unidad?: string | null
          codigo_postal_unidad?: string | null
          colonia_unidad?: string | null
          created_at?: string
          descripcion_estado_unidad?: string | null
          descripcion_inversion_unidad?: string | null
          descripcion_unidad?: string
          direccion_unidad?: string | null
          estacionamientos_unidad?: number
          habitaciones_unidad?: number
          id?: number
          id_accion_unidad?: number
          id_ciudad?: number | null
          id_estado?: number | null
          id_propiedad?: number
          id_usuario?: string
          nombre_unidad?: string
          precio_unidad?: number
          tipo_unidad?: Database["public"]["Enums"]["tipo_unidad"]
        }
        Relationships: [
          {
            foreignKeyName: "unidades_id_accion_unidad_fkey"
            columns: ["id_accion_unidad"]
            isOneToOne: false
            referencedRelation: "accionespropiedades"
            referencedColumns: ["id_accion_propiedad"]
          },
          {
            foreignKeyName: "unidades_id_ciudad_fkey"
            columns: ["id_ciudad"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id_ciudad"]
          },
          {
            foreignKeyName: "unidades_id_estado_fkey"
            columns: ["id_estado"]
            isOneToOne: false
            referencedRelation: "estados"
            referencedColumns: ["id_estado"]
          },
          {
            foreignKeyName: "unidades_id_propiedad_fkey"
            columns: ["id_propiedad"]
            isOneToOne: false
            referencedRelation: "propiedades"
            referencedColumns: ["id_propiedad"]
          },
          {
            foreignKeyName: "unidades_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      unidades_propiedades_imagenes: {
        Row: {
          created_at: string
          id: number
          id_unidad: number
          image_url: string
        }
        Insert: {
          created_at?: string
          id?: number
          id_unidad: number
          image_url: string
        }
        Update: {
          created_at?: string
          id?: number
          id_unidad?: number
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "unidades_imagenes_id_unidad_fkey"
            columns: ["id_unidad"]
            isOneToOne: false
            referencedRelation: "unidades_propiedades"
            referencedColumns: ["id"]
          },
        ]
      }
      usospropiedades: {
        Row: {
          created_at: string
          id_uso_propiedad: number
          nombre_uso_propiedad: string
        }
        Insert: {
          created_at?: string
          id_uso_propiedad?: number
          nombre_uso_propiedad: string
        }
        Update: {
          created_at?: string
          id_uso_propiedad?: number
          nombre_uso_propiedad?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          actividad_usuario: string | null
          banner_usuario: string | null
          descripcion_usuario: string | null
          email_usuario: string
          estado_usuario: boolean
          fecha_creacion_usuario: string
          id: string
          id_ciudad: number | null
          id_estado: number | null
          imagen_perfil_usuario: string | null
          nombre_usuario: string | null
          telefono_usuario: string | null
        }
        Insert: {
          actividad_usuario?: string | null
          banner_usuario?: string | null
          descripcion_usuario?: string | null
          email_usuario: string
          estado_usuario?: boolean
          fecha_creacion_usuario?: string
          id: string
          id_ciudad?: number | null
          id_estado?: number | null
          imagen_perfil_usuario?: string | null
          nombre_usuario?: string | null
          telefono_usuario?: string | null
        }
        Update: {
          actividad_usuario?: string | null
          banner_usuario?: string | null
          descripcion_usuario?: string | null
          email_usuario?: string
          estado_usuario?: boolean
          fecha_creacion_usuario?: string
          id?: string
          id_ciudad?: number | null
          id_estado?: number | null
          imagen_perfil_usuario?: string | null
          nombre_usuario?: string | null
          telefono_usuario?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_id_ciudad_fkey"
            columns: ["id_ciudad"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id_ciudad"]
          },
          {
            foreignKeyName: "usuarios_id_estado_fkey"
            columns: ["id_estado"]
            isOneToOne: false
            referencedRelation: "estados"
            referencedColumns: ["id_estado"]
          },
        ]
      }
      zonas: {
        Row: {
          created_at: string
          id_ciudad: number | null
          id_zona: number
          nombre_zona: string | null
        }
        Insert: {
          created_at?: string
          id_ciudad?: number | null
          id_zona?: number
          nombre_zona?: string | null
        }
        Update: {
          created_at?: string
          id_ciudad?: number | null
          id_zona?: number
          nombre_zona?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "zonas_id_ciudad_fkey"
            columns: ["id_ciudad"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id_ciudad"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      estado_solicitud: "nueva" | "en_proceso" | "completada" | "cancelada"
      offer_status: "Activa" | "Pausada"
      tipo_unidad:
        | "Departamento"
        | "Local comercial"
        | "Oficina"
        | "Lote"
        | "Casa"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      estado_solicitud: ["nueva", "en_proceso", "completada", "cancelada"],
      offer_status: ["Activa", "Pausada"],
      tipo_unidad: [
        "Departamento",
        "Local comercial",
        "Oficina",
        "Lote",
        "Casa",
      ],
    },
  },
} as const

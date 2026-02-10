"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Palette, Type, Image as ImageIcon, Save, RotateCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logo: string | null;
  banner: string | null;
}

interface ThemeEditorProps {
  currentTheme: ThemeConfig;
  onSave: (theme: ThemeConfig) => Promise<void>;
  isSaving?: boolean;
}

export function ThemeEditor({ currentTheme, onSave, isSaving = false }: ThemeEditorProps) {
  const [theme, setTheme] = useState<ThemeConfig>(currentTheme);
  const [hasChanges, setHasChanges] = useState(false);

  const fontOptions = [
    { value: "Inter", label: "Inter (Moderno)" },
    { value: "Roboto", label: "Roboto (Limpio)" },
    { value: "Open Sans", label: "Open Sans (Profesional)" },
    { value: "Lato", label: "Lato (Elegante)" },
    { value: "Montserrat", label: "Montserrat (Contemporáneo)" },
    { value: "Poppins", label: "Poppins (Amigable)" },
    { value: "Playfair Display", label: "Playfair Display (Clásico)" },
  ];

  const handleColorChange = (field: 'primaryColor' | 'secondaryColor', value: string) => {
    setTheme(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleFontChange = (value: string) => {
    setTheme(prev => ({ ...prev, fontFamily: value }));
    setHasChanges(true);
  };

  const handleReset = () => {
    setTheme(currentTheme);
    setHasChanges(false);
  };

  const handleSave = async () => {
    await onSave(theme);
    setHasChanges(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Editor de Tema
            </CardTitle>
            <CardDescription>
              Personaliza los colores y tipografía de tu sitio
            </CardDescription>
          </div>
          {hasChanges && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={isSaving}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Descartar
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sección de Colores */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colores
          </h4>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Color Primario</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  className="w-20 h-10 cursor-pointer"
                />
                <Input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  placeholder="#3B82F6"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Color principal de botones y enlaces
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Color Secundario</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                  className="w-20 h-10 cursor-pointer"
                />
                <Input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                  placeholder="#1E40AF"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Color de acentos y hover
              </p>
            </div>
          </div>
        </div>

        {/* Sección de Tipografía */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Type className="h-4 w-4" />
            Tipografía
          </h4>
          
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Familia de Fuente</Label>
            <Select value={theme.fontFamily} onValueChange={handleFontChange}>
              <SelectTrigger id="fontFamily">
                <SelectValue placeholder="Selecciona una fuente" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Fuente principal del sitio
            </p>
          </div>
        </div>

        {/* Sección de Imágenes (Preparado para futuro) */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Imágenes
          </h4>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {theme.logo ? (
                  <div className="space-y-2">
                    <img src={theme.logo} alt="Logo" className="h-16 mx-auto" />
                    <Button variant="outline" size="sm">
                      Cambiar Logo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Próximamente: Subir logo
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Banner</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {theme.banner ? (
                  <div className="space-y-2">
                    <img src={theme.banner} alt="Banner" className="h-16 mx-auto" />
                    <Button variant="outline" size="sm">
                      Cambiar Banner
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Próximamente: Subir banner
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="text-sm font-semibold">Vista Previa</h4>
          <div 
            className="border rounded-lg p-6 space-y-4"
            style={{ fontFamily: theme.fontFamily }}
          >
            <h3 
              className="text-2xl font-bold"
              style={{ color: theme.primaryColor }}
            >
              Título de Ejemplo
            </h3>
            <p className="text-gray-600">
              Este es un texto de ejemplo para visualizar cómo se verá tu sitio con la tipografía seleccionada.
            </p>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: theme.primaryColor }}
              >
                Botón Primario
              </button>
              <button
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: theme.secondaryColor }}
              >
                Botón Secundario
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

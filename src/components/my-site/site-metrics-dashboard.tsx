"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Eye, MousePointerClick, Calendar } from "lucide-react";

interface SiteMetrics {
  totalVisits: number;
  uniqueVisitors: number;
  totalLeads: number;
  propertyViews: number;
  lastUpdated: Date;
  visitsChange: number; // Porcentaje de cambio vs período anterior
  leadsChange: number;
}

interface SiteMetricsDashboardProps {
  metrics?: SiteMetrics;
  isLoading?: boolean;
}

export function SiteMetricsDashboard({ metrics, isLoading = false }: SiteMetricsDashboardProps) {
  // Datos mock para desarrollo (serán reemplazados por datos reales de la API)
  const defaultMetrics: SiteMetrics = {
    totalVisits: 1247,
    uniqueVisitors: 892,
    totalLeads: 23,
    propertyViews: 3456,
    lastUpdated: new Date(),
    visitsChange: 12.5,
    leadsChange: 8.3,
  };

  const data = metrics || defaultMetrics;

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-MX').format(num);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  const metrics_cards = [
    {
      title: "Visitas Totales",
      value: data.totalVisits,
      change: data.visitsChange,
      icon: Eye,
      description: "Últimos 30 días",
    },
    {
      title: "Visitantes Únicos",
      value: data.uniqueVisitors,
      change: null,
      icon: Users,
      description: "Últimos 30 días",
    },
    {
      title: "Leads Generados",
      value: data.totalLeads,
      change: data.leadsChange,
      icon: MousePointerClick,
      description: "Formularios completados",
    },
    {
      title: "Vistas de Propiedades",
      value: data.propertyViews,
      change: null,
      icon: TrendingUp,
      description: "Total de vistas",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Estadísticas del Sitio</h3>
          <p className="text-sm text-muted-foreground">
            Última actualización: {data.lastUpdated.toLocaleDateString('es-MX', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          Ver reporte completo
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics_cards.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(metric.value)}</div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                  {metric.change !== null && (
                    <span className={`text-xs font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatChange(metric.change)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Nota para desarrollo */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Nota de desarrollo:</strong> Estas métricas son datos de ejemplo. 
          En producción, se conectarán a la tabla <code className="bg-blue-100 px-1 rounded">site_analytics</code> 
          para mostrar datos reales de visitas y conversiones.
        </p>
      </div>
    </div>
  );
}

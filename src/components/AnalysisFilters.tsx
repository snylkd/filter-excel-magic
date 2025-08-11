import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Search, Filter } from "lucide-react";

interface AnalysisFiltersProps {
  onAnalyze: (filters: FilterOptions) => void;
  isLoading: boolean;
}

export interface FilterOptions {
  category: string;
  type: string;
  dateRange: string;
  keywords: string;
  source: string;
}

const AnalysisFilters = ({ onAnalyze, isLoading }: AnalysisFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: "",
    type: "",
    dateRange: "",
    keywords: "",
    source: ""
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAnalyze = () => {
    onAnalyze(filters);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtres d'analyse
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technologie">Technologie</SelectItem>
                <SelectItem value="sante">Santé</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Éducation</SelectItem>
                <SelectItem value="environnement">Environnement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type de référence</Label>
            <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="article">Article scientifique</SelectItem>
                <SelectItem value="rapport">Rapport</SelectItem>
                <SelectItem value="etude">Étude de cas</SelectItem>
                <SelectItem value="livre">Livre</SelectItem>
                <SelectItem value="conference">Conférence</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateRange">Période</Label>
            <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1mois">Dernier mois</SelectItem>
                <SelectItem value="3mois">3 derniers mois</SelectItem>
                <SelectItem value="6mois">6 derniers mois</SelectItem>
                <SelectItem value="1an">Dernière année</SelectItem>
                <SelectItem value="tout">Toutes les périodes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Select value={filters.source} onValueChange={(value) => handleFilterChange("source", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pubmed">PubMed</SelectItem>
                <SelectItem value="arxiv">arXiv</SelectItem>
                <SelectItem value="google-scholar">Google Scholar</SelectItem>
                <SelectItem value="ieee">IEEE</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="keywords">Mots-clés</Label>
            <Input
              id="keywords"
              placeholder="Entrez des mots-clés séparés par des virgules"
              value={filters.keywords}
              onChange={(e) => handleFilterChange("keywords", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button 
            onClick={handleAnalyze} 
            size="lg" 
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Lancer l'analyse
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisFilters;
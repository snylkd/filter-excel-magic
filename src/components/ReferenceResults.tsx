import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, BookOpen, Calendar, Users } from "lucide-react";

export interface Reference {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  category: string;
  type: string;
  abstract: string;
  url?: string;
  doi?: string;
  citations: number;
  relevanceScore: number;
}

interface ReferenceResultsProps {
  results: Reference[];
  isLoading: boolean;
}

const ReferenceResults = ({ results, isLoading }: ReferenceResultsProps) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recherche en cours...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="text-center py-8">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun résultat trouvé</h3>
          <p className="text-muted-foreground">
            Essayez d'ajuster vos filtres pour obtenir des résultats.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Résultats de l'analyse</span>
            <Badge variant="secondary">{results.length} références trouvées</Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {results.map((reference) => (
        <Card key={reference.id} className="w-full">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 leading-tight">
                    {reference.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{reference.authors.slice(0, 3).join(", ")}</span>
                      {reference.authors.length > 3 && <span> et al.</span>}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{reference.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{reference.journal}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge 
                    variant={reference.relevanceScore > 80 ? "default" : 
                            reference.relevanceScore > 60 ? "secondary" : "outline"}
                  >
                    Pertinence: {reference.relevanceScore}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {reference.citations} citations
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-3">
                <Badge variant="outline">{reference.category}</Badge>
                <Badge variant="outline">{reference.type}</Badge>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {reference.abstract.substring(0, 300)}
                {reference.abstract.length > 300 && "..."}
              </p>

              <div className="flex gap-2 pt-2">
                {reference.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={reference.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Voir l'article
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Télécharger
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReferenceResults;
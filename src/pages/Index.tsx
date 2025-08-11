import { useState } from "react";
import AnalysisFilters, { FilterOptions } from "@/components/AnalysisFilters";
import ReferenceResults, { Reference } from "@/components/ReferenceResults";
import { Search, Database } from "lucide-react";

const Index = () => {
  const [results, setResults] = useState<Reference[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Données de test pour simuler les résultats
  const mockReferences: Reference[] = [
    {
      id: "1",
      title: "Intelligence artificielle et apprentissage automatique : Une approche moderne",
      authors: ["Dr. Marie Dubois", "Prof. Jean Martin", "Dr. Sophie Laurent"],
      journal: "Revue Française d'Intelligence Artificielle",
      year: 2024,
      category: "technologie",
      type: "article",
      abstract: "Cette étude présente une analyse approfondie des dernières avancées en intelligence artificielle et apprentissage automatique. Les auteurs explorent les nouvelles architectures de réseaux de neurones, les techniques d'optimisation avancées et leurs applications pratiques dans divers domaines industriels. L'article propose également un framework méthodologique pour l'évaluation des performances des modèles d'IA.",
      url: "https://example.com/article1",
      doi: "10.1000/journal.2024.001",
      citations: 145,
      relevanceScore: 95
    },
    {
      id: "2",
      title: "Blockchain et cryptomonnaies : Impact sur les systèmes financiers traditionnels",
      authors: ["Prof. Alexandre Chen", "Dr. Fatima Al-Rashid"],
      journal: "Journal of Financial Technology",
      year: 2023,
      category: "finance",
      type: "rapport",
      abstract: "Cette recherche examine l'impact disruptif de la technologie blockchain sur les institutions financières traditionnelles. L'étude analyse les mécanismes de consensus, la sécurité cryptographique et les implications réglementaires. Les résultats montrent une transformation significative du paysage financier avec l'adoption croissante des actifs numériques.",
      url: "https://example.com/article2",
      doi: "10.1000/fintech.2023.456",
      citations: 87,
      relevanceScore: 78
    },
    {
      id: "3",
      title: "Développement durable et technologies vertes : Solutions pour l'avenir",
      authors: ["Dr. Elena Rodriguez", "Prof. Hans Mueller", "Dr. Aisha Patel", "Prof. Liu Wei"],
      journal: "Environmental Science & Technology",
      year: 2024,
      category: "environnement",
      type: "etude",
      abstract: "Cette étude multidisciplinaire explore les innovations technologiques au service du développement durable. Les chercheurs analysent les énergies renouvelables, les matériaux biosourcés et les processus de recyclage avancés. L'article propose un modèle intégré pour l'évaluation de l'impact environnemental des nouvelles technologies.",
      url: "https://example.com/article3",
      citations: 203,
      relevanceScore: 89
    }
  ];

  const handleAnalyze = async (filters: FilterOptions) => {
    setIsLoading(true);
    setResults([]);

    // Simulation d'une recherche asynchrone
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Filtrage des résultats en fonction des filtres sélectionnés
    let filteredResults = mockReferences;

    if (filters.category) {
      filteredResults = filteredResults.filter(ref => ref.category === filters.category);
    }

    if (filters.type) {
      filteredResults = filteredResults.filter(ref => ref.type === filters.type);
    }

    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase().split(',').map(k => k.trim());
      filteredResults = filteredResults.filter(ref =>
        keywords.some(keyword =>
          ref.title.toLowerCase().includes(keyword) ||
          ref.abstract.toLowerCase().includes(keyword)
        )
      );
    }

    setResults(filteredResults);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Database className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Analyseur de Références</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Recherchez et analysez des références académiques avec des filtres avancés
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Filtres */}
          <AnalysisFilters onAnalyze={handleAnalyze} isLoading={isLoading} />

          {/* Résultats */}
          <ReferenceResults results={results} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
